import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.session import Base


class FollowUp(Base):
    __tablename__ = "followups"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    contact_id = Column(String, ForeignKey("contacts.id"), nullable=False)
    assigned_to = Column(String, ForeignKey("users.id"), nullable=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    due_at = Column(DateTime(timezone=True), nullable=False)
    status = Column(String, nullable=False, default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)