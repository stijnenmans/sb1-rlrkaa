import { Property, FilterOptions } from '../types';

export function filterProperties(properties: Property[], filters: FilterOptions): Property[] {
  return properties.filter((property) => {
    if (filters.city && property.city !== filters.city) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    if (filters.minBedrooms && property.bedrooms < filters.minBedrooms) return false;
    if (filters.minSurfaceArea && property.surfaceArea < filters.minSurfaceArea) return false;
    return true;
  });
}