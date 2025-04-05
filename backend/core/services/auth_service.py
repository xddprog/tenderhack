from datetime import datetime, timedelta

from fastapi.security import HTTPAuthorizationCredentials
from jwt import InvalidTokenError, encode, decode
from passlib.context import CryptContext

from backend.core.dto.auth_dto import LoginForm, RegisterForm
from backend.core.dto.user_dto import BaseUserModel
from backend.core.repositories.user_repository import UserRepository
from backend.infrastructure.config.auth_configs import JWT_CONFIG
from backend.infrastructure.database.models.user import User
from backend.infrastructure.errors.auth_errors import InvalidLoginData, InvalidToken, UserAlreadyNotRegister, UserAlreadyRegister


class AuthService:
    def __init__(self, repository: UserRepository) -> None:
        self.repository = repository
        self.context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    async def get_user_by_email(self, email: str) -> User | None:
        user = await self.repository.get_by_attribute("email", email)
        return None if not user else user[0]
    
    async def hash_password(self, password: str) -> str:
        return self.context.hash(password)
    
    async def verify_password(self, password: str, hashed_password: str) -> bool:
        return self.context.verify(password, hashed_password)

    async def authenticate_user(self, form: LoginForm) -> User:
        user = await self.get_user_by_email(form.email)
        if not user:
            raise UserAlreadyNotRegister
        if not await self.verify_password(form.password, user.password):
            raise InvalidLoginData
        return user

    async def create_access_token(self, email: str) -> str:
        expire = datetime.now() + timedelta(minutes=JWT_CONFIG.JWT_ACCESS_TOKEN_TIME)
        data = {"exp": expire, "sub": email}
        token = encode(
            data,
            JWT_CONFIG.JWT_SECRET, 
            algorithm=JWT_CONFIG.JWT_ALGORITHM
        )
        return {"token": token}
    
    async def verify_token(self, token: HTTPAuthorizationCredentials | str) -> BaseUserModel:
        if not token:
            raise InvalidToken
        try:
            payload = decode(
                token if isinstance(token, str) else token.credentials,
                JWT_CONFIG.JWT_SECRET,
                algorithms=[JWT_CONFIG.JWT_ALGORITHM],
            )
            email = payload.get("sub")
            if not email:
                raise InvalidToken
            
            user = await self.get_user_by_email(email)
            if not user:
                raise InvalidToken
            return BaseUserModel.model_validate(user, from_attributes=True)
        except (InvalidTokenError, AttributeError) as e:
            raise InvalidToken

    async def register_user(self, form: RegisterForm) -> User:
        user = await self.get_user_by_email(form.email)

        if user:
            raise UserAlreadyRegister

        form.password = await self.hash_password(form.password)
        new_user = await self.repository.add_item(**form.model_dump())

        return BaseUserModel.model_validate(new_user, from_attributes=True)
