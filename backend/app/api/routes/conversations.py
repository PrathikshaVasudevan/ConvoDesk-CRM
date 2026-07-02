from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime, timezone
from app.schemas import ConversationResponse, MessageResponse, MessageCreate

router = APIRouter()

MOCK_CONVERSATIONS = [
  {
    "id": "conv1",
    "contact_id": "c1",
    "contact_name": "Sarah Jenkins",
    "contact_phone": "+1 (555) 234-5678",
    "last_message": "Thanks, I will review the API contract with my developer team tonight.",
    "last_message_time": "18:30",
    "unread_count": 2,
    "summary": "Sarah is evaluating ConvoDesk for their support team (20 agents). She is satisfied with the webhook response speed and is currently reviewing the API pricing.",
    "priority_suggestion": "High",
    "lead_intent": "Hot"
  },
  {
    "id": "conv2",
    "contact_id": "c2",
    "contact_name": "David Chen",
    "contact_phone": "+65 9123 4567",
    "last_message": "Is it possible to auto-assign chats based on agent working hours?",
    "last_message_time": "20:15",
    "unread_count": 1,
    "summary": "David wants to set up automated routing rules. He is checking availability of timezone-based chat routing.",
    "priority_suggestion": "Medium",
    "lead_intent": "Warm"
  },
  {
    "id": "conv3",
    "contact_id": "c3",
    "contact_name": "Elena Rostova",
    "contact_phone": "+44 20 7946 0958",
    "last_message": "Let us coordinate the signature on Monday afternoon.",
    "last_message_time": "15:45",
    "unread_count": 0,
    "summary": "Elena has approved the pilot plan and the contract draft. The signature is set for Monday.",
    "priority_suggestion": "High",
    "lead_intent": "Hot"
  }
]

MOCK_MESSAGES = {
  "conv1": [
    { "id": "m1_1", "conversation_id": "conv1", "sender_id": "c1", "sender_type": "contact", "content": "Hi, I am interested in integrating ConvoDesk for our customer support team.", "timestamp": "2026-07-02T18:00:00Z", "status": "read" },
    { "id": "m1_2", "conversation_id": "conv1", "sender_id": "agent1", "sender_type": "agent", "content": "Hello Sarah! I can definitely help with that. What systems are you currently using for CRM?", "timestamp": "2026-07-02T18:05:00Z", "status": "read" },
    { "id": "m1_3", "conversation_id": "conv1", "sender_id": "c1", "sender_type": "contact", "content": "We are on HubSpot right now, but need a better WhatsApp workflow.", "timestamp": "2026-07-02T18:10:00Z", "status": "read" },
    { "id": "m1_4", "conversation_id": "conv1", "sender_id": "agent1", "sender_type": "agent", "content": "Great, we have a native HubSpot syncing tool. Here is our developer doc: https://docs.convodesk.crm/api", "timestamp": "2026-07-02T18:15:00Z", "status": "read" },
    { "id": "m1_5", "conversation_id": "conv1", "sender_id": "c1", "sender_type": "contact", "content": "Thanks, I will review the API contract with my developer team tonight.", "timestamp": "2026-07-02T18:30:00Z", "status": "delivered" }
  ],
  "conv2": [
    { "id": "m2_1", "conversation_id": "conv2", "sender_id": "c2", "sender_type": "contact", "content": "Hello, what are the automated routing capabilities of ConvoDesk?", "timestamp": "2026-07-02T20:00:00Z", "status": "read" },
    { "id": "m2_2", "conversation_id": "conv2", "sender_id": "agent1", "sender_type": "agent", "content": "Hi David! We support round-robin routing, priority-based routing, and keyword triggers.", "timestamp": "2026-07-02T20:10:00Z", "status": "read" },
    { "id": "m2_3", "conversation_id": "conv2", "sender_id": "c2", "sender_type": "contact", "content": "Is it possible to auto-assign chats based on agent working hours?", "timestamp": "2026-07-02T20:15:00Z", "status": "delivered" }
  ],
  "conv3": [
    { "id": "m3_1", "conversation_id": "conv3", "sender_id": "agent1", "sender_type": "agent", "content": "Hi Elena, I have updated the pilot agreement with the requested custom SLA clause. Let me know if that works.", "timestamp": "2026-07-02T15:30:00Z", "status": "read" },
    { "id": "m3_2", "conversation_id": "conv3", "sender_id": "c3", "sender_type": "contact", "content": "This looks perfect. Let us coordinate the signature on Monday afternoon.", "timestamp": "2026-07-02T15:45:00Z", "status": "read" }
  ]
}

@router.get("", response_model=List[ConversationResponse])
async def list_conversations():
  return MOCK_CONVERSATIONS

@router.get("/{id}", response_model=ConversationResponse)
async def get_conversation(id: str):
  conv = next((c for c in MOCK_CONVERSATIONS if c["id"] == id), None)
  if not conv:
    raise HTTPException(status_code=404, detail="Conversation not found")
  return conv

@router.get("/{id}/messages", response_model=List[MessageResponse])
async def list_messages(id: str):
  if id not in MOCK_MESSAGES:
    return []
  return MOCK_MESSAGES[id]

@router.post("/{id}/messages", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def send_message(id: str, message_data: MessageCreate):
  conv = next((c for c in MOCK_CONVERSATIONS if c["id"] == id), None)
  if not conv:
    raise HTTPException(status_code=404, detail="Conversation not found")
  
  new_id = f"m_{id}_{datetime.now(timezone.utc).timestamp()}"
  new_msg = {
    "id": new_id,
    "conversation_id": id,
    "sender_id": "agent1",
    "sender_type": "agent",
    "content": message_data.content,
    "timestamp": datetime.now(timezone.utc).isoformat(),
    "status": "sent"
  }
  
  if id not in MOCK_MESSAGES:
    MOCK_MESSAGES[id] = []
  
  MOCK_MESSAGES[id].append(new_msg)
  conv["last_message"] = message_data.content
  conv["last_message_time"] = datetime.now(timezone.utc).strftime("%H:%M")
  
  return new_msg
Post = send_message
