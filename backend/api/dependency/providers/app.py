import asyncio
from dishka import Provider, Scope, provide
from fastapi import Request

from backend.core import services
from backend.core.services.faiss_service import FaissService
from backend.infrastructure.database.connection.postgres_connection import DatabaseConnection
from backend.utils.websocket.manager import WebSocketManager


class AppProvider(Provider):
    @provide(scope=Scope.APP)
    async def get_db_connection(self) -> DatabaseConnection:
        return DatabaseConnection()

    @provide(scope=Scope.APP)
    async def get_faiss_service(self) -> services.FaissService:
        return services.FaissService()
    
    @provide(scope=Scope.APP)
    async def get_ws_manager(self) -> WebSocketManager:
        return WebSocketManager()
    
    @provide(scope=Scope.APP)
    async def get_pipeline_service(self) -> services.PipelineService:
        return services.PipelineService()