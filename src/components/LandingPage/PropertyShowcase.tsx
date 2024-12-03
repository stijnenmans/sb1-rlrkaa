import React from 'react';
import { Bell, MapPin, Home as HomeIcon, ArrowRight } from 'lucide-react';

export default function PropertyShowcase() {
  return (
    <div className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2A2A2A] via-[#1F1F1F] to-[#171717] opacity-95"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Real-Time Property Alerts
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get instant notifications when new properties match your criteria. Be the first to know, first to view! 🏃‍♂️
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Notification bell */}
            <div className="absolute -top-6 -right-6 z-10">
              <div className="relative animate-bounce">
                <Bell className="w-12 h-12 text-primary" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-accent rounded-full border-2 border-[#1F1F1F]"></span>
              </div>
            </div>

            {/* Mobile-style notification interface */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HomeIcon className="w-5 h-5 text-primary" />
                    <span className="text-white font-medium">New Properties</span>
                  </div>
                  <span className="text-sm text-gray-400">Just now</span>
                </div>
              </div>

              <div className="divide-y divide-white/10">
                {[
                  {
                    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
                    location: "Amsterdam Zuid",
                    price: "€2,450",
                    type: "Modern Apartment"
                  },
                  {
                    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
                    location: "Rotterdam Centrum",
                    price: "€1,850",
                    type: "Studio Loft"
                  },
                  {
                    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
                    location: "Utrecht Oost",
                    price: "€1,650",
                    type: "Cozy Studio"
                  }
                ].map((property, index) => (
                  <div 
                    key={index}
                    className="p-4 hover:bg-white/5 transition-colors duration-200 cursor-pointer group"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={property.image}
                        alt={property.type}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-white mb-1">{property.type}</h3>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                          <MapPin className="w-4 h-4" />
                          {property.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-accent font-semibold">{property.price}</span>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors duration-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}