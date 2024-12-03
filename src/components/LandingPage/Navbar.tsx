import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register', { 
      state: { 
        initialFilters: {
          city: 'Amsterdam',
          maxPrice: 2000,
          minBedrooms: 2,
          minSurfaceArea: 40,
        },
        startAtLocation: true
      } 
    });
  };

  return (
    <nav className="bg-black fixed w-full top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Home className="w-6 h-6 text-accent" />
              <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-secondary rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-bold text-white">RentalBot</span>
          </Link>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Log in</Link>
            <button
              onClick={handleGetStarted}
              className="px-6 py-2 bg-accent text-white rounded-full font-bold hover:bg-accent/90 transform hover:scale-105 transition-all duration-200"
            >
              Get Started
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Log in</Link>
              <button
                onClick={handleGetStarted}
                className="px-6 py-2 bg-accent text-white rounded-full font-bold hover:bg-accent/90 text-center"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}