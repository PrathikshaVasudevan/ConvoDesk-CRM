import { Contact, Conversation, Message, FollowUp, Tag, Note } from '../types';

export const MOCK_TAGS: Tag[] = [
  { id: 't1', name: 'WhatsApp Lead', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50' },
  { id: 't2', name: 'Enterprise', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/50' },
  { id: 't3', name: 'Pricing Query', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/50' },
  { id: 't4', name: 'Demo Scheduled', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800/50' },
];

export const MOCK_CONTACTS: Contact[] = [
  {
    id: 'c1',
    name: 'Sarah Jenkins',
    phone: '+1 (555) 234-5678',
    email: 'sarah@apexcorp.com',
    status: 'Qualified',
    priority: 'High',
    leadClassification: 'Hot',
    lastContacted: '2026-07-02T18:30:00Z',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    tags: [MOCK_TAGS[0], MOCK_TAGS[1]],
  },
  {
    id: 'c2',
    name: 'David Chen',
    phone: '+65 9123 4567',
    email: 'david.chen@techvibe.io',
    status: 'New',
    priority: 'Medium',
    leadClassification: 'Warm',
    lastContacted: '2026-07-02T20:15:00Z',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    tags: [MOCK_TAGS[0], MOCK_TAGS[2]],
  },
  {
    id: 'c3',
    name: 'Elena Rostova',
    phone: '+44 20 7946 0958',
    email: 'elena@nordiccapital.com',
    status: 'Proposal',
    priority: 'High',
    leadClassification: 'Hot',
    lastContacted: '2026-07-02T15:45:00Z',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    tags: [MOCK_TAGS[0], MOCK_TAGS[1], MOCK_TAGS[3]],
  },
  {
    id: 'c4',
    name: 'Marcus Brody',
    phone: '+1 (555) 987-6543',
    email: 'marcus@adv-logistics.com',
    status: 'Contacted',
    priority: 'Low',
    leadClassification: 'Information Gathering',
    lastContacted: '2026-07-01T11:20:00Z',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    tags: [MOCK_TAGS[0]],
  },
  {
    id: 'c5',
    name: 'Amina Yousif',
    phone: '+971 4 321 0987',
    email: 'amina.y@gulfretail.ae',
    status: 'Negotiation',
    priority: 'High',
    leadClassification: 'Hot',
    lastContacted: '2026-07-02T19:00:00Z',
    avatarUrl: 'https://images.unsplash.com/photo-1534751516642-a131fed10495?w=150',
    tags: [MOCK_TAGS[0], MOCK_TAGS[1]],
  },
  {
    id: 'c6',
    name: 'Robert Miller',
    phone: '+1 (555) 765-4321',
    email: 'bob@millermedical.com',
    status: 'Won',
    priority: 'Medium',
    leadClassification: 'Hot',
    lastContacted: '2026-06-30T16:00:00Z',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    tags: [MOCK_TAGS[1], MOCK_TAGS[3]],
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    contactId: 'c1',
    contactName: 'Sarah Jenkins',
    contactPhone: '+1 (555) 234-5678',
    lastMessage: 'Thanks, I will review the API contract with my developer team tonight.',
    lastMessageTime: '18:30',
    unreadCount: 2,
    summary: 'Sarah is evaluating ConvoDesk for their support team (20 agents). She is satisfied with the webhook response speed and is currently reviewing the API pricing.',
    prioritySuggestion: 'High',
    leadIntent: 'Hot',
  },
  {
    id: 'conv2',
    contactId: 'c2',
    contactName: 'David Chen',
    contactPhone: '+65 9123 4567',
    lastMessage: 'Is it possible to auto-assign chats based on agent working hours?',
    lastMessageTime: '20:15',
    unreadCount: 1,
    summary: 'David wants to set up automated routing rules. He is checking availability of timezone-based chat routing.',
    prioritySuggestion: 'Medium',
    leadIntent: 'Warm',
  },
  {
    id: 'conv3',
    contactId: 'c3',
    contactName: 'Elena Rostova',
    contactPhone: '+44 20 7946 0958',
    lastMessage: 'Let us coordinate the signature on Monday afternoon.',
    lastMessageTime: '15:45',
    unreadCount: 0,
    summary: 'Elena has approved the pilot plan and the contract draft. The signature is set for Monday.',
    prioritySuggestion: 'High',
    leadIntent: 'Hot',
  },
  {
    id: 'conv4',
    contactId: 'c4',
    contactName: 'Marcus Brody',
    contactPhone: '+1 (555) 987-6543',
    lastMessage: 'Can you send over the generic product brochure?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    summary: 'Marcus represents an logistics firm. They are doing initial research and requested basic marketing brochures.',
    prioritySuggestion: 'Low',
    leadIntent: 'Information Gathering',
  },
  {
    id: 'conv5',
    contactId: 'c5',
    contactName: 'Amina Yousif',
    contactPhone: '+971 4 321 0987',
    lastMessage: 'We need the multi-currency invoice support. Is that in the settings?',
    lastMessageTime: '19:00',
    unreadCount: 0,
    summary: 'Amina is finalizing payment logistics. She requires multi-currency invoicing options for Dubai entities.',
    prioritySuggestion: 'High',
    leadIntent: 'Hot',
  }
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  conv1: [
    { id: 'm1_1', conversationId: 'conv1', senderId: 'c1', senderType: 'contact', content: 'Hi, I am interested in integrating ConvoDesk for our customer support team.', timestamp: '2026-07-02T18:00:00Z', status: 'read' },
    { id: 'm1_2', conversationId: 'conv1', senderId: 'agent1', senderType: 'agent', content: 'Hello Sarah! I can definitely help with that. What systems are you currently using for CRM?', timestamp: '2026-07-02T18:05:00Z', status: 'read' },
    { id: 'm1_3', conversationId: 'conv1', senderId: 'c1', senderType: 'contact', content: 'We are on HubSpot right now, but need a better WhatsApp workflow.', timestamp: '2026-07-02T18:10:00Z', status: 'read' },
    { id: 'm1_4', conversationId: 'conv1', senderId: 'agent1', senderType: 'agent', content: 'Great, we have a native HubSpot syncing tool that pushes all WhatsApp threads to the HubSpot contact timeline. Here is our developer doc: https://docs.convodesk.crm/api', timestamp: '2026-07-02T18:15:00Z', status: 'read' },
    { id: 'm1_5', conversationId: 'conv1', senderId: 'c1', senderType: 'contact', content: 'Thanks, I will review the API contract with my developer team tonight.', timestamp: '2026-07-02T18:30:00Z', status: 'delivered' },
    { id: 'm1_6', conversationId: 'conv1', senderId: 'c1', senderType: 'contact', content: 'Also, does the pricing include the Gemini AI summaries, or is that a separate add-on?', timestamp: '2026-07-02T18:31:00Z', status: 'delivered' },
  ],
  conv2: [
    { id: 'm2_1', conversationId: 'conv2', senderId: 'c2', senderType: 'contact', content: 'Hello, what are the automated routing capabilities of ConvoDesk?', timestamp: '2026-07-02T20:00:00Z', status: 'read' },
    { id: 'm2_2', conversationId: 'conv2', senderId: 'agent1', senderType: 'agent', content: 'Hi David! We support round-robin routing, priority-based routing, and keyword triggers to assign conversations to specific teams.', timestamp: '2026-07-02T20:10:00Z', status: 'read' },
    { id: 'm2_3', conversationId: 'conv2', senderId: 'c2', senderType: 'contact', content: 'Is it possible to auto-assign chats based on agent working hours?', timestamp: '2026-07-02T20:15:00Z', status: 'delivered' },
  ],
  conv3: [
    { id: 'm3_1', conversationId: 'conv3', senderId: 'agent1', senderType: 'agent', content: 'Hi Elena, I have updated the pilot agreement with the requested custom SLA clause. Let me know if that works.', timestamp: '2026-07-02T15:30:00Z', status: 'read' },
    { id: 'm3_2', conversationId: 'conv3', senderId: 'c3', senderType: 'contact', content: 'This looks perfect. Let us coordinate the signature on Monday afternoon.', timestamp: '2026-07-02T15:45:00Z', status: 'read' },
  ],
  conv4: [
    { id: 'm4_1', conversationId: 'conv4', senderId: 'c4', senderType: 'contact', content: 'Hi there, do you have any flyers or brochures summarizing your security features?', timestamp: '2026-07-01T11:00:00Z', status: 'read' },
    { id: 'm4_2', conversationId: 'conv4', senderId: 'agent1', senderType: 'agent', content: 'Sure Marcus, sending over our Security & Compliance Whitepaper and standard product overview PDF.', timestamp: '2026-07-01T11:15:00Z', status: 'read' },
    { id: 'm4_3', conversationId: 'conv4', senderId: 'c4', senderType: 'contact', content: 'Can you send over the generic product brochure?', timestamp: '2026-07-01T11:20:00Z', status: 'read' },
  ],
  conv5: [
    { id: 'm5_1', conversationId: 'conv5', senderId: 'c5', senderType: 'contact', content: 'We are ready to move forward. How do we trigger the invoice generation?', timestamp: '2026-07-02T18:45:00Z', status: 'read' },
    { id: 'm5_2', conversationId: 'conv5', senderId: 'agent1', senderType: 'agent', content: 'I can generate that from my end. Should I issue it in USD or AED?', timestamp: '2026-07-02T18:55:00Z', status: 'read' },
    { id: 'm5_3', conversationId: 'conv5', senderId: 'c5', senderType: 'contact', content: 'We need the multi-currency invoice support. Is that in the settings?', timestamp: '2026-07-02T19:00:00Z', status: 'read' },
  ]
};

export const MOCK_FOLLOWUPS: FollowUp[] = [
  {
    id: 'f1',
    contactId: 'c1',
    contactName: 'Sarah Jenkins',
    task: 'Send updated enterprise API pricing structure and custom SLA document',
    dueDate: '2026-07-03',
    status: 'pending',
    priority: 'High',
  },
  {
    id: 'f2',
    contactId: 'c2',
    contactName: 'David Chen',
    task: 'Follow up on timezone-based auto routing configuration instructions',
    dueDate: '2026-07-04',
    status: 'pending',
    priority: 'Medium',
  },
  {
    id: 'f3',
    contactId: 'c3',
    contactName: 'Elena Rostova',
    task: 'Send e-sign link via DocuSign for approved pilot contract',
    dueDate: '2026-07-06',
    status: 'pending',
    priority: 'High',
  },
  {
    id: 'f4',
    contactId: 'c5',
    contactName: 'Amina Yousif',
    task: 'Confirm invoice generation settings for AED billing address',
    dueDate: '2026-07-03',
    status: 'completed',
    priority: 'High',
  },
  {
    id: 'f5',
    contactId: 'c4',
    contactName: 'Marcus Brody',
    task: 'Schedule intro demo call with technical sales team',
    dueDate: '2026-07-10',
    status: 'pending',
    priority: 'Low',
  }
];

export const MOCK_NOTES: Record<string, Note[]> = {
  c1: [
    { id: 'n1', contactId: 'c1', content: 'Sarah leads support operations. They have 20 agents. Key pain point is WhatsApp API rate limits and slow synchronization with HubSpot.', createdAt: '2026-07-02T18:15:00Z', agentName: 'Alex Mercer' }
  ],
  c3: [
    { id: 'n2', contactId: 'c3', content: 'SLA clause updated to require 99.9% uptime. Elena approved. Custom enterprise pricing tier locked in.', createdAt: '2026-07-02T15:35:00Z', agentName: 'Alex Mercer' }
  ]
};

export const MOCK_STATS = {
  totalLeads: 124,
  activeChats: 18,
  pendingFollowups: 4,
  conversionRate: 24.5,
  pipelineValue: '$148,200',
  chatsByDay: [
    { name: 'Mon', count: 45 },
    { name: 'Tue', count: 58 },
    { name: 'Wed', count: 62 },
    { name: 'Thu', count: 70 },
    { name: 'Fri', count: 48 },
    { name: 'Sat', count: 24 },
    { name: 'Sun', count: 18 },
  ],
  leadsByStatus: [
    { name: 'New', value: 32, fill: 'var(--color-chart-1)' },
    { name: 'Contacted', value: 45, fill: 'var(--color-chart-2)' },
    { name: 'Qualified', value: 24, fill: 'var(--color-chart-3)' },
    { name: 'Proposal', value: 15, fill: 'var(--color-chart-4)' },
    { name: 'Negotiation', value: 8, fill: 'var(--color-chart-5)' },
  ],
};
