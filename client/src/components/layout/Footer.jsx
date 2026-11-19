import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Heart, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { UNIVERSITIES } from '../../data/universitiesData';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Highlight Banner */}
        <div className="bg-gradient-to-r from-indigo-900/60 via-blue-900/40 to-slate-900 rounded-3xl p-6 sm:p-10 border border-indigo-800/40 mb-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-4 h-4" /> AI-Powered Student Housing
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Studying at Nirma University, DU, or IIT Bombay?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Get matched with verified PGs and flats within walking distance of your campus. 100% Direct Owner Contacts with Zero Brokerage.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/ai-finder"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all"
            >
              Try AI Finder
            </Link>
            <Link
              to="/search?college=nirma-univ-ahmedabad"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold border border-white/10 transition-all"
            >
              Explore Nirma PGs
            </Link>
          </div>
        </div>

        {/* Top Colleges Directory Grid */}
        <div className="mb-14 pb-12 border-b border-slate-800">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-6 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            Top Indian Universities & Campuses Directory
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
            {UNIVERSITIES.map((uni) => (
              <Link
                key={uni.id}
                to={`/search?college=${uni.id}`}
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-indigo-950/50 hover:text-indigo-300 border border-slate-800/80 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="font-semibold text-slate-200 group-hover:text-white block truncate">
                    {uni.shortName}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-indigo-400/80 shrink-0" /> {uni.city}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 mt-2 font-medium">
                  from ₹{uni.avgPgRent.toLocaleString('en-IN')}/mo
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* 4 Columns Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">CampusNest</span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              India's dedicated student housing platform connecting college students with real, verified PGs, hostels, and shared flats directly from owners near campus.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> 100% Zero Brokerage Platform
            </div>
          </div>

          {/* Col 2: Student Housing Hubs */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">Ahmedabad Student Hubs</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/search?college=nirma-univ-ahmedabad" className="hover:text-white transition-colors">
                  PGs near Nirma University (Gota)
                </Link>
              </li>
              <li>
                <Link to="/search?college=nirma-univ-ahmedabad" className="hover:text-white transition-colors">
                  Student flats SG Highway / Tragad
                </Link>
              </li>
              <li>
                <Link to="/search?college=nirma-univ-ahmedabad" className="hover:text-white transition-colors">
                  Girls PGs near Vaishno Devi Circle
                </Link>
              </li>
              <li>
                <Link to="/search?college=nirma-univ-ahmedabad" className="hover:text-white transition-colors">
                  Boys Hostel Chandlodiya / Jagatpur
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Tools */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">Student Tools</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-finder" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> AI Room & Budget Matcher
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition-colors">
                  Side-by-Side PG Cost Comparison
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-white transition-colors">
                  Shortlisted Hostels & Flats
                </Link>
              </li>
              <li>
                <Link to="/list-property" className="hover:text-white transition-colors">
                  List Your Room or PG (Free)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Support */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">Student Support & Safety</h5>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Need help finding accommodation near your college or want to report an issue?
            </p>
            <div className="space-y-1.5 text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>support@campusnest.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Student Helpline: +91 98250 44192</span>
              </div>
            </div>
            <div className="pt-2 text-[10px] text-slate-500">
              Physical verification conducted by campus student ambassadors.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CampusNest India. Dedicated to university students across India.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Built with care for Indian college students</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </div>
        </div>

      </div>
    </footer>
  );
}
