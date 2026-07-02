from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# Token Schemas
class Token(BaseModel):
  access_token: str
  token_type: str

class TokenData(BaseModel):
  email: Optional[str] = None

# User Schemas
class UserBase(BaseModel):
  email: EmailStr
  name: Optional[str] = None

class UserCreate(UserBase):
  password: str

class UserResponse(UserBase):
  id: str
  is_active: bool

  class Config:
    from_attributes = True

# Tag Schemas
class TagSchema(BaseModel):
  id: str
  name: str
  color: str

  class Config:
    from_attributes = True

# Contact Schemas
class ContactBase(BaseModel):
  name: str
  phone: str
  email: Optional[EmailStr] = None
  status: str = "New"
  priority: str = "Medium"
  lead_classification: Optional[str] = None

class ContactCreate(ContactBase):
  pass

class ContactUpdate(BaseModel):
  name: Optional[str] = None
  phone: Optional[str] = None
  email: Optional[EmailStr] = None
  status: Optional[str] = None
  priority: Optional[str] = None
  lead_classification: Optional[str] = None

class ContactResponse(ContactBase):
  id: str
  last_contacted: datetime

  class Config:
    from_attributes = True

# Message Schemas
class MessageBase(BaseModel):
  content: str

class MessageCreate(MessageBase):
  pass

class MessageResponse(MessageBase):
  id: str
  conversation_id: str
  sender_id: str
  sender_type: str
  timestamp: datetime
  status: str

  class Config:
    from_attributes = True

# Conversation Schemas
class ConversationBase(BaseModel):
  contact_id: str
  unread_count: int = 0
  summary: Optional[str] = None
  priority_suggestion: Optional[str] = None
  lead_intent: Optional[str] = None

class ConversationResponse(ConversationBase):
  id: str
  contact_name: str
  contact_phone: str
  last_message: Optional[str] = None
  last_message_time: Optional[str] = None

  class Config:
    from_attributes = True

# FollowUp Schemas
class FollowUpBase(BaseModel):
  contact_id: str
  task: str
  due_date: datetime
  priority: str = "Medium"

class FollowUpCreate(FollowUpBase):
  pass

class FollowUpResponse(FollowUpBase):
  id: str
  status: str
  contact_name: str

  class Config:
    from_attributes = True

# AI Schemas
class AISummaryResponse(BaseModel):
  summary: str

class AIReplySuggestionResponse(BaseModel):
  suggestion: str
