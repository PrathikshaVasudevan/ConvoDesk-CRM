from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.followup import FollowUpCreate, FollowUpUpdate, FollowUpResponse
from app.services.followup_service import (
    get_followups,
    get_followup_by_id,
    create_followup,
    update_followup,
)

router = APIRouter(prefix="/followups", tags=["FollowUps"])


@router.get("", response_model=list[FollowUpResponse])
def list_followups(db: Session = Depends(get_db)):
    return get_followups(db)


@router.post("", response_model=FollowUpResponse)
def add_followup(payload: FollowUpCreate, db: Session = Depends(get_db)):
    return create_followup(db, payload)


@router.put("/{followup_id}", response_model=FollowUpResponse)
def edit_followup(followup_id: str, payload: FollowUpUpdate, db: Session = Depends(get_db)):
    followup = update_followup(db, followup_id, payload)
    if not followup:
        raise HTTPException(status_code=404, detail="Follow-up not found")
    return followup