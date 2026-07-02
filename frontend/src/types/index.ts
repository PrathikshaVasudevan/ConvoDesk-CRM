export interface Tag {
  id: string;
  name: string;
  color: string; // hex or tailwind color class
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
export type LeadPriority = 'High' | 'Medium' | 'Low';
export type LeadIntent = 'Warm' | 'Cold' | 'Hot' | 'Information Gathering' | 'Not Interested';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: LeadStatus;
  priority: LeadPriority;
  leadClassification?: LeadIntent;
  lastContacted?: string;
  avatarUrl?: string;
  tags?: Tag[];
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'contact' | 'agent' | 'system';
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  contactId: string;
  contactName: string;
  contactPhone: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  summary?: string;
  prioritySuggestion?: LeadPriority;
  leadIntent?: LeadIntent;
}

export interface FollowUp {
  id: string;
  contactId: string;
  contactName: string;
  task: string;
  dueDate: string;
  status: 'pending' | 'completed';
  priority: LeadPriority;
}

export interface Note {
  id: string;
  contactId: string;
  content: string;
  createdAt: string;
  agentName: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
