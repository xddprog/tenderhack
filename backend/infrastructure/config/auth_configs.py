from environs import Env
from fastapi.security import HTTPBearer
from pydantic import BaseModel


env = Env()
env.read_env()


class JwtConfig(BaseModel):
    JWT_SECRET: str
    JWT_ALGORITHM: str
    JWT_ACCESS_TOKEN_TIME: int


JWT_CONFIG = JwtConfig(
    **{field: env.str(field) for field in JwtConfig.model_fields}
)
AUTH_BEARER = HTTPBearer(auto_error=False)