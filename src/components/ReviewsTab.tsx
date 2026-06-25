import { useState } from 'react';
import { Review } from '../types';
import { Star, MessageSquare, Check, Trash, AlertCircle, Quote, Sparkles } from 'lucide-react';

interface ReviewsTabProps {
  reviews: Review[];
  onApproveReview: (id: string) => void;
  onDeleteReview: (id: string) => void;
}

export default function ReviewsTab({
  reviews,
  onApproveReview,
  onDeleteReview,
}: ReviewsTabProps) {
  const [filterType, setFilterType] = useState<'All' | 'Pending' | 'Approved'>('All');

  // Compute rating stats
  const approvedReviews = reviews.filter(r => r.status === 'Approved');
  const allRatingsCount = reviews.length;
  
  const avgRating = approvedReviews.length > 0
    ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1)
    : '4.8';

  // Calculate rating bars
  const totalApproved = approvedReviews.length || 1;
  const countStars = (stars: number) => approvedReviews.filter(r => r.rating === stars).length;
  const starsPercentage = (stars: number) => Math.round((countStars(stars) / totalApproved) * 100);

  const filteredReviews = reviews.filter((review) => {
    if (filterType === 'All') return true;
    return review.status === filterType;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* Header */}
      <div>
        <h2 className="font-serif text-3xl font-light tracking-wider text-[#E5D3B3] uppercase">
          Client Feedback
        </h2>
        <p className="text-xs text-[#D4AF37] tracking-widest uppercase font-mono mt-1">
          Review Moderation & Exquisite Testimonials
        </p>
      </div>

      {/* Analytics Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#131316] border border-[#D4AF37]/15 rounded-xl p-6 shadow-lg">
        {/* Total Rating block */}
        <div className="flex flex-col justify-center items-center text-center p-4 border-b md:border-b-0 md:border-r border-[#D4AF37]/10">
          <span className="text-[10px] uppercase tracking-widest font-mono text-[#D4AF37]/80">Aura Luxe Quality Index</span>
          <h3 className="font-serif text-5xl font-bold text-white tracking-tight my-3 flex items-baseline gap-1">
            {avgRating} <span className="text-sm text-gray-500 font-sans font-normal">/ 5.0</span>
          </h3>
          <div className="flex items-center gap-1 mb-2 text-[#D4AF37]">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-4 h-4 fill-current ${
                  s <= Math.round(Number(avgRating)) ? 'text-[#D4AF37]' : 'text-zinc-800'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500 uppercase font-mono font-medium">Based on {approvedReviews.length} Verified Submissions</span>
        </div>

        {/* Rating percentage bars */}
        <div className="md:col-span-2 flex flex-col justify-center space-y-2.5 px-0 md:px-6">
          <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-2">Verified Feedback Breakdown</p>
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-3 text-xs">
              <span className="font-mono text-[#D4AF37] w-12 flex items-center gap-1 font-semibold">
                {stars} <Star className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
              </span>
              <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#AA7C11] to-[#D4AF37] rounded-full"
                  style={{ width: `${starsPercentage(stars)}%` }}
                />
              </div>
              <span className="font-mono text-gray-400 w-8 text-right">{countStars(stars)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex border-b border-[#D4AF37]/10 pb-1">
        {(['All', 'Pending', 'Approved'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-5 py-3 text-xs uppercase font-mono tracking-widest relative transition-all ${
              filterType === type ? 'text-[#D4AF37] font-semibold' : 'text-gray-400 hover:text-[#E5D3B3]'
            }`}
          >
            {type} Feedback ({type === 'All' ? reviews.length : reviews.filter(r => r.status === type).length})
            {filterType === type && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37]" />
            )}
          </button>
        ))}
      </div>

      {/* Testimonial Editorial Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className={`bg-[#131316]/90 border rounded-xl p-6 relative overflow-hidden flex flex-col justify-between shadow-md transition-all duration-300 ${
                review.status === 'Pending'
                  ? 'border-amber-500/20 shadow-[0_5px_15px_rgba(245,158,11,0.02)]'
                  : 'border-[#D4AF37]/15 hover:border-[#D4AF37]/30'
              }`}
            >
              {/* Subtle Elegant quote mark background */}
              <div className="absolute right-4 top-4 text-[#D4AF37]/5 pointer-events-none">
                <Quote className="w-14 h-14" />
              </div>

              {/* Card top */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-serif text-white font-medium text-base tracking-wide">{review.clientName}</h4>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5 uppercase tracking-widest">
                      SERVICE: {review.serviceName}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-0.5 text-[#D4AF37]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 fill-current ${
                            s <= review.rating ? 'text-[#D4AF37]' : 'text-zinc-800'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] text-gray-600 font-mono mt-1">{review.date}</span>
                  </div>
                </div>

                {/* Review Message body */}
                <p className="text-gray-300 italic text-xs leading-relaxed font-sans mb-6 border-l-2 border-[#D4AF37]/20 pl-3">
                  "{review.comment}"
                </p>
              </div>

              {/* Moderation Panel Footer */}
              <div className="flex items-center justify-between border-t border-[#D4AF37]/10 pt-4">
                {/* Status indicators */}
                <span className={`inline-flex items-center gap-1 text-[9px] uppercase font-mono px-2 py-0.5 rounded-full border ${
                  review.status === 'Approved'
                    ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/10'
                    : 'bg-amber-950/20 text-amber-300 border-amber-500/10 animate-pulse'
                }`}>
                  <Sparkles className="w-2.5 h-2.5" />
                  {review.status}
                </span>

                {/* Moderation trigger buttons */}
                <div className="flex gap-2">
                  {review.status === 'Pending' && (
                    <button
                      onClick={() => onApproveReview(review.id)}
                      className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded px-3 py-1.5 text-[10px] font-mono uppercase font-semibold flex items-center gap-1 transition-all"
                    >
                      <Check className="w-3 h-3" />
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (confirm('Trash this testimonial permanently?')) {
                        onDeleteReview(review.id);
                      }
                    }}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    title="Remove review"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-2 text-center py-16 text-gray-500 font-serif">
            No feedback found matching the selection criteria.
          </div>
        )}
      </div>
    </div>
  );
}
