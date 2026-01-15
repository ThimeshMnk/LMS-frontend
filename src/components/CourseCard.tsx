import { Star, Clock, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: number; // Added ID for routing
  title: string;
  category: string;
  image: string;
  duration: string;
  rating: number;
  reviews: number;
  price: string;
  isSale?: boolean;
}

export default function CourseCard({ 
  id, 
  title, 
  category, 
  image, 
  duration, 
  rating, 
  reviews, 
  price, 
  isSale 
}: CourseCardProps) {
  return (
    <Link 
      to={`/course/${id}`} 
      className="group block bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden min-w-70 max-w-[320px] relative"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
        />
        
        {/* Badges */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {isSale && (
            <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg">
              Sale
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
            Top Rated
          </span>
        </div>

        {/* Wishlist Button (Stop propagation to prevent card click) */}
        <button 
          onClick={(e) => { e.preventDefault(); /* Add wishlist logic */ }}
          className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all duration-300 z-10"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
            {category}
          </p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-800">{rating.toFixed(1)}</span>
            <span className="text-[10px] text-gray-400 font-medium">({reviews})</span>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 text-lg line-clamp-2 h-14 leading-tight group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-5">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
             <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
             <span>English</span>
          </div>
        </div>

        {/* Pricing Area */}
        {/* <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Investment</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900">{price}</span>
              {price !== 'FREE' && <span className="text-[10px] font-bold text-gray-400">AED</span>}
            </div>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div> */}
      </div>
    </Link>
  );
}