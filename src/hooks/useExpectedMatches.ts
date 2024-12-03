import { useEffect, useState } from 'react';
import { FilterOptions } from '../types';

// This would normally come from an API/backend
const calculateExpectedMatches = (filters: FilterOptions): number => {
  // Base number of weekly matches
  let baseMatches = 50;

  // Adjust based on city (larger cities have more listings)
  const cityMultipliers: { [key: string]: number } = {
    'Amsterdam': 1.5,
    'Rotterdam': 1.2,
    'The Hague': 1.1,
    'Utrecht': 1.0,
    'Eindhoven': 0.9,
    'Groningen': 0.8,
    'Tilburg': 0.7,
    'Almere': 0.7,
    'Breda': 0.7,
    'Nijmegen': 0.7,
  };

  baseMatches *= cityMultipliers[filters.city] || 1;

  // Adjust matches based on price range
  // Higher max price means more potential matches
  if (filters.maxPrice) {
    // Calculate matches within price ranges
    const ranges = [
      { max: 1000, multiplier: 0.4 },
      { max: 1500, multiplier: 0.6 },
      { max: 2000, multiplier: 0.8 },
      { max: 2500, multiplier: 0.9 },
      { max: 3000, multiplier: 1.0 },
      { max: 4000, multiplier: 1.1 },
      { max: 5000, multiplier: 1.2 },
    ];

    // Find the appropriate range
    const range = ranges.find(r => filters.maxPrice <= r.max) || ranges[ranges.length - 1];
    baseMatches *= range.multiplier;
  }

  // Reduce matches based on bedroom requirements
  if (filters.minBedrooms) {
    const bedroomMultiplier = Math.max(0.2, 1 - (filters.minBedrooms - 1) * 0.2);
    baseMatches *= bedroomMultiplier;
  }

  // Reduce matches based on surface area requirements
  if (filters.minSurfaceArea) {
    const surfaceMultiplier = Math.max(0.2, 1 - (filters.minSurfaceArea - 30) / 200);
    baseMatches *= surfaceMultiplier;
  }

  // Add some randomness to make it more realistic
  const randomFactor = 0.9 + Math.random() * 0.2; // ±10% variation
  baseMatches *= randomFactor;

  return Math.round(baseMatches);
};

export function useExpectedMatches(filters: FilterOptions) {
  const [expectedMatches, setExpectedMatches] = useState(0);

  useEffect(() => {
    setExpectedMatches(calculateExpectedMatches(filters));
  }, [filters]);

  return expectedMatches;
}