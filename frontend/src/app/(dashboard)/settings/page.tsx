'use client';

import React, { useState } from 'react';
import { 
  User, 
  Settings as SettingsIcon, 
  Database, 
  Key, 
  Bot, 
  Check, 
  Smartphone,
  Globe
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'integration' | 'ai'>('profile');
  const [saved, setSaved] = useState(false);
  const [geminiKey, setGeminiKey] = useState('AIzaSyD-xxxxxxxxxxxxxxxxxxxxxxxxx');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const tabs = [
    { id: 'profile', name: 'Profile Settings', icon: User },
    { id: 'integration', name: 'WhatsApp & Webhooks', icon: Smartphone },
    { id: 'ai', name: 'Gemini AI Configuration', icon: Bot },
  ] as const;

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-zinc-50">System Settings</h2>
        <p className="text-zinc-400 text-xs mt-0.5">Manage agent profile, third-party integrations, and Gemini API configurations.</p>
      </div>

      {/* Tabs navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left column: tabs selection */}
        <div className="md:col-span-1 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-1 pb-2 md:pb-0">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap md:whitespace-normal ${
                  activeTab === tab.id
                    ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/35'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                }`}
              >
                <Icon className="w-4 h-4 mr-2.5 flex-shrink-0" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Right column: settings form */}
        <div className="md:col-span-3 bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-xl shadow-lg">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-zinc-200 pb-2 border-b border-zinc-800/80 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-emerald-400" /> Agent Profile Details
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-zinc-450 uppercase tracking-wider mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="Alex"
                      className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-zinc-450 uppercase tracking-wider mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Mercer"
                      className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-zinc-450 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue="alex@convodesk.crm"
                    className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-zinc-450 uppercase tracking-wider mb-2">Timezone</label>
                  <select className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-450 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                    <option>GMT+05:30 (Asia/Kolkata)</option>
                    <option>GMT-08:00 (Pacific Time)</option>
                    <option>GMT+00:00 (UTC)</option>
                  </select>
                </div>
              </div>
            )}

            {/* INTEGRATIONS TAB */}
            {activeTab === 'integration' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-zinc-200 pb-2 border-b border-zinc-800/80 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" /> WhatsApp Business Cloud API
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-zinc-450 uppercase tracking-wider mb-2">Phone Number ID</label>
                    <input
                      type="text"
                      placeholder="e.g. 109848572849503"
                      className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-zinc-450 uppercase tracking-wider mb-2">WhatsApp Access Token (Permanent)</label>
                    <input
                      type="password"
                      placeholder="EAAGyZB0Yxxxxxxxxx"
                      className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-lg space-y-2 mt-4">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" /> Webhook Endpoint (Incoming Messages)
                    </span>
                    <p className="text-[10px] text-zinc-400 leading-relaxed">
                      Configure your Meta Developer Console Webhook to route to this URL for real-time syncing:
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded text-[10px] text-zinc-300 select-all truncate">
                        https://api.convodesk.crm/api/v1/whatsapp/webhook
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI CONFIG TAB */}
            {activeTab === 'ai' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-zinc-200 pb-2 border-b border-zinc-800/80 flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-emerald-400" /> Gemini API Settings
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-zinc-450 uppercase tracking-wider mb-2">Gemini API Key</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="password"
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <p className="text-[9px] text-zinc-500 mt-1">Acquire your API key from Google AI Studio.</p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-zinc-450 uppercase tracking-wider mb-2">Lead Intent prompt instructions</label>
                    <textarea
                      rows={3}
                      defaultValue="Classify incoming customer message intent into: Hot, Warm, Cold, Information Gathering, or Not Interested. Keep classification concise and output only the category."
                      className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-zinc-450 uppercase tracking-wider mb-2">Conversation Summary instruction</label>
                    <textarea
                      rows={3}
                      defaultValue="Analyze the conversation log. Extract key issues discussed, customer requirements, enterprise sizing, and active blocker problems. Formulate a 2-sentence summary."
                      className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-zinc-800/80">
              {saved ? (
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4" /> Settings updated successfully!
                </span>
              ) : (
                <span />
              )}
              
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all"
              >
                Save Settings
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
