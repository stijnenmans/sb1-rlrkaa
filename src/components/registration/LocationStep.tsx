import React from 'react';
import { FilterOptions, Property } from '../../types';
import { MapPin, Euro, ArrowRight } from 'lucide-react';
import { cities, priceRanges } from '../../data/mockData';
import Map from '../Map';
import NumberInput from './NumberInput';
import { useExpectedMatches } from '../../hooks/useExpectedMatches';

interface LocationStepProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  properties: Property[];
  onNext: () => void;
}

export default function LocationStep({
  filters,
  onFilterChange,
  properties,
  onNext,
}: LocationStepProps) {
  const handleChange = (key: keyof FilterOptions, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const expectedMatches = useExpectedMatches(filters);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {/* Left side - Map */}
      <div className="h-[200px] md:h-[400px] bg-black/80 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
        <Map selectedCity={filters.city} properties={properties} />
      </div>

      {/* Right side - Location Filters */}
      <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/10 flex flex-col min-h-[200px] md:h-[400px]">
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
          onClick={onNext}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 mt-4 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-all duration-200"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}