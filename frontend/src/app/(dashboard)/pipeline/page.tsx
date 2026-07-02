'use client';

import React from 'react';
import { useContacts } from '@/lib/hooks/use-crm';
import { 
  Flame, 
  MessageSquare, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

const STAGES = [
  { name: 'New', color: 'border-t-blue-500 bg-blue-500/5' },
  { name: 'Contacted', color: 'border-t-amber-500 bg-amber-500/5' },
  { name: 'Qualified', color: 'border-t-purple-500 bg-purple-500/5' },
  { name: 'Proposal', color: 'border-t-pink-500 bg-pink-500/5' },
  { name: 'Negotiation', color: 'border-t-indigo-500 bg-indigo-500/5' },
  { name: 'Won', color: 'border-t-emerald-500 bg-emerald-500/5' },
];

export default function PipelinePage() {
  const { data: contacts } = useContacts();

  // Helper to assign a mock deal value based on name length/hash
  const getMockValue = (name: string) => {
    const val = (name.charCodeAt(0) * 123) % 25 + 5; // $5k to $30k
    return `$${val},000`;
  };

  return (
    <div className="space-y-6 h-full flex flex-col overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-50">Sales Pipeline</h2>
          <p className="text-zinc-400 text-xs mt-0.5">Track deal progress, values, and stage transitions of your WhatsApp leads.</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-zinc-300 font-medium">Pipeline Value: <strong className="text-zinc-50">$148,200</strong></span>
          </div>
        </div>
      </div>

      {/* Kanban Board Scrolling View */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 h-[calc(100vh-14.5rem)] min-w-[1200px]">
          {STAGES.map(stage => {
            const stageLeads = contacts.filter(c => c.status === stage.name);
            const totalValue = stageLeads.reduce((acc, lead) => {
              const numVal = parseInt(getMockValue(lead.name).replace(/[^0-9]/g, ''), 10);
              return acc + numVal;
            }, 0);

            return (
              <div 
                key={stage.name} 
                className="flex-1 min-w-[220px] max-w-[280px] flex flex-col bg-zinc-900/20 border border-zinc-850 rounded-xl"
              >
                {/* Stage header */}
                <div className={`p-4 border-t-2 ${stage.color} border-b border-zinc-850 flex items-center justify-between rounded-t-xl bg-zinc-900/40`}>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-200">{stage.name}</h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">${totalValue.toLocaleString()},000 total</p>
                  </div>
                  <span className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 text-zinc-400 text-[10px] font-bold rounded-full">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Deal Cards Container */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {stageLeads.map(lead => (
                    <div 
                      key={lead.id}
                      className="bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800/80 p-3.5 rounded-lg shadow-sm hover:border-zinc-700/80 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xs font-bold text-zinc-200 truncate group-hover:text-emerald-400 transition-colors">{lead.name}</h4>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded font-semibold border ${
                          lead.priority === 'High' 
                            ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                            : lead.priority === 'Medium'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-zinc-800 text-zinc-500 border-zinc-750'
                        }`}>
                          {lead.priority}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] text-zinc-400 mb-3">
                        <DollarSign className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="font-semibold text-zinc-300">{getMockValue(lead.name)}</span>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-zinc-800/40">
                        {lead.leadClassification ? (
                          <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold border flex items-center gap-0.5 ${
                            lead.leadClassification === 'Hot'
                              ? 'bg-red-500/10 text-red-400 border-red-500/25'
                              : 'bg-zinc-800 text-zinc-500 border-zinc-750'
                          }`}>
                            {lead.leadClassification === 'Hot' && <Flame className="w-2.5 h-2.5 text-red-500 animate-pulse" />}
                            {lead.leadClassification}
                          </span>
                        ) : (
                          <span />
                        )}

                        <Link 
                          href={`/inbox?active=${lead.id}`}
                          className="p-1 hover:bg-emerald-500/15 border border-transparent hover:border-emerald-500/20 rounded text-zinc-500 hover:text-emerald-400 transition-all"
                          title="Chat history"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center py-12 text-zinc-600 border border-dashed border-zinc-850 rounded-lg">
                      <span className="text-[10px]">No deals in {stage.name}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
