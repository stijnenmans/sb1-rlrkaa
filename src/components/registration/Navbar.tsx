import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import Logo from '../Logo';

export default function Navbar() {
  return (
    <nav className="bg-black/90 fixed w-full top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-secondary fill-current" />
              ))}
            </div>
            <div className="text-sm">
              <span className="text-white font-semibold">4.9/5</span>
              <span className="text-gray-400 ml-1">from 1,573 reviews</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}