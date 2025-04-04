import xlrd
import faiss
from sentence_transformers import SentenceTransformer
import numpy as np
import json
from typing import List, Dict, Optional, Tuple

from backend.infrastructure.config.database_configs import FAISS_CONFIG

class FaissService:
    def __init__(self):
        """Инициализация сервиса с путями к файлам и моделью."""
        self.excel_path = FAISS_CONFIG.EXCEL_PATH
        self.index_path = FAISS_CONFIG.INDEX_PATH
        self.metadata_path = FAISS_CONFIG.METADATA_PATH
        self.model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
        self.index: Optional[faiss.IndexFlatL2] = None
        self.metadata: List[Dict[str, str]] = []

    def build_knowledge_base(self) -> None:
        """Создаёт FAISS-индекс и метаданные из Excel-файла."""
        # Чтение данных из Excel
        workbook = xlrd.open_workbook(self.excel_path)
        sheet = workbook.sheet_by_index(0)
        
        data = []
        for row in range(1, sheet.nrows):
            short_topic_name = sheet.cell_value(row, 0)
            actual_knowledge = sheet.cell_value(row, 1)
            data.append({
                "short_topic_name": short_topic_name,
                "actual_knowledge": actual_knowledge
            })
        
        # Генерация эмбеддингов
        texts = [entry["actual_knowledge"] for entry in data]
        embeddings = self.model.encode(texts, convert_to_numpy=True, show_progress_bar=True)
        
        # Создание и заполнение FAISS-индекса
        dimension = embeddings.shape[1]
        self.index = faiss.IndexFlatL2(dimension)
        self.index.add(embeddings.astype('float32'))
        
        # Сохранение индекса и метаданных
        faiss.write_index(self.index, self.index_path)
        self.metadata = [{entry["short_topic_name"]: entry['actual_knowledge']} for entry in data]
        with open(self.metadata_path, "w", encoding="utf-8") as f:
            json.dump(self.metadata, f, ensure_ascii=False, indent=2)
        print("База знаний создана!")

    def load_knowledge_base(self) -> bool:
        """Загружает существующий FAISS-индекс и метаданные."""
        try:
            self.index = faiss.read_index(self.index_path)
            with open(self.metadata_path, "r", encoding="utf-8") as f:
                self.metadata = json.load(f)
            return True
        except FileNotFoundError:
            print("Файлы индекса или метаданных не найдены. Сначала создайте базу знаний.")
            return False

    def search(self, prompt: str, k: int = 3) -> Tuple[List[float], List[str]]:
        """Ищет k ближайших текстов в базе знаний по запросу."""
        if not self.index or not self.metadata:
            if not self.load_knowledge_base():
                raise ValueError("База знаний не готова. Создайте её с помощью build_knowledge_base.")
        
        # Преобразование запроса в эмбеддинг
        query_embedding = self.model.encode([prompt], convert_to_numpy=True).astype('float32')
        
        # Поиск ближайших соседей
        distances, indices = self.index.search(query_embedding, k)
        relevant_texts = [list(self.metadata[i].values())[0] for i in indices[0]]
        
        return distances[0].tolist(), relevant_texts