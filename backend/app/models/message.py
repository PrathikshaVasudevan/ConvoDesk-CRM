import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.session import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    conversation_id = Column(String, ForeignKey("conversations.id"), nullable=False)
    sender_type = Column(String, nullable=False)
    sender_id = Column(String, ForeignKey("users.id"), nullable=True)
    message_text = Column(String, nullable=False)
    message_type = Column(String, nullable=False, default="text")
    created_at = Column(DateTime(timezone=True), server_default=func.now())