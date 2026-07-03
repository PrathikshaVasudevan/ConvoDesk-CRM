'use client';

import React from 'react';
import { useAnalyticsStats, useContacts } from '@/lib/hooks/use-crm';
import {
  Users,
  MessageSquare,
  CheckSquare,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Clock,
  ChevronRight,
  Flame,
  AlertCircle,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'];

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useAnalyticsStats();
  const { data: contacts, isLoading: contactsLoading } = useContacts();

  // Pick top 4 recent contacts
  const recentContacts = (contacts || []).slice(0, 4);

  const chatsByDay = stats?.chatsByDay || [];
  const leadsByStatus = stats?.leadsByStatus || [];

  if (statsLoading && contactsLoading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-zinc-500 text-xs">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-500 mb-2" />
        <span>Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-50">Welcome back, Alex!</h2>
          <p className="text-zinc-400 text-xs mt-0.5">Here is an overview of your WhatsApp leads & activities today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/contacts"
            className="flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Lead
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Leads */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-xl hover:border-zinc-700/80 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Leads</span>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-zinc-50">{stats?.totalLeads ?? 0}</span>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              +12% <TrendingUp className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-2">v.s. last month</p>
        </div>

        {/* Active Chats */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-xl hover:border-zinc-700/80 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Active Chats</span>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 relative">
              <MessageSquare className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-zinc-50">{stats?.activeChats ?? 0}</span>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
              3 new replies
            </span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-2">Avg. reply speed: 1.8 mins</p>
        </div>

        {/* Pending Followups */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-xl hover:border-zinc-700/80 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Follow-ups Due</span>
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-zinc-50">{stats?.pendingFollowups ?? 0}</span>
            <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <AlertCircle className="w-3 h-3" /> 2 critical
            </span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-2">1 scheduled for this afternoon</p>
        </div>

        {/* Pipeline Value */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-xl hover:border-zinc-700/80 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Pipeline Value</span>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-zinc-50">{stats?.pipelineValue ?? '$0'}</span>
            <span className="text-[10px] text-purple-400 font-semibold bg-purple-500/10 px-1.5 py-0.5 rounded">
              {stats?.conversionRate ?? 0}% win rate
            </span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-2">Calculated from active deals</p>
        </div>
      </div>

      {/* Visual Content: Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat traffic Bar Chart */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold text-zinc-200">Chat Interaction Flow</h3>
              <p className="text-[10px] text-zinc-500 mt-0.5">Number of messages sent/received per day</p>
            </div>
          </div>
          <div className="h-64 w-full">
            {chatsByDay.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chatsByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                    labelStyle={{ color: '#a1a1aa', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-500 text-xs">No chat data yet</div>
            )}
          </div>
        </div>

        {/* Lead stages distribution Pie Chart */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-200">Lead Status Pipeline</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5">Distribution of leads in pipeline</p>
          </div>
          <div className="h-48 w-full flex justify-center items-center relative my-4">
            {leadsByStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadsByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {leadsByStatus.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-zinc-500 text-xs">No pipeline data</div>
            )}
            {/* Center Label */}
            {leadsByStatus.length > 0 && (
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-zinc-100">{stats?.totalLeads ?? 0}</span>
                <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest">Leads</span>
              </div>
            )}
          </div>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {leadsByStatus.map((entry: any, index: number) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="truncate">{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leads Activity Panel */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-800/80 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-200">Recent Customer Activity</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5">Contacts that interacted via WhatsApp recently</p>
          </div>
          <Link href="/contacts" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-0.5 group">
            View All <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="divide-y divide-zinc-800/80">
          {recentContacts.length > 0 ? recentContacts.map((contact) => (
            <div key={contact.id} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-900/20 transition-all">
              <div className="flex items-center gap-3">
                <img
                  src={contact.avatarUrl || '/avatar.svg'}
                  alt={contact.name}
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-800"
                />
                <div>
                  <h4 className="text-xs font-semibold text-zinc-100">{contact.name}</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{contact.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Intent classification */}
                {contact.leadClassification && (
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${contact.leadClassification === 'Hot'
                      ? 'bg-red-500/10 text-red-400 border-red-500/25 flex items-center gap-0.5'
                      : contact.leadClassification === 'Warm'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}>
                    {contact.leadClassification === 'Hot' && <Flame className="w-3 h-3 inline text-red-500 animate-pulse" />}
                    {contact.leadClassification}
                  </span>
                )}

                {/* Lead Status */}
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-750 text-zinc-300 font-medium">
                  {contact.status}
                </span>

                {/* Last active time */}
                <div className="hidden sm:flex items-center text-[10px] text-zinc-500 gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{contact.lastContacted ? new Date(contact.lastContacted).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</span>
                </div>

                <Link
                  href={`/inbox?active=${contact.id}`}
                  className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )) : (
            <div className="px-6 py-12 text-center text-zinc-500 text-xs">
              No contacts yet. Add your first lead to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
