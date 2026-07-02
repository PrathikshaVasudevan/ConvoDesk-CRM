'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useConversations,
  useMessages,
  useSendMessage,
  useContacts,
  useAISummary,
  useAIReplySuggestion
} from '@/lib/hooks/use-crm';
import {
  Search,
  Send,
  Sparkles,
  User,
  Phone,
  Mail,
  Calendar,
  Plus,
  Bot,
  Flame,
  ShieldAlert,
  Clock,
  Loader2,
  FileText,
  PlusCircle,
  Check,
  MessageSquare
} from 'lucide-react';
import { Message, Conversation, Contact } from '@/types';

function InboxPageContent() {
  const searchParams = useSearchParams();
  const activeParam = searchParams.get('active');

  const { data: conversations = [] } = useConversations();
  const { data: contacts = [] } = useContacts();

  const [selectedConvId, setSelectedConvId] = useState<string>('');

  useEffect(() => {
    if (conversations.length === 0) return;

    if (activeParam) {
      const found = conversations.find((c) => c.contactId === activeParam);
      if (found) {
        setSelectedConvId(found.id);
        return;
      }
    }

    setSelectedConvId((prev) => prev || conversations[0].id);
  }, [activeParam, conversations]);

  const activeConv =
    conversations.find((c) => c.id === selectedConvId) ?? null;

  const activeContact =
    contacts.find((c) => c.id === activeConv?.contactId) ?? null;

  const { data: messages = [], isLoading: messagesLoading } = useMessages(
    selectedConvId || null
  );

  const sendMessageMutation = useSendMessage();
  const [newMessageText, setNewMessageText] = useState('');

  const aiSummaryMutation = useAISummary();
  const aiReplyMutation = useAIReplySuggestion();

  const [aiSummary, setAiSummary] = useState<string>('');
  const [aiReplySuggestion, setAiReplySuggestion] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset AI state on conversation change
  useEffect(() => {
    setAiSummary('');
    setAiReplySuggestion('');
  }, [selectedConvId]);

  // Handle AI summary trigger
  const handleGenerateSummary = async () => {
    if (!selectedConvId) return;
    const res = await aiSummaryMutation.mutateAsync(selectedConvId);
    setAiSummary(res.summary);
  };

  // Handle AI reply suggestion
  const handleGenerateReply = async () => {
    if (!selectedConvId) return;
    const res = await aiReplyMutation.mutateAsync(selectedConvId);
    setAiReplySuggestion(res.suggestion);
  };

  // Handle send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !selectedConvId) return;

    const text = newMessageText;
    setNewMessageText('');

    try {
      await sendMessageMutation.mutateAsync({
        conversationId: selectedConvId,
        content: text,
      });
    } catch (err) {
      console.warn('Failed to send message to API:', err);
    }
  };

  // Filter conversations based on search
  const filteredConversations = conversations.filter(c =>
    c.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8.5rem)] grid grid-cols-1 lg:grid-cols-12 border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-900/10 backdrop-blur-md animate-fade-in">

      {/* COLUMN 1: Conversation List (4/12 width) */}
      <div className="lg:col-span-4 border-r border-zinc-800/80 flex flex-col h-full bg-zinc-950/20">
        {/* Search */}
        <div className="p-4 border-b border-zinc-800/80">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search chat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto divide-y divide-zinc-850">
          {filteredConversations.length > 0 ? filteredConversations.map((conv) => {
            const isSelected = conv.id === selectedConvId;
            const contact = (contacts || []).find(c => c.id === conv.contactId);
            return (
              <button
                key={conv.id}
                onClick={() => {
                  setSelectedConvId(conv.id);
                }}
                className={`w-full p-4 flex items-start text-left hover:bg-zinc-900/30 transition-all ${isSelected ? 'bg-emerald-600/10 border-l-2 border-emerald-500' : ''
                  }`}
              >
                <div className="relative flex-shrink-0 mr-3">
                  <img
                    src={contact?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={conv.contactName}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-800"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-xs font-bold text-zinc-200 truncate">{conv.contactName}</h4>
                    <span className="text-[9px] text-zinc-500">{conv.lastMessageTime}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 truncate pr-6 leading-relaxed">{conv.lastMessage}</p>

                  {/* Tags & Badges */}
                  <div className="flex items-center gap-1.5 mt-2">
                    {conv.unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500 text-zinc-950 rounded-full">
                        {conv.unreadCount}
                      </span>
                    )}
                    {conv.leadIntent && (
                      <span className={`text-[8px] px-1.5 py-0.5 rounded font-semibold border ${conv.leadIntent === 'Hot'
                        ? 'bg-red-500/10 text-red-400 border-red-500/20'
                        : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                        }`}>
                        {conv.leadIntent}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          }) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-xs py-12">
              <MessageSquare className="w-6 h-6 mb-2 opacity-50" />
              No conversations found
            </div>
          )}
        </div>
      </div>

      {/* COLUMN 2: Message Thread (5/12 width) */}
      <div className="lg:col-span-5 flex flex-col h-full bg-zinc-950/40">
        {activeConv ? (
          <>
            {/* Active Contact Header */}
            <div className="px-6 py-3 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/20">
              <div className="flex items-center gap-3">
                <img
                  src={activeContact?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={activeConv.contactName}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xs font-bold text-zinc-100">{activeConv.contactName}</h3>
                  <span className="text-[9px] text-zinc-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> WhatsApp {activeConv.contactPhone}
                  </span>
                </div>
              </div>
            </div>

            {/* Message Pane */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messagesLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-xs">
                  <Loader2 className="w-5 h-5 animate-spin text-emerald-500 mb-2" />
                  <span>Loading messages...</span>
                </div>
              ) : messages.length > 0 ? messages.map((msg) => {
                const isAgent = msg.senderType === 'agent';
                return (
                  <div key={msg.id} className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs rounded-xl p-3.5 text-xs shadow-md border ${isAgent
                      ? 'bg-emerald-600/15 border-emerald-500/20 text-emerald-100 rounded-tr-none'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 rounded-tl-none'
                      }`}>
                      <p className="leading-relaxed">{msg.content}</p>
                      <div className="mt-1 flex justify-end items-center gap-1 text-[8px] text-zinc-500">
                        <span>
                          {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                        {isAgent && (
                          <span className="text-emerald-500">✓✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-xs">
                  <MessageSquare className="w-6 h-6 mb-2 opacity-50" />
                  <span>No messages yet</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Smart Suggested Reply Bar */}
            {aiReplySuggestion ? (
              <div className="mx-6 mb-2 p-3 bg-zinc-900 border border-emerald-500/20 rounded-lg animate-slide-up flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] text-emerald-400 font-semibold">
                  <span className="flex items-center gap-1"><Bot className="w-3.5 h-3.5" /> Suggested Reply</span>
                  <button
                    onClick={() => {
                      setNewMessageText(aiReplySuggestion);
                      setAiReplySuggestion('');
                    }}
                    className="text-[9px] bg-emerald-500/15 hover:bg-emerald-500/25 px-2 py-0.5 rounded flex items-center gap-0.5"
                  >
                    Use Draft <Check className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-[10px] text-zinc-300 italic">{aiReplySuggestion}</p>
              </div>
            ) : null}

            {/* Form Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-800/80 bg-zinc-900/20">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGenerateReply}
                  disabled={aiReplyMutation.isPending}
                  className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-emerald-400 transition-colors disabled:opacity-50"
                  title="Generate AI reply suggestion"
                >
                  {aiReplyMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  )}
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  className="flex-1 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={sendMessageMutation.isPending}
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-lg shadow-emerald-600/15 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
            <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-xs">Select a chat to begin</p>
          </div>
        )}
      </div>

      {/* COLUMN 3: Lead Context Panel (3/12 width) */}
      <div className="lg:col-span-3 border-l border-zinc-800/80 p-6 flex flex-col h-full bg-zinc-950/20 overflow-y-auto space-y-6">
        {activeContact ? (
          <>
            {/* Quick Profile */}
            <div className="text-center pb-6 border-b border-zinc-800/80">
              <img
                src={activeContact.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={activeContact.name}
                className="w-16 h-16 rounded-full object-cover mx-auto ring-2 ring-emerald-500/20 mb-3"
              />
              <h3 className="text-sm font-bold text-zinc-200">{activeContact.name}</h3>
              <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">{activeContact.status} Lead</p>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Contact Details</h4>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-zinc-500" />
                  <span>{activeContact.phone}</span>
                </div>
                {activeContact.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-zinc-500" />
                    <span className="truncate">{activeContact.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-500" />
                  <span>Priority: <span className="font-semibold text-emerald-400">{activeContact.priority}</span></span>
                </div>
              </div>
            </div>

            {/* AI Summary Block */}
            <div className="space-y-3 bg-zinc-900/30 border border-zinc-850 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Summary
                </h4>
                <button
                  onClick={handleGenerateSummary}
                  disabled={aiSummaryMutation.isPending}
                  className="text-[9px] text-zinc-400 hover:text-emerald-400 font-semibold disabled:opacity-50"
                >
                  {aiSummaryMutation.isPending ? 'Generating...' : 'Refresh'}
                </button>
              </div>

              {aiSummaryMutation.isPending ? (
                <div className="flex flex-col items-center justify-center py-4 gap-2">
                  <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                  <span className="text-[9px] text-zinc-500">Parsing message logs...</span>
                </div>
              ) : aiSummary ? (
                <p className="text-[10px] text-zinc-300 leading-relaxed italic">{aiSummary}</p>
              ) : activeConv?.summary ? (
                <p className="text-[10px] text-zinc-300 leading-relaxed italic">{activeConv.summary}</p>
              ) : (
                <button
                  onClick={handleGenerateSummary}
                  className="w-full flex items-center justify-center py-2 bg-emerald-600/10 hover:bg-emerald-600/25 border border-emerald-500/20 text-emerald-400 text-[10px] rounded-lg font-semibold transition-colors gap-1"
                >
                  <Bot className="w-3.5 h-3.5" /> Generate Lead Summary
                </button>
              )}
            </div>

            {/* Lead Intent & Priority */}
            {activeConv && (
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Lead Intel</h4>
                <div className="flex flex-wrap gap-2">
                  {activeConv.leadIntent && (
                    <span className={`text-[9px] px-2 py-0.5 rounded font-semibold border ${activeConv.leadIntent === 'Hot'
                      ? 'bg-red-500/10 text-red-400 border-red-500/25'
                      : activeConv.leadIntent === 'Warm'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                        : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                      }`}>
                      {activeConv.leadIntent === 'Hot' && <Flame className="w-3 h-3 inline text-red-500 animate-pulse mr-0.5" />}
                      {activeConv.leadIntent}
                    </span>
                  )}
                  {activeConv.prioritySuggestion && (
                    <span className="text-[9px] px-2 py-0.5 rounded font-semibold border bg-zinc-800 text-zinc-400 border-zinc-700">
                      Priority: {activeConv.prioritySuggestion}
                    </span>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-center">
            <User className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-xs">No profile context</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default function InboxPage() {
  return (
    <React.Suspense fallback={
      <div className="h-[calc(100vh-8.5rem)] flex flex-col items-center justify-center text-zinc-500 text-xs bg-zinc-950/20 border border-zinc-800/80 rounded-xl">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-500 mb-2" />
        <span>Loading conversations...</span>
      </div>
    }>
      <InboxPageContent />
    </React.Suspense>
  );
}
