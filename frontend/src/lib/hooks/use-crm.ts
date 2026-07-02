import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';
import { 
  MOCK_CONTACTS, 
  MOCK_CONVERSATIONS, 
  MOCK_MESSAGES, 
  MOCK_FOLLOWUPS, 
  MOCK_STATS 
} from '../../data/mock-data';
import { useState } from 'react';
import { Contact, Conversation, Message, FollowUp } from '@/types';

export function useContacts() {
  return useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: async () => {
      try {
        return await api.contacts.list() as Contact[];
      } catch (err) {
        console.warn('API error, falling back to mock contacts:', err);
        return MOCK_CONTACTS;
      }
    },
    initialData: MOCK_CONTACTS,
  });
}

export function useConversations() {
  return useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: async () => {
      try {
        return await api.conversations.list() as Conversation[];
      } catch (err) {
        console.warn('API error, falling back to mock conversations:', err);
        return MOCK_CONVERSATIONS;
      }
    },
    initialData: MOCK_CONVERSATIONS,
  });
}

export function useMessages(conversationId: string | null) {
  return useQuery<Message[]>({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      if (!conversationId) return [];
      try {
        return await api.conversations.getMessages(conversationId) as Message[];
      } catch (err) {
        console.warn(`API error, falling back to mock messages for ${conversationId}:`, err);
        return MOCK_MESSAGES[conversationId] || [];
      }
    },
    enabled: !!conversationId,
    initialData: conversationId ? (MOCK_MESSAGES[conversationId] || []) : [],
  });
}

export function useFollowUps() {
  const queryClient = useQueryClient();

  const query = useQuery<FollowUp[]>({
    queryKey: ['followups'],
    queryFn: async () => {
      try {
        return await api.followups.list() as FollowUp[];
      } catch (err) {
        console.warn('API error, falling back to mock follow-ups:', err);
        return MOCK_FOLLOWUPS;
      }
    },
    initialData: MOCK_FOLLOWUPS,
  });

  // Local state helper to make UI instant and interactive
  const [localFollowUps, setLocalFollowUps] = useState<FollowUp[]>(MOCK_FOLLOWUPS);

  const toggleMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        return await api.followups.toggleStatus(id);
      } catch (err) {
        console.warn('API error toggle, applying mock toggle locally:', err);
        setLocalFollowUps(prev => 
          prev.map(f => f.id === id ? { ...f, status: f.status === 'completed' ? 'pending' : 'completed' } : f)
        );
        return { success: true };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followups'] });
    }
  });

  return {
    ...query,
    data: query.data || localFollowUps,
    toggleStatus: toggleMutation.mutateAsync,
  };
}

export function useAnalyticsStats() {
  return useQuery<any>({
    queryKey: ['analytics-stats'],
    queryFn: async () => {
      try {
        return await api.analytics.getStats();
      } catch (err) {
        console.warn('API error, falling back to mock stats:', err);
        return MOCK_STATS;
      }
    },
    initialData: MOCK_STATS,
  });
}


export function useAISummary() {
  return useMutation({
    mutationFn: async (conversationId: string) => {
      try {
        return await api.ai.getSummary(conversationId);
      } catch (err) {
        console.warn('API AI Summary error, returning mock summary:', err);
        const conv = MOCK_CONVERSATIONS.find(c => c.id === conversationId);
        return { summary: conv?.summary || 'No summary available.' };
      }
    }
  });
}

export function useAIReplySuggestion() {
  return useMutation({
    mutationFn: async (conversationId: string) => {
      try {
        return await api.ai.getReplySuggestion(conversationId);
      } catch (err) {
        console.warn('API AI Reply error, returning mock reply:', err);
        return { suggestion: "Sure, let me check our documentation to see if timezone routing is supported. I will send you the guide shortly." };
      }
    }
  });
}
