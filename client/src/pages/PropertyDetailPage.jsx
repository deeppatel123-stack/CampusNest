import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Footprints, 
  Utensils, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Heart, 
  Layers, 
  Star, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Wifi, 
  Wind, 
  Check, 
  AlertCircle, 
  ChevronRight, 
  Share2, 
  Info,
  Car,
  Bike
} from 'lucide-react';
import { STUDENT_PROPERTIES } from '../data/studentPropertiesData';
import { UNIVERSITIES } from '../data/universitiesData';
import { useFavorites } from '../context/FavoritesContext';
import { useCompare } from '../context/CompareContext';
import ContactModal from '../components/common/ContactModal';
import PropertyCard from '../components/common/PropertyCard';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, toggleCompare } = useCompare();

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Find property by id
  const property = STUDENT_PROPERTIES.find((p) => p && p.id === id) || STUDENT_PROPERTIES[0];

  if (!property) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Accommodation Not Found</h2>
        <p className="text-sm text-slate-500">The requested property listing could not be found.</p>
        <Link to="/search" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold">
          Browse All Campuses
        </Link>
      </div>
    );
  }

  const college = UNIVERSITIES.find((u) => u.id === property.nearCollegeId) || UNIVERSITIES[0];

  // Similar properties near same college
  const similarProperties = STUDENT_PROPERTIES.filter(
    (p) => p && p.nearCollegeId === property.nearCollegeId && p.id !== property.id
  ).slice(0, 3);

  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);

  const photos = Array.isArray(property.photos) && property.photos.length > 0
    ? property.photos
    : ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80'];

  const currentPhoto = photos[selectedPhotoIndex] || photos[0];

  const owner = property.verifiedOwner || {
    name: 'Warden / Property Manager',
    contactNumber: '+91 98250 44192',
    whatsapp: '+91 98250 44192',
    verificationStatus: 'Verified Accommodation',
    responseRate: 'Responds within 10 minutes'
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* ─────────────────────────────────────────────────────────────
          BREADCRUMBS & TOP ACTIONS
         ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/search?college=${property.nearCollegeId}`} className="hover:text-indigo-600 transition-colors font-medium">
            {property.nearCollegeName || 'Campus'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold truncate max-w-xs">{property.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={() => toggleCompare(property)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
              compared
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{compared ? 'In Compare' : 'Compare'}</span>
          </button>

          <button
            onClick={() => toggleFavorite(property.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
              favorited
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-rose-600' : ''}`} />
            <span>{favorited ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PHOTO GALLERY
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Photo */}
        <div className="lg:col-span-2 relative h-72 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden bg-slate-900">
          <img
            src={currentPhoto}
            alt={property.title || 'Accommodation'}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-600 text-white shadow-md">
              {property.propertyType || 'Student PG'}
            </span>
            {property.pricing?.foodIncluded && (
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-600 text-white shadow-md flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5" /> Pure Veg Food Included
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs flex items-center gap-1.5">
            <Footprints className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">{property.distanceToCollege || `${property.walkingTimeMinutes || 6} min walk`}</span>
          </div>
        </div>

        {/* Thumbnail Selector */}
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
          {photos.slice(0, 3).map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelectedPhotoIndex(index)}
              className={`relative h-24 sm:h-28 lg:h-[138px] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                selectedPhotoIndex === index ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
            >
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT (2 COLUMNS: DETAILS + STICKY CONTACT CARD)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* LEFT 2 COLS: SPECIFICATIONS, ROOM RATES, FOOD, REVIEWS */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Title & Rating */}
          <div className="space-y-3 pb-6 border-b border-slate-200">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg">
                Near {property.nearCollegeName || 'Campus'} • {property.locality || ''}
              </span>

              {property.ratings?.average && (
                <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-xl text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{property.ratings.average} / 5.0</span>
                  <span className="text-slate-400 font-normal">({property.ratings.totalReviews || 18} verified student reviews)</span>
                </div>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {property.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{property.address}</span>
            </p>
          </div>

          {/* Room Rates & Sharing Breakdown */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Room Options & Monthly Rates</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array.isArray(property.specs?.roomTypes) && property.specs.roomTypes.length > 0 ? (
                property.specs.roomTypes.map((type, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                    <span className="text-xs text-slate-500 font-medium block">Option {idx + 1}</span>
                    <h4 className="text-sm font-bold text-slate-900">{type}</h4>
                    <span className="text-xs text-emerald-700 font-semibold block">Available Now</span>
                  </div>
                ))
              ) : (
                <div className="col-span-3 bg-slate-50 p-4 rounded-2xl text-xs text-slate-600">
                  Starts at ₹{property.pricing?.monthlyRent ? property.pricing.monthlyRent.toLocaleString('en-IN') : 'N/A'}/month with flexible sharing options.
                </div>
              )}
            </div>

            {/* Financial Details Box */}
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-5 space-y-2 text-xs text-slate-700">
              <h4 className="font-bold text-indigo-950 text-sm">Clear Financial Breakdown (Zero Brokerage)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-slate-500">Security Deposit:</span>{' '}
                  <strong className="text-slate-900">₹{property.pricing?.depositAmount ? property.pricing.depositAmount.toLocaleString('en-IN') : '10,000'} (100% Refundable)</strong>
                </div>
                <div>
                  <span className="text-slate-500">Electricity:</span>{' '}
                  <strong className="text-slate-900">{property.pricing?.electricityCharges || 'As per meter / included'}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Maintenance Charges:</span>{' '}
                  <strong className="text-slate-900">{property.pricing?.maintenanceIncluded ? 'Included in Rent' : '₹500/mo'}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Minimum Agreement:</span>{' '}
                  <strong className="text-slate-900">{property.pricing?.minStayMonths || 3} Months</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Campus Commute Breakdown */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Commute to {property.nearCollegeName || 'Campus'}</h2>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <Footprints className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                <span className="text-xs text-slate-500 block">Walking</span>
                <span className="text-sm font-bold text-slate-900">{property.walkingTimeMinutes || 6} mins</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <Bike className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                <span className="text-xs text-slate-500 block">Bicycle</span>
                <span className="text-sm font-bold text-slate-900">2 - 3 mins</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <Car className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                <span className="text-xs text-slate-500 block">Auto / Cab</span>
                <span className="text-sm font-bold text-slate-900">2 mins</span>
              </div>
            </div>
          </div>

          {/* Mess & Food Menu Details */}
          {property.pricing?.foodIncluded && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-600" />
                Mess & Meals Included
              </h2>

              <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950 text-sm">
                    {property.pricing.foodFrequency || '3 Meals Daily + Evening Tea'}
                  </span>
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Pure Veg / Jain Available
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hygienic campus mess prepared by experienced cooks. Unlimited roti, dal, sabzi, rice, and salad. Sunday special lunch / dinner with desserts.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100 text-center">
                    <span className="font-semibold text-slate-700 block">Breakfast</span>
                    <span className="text-[11px] text-slate-500">7:30 - 9:30 AM</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100 text-center">
                    <span className="font-semibold text-slate-700 block">Lunch / Dabba</span>
                    <span className="text-[11px] text-slate-500">12:30 - 2:30 PM</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100 text-center">
                    <span className="font-semibold text-slate-700 block">Evening Tea</span>
                    <span className="text-[11px] text-slate-500">5:00 - 6:30 PM</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100 text-center">
                    <span className="font-semibold text-slate-700 block">Dinner</span>
                    <span className="text-[11px] text-slate-500">8:00 - 10:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Full Amenities Grid */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Amenities & Facilities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.isArray(property.amenities) && property.amenities.map((amenity, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2 text-xs text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Highlights & Experiences */}
          {Array.isArray(property.studentHighlights) && property.studentHighlights.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Student Highlights</h2>
              <div className="space-y-2">
                {property.studentHighlights.map((highlight, idx) => (
                  <div key={idx} className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <Star className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>"{highlight}"</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT 1 COL: STICKY VERIFIED OWNER DIRECT CARD */}
        <div className="space-y-6 lg:sticky lg:top-24">
          
          <div className="bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-xl shadow-indigo-900/5 space-y-6">
            
            {/* Rent Big Display */}
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                Monthly Rent Per Bed
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-slate-900">
                  ₹{property.pricing?.monthlyRent ? property.pricing.monthlyRent.toLocaleString('en-IN') : 'N/A'}
                </span>
                <span className="text-sm text-slate-500 font-medium">/ month</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                ✓ Zero Brokerage Guaranteed
              </span>
            </div>

            {/* Verified Owner Info */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-base">
                  {owner.name ? owner.name.charAt(0) : 'W'}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{owner.name}</h4>
                  <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {owner.verificationStatus}
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                <Clock className="w-3 h-3" /> {owner.responseRate}
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Verified Owner Directly</span>
              </button>

              <a
                href={`https://wa.me/${owner.whatsapp ? owner.whatsapp.replace(/[^0-9]/g, '') : '919825044192'}?text=${encodeURIComponent(
                  `Hi ${owner.name}, I found ${property.title} near ${property.nearCollegeName || 'Campus'} on CampusNest. I am interested in inquiring about room availability and rent.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="w-full py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Free In-Person Visit</span>
              </button>
            </div>

            {/* Comparison Quick Action */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => toggleCompare(property)}
                className="w-full py-2.5 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{compared ? 'Remove from Comparison' : 'Add to Side-by-Side Compare'}</span>
              </button>
            </div>

            {/* Safety Guarantee */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Brokerage Protection:</strong> Deal directly with the owner or warden. Never pay token amounts before physically viewing the room.
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          SIMILAR PROPERTIES NEAR SAME COLLEGE
         ───────────────────────────────────────────────────────────── */}
      {similarProperties.length > 0 && (
        <div className="pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              More PGs & Rooms Near {property.nearCollegeName || 'Campus'}
            </h2>
            <Link
              to={`/search?college=${property.nearCollegeId}`}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} layout="grid" />
            ))}
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal
        property={property}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
