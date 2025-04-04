from fastapi.routing import APIRouter


router = APIRouter(prefix="/chat")


@router.get("/{chat_id}")
async def get_chat_messages():
    pass
