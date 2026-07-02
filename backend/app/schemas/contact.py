from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class ContactBase(BaseModel):
    full_name: str
    phone: str
    email: Optional[str] = None
    company: Optional[str] = None
    city: Optional[str] = None
    lead_stage: str = "new"
    priority: str = "medium"
    assigned_to: Optional[str] = None
    source: Optional[str] = None
    next_followup_at: Optional[datetime] = None


class ContactCreate(ContactBase):
    pass


class ContactUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    company: Optional[str] = None
    city: Optional[str] = None
    lead_stage: Optional[str] = None
    priority: Optional[str] = None
    assigned_to: Optional[str] = None
    source: Optional[str] = None
    last_contacted_at: Optional[datetime] = None
    next_followup_at: Optional[datetime] = None


class ContactResponse(ContactBase):
    id: str
    last_contacted_at: Optional[datetime] = None
    avatar_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True