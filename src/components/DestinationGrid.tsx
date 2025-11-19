'use client';

import { useState } from 'react';
import { Destination } from '@/types/destination';
import DestinationCard from '@/components/DestinationCard';
import DestinationModal from '@/components/DestinationModal';

interface DestinationGridProps {
  destinations: Destination[];
}

export default function DestinationGrid({ destinations }: DestinationGridProps) {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            onSelect={setSelectedDestination}
          />
        ))}
      </div>

      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </>
  );
}
