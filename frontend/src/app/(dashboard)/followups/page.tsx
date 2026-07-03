'use client';

import React, { useState, useMemo } from 'react';
import { useFollowUps, useCreateFollowUp, useContacts } from '@/lib/hooks/use-crm';
import { Square, User, Plus, Clock, CheckCircle2, X } from 'lucide-react';

export default function FollowUpsPage() {
  const { data: followups = [], toggleStatus, isLoading } = useFollowUps();
  const { data: contacts = [] } = useContacts();
  const createFollowUp = useCreateFollowUp();

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    contact_id: '',
    task: '',
    due_date: '',
    priority: 'Medium',
  });

  // Enrich followups with contact names (mapFollowUp returns empty contactName)
  const enrichedFollowUps = useMemo(() => {
    if (!contacts.length) return followups;
    const contactMap = new Map(contacts.map((c) => [c.id, c.name]));
    return followups.map((item) => ({
      ...item,
      contactName: item.contactName || contactMap.get(item.contactId) || 'Unknown',
    }));
  }, [followups, contacts]);

  const filteredFollowUps = enrichedFollowUps.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const handleToggle = async (id: string) => {
    await toggleStatus(id);
  };

  const handleCreate = async () => {
    if (!form.contact_id || !form.task || !form.due_date) {
      alert('Please fill all fields');
      return;
    }

    try {
      await createFollowUp.mutateAsync(form);
      setShowModal(false);
      setForm({
        contact_id: '',
        task: '',
        due_date: '',
        priority: 'Medium',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to create follow-up');
    }
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-50">Follow-up Scheduler</h2>
          <p className="text-zinc-400 text-xs mt-0.5">
            Manage tasks, deadlines, and reminders synced with WhatsApp lead actions.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      <div className="flex gap-2 p-1.5 bg-zinc-900/30 border border-zinc-850 rounded-xl w-fit">
        {(['pending', 'completed', 'all'] as const).map((option) => (
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

      {isLoading && (
  <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 text-sm text-zinc-400">
    Loading follow-ups...
  </div>
)}

      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl overflow-hidden shadow-lg">
        <div className="divide-y divide-zinc-800/80">
          {filteredFollowUps.map((item) => {
            const isCompleted = item.status === 'completed';

            return (
              <div
                key={item.id}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-900/20 transition-all ${
                  isCompleted ? 'opacity-65' : ''
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
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
                    <p
                      className={`text-xs font-semibold text-zinc-200 leading-relaxed ${
                        isCompleted ? 'line-through text-zinc-500' : ''
                      }`}
                    >
                      {item.task}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-zinc-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" /> {item.contactName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Due {item.dueDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span
                    className={`px-2 py-0.5 text-[8px] font-bold rounded uppercase border ${getPriorityStyle(
                      item.priority ?? 'Medium'
                    )}`}
                  >
                    {item.priority ?? 'Medium'}
                  </span>
                </div>
              </div>
            );
          })}

          {!isLoading && filteredFollowUps.length === 0 && (
            <div className="p-12 text-center">
              {enrichedFollowUps.length === 0 ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-300">No follow-ups yet</p>
                    <p className="text-xs text-zinc-500 mt-1">Create your first follow-up task to stay on top of leads.</p>
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-all"
                  >
                    Add Task
                  </button>
                </div>
              ) : (
                <p className="text-zinc-500 text-xs">No {filter} follow-ups scheduled.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">Add Follow-up Task</h3>
              <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Contact</label>
                <select
  value={form.contact_id}
  onChange={(e) => setForm({ ...form, contact_id: e.target.value })}
  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none"
>
  <option value="">Select contact</option>
  {contacts.length === 0 ? (
    <option value="" disabled>No contacts available</option>
  ) : (
    contacts.map((contact: any) => (
      <option key={contact.id} value={contact.id}>
        {contact.name || contact.full_name || 'Unnamed Contact'}
      </option>
    ))
  )}
</select>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Task</label>
                <input
                  value={form.task}
                  onChange={(e) => setForm({ ...form, task: e.target.value })}
                  placeholder="Follow up about pricing"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Due Date</label>
                <input
                  type="date"
                  value={form.due_date}
                  onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Priority</label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <button
                onClick={handleCreate}
                disabled={createFollowUp.isPending}
                className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
              >
                {createFollowUp.isPending ? 'Creating...' : 'Create Follow-up'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}