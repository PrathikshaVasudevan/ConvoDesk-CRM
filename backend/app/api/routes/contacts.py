from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.schemas import ContactResponse, ContactCreate, ContactUpdate

router = APIRouter()

# Mock storage representing our database for immediate scaffold execution
MOCK_CONTACTS = [
  {
    "id": "c1",
    "name": "Sarah Jenkins",
    "phone": "+1 (555) 234-5678",
    "email": "sarah@apexcorp.com",
    "status": "Qualified",
    "priority": "High",
    "lead_classification": "Hot",
    "last_contacted": "2026-07-02T18:30:00Z"
  },
  {
    "id": "c2",
    "name": "David Chen",
    "phone": "+65 9123 4567",
    "email": "david.chen@techvibe.io",
    "status": "New",
    "priority": "Medium",
    "lead_classification": "Warm",
    "last_contacted": "2026-07-02T20:15:00Z"
  },
  {
    "id": "c3",
    "name": "Elena Rostova",
    "phone": "+44 20 7946 0958",
    "email": "elena@nordiccapital.com",
    "status": "Proposal",
    "priority": "High",
    "lead_classification": "Hot",
    "last_contacted": "2026-07-02T15:45:00Z"
  },
  {
    "id": "c4",
    "name": "Marcus Brody",
    "phone": "+1 (555) 987-6543",
    "email": "marcus@adv-logistics.com",
    "status": "Contacted",
    "priority": "Low",
    "lead_classification": "Information Gathering",
    "last_contacted": "2026-07-01T11:20:00Z"
  },
  {
    "id": "c5",
    "name": "Amina Yousif",
    "phone": "+971 4 321 0987",
    "email": "amina.y@gulfretail.ae",
    "status": "Negotiation",
    "priority": "High",
    "lead_classification": "Hot",
    "last_contacted": "2026-07-02T19:00:00Z"
  }
]

@router.get("", response_model=List[ContactResponse])
async def list_contacts():
  return MOCK_CONTACTS

@router.get("/{id}", response_model=ContactResponse)
async def get_contact(id: str):
  contact = next((c for c in MOCK_CONTACTS if c["id"] == id), None)
  if not contact:
    raise HTTPException(status_code=404, detail="Contact not found")
  return contact

@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def create_contact(contact_data: ContactCreate):
  new_id = f"c_{len(MOCK_CONTACTS) + 1}"
  from datetime import datetime, timezone
  new_contact = {
    "id": new_id,
    "name": contact_data.name,
    "phone": contact_data.phone,
    "email": contact_data.email,
    "status": contact_data.status,
    "priority": contact_data.priority,
    "lead_classification": contact_data.lead_classification,
    "last_contacted": datetime.now(timezone.utc).isoformat()
  }
  MOCK_CONTACTS.append(new_contact)
  return new_contact

@router.put("/{id}", response_model=ContactResponse)
async def update_contact(id: str, contact_data: ContactUpdate):
  contact = next((c for c in MOCK_CONTACTS if c["id"] == id), None)
  if not contact:
    raise HTTPException(status_code=404, detail="Contact not found")
  
  update_dict = contact_data.model_dump(exclude_unset=True)
  for k, v in update_dict.items():
    contact[k] = v
  return contact
