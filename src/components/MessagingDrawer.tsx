'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { 
  X, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Clock,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { ExchangeRequest } from '@/lib/types';

export const MessagingDrawer: React.FC = () => {
  const { 
    isMessagingOpen, 
    setIsMessagingOpen, 
    requests, 
    messages, 
    user, 
    sendChatMessage, 
    selectedRequestForChat,
    openChatForRequest,
    updateRequestStatus
  } = useApp();

  const [activeReqId, setActiveReqId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync active request if opened from request modal or initial load
  useEffect(() => {
    if (selectedRequestForChat) {
      setActiveReqId(selectedRequestForChat.id);
    } else if (requests.length > 0 && !activeReqId) {
      setActiveReqId(requests[0].id);
    }
  }, [selectedRequestForChat, requests, activeReqId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeReqId]);

  if (!isMessagingOpen) return null;

  const currentRequest = requests.find(r => r.id === activeReqId) || requests[0];
  const activeMessages = messages.filter(m => m.requestId === (currentRequest?.id || ''));

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentRequest) return;

    sendChatMessage(currentRequest.id, inputText);
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          
          {/* Top Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-600/30 text-emerald-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Campus Exchange Chats</h3>
                <p className="text-[11px] text-slate-400">Active Requests & Deals</p>
              </div>
            </div>

            <button
              onClick={() => setIsMessagingOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversations Pill List */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto flex gap-2 shrink-0">
            {requests.map((req) => {
              const isSelected = req.id === currentRequest?.id;
              return (
                <button
                  key={req.id}
                  onClick={() => setActiveReqId(req.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all shrink-0 border ${
                    isSelected
                      ? 'bg-white text-slate-900 border-emerald-500 shadow-sm'
                      : 'bg-slate-100/80 text-slate-600 border-transparent hover:bg-slate-200/60'
                  }`}
                >
                  <img
                    src={req.listingImage || req.senderAvatar}
                    alt={req.listingTitle}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div className="max-w-[120px]">
                    <h4 className="text-xs font-bold truncate">{req.listingTitle}</h4>
                    <span className={`text-[10px] uppercase font-bold ${
                      req.status === 'accepted' ? 'text-emerald-600' :
                      req.status === 'declined' ? 'text-rose-500' :
                      'text-amber-600'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {currentRequest ? (
            <>
              {/* Active Deal Status Card */}
              <div className="p-3.5 bg-emerald-50/70 border-b border-emerald-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950">
                    Deal Status: <span className="uppercase text-emerald-700">{currentRequest.status}</span>
                  </span>

                  {currentRequest.status === 'pending' && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateRequestStatus(currentRequest.id, 'accepted')}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                      >
                        Accept Deal
                      </button>
                      <button
                        onClick={() => updateRequestStatus(currentRequest.id, 'declined')}
                        className="text-[11px] font-bold px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700"
                      >
                        Decline
                      </button>
                    </div>
                  )}

                  {currentRequest.status === 'accepted' && (
                    <button
                      onClick={() => updateRequestStatus(currentRequest.id, 'completed')}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
                    >
                      Mark Completed 🎉
                    </button>
                  )}
                </div>

                {/* Proposed meetup details */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                  {currentRequest.proposedLocation && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{currentRequest.proposedLocation}</span>
                    </div>
                  )}
                  {currentRequest.proposedDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{currentRequest.proposedDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
                {activeMessages.map((msg) => {
                  const isMe = msg.senderId === user.id;

                  if (msg.isSystem) {
                    return (
                      <div key={msg.id} className="p-2.5 bg-slate-100 rounded-xl text-center text-[11px] text-slate-600 border border-slate-200/80">
                        {msg.text}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-[10px] text-slate-400 mb-0.5 px-1">
                        {msg.senderName} &bull; {msg.timestamp}
                      </span>
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-sm ${
                          isMe
                            ? 'bg-emerald-600 text-white rounded-br-xs'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Message Input Box */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message to peer..."
                  className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400">
              <MessageSquare className="w-10 h-10 mb-2 stroke-[1.5]" />
              <p className="text-sm font-semibold">No active exchange conversations yet</p>
              <p className="text-xs">Browse listings and click &ldquo;Request Exchange&rdquo; to start!</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
