from contextlib import asynccontextmanager
import multiprocessing
from dishka import AsyncContainer, FromDishka
from dishka.integrations.fastapi import setup_dishka
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware

from backend.api.dependency.setup import setup_container
from backend.api.v1.routers import v1_router
from backend.core.services.faiss_service import FaissService
from backend.infrastructure.database.connection.postgres_connection import DatabaseConnection


def create_lifespan(di_container: AsyncContainer):
    @asynccontextmanager
    async def lifespan(app: FastAPI):
        db: DatabaseConnection = await di_container.get(DatabaseConnection)
        # faiss: FaissService = await di_container.get(FaissService)
        await db.create_tables()
        # faiss.build_knowledge_base()
        # print(faiss.search({
        #     "distances": [0.12, 0.45],
        #     "texts": ["Машинное обучение — это...", "Алгоритмы ML помогают..."]
        # }))
        yield
    return lifespan


di_container = setup_container()
app = FastAPI(lifespan=create_lifespan(di_container))


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
setup_dishka(di_container, app)
app.include_router(v1_router, prefix="/api")


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    try:
        errors = []
        for error in exc.errors():
            field = error["loc"]
            input = error["input"]
            message = error["msg"]

            if isinstance(input, dict):
                input = input.get(field[-1])

            errors.append(
                {
                    "location": " -> ".join(field),
                    "detail": message,
                    "input": input,
                }
            )
        return JSONResponse(content=errors, status_code=422)
    except TypeError:
        return JSONResponse(
            status_code=422, content={"detail": exc.errors()}
        )
