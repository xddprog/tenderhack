import json
from typing import Annotated
from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import Depends, HTTPException, WebSocket
from fastapi.routing import APIRouter

from backend.api.dependency.providers.request import get_current_user_dependency
from backend.core import services
from backend.core.dto.chat_dto import ChatModel
from backend.core.dto.message_dto import MessageModel
from backend.core.dto.user_dto import BaseUserModel
from backend.infrastructure.errors.websocket_errors import WebsocketError
from backend.utils.enums import ChatEvents
from backend.utils.websocket.manager import WebSocketManager


router = APIRouter()


@router.get("/{chat_id}/messages")
@inject
async def get_chat_messages(
    chat_id: int,
    message_service: FromDishka[services.MessageService]
) -> list[MessageModel]:
    return await message_service.get_chat_messages(chat_id)


@router.post("/")
@inject
async def create_chat(
    current_user: Annotated[BaseUserModel, Depends(get_current_user_dependency)],
    chat_service: FromDishka[services.ChatService]
) -> ChatModel:
    return await chat_service.create(user_id=current_user.id)


@router.websocket("/{chat_id}")
@inject
async def connect_chat(
    chat_id: int,
    access_token: str,
    websocket: WebSocket,
    message_service: FromDishka[services.MessageService],
    auth_service: FromDishka[services.AuthService],
    manager: FromDishka[WebSocketManager]
):
    try:
        await manager.connect(chat_id, websocket)
        user = await auth_service.verify_token(access_token)
        
        while True:
            user_input = await websocket.receive_json()
            user_input = user_input["content"]

            message = await message_service.create(user_input, user.id, chat_id, from_user=True)
            await manager.broadcast(chat_id, message, ChatEvents.USER)
 
            generated_message = "madk1d number 1" #todo
            message = await message_service.create(generated_message, user.id, chat_id, from_user=False)
            await manager.broadcast(chat_id, message, ChatEvents.GPT)
    except HTTPException as e:
        await manager.broadcast(chat_id, WebsocketError(detail=e.detail, status=e.status_code))
    finally:
        await manager.disconnect(chat_id)