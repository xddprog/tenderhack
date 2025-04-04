from pydantic import BaseModel


class BaseUserModel(BaseModel):
    id: int
    email: str | None = None
    
