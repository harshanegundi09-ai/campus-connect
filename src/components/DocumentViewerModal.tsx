'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { 
  X, 
  FileText, 
  Download, 
  BookOpen, 
  Share2, 
  Sparkles, 
  CheckCircle2,
  Printer
} from 'lucide-react';

export const DocumentViewerModal: React.FC = () => {
  const { activeDocumentView, closeDocumentView, showToast } = useApp();

  if (!activeDocumentView) return null;
  const doc = activeDocumentView;

  const handleDownload = () => {
    showToast(`📥 "${doc.title}.pdf" downloaded to your device!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-900 text-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Verified Student Notes &bull; {doc.pages} Pages ({doc.fileSize})
              </span>
              <h3 className="text-base font-bold text-white truncate max-w-md">
                {doc.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={closeDocumentView}
              className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF / Document Reader Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 font-serif">
            <div className="border-b border-slate-200 pb-3 text-center space-y-1">
              <h2 className="text-lg font-bold text-slate-900 font-sans">{doc.title}</h2>
              <p className="text-xs text-slate-500 font-sans">
                Curated by Campus Top-Rated TA &bull; A+ Final Exam Study Package
              </p>
            </div>

            <div className="space-y-3 font-sans">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                📑 Core Course Chapters &amp; High-Yield Topic Index
              </h4>
              <div className="space-y-2">
                {doc.previewSnippets.map((snippet, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{snippet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-100 text-xs text-emerald-950 font-sans flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Includes all practice problem solutions &amp; algorithmic diagrams.</span>
              </div>
              <button
                onClick={handleDownload}
                className="font-bold text-emerald-700 hover:underline"
              >
                Save to Offline Drive &rarr;
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
