from datetime import datetime, timezone
import os
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.config import settings
from app.db.database import get_db

router = APIRouter(tags=["Health"])


@router.get("/health")
def health_check(db: Session = Depends(get_db)):
    """System diagnostic and healthcheck endpoint."""
    db_status = "connected"
    db_type = "postgresql" if "postgresql" in settings.DATABASE_URL else "sqlite"
    
    try:
        db.execute(text("SELECT 1"))
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    return {
        "status": "healthy" if db_status == "connected" else "degraded",
        "app_name": settings.APP_NAME,
        "environment": settings.ENVIRONMENT,
        "database": {
            "status": db_status,
            "type": db_type,
        },
        "ai_engine": {
            "llm_provider": settings.LLM_PROVIDER,
            "llm_model": settings.LLM_MODEL,
            "embedding_provider": settings.EMBEDDING_PROVIDER,
            "embedding_model": settings.EMBEDDING_MODEL,
        },
        "storage": {
            "upload_dir": settings.UPLOAD_DIR,
            "upload_dir_exists": os.path.exists(settings.UPLOAD_DIR),
            "max_file_size_mb": settings.MAX_FILE_SIZE_MB,
        },
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
