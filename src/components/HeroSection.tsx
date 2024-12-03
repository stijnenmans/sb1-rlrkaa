import React from 'react';
import { Home } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <Home className="w-12 h-12 mr-4" />
          <h1 className="text-4xl font-bold">Dutch Housing Platform</h1>
        </div>
        <p className="text-center text-xl mb-8">
          Find your perfect rental home in the Netherlands
        </p>
      </div>
    </div>
  );
}