import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  CheckCircle2, 
  MapPin, 
  GraduationCap, 
  ShieldCheck, 
  Utensils, 
  Phone, 
  MessageSquare, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { UNIVERSITIES } from '../data/universitiesData';

export default function ListPropertyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    nearCollegeId: 'nirma-univ-ahmedabad',
    propertyType: 'Boys PG',
    sharingType: 'Double Sharing',
    monthlyRent: '',
    depositAmount: '',
    foodIncluded: true,
    foodFrequency: '3 Meals Daily (Pure Veg)',
    distanceToCollege: '0.8 km (6 min walk)',
    address: '',
    ownerName: '',
    ownerPhone: '',
    ownerWhatsapp: '',
    amenities: ['High-Speed Wi-Fi', 'RO Drinking Water', 'Air Conditioned Rooms', 'Daily Housekeeping'],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Free Listing for Student Accommodations</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          List Your PG, Room, or Flat for College Students
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Connect directly with thousands of verified university students looking for rooms near campus. Zero brokerage and direct WhatsApp inquiries.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200 shadow-xl text-center max-w-xl mx-auto space-y-5 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Listing Submitted Successfully!</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our campus verification team will review your property details and contact number <strong className="text-slate-900">{formData.ownerPhone}</strong> within 2 hours to activate the listing near {UNIVERSITIES.find(u => u.id === formData.nearCollegeId)?.name || 'Campus'}.
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <Link
              to="/search?college=nirma-univ-ahmedabad"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Browse Active Listings
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
          
          {/* Section 1: College & Type */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <GraduationCap className="w-4 h-4 text-indigo-600" /> 1. Campus Location & Property Type
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nearest College / University *</label>
                <select
                  required
                  value={formData.nearCollegeId}
                  onChange={(e) => setFormData({ ...formData, nearCollegeId: e.target.value })}
                  className="w-full text-xs font-medium p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-white"
                >
                  {UNIVERSITIES.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.city})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Accommodation Type *</label>
                <select
                  required
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full text-xs font-medium p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-white"
                >
                  <option>Boys PG</option>
                  <option>Girls PG</option>
                  <option>Co-ed Student Hostel</option>
                  <option>Shared Student Flat (2BHK / 3BHK)</option>
                  <option>Independent 1BHK / RK</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Property Name / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Palace Student Boys PG"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Distance & Commute to Campus *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 0.8 km (6 min walk to Gate 2)"
                  value={formData.distanceToCollege}
                  onChange={(e) => setFormData({ ...formData, distanceToCollege: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Exact Address & Locality *</label>
              <input
                type="text"
                required
                placeholder="e.g. Near Vaishno Devi Circle, SG Highway, Gota, Ahmedabad"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Section 2: Pricing & Food */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Utensils className="w-4 h-4 text-emerald-600" /> 2. Rent, Sharing & Food
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Monthly Rent / Bed (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 7500"
                  value={formData.monthlyRent}
                  onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Security Deposit (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 10000"
                  value={formData.depositAmount}
                  onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Sharing Type *</label>
                <select
                  value={formData.sharingType}
                  onChange={(e) => setFormData({ ...formData, sharingType: e.target.value })}
                  className="w-full text-xs font-medium p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-white"
                >
                  <option>Single Occupancy</option>
                  <option>Double Sharing</option>
                  <option>Triple Sharing</option>
                  <option>4+ Sharing</option>
                  <option>Entire Flat (for student group)</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-950 block">Include Mess Meals in the Rent?</span>
                <span className="text-[11px] text-emerald-700">92% of students prefer accommodations with hygienic food included.</span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-emerald-900 shrink-0">
                <input
                  type="checkbox"
                  checked={formData.foodIncluded}
                  onChange={(e) => setFormData({ ...formData, foodIncluded: e.target.checked })}
                  className="rounded accent-emerald-600 w-4 h-4"
                />
                <span>Yes, 3 Meals Included (Pure Veg)</span>
              </label>
            </div>
          </div>

          {/* Section 3: Verified Contact Info */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Phone className="w-4 h-4 text-blue-600" /> 3. Direct Owner Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name (Owner/Warden) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Calling Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98250 44192"
                  value={formData.ownerPhone}
                  onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98250 44192"
                  value={formData.ownerWhatsapp}
                  onChange={(e) => setFormData({ ...formData, ownerWhatsapp: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-600/25 transition-all hover:scale-[1.01]"
          >
            Publish Free Student Housing Listing
          </button>
        </form>
      )}

    </div>
  );
}
