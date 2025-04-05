from typing import Annotated
from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter, Depends

from backend.api.dependency.providers.request import get_current_user_dependency
from backend.core import services
from backend.core.dto.auth_dto import LoginForm, RegisterForm
from backend.core.dto.user_dto import BaseUserModel


router = APIRouter()

@router.get("/current_user")
@inject
async def get_current_user(
    user_service: FromDishka[services.UserService],
    current_user: Annotated[BaseUserModel, Depends(get_current_user_dependency)],
) -> BaseUserModel:
    return current_user


@router.post("/login", status_code=200)
@inject
async def login_user(
    form: LoginForm,
    auth_service: FromDishka[services.AuthService],
) -> dict:
    user = await auth_service.authenticate_user(form)
    return await auth_service.create_access_token(user.email)


@router.post("/register", status_code=201)
@inject
async def register_user(
    form: RegisterForm,
    auth_service: FromDishka[services.AuthService],
) -> dict:
    new_user = await auth_service.register_user(form)
    return await auth_service.create_access_token(new_user.email)