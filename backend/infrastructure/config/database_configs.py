from environs import Env
from pydantic import BaseModel


env = Env()
env.read_env()


class FaissConfig(BaseModel):
    EXCEL_PATH: str
    INDEX_PATH: str
    METADATA_PATH: str


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
    EXCEL_PATH="/Users/mago/copilot-assistant/backend/utils/faiss_data/Статьи.xls",
    INDEX_PATH="/Users/mago/copilot-assistant/backend/utils/faiss_data/knowledge_base_index.faiss",
    METADATA_PATH="/Users/mago/copilot-assistant/backend/utils/faiss_data/knowledge_base_index.json"
)