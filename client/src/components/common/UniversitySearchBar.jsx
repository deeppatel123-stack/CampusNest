import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, GraduationCap, ArrowRight, Building, Sparkles } from 'lucide-react';
import { UNIVERSITIES } from '../../data/universitiesData';

export default function UniversitySearchBar({ 
  placeholder = "Search college (e.g. Nirma University, DU, IIT Bombay, VIT)...", 
  initialQuery = "", 
  variant = "hero", // "hero" or "compact"
  onSelect = null 
}) {
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredUniversities = query.trim() === ''
    ? UNIVERSITIES.slice(0, 6) // Show top 6 recommendations by default
    : UNIVERSITIES.filter((u) => {
        const q = query.toLowerCase();
        return (
          u.name.toLowerCase().includes(q) ||
          u.shortName.toLowerCase().includes(q) ||
          u.city.toLowerCase().includes(q) ||
          u.locality.toLowerCase().includes(q) ||
          u.popularStudentHubs.some(hub => hub.toLowerCase().includes(q))
        );
      });

  const handleSelect = (uni) => {
    setQuery(uni.name);
    setIsOpen(false);
    if (onSelect) {
      onSelect(uni);
    } else {
      navigate(`/search?college=${uni.id}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((prev) => (prev < filteredUniversities.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredUniversities.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && filteredUniversities[highlightedIndex]) {
        handleSelect(filteredUniversities[highlightedIndex]);
      } else if (filteredUniversities.length > 0) {
        handleSelect(filteredUniversities[0]);
      } else {
        // Fallback generic search
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const isHero = variant === "hero";

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto">
      {/* Input container */}
      <div 
        className={`flex items-center gap-3 transition-all duration-300 ${
          isHero
            ? 'bg-white p-2 sm:p-2.5 rounded-2xl shadow-xl shadow-blue-900/10 border-2 border-indigo-100 hover:border-indigo-300 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-100'
            : 'bg-slate-50 p-1.5 rounded-xl border border-slate-200 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100'
        }`}
      >
        <div className={`flex items-center justify-center rounded-xl shrink-0 ${isHero ? 'w-12 h-12 bg-indigo-50 text-indigo-600' : 'w-8 h-8 text-slate-400'}`}>
          <GraduationCap className={isHero ? 'w-6 h-6' : 'w-4 h-4'} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none ${isHero ? 'text-base sm:text-lg font-medium' : 'text-sm'}`}
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(true);
            }}
            className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded-md"
          >
            Clear
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            if (filteredUniversities.length > 0) {
              handleSelect(filteredUniversities[0]);
            } else {
              navigate(`/search?q=${encodeURIComponent(query)}`);
            }
          }}
          className={`flex items-center gap-2 font-semibold text-white rounded-xl transition-all shrink-0 ${
            isHero
              ? 'px-5 sm:px-7 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md shadow-indigo-500/25'
              : 'px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs'
          }`}
        >
          <Search className={isHero ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
          <span className="hidden sm:inline">Find PGs & Rooms</span>
        </button>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-1.5 flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>{query.trim() ? 'Matching Campuses' : 'Top Student Hubs in India'}</span>
            <span className="flex items-center gap-1 text-indigo-600 font-medium lowercase">
              <Sparkles className="w-3 h-3" /> real verified data
            </span>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
            {filteredUniversities.length === 0 ? (
              <div className="px-6 py-8 text-center text-slate-500">
                <Building className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="font-medium text-slate-700">No college found matching "{query}"</p>
                <p className="text-xs text-slate-400 mt-1">Try searching "Nirma", "IIT Bombay", "DU", or "VIT"</p>
              </div>
            ) : (
              filteredUniversities.map((uni, idx) => (
                <div
                  key={uni.id}
                  onClick={() => handleSelect(uni)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`px-4 py-3 cursor-pointer flex items-center justify-between transition-colors ${
                    highlightedIndex === idx ? 'bg-indigo-50/80 text-indigo-950' : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-50 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-100/50">
                      {uni.shortName.slice(0, 3)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-2">
                        {uni.name}
                        {uni.id === 'nirma-univ-ahmedabad' && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            Popular Choice
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{uni.locality}, {uni.city}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-emerald-600 font-medium">Avg PG: ₹{uni.avgPgRent.toLocaleString('en-IN')}/mo</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-right">
                    <div className="hidden sm:block">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
                        {uni.totalVerifiedProperties}+ listings
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick pill options */}
          <div className="mt-2 pt-2 border-t border-slate-100 px-4 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium">Quick pick:</span>
            {['Nirma University', 'DU North Campus', 'IIT Bombay', 'VIT Vellore'].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  const found = UNIVERSITIES.find(u => u.name.includes(name) || u.shortName.includes(name));
                  if (found) handleSelect(found);
                }}
                className="bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 text-slate-700 px-2.5 py-1 rounded-lg transition-colors font-medium"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
