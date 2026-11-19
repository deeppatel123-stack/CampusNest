import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, X, ArrowRight, Check } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';

export default function ComparisonBar() {
  const { compareList, removeFromCompare, clearCompare, count } = useCompare();

  if (count === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-slate-700/80 flex items-center justify-between gap-4">
        {/* Left: Summary and thumbnails */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5 text-white" />
          </div>

          <div className="hidden sm:block">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Compare PGs & Rooms 
              <span className="bg-indigo-500/30 text-indigo-300 text-xs px-2 py-0.5 rounded-full border border-indigo-400/20">
                {count}/4 Selected
              </span>
            </h4>
            <p className="text-xs text-slate-400 truncate">Side-by-side rent, mess food, walking distance & deposit</p>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
            {compareList.map((item) => (
              <div key={item.id} className="relative group shrink-0">
                <img
                  src={item.photos?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=200&q=80'}
                  alt={item.title}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-600"
                />
                <button
                  onClick={() => removeFromCompare(item.id)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-600 text-white rounded-full flex items-center justify-center text-[10px] hover:bg-rose-700 transition-colors shadow-sm"
                  title="Remove from compare"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors"
          >
            Clear
          </button>

          <Link
            to="/compare"
            className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
