export interface Tag {
  id: string;
  name: string;
  color?: string | null;
  created_at?: string;
}

export type UserRole = "admin" | "sales" | "support";

export type LeadStage =
  | "new"
  | "contacted"
  | "qualified"
  | "interested"
  | "followup"
  | "converted"
  | "lost";

export type ContactPriority = "low" | "medium" | "high";

export type ConversationStatus = "open" | "pending" | "closed";

export type SenderType = "customer" | "agent" | "ai";

export type FollowUpStatus = "pending" | "completed" | "overdue";

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  avatar_url?: string | null;
  created_at: string;
}

// ==== API Response Interfaces ====

export interface ApiContact {
  id: string;
  full_name: string;
  phone: string;
  email?: string | null;
  company?: string | null;
  city?: string | null;
  lead_stage: string;
  priority: string;
  assigned_to?: string | null;
  source?: string | null;
  last_contacted_at?: string | null;
  next_followup_at?: string | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiConversation {
  id: string;
  contact_id: string;
  channel: string;
  status: string;
  unread_count: number;
  last_message_preview?: string | null;
  last_message_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiMessage {
  id: string;
  conversation_id: string;
  sender_type: string;
  sender_id?: string | null;
  message_text: string;
  message_type: string;
  created_at: string;
}

export interface ApiFollowUp {
  id: string;
  contact_id: string;
  assigned_to?: string | null;
  title: string;
  description?: string | null;
  due_at: string;
  status: string;
  created_at: string;
  completed_at?: string | null;
}

// ==== Frontend Normalized Models ====

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  company?: string | null;
  city?: string | null;
  status: string;
  priority: string;
  assignedTo?: string | null;
  source?: string | null;
  lastContacted?: string | null;
  nextFollowupAt?: string | null;
  avatarUrl?: string | null;
  leadClassification?: string | null;
  tags?: Tag[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderType: string;
  senderId?: string | null;
  content: string;
  messageType?: string;
  timestamp?: string;
  status?: string;
}

export interface Conversation {
  id: string;
  contactId: string;
  contactName: string;
  contactPhone: string;
  channel: string;
  status: ConversationStatus;
  unreadCount: number;
  lastMessage?: string | null;
  lastMessageTime?: string | null;
  summary?: string;
  prioritySuggestion?: string;
  leadIntent?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FollowUp {
  id: string;
  contactId: string;
  contactName: string;
  assignedTo?: string | null;
  task: string;
  description?: string | null;
  dueDate: string;
  status: string;
  priority?: string;
  createdAt?: string;
  completedAt?: string | null;
}

export interface Note {
  id: string;
  contactId: string;
  authorId?: string | null;
  content: string;
  createdAt?: string;
  agentName?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
}

export interface ContactTag {
  id: string;
  contact_id: string;
  tag_id: string;
}

export interface ContactWithMeta extends Contact {
  notes?: Note[];
  tags?: Tag[];
}

export interface ConversationWithMessages extends Conversation {
  messages: Message[];
  contact?: Contact;
}

export interface DashboardMetrics {
  totalLeads: number;
  activeChats: number;
  pendingFollowups: number;
  conversionRate: number;
  pipelineValue: string;
  chatsByDay: Array<{ name: string; count: number }>;
  leadsByStatus: Array<{ name: string; value: number }>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface CreateContactRequest {
  full_name: string;
  phone: string;
  email?: string;
  company?: string;
  city?: string;
  lead_stage?: LeadStage;
  priority?: ContactPriority;
  assigned_to?: string;
  source?: string;
  next_followup_at?: string;
}

export interface UpdateContactRequest {
  full_name?: string;
  phone?: string;
  email?: string;
  company?: string;
  city?: string;
  lead_stage?: LeadStage;
  priority?: ContactPriority;
  assigned_to?: string;
  source?: string;
  last_contacted_at?: string;
  next_followup_at?: string;
}

export interface CreateMessageRequest {
  message_text: string;
}

export interface CreateFollowUpRequest {
  contact_id: string;
  assigned_to?: string;
  title: string;
  description?: string;
  due_at: string;
  status?: FollowUpStatus;
}

export interface UpdateFollowUpRequest {
  title?: string;
  description?: string;
  due_at?: string;
  status?: FollowUpStatus;
  completed_at?: string | null;
}

export interface AIConversationRequest {
  conversation_id: string;
}

export interface AISummaryResponse {
  summary: string;
}

export interface AILeadClassificationResponse {
  intent: string;
  priority: string;
  suggested_stage: string;
}

export interface AIReplySuggestionResponse {
  reply: string;
}

// ==== Mapper Functions ====

export function mapContact(api: ApiContact): Contact {
  let status: Contact['status'] = 'New';

  if (api.lead_stage) {
    const stage = api.lead_stage.toLowerCase();

    if (stage === 'new') status = 'New';
    else if (stage === 'contacted') status = 'Contacted';
    else if (stage === 'qualified') status = 'Qualified';
    else if (stage === 'proposal' || stage === 'interested') status = 'Proposal';
    else if (stage === 'negotiation' || stage === 'followup') status = 'Negotiation';
    else if (stage === 'won' || stage === 'converted') status = 'Won';
    else if (stage === 'lost') status = 'Lost';
  }

  let priority: Contact['priority'] = 'Medium';
  if (api.priority) {
    const p = api.priority.toLowerCase();
    if (p === 'high') priority = 'High';
    else if (p === 'medium') priority = 'Medium';
    else if (p === 'low') priority = 'Low';
  }

  let leadClassification: Contact['leadClassification'] | undefined = undefined;
  if (api.lead_stage === 'interested') leadClassification = 'Warm';
  else if (api.lead_stage === 'followup') leadClassification = 'Hot';
  else if (api.lead_stage === 'qualified') leadClassification = 'Warm';

  return {
    id: api.id,
    name: api.full_name,
    phone: api.phone,
    email: api.email ?? undefined,
    status,
    priority,
    leadClassification,
    lastContacted: api.last_contacted_at ?? undefined,
    avatarUrl: api.avatar_url ?? undefined,
    company: api.company ?? undefined,
    city: api.city ?? undefined,
    assignedTo: api.assigned_to ?? undefined,
    source: api.source ?? undefined,
  };
}

export function mapConversation(api: ApiConversation): Conversation {
  return {
    id: api.id,
    contactId: api.contact_id,
    contactName: 'Loading...',
    contactPhone: '',
    channel: api.channel,
    status: api.status as ConversationStatus,
    unreadCount: api.unread_count,
    lastMessage: api.last_message_preview,
    lastMessageTime: api.last_message_at 
      ? new Date(api.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : '',
    createdAt: api.created_at,
    updatedAt: api.updated_at,
  };
}

export function mapMessage(api: ApiMessage): Message {
  return {
    id: api.id,
    conversationId: api.conversation_id,
    senderType: api.sender_type,
    senderId: api.sender_id,
    content: api.message_text,
    messageType: api.message_type,
    timestamp: api.created_at,
  };
}

export function mapFollowUp(api: ApiFollowUp): FollowUp {
  return {
    id: api.id,
    contactId: api.contact_id,
    contactName: '',
    assignedTo: api.assigned_to ?? undefined,
    task: api.title,
    description: api.description ?? undefined,
    dueDate: api.due_at,
    status: api.status === 'completed' ? 'completed' : 'pending',
    priority: 'Medium',
    createdAt: api.created_at,
    completedAt: api.completed_at ?? undefined,
  };
}