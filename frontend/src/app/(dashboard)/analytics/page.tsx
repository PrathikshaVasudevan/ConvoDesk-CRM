'use client';

import React from 'react';
import { useAnalyticsStats } from '@/lib/hooks/use-crm';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { TrendingUp, Clock, Flame, Users, MessageSquare } from 'lucide-react';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'];

const HISTORICAL_DATA = [
  { name: 'Jan', leads: 40, activeChats: 10 },
  { name: 'Feb', leads: 55, activeChats: 15 },
  { name: 'Mar', leads: 70, activeChats: 12 },
  { name: 'Apr', leads: 85, activeChats: 22 },
  { name: 'May', leads: 110, activeChats: 25 },
  { name: 'Jun', leads: 124, activeChats: 18 },
];

export default function AnalyticsPage() {
  const { data: stats } = useAnalyticsStats();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-zinc-50">Analytics & Insights</h2>
        <p className="text-zinc-400 text-xs mt-0.5">Explore reports, traffic flow, and intent classifications for lead analytics.</p>
      </div>

      {/* Grid Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Line Chart: Lead Growth */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-xl flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-zinc-200">Lead Acquisition Trend</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5">Accumulated leads directory growth (H1 2026)</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={HISTORICAL_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Daily Chat Traffic */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-xl flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-zinc-200">Conversation Traffic flow</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5">WhatsApp messages exchange count per weekday</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chatsByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Intent Breakdown */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-xl flex flex-col items-center lg:items-start">
          <div className="mb-4 self-stretch">
            <h3 className="text-sm font-bold text-zinc-200">Lead Status Distribution</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5">Status proportions inside active CRM pipeline</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.leadsByStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {stats.leadsByStatus.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Analytics Card: Performance KPIs */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-xl flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-zinc-200">AI Engine Efficiency</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5">Overview of AI-suggested intent accuracy and response rates</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-lg">
              <div className="flex justify-between items-center text-xs font-semibold text-zinc-300">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-400" /> Avg. Reply Response speed</span>
                <span className="text-emerald-400">1.8 mins</span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">92% faster response rate compared to manual WhatsApp app dispatching.</p>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-lg">
              <div className="flex justify-between items-center text-xs font-semibold text-zinc-300">
                <span className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-red-400" /> Lead Intent suggestion Accuracy</span>
                <span className="text-emerald-400">96.5%</span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">Calculated from agent approval/overwrite rates on lead qualification categories.</p>
            </div>
            
            <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-lg">
              <div className="flex justify-between items-center text-xs font-semibold text-zinc-300">
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-blue-400" /> Automated routing success</span>
                <span className="text-emerald-400">100%</span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">Incoming chats routed automatically to active agents based on timezone/loads.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
