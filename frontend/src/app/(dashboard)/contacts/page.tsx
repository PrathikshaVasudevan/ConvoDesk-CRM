'use client';

import React, { useState } from 'react';
import { useContacts } from '@/lib/hooks/use-crm';
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
  Tag as TagIcon
} from 'lucide-react';
import Link from 'next/link';

export default function ContactsPage() {
  const { data: contacts } = useContacts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredContacts = contacts.filter(contact => {
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
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === status
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
                <th className="px-6 py-4">Tags</th>
                <th className="px-6 py-4">Last Contacted</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
              {filteredContacts.map(contact => (
                <tr key={contact.id} className="hover:bg-zinc-900/20 transition-colors">
                  {/* Name and Basic Metadata */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={contact.avatarUrl} 
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
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                      contact.status === 'Won' 
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
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${
                        contact.leadClassification === 'Hot'
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
                    <span className={`font-semibold ${
                      contact.priority === 'High' ? 'text-red-400' : contact.priority === 'Medium' ? 'text-amber-400' : 'text-zinc-500'
                    }`}>
                      {contact.priority}
                    </span>
                  </td>

                  {/* Tags */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags?.map(t => (
                        <span key={t.id} className={`text-[8px] px-1.5 py-0.5 rounded font-semibold border ${t.color}`}>
                          {t.name}
                        </span>
                      ))}
                    </div>
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
                        className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 transition-all"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredContacts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                    No contacts match the search or filter settings.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
