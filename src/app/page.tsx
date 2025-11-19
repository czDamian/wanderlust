import DestinationGrid from '@/components/DestinationGrid';
import { FaPlaneDeparture } from 'react-icons/fa';
import { fetchDestinations } from '@/lib/api';

export default async function Home() {
  const destinations = await fetchDestinations();

  return (
    <main className="min-h-screen bg-[#0f172a] text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <header className="mb-20 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-6 animate-fade-in">
            <FaPlaneDeparture className="text-cyan-400 text-xl" />
            <span className="text-gray-300 font-medium tracking-wide uppercase text-sm">
              Discover Your Next Adventure
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-6 tracking-tight">
            WanderLust
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore curated destinations and seamlessly plan your journey.
            Click to add your dream trip directly to your calendar.
          </p>
        </header>

        {/* Grid */}
        <DestinationGrid destinations={destinations} />

        {/* Footer */}
        <footer className="mt-24 text-center text-gray-500 text-sm">
          <p>© 2025 WanderLust. Inspiring your next adventure, one click at a time.</p>
        </footer>
      </div>
    </main>
  );
}
