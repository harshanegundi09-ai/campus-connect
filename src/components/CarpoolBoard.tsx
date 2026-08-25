'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { 
  Car, 
  MapPin, 
  Calendar, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Plus, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const CarpoolBoard: React.FC = () => {
  const { carpools, bookCarpoolSeat, selectedCollege, showToast } = useApp();

  const collegeCarpools = carpools.filter(c => 
    selectedCollege === 'All Campuses' || c.college === selectedCollege
  );

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-blue-800/40">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              <Car className="w-4 h-4" />
              <span>Campus Carpooling &amp; Rides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Student Ride Sharing &amp; Weekend Carpools
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 max-w-2xl leading-relaxed">
              Share rides to the airport, weekend hackathons, downtown tech hubs, or split gas on daily commutes with verified student drivers.
            </p>
          </div>

          <button
            onClick={() => showToast('🚗 Offer Ride modal opening...')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Offer a Campus Ride</span>
          </button>
        </div>
      </div>

      {/* Carpool Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {collegeCarpools.map((ride) => (
          <div
            key={ride.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={ride.driverAvatar}
                    alt={ride.driverName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1">
                      <span>{ride.driverName}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                    </h4>
                    <span className="text-[11px] text-slate-400 font-medium">{ride.carModel}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-extrabold text-blue-600">
                    {ride.pricePerSeat === 0 ? 'FREE' : `$${ride.pricePerSeat}`}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-medium">/ seat</span>
                </div>
              </div>

              {/* Route Display */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">From: {ride.origin}</span>
                </div>
                <div className="border-l-2 border-dashed border-slate-300 ml-1.5 h-3" />
                <div className="flex items-center gap-2 text-xs text-slate-800 font-semibold">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                  <span className="truncate">To: {ride.destination}</span>
                </div>
              </div>

              {/* Timing and Notes */}
              <div className="mt-3 space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>Departure: {ride.departureTime}</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1 italic">
                  &ldquo;{ride.notes}&rdquo;
                </p>
              </div>
            </div>

            {/* Footer and Reserve CTA */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Users className="w-4 h-4 text-blue-500" />
                <span>{ride.seatsAvailable} of {ride.seatsTotal} seats open</span>
              </div>

              <button
                onClick={() => bookCarpoolSeat(ride.id)}
                disabled={ride.seatsAvailable === 0}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>{ride.seatsAvailable > 0 ? 'Reserve Seat' : 'Fully Booked'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
