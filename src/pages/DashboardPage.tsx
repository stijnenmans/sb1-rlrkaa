import React from 'react';
import FilterBar from '../components/FilterBar';
import PropertyGrid from '../components/PropertyGrid';
import DashboardSubmenu from '../components/DashboardSubmenu';
import { FilterOptions } from '../types';
import { filterProperties } from '../utils/filterProperties';
import { mockProperties } from '../data/mockData';
import { SlidersHorizontal } from 'lucide-react';

export default function DashboardPage() {
  const [filters, setFilters] = React.useState<FilterOptions>({
    city: 'Amsterdam',
    maxPrice: 0,
    minBedrooms: 0,
    minSurfaceArea: 0,
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);
  const filteredProperties = filterProperties(mockProperties, filters);

  return (
    <div className="min-h-screen bg-dark pt-16 relative overflow-hidden">
      <DashboardSubmenu />
      
      <div className="container mx-auto px-4 py-6 relative">
        {/* Mobile filters toggle */}
        <button
          className="md:hidden fixed bottom-4 right-4 z-50 bg-accent text-white p-4 rounded-full shadow-lg"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <SlidersHorizontal className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className={`
            md:w-80 shrink-0
            fixed md:relative inset-0 z-40 md:z-0
            transform ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
            transition-transform duration-300 ease-in-out
          `}>
            <div className="h-full md:h-auto bg-dark md:bg-transparent p-4 md:p-0">
              <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-6 border border-white/10 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Filters</h2>
                  <button
                    className="md:hidden text-gray-400"
                    onClick={() => setIsMobileFiltersOpen(false)}
                  >
                    ✕
                  </button>
                </div>
                <FilterBar 
                  filters={filters} 
                  onFilterChange={setFilters} 
                  properties={filteredProperties}
                />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-3">🏠 Your Matches for Today!</h1>
                <p className="text-gray-400">
                  Here are the properties matching your preferences.
                </p>
              </div>
            </div>

            <PropertyGrid properties={filteredProperties} />
          </div>
        </div>
      </div>
    </div>
  );
}