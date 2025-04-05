from typing import AsyncIterable
from dishka import FromDishka, Provider, Scope, provide
from dishka.integrations.fastapi import inject
from fastapi import Depends, Request
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession

from backend.core import repositories, services
from backend.core.dto.user_dto import BaseUserModel
from backend.infrastructure.config.auth_configs import AUTH_BEARER
from backend.infrastructure.database.connection.postgres_connection import DatabaseConnection


class RequestProvider(Provider):
    @provide(scope=Scope.SESSION)
    async def get_session(self, db_connection: DatabaseConnection) -> AsyncIterable[AsyncSession]:
        session = await db_connection.get_session()
        try:
            yield session
        finally:
            await session.close()

    @provide(scope=Scope.SESSION)
    async def get_auth_service(self, session: AsyncSession) -> services.AuthService:
        return services.AuthService(repository=repositories.UserRepository(session))

    @provide(scope=Scope.REQUEST)
    async def get_user_service(self, session: AsyncSession) -> services.UserService:    
        return services.UserService(repository=repositories.UserRepository(session))
    
    @provide(scope=Scope.REQUEST)
    async def get_chat_service(self, session: AsyncSession) -> services.ChatService:
        return services.ChatService(repository=repositories.ChatRepository(session))
    
    @provide(scope=Scope.SESSION)
    async def get_message_service(self, session: AsyncSession) -> services.MessageService:
        return services.MessageService(repository=repositories.MessageRepository(session))
    
    
@inject
async def get_current_user_dependency(
    auth_service: FromDishka[services.AuthService], 
    token: HTTPAuthorizationCredentials = Depends(AUTH_BEARER),
) -> BaseUserModel:
    return await auth_service.verify_token(token)
