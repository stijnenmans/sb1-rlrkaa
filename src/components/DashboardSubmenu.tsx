import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Settings, Heart, Lightbulb } from 'lucide-react';

export default function DashboardSubmenu() {
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const menuItems = [
    {
      path: '/dashboard',
      icon: <LayoutGrid className="w-4 h-4" />,
      label: 'Properties'
    },
    {
      path: '/dashboard/liked',
      icon: <Heart className="w-4 h-4" />,
      label: 'Saved'
    },
    {
      path: '/dashboard/tips',
      icon: <Lightbulb className="w-4 h-4" />,
      label: 'Tips & Tricks'
    },
    {
      path: '/dashboard/settings',
      icon: <Settings className="w-4 h-4" />,
      label: 'Settings'
    }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="bg-black/90 backdrop-blur-lg border-b border-white/10">
      <div 
        className="container mx-auto px-4 overflow-x-auto scrollbar-hide"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex space-x-6 py-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-colors whitespace-nowrap ${
                location.pathname === item.path
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}