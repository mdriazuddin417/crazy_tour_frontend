import { Button } from '@/components/ui/button';
import { Clock, Globe, MapPin, Star, Users } from 'lucide-react';

const FeatureTourCard = ({ tour }) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition-shadow duration-300 group">
      {/* Image Section */}
      <div className="relative h-56 w-full">
        <img
          src={tour.images[0]}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-teal-600">
          {tour.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin size={14} className="mr-1 text-red-500" />
          <span>{tour.city}, {tour.country}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {tour.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {tour.description}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-y-3 border-t border-b border-gray-50 py-4 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <Clock size={16} className="mr-2 text-teal-500" />
            {tour.duration} Hours
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Users size={16} className="mr-2 text-teal-500" />
            Max: {tour.maxGroupSize}
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Globe size={16} className="mr-2 text-teal-500" />
            {tour.languages[0]}
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Star size={16} className="mr-2 text-yellow-500 fill-yellow-500" />
            {tour.averageRating > 0 ? tour.averageRating : "New"}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">${tour.price}</span>
            <span className="text-gray-500 text-sm"> / person</span>
          </div>
          <Button size={'lg'} className="px-6 py-6 text-lg">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureTourCard;