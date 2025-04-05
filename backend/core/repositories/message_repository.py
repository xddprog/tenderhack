from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.core.repositories.base import SqlAlchemyRepository
from backend.infrastructure.database.models.message import Message


class MessageRepository(SqlAlchemyRepository[Message]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, Message)
        
    async def get_chat_messages(self, chat_id: int):
        query = select(Message).where(Message.chat_id == chat_id)
        return (await self.session.execute(query)).scalars().all()
    