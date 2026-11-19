import React, { useState } from 'react';
import { X, Phone, MessageSquare, Calendar, ShieldCheck, CheckCircle2, User, Clock, AlertCircle } from 'lucide-react';

export default function ContactModal({ property, isOpen, onClose }) {
  if (!isOpen || !property) return null;

  const [visitBooked, setVisitBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: 'Morning (10:00 AM - 1:00 PM)',
  });

  const owner = property.verifiedOwner || {
    name: 'Property Manager',
    contactNumber: '+91 98250 44192',
    whatsapp: '+91 98250 44192',
    verificationStatus: 'Verified Student Accommodation',
    responseRate: 'Responds within 15 mins'
  };

  const whatsappMessage = encodeURIComponent(
    `Hi ${owner.name}, I found your student accommodation "${property.title}" near ${property.nearCollegeName} on CampusNest. I would like to inquire about room availability, monthly rent (₹${property.pricing.monthlyRent}), and schedule a visit. Could you please share the details?`
  );

  const cleanPhone = owner.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMessage}`;
  const callUrl = `tel:${owner.contactNumber.replace(/\s+/g, '')}`;

  const handleBookVisit = (e) => {
    e.preventDefault();
    setVisitBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 text-white flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Owner
              </span>
              <span className="text-xs text-indigo-200">Zero Brokerage Guarantee</span>
            </div>
            <h3 className="text-lg font-bold mt-1 text-white leading-tight">{property.title}</h3>
            <p className="text-xs text-indigo-100 mt-0.5">Near {property.nearCollegeName} ({property.distanceToCollege})</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Owner details card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-base">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{owner.name}</h4>
                <p className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {owner.verificationStatus}
                </p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> {owner.responseRate}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 block">Rent / Bed</span>
              <span className="text-base font-extrabold text-indigo-600">₹{property.pricing.monthlyRent.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-slate-400 block">/month</span>
            </div>
          </div>

          {/* Quick Direct Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Chat</span>
            </a>

            <a
              href={callUrl}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
            >
              <Phone className="w-4 h-4" />
              <span>Call Direct</span>
            </a>
          </div>

          <div className="text-center">
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Direct Phone: <strong className="text-slate-800 font-bold">{owner.contactNumber}</strong>
            </span>
          </div>

          {/* Schedule a Visit Section */}
          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-2">
              <Calendar className="w-4 h-4 text-indigo-600" /> Schedule Free In-Person Visit
            </h4>

            {visitBooked ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-emerald-800 text-sm">Visit Request Sent!</h5>
                <p className="text-xs text-emerald-700 mt-1">
                  The property manager ({owner.name}) has been notified. You will receive an SMS and WhatsApp confirmation with the exact GPS map pin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookVisit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">Your Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">Time Slot</label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-white"
                    >
                      <option>Morning (10:00 AM - 1:00 PM)</option>
                      <option>Afternoon (1:00 PM - 4:00 PM)</option>
                      <option>Evening (4:00 PM - 7:00 PM)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl transition-colors shadow-sm"
                >
                  Confirm Free Visit
                </button>
              </form>
            )}
          </div>

          {/* Student Advisory */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>CampusNest Safety Guarantee:</strong> Never pay booking amount or token money before physically inspecting the room and verifying the agreement. All visits arranged through CampusNest are 100% free with zero brokerage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
