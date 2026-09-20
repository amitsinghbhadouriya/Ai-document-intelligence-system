from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.config import settings
from app.core.logging import logger
from app.db.database import init_db

# Routers
from app.api.health import router as health_router
from app.api.auth import router as auth_router
from app.api.documents import router as documents_router
from app.api.search import router as search_router
from app.api.chat import router as chat_router
from app.api.analysis import router as analysis_router
from app.api.comparison import router as comparison_router
from app.api.evaluation import router as evaluation_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle manager for startup and shutdown routines."""
    logger.info("Initializing AI Document Intelligence Platform...")
    try:
        init_db()
        logger.info("Database schemas verified.")
    except Exception as e:
        logger.error(f"Database initialization exception: {e}")
    yield
    logger.info("Shutting down AI Document Intelligence Platform.")


app = FastAPI(
    title=settings.APP_NAME,
    description="Enterprise Document Understanding, Vector Search, and Grounded RAG Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global unhandled error at {request.url.path}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred. Please contact administrator."},
    )


# Mount routers under /api
app.include_router(health_router, prefix=settings.API_V1_STR)
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(documents_router, prefix=settings.API_V1_STR)
app.include_router(search_router, prefix=settings.API_V1_STR)
app.include_router(chat_router, prefix=settings.API_V1_STR)
app.include_router(analysis_router, prefix=settings.API_V1_STR)
app.include_router(comparison_router, prefix=settings.API_V1_STR)
app.include_router(evaluation_router, prefix=settings.API_V1_STR)


@app.get("/")
def root():
    return {
        "message": "AI Document Intelligence and Knowledge Extraction System API",
        "docs": "/docs",
        "health": f"{settings.API_V1_STR}/health",
        "version": "1.0.0",
    }
