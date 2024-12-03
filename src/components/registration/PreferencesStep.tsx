import React from 'react';
import { FilterOptions, Property } from '../../types';
import { ArrowRight, ArrowLeft, BedDouble, Maximize } from 'lucide-react';
import { bedroomOptions, surfaceAreaOptions } from '../../data/mockData';
import Map from '../Map';
import NumberInput from './NumberInput';
import { useExpectedMatches } from '../../hooks/useExpectedMatches';

interface PreferencesStepProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  properties: Property[];
  onBack: () => void;
  onNext: () => void;
}

export default function PreferencesStep({
  filters,
  onFilterChange,
  properties,
  onBack,
  onNext,
}: PreferencesStepProps) {
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

      {/* Right side - Property Filters */}
      <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/10 flex flex-col min-h-[200px] md:h-[400px]">
        <div className="flex-1 space-y-6">
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

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={onBack}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={onNext}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-all duration-200"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}