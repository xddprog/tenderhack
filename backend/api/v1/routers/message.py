from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter

from backend.core import services


router = APIRouter()


@router.patch('/{message_id}')
@inject
async def like_or_dislike_message(
    message_id: int,
    message_service: FromDishka[services.MessageService],
    like_or_dislike: bool | None = None,
):
    return await message_service.like_or_dislike_message(message_id, like_or_dislike)