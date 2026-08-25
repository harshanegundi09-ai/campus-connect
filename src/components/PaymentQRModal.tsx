'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { 
  X, 
  QrCode, 
  Wallet, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Lock,
  RefreshCw
} from 'lucide-react';

export const PaymentQRModal: React.FC = () => {
  const { 
    isPaymentQRModalOpen, 
    setIsPaymentQRModalOpen, 
    targetListingForPayment, 
    user, 
    processQRPayment 
  } = useApp();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isPaymentQRModalOpen || !targetListingForPayment) return null;
  const listing = targetListingForPayment;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const ok = processQRPayment(listing.price, listing.author.name);
      setIsProcessing(false);
      if (ok) {
        setPaymentSuccess(true);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                Digital Campus Escrow
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Campus Cash QR Pay
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              setIsPaymentQRModalOpen(false);
              setPaymentSuccess(false);
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {paymentSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-900">Payment Complete!</h4>
              <p className="text-xs text-slate-500">
                ${listing.price.toFixed(2)} transferred to {listing.author.name}. Receipt stored in your student hub.
              </p>
            </div>
            <button
              onClick={() => {
                setIsPaymentQRModalOpen(false);
                setPaymentSuccess(false);
              }}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm"
            >
              Done &amp; Return to Feed
            </button>
          </div>
        ) : (
          <>
            {/* Target Item summary */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="min-w-0 flex-1 pr-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Paying for:</span>
                <h4 className="text-xs font-bold text-slate-800 truncate">{listing.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium">To: {listing.author.name}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-base font-extrabold text-emerald-600">
                  ${listing.price.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-400 block">USD</span>
              </div>
            </div>

            {/* Generated QR Code Box */}
            <div className="flex flex-col items-center justify-center p-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl text-white space-y-3 shadow-inner relative overflow-hidden">
              <div className="absolute top-2 right-3 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>256-Bit Encrypted</span>
              </div>

              {/* Graphical QR Representation */}
              <div className="p-3 bg-white rounded-xl shadow-lg">
                <div className="w-36 h-36 bg-slate-900 p-2 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-10 h-10 border-4 border-white p-1 flex items-center justify-center">
                      <div className="w-4 h-4 bg-white" />
                    </div>
                    <div className="w-10 h-10 border-4 border-white p-1 flex items-center justify-center">
                      <div className="w-4 h-4 bg-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 bg-emerald-500 rounded-sm flex items-center justify-center text-slate-900 font-extrabold text-[8px]">
                      EDU
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-10 h-10 border-4 border-white p-1 flex items-center justify-center">
                      <div className="w-4 h-4 bg-white" />
                    </div>
                    <div className="w-8 h-8 bg-white/30 grid grid-cols-2 gap-1 p-1">
                      <div className="bg-white" />
                      <div className="bg-white" />
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 font-medium">
                Scan with any campus student camera to pay in person
              </p>
            </div>

            {/* Student Wallet Balance */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-800">Your Campus Cash:</span>
              </div>
              <span className="font-extrabold text-emerald-700">
                ${user.campusCashBalance.toFixed(2)}
              </span>
            </div>

            {/* Action */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Secure Transfer...</span>
                </>
              ) : (
                <>
                  <span>Confirm One-Click Campus Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </>
        )}

      </div>
    </div>
  );
};
