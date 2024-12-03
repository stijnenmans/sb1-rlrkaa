import React from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '../types';
import { SearchX, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <SearchX className="w-16 h-16 text-accent mx-auto mb-4" />
        <p className="text-gray-400 text-lg">
          No properties found matching your criteria. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className="opacity-0 animate-fade-in"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'forwards'
            }}
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
      
      {/* End of Results Message */}
      <div className="text-center py-8 opacity-0 animate-fade-in" style={{ animationDelay: `${properties.length * 100 + 200}ms`, animationFillMode: 'forwards' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 text-gray-400">
            <Settings className="w-5 h-5 text-secondary" />
            <span>You've viewed all available properties matching your filters</span>
          </div>
          <Link 
            to="/dashboard/settings"
            className="text-secondary hover:text-secondary/80 text-sm"
          >
            Adjust your filters in settings to see more properties
          </Link>
        </div>
      </div>
    </div>
  );
}