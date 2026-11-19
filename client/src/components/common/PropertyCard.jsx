import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MapPin, 
  Footprints, 
  Utensils, 
  ShieldCheck, 
  Wifi, 
  Wind, 
  Phone, 
  MessageSquare, 
  Layers, 
  Star
} from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useCompare } from '../../context/CompareContext';
import ContactModal from './ContactModal';

export default function PropertyCard({ property, layout = 'grid' }) {
  if (!property || !property.id) return null;

  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, toggleCompare } = useCompare();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);

  // Property photos fallback
  const photos = Array.isArray(property.photos) && property.photos.length > 0
    ? property.photos
    : ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'];

  const currentPhoto = photos[activePhotoIndex] || photos[0];
  const isGrid = layout === 'grid';
  const propertyType = property.propertyType || 'Student PG';

  return (
    <>
      <div 
        className={`group bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-indigo-300 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 flex ${
          isGrid ? 'flex-col' : 'flex-col md:flex-row'
        }`}
      >
        {/* Top/Left Media Container */}
        <div className={`relative ${isGrid ? 'w-full h-56' : 'w-full md:w-80 h-64 md:h-auto shrink-0'} overflow-hidden bg-slate-100`}>
          <img
            src={currentPhoto}
            alt={property.title || 'Accommodation'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Badges on Top */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
                propertyType.includes('Girls')
                  ? 'bg-rose-500/90 text-white'
                  : propertyType.includes('Boys')
                  ? 'bg-blue-600/90 text-white'
                  : 'bg-indigo-600/90 text-white'
              }`}>
                {propertyType}
              </span>

              {property.pricing?.foodIncluded && (
                <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-emerald-600/90 text-white backdrop-blur-md flex items-center gap-1 shadow-sm">
                  <Utensils className="w-3 h-3" /> Food Included
                </span>
              )}
            </div>

            {/* Favorite & Compare Quick Action Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggleCompare(property);
                }}
                title={compared ? "Remove from comparison" : "Add to compare"}
                className={`p-2 rounded-full transition-all backdrop-blur-md ${
                  compared 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                    : 'bg-white/80 text-slate-700 hover:bg-white hover:text-indigo-600'
                }`}
              >
                <Layers className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggleFavorite(property.id);
                }}
                title={favorited ? "Remove from favorites" : "Save to favorites"}
                className={`p-2 rounded-full transition-all backdrop-blur-md ${
                  favorited
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                    : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Distance Tag on Image Bottom */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl">
              <Footprints className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">{property.distanceToCollege || `${property.walkingTimeMinutes || 6} min walk`}</span>
            </div>

            {property.ratings?.average && (
              <div className="flex items-center gap-1 bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-lg text-xs shadow-sm">
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                <span>{property.ratings.average}</span>
                <span className="text-[10px] text-slate-700 font-normal">({property.ratings.totalReviews || 12})</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Campus link & Locality */}
            <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-semibold mb-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="truncate">Near {property.nearCollegeName || 'Campus'} • {property.locality || ''}</span>
            </div>

            {/* Title */}
            <Link 
              to={`/property/${property.id}`}
              className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 block mb-2"
            >
              {property.title}
            </Link>

            {/* Room specs and sharing types */}
            <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-700">
                {property.sharingType || 'Shared Room'}
              </span>
              {property.specs?.acAvailable && (
                <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                  <Wind className="w-3 h-3" /> AC
                </span>
              )}
              {property.specs?.attachedWashroom && (
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-medium">
                  Attached Bath
                </span>
              )}
              {property.verifiedOwner && (
                <span className="text-emerald-700 font-medium flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified
                </span>
              )}
            </div>

            {/* Student highlight snippet */}
            {Array.isArray(property.studentHighlights) && property.studentHighlights.length > 0 && (
              <p className="text-xs text-slate-500 line-clamp-2 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 mb-3">
                "{property.studentHighlights[0]}"
              </p>
            )}

            {/* Key amenities pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {Array.isArray(property.amenities) && property.amenities.slice(0, 3).map((amenity, idx) => (
                <span 
                  key={idx} 
                  className="text-[11px] text-slate-600 bg-slate-100/80 px-2 py-0.5 rounded-md font-medium"
                >
                  {typeof amenity === 'string' ? amenity.replace(/\(.*?\)/g, '') : amenity}
                </span>
              ))}
              {property.amenities?.length > 3 && (
                <span className="text-[10px] text-slate-400 self-center">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Pricing & Actions Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Starts from</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-extrabold text-slate-900">
                  ₹{property.pricing?.monthlyRent ? property.pricing.monthlyRent.toLocaleString('en-IN') : 'N/A'}
                </span>
                <span className="text-xs text-slate-500">/mo</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                title="Call or WhatsApp Owner"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Contact</span>
              </button>

              <Link
                to={`/property/${property.id}`}
                className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-slate-900/10"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Contact Modal */}
      <ContactModal
        property={property}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
