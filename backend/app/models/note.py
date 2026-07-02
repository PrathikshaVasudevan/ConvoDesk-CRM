from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.session import Base


class Note(Base):
    __tablename__ = "notes"

    id = Column(String, primary_key=True, index=True)
    contact_id = Column(String, ForeignKey("contacts.id"), nullable=False)
    author_id = Column(String, ForeignKey("users.id"), nullable=True)
    content = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())