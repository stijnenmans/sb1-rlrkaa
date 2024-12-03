import React from 'react';
import { Heart } from 'lucide-react';
import DashboardSubmenu from '../components/DashboardSubmenu';
import PropertyGrid from '../components/PropertyGrid';
import { useLikedProperties } from '../hooks/useLikedProperties';
import { mockProperties } from '../data/mockData';

export default function LikedPropertiesPage() {
  const { likedProperties } = useLikedProperties();
  const savedProperties = mockProperties.filter(p => likedProperties.includes(p.id));

  return (
    <div className="min-h-screen bg-dark pt-16 relative overflow-hidden">
      <DashboardSubmenu />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold text-white">Saved Properties</h1>
          </div>
          <p className="text-gray-400">
            {savedProperties.length === 0
              ? "You haven't saved any properties yet. Click the heart icon on properties you like to save them here."
              : `You have saved ${savedProperties.length} ${
                  savedProperties.length === 1 ? 'property' : 'properties'
                }.`}
          </p>
        </div>

        <PropertyGrid properties={savedProperties} />
      </div>
    </div>
  );
}