# ConvoDesk CRM – Database Schema

## Overview
ConvoDesk CRM is a WhatsApp-first CRM system. The data model is centered around:
- Contacts (customers/leads)
- Conversations (WhatsApp chat threads)
- Messages (individual chat messages)
- Follow-ups (tasks/reminders)
- Notes (internal CRM notes)
- Tags (labels for segmentation)

---

# 1. users
Represents CRM users/agents/admins who log in and manage conversations.

| Field | Type | Notes |
|---|---|---|
| id | UUID / string | Primary key |
| full_name | string | Agent/admin name |
| email | string | Unique |
| role | string | admin / sales / support |
| avatar_url | string nullable | optional |
| created_at | timestamp | default now |

---

# 2. contacts
Represents customers/leads who message the business.

| Field | Type | Notes |
|---|---|---|
| id | UUID / string | Primary key |
| full_name | string | Customer name |
| phone | string | Unique customer phone |
| email | string nullable | optional |
| company | string nullable | optional |
| city | string nullable | optional |
| lead_stage | string | new / contacted / qualified / interested / followup / converted / lost |
| priority | string | low / medium / high |
| assigned_to | UUID nullable | FK to users.id |
| source | string nullable | whatsapp / website / ad / referral |
| last_contacted_at | timestamp nullable | last interaction |
| next_followup_at | timestamp nullable | quick CRM reminder field |
| created_at | timestamp | default now |
| updated_at | timestamp | default now |

---

# 3. conversations
Represents a WhatsApp conversation thread with one contact.

| Field | Type | Notes |
|---|---|---|
| id | UUID / string | Primary key |
| contact_id | UUID | FK to contacts.id |
| channel | string | whatsapp |
| status | string | open / pending / closed |
| unread_count | integer | unread customer messages |
| last_message_preview | string nullable | preview text for inbox list |
| last_message_at | timestamp nullable | latest message time |
| created_at | timestamp | default now |
| updated_at | timestamp | default now |

Relationship:
- One contact can have one main WhatsApp conversation in MVP
- Keep schema flexible for multiple conversations later

---

# 4. messages
Represents individual chat messages in a conversation.

| Field | Type | Notes |
|---|---|---|
| id | UUID / string | Primary key |
| conversation_id | UUID | FK to conversations.id |
| sender_type | string | customer / agent / ai |
| sender_id | UUID nullable | FK to users.id if agent sent |
| message_text | text | message content |
| message_type | string | text for now |
| created_at | timestamp | message time |

---

# 5. followups
Represents follow-up tasks/reminders linked to a contact.

| Field | Type | Notes |
|---|---|---|
| id | UUID / string | Primary key |
| contact_id | UUID | FK to contacts.id |
| assigned_to | UUID nullable | FK to users.id |
| title | string | short follow-up title |
| description | text nullable | optional note |
| due_at | timestamp | follow-up due date/time |
| status | string | pending / completed / overdue |
| created_at | timestamp | default now |
| completed_at | timestamp nullable | if done |

---

# 6. notes
Represents internal CRM notes about a contact.

| Field | Type | Notes |
|---|---|---|
| id | UUID / string | Primary key |
| contact_id | UUID | FK to contacts.id |
| author_id | UUID nullable | FK to users.id |
| content | text | internal note |
| created_at | timestamp | default now |

---

# 7. tags
Represents labels such as VIP, Hot Lead, Complaint, Demo Request.

| Field | Type | Notes |
|---|---|---|
| id | UUID / string | Primary key |
| name | string | tag label |
| color | string nullable | UI badge color |
| created_at | timestamp | default now |

---

# 8. contact_tags
Join table for many-to-many between contacts and tags.

| Field | Type | Notes |
|---|---|---|
| id | UUID / string | Primary key |
| contact_id | UUID | FK to contacts.id |
| tag_id | UUID | FK to tags.id |

---

# Lead Stage Enum
- new
- contacted
- qualified
- interested
- followup
- converted
- lost

# Conversation Status Enum
- open
- pending
- closed

# Follow-up Status Enum
- pending
- completed
- overdue

# Sender Type Enum
- customer
- agent
- ai