import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Text, JSON, Boolean
from sqlalchemy.orm import relationship
from app.db.base import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    filename = Column(String(255), nullable=False)
    original_filename = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False)
    file_size_bytes = Column(Integer, nullable=False)
    file_hash = Column(String(64), index=True, nullable=True)
    storage_path = Column(String(512), nullable=False)
    status = Column(String(50), default="UPLOADED", index=True, nullable=False)  # UPLOADED, PROCESSING, PROCESSED, FAILED
    status_message = Column(String(500), nullable=True)
    total_pages = Column(Integer, default=0, nullable=False)
    ocr_pages_count = Column(Integer, default=0, nullable=False)
    doc_metadata = Column(JSON, default=dict, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    processed_at = Column(DateTime, nullable=True)

    owner = relationship("User", back_populates="documents")
    pages = relationship("DocumentPage", back_populates="document", cascade="all, delete-orphan", order_by="DocumentPage.page_number")
    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan", order_by="DocumentChunk.chunk_index")


class DocumentPage(Base):
    __tablename__ = "document_pages"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    document_id = Column(String(36), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False, index=True)
    page_number = Column(Integer, nullable=False)
    raw_text = Column(Text, nullable=True)
    cleaned_text = Column(Text, nullable=True)
    required_ocr = Column(Boolean, default=False, nullable=False)
    char_count = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    document = relationship("Document", back_populates="pages")
