import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Star } from 'lucide-react';
import { cities } from '../../data/mockData';

export default function FinalCTA() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('Amsterdam');

  const handleSearch = () => {
    navigate('/register', { 
      state: { 
        initialFilters: {
          city: selectedCity,
          maxPrice: 2000,
          minBedrooms: 2,
          minSurfaceArea: 40,
        },
        startAtLocation: true
      } 
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-accent/20 via-secondary/20 to-accent/20 relative overflow-hidden backdrop-blur-3xl">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left md:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/40?img=${i + 10}`}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-dark"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300">
                    Trusted by <span className="text-white font-semibold">1,500+</span> home seekers
                  </p>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to find your dream home?
              </h2>
              <p className="text-xl text-gray-300">
                Join thousands of happy renters who found their perfect home with RentalBot
              </p>
            </div>

            <div className="w-full md:w-auto flex gap-3">
              <div className="flex-1 md:w-64">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent w-5 h-5" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city} className="bg-dark">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="px-6 bg-accent text-white rounded-xl font-bold text-lg hover:bg-accent/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-accent/50 whitespace-nowrap flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}