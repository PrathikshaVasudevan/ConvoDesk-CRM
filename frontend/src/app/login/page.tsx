'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Lock, Mail, MessageSquare } from 'lucide-react';
import { loginSchema } from '@/lib/validations/schemas';
import { api } from '@/lib/api/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const res = await api.auth.login({ email, password });
      // Store token for authenticated API calls
      localStorage.setItem('convodesk_token', res.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden px-4">
      {/* Decorative Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md z-10">
        {/* Brand logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] mb-4">
            CD
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">ConvoDesk CRM</h1>
          <p className="text-zinc-400 text-sm mt-1">AI-Powered WhatsApp Customer Relations</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl">
          <h2 className="text-lg font-semibold text-zinc-100 mb-6">Sign in to your account</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 text-sm placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 text-sm placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick instructions / Demo Info */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-start gap-3">
            <div className="p-1 bg-emerald-500/10 rounded text-emerald-400 flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="text-zinc-500 text-xs leading-relaxed">
              <p className="font-semibold text-zinc-400">Demo Mode Access</p>
              <p>Use email <code className="text-zinc-300 font-bold">admin@convodesk.com</code> and password <code className="text-zinc-300 font-bold">password123</code> to authenticate.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
