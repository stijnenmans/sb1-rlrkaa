import React from 'react';
import { MapPin, Euro, BedDouble, Maximize } from 'lucide-react';
import { cities, priceRanges, bedroomOptions, surfaceAreaOptions } from '../data/mockData';
import { FilterOptions, Property } from '../types';
import Map from './Map';
import NumberInput from './registration/NumberInput';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  properties: Property[];
}

export default function FilterBar({ filters, onFilterChange, properties }: FilterBarProps) {
  const handleChange = (key: keyof FilterOptions, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Map Section */}
      <div className="h-[200px] md:h-[250px] bg-black/80 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
        <Map selectedCity={filters.city} properties={properties} />
      </div>

      {/* Filters Section */}
      <div className="space-y-4">
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

        {/* Bedroom Filter */}
        <NumberInput
          label="Min Bedrooms"
          icon={<BedDouble className="w-4 h-4 text-accent" />}
          value={filters.minBedrooms}
          onChange={(value) => handleChange('minBedrooms', value)}
          unit="+"
          min={1}
          max={6}
          options={bedroomOptions}
        />

        {/* Surface Area Filter */}
        <NumberInput
          label="Min Surface Area"
          icon={<Maximize className="w-4 h-4 text-accent" />}
          value={filters.minSurfaceArea}
          onChange={(value) => handleChange('minSurfaceArea', value)}
          unit=" m²"
          min={20}
          max={200}
          options={surfaceAreaOptions}
        />
      </div>
    </div>
  );
}