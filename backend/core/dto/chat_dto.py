from pydantic import BaseModel


class ChatModel(BaseModel):
    chat_id: int
    title: str
    