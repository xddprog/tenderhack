from datetime import datetime
from pydantic import BaseModel, field_validator


class MessageModel(BaseModel):
    id: int
    text: str
    from_user: bool 
    created_at: datetime | str
    liked: bool | None = None

    @field_validator("created_at")
    def validate_created_at(cls, value):
        return value.strftime("%H:%M")
        