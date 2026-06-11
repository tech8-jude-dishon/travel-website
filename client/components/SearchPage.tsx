
import React, { useMemo } from 'react';
import { destinationsList, DestinationCard } from './DestinationsSection';
import { tours, TourCard } from './FactsSection';
import { popularTours } from './PopularToursSection';
import { indiaTours } from './IndiaToursSection';
import packagesList from './PackageList';
import { popularDestinations } from './PopularDestinationsSection';

interface SearchPageProps {
  query: string;
  onBack: () => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ query, onBack }) => {
  const filteredDestinations = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return [];

    const result = destinationsList.filter(d =>
      d.name.toLowerCase().includes(trimmedQuery)
    );
    return result;
  }, [query]);

  const filteredTours = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return [];

    const allPackages = [...tours, ...popularTours, ...indiaTours, ...packagesList, ...popularDestinations];

    // Remove duplicates based on title just in case (e.g., FactsSection and PopularTours overlap)
    const uniquePackages = Array.from(new Map(allPackages.map(p => [p.title, p])).values());

    const result = uniquePackages.filter(t =>
      (t.title && t.title.toLowerCase().includes(trimmedQuery)) ||
      (t.location && t.location.toLowerCase().includes(trimmedQuery)) ||
      (t.tag && t.tag.toLowerCase().includes(trimmedQuery)) ||
      (t.description && t.description.toLowerCase().includes(trimmedQuery))
    );
    return result;
  }, [query]);

  const hasResults = filteredDestinations.length > 0 || filteredTours.length > 0;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-bg">
      {/* Page Header */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 mb-16">
        <div className="flex items-center gap-2 mb-6">
          <span
            className="cursor-pointer text-[#8E95A5] font-bold text-[10px] tracking-[0.2em] uppercase hover:text-brand-gold transition-colors"
            onClick={onBack}
          >
            Home
          </span>
          <span className="text-[#8E95A5] text-[10px]">/</span>
          <span className="text-brand-gold font-bold text-[10px] tracking-[0.2em] uppercase">Search Results</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark mb-4 leading-tight">
          Results for <span className="text-brand-gold">"{query}"</span>
        </h1>
        <p className="text-[#64718C] max-w-2xl text-lg font-medium">
          Found {filteredDestinations.length + filteredTours.length} results matching your search.
        </p>
      </div>

      {!hasResults ? (
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-20 text-center">
          <div className="bg-white rounded-[3rem] p-16 shadow-sm border border-brand-dark/5">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">No results found</h2>
            <p className="text-[#64718C] max-w-md mx-auto mb-10">
              We couldn't find any destinations or packages matching "{query}". Try different keywords or browse our popular categories.
            </p>
            <button
              onClick={onBack}
              className="bg-brand-dark text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-brand-gold transition-all"
            >
              Browse Popular Tours
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 space-y-24">
          {/* Matching Destinations */}
          {filteredDestinations.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-serif font-bold text-brand-dark">Matching Destinations</h2>
                <div className="flex-1 h-px bg-brand-dark/10"></div>
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">{filteredDestinations.length} found</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDestinations.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
              </div>
            </div>
          )}

          {/* Matching Packages */}
          {filteredTours.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-serif font-bold text-brand-dark">Available Packages</h2>
                <div className="flex-1 h-px bg-brand-dark/10"></div>
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">{filteredTours.length} found</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTours.map((tour, index) => (
                  <TourCard key={`${tour.id}-${index}`} tour={tour} onExplore={() => { }} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
