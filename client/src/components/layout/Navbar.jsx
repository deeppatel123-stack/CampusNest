import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Sparkles, 
  Layers, 
  Heart, 
  PlusCircle, 
  Menu, 
  X, 
  Search,
  Building,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { useFavorites } from '../../context/FavoritesContext';
import UniversitySearchBar from '../common/UniversitySearchBar';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const { count: compareCount } = useCompare();
  const { count: favoritesCount } = useFavorites();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Left: Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/25 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
                  CampusNest
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-600 -mt-1">
                  India Student Housing
                </span>
              </div>
            </Link>

            {/* Middle: Compact Search Bar (Shown when not on homepage or when toggled) */}
            {!isHome && (
              <div className="hidden md:block flex-1 max-w-md mx-4">
                <UniversitySearchBar variant="compact" placeholder="Search another college (e.g. Nirma, IIT, DU)..." />
              </div>
            )}

            {/* Right: Nav items */}
            <div className="hidden lg:flex items-center gap-3">
              {/* College Direct Explorer */}
              <Link
                to="/search?college=nirma-univ-ahmedabad"
                className="text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>Nirma University PGs</span>
              </Link>

              {/* AI Finder Button */}
              <Link
                to="/ai-finder"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 hover:from-indigo-100 hover:to-blue-100 text-xs font-bold border border-indigo-200/60 shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                <span>AI Housing Finder</span>
                <span className="bg-indigo-600 text-white text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-extrabold">
                  Smart
                </span>
              </Link>

              {/* Compare Button */}
              <Link
                to="/compare"
                className="relative text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4 text-slate-500" />
                <span>Compare</span>
                {compareCount > 0 && (
                  <span className="w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Link>

              {/* Saved/Favorites */}
              <Link
                to="/saved"
                className="relative text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Heart className="w-4 h-4 text-slate-500" />
                <span>Saved</span>
                {favoritesCount > 0 && (
                  <span className="w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* Post Free Listing */}
              <Link
                to="/list-property"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-md shadow-slate-900/10"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post PG / Flat (Free)</span>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/ai-finder"
                className="p-2 rounded-xl bg-indigo-50 text-indigo-600"
                title="AI Finder"
              >
                <Sparkles className="w-4 h-4" />
              </Link>

              <Link
                to="/compare"
                className="relative p-2 rounded-xl bg-slate-100 text-slate-700"
                title="Compare"
              >
                <Layers className="w-4 h-4" />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="mb-3">
              <UniversitySearchBar variant="compact" placeholder="Search college (e.g. Nirma, IIT, DU)..." />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/search?college=nirma-univ-ahmedabad"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-slate-50 hover:bg-indigo-50 rounded-xl text-xs font-semibold text-slate-800 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span>Nirma University</span>
              </Link>

              <Link
                to="/ai-finder"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Room Finder</span>
              </Link>

              <Link
                to="/compare"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-600" />
                  <span>Compare PGs</span>
                </div>
                {compareCount > 0 && (
                  <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {compareCount}
                  </span>
                )}
              </Link>

              <Link
                to="/saved"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Saved List</span>
                </div>
                {favoritesCount > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            </div>

            <Link
              to="/list-property"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Your PG / Room for Free</span>
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
