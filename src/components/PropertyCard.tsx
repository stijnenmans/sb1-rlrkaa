import React from 'react';
import { MapPin, Euro, BedDouble, Maximize, ExternalLink, FileText, Heart, Calendar } from 'lucide-react';
import { Property } from '../types';
import { Link } from 'react-router-dom';
import { useLikedProperties } from '../hooks/useLikedProperties';
import { formatDistanceToNow } from 'date-fns';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { isLiked, toggleLike } = useLikedProperties();
  const listingDate = new Date(property.listedAt || Date.now());
  
  const getWebsiteName = (url: string) => {
    try {
      if (!url.startsWith('http')) {
        url = `https://${url}`;
      }
      const hostname = new URL(url).hostname;
      return hostname.replace('www.', '').split('.')[0];
    } catch (error) {
      return 'Source';
    }
  };

  const websiteName = getWebsiteName(property.sourceUrl);

  return (
    <div className="relative z-10">
      <div className="bg-black/80 backdrop-blur-lg md:rounded-2xl overflow-hidden md:border md:border-white/20 transition-all duration-300">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/3 relative aspect-[4/3] md:aspect-auto">
            <div className="absolute inset-0 group">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Heart Button */}
              <button
                onClick={() => toggleLike(property.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors group/heart"
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-300 ${
                    isLiked(property.id)
                      ? 'text-accent fill-accent scale-110'
                      : 'text-white group-hover/heart:text-accent'
                  }`}
                />
              </button>
              {/* Source Website Badge */}
              <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
                <span className="text-xs font-medium text-white capitalize">{websiteName}</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{property.title}</h3>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {formatDistanceToNow(listingDate, { addSuffix: true })}
                  </span>
                </div>
              </div>
              
              {/* Property Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                    <span className="text-[10px] text-white font-medium">City</span>
                  </div>
                  <p className="text-xs text-white font-medium mt-1 truncate">{property.city}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                  <div className="flex items-center gap-1.5">
                    <Euro className="w-3.5 h-3.5 text-white" />
                    <span className="text-[10px] text-white font-medium">Price</span>
                  </div>
                  <p className="text-xs text-white font-medium mt-1">€{property.price}/month</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                  <div className="flex items-center gap-1.5">
                    <BedDouble className="w-3.5 h-3.5 text-white" />
                    <span className="text-[10px] text-white font-medium">Bedrooms</span>
                  </div>
                  <p className="text-xs text-white font-medium mt-1">{property.bedrooms}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                  <div className="flex items-center gap-1.5">
                    <Maximize className="w-3.5 h-3.5 text-white" />
                    <span className="text-[10px] text-white font-medium">Surface</span>
                  </div>
                  <p className="text-xs text-white font-medium mt-1">{property.surfaceArea}m²</p>
                </div>
              </div>

              <div className="mt-auto flex flex-col md:flex-row gap-3">
                <Link
                  to={`/dashboard/letter/${property.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FileText className="w-4 h-4" />
                  Generate Letter
                </Link>
                <a
                  href={property.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
                >
                  View Details
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}