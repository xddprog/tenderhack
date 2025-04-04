from pydantic import BaseModel


class MessageModel(BaseModel):
    text: str
    from_user: bool 