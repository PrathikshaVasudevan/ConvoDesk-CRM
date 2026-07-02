import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.session import Base


class Contact(Base):
    __tablename__ = "contacts"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    full_name = Column(String, nullable=False)
    phone = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, nullable=True)
    company = Column(String, nullable=True)
    city = Column(String, nullable=True)
    lead_stage = Column(String, nullable=False, default="new")
    priority = Column(String, nullable=False, default="medium")
    assigned_to = Column(String, ForeignKey("users.id"), nullable=True)
    source = Column(String, nullable=True)
    last_contacted_at = Column(DateTime(timezone=True), nullable=True)
    next_followup_at = Column(DateTime(timezone=True), nullable=True)
    avatar_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())