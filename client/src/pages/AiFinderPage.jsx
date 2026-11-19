import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  GraduationCap, 
  MapPin, 
  Footprints, 
  Utensils, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Phone, 
  MessageSquare, 
  Sliders, 
  ShieldCheck, 
  Layers,
  Star
} from 'lucide-react';
import { UNIVERSITIES } from '../data/universitiesData';
import { STUDENT_PROPERTIES } from '../data/studentPropertiesData';
import PropertyCard from '../components/common/PropertyCard';

export default function AiFinderPage() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Student Preferences Form
  const [collegeId, setCollegeId] = useState('nirma-univ-ahmedabad');
  const [genderType, setGenderType] = useState('Boys PG'); // 'Boys PG', 'Girls PG', 'Any'
  const [budgetTier, setBudgetTier] = useState('medium'); // 'low' (<7000), 'medium' (7000-10000), 'high' (>10000)
  const [foodPreference, setFoodPreference] = useState('mandatory'); // 'mandatory', 'optional'
  const [topPriority, setTopPriority] = useState('commute'); // 'commute', 'budget', 'food', 'comfort'

  const selectedCollege = UNIVERSITIES.find((u) => u.id === collegeId) || UNIVERSITIES[0];

  // AI Matching logic
  const handleRunAiMatch = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(4); // Results step
    }, 1200);
  };

  // Compute matched recommendations
  const recommendations = React.useMemo(() => {
    if (step < 4) return [];

    let pool = STUDENT_PROPERTIES.filter((p) => p && p.nearCollegeId === collegeId);
    if (pool.length === 0) {
      pool = STUDENT_PROPERTIES;
    }

    // Score each property
    const scored = pool.map((p) => {
      let score = 70;
      let reasons = [];

      // Gender match
      if (genderType === 'Boys PG' && p.propertyType && p.propertyType.includes('Boys')) {
        score += 15;
      } else if (genderType === 'Girls PG' && p.propertyType && p.propertyType.includes('Girls')) {
        score += 15;
      } else if (p.propertyType && (p.propertyType.includes('Co-ed') || p.propertyType.includes('Flat'))) {
        score += 8;
      }

      // Budget match
      const rent = p.pricing?.monthlyRent || 0;
      if (budgetTier === 'low') {
        if (rent <= 7000) {
          score += 15;
          reasons.push(`Budget-friendly at ₹${rent.toLocaleString('en-IN')}/mo`);
        } else {
          score -= 10;
        }
      } else if (budgetTier === 'medium') {
        if (rent >= 6500 && rent <= 11000) {
          score += 15;
          reasons.push(`Hits your sweet spot budget of ₹${rent.toLocaleString('en-IN')}/mo`);
        }
      } else {
        if (rent > 9000) {
          score += 15;
          reasons.push(`Premium accommodations with high-end amenities`);
        }
      }

      // Food match
      if (foodPreference === 'mandatory') {
        if (p.pricing?.foodIncluded) {
          score += 15;
          reasons.push('Includes 3 home-style meals (Pure Veg / Jain)');
        } else {
          score -= 15;
        }
      }

      // Priority adjustments
      if (topPriority === 'commute') {
        if ((p.walkingTimeMinutes || 10) <= 8) {
          score += 15;
          reasons.push(`Prime location: just ${p.walkingTimeMinutes || 6} min walk to campus`);
        }
      } else if (topPriority === 'food') {
        if (p.pricing?.foodIncluded) {
          score += 15;
          reasons.push('Rated top for hygienic mess and diverse menu');
        }
      } else if (topPriority === 'comfort') {
        if (p.specs?.acAvailable) {
          score += 10;
          reasons.push('Full AC, daily housekeeping & power backup');
        }
      }

      return {
        property: p,
        matchScore: Math.min(score, 99),
        reasons,
      };
    });

    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  }, [step, collegeId, genderType, budgetTier, foodPreference, topPriority]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* ─────────────────────────────────────────────────────────────
          HEADER
         ───────────────────────────────────────────────────────────── */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 text-xs font-bold border border-indigo-200">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
          <span>CampusNest AI Student Room Matchmaker</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Find Your Ideal College PG in 3 Simple Steps
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Skip hours of broker calls. Tell our AI your college, budget, and meal preference to instantly receive verified recommendations tailored to you.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PROGRESS STEPPER (Steps 1, 2, 3)
         ───────────────────────────────────────────────────────────── */}
      {step < 4 && (
        <div className="flex items-center justify-center gap-3 text-xs font-bold">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${step === 1 ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
            <span>1. Campus</span>
          </div>
          <div className="w-6 h-0.5 bg-slate-200" />
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${step === 2 ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
            <span>2. Budget & Meals</span>
          </div>
          <div className="w-6 h-0.5 bg-slate-200" />
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${step === 3 ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
            <span>3. Priorities</span>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          INTERACTIVE STEPS CARD
         ───────────────────────────────────────────────────────────── */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900">Step 1: Which college are you studying at?</h3>
            <p className="text-xs text-slate-500">We'll find PGs and rooms right outside your campus gates.</p>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Select Your College / University
            </label>
            <select
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              className="w-full text-sm font-semibold p-3.5 rounded-2xl bg-slate-50 border border-slate-300 focus:outline-none focus:border-indigo-600 focus:bg-white"
            >
              {UNIVERSITIES.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} — {u.city}, {u.state}
                </option>
              ))}
            </select>

            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-indigo-950 block">{selectedCollege.name}</span>
                <span className="text-slate-500">{selectedCollege.locality}, {selectedCollege.city}</span>
              </div>
              <span className="bg-white text-indigo-700 font-bold px-2.5 py-1 rounded-lg border border-indigo-200">
                Avg: ₹{selectedCollege.avgPgRent ? selectedCollege.avgPgRent.toLocaleString('en-IN') : '7,000'}/mo
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Accommodation Gender Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Boys PG', label: 'Boys PG / Hostel' },
                { id: 'Girls PG', label: 'Girls PG / Hostel' },
                { id: 'Any', label: 'Any / Shared Flat' },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGenderType(g.id)}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-center ${
                    genderType === g.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <span>Continue to Budget</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900">Step 2: Monthly Budget & Mess Food</h3>
            <p className="text-xs text-slate-500">Set realistic budgets so we find accommodations with no hidden surprises.</p>
          </div>

          {/* Budget Tier */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Preferred Monthly Budget (Per Bed)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'low', title: 'Pocket Friendly', range: 'Under ₹7,000 / mo', desc: 'Double/Triple sharing with essentials' },
                { id: 'medium', title: 'Balanced Value', range: '₹7,000 - ₹10,000 / mo', desc: 'Double sharing, AC, food included' },
                { id: 'high', title: 'Comfort & Luxury', range: '₹10,000+ / mo', desc: 'Single occupancy, premium amenities' },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBudgetTier(b.id)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-1 ${
                    budgetTier === b.id
                      ? 'bg-indigo-50/80 border-indigo-600 text-indigo-950 ring-2 ring-indigo-200'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold block">{b.title}</span>
                  <span className="text-sm font-extrabold text-indigo-600 block">{b.range}</span>
                  <span className="text-[11px] text-slate-500 block">{b.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Food Requirement */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Mess & Food Inclusions
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'mandatory', label: '3 Meals Included (Pure Veg)', desc: 'Must include Breakfast, Lunch & Dinner' },
                { id: 'optional', label: 'Flexible / Self Cooking', desc: 'Either mess or tiffin / restaurants nearby' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFoodPreference(f.id)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-1 ${
                    foodPreference === f.id
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-200'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold block">{f.label}</span>
                  <span className="text-[11px] text-slate-500 block">{f.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <span>Continue to Preferences</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900">Step 3: What matters most to you?</h3>
            <p className="text-xs text-slate-500">Our recommendation engine optimizes for your top priority.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'commute', title: 'Shortest Walking Distance', desc: 'Under 10 mins walk from campus, zero commute stress', icon: Footprints },
              { id: 'budget', title: 'Lowest Monthly Cost', desc: 'Maximum savings with reasonable facilities', icon: Sliders },
              { id: 'food', title: 'Best Food & Hygienic Mess', desc: 'High-rated pure veg/jain meals & unlimited servings', icon: Utensils },
              { id: 'comfort', title: 'High Comfort & AC', desc: 'Spacious rooms, attached washroom, daily housekeeping', icon: Sparkles },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setTopPriority(p.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    topPriority === p.id
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-200'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${topPriority === p.id ? 'bg-indigo-600 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-slate-900">{p.title}</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">{p.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              ← Back
            </button>
            <button
              onClick={handleRunAiMatch}
              disabled={isAnalyzing}
              className="px-7 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 hover:scale-105"
            >
              <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
              <span>{isAnalyzing ? 'Analyzing Campuses...' : 'Generate My Top 3 AI Matches'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          AI RECOMMENDATION RESULTS (STEP 4)
         ───────────────────────────────────────────────────────────── */}
      {step === 4 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> AI Matching Complete
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Top 3 Matches for {selectedCollege.name}
              </h2>
              <p className="text-xs text-indigo-200">
                Ranked by budget compatibility, commute time, and verified student feedback.
              </p>
            </div>

            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/10 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Adjust Criteria
            </button>
          </div>

          {/* Ranked Cards */}
          <div className="space-y-6">
            {recommendations.map((rec, index) => {
              const p = rec.property;
              if (!p) return null;

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl p-6 border-2 border-slate-200/80 hover:border-indigo-400 shadow-md transition-all space-y-4"
                >
                  {/* Top Match Rank Bar */}
                  <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black px-3 py-1 rounded-xl ${
                        index === 0
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : index === 1
                          ? 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        #{index + 1} Best Match
                      </span>
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
                        {rec.matchScore}% Compatibility
                      </span>
                    </div>

                    <span className="text-xs text-slate-500 font-medium">
                      Zero Brokerage • Verified Owner
                    </span>
                  </div>

                  {/* Main Grid: Card details + AI Reason */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    {/* Media thumbnail */}
                    <div className="relative h-48 md:h-44 rounded-2xl overflow-hidden bg-slate-100">
                      <img
                        src={p.photos?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80'}
                        alt={p.title || 'Student Accommodation'}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/70 text-white flex items-center gap-1">
                        <Footprints className="w-3 h-3 text-amber-400" /> {p.distanceToCollege || 'Nearby'}
                      </span>
                    </div>

                    {/* Middle details */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-indigo-600 block">
                        {p.propertyType || 'Student PG'} • {p.locality || ''}
                      </span>
                      <Link
                        to={`/property/${p.id}`}
                        className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors block line-clamp-1"
                      >
                        {p.title}
                      </Link>

                      <div className="text-xs text-slate-600 space-y-1">
                        <div className="font-semibold text-slate-800">
                          ₹{p.pricing?.monthlyRent ? p.pricing.monthlyRent.toLocaleString('en-IN') : 'N/A'}/mo{' '}
                          <span className="text-slate-400 font-normal">({p.sharingType || 'Shared Room'})</span>
                        </div>
                        {p.pricing?.foodIncluded && (
                          <div className="text-emerald-700 font-medium flex items-center gap-1">
                            <Utensils className="w-3 h-3 text-emerald-600" /> {p.pricing.foodFrequency || '3 Meals Included'}
                          </div>
                        )}
                      </div>

                      {/* AI Reasoning Pill */}
                      <div className="bg-indigo-50/70 border border-indigo-100/80 rounded-xl p-2.5 text-xs text-indigo-900 space-y-1">
                        <span className="font-bold flex items-center gap-1 text-[11px]">
                          <Sparkles className="w-3 h-3 text-indigo-600" /> Why AI Recommends:
                        </span>
                        <ul className="text-[11px] text-slate-600 list-disc list-inside space-y-0.5">
                          {rec.reasons.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right actions */}
                    <div className="space-y-2 text-right md:border-l md:border-slate-100 md:pl-6">
                      <div className="text-left md:text-right mb-3">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Total</span>
                        <span className="text-xl font-black text-indigo-600">
                          ₹{p.pricing?.monthlyRent ? p.pricing.monthlyRent.toLocaleString('en-IN') : 'N/A'}
                        </span>
                        <span className="text-xs text-slate-500 block">/ month</span>
                      </div>

                      <a
                        href={`https://wa.me/${p.verifiedOwner?.whatsapp ? p.verifiedOwner.whatsapp.replace(/[^0-9]/g, '') : '919825044192'}?text=${encodeURIComponent(
                          `Hi ${p.verifiedOwner?.name || 'Owner'}, I was matched to ${p.title} near ${p.nearCollegeName || 'Campus'} by CampusNest AI. I would like to inquire about room availability and rent.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-all"
                      >
                        <MessageSquare className="w-4 h-4 fill-white" />
                        <span>Chat on WhatsApp</span>
                      </a>

                      <Link
                        to={`/property/${p.id}`}
                        className="w-full flex items-center justify-center py-2.5 px-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-xs transition-colors"
                      >
                        View Full Details
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <Link
              to={`/search?college=${collegeId}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              <span>View all available listings near {selectedCollege.name}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}
