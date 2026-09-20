import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.db.base import Base


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    document_id = Column(String(36), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False, index=True)
    chunk_index = Column(Integer, nullable=False)
    page_number = Column(Integer, nullable=False, index=True)
    section_title = Column(String(255), nullable=True)
    content = Column(Text, nullable=False)
    token_count = Column(Integer, default=0, nullable=False)
    char_count = Column(Integer, default=0, nullable=False)
    
    # Store embedding as JSON list of floats for portability across SQLite and Postgres
    embedding = Column(JSON, nullable=True)
    chunk_metadata = Column(JSON, default=dict, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    document = relationship("Document", back_populates="chunks")
    citations = relationship("MessageCitation", back_populates="chunk", cascade="all, delete-orphan")
