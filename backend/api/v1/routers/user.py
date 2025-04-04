import time
from typing import Annotated
from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter, Request
from fastapi import Depends

from backend.api.dependency.providers.request import get_current_user_dependency
from backend.core import services
from backend.core.dto.user_dto import BaseUserModel


router = APIRouter()


@router.get("/chats")
@inject
async def get_user_chats(
    chat_service: FromDishka[services.ChatService],
    current_user: Annotated[BaseUserModel, Depends(get_current_user_dependency)]
):
    return await chat_service.get_user_chats(current_user.id)
