from dishka import FromDishka
from fastapi import WebSocket
from fastapi.routing import APIRouter

from backend.core import services
from backend.utils.websocket.manager import WebSocketManager


router = APIRouter(prefix="/chat")


@router.get("/{chat_id}")
async def get_chat_messages(
    chat_id: int,
    message_service: FromDishka[services.MessageService]
):
    return await message_service.get_chat_messages(chat_id)


@router.websocket("/{chat_id}")
async def connect_chat(
    chat_id: int,
    user_id: int,
    websocket: WebSocket,
    message_service: FromDishka[services.MessageService],
    manager: FromDishka[WebSocketManager]
):
    try:
        await manager.connect(chat_id, websocket)
        while True:
            user_input = await websocket.receive_text()
            message = await message_service.create(text=user_input, user_id=user_id, from_user=True)
            
            await manager.broadcast(chat_id, message)

            generated_message = "" #todo
            message = await message_service.create(text=generated_message, user_id=user_id, from_user=False)
            
    finally:
        await manager.disconnect(chat_id)