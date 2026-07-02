from sqlalchemy.orm import Session
from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactUpdate


def get_contacts(db: Session):
    return db.query(Contact).order_by(Contact.created_at.desc()).all()


def get_contact_by_id(db: Session, contact_id: str):
    return db.query(Contact).filter(Contact.id == contact_id).first()


def create_contact(db: Session, payload: ContactCreate):
    contact = Contact(**payload.model_dump())
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact


def update_contact(db: Session, contact_id: str, payload: ContactUpdate):
    contact = get_contact_by_id(db, contact_id)
    if not contact:
        return None

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(contact, key, value)

    db.commit()
    db.refresh(contact)
    return contact