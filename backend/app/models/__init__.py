from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.session import Base

class User(Base):
  __tablename__ = "users"
  
  id = Column(String, primary_key=True, index=True)
  email = Column(String, unique=True, index=True, nullable=False)
  hashed_password = Column(String, nullable=False)
  name = Column(String, nullable=True)
  is_active = Column(Boolean, default=True)

class Tag(Base):
  __tablename__ = "tags"
  
  id = Column(String, primary_key=True, index=True)
  name = Column(String, unique=True, index=True, nullable=False)
  color = Column(String, nullable=False)

class Contact(Base):
  __tablename__ = "contacts"
  
  id = Column(String, primary_key=True, index=True)
  name = Column(String, nullable=False)
  phone = Column(String, unique=True, index=True, nullable=False)
  email = Column(String, nullable=True)
  status = Column(String, default="New") # New, Contacted, Qualified, Proposal, Negotiation, Won, Lost
  priority = Column(String, default="Medium") # High, Medium, Low
  lead_classification = Column(String, nullable=True) # Hot, Warm, Cold
  last_contacted = Column(DateTime, default=lambda: datetime.now(timezone.utc))
  
  notes = relationship("Note", back_populates="contact", cascade="all, delete-orphan")
  conversations = relationship("Conversation", back_populates="contact", cascade="all, delete-orphan")

class Conversation(Base):
  __tablename__ = "conversations"
  
  id = Column(String, primary_key=True, index=True)
  contact_id = Column(String, ForeignKey("contacts.id"), nullable=False)
  unread_count = Column(Integer, default=0)
  summary = Column(Text, nullable=True)
  priority_suggestion = Column(String, nullable=True)
  lead_intent = Column(String, nullable=True)
  
  contact = relationship("Contact", back_populates="conversations")
  messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")

class Message(Base):
  __tablename__ = "messages"
  
  id = Column(String, primary_key=True, index=True)
  conversation_id = Column(String, ForeignKey("conversations.id"), nullable=False)
  sender_id = Column(String, nullable=False)
  sender_type = Column(String, nullable=False) # contact, agent, system
  content = Column(Text, nullable=False)
  timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
  status = Column(String, default="sent") # sent, delivered, read
  
  conversation = relationship("Conversation", back_populates="messages")

class FollowUp(Base):
  __tablename__ = "followups"
  
  id = Column(String, primary_key=True, index=True)
  contact_id = Column(String, ForeignKey("contacts.id"), nullable=False)
  task = Column(String, nullable=False)
  due_date = Column(DateTime, nullable=False)
  status = Column(String, default="pending") # pending, completed
  priority = Column(String, default="Medium") # High, Medium, Low

class Note(Base):
  __tablename__ = "notes"
  
  id = Column(String, primary_key=True, index=True)
  contact_id = Column(String, ForeignKey("contacts.id"), nullable=False)
  content = Column(Text, nullable=False)
  created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
  agent_name = Column(String, nullable=False)
  
  contact = relationship("Contact", back_populates="notes")
