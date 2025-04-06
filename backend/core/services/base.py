from typing import Any
from pydantic import BaseModel
from sqlalchemy.orm import MappedColumn
from backend.core.repositories.base import SqlAlchemyRepository
from backend.infrastructure.interfaces.repository import RepositoryInterface
from backend.infrastructure.interfaces.service import DbModelServiceInterface


class BaseDbModelService[ModelType](DbModelServiceInterface[ModelType]):
    def __init__(
        self, 
        repository: SqlAlchemyRepository[ModelType], 
    ):
        self.repository = repository
        
    async def get_model(self, item_id: int):
        return await self.repository.get_item(item_id)
    
    async def get_one(self, item_id: int):
        return await self.repository.get_item(item_id)
    
    async def get_all(self):
        return await self.repository.get_all_items()
    
    async def create(self, **kwargs):
        return await self.repository.add_item(**kwargs)
    
    async def update(self, item_id: int, **kwargs: str | int):
        return await self.repository.update_item(item_id, **kwargs)
    
    async def delete(self, item_id: int):
        item = await self.repository.get_item(item_id)
        return await self.repository.delete_item(item)
    
    async def delete_many(self, item_ids: list[int]):
        for item_id in item_ids:
            item = await self.repository.get_item(item_id)
            await self.repository.delete_item(item)

    async def get_by_attribute(self, attribute: str, value: Any):
        return await self.repository.get_by_attribute(attribute, value)
    