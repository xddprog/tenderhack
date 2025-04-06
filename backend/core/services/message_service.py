from backend.core.dto.chat_dto import ChatModel
from backend.core.dto.message_dto import MessageModel
from backend.core.repositories.chat_repository import ChatRepository
from backend.core.repositories.message_repository import MessageRepository
from backend.core.services.base import BaseDbModelService
from backend.infrastructure.database.models.chat import Chat
from backend.infrastructure.database.models.message import Message


class MessageService(BaseDbModelService[Message]):
    repository: MessageRepository

    async def get_chat_messages(self, chat_id: int) -> list[MessageModel]:
        messages = await self.repository.get_chat_messages(chat_id)
        return [MessageModel.model_validate(message, from_attributes=True) for message in messages]

    async def create(self, text: str, user_id: int, chat_id: int, from_user: bool) -> MessageModel:
        message = await super().create(
            text=text, 
            user_id=user_id, 
            chat_id=chat_id, 
            from_user=from_user
        )
        return MessageModel.model_validate(message, from_attributes=True)
    
    async def like_or_dislike_message(self, message_id: int, like_or_dislike: bool):
        message = await self.update(message_id, liked=like_or_dislike)
        return MessageModel.model_validate(message, from_attributes=True)