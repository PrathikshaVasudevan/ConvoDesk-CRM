'use client';

import React, { useState } from 'react';
import { useContacts, useCreateContact, useUpdateContact } from '@/lib/hooks/use-crm';
import {
  Search,
  Filter,
  MessageSquare,
  Mail,
  Phone,
  MoreVertical,
  Plus,
  Flame,
  ArrowUpDown,
  Tag as TagIcon,
  X,
  Loader2,
  Edit3
} from 'lucide-react';
import Link from 'next/link';
import { Contact } from '@/types';

export default function ContactsPage() {
  const { data: contacts, isLoading } = useContacts();
  const createMutation = useCreateContact();
  const updateMutation = useUpdateContact();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);

  const filteredContacts = (contacts || []).filter(contact => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery) ||
      (contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatus === 'All' || contact.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const statuses = ['All', 'New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-50">Contacts & Leads</h2>
          <p className="text-zinc-400 text-xs mt-0.5">Manage your central directory of customers and WhatsApp leads.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create Contact
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-900/30 p-4 border border-zinc-850 rounded-xl">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search contacts by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Status Horizontal Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mr-2 hidden lg:inline">Status:</span>
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedStatus === status
                ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/35'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Table View */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800/80 bg-zinc-900/20 text-zinc-400 font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Intent</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Last Contacted</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    <Loader2 className="w-5 h-5 animate-spin text-emerald-500 mx-auto mb-2" />
                    Loading contacts...
                  </td>
                </tr>
              ) : filteredContacts.map(contact => (
                <tr key={contact.id} className="hover:bg-zinc-900/20 transition-colors">
                  {/* Name and Basic Metadata */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={contact.avatarUrl || '/avatar.svg'}
                        alt={contact.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-zinc-800"
                      />
                      <div>
                        <h4 className="font-bold text-zinc-200">{contact.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-zinc-500">
                          <span className="flex items-center gap-0.5"><Phone className="w-2.5 h-2.5" /> {contact.phone}</span>
                          {contact.email && (
                            <span className="flex items-center gap-0.5"><Mail className="w-2.5 h-2.5" /> {contact.email}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${contact.status === 'Won'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : contact.status === 'Lost'
                        ? 'bg-red-500/10 text-red-400 border-red-500/20'
                        : contact.status === 'New'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-zinc-800 border-zinc-750 text-zinc-400'
                      }`}>
                      {contact.status}
                    </span>
                  </td>

                  {/* Intent classification */}
                  <td className="px-6 py-4">
                    {contact.leadClassification && (
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${contact.leadClassification === 'Hot'
                        ? 'bg-red-500/10 text-red-400 border-red-500/25 flex items-center gap-0.5'
                        : contact.leadClassification === 'Warm'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}>
                        {contact.leadClassification === 'Hot' && <Flame className="w-3 h-3 text-red-500 inline animate-pulse" />}
                        {contact.leadClassification}
                      </span>
                    )}
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${contact.priority === 'High' ? 'text-red-400' : contact.priority === 'Medium' ? 'text-amber-400' : 'text-zinc-500'
                      }`}>
                      {contact.priority}
                    </span>
                  </td>

                  {/* Last Contacted */}
                  <td className="px-6 py-4 text-zinc-500">
                    {contact.lastContacted
                      ? new Date(contact.lastContacted).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                      : 'Never'}
                  </td>

                  {/* Action trigger links */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/inbox?active=${contact.id}`}
                        className="p-1.5 hover:bg-emerald-600/10 border border-transparent hover:border-emerald-500/20 rounded-lg text-zinc-400 hover:text-emerald-400 transition-all"
                        title="Chat with lead"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setEditContact(contact)}
                        className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 transition-all"
                        title="Edit contact"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!isLoading && filteredContacts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    {(contacts || []).length === 0 ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <Plus className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-zinc-300">No contacts yet</p>
                          <p className="text-xs text-zinc-500 mt-1">Add your first contact to get started.</p>
                        </div>
                        <button
                          onClick={() => setShowCreateModal(true)}
                          className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-all"
                        >
                          Create Contact
                        </button>
                      </div>
                    ) : (
                      <p className="text-zinc-500 text-xs">No contacts match the search or filter settings.</p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Contact Modal */}
      {showCreateModal && (
        <ContactFormModal
          title="Create New Contact"
          onClose={() => setShowCreateModal(false)}
          onSubmit={async (data) => {
            await createMutation.mutateAsync(data);
            setShowCreateModal(false);
          }}
          isLoading={createMutation.isPending}
        />
      )}

      {/* Edit Contact Modal */}
      {editContact && (
        <ContactFormModal
          title="Edit Contact"
          initialData={editContact}
          onClose={() => setEditContact(null)}
          onSubmit={async (data) => {
            await updateMutation.mutateAsync({ id: editContact.id, data });
            setEditContact(null);
          }}
          isLoading={updateMutation.isPending}
        />
      )}
    </div>
  );
}

// ---- Contact Form Modal ----

interface ContactFormModalProps {
  title: string;
  initialData?: Contact;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
}

function ContactFormModal({ title, initialData, onClose, onSubmit, isLoading }: ContactFormModalProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [status, setStatus] = useState(initialData?.status || 'New');
  const [priority, setPriority] = useState(initialData?.priority || 'Medium');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !phone.trim()) {
      setError('Name and phone are required.');
      return;
    }
    try {
      await onSubmit({ name, phone, email: email || undefined, status, priority });
    } catch (err: any) {
      setError(err.message || 'Failed to save contact');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-zinc-100">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Phone *</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                {['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                {['High', 'Medium', 'Low'].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800/80">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isLoading} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-all disabled:opacity-50 flex items-center gap-1.5">
              {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              {initialData ? 'Save Changes' : 'Create Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
