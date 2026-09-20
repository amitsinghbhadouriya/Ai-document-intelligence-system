import os
from typing import List
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    APP_NAME: str = "AI-Powered Document Intelligence and Knowledge Extraction System"
    DEBUG: bool = True
    API_V1_STR: str = "/api"

    # Security
    JWT_SECRET: str = "dev-secret-key-change-in-production-min-32-chars-long"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # Database
    DATABASE_URL: str = "sqlite:///./doc_intelligence.db"

    # Storage
    UPLOAD_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "uploads"))
    MAX_FILE_SIZE_MB: int = 25
    ALLOWED_EXTENSIONS: List[str] = [".pdf", ".docx", ".txt"]

    # AI Configuration
    LLM_PROVIDER: str = "gemini"  # gemini, openai, ollama, mock
    LLM_API_KEY: str = ""
    LLM_MODEL: str = "gemini-1.5-flash"
    EMBEDDING_PROVIDER: str = "local"  # local, gemini, openai
    EMBEDDING_MODEL: str = "all-MiniLM-L6-v2"

    # RAG Tuning
    DEFAULT_TOP_K: int = 5
    CHUNK_SIZE: int = 600
    CHUNK_OVERLAP: int = 100
    RETRIEVAL_MODE: str = "hybrid"  # semantic, keyword, hybrid
    OCR_FALLBACK_ENABLED: bool = True
    OCR_LANGUAGE: str = "eng"

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()

# Ensure uploads directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
