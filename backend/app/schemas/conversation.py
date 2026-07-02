from typing import Optional, List
from pydantic import BaseModel


class MessageCreate(BaseModel):
    message_text: str


class MessageResponse(BaseModel):
    id: str
    conversation_id: str
    sender_type: str
    sender_id: Optional[str] = None
    message_text: str
    message_type: str
    created_at: str

    class Config:
        from_attributes = True


class ConversationResponse(BaseModel):
    id: str
    contact_id: str
    channel: str
    status: str
    unread_count: int
    last_message_preview: Optional[str] = None
    last_message_at: Optional[str] = None
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True


class ConversationDetailResponse(ConversationResponse):
    messages: List[MessageResponse] = []