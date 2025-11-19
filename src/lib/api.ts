import { Destination } from '@/types/destination';

const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop', // Kyoto
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop', // Santorini
  'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800&auto=format&fit=crop', // Banff
  'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop', // NYC
  'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop', // Machu Picchu
  'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop', // Maldives
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop', // Beach
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop', // Mountains
  'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop', // Thailand
  'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop', // Venice
  'https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=800&auto=format&fit=crop', // Italy
  'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=800&auto=format&fit=crop', // Nature
];

interface Country {
  name: {
    common: string;
  };
  capital?: string[];
  region: string;
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

export async function fetchDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch('https://restcountries.com/v3.1/independent?status=true&fields=name,capital,region', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) throw new Error('Failed to fetch countries');

    const countries: Country[] = await res.json();

    // Shuffle and pick 9
    const shuffled = countries.sort(() => 0.5 - Math.random()).slice(0, 9);

    return shuffled.map((country, index) => {
      const startDate = getRandomDate(new Date('2025-01-01'), new Date('2025-12-31'));
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + getRandomInt(5, 14)); // 5-14 days trip

      return {
        id: `dest-${index}`,
        name: country.name.common,
        location: `${country.capital?.[0] || country.name.common}, ${country.region}`,
        description: `Experience the breathtaking beauty of ${country.name.common}. Discover the rich culture of ${country.region}, explore hidden gems in ${country.capital?.[0] || 'the local towns'}, and create unforgettable memories on this exclusive journey.`,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        imageUrl: UNSPLASH_IMAGES[index % UNSPLASH_IMAGES.length],
        price: `$${getRandomInt(1200, 5000).toLocaleString()}`,
      };
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    // Fallback to empty or mock if needed, but for now return empty array
    return [];
  }
}
