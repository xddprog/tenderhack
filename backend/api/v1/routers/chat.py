from dishka import FromDishka
from fastapi import WebSocket
from fastapi.routing import APIRouter

from backend.core import services


router = APIRouter(prefix="/chat")


@router.get("/{chat_id}")
async def get_chat_messages(
    chat_id: int,
    chat_service: FromDishka[services.ChatService]
):
    return await chat_service.get_chat_messages(chat_id)


@router.websocket("/{chat_id}")
async def connect_chat(
    chat_id: int,
    user_id: int,
    websocket: WebSocket,
    chat_service: FromDishka[services.ChatService]
):
    pass