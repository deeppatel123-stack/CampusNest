import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Trash2, 
  X, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Footprints, 
  Utensils, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck,
  TrendingDown,
  Award
} from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { STUDENT_PROPERTIES } from '../data/studentPropertiesData';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, addToCompare } = useCompare();

  // Pick top Nirma properties as default quick adds if compareList is empty
  const defaultNirmaProperties = useMemo(() => {
    return STUDENT_PROPERTIES.filter(p => p && p.nearCollegeId === 'nirma-univ-ahmedabad').slice(0, 3);
  }, []);

  const handleAddDefaultSample = () => {
    defaultNirmaProperties.forEach(p => {
      addToCompare(p);
    });
  };

  // Determine Best Value, Nearest, Most Premium
  const aiVerdict = useMemo(() => {
    if (!compareList || compareList.length < 2) return null;

    let lowestPrice = compareList[0];
    let nearest = compareList[0];
    let highestRated = compareList[0];

    compareList.forEach((p) => {
      if (p && p.pricing && (p.pricing.monthlyRent || 0) < (lowestPrice?.pricing?.monthlyRent || Infinity)) {
        lowestPrice = p;
      }
      if (p && ((p.walkingTimeMinutes || 20) < (nearest?.walkingTimeMinutes || 20))) {
        nearest = p;
      }
      if (p && ((p.ratings?.average || 0) > (highestRated?.ratings?.average || 0))) {
        highestRated = p;
      }
    });

    return {
      bestValue: lowestPrice || compareList[0],
      nearestCampus: nearest || compareList[0],
      topRated: highestRated || compareList[0],
    };
  }, [compareList]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* ─────────────────────────────────────────────────────────────
          PAGE HEADER
         ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <Layers className="w-4 h-4" /> Student Housing Cost Comparison
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Compare PGs, Rooms & Flats Side-by-Side
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Evaluate true monthly expenses (Rent + Mess + Deposit), walking time, curfew rules and amenities.
          </p>
        </div>

        {compareList && compareList.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Comparison</span>
            </button>
            <Link
              to="/search"
              className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
            >
              + Add More PGs
            </Link>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          EMPTY STATE (IF NO PROPERTIES IN COMPARE)
         ───────────────────────────────────────────────────────────── */}
      {!compareList || compareList.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 sm:p-16 border-2 border-dashed border-slate-200 text-center max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Your comparison list is empty</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Select 2 to 4 properties by clicking the compare button on any PG card to view side-by-side rent, mess food schedules, and walking distance to campus.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleAddDefaultSample}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Compare Nirma University PGs (Sample)</span>
            </button>

            <Link
              to="/search?college=nirma-univ-ahmedabad"
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
            >
              Browse All Listings
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* ─────────────────────────────────────────────────────────────
              AI COMPARISON VERDICT BOX
             ───────────────────────────────────────────────────────────── */}
          {aiVerdict && (
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/40 space-y-4">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-300" /> CampusNest AI Cost Analysis & Verdict
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {/* Best Value */}
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" /> Best Budget Value
                  </span>
                  <h4 className="text-sm font-bold text-white">{aiVerdict.bestValue.title}</h4>
                  <p className="text-xs text-slate-300">
                    Lowest monthly rent at <strong className="text-white">₹{aiVerdict.bestValue.pricing?.monthlyRent ? aiVerdict.bestValue.pricing.monthlyRent.toLocaleString('en-IN') : '7,000'}/mo</strong>
                    {aiVerdict.bestValue.pricing?.foodIncluded ? ' (includes meals)' : ''}
                  </p>
                </div>

                {/* Nearest */}
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Footprints className="w-3.5 h-3.5" /> Nearest to Campus
                  </span>
                  <h4 className="text-sm font-bold text-white">{aiVerdict.nearestCampus.title}</h4>
                  <p className="text-xs text-slate-300">
                    Just <strong className="text-white">{aiVerdict.nearestCampus.walkingTimeMinutes || 5} mins walk</strong> from {aiVerdict.nearestCampus.nearCollegeName || 'Campus'}. Saves ~₹1,500/mo in auto fare.
                  </p>
                </div>

                {/* Highest Rated */}
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-1">
                  <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Top Student Favorite
                  </span>
                  <h4 className="text-sm font-bold text-white">{aiVerdict.topRated.title}</h4>
                  <p className="text-xs text-slate-300">
                    Rated <strong className="text-white">{aiVerdict.topRated.ratings?.average || 4.8} / 5.0</strong> by verified college students for mess quality and cleanliness.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SIDE-BY-SIDE MATRIX TABLE
             ───────────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              
              {/* Header: Photos & Titles */}
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="p-4 sm:p-6 w-48 text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Property
                  </th>
                  {compareList.map((p) => (
                    <th key={p.id} className="p-4 sm:p-6 w-64 align-top">
                      <div className="space-y-3">
                        <div className="relative h-32 rounded-xl overflow-hidden bg-slate-100">
                          <img
                            src={p.photos?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80'}
                            alt={p.title || 'Accommodation'}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-rose-600 text-white rounded-full transition-colors"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                            {p.propertyType || 'Student PG'}
                          </span>
                          <Link
                            to={`/property/${p.id}`}
                            className="block font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors mt-1 line-clamp-1"
                          >
                            {p.title}
                          </Link>
                          <span className="text-xs text-slate-500 block truncate">Near {p.nearCollegeName || 'Campus'}</span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                
                {/* Monthly Rent */}
                <tr className="bg-indigo-50/40">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    Monthly Rent / Bed
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 sm:p-5">
                      <span className="text-base font-black text-indigo-600 block">
                        ₹{p.pricing?.monthlyRent ? p.pricing.monthlyRent.toLocaleString('en-IN') : 'N/A'}
                      </span>
                      <span className="text-[10px] text-slate-400">per student per month</span>
                    </td>
                  ))}
                </tr>

                {/* Food & Meals */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    Food / Mess
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 sm:p-5">
                      {p.pricing?.foodIncluded ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                            <Utensils className="w-3 h-3 text-emerald-600" /> Included
                          </span>
                          <p className="text-[11px] text-slate-600">{p.pricing.foodFrequency || '3 Meals Daily'}</p>
                        </div>
                      ) : (
                        <span className="text-slate-400">Not Included (Self-cooking / Tiffin)</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Walking Distance */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    Distance to Campus
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 sm:p-5">
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        <Footprints className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{p.distanceToCollege || `${p.walkingTimeMinutes || 6} min walk`}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Security Deposit */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    Security Deposit
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 sm:p-5 font-semibold text-slate-800">
                      ₹{p.pricing?.depositAmount ? p.pricing.depositAmount.toLocaleString('en-IN') : '10,000'}{' '}
                      <span className="text-[10px] text-slate-400 block font-normal">(100% Refundable)</span>
                    </td>
                  ))}
                </tr>

                {/* Total 1st Month Outflow */}
                <tr className="bg-slate-50/60 font-semibold">
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    Est. First Month Move-in
                  </td>
                  {compareList.map((p) => {
                    const firstMonth = (p.pricing?.monthlyRent || 0) + (p.pricing?.depositAmount || 10000);
                    return (
                      <td key={p.id} className="p-4 sm:p-5">
                        <span className="text-sm font-black text-slate-900 block">
                          ₹{firstMonth.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-500">Rent + Deposit (Zero Brokerage)</span>
                      </td>
                    );
                  })}
                </tr>

                {/* Room Amenities */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    AC & Washroom
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 sm:p-5 space-y-1">
                      <div className="flex items-center gap-1.5">
                        {p.specs?.acAvailable ? (
                          <span className="text-emerald-700 font-medium">✓ AC Available</span>
                        ) : (
                          <span className="text-slate-400">✕ Non-AC / Fan only</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {p.specs?.attachedWashroom ? (
                          <span className="text-emerald-700 font-medium">✓ Attached Washroom</span>
                        ) : (
                          <span className="text-slate-400">✕ Common Washroom</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Curfew / Timings */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    Curfew / Entry Rules
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 sm:p-5 text-slate-600">
                      {p.propertyType && p.propertyType.includes('Girls') ? '10:00 PM (Gate closes, biometric entry)' : '10:30 PM (Flexible for college projects)'}
                    </td>
                  ))}
                </tr>

                {/* Verified Owner Contact Action */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    Direct Contact
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 sm:p-5">
                      <div className="space-y-1.5">
                        <a
                          href={`https://wa.me/${p.verifiedOwner?.whatsapp ? p.verifiedOwner.whatsapp.replace(/[^0-9]/g, '') : '919825044192'}?text=${encodeURIComponent(
                            `Hi ${p.verifiedOwner?.name || 'Owner'}, I am comparing PGs on CampusNest and want to inquire about ${p.title} near ${p.nearCollegeName || 'Campus'}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-[11px] transition-colors"
                        >
                          <MessageSquare className="w-3 h-3 fill-white" />
                          <span>WhatsApp</span>
                        </a>

                        <Link
                          to={`/property/${p.id}`}
                          className="w-full flex items-center justify-center py-2 px-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-[11px] transition-colors"
                        >
                          View Full Details
                        </Link>
                      </div>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        </>
      )}

    </div>
  );
}
