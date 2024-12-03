import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '../types';
import L from 'leaflet';
import * as turf from '@turf/turf';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// City coordinates and boundaries
const cityData: { [key: string]: { center: [number, number], radius: number } } = {
  'Amsterdam': { center: [52.3676, 4.9041], radius: 5 },
  'Rotterdam': { center: [51.9244, 4.4777], radius: 4.5 },
  'The Hague': { center: [52.0705, 4.3007], radius: 4 },
  'Utrecht': { center: [52.0907, 5.1214], radius: 3.5 },
  'Eindhoven': { center: [51.4416, 5.4697], radius: 4 },
  'Groningen': { center: [53.2194, 6.5665], radius: 3.5 },
  'Tilburg': { center: [51.5719, 5.0672], radius: 3 },
  'Almere': { center: [52.3508, 5.2647], radius: 3.5 },
  'Breda': { center: [51.5719, 4.7683], radius: 3 },
  'Nijmegen': { center: [51.8426, 5.8546], radius: 3 },
};

// Create GeoJSON polygon for city
function createCityPolygon(center: [number, number], radiusKm: number) {
  const options = { steps: 64, units: 'kilometers' as const };
  const circle = turf.circle(center, radiusKm, options);
  return circle;
}

// Component to handle map view updates
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 11);
  }, [center, map]);

  return null;
}

interface MapProps {
  selectedCity: string;
  properties: Property[];
}

export default function Map({ selectedCity, properties }: MapProps) {
  const cityInfo = cityData[selectedCity] || cityData['Amsterdam'];
  const cityPolygon = createCityPolygon(cityInfo.center, cityInfo.radius);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <MapContainer
        center={cityInfo.center}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        boxZoom={false}
        keyboard={false}
      >
        <MapUpdater center={cityInfo.center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* City boundary */}
        <GeoJSON
          key={selectedCity}
          data={cityPolygon}
          pathOptions={{
            fillColor: '#FF6B6B',
            fillOpacity: 0.15,
            color: '#FF6B6B',
            weight: 2,
            opacity: 0.8
          }}
        />

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={cityData[property.city]?.center || cityInfo.center}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-dark">{property.title}</h3>
                <p className="text-gray-600">€{property.price}/month</p>
                <p className="text-gray-600">{property.bedrooms} bedrooms</p>
                <a
                  href={property.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 mt-2 inline-block"
                >
                  View Details
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}