'use client';

import React, { useState } from 'react';
import { useFollowUps } from '@/lib/hooks/use-crm';
import { 
  CheckSquare, 
  Square, 
  Calendar, 
  User, 
  AlertCircle, 
  Plus, 
  Filter, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export default function FollowUpsPage() {
  const { data: followups, toggleStatus, isLoading } = useFollowUps();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('pending');

  const filteredFollowUps = followups.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const handleToggle = async (id: string) => {
    await toggleStatus(id);
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default:
        return 'text-zinc-500 bg-zinc-800 border-zinc-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-50">Follow-up Scheduler</h2>
          <p className="text-zinc-400 text-xs mt-0.5">Manage tasks, deadlines, and reminders synced with WhatsApp lead actions.</p>
        </div>
        <button
          className="flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      {/* Filter Options */}
      <div className="flex gap-2 p-1.5 bg-zinc-900/30 border border-zinc-850 rounded-xl w-fit">
        {(['pending', 'completed', 'all'] as const).map(option => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              filter === option
                ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/35'
                : 'text-zinc-450 hover:text-zinc-200'
            }`}
          >
            {option} Tasks
          </button>
        ))}
      </div>

      {/* Task List Table */}
      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl overflow-hidden shadow-lg">
        <div className="divide-y divide-zinc-800/80">
          {filteredFollowUps.map(item => {
            const isCompleted = item.status === 'completed';
            return (
              <div 
                key={item.id} 
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-900/20 transition-all ${
                  isCompleted ? 'opacity-65' : ''
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  {/* Status Toggle Box */}
                  <button 
                    onClick={() => handleToggle(item.id)}
                    className="mt-0.5 text-zinc-500 hover:text-emerald-400 transition-colors flex-shrink-0"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold text-zinc-200 leading-relaxed ${isCompleted ? 'line-through text-zinc-500' : ''}`}>
                      {item.task}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-zinc-500">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {item.contactName}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Due {item.dueDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className={`px-2 py-0.5 text-[8px] font-bold rounded uppercase border ${getPriorityStyle(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
              </div>
            );
          })}

          {filteredFollowUps.length === 0 && (
            <div className="p-12 text-center text-zinc-500">
              No {filter} follow-ups scheduled.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
