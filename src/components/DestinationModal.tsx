'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { FaCalendarPlus, FaMapMarkerAlt, FaClock, FaTimes, FaMoneyBillWave } from 'react-icons/fa';
import { Destination } from '@/types/destination';
import { createGoogleCalendarUrl } from '@/utils/calendar';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
}

export default function DestinationModal({ destination, onClose }: DestinationModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!destination) return null;

  const calendarUrl = createGoogleCalendarUrl(destination);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-[#0f172a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/10 animate-fade-in-up max-h-[90vh] flex flex-col md:flex-row">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
        >
          <FaTimes />
        </button>

        {/* Image Section (Left/Top) */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        {/* Details Section (Right/Bottom) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium mb-2">
              <FaMapMarkerAlt />
              <span>{destination.location}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {destination.name}
            </h2>
            <div className="flex flex-wrap gap-4 text-gray-300 text-sm mb-6">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <FaClock className="text-cyan-400" />
                <span>{destination.startDate} - {destination.endDate}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <FaMoneyBillWave className="text-green-400" />
                <span>{destination.price}</span>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-gray-300 leading-relaxed text-lg">
              {destination.description}
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:-translate-y-1"
            >
              <FaCalendarPlus />
              <span>Add to Calendar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
