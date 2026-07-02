from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.contact import ContactCreate, ContactUpdate, ContactResponse
from app.services.contact_service import (
    get_contacts,
    get_contact_by_id,
    create_contact,
    update_contact,
)

router = APIRouter(prefix="/contacts", tags=["Contacts"])


@router.get("", response_model=list[ContactResponse])
def list_contacts(db: Session = Depends(get_db)):
    return get_contacts(db)


@router.get("/{contact_id}", response_model=ContactResponse)
def get_contact(contact_id: str, db: Session = Depends(get_db)):
    contact = get_contact_by_id(db, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@router.post("", response_model=ContactResponse)
def add_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    return create_contact(db, payload)


@router.put("/{contact_id}", response_model=ContactResponse)
def edit_contact(contact_id: str, payload: ContactUpdate, db: Session = Depends(get_db)):
    contact = update_contact(db, contact_id, payload)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact