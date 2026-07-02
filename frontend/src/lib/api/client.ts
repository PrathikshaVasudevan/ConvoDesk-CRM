const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API Error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  auth: {
    login: async (credentials: any) => {
      return fetcher<{ access_token: string; token_type: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    },
  },
  contacts: {
    list: async () => {
      return fetcher<any[]>('/contacts');
    },
    get: async (id: string) => {
      return fetcher<any>(`/contacts/${id}`);
    },
    create: async (contact: any) => {
      return fetcher<any>('/contacts', {
        method: 'POST',
        body: JSON.stringify(contact),
      });
    },
    update: async (id: string, contact: any) => {
      return fetcher<any>(`/contacts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(contact),
      });
    },
  },
  conversations: {
    list: async () => {
      return fetcher<any[]>('/conversations');
    },
    get: async (id: string) => {
      return fetcher<any>(`/conversations/${id}`);
    },
    getMessages: async (id: string) => {
      return fetcher<any[]>(`/conversations/${id}/messages`);
    },
    sendMessage: async (id: string, content: string) => {
      return fetcher<any>(`/conversations/${id}/messages`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
    },
  },
  followups: {
    list: async () => {
      return fetcher<any[]>('/followups');
    },
    create: async (followup: any) => {
      return fetcher<any>('/followups', {
        method: 'POST',
        body: JSON.stringify(followup),
      });
    },
    toggleStatus: async (id: string) => {
      return fetcher<any>(`/followups/${id}/toggle`, {
        method: 'PATCH',
      });
    },
  },
  analytics: {
    getStats: async () => {
      return fetcher<any>('/analytics/stats');
    },
  },
  ai: {
    getSummary: async (conversationId: string) => {
      return fetcher<{ summary: string }>(`/ai/summary/${conversationId}`);
    },
    getReplySuggestion: async (conversationId: string) => {
      return fetcher<{ suggestion: string }>(`/ai/reply-suggestion/${conversationId}`);
    },
  },
};
