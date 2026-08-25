'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { 
  X, 
  BookOpen, 
  Wrench, 
  Rocket, 
  Sparkles, 
  Image as ImageIcon, 
  DollarSign, 
  MapPin, 
  Tag, 
  Plus,
  FileText
} from 'lucide-react';
import { PricingType, ConditionType } from '@/lib/types';
import { COLLEGES } from '@/lib/seedData';

export const CreateListingModal: React.FC = () => {
  const { isCreateModalOpen, setIsCreateModalOpen, createListing, selectedCollege } = useApp();

  const [pillar, setPillar] = useState<'resource' | 'service' | 'opportunity'>('resource');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('textbooks');
  const [pricingType, setPricingType] = useState<PricingType>('fixed');
  const [price, setPrice] = useState<number>(20);
  const [condition, setCondition] = useState<ConditionType>('good');
  const [courseCode, setCourseCode] = useState('');
  const [location, setLocation] = useState('Main Campus Library Lobby');
  const [college, setCollege] = useState(selectedCollege !== 'All Campuses' ? selectedCollege : 'Metropolitan Tech University');
  const [imageUrl, setImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('campus, student, essentials');
  const [timeCommitment, setTimeCommitment] = useState('3-5 hrs/week');
  const [skillsOrRoles, setSkillsOrRoles] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  if (!isCreateModalOpen) return null;

  const presetPhotos: { [key: string]: string[] } = {
    resource: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&auto=format&fit=crop&q=80',
    ],
    service: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    ],
    opportunity: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
    ],
  };

  const selectedImage = imageUrl || presetPhotos[pillar][0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const tags = tagsInput.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
    const parsedSkills = skillsOrRoles.split(',').map(s => s.trim()).filter(Boolean);

    createListing({
      pillar,
      title,
      description,
      category,
      pricingType: pricingType === 'free' ? 'free' : pricingType,
      price: pricingType === 'free' ? 0 : Number(price) || 0,
      condition: pillar === 'resource' ? condition : undefined,
      courseCode: courseCode.trim() || undefined,
      location,
      college,
      images: [selectedImage],
      tags,
      timeCommitment: pillar === 'opportunity' ? timeCommitment : undefined,
      serviceSkills: pillar === 'service' && parsedSkills.length > 0 ? parsedSkills : undefined,
      collaborationRoles: pillar === 'opportunity' && parsedSkills.length > 0 ? parsedSkills : undefined,
      urgency: isUrgent ? 'urgent' : 'regular',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-20">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Campus Exchange Creator
            </span>
            <h2 className="text-lg font-bold text-slate-900">Post to Campus Community</h2>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Pillar Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. What are you sharing or offering?
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => {
                  setPillar('resource');
                  setCategory('textbooks');
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                  pillar === 'resource'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <BookOpen className="w-5 h-5 mb-1 text-emerald-600" />
                <span className="text-xs">Resource / Notes</span>
                <span className="text-[10px] text-slate-400 font-normal">Books, PDFs, dorm gear</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPillar('service');
                  setCategory('graphic_design');
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                  pillar === 'service'
                    ? 'border-blue-600 bg-blue-50 text-blue-950 font-bold shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Wrench className="w-5 h-5 mb-1 text-blue-600" />
                <span className="text-xs">Student Service</span>
                <span className="text-[10px] text-slate-400 font-normal">Design, video, tutoring</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPillar('opportunity');
                  setCategory('project_collab');
                  setPricingType('free');
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                  pillar === 'opportunity'
                    ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Rocket className="w-5 h-5 mb-1 text-purple-600" />
                <span className="text-xs">Project Collab</span>
                <span className="text-[10px] text-slate-400 font-normal">Startups, hackathons, lab</span>
              </button>
            </div>
          </div>

          {/* Subcategory dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Specific Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500 font-medium"
            >
              {pillar === 'resource' && (
                <>
                  <option value="textbooks">📚 Textbooks</option>
                  <option value="study_notes">📑 Study Notes &amp; PDF Exam Guides</option>
                  <option value="electronics">💻 Electronics &amp; Calculators</option>
                  <option value="dorm">🛋️ Dorm Essentials &amp; Furniture</option>
                  <option value="lab_gear">🔬 Lab Gear &amp; Goggles</option>
                </>
              )}
              {pillar === 'service' && (
                <>
                  <option value="graphic_design">🎨 Graphic Design &amp; UI/UX</option>
                  <option value="video_editing">🎬 Video Editing &amp; Content Creation</option>
                  <option value="photography">📸 Graduation &amp; Headshot Photography</option>
                  <option value="resume_review">💼 Resume &amp; Career Review</option>
                  <option value="tutoring">🧠 1-on-1 Course Tutoring</option>
                  <option value="language_exchange">🗣️ Language Exchange &amp; Tutoring</option>
                  <option value="event_assistance">🎤 Event &amp; Sound Assistance</option>
                  <option value="moving">📦 Dorm Moving Help</option>
                </>
              )}
              {pillar === 'opportunity' && (
                <>
                  <option value="project_collab">🚀 Student Startups &amp; Collabs</option>
                  <option value="hackathon">💻 Hackathon Team Recruitment</option>
                  <option value="research">🔬 Lab &amp; Research Assistant</option>
                  <option value="study_group">👥 Exam Cramming Squad</option>
                </>
              )}
            </select>
          </div>

          {/* Title & Course Code */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Listing Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  pillar === 'resource' ? 'e.g. TI-84 Plus Calculator or Biology 101 Book' :
                  pillar === 'service' ? 'e.g. Club Logo & Figma UI Design or Video Editing' :
                  'e.g. Looking for Mobile Dev for Student Startup'
                }
                className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Relevant Course Code (Optional)
                </label>
                <input
                  type="text"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
                  placeholder="e.g. CS 106B, MATH 200"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Campus Location
                </label>
                <select
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500"
                >
                  {COLLEGES.filter(c => c !== 'All Campuses').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Terms */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Pricing Model
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'free', label: '🎁 Free / $0' },
                { id: 'fixed', label: '💵 Fixed Price' },
                { id: 'hourly', label: '⏱️ Hourly Rate' },
                { id: 'borrow', label: '🤝 Borrow/Rent' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPricingType(item.id as PricingType)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    pricingType === item.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {pricingType !== 'free' && (
              <div className="pt-2 flex items-center gap-3">
                <div className="w-32">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Price ($ USD)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full text-sm font-bold p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <span className="text-xs text-slate-500 pt-4">
                  {pricingType === 'hourly' ? 'per hour' : pricingType === 'borrow' ? 'per lending period' : 'total price'}
                </span>
              </div>
            )}
          </div>

          {/* Service Skills / Collab Roles Input */}
          {(pillar === 'service' || pillar === 'opportunity') && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {pillar === 'service' ? 'Tools / Software Skills Offered (Comma separated)' : 'Team Roles Needed (Comma separated)'}
              </label>
              <input
                type="text"
                value={skillsOrRoles}
                onChange={(e) => setSkillsOrRoles(e.target.value)}
                placeholder={pillar === 'service' ? 'Figma, Adobe Premiere, OBS, DaVinci' : 'Mobile Dev, UI Designer, Growth Lead'}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Description &amp; Deliverables *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe deliverables, turnaround time, turnaround details or what you are offering/seeking..."
              className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Location & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1 text-xs font-bold text-slate-700 mb-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pickup / Hand-off Location</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Online Figma link or Library"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-bold text-slate-700 mb-1">
                <Tag className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tags (Comma separated)</span>
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="design, figma, student, fast"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Preset Photo selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Select Cover Photo</span>
              </label>
              <span className="text-[11px] text-slate-400">Click to select photo</span>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {presetPhotos[pillar].map((url, idx) => (
                <div
                  key={idx}
                  onClick={() => setImageUrl(url)}
                  className={`aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImage === url
                      ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="preset" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Listing to Campus</span>
          </button>
        </form>

      </div>
    </div>
  );
};
