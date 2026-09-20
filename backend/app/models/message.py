import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Text, Integer, JSON
from sqlalchemy.orm import relationship
from app.db.base import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    conversation_id = Column(String(36), ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False, index=True)
    role = Column(String(50), nullable=False)  # 'user', 'assistant', 'system'
    content = Column(Text, nullable=False)
    grounding_score = Column(String(20), nullable=True)  # 'HIGH', 'MEDIUM', 'LOW', 'UNGROUNDED'
    confidence_score = Column(Float, nullable=True)
    message_metadata = Column(JSON, default=dict, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    conversation = relationship("Conversation", back_populates="messages")
    citations = relationship("MessageCitation", back_populates="message", cascade="all, delete-orphan", order_by="MessageCitation.citation_index")


class MessageCitation(Base):
    __tablename__ = "message_citations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    message_id = Column(String(36), ForeignKey("messages.id", ondelete="CASCADE"), nullable=False, index=True)
    chunk_id = Column(String(36), ForeignKey("document_chunks.id", ondelete="CASCADE"), nullable=True, index=True)
    citation_index = Column(Integer, nullable=False)
    document_name = Column(String(255), nullable=False)
    page_number = Column(Integer, nullable=False)
    section_title = Column(String(255), nullable=True)
    snippet = Column(Text, nullable=False)
    similarity_score = Column(Float, nullable=True)

    message = relationship("Message", back_populates="citations")
    chunk = relationship("DocumentChunk", back_populates="citations")
