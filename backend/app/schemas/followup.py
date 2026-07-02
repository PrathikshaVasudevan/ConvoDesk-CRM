from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class FollowUpBase(BaseModel):
    contact_id: str
    assigned_to: Optional[str] = None
    title: str
    description: Optional[str] = None
    due_at: datetime
    status: str = "pending"


class FollowUpCreate(FollowUpBase):
    pass


class FollowUpUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_at: Optional[datetime] = None
    status: Optional[str] = None
    completed_at: Optional[datetime] = None


class FollowUpResponse(FollowUpBase):
    id: str
    created_at: datetime
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True