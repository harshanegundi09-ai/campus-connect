'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-700/80 text-xs sm:text-sm font-semibold backdrop-blur-md">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
