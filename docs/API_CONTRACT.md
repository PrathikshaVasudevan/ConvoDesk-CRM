# ConvoDesk CRM – API Contract

Base prefix: /api/v1

---

## 1. Auth

### POST /auth/login
Logs in a CRM user.

Request:
{
  "email": "admin@convodesk.com",
  "password": "password123"
}

Response:
{
  "access_token": "jwt-token",
  "token_type": "bearer",
  "user": {
    "id": "u1",
    "full_name": "Admin User",
    "email": "admin@convodesk.com",
    "role": "admin"
  }
}

---

## 2. Contacts

### GET /contacts
Returns paginated contact list.

Query params:
- search
- lead_stage
- priority

Response:
{
  "items": [],
  "total": 0
}

### GET /contacts/{contact_id}
Returns one contact with related notes/tags summary.

### POST /contacts
Creates a contact.

### PUT /contacts/{contact_id}
Updates contact details / stage / priority / assignment.

---

## 3. Conversations

### GET /conversations
Returns inbox conversation list with contact preview.

### GET /conversations/{conversation_id}
Returns one conversation and its messages.

### POST /conversations/{conversation_id}/messages
Adds a new agent message to a conversation.

Request:
{
  "message_text": "Hi! Here are the pricing details."
}

---

## 4. Follow-ups

### GET /followups
Returns follow-up tasks.

Query params:
- status
- assigned_to

### POST /followups
Creates a follow-up task.

### PUT /followups/{followup_id}
Updates follow-up status or content.

---

## 5. Analytics

### GET /analytics/dashboard
Returns dashboard KPI summary.

Response:
{
  "total_contacts": 0,
  "active_conversations": 0,
  "converted_contacts": 0,
  "pending_followups": 0,
  "lead_stage_distribution": [],
  "message_volume": []
}

---

## 6. AI

### POST /ai/summarize-conversation
Summarizes a selected conversation.

Request:
{
  "conversation_id": "conv_1"
}

Response:
{
  "summary": "Customer is interested in pricing for premium package and requested a callback tomorrow."
}

### POST /ai/classify-lead
Classifies a conversation/contact intent and priority.

Request:
{
  "conversation_id": "conv_1"
}

Response:
{
  "intent": "pricing inquiry",
  "priority": "high",
  "suggested_stage": "interested"
}

### POST /ai/suggest-reply
Generates a suggested reply for the current conversation.

Request:
{
  "conversation_id": "conv_1"
}

Response:
{
  "reply": "Thanks for reaching out! Here are our pricing options..."
}