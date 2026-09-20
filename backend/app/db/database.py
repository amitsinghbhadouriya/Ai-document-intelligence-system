from typing import Generator
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from app.config import settings
from app.core.logging import logger
from app.db.base import Base

connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
    echo=False,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db() -> None:
    """Initialize database tables and extensions if PostgreSQL."""
    try:
        with engine.connect() as conn:
            if settings.DATABASE_URL.startswith("postgresql"):
                try:
                    conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
                    conn.commit()
                    logger.info("pgvector extension verified or created successfully.")
                except Exception as ext_err:
                    logger.warning(f"Could not enable pgvector extension: {ext_err}")
            
            # Import models so Base.metadata is populated
            from app.models import user, document, chunk, conversation, message  # noqa: F401
            Base.metadata.create_all(bind=engine)
            logger.info("Database schemas created/verified successfully.")
    except Exception as e:
        logger.error(f"Database initialization error: {e}")
        raise e


def get_db() -> Generator[Session, None, None]:
    """Dependency for providing database session to API endpoints."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
