from sqlalchemy import Column, String, ForeignKey
from app.db.session import Base


class ContactTag(Base):
    __tablename__ = "contact_tags"

    id = Column(String, primary_key=True, index=True)
    contact_id = Column(String, ForeignKey("contacts.id"), nullable=False)
    tag_id = Column(String, ForeignKey("tags.id"), nullable=False)