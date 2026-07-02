import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer
from sqlalchemy.sql import func
from app.db.session import Base


class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    contact_id = Column(String, ForeignKey("contacts.id"), nullable=False)
    channel = Column(String, nullable=False, default="whatsapp")
    status = Column(String, nullable=False, default="open")
    unread_count = Column(Integer, nullable=False, default=0)
    last_message_preview = Column(String, nullable=True)
    last_message_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())