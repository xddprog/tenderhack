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

    async def local_model_call(self, user_prompt, retrieved_chunks, websocket: WebSocket):
        # Create the prompt with the user's request
        context = "\n".join(retrieved_chunks)
        
        prompt = f"""
Ты - ассистент по поиску информации в данных. Используй следующий контекст для ответа на вопрос пользователя.
Если ты считаешь, что контекста недостаточно для формирования ответа, ответь что не можешь помочь в решении данного вопоса
Контекст:
{context}

Запрос пользователя:
{user_prompt}

Ответ:
"""
        # Define the Ollama API endpoint
        url = "http://localhost:11434/api/generate"
        
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
                                "data": {"text": chunk}
                            })
                        if json_response.get("done", False):
                            await websocket.send_json({
                                "event": ChatEvents.GPT_END.value,
                                "data": {"text": "End generating"}
                            })
                            break

    async def process_query(self, websocket: WebSocket, query: str, top_k_titles: int = 10, top_k_chunks: int = 5) -> str:
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
        
        # Генерация ответа
        answer = await self.local_model_call(query, relevant_chunks, websocket)
        print(answer)
        
        return answer