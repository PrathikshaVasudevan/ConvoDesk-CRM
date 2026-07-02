from sqlalchemy.orm import Session
from app.models.followup import FollowUp
from app.schemas.followup import FollowUpCreate, FollowUpUpdate


def get_followups(db: Session):
    return db.query(FollowUp).order_by(FollowUp.due_at.asc()).all()


def get_followup_by_id(db: Session, followup_id: str):
    return db.query(FollowUp).filter(FollowUp.id == followup_id).first()


def create_followup(db: Session, payload: FollowUpCreate):
    followup = FollowUp(**payload.model_dump())
    db.add(followup)
    db.commit()
    db.refresh(followup)
    return followup


def update_followup(db: Session, followup_id: str, payload: FollowUpUpdate):
    followup = get_followup_by_id(db, followup_id)
    if not followup:
        return None

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(followup, key, value)

    db.commit()
    db.refresh(followup)
    return followup