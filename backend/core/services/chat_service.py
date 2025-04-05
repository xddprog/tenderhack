from backend.core.dto.chat_dto import ChatModel
from backend.core.repositories.chat_repository import ChatRepository
from backend.core.services.base import BaseDbModelService
from backend.infrastructure.database.models.chat import Chat


class ChatService(BaseDbModelService[Chat]):
    repository: ChatRepository

    async def get_user_chats(self, user_id: int) -> list[ChatModel]:
        chats = await self.repository.get_user_chats(user_id)
        return [ChatModel.model_validate(chat, from_attributes=True) for chat in chats]
    
    async def create(self, user_id: int) -> ChatModel:
        new_chat = await super().create(user_id=user_id, title="SexySwaga")
        return ChatModel.model_validate(new_chat, from_attributes=True)