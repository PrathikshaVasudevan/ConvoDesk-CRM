'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Columns,
  CheckSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  Search,
  Bell
} from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Inbox', href: '/inbox', icon: MessageSquare },
  { name: 'Contacts', href: '/contacts', icon: Users },
  { name: 'Pipeline', href: '/pipeline', icon: Columns },
  { name: 'Follow-ups', href: '/followups', icon: CheckSquare },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getPageTitle = () => {
    const activeItem = sidebarItems.find(item => pathname.startsWith(item.href));
    return activeItem ? activeItem.name : 'ConvoDesk';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md z-20">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-zinc-800/80 gap-2">
            <div className="relative w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              CD
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border border-zinc-950 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-md font-bold tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">ConvoDesk</span>

            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            {sidebarItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                    ? 'bg-emerald-600/10 text-emerald-400 border-l-2 border-emerald-500 shadow-[inset_1px_0_0_0_rgba(16,185,129,0.1)]'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40'
                    }`}
                >
                  <Icon className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${isActive ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-zinc-300'
                    }`} />
                  <span className="flex-1">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile Info Footer */}
          <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/30">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/avatar.svg"
                alt="Agent Profile"
                className="w-9 h-9 rounded-full ring-2 ring-emerald-500/30 object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-zinc-200 truncate">Alex Mercer</p>
                <p className="text-[10px] text-zinc-500 truncate">alex@convodesk.crm</p>
              </div>
            </div>
            <Link
              href="/login"
              className="flex items-center justify-center w-full px-3 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-zinc-800/40 hover:bg-zinc-800/80 border border-zinc-800 rounded-md transition-colors gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-zinc-900 border-r border-zinc-850">
            <div className="absolute top-0 right-0 pt-2 -mr-12">
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="flex items-center flex-shrink-0 px-6 gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                CD
              </div>
              <span className="text-md font-bold text-zinc-50">ConvoDesk</span>
            </div>
            <nav className="flex-1 h-0 px-4 mt-8 overflow-y-auto space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group flex items-center px-3 py-2.5 text-base font-medium rounded-lg ${isActive ? 'bg-emerald-600/10 text-emerald-400' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                  >
                    <Icon className="mr-4 h-6 w-6 text-zinc-400 group-hover:text-zinc-300" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden md:pl-64">
        {/* Top Navbar Header */}
        <header className="flex items-center justify-between h-16 px-4 md:px-8 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="md:hidden text-zinc-400 hover:text-zinc-200 focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-zinc-100">{getPageTitle()}</h1>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Quick search..."
                className="w-64 pl-9 pr-4 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <button className="relative p-2 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-zinc-200">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>

            <div className="h-6 w-px bg-zinc-800" />

          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto bg-zinc-950/50 p-4 md:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
