import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();
  const isLoggedIn = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 border-b border-white/10 transition-all duration-300 ${
      hasScrolled ? 'bg-black/90' : 'bg-transparent'
    } backdrop-blur-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {isLoggedIn ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40&h=40&q=80"
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-white/20"
                  />
                  <Link to="/login" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Log out
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Log in</Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-accent text-white rounded-full font-bold hover:bg-accent/90 transform hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-black/90 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-3 px-4">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40&h=40&q=80"
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-white/20"
                  />
                  <Link to="/login" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Log out
                  </Link>
                </div>
              ) : (
                <>
                  <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
                  <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Log in</Link>
                  <Link
                    to="/register"
                    className="px-6 py-2 bg-accent text-white rounded-full font-bold hover:bg-accent/90 text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}