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
async def get_user_chats():
    pass
