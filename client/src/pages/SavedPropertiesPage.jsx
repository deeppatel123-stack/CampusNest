import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { STUDENT_PROPERTIES } from '../data/studentPropertiesData';
import PropertyCard from '../components/common/PropertyCard';

export default function SavedPropertiesPage() {
  const { favorites, clearFavorites, toggleFavorite } = useFavorites();

  const savedListings = STUDENT_PROPERTIES.filter((p) => favorites.includes(p.id));

  const handleAddSample = () => {
    // Add first 2 Nirma properties to favorites
    const samples = STUDENT_PROPERTIES.filter(p => p.nearCollegeId === 'nirma-univ-ahmedabad').slice(0, 2);
    samples.forEach(s => toggleFavorite(s.id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider">
            <Heart className="w-4 h-4 fill-rose-600" /> Shortlisted Accommodations
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Saved PGs & Student Rooms
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep track of your favorite hostels and share them with your parents or future roommates.
          </p>
        </div>

        {savedListings.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={clearFavorites}
              className="px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Wishlist</span>
            </button>
            <Link
              to="/search"
              className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
            >
              Explore More
            </Link>
          </div>
        )}
      </div>

      {/* Empty State or List */}
      {savedListings.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 sm:p-16 border-2 border-dashed border-slate-200 text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">No properties saved yet</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Click the heart icon on any PG or hostel card to bookmark it and compare it later.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleAddSample}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Save Nirma University PGs (Sample)</span>
            </button>
            <Link
              to="/search?college=nirma-univ-ahmedabad"
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
            >
              Browse Campus Listings
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedListings.map((property) => (
            <PropertyCard key={property.id} property={property} layout="grid" />
          ))}
        </div>
      )}

    </div>
  );
}
