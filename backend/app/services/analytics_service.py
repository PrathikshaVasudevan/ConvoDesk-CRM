from sqlalchemy.orm import Session
from app.models.contact import Contact
from app.models.conversation import Conversation
from app.models.followup import FollowUp


def get_dashboard_metrics(db: Session):
    total_contacts = db.query(Contact).count()
    active_conversations = db.query(Conversation).filter(Conversation.status == "open").count()
    converted_contacts = db.query(Contact).filter(Contact.lead_stage == "converted").count()
    pending_followups = db.query(FollowUp).filter(FollowUp.status == "pending").count()

    return {
        "total_contacts": total_contacts,
        "active_conversations": active_conversations,
        "converted_contacts": converted_contacts,
        "pending_followups": pending_followups,
        "lead_stage_distribution": [],
        "message_volume": [],
    }