import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';
import { Contact, Conversation, Message, FollowUp } from '@/types';

// ---- Contacts ----

export function useContacts() {
  return useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: () => api.contacts.list(),
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      phone: string;
      email?: string;
      status?: string;
      priority?: string;
      lead_classification?: string;
    }) => api.contacts.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name?: string;
        phone?: string;
        email?: string;
        status?: string;
        priority?: string;
        lead_classification?: string;
      };
    }) => api.contacts.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

// ---- Conversations ----

export function useConversations() {
  return useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: () => api.conversations.list(),
    initialData: [],
  });
}

export function useMessages(conversationId: string | null) {
  return useQuery<Message[]>({
    queryKey: ['messages', conversationId],
    queryFn: () => {
      if (!conversationId) return Promise.resolve([]);
      return api.conversations.getMessages(conversationId);
    },
    enabled: !!conversationId,
    initialData: [],
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ conversationId, content }: { conversationId: string; content: string }) =>
      api.conversations.sendMessage(conversationId, content),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

// ---- Follow-ups ----

export function useFollowUps() {
  const queryClient = useQueryClient();

  const query = useQuery<FollowUp[]>({
    queryKey: ['followups'],
    queryFn: async () => {
      const followups = await api.followups.list();
      const contacts = await api.contacts.list();

      return followups.map((followup) => {
        const contact = contacts.find((c) => c.id === followup.contactId);
        return {
          ...followup,
          contactName: contact?.name || 'Unknown Contact',
        };
      });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (id: string) => {
      const current = query.data?.find((item) => item.id === id);
      const nextStatus = current?.status === 'completed' ? 'pending' : 'completed';
      return api.followups.updateStatus(id, nextStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followups'] });
    },
  });

  return {
    ...query,
    data: query.data || [],
    toggleStatus: toggleMutation.mutateAsync,
    isToggling: toggleMutation.isPending,
  };
}

export function useCreateFollowUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      contact_id: string;
      task: string;
      due_date: string;
      priority: string;
    }) => api.followups.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followups'] });
    },
  });
}

// ---- Analytics ----

export function useAnalyticsStats() {
  return useQuery<any>({
    queryKey: ['analytics-stats'],
    queryFn: () => api.analytics.getStats(),
    initialData: {
      totalLeads: 0,
      activeChats: 0,
      pendingFollowups: 0,
      conversionRate: 0,
      pipelineValue: '$0',
      chatsByDay: [],
      leadsByStatus: [],
    },
  });
}

// ---- AI ----

export function useAISummary() {
  return useMutation({
    mutationFn: (conversationId: string) => api.ai.getSummary(conversationId),
  });
}

export function useAIReplySuggestion() {
  return useMutation({
    mutationFn: (conversationId: string) => api.ai.getReplySuggestion(conversationId),
  });
}