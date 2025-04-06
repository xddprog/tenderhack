from pathlib import Path
from typing import Awaitable
import aiohttp
from fastapi import WebSocket
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
import json

from backend.infrastructure.config.database_configs import FAISS_CONFIG
from backend.utils.enums import ChatEvents

class PipelineService:
    def __init__(self):
        """Инициализация сервиса с FAISS-индексами и моделью эмбеддингов."""
        self.embeddings = HuggingFaceEmbeddings(model_name='bert-base-multilingual-cased')
        self.title_vector_store = FAISS.load_local(FAISS_CONFIG.TITLE_INDEX_PATH, self.embeddings, allow_dangerous_deserialization=True)
        self.chunk_vector_store = FAISS.load_local(FAISS_CONFIG.CHUNK_INDEX_PATH, self.embeddings, allow_dangerous_deserialization=True)

    def retrieve_relevant_chunks(self, query, relevant_topic_names, chunk_vector_store, top_k=5):
        """
        Retrieve the most relevant chunks from the descriptions of the relevant articles.

        Args:
            query (str): The user's query.
            relevant_topic_names (list): List of relevant article titles from the first step.
            chunk_vector_store (FAISS): The vector store with description chunks.
            top_k (int): Number of top chunks to retrieve.

        Returns:
            list: List of relevant chunk texts.
        """
        filter_dict = {'article': {'$in': relevant_topic_names}}
        relevant_chunks = chunk_vector_store.similarity_search(query, k=top_k, filter=filter_dict)
        return [doc.page_content for doc in relevant_chunks]
    
    async def get_chat_title(self, query: str, prompt: str) -> str:
        prompt = f"Ты - ассистент по поиску информации в данных. Суммаризируй запрос пользователя: {query}\n и ответ на этот запрос: {prompt} и напиши мне тему чата, используй максимум 5 слов."

        url = "http://ollama:11434/api/generate"
        
        data = {
            "model": "yandex/YandexGPT-5-Lite-8B-instruct-GGUF:latest",
            "prompt": prompt,
            "stream": True
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.post(url, json=data, headers={"Content-Type": "application/json"}, ssl=False) as response:
                search_query = ""
                async for line in response.content:
                    if line:
                        json_response = json.loads(line)
                        if "response" in json_response:
                            chunk = json_response["response"]
                            search_query += chunk
                        if json_response.get("done", False):
                            break
        return search_query.strip()

    async def local_model_call(self, user_prompt, retrieved_chunks, websocket: WebSocket, message_id: int):
        
        context = "\n".join(retrieved_chunks)
        
        prompt = f"""
Ты - ассистент по поиску информации в данных. Используй следующий контекст для ответа на вопрос пользователя.
Если ты считаешь, что контекста недостаточно для формирования ответа, ответь что не можешь помочь в решении данного вопроса и сообщи номер + 7(777) 777-52-42 для связи с технической поддержкой.
Контекст:
{context}

Запрос пользователя:
{user_prompt}

Ответ:
"""
        # Define the Ollama API endpoint
        url = "http://ollama:11434/api/generate"
        
        # Prepare the request payload
        data = {
            "model": "yandex/YandexGPT-5-Lite-8B-instruct-GGUF:latest",
            "prompt": prompt,
            "stream": True
        }
        
        # Send the request to Ollama API with streaming enabled
        async with aiohttp.ClientSession() as session:
            async with session.post(url, json=data, headers={"Content-Type": "application/json"}, ssl=False) as response:
                search_query = ""
                async for line in response.content:
                    if line:
                        json_response = json.loads(line)
                        if "response" in json_response:
                            chunk = json_response["response"]
                            search_query += chunk
                            await websocket.send_json({
                                "event": ChatEvents.GPT.value,
                                "data": {
                                    "text": chunk, 
                                    "id": message_id
                                }
                            })
                        if json_response.get("done", False):
                            await websocket.send_json({
                                "event": ChatEvents.GPT_END.value,
                                "data": {"text": "End generating"}
                            })
                            break
        return search_query.strip()

    async def process_query(
        self, 
        websocket: WebSocket, 
        message_id: int, 
        query: str, 
        top_k_titles: int = 10, 
        top_k_chunks: int = 5
    ) -> str:
        """Обрабатывает запрос пользователя и возвращает сгенерированный ответ."""
        # Поиск релевантных заголовков
        relevant_titles = self.title_vector_store.similarity_search(query, k=top_k_titles)
        relevant_topic_names = [doc.page_content for doc in relevant_titles]
        
        # Вывод заголовков (для отладки)
        print("Relevant topic names:")
        for topic in relevant_topic_names:
            print(f"- {topic}")
        
        # Поиск релевантных чанков
        relevant_chunks = self.retrieve_relevant_chunks(query, relevant_topic_names, self.chunk_vector_store, top_k=top_k_chunks)
        
        # Вывод чанков (для отладки)
        print("Нашли:")
        for i, chunk in enumerate(relevant_chunks, 1):
            print(f"{i}. {chunk}")

        vec_db_names = [
            'Инструкция_по_работе_с_Порталом_для_заказчика',
            'Инструкция_по_работе_с_Порталом_для_поставщика',
            'Инструкция_по_электронному_актированию',
            'Регламент_информационного_взаимодействия'
        ]
        vec_db_names = [
            str(Path(__file__).resolve().parent.parent.parent  / "utils" / path)          
            for path in vec_db_names
        ]
        chunk_vec_pdf_store = [FAISS.load_local(path, 
                                        self.embeddings, 
                                        allow_dangerous_deserialization=True) for path in vec_db_names]
        
        pdf_chunks = [vec.similarity_search(query, k=3) for vec in chunk_vec_pdf_store]

        for chunks in pdf_chunks:
            relevant_chunks.extend([doc.page_content for doc in chunks])

        for i, chunk in enumerate(relevant_chunks, 1):
            print(f"{i}. {chunk}")

        # Генерация ответа
        answer = await self.local_model_call(query, relevant_chunks, websocket, message_id)
        print(answer)
        
        return answer