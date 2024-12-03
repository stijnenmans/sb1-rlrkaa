import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterOptions, Property } from '../../types';
import { MapPin, Euro, ArrowRight } from 'lucide-react';
import { cities, priceRanges } from '../../data/mockData';
import Map from '../Map';
import NumberInput from './NumberInput';
import { useExpectedMatches } from '../../hooks/useExpectedMatches';

export default function RegisterSection() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterOptions>({
    city: 'Amsterdam',
    maxPrice: 2000,
    minBedrooms: 2,
    minSurfaceArea: 40,
  });

  const handleChange = (key: keyof FilterOptions, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const expectedMatches = useExpectedMatches(filters);

  const handleContinue = () => {
    navigate('/register', { state: { initialFilters: filters } });
  };

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-secondary via-secondary to-secondary/80 bg-clip-text text-transparent">
            Find Your Perfect Home
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tell us what you're looking for and we'll notify you when matching properties become available
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Left side - Map */}
            <div className="h-[200px] md:h-[400px] bg-black/80 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
              <Map selectedCity={filters.city} properties={[]} />
            </div>

            {/* Right side - Location Filters */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/10 flex flex-col min-h-[200px] md:h-[400px]">
              <div className="flex-1 space-y-4">
                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    City
                  </label>
                  <select
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent"
                    value={filters.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                  >
                    {cities.map((city) => (
                      <option key={city} value={city} className="bg-dark">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Filter */}
                <NumberInput
                  label="Max Price"
                  icon={<Euro className="w-4 h-4 text-accent" />}
                  value={filters.maxPrice}
                  onChange={(value) => handleChange('maxPrice', value)}
                  unit="€"
                  min={750}
                  max={5000}
                  options={priceRanges}
                />

                {/* Expected Matches */}
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="flex items-center gap-2 text-accent mb-1">
                    <span className="text-lg">🔥</span>
                    <span className="text-sm font-medium">Expected Matches</span>
                  </div>
                  <p className="text-sm text-white">
                    With this search profile you can expect{' '}
                    <span className="font-bold text-accent">{expectedMatches}</span> matches per week
                  </p>
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 mt-4 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-all duration-200"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}