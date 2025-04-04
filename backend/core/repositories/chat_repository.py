from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.core.repositories.base import SqlAlchemyRepository
from backend.infrastructure.database.models.chat import Chat
from backend.infrastructure.database.models.message import Message


class ChatRepository(SqlAlchemyRepository[Chat]):
    def __init__(self, session: AsyncSession):
        super.__init__(session, Chat)

    async def get_user_chats(self, user_id: int):
        query = select(Chat).where(Chat.user_id == user_id)
        return (await self.session.execute(query)).scalars().all()
    
    async def get_chat_messages(self, chat_id: str):
        query = select(Message).where(Message.chat_id == chat_id)
        return (await self.session.execute(query)).scalars().all()
    