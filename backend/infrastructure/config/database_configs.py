from pathlib import Path
from environs import Env
from pydantic import BaseModel


env = Env()
env.read_env()


class FaissConfig(BaseModel):
    EXCEL_PATH: str
    TITLE_INDEX_PATH: str
    CHUNK_INDEX_PATH: str


class DatabaseConfig(BaseModel):
    DB_NAME: str
    DB_USER: str
    DB_PASS: str
    DB_HOST: str
    DB_PORT: str

    def get_postgres_url(self, is_async: bool = True):
        if is_async:
            return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        return f"postgresql://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"


DB_CONFIG = DatabaseConfig(
    **{field: env.str(field.upper()) for field in DatabaseConfig.model_fields}
)
FAISS_CONFIG = FaissConfig(
    EXCEL_PATH=str(Path(__file__).resolve().parent.parent.parent / "/utils" / "faiss_data" / "Статьи.xls"),
    TITLE_INDEX_PATH=str(Path(__file__).resolve().parent.parent.parent  / "/utils" /"faiss_data" / "title_faiss_index"),
    CHUNK_INDEX_PATH=str(Path(__file__).resolve().parent.parent.parent / "utils" / "faiss_data" / "chunk_faiss_index")
)