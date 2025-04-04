from backend.core.repositories.user_repository import UserRepository
from backend.core.services.base import BaseDbModelService
from backend.infrastructure.database.models.user import User
from backend.infrastructure.interfaces.service import DbModelServiceInterface


class UserService(BaseDbModelService[User]):
    repository: UserRepository
    