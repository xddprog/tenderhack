from pydantic import BaseModel


class WebsocketError(BaseModel):
    detail: str
    status: int