import {
  type ApiContact,
  type ApiConversation,
  type ApiMessage,
  type ApiFollowUp,
  type Contact,
  type Conversation,
  type Message,
  type FollowUp,
  mapContact,
  mapConversation,
  mapMessage,
  mapFollowUp,
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  // Attach auth token if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('convodesk_token') : null;
  const authHeaders: Record<string, string> = {};
  if (token) {
    authHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
  const errorText = await response.text();
  console.error('API ERROR:', path, response.status, errorText);
  throw new Error(errorText || `API Error: ${response.status}`);
}

  return response.json() as Promise<T>;
}

function mapContactToApi(contact: {
  name?: string;
  phone?: string;
  email?: string;
  status?: string;
  priority?: string;
  lead_classification?: string;
}) {
  const statusMap: Record<string, string> = {
    New: 'new',
    Contacted: 'contacted',
    Qualified: 'qualified',
    Proposal: 'proposal',
    Negotiation: 'negotiation',
    Won: 'won',
    Lost: 'lost',
  };

  return {
    full_name: contact.name ?? '',
    phone: contact.phone ?? '',
    email: contact.email || null,
    lead_stage: statusMap[contact.status || 'New'] || 'new',
    priority: (contact.priority || 'Medium').toLowerCase(),
  };
}

export const api = {
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      return fetcher<{ access_token: string; token_type: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    },
  },
  contacts: {
    list: async (): Promise<Contact[]> => {
      const raw = await fetcher<ApiContact[]>('/contacts');
      return raw.map(mapContact);
    },
    get: async (id: string): Promise<Contact> => {
      const raw = await fetcher<ApiContact>(`/contacts/${id}`);
      return mapContact(raw);
    },
    create: async (contact: {
      name: string;
      phone: string;
      email?: string;
      status?: string;
      priority?: string;
      lead_classification?: string;
    }): Promise<Contact> => {
      const body = mapContactToApi(contact);
      const raw = await fetcher<ApiContact>('/contacts', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      return mapContact(raw);
    },
    update: async (id: string, contact: {
      name?: string;
      phone?: string;
      email?: string;
      status?: string;
      priority?: string;
      lead_classification?: string;
    }): Promise<Contact> => {
      const body = mapContactToApi(contact);
      const raw = await fetcher<ApiContact>(`/contacts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
      return mapContact(raw);
    },
  },
  conversations: {
    list: async (): Promise<Conversation[]> => {
      const raw = await fetcher<ApiConversation[]>('/conversations');
      return raw.map(mapConversation);
    },
    get: async (id: string): Promise<Conversation> => {
      const raw = await fetcher<ApiConversation>(`/conversations/${id}`);
      return mapConversation(raw);
    },
    getMessages: async (id: string): Promise<Message[]> => {
      // Query individual conversation which contains message array
      const raw = await fetcher<{ messages: ApiMessage[] }>(`/conversations/${id}`);
      return (raw.messages || []).map(mapMessage);
    },
    sendMessage: async (id: string, content: string): Promise<Message> => {
      const raw = await fetcher<ApiMessage>(`/conversations/${id}/messages`, {
        method: 'POST',
        body: JSON.stringify({ message_text: content }),
      });
      return mapMessage(raw);
    },
  },
  followups: {
    list: async (): Promise<FollowUp[]> => {
      const raw = await fetcher<ApiFollowUp[]>('/followups');
      return raw.map(mapFollowUp);
    },
    create: async (followup: {
  contact_id: string;
  task: string;
  due_date: string;
  priority: string;
}): Promise<FollowUp> => {
  const raw = await fetcher<ApiFollowUp>('/followups', {
    method: 'POST',
    body: JSON.stringify({
      contact_id: followup.contact_id,
      title: followup.task,
      due_at: followup.due_date,
      priority: followup.priority.toLowerCase(),
      status: 'pending',
    }),
  });
  return mapFollowUp(raw);
},
    updateStatus: async (id: string, status: string): Promise<FollowUp> => {
      const raw = await fetcher<ApiFollowUp>(`/followups/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      return mapFollowUp(raw);
    },
  },
  analytics: {
    getStats: async () => {
      return fetcher<any>('/analytics/dashboard');
    },
  },
  ai: {
    getSummary: async (conversationId: string) => {
      return fetcher<{ summary: string }>('/ai/summarize-conversation', {
        method: 'POST',
        body: JSON.stringify({ conversation_id: conversationId }),
      });
    },
    getReplySuggestion: async (conversationId: string) => {
      const res = await fetcher<{ reply: string }>('/ai/suggest-reply', {
        method: 'POST',
        body: JSON.stringify({ conversation_id: conversationId }),
      });
      return { suggestion: res.reply };
    },
  },
};
