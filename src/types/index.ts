export interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  bedrooms: number;
  surfaceArea: number;
  imageUrl: string;
  sourceUrl: string;
  listedAt?: string | number;
}

export interface FilterOptions {
  city: string;
  maxPrice: number;
  minBedrooms: number;
  minSurfaceArea: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  filterPreferences: FilterOptions;
}