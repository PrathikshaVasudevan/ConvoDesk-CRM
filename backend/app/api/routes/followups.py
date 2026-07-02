from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime, timezone
from app.schemas import FollowUpResponse, FollowUpCreate

router = APIRouter()

MOCK_FOLLOWUPS = [
  {
    "id": "f1",
    "contact_id": "c1",
    "contact_name": "Sarah Jenkins",
    "task": "Send updated enterprise API pricing structure and custom SLA document",
    "due_date": "2026-07-03T18:00:00Z",
    "status": "pending",
    "priority": "High"
  },
  {
    "id": "f2",
    "contact_id": "c2",
    "contact_name": "David Chen",
    "task": "Follow up on timezone-based auto routing configuration instructions",
    "due_date": "2026-07-04T12:00:00Z",
    "status": "pending",
    "priority": "Medium"
  },
  {
    "id": "f3",
    "contact_id": "c3",
    "contact_name": "Elena Rostova",
    "task": "Send e-sign link via DocuSign for approved pilot contract",
    "due_date": "2026-07-06T15:00:00Z",
    "status": "pending",
    "priority": "High"
  }
]

@router.get("", response_model=List[FollowUpResponse])
async def list_followups():
  return MOCK_FOLLOWUPS

@router.post("", response_model=FollowUpResponse, status_code=status.HTTP_201_CREATED)
async def create_followup(followup_data: FollowUpCreate):
  new_id = f"f_{len(MOCK_FOLLOWUPS) + 1}"
  new_item = {
    "id": new_id,
    "contact_id": followup_data.contact_id,
    "contact_name": "Mock Contact",  # In production, lookup name from Contact table
    "task": followup_data.task,
    "due_date": followup_data.due_date.isoformat(),
    "status": "pending",
    "priority": followup_data.priority
  }
  MOCK_FOLLOWUPS.append(new_item)
  return new_item

@router.patch("/{id}/toggle", response_model=FollowUpResponse)
async def toggle_followup_status(id: str):
  item = next((f for f in MOCK_FOLLOWUPS if f["id"] == id), None)
  if not item:
    raise HTTPException(status_code=404, detail="Followup task not found")
  
  item["status"] = "completed" if item["status"] == "pending" else "pending"
  return item
