from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models.conversation import Conversation
from app.models.message import Message
from app.schemas.conversation import MessageCreate


def get_conversations(db: Session):
    return db.query(Conversation).order_by(Conversation.updated_at.desc()).all()


def get_conversation_by_id(db: Session, conversation_id: str):
    return db.query(Conversation).filter(Conversation.id == conversation_id).first()


def get_messages_for_conversation(db: Session, conversation_id: str):
    return (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.asc())
        .all()
    )


def create_message(db: Session, conversation_id: str, payload: MessageCreate):
    conversation = get_conversation_by_id(db, conversation_id)
    if not conversation:
        return None

    message = Message(
        conversation_id=conversation_id,
        sender_type="agent",
        message_text=payload.message_text,
        message_type="text",
    )
    db.add(message)

    now = datetime.now(timezone.utc)
    conversation.last_message_preview = payload.message_text
    conversation.last_message_at = now
    conversation.updated_at = now

    db.commit()
    db.refresh(message)
    return message