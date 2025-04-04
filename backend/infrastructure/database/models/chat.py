from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.infrastructure.database.models.base import Base
from backend.infrastructure.database.models.message import Message


class Chat(Base):
    __tablename__ = "chats"
    
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    title: Mapped[str] = mapped_column(nullable=True)
    messages: Mapped[list[Message]] = relationship(back_populates="chat", uselist=True)