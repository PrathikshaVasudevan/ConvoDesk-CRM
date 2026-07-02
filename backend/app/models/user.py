from sqlalchemy import Column, String, DateTime
from sqlalchemy.sql import func
from app.db.session import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    role = Column(String, nullable=False, default="sales")
    avatar_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())