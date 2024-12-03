import React from 'react';
import { Mail, Lock, User, ArrowLeft, ArrowRight, MapPin, Euro, BedDouble, Maximize } from 'lucide-react';
import { FilterOptions } from '../../types';
import { useExpectedMatches } from '../../hooks/useExpectedMatches';

interface ContactStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  filters: FilterOptions;
  onChange: (data: any) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function ContactStep({
  formData,
  filters,
  onChange,
  onBack,
  onNext,
}: ContactStepProps) {
  const missedMatches = useExpectedMatches(filters);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left side - Selected Preferences */}
      <div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Your Preferences</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span className="text-[10px] text-white font-medium">City</span>
              </div>
              <p className="text-xs text-white font-medium mt-1 truncate">{filters.city}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
              <div className="flex items-center gap-1.5">
                <Euro className="w-3.5 h-3.5 text-white" />
                <span className="text-[10px] text-white font-medium">Max Price</span>
              </div>
              <p className="text-xs text-white font-medium mt-1">
                {filters.maxPrice ? `€${filters.maxPrice}` : 'No limit'}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-white" />
                <span className="text-[10px] text-white font-medium">Min Bedrooms</span>
              </div>
              <p className="text-xs text-white font-medium mt-1">
                {filters.minBedrooms ? `${filters.minBedrooms}+` : 'Any'}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
              <div className="flex items-center gap-1.5">
                <Maximize className="w-3.5 h-3.5 text-white" />
                <span className="text-[10px] text-white font-medium">Min Surface</span>
              </div>
              <p className="text-xs text-white font-medium mt-1">
                {filters.minSurfaceArea ? `${filters.minSurfaceArea}+ m²` : 'Any'}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-white bg-white/5 rounded-lg p-2 border border-white/10">
            <span className="text-lg">🔥</span>
            <span>You can expect <span className="font-semibold">{missedMatches}</span> matches per week</span>
          </div>
        </div>
      </div>

      {/* Right side - Contact Form */}
      <div className="md:col-span-2 bg-white/5 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/10">
        <h2 className="text-2xl font-bold mb-6 text-white">Tell us about yourself 👋</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) => onChange({ ...formData, firstName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => onChange({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => onChange({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Create password"
                value={formData.password}
                onChange={(e) => onChange({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-all duration-200"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}