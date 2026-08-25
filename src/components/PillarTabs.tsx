'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { PillarType } from '@/lib/types';
import { 
  Sparkles, 
  BookOpen, 
  Wrench, 
  Rocket, 
  ClipboardList, 
  Car 
} from 'lucide-react';

export const PillarTabs: React.FC = () => {
  const { selectedPillar, setSelectedPillar, listings, notices, carpools, selectedCollege } = useApp();

  const collegeListings = listings.filter(l => 
    selectedCollege === 'All Campuses' || l.college === selectedCollege
  );
  const collegeNotices = notices.filter(n => 
    selectedCollege === 'All Campuses' || n.college === selectedCollege
  );
  const collegeCarpools = carpools.filter(c => 
    selectedCollege === 'All Campuses' || c.college === selectedCollege
  );

  const counts = {
    all: collegeListings.length,
    resource: collegeListings.filter(l => l.pillar === 'resource').length,
    service: collegeListings.filter(l => l.pillar === 'service').length,
    opportunity: collegeListings.filter(l => l.pillar === 'opportunity').length,
    notice_board: collegeNotices.length,
    carpool: collegeCarpools.length,
  };

  const tabs: { id: PillarType; label: string; icon: React.ReactNode; count: number; desc: string }[] = [
    {
      id: 'all',
      label: 'All Campus Feed',
      icon: <Sparkles className="w-4 h-4" />,
      count: counts.all,
      desc: 'All resources, services and gigs',
    },
    {
      id: 'resource',
      label: 'Resources & Notes',
      icon: <BookOpen className="w-4 h-4" />,
      count: counts.resource,
      desc: 'Books, study guides & gear',
    },
    {
      id: 'service',
      label: 'Student Services',
      icon: <Wrench className="w-4 h-4" />,
      count: counts.service,
      desc: 'Design, video, photo & tutoring',
    },
    {
      id: 'opportunity',
      label: 'Project Collab',
      icon: <Rocket className="w-4 h-4" />,
      count: counts.opportunity,
      desc: 'Startups, hackathons & research',
    },
    {
      id: 'notice_board',
      label: 'Notice Board',
      icon: <ClipboardList className="w-4 h-4" />,
      count: counts.notice_board,
      desc: 'Lost & found IDs, notebooks',
    },
    {
      id: 'carpool',
      label: 'Carpool & Rides',
      icon: <Car className="w-4 h-4" />,
      count: counts.carpool,
      desc: 'Shared campus rides',
    },
  ];

  return (
    <div className="mb-6 overflow-x-auto pb-1">
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/70 backdrop-blur-md rounded-2xl border border-slate-300/60 min-w-max">
        {tabs.map((tab) => {
          const isActive = selectedPillar === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedPillar(tab.id)}
              className={`flex items-center gap-2 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm shadow-slate-300/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span className={isActive ? 'text-emerald-600' : 'text-slate-500'}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-300/60 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
