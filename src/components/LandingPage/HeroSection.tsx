import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, Home, Star, Heart, ArrowRight } from 'lucide-react';
import { cities } from '../../data/mockData';

export default function HeroSection() {
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
    <div className="relative min-h-[90vh] pt-32 pb-32 overflow-hidden bg-dark">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center max-w-5xl mx-auto gap-8">
          {/* Left side - Text content */}
          <div className="lg:w-[45%] text-left relative">
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Find your Dream Home
            </h1>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              Stop scrolling endlessly. Get instant alerts when your perfect rental drops!
            </p>
            
            {/* City Search */}
            <div className="flex gap-3 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:ring-2 focus:ring-accent focus:border-transparent"
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
                className="px-6 bg-accent text-white rounded-xl font-bold text-lg hover:bg-accent/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-accent/50 whitespace-nowrap"
              >
                Search
              </button>
            </div>

            {/* Social proof */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-4">
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
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-secondary fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">
                    Trusted by <span className="text-white font-semibold">1,500+</span> home seekers
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - iPhone mockup */}
          <div className="lg:w-[55%] relative z-20">
            <div className="relative w-[320px] h-[640px] mx-auto transform rotate-[-5deg] hover:rotate-0 transition-all duration-500">
              {/* iPhone frame with refined edges */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-[40px] shadow-2xl backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-[40px] border border-white/20"></div>
                {/* Inner shadow for depth */}
                <div className="absolute inset-[1px] rounded-[39px] shadow-inner"></div>
              </div>
              
              {/* Screen content */}
              <div className="absolute inset-[12px] bg-black rounded-[32px] overflow-hidden">
                {/* Status bar */}
                <div className="h-6 bg-black flex justify-between items-center px-6 pt-2">
                  <span className="text-white text-xs">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-white/20"></div>
                    <div className="w-4 h-4 rounded-full bg-white/20"></div>
                  </div>
                </div>

                {/* App content */}
                <div className="p-4">
                  {/* Search bar */}
                  <div className="bg-white/10 rounded-xl p-3 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <span className="text-gray-400">Amsterdam, Netherlands</span>
                  </div>

                  {/* Property cards */}
                  <div className="space-y-4">
                    {[
                      {
                        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
                        price: "€2,450",
                        location: "Amsterdam Zuid",
                        rooms: "3 rooms"
                      },
                      {
                        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
                        price: "€1,850",
                        location: "Rotterdam Centrum",
                        rooms: "2 rooms"
                      }
                    ].map((property, index) => (
                      <div key={index} className="bg-white/5 rounded-xl overflow-hidden">
                        <img
                          src={property.image}
                          alt="Property"
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-white font-medium">{property.price}</h3>
                              <p className="text-gray-400 text-sm">{property.location}</p>
                            </div>
                            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                              <Heart className="w-4 h-4 text-secondary" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">{property.rooms}</span>
                            <button className="text-accent text-sm flex items-center gap-1">
                              View details
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>
          </div>
        </div>
      </div>
    </div>
  );
}