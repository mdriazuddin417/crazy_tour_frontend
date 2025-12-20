import { ArrowUpRight, MapPin } from 'lucide-react';

const DestinationCard = ({ destination }) => {
  return (
   <div className="group relative w-full h-[420px] rounded-[2rem] overflow-hidden cursor-pointer bg-slate-900 transition-all duration-500 hover:-translate-y-2 ">
      
      {/* Background Image with Zoom Effect */}
      <img
        src={destination?.images[0]}
        alt={destination.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-3 opacity-80 group-hover:opacity-100"
      />

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Top Floating Badge */}
      <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full">
        <span className="text-white text-xs font-black uppercase tracking-widest leading-none">
          {destination.category}
        </span>
      </div>

      {/* Content Container */}
      <div className="absolute bottom-0 p-8 w-full transition-all duration-500 transform group-hover:-translate-y-2.5">
        
        {/* City/Country with Pin */}
        <div className="flex items-center gap-1 text-teal-400 mb-2 font-medium">
          <MapPin size={16} />
          <span className="text-sm tracking-wide uppercase">{destination.city}</span>
        </div>

        {/* Title */}
        <h3 className="text-3xl font-black text-white leading-tight mb-4 group-hover:text-teal-300 transition-colors">
          {destination.title}
        </h3>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">Starting At</p>
            <p className="text-2xl font-black text-white">${destination.price}</p>
          </div>

          {/* Crazy Circular Button */}
          <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center transition-all duration-500 group-hover:bg-teal-500 group-hover:rotate-[360deg] shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <ArrowUpRight className="text-black group-hover:text-white" size={24} />
          </div>
        </div>
      </div>

      {/* Glow Effect (Hidden by default, shows on hover) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-cyan-400 rounded-[2rem] blur opacity-0 group-hover:opacity-20 transition duration-500" />
    </div>
  );
  
};

export default DestinationCard;