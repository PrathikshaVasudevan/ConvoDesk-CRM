from sqlalchemy import Column, String, DateTime
from sqlalchemy.sql import func
from app.db.session import Base


class Tag(Base):
    __tablename__ = "tags"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    color = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())