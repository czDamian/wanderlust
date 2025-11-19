'use client';

import Image from 'next/image';
import { FaCalendarPlus, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Destination } from '@/types/destination';
import { createGoogleCalendarUrl } from '@/utils/calendar';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
}

export default function DestinationCard({ destination, onSelect }: DestinationCardProps) {
  const calendarUrl = createGoogleCalendarUrl(destination);

  return (
    <div className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:-translate-y-2">
      {/* Image Container */}
      <div
        className="relative h-64 overflow-hidden cursor-pointer"
        onClick={() => onSelect(destination)}
      >
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white font-semibold text-sm">
          {destination.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium mb-2">
          <FaMapMarkerAlt />
          <span>{destination.location}</span>
        </div>

        <h3
          className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors cursor-pointer"
          onClick={() => onSelect(destination)}
        >
          {destination.name}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 transition-all duration-300">
          {destination.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <FaClock className="text-cyan-400" />
            <span>{destination.startDate}</span>
          </div>

          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transform active:scale-95"
          >
            <FaCalendarPlus />
            <span>Add to Calendar</span>
          </a>
        </div>
      </div>
    </div>
  );
}
