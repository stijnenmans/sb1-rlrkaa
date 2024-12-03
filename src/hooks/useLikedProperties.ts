import { useState, useEffect } from 'react';

export function useLikedProperties() {
  const [likedProperties, setLikedProperties] = useState<string[]>(() => {
    const saved = localStorage.getItem('likedProperties');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('likedProperties', JSON.stringify(likedProperties));
  }, [likedProperties]);

  const isLiked = (propertyId: string) => likedProperties.includes(propertyId);

  const toggleLike = (propertyId: string) => {
    setLikedProperties(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  return {
    likedProperties,
    isLiked,
    toggleLike
  };
}