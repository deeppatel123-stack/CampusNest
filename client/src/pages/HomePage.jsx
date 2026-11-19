import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  Footprints, 
  Utensils, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Building2, 
  PhoneCall, 
  TrendingDown, 
  Users, 
  HeartHandshake,
  Star
} from 'lucide-react';
import UniversitySearchBar from '../components/common/UniversitySearchBar';
import PropertyCard from '../components/common/PropertyCard';
import { UNIVERSITIES } from '../data/universitiesData';
import { STUDENT_PROPERTIES } from '../data/studentPropertiesData';

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Nirma properties as benchmark highlight
  const nirmaProperties = STUDENT_PROPERTIES.filter(p => p && p.nearCollegeId === 'nirma-univ-ahmedabad');
  
  // Filtered properties for the showcase section
  const showcaseProperties = selectedFilter === 'All'
    ? STUDENT_PROPERTIES.slice(0, 6)
    : selectedFilter === 'Nirma'
    ? nirmaProperties
    : selectedFilter === 'Boys'
    ? STUDENT_PROPERTIES.filter(p => p && p.propertyType && p.propertyType.includes('Boys')).slice(0, 6)
    : selectedFilter === 'Girls'
    ? STUDENT_PROPERTIES.filter(p => p && p.propertyType && p.propertyType.includes('Girls')).slice(0, 6)
    : STUDENT_PROPERTIES.filter(p => p && p.pricing && p.pricing.foodIncluded).slice(0, 6);

  return (
    <div className="space-y-20 pb-16">
      
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION
         ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 bg-gradient-to-b from-indigo-50/70 via-white to-white">
        {/* Decorative background blurs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-tr from-indigo-200/40 via-blue-100/30 to-purple-200/30 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-200/80 shadow-sm text-xs font-bold text-indigo-700 animate-in fade-in slide-in-from-top-4 duration-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Dedicated Student Housing Across Top Indian Universities</span>
            <span className="bg-indigo-100 text-indigo-800 text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase">
              Zero Brokerage
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Find Verified PGs & Rooms Near Your{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800 bg-clip-text text-transparent">
                College Campus
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
              Search your university like <strong className="text-slate-900 font-bold underline decoration-indigo-300">Nirma University Ahmedabad</strong>, DU, or IIT Bombay. View real photos, genuine rates, walking distance, mess menus & direct owner numbers.
            </p>
          </div>

          {/* College Search Bar (Prominent) */}
          <div className="pt-2">
            <UniversitySearchBar />
          </div>

          {/* Quick University Shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-slate-500 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" /> Popular Campuses:
            </span>
            <Link
              to="/search?college=nirma-univ-ahmedabad"
              className="bg-indigo-600 text-white font-bold px-3 py-1.5 rounded-xl shadow-sm shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center gap-1.5"
            >
              <span>Nirma University (Ahmedabad)</span>
              <span className="bg-white/20 text-[10px] px-1.5 py-0.2 rounded-md font-normal">Hot</span>
            </Link>
            <Link
              to="/search?college=du-north-campus-delhi"
              className="bg-white hover:bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-xl border border-slate-200 transition-all"
            >
              DU North Campus
            </Link>
            <Link
              to="/search?college=iit-bombay-mumbai"
              className="bg-white hover:bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-xl border border-slate-200 transition-all"
            >
              IIT Bombay (Powai)
            </Link>
            <Link
              to="/search?college=vit-vellore"
              className="bg-white hover:bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-xl border border-slate-200 transition-all"
            >
              VIT Vellore
            </Link>
            <Link
              to="/search?college=symbiosis-pune"
              className="bg-white hover:bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-xl border border-slate-200 transition-all"
            >
              Symbiosis Pune
            </Link>
          </div>

          {/* 4 Trust Metrics */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 bg-white/90 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Zero Brokerage</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Direct contact with PG owners & wardens</p>
              </div>
            </div>

            <div className="p-4 bg-white/90 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Campus Walking Distances</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Accurate 3 to 10 min commute verified</p>
              </div>
            </div>

            <div className="p-4 bg-white/90 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Mess & Food Quality</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Pure Veg & Jain meal schedules reviewed</p>
              </div>
            </div>

            <div className="p-4 bg-white/90 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">AI Student Matchmaker</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Personalized picks based on your budget</p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SPOTLIGHT: NIRMA UNIVERSITY, AHMEDABAD (Gota, SG Highway)
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative border border-indigo-800/40">
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-bold">
                <GraduationCap className="w-4 h-4" /> Campus Spotlight • Gujarat
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Student Housing Near Nirma University, Ahmedabad
              </h2>
              <p className="text-sm text-indigo-200 max-w-2xl">
                Located on SG Highway / Chandlodiya / Gota. Verified Boys & Girls PGs, hostel rooms, and shared 2BHK/3BHK flats with 3-time meals and high-speed Wi-Fi.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-right">
                <span className="text-xs text-indigo-200 block">Avg Monthly Rent</span>
                <span className="text-lg font-black text-emerald-400">₹6,500 - ₹8,500</span>
              </div>
              <Link
                to="/search?college=nirma-univ-ahmedabad"
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
              >
                <span>View All 18 Listings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Popular Student Hubs Near Nirma */}
          <div className="relative z-10 flex flex-wrap items-center gap-2 mb-8 text-xs">
            <span className="text-indigo-300 font-semibold">Popular localities near Nirma:</span>
            {['Gota (Opp. Gate 2)', 'Vaishno Devi Circle', 'Tragad Road', 'Chandlodiya', 'Jagatpur Godrej Garden City'].map((hub) => (
              <span key={hub} className="bg-white/10 text-slate-200 px-3 py-1 rounded-xl border border-white/10 font-medium">
                {hub}
              </span>
            ))}
          </div>

          {/* Grid of Nirma Properties */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nirmaProperties.slice(0, 4).map((property) => (
              <div key={property.id} className="bg-white rounded-2xl overflow-hidden text-slate-900 p-3 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="relative h-40 rounded-xl overflow-hidden mb-3 bg-slate-100">
                    <img
                      src={property.photos?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80'}
                      alt={property.title || 'Nirma PG'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-600 text-white">
                      {property.propertyType || 'Student PG'}
                    </span>
                    <span className="absolute bottom-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/70 text-white flex items-center gap-1">
                      <Footprints className="w-3 h-3 text-amber-400" /> {property.distanceToCollege || 'Nearby'}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{property.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" /> {property.locality}
                  </p>

                  <div className="mt-2 text-xs text-slate-600 flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                    <span>{property.sharingType}</span>
                    <span className="text-emerald-700 font-bold">Food Included</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Rent / mo</span>
                    <span className="text-sm font-black text-indigo-600">₹{property.pricing?.monthlyRent ? property.pricing.monthlyRent.toLocaleString('en-IN') : '7,500'}</span>
                  </div>
                  <Link
                    to={`/property/${property.id}`}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          FEATURED LISTINGS SECTION WITH TABS
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Handpicked Student Housing
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Popular Verified Accommodations
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top-rated PGs, shared flats & hostels with active student communities.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold text-slate-600">
            {['All', 'Nirma', 'Boys', 'Girls', 'Food Included'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  selectedFilter === filter
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'hover:text-slate-900'
                }`}
              >
                {filter === 'Nirma' ? 'Nirma University' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseProperties.map((property) => (
            <PropertyCard key={property.id} property={property} layout="grid" />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 font-bold text-sm transition-all"
          >
            <span>Explore All 80+ College Accommodations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          AI SUGGESTION & ROOMMATE FINDER TEASER
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-2xl space-y-5 relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
              CampusNest AI Smart Match
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Confused between 10 different PGs? Let AI pick your best match in 30 seconds.
            </h2>

            <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
              Tell us your college (e.g. Nirma, DU, IIT), your monthly budget, sharing preference, and food habits. Our intelligent algorithm calculates travel time, mess reviews, deposit ratio, and ranks the top 3 best fits for you.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/ai-finder"
                className="px-6 py-3.5 bg-white hover:bg-slate-100 text-indigo-700 rounded-2xl font-black text-sm shadow-xl shadow-black/10 transition-all hover:scale-105 flex items-center gap-2"
              >
                <span>Launch AI Housing Matchmaker</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-indigo-200">100% Free for Students</span>
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          TOP CAMPUSES DIRECTORY GRID
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Explore By Campus
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Top Universities We Cover in India
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Browse student hostels, paying guest accommodations, and flats near major colleges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNIVERSITIES.slice(0, 6).map((uni) => (
            <div
              key={uni.id}
              onClick={() => navigate(`/search?college=${uni.id}`)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={uni.bannerImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'}
                  alt={uni.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-600/90 backdrop-blur-md">
                    {uni.city}, {uni.state}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1 group-hover:text-indigo-200 transition-colors">
                    {uni.name}
                  </h3>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="text-xs text-slate-500 flex items-center justify-between">
                  <span className="flex items-center gap-1 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" /> {uni.type}
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md text-[11px]">
                    Avg: ₹{uni.avgPgRent ? uni.avgPgRent.toLocaleString('en-IN') : '7,000'}/mo
                  </span>
                </div>

                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Student Hubs:</span>{' '}
                  <span className="text-slate-500">{Array.isArray(uni.popularStudentHubs) ? uni.popularStudentHubs.slice(0, 3).join(', ') : ''}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                  <span>{uni.totalVerifiedProperties || 15}+ verified listings</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PRICE COMPARISON HIGHLIGHT SECTION
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
              <Layers className="w-3.5 h-3.5" /> Price & Cost Breakdown
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Compare 2 to 4 PGs Side-by-Side
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Don't get tricked by hidden electricity costs or maintenance fees. Compare true total monthly expenditure: Rent + Food + Electricity + Walking Distance + Deposit.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 pt-2">
              <span className="flex items-center gap-1 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" /> Real Mess Menus
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" /> Curfew & House Rules
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" /> Owner WhatsApp Numbers
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <Link
              to="/compare"
              className="px-6 py-3.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-2xl text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <span>Open Comparison Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
