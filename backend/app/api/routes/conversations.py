from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.contact import Contact
from app.models.conversation import Conversation
from app.models.message import Message
from app.schemas.conversation import (
    ConversationResponse,
    ConversationDetailResponse,
    MessageCreate,
    MessageResponse,
)
from app.services.conversation_service import (
    get_conversations,
    get_conversation_by_id,
    get_messages_for_conversation,
    create_message,
)

router = APIRouter(prefix="/conversations", tags=["Conversations"])


@router.get("", response_model=list[ConversationResponse])
def list_conversations(db: Session = Depends(get_db)):
    return get_conversations(db)


@router.get("/seed-demo")
def seed_demo_conversations(db: Session = Depends(get_db)):
    contacts = db.query(Contact).all()
    created = 0

    for contact in contacts:
        existing = db.query(Conversation).filter(Conversation.contact_id == contact.id).first()
        if existing:
            continue

        convo = Conversation(
            contact_id=contact.id,
            channel="whatsapp",
            status="open",
            unread_count=1,
            last_message_preview=f"Hi {contact.full_name}, thanks for reaching out!",
            last_message_at=datetime.now(timezone.utc),
        )
        db.add(convo)
        db.flush()

        msg1 = Message(
            conversation_id=convo.id,
            sender_type="customer",
            message_text="Hi, I'm interested in your service.",
            message_type="text",
        )
        msg2 = Message(
            conversation_id=convo.id,
            sender_type="agent",
            message_text=f"Hi {contact.full_name}, thanks for reaching out! How can I help you?",
            message_type="text",
        )
        db.add(msg1)
        db.add(msg2)
        created += 1

    db.commit()
    return {"created_conversations": created}


@router.get("/{conversation_id}", response_model=ConversationDetailResponse)
def get_conversation(conversation_id: str, db: Session = Depends(get_db)):
    conversation = get_conversation_by_id(db, conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    messages = get_messages_for_conversation(db, conversation_id)

    return ConversationDetailResponse(
        id=conversation.id,
        contact_id=conversation.contact_id,
        channel=conversation.channel,
        status=conversation.status,
        unread_count=conversation.unread_count,
        last_message_preview=conversation.last_message_preview,
        last_message_at=conversation.last_message_at.isoformat() if conversation.last_message_at else None,
        created_at=conversation.created_at.isoformat() if conversation.created_at else "",
        updated_at=conversation.updated_at.isoformat() if conversation.updated_at else "",
        messages=[
            MessageResponse(
                id=msg.id,
                conversation_id=msg.conversation_id,
                sender_type=msg.sender_type,
                sender_id=msg.sender_id,
                message_text=msg.message_text,
                message_type=msg.message_type,
                created_at=msg.created_at.isoformat() if msg.created_at else "",
            )
            for msg in messages
        ],
    )


@router.post("/{conversation_id}/messages", response_model=MessageResponse)
def send_message(conversation_id: str, payload: MessageCreate, db: Session = Depends(get_db)):
    message = create_message(db, conversation_id, payload)
    if not message:
        raise HTTPException(status_code=404, detail="Conversation not found")

    return MessageResponse(
        id=message.id,
        conversation_id=message.conversation_id,
        sender_type=message.sender_type,
        sender_id=message.sender_id,
        message_text=message.message_text,
        message_type=message.message_type,
        created_at=message.created_at.isoformat() if message.created_at else "",
    )