from pathlib import Path
import warnings

from langchain_community.document_loaders import PDFPlumberLoader

from backend.infrastructure.config.database_configs import FAISS_CONFIG
warnings.filterwarnings('ignore')

import pandas as pd
from langchain.docstore.document import Document
from langchain.text_splitter import CharacterTextSplitter, RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS



class FaissService:
    def create_and_save_vector_db(chunk_size=1000):
        df = pd.read_excel(FAISS_CONFIG.EXCEL_PATH)
        if 'Заголовок статьи' not in df.columns or 'Описание' not in df.columns:
            raise ValueError("Excel file must contain 'Заголовок статьи' and 'Описание' columns")
        
        pdf_filepath_list = [
            'Инструкция_по_работе_с_Порталом_для_заказчика.pdf',
            'Инструкция_по_работе_с_Порталом_для_поставщика.pdf',
            'Инструкция_по_электронному_актированию.pdf',
            'Регламент_информационного_взаимодействия.pdf'
        ]
        pdf_filepath_list = [
            str(Path(__file__).resolve().parent.parent.parent  / "utils" / path)          
            for path in pdf_filepath_list
        ]
        loader_list = [PDFPlumberLoader(path) for path in pdf_filepath_list]
        [print(loader) for loader in loader_list]

        documents = [loader.load() for loader in loader_list]
        [print(doc) for doc in documents]

        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        pdf_dict = {i: filename for i, filename in enumerate(pdf_filepath_list)}
        chuncks_list = [text_splitter.split_documents(doc) for doc in documents]
                
        embeddings = HuggingFaceEmbeddings(model_name='bert-base-multilingual-cased')
        
        vector_store_list = [FAISS.from_documents(chunks, embeddings) for chunks in chuncks_list]
        for storage, filepath in zip(vector_store_list, pdf_filepath_list):
            storage.save_local(filepath[:-4])
        
        title_docs = [
            Document(page_content=row['Заголовок статьи'], metadata={'article': row['Заголовок статьи']})
            for _, row in df.iterrows()
        ]
        
        text_splitter = CharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=0)
        chunk_docs = []
        for _, row in df.iterrows():
            article = row['Заголовок статьи']
            description = row['Описание']
            
            if pd.isna(description):
                description = ""
            else:
                description = str(description)
            
            if description.strip():
                chunks = text_splitter.split_text(description)
                for chunk in chunks:
                    doc = Document(page_content=chunk, metadata={'article': article})
                    chunk_docs.append(doc)
            else:
                print(f"Skipping empty or invalid description for article: {article}")
        
        title_vector_store = FAISS.from_documents(title_docs, embeddings)
        title_vector_store.save_local(FAISS_CONFIG.TITLE_INDEX_PATH)
        
        chunk_vector_store = FAISS.from_documents(chunk_docs, embeddings)
        chunk_vector_store.save_local(FAISS_CONFIG.CHUNK_INDEX_PATH)
