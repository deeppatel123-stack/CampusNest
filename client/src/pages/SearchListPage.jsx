import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  SlidersHorizontal, 
  MapPin, 
  Footprints, 
  Utensils, 
  ArrowUpDown, 
  Grid, 
  List, 
  Check, 
  RotateCcw, 
  GraduationCap, 
  Building2, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import PropertyCard from '../components/common/PropertyCard';
import UniversitySearchBar from '../components/common/UniversitySearchBar';
import { UNIVERSITIES } from '../data/universitiesData';
import { STUDENT_PROPERTIES } from '../data/studentPropertiesData';

export default function SearchListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const collegeParam = searchParams.get('college');
  const genericQuery = searchParams.get('q');

  // Find active college (default to Nirma University if none specified)
  const currentUniversity = useMemo(() => {
    if (collegeParam) {
      const found = UNIVERSITIES.find(u => u && u.id === collegeParam);
      if (found) return found;
    }
    if (genericQuery) {
      const q = genericQuery.toLowerCase();
      const found = UNIVERSITIES.find(u => 
        u && (
          (u.name && u.name.toLowerCase().includes(q)) || 
          (u.shortName && u.shortName.toLowerCase().includes(q)) || 
          (u.city && u.city.toLowerCase().includes(q))
        )
      );
      if (found) return found;
    }
    // Default fallback to Nirma University (primary user benchmark)
    return UNIVERSITIES.find(u => u && u.id === 'nirma-univ-ahmedabad') || UNIVERSITIES[0];
  }, [collegeParam, genericQuery]);

  // Filter States
  const [propertyType, setPropertyType] = useState('All'); // All, Boys PG, Girls PG, Flat
  const [sharingType, setSharingType] = useState('All'); // All, Single, Double, Triple
  const [foodOption, setFoodOption] = useState('All'); // All, Food Included
  const [maxRent, setMaxRent] = useState(25000);
  const [maxWalkMinutes, setMaxWalkMinutes] = useState(20);
  const [acOnly, setAcOnly] = useState(false);
  const [attachedWashroomOnly, setAttachedWashroomOnly] = useState(false);
  const [sortBy, setSortBy] = useState('distance'); // 'distance', 'price_asc', 'price_desc', 'rating'
  const [layout, setLayout] = useState('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter and sort listings
  const filteredProperties = useMemo(() => {
    let list = STUDENT_PROPERTIES.filter(p => {
      if (!p) return false;
      // College match: if currentUniversity is set, prefer matching nearCollegeId or nearCollegeName
      if (currentUniversity && p.nearCollegeId !== currentUniversity.id) {
        return false;
      }
      return true;
    });

    // If no exact college listings match, fallback to showing all properties matching general city
    if (list.length === 0 && currentUniversity) {
      list = STUDENT_PROPERTIES.filter(p => 
        p && p.city && p.city.toLowerCase() === currentUniversity.city?.toLowerCase()
      );
    }

    // Apply User Filters
    return list.filter(p => {
      if (!p) return false;

      // Property type
      if (propertyType !== 'All') {
        if (!p.propertyType || !p.propertyType.toLowerCase().includes(propertyType.toLowerCase())) {
          return false;
        }
      }

      // Sharing type
      if (sharingType !== 'All') {
        if (!p.sharingType || !p.sharingType.toLowerCase().includes(sharingType.toLowerCase())) {
          return false;
        }
      }

      // Food
      if (foodOption === 'Food Included' && (!p.pricing || !p.pricing.foodIncluded)) {
        return false;
      }

      // Max Rent
      if (p.pricing?.monthlyRent && p.pricing.monthlyRent > maxRent) {
        return false;
      }

      // Walking minutes
      if (p.walkingTimeMinutes && p.walkingTimeMinutes > maxWalkMinutes) {
        return false;
      }

      // AC
      if (acOnly && !p.specs?.acAvailable) {
        return false;
      }

      // Attached Washroom
      if (attachedWashroomOnly && !p.specs?.attachedWashroom) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') {
        return (a.walkingTimeMinutes || 10) - (b.walkingTimeMinutes || 10);
      }
      if (sortBy === 'price_asc') {
        return (a.pricing?.monthlyRent || 0) - (b.pricing?.monthlyRent || 0);
      }
      if (sortBy === 'price_desc') {
        return (b.pricing?.monthlyRent || 0) - (a.pricing?.monthlyRent || 0);
      }
      if (sortBy === 'rating') {
        return (b.ratings?.average || 0) - (a.ratings?.average || 0);
      }
      return 0;
    });
  }, [currentUniversity, propertyType, sharingType, foodOption, maxRent, maxWalkMinutes, acOnly, attachedWashroomOnly, sortBy]);

  const resetFilters = () => {
    setPropertyType('All');
    setSharingType('All');
    setFoodOption('All');
    setMaxRent(25000);
    setMaxWalkMinutes(20);
    setAcOnly(false);
    setAttachedWashroomOnly(false);
    setSortBy('distance');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* ─────────────────────────────────────────────────────────────
          COLLEGE HERO BANNER
         ───────────────────────────────────────────────────────────── */}
      {currentUniversity && (
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl border border-slate-800">
          <div className="absolute inset-0 opacity-30">
            <img
              src={currentUniversity.bannerImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80'}
              alt={currentUniversity.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />

          <div className="relative p-6 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-indigo-500 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" /> Campus Hub
                </span>
                <span className="text-xs text-indigo-200 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  {currentUniversity.locality}, {currentUniversity.city}, {currentUniversity.state}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white">
                Student PGs & Rooms Near {currentUniversity.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300">
                Famous for {currentUniversity.famousFor || 'Top Academics'}. Direct owner contacts, zero brokerage, walking distance to campus.
              </p>

              {/* Student hubs tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                <span className="text-slate-400 font-medium">Nearest Areas:</span>
                {Array.isArray(currentUniversity.popularStudentHubs) && currentUniversity.popularStudentHubs.map((hub) => (
                  <span key={hub} className="bg-white/10 text-slate-200 px-2.5 py-1 rounded-lg border border-white/10 text-[11px]">
                    {hub}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick College Switcher & Rent Stats */}
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3 shrink-0 w-full sm:w-auto">
              <div>
                <span className="text-xs text-indigo-200 block">Average Student PG Rent</span>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">
                  ₹{currentUniversity.avgPgRent ? currentUniversity.avgPgRent.toLocaleString('en-IN') : '7,000'}{' '}
                  <span className="text-xs text-slate-300 font-normal">/ bed / mo</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <label className="text-[11px] text-slate-300 block mb-1 font-medium">
                  Switch to Another College:
                </label>
                <select
                  value={currentUniversity.id}
                  onChange={(e) => setSearchParams({ college: e.target.value })}
                  className="w-full bg-slate-800 text-white text-xs font-semibold p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-400"
                >
                  {UNIVERSITIES.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.city})
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT: FILTERS SIDEBAR + RESULTS
         ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block w-72 shrink-0 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              <span>Filters</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Accommodation Type
            </label>
            <div className="space-y-1 text-xs">
              {['All', 'Boys PG', 'Girls PG', 'Flat'].map((type) => (
                <button
                  key={type}
                  onClick={() => setPropertyType(type)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium flex items-center justify-between ${
                    propertyType === type
                      ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/80'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{type === 'Flat' ? 'Shared Flat / 2BHK' : type}</span>
                  {propertyType === type && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Sharing Preference */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Sharing Type
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {['All', 'Single', 'Double', 'Triple'].map((share) => (
                <button
                  key={share}
                  onClick={() => setSharingType(share)}
                  className={`p-2 rounded-xl text-center font-medium transition-colors ${
                    sharingType === share
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {share}
                </button>
              ))}
            </div>
          </div>

          {/* Max Monthly Budget Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider">Max Budget</span>
              <span className="font-extrabold text-indigo-600">₹{maxRent.toLocaleString('en-IN')}/mo</span>
            </div>
            <input
              type="range"
              min="4000"
              max="35000"
              step="500"
              value={maxRent}
              onChange={(e) => setMaxRent(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹4,000</span>
              <span>₹35,000</span>
            </div>
          </div>

          {/* Max Walking Distance Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider">Walking Distance</span>
              <span className="font-extrabold text-indigo-600">Within {maxWalkMinutes} mins</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="2"
              value={maxWalkMinutes}
              onChange={(e) => setMaxWalkMinutes(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5 min (0.5 km)</span>
              <span>30 min (3 km)</span>
            </div>
          </div>

          {/* Food Option */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Mess & Food
            </label>
            <div className="space-y-1 text-xs">
              {['All', 'Food Included'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFoodOption(option)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-colors font-medium flex items-center justify-between ${
                    foodOption === option
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-emerald-600" />
                    {option === 'Food Included' ? '3 Meals Included (Pure Veg)' : 'All (With or Without Food)'}
                  </span>
                  {foodOption === option && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
              Specific Perks
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={acOnly}
                onChange={(e) => setAcOnly(e.target.checked)}
                className="rounded accent-indigo-600"
              />
              <span>Air Conditioned (AC) Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={attachedWashroomOnly}
                onChange={(e) => setAttachedWashroomOnly(e.target.checked)}
                className="rounded accent-indigo-600"
              />
              <span>Attached Washroom</span>
            </label>
          </div>

          {/* AI Banner in Sidebar */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-2xl border border-indigo-100 text-xs space-y-2">
            <span className="font-bold text-indigo-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Need Help Choosing?
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Use our AI housing assistant to calculate commute vs rent trade-offs.
            </p>
            <Link
              to="/ai-finder"
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 inline-block"
            >
              Start AI Matchmaker →
            </Link>
          </div>
        </aside>

        {/* RESULTS CONTAINER */}
        <div className="flex-1 w-full space-y-6">
          
          {/* Top Sort & View Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {filteredProperties.length} Student Accommodations Found
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Verified genuine listings near {currentUniversity?.name || 'Selected Campus'}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500"
                >
                  <option value="distance">Nearest to Campus (Walking Min)</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Student Rating</option>
                </select>
              </div>

              {/* Grid / List layout toggle */}
              <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setLayout('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    layout === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayout('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    layout === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Properties Listing */}
          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No properties match your current filter criteria</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Try widening your budget slider, extending walking distance, or selecting "All" property types.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Reset All Filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  layout={layout}
                />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
