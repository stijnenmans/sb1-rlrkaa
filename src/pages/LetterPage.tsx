import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Copy, RefreshCw } from 'lucide-react';
import { mockProperties } from '../data/mockData';
import DashboardSubmenu from '../components/DashboardSubmenu';

export default function LetterPage() {
  const { propertyId } = useParams();
  const property = mockProperties.find(p => p.id === propertyId);
  const [letter, setLetter] = useState(generateLetter(property));

  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
  };

  const handleRegenerate = () => {
    setLetter(generateLetter(property));
  };

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="min-h-screen bg-dark pt-16 relative overflow-hidden">
      <DashboardSubmenu />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Property Summary */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
            <h1 className="text-2xl font-bold text-white mb-4">Application Letter</h1>
            <div className="flex items-center gap-4">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-white">{property.title}</h2>
                <p className="text-gray-400">€{property.price}/month • {property.bedrooms} bedrooms • {property.surfaceArea}m²</p>
                <p className="text-gray-400">{property.city}</p>
              </div>
            </div>
          </div>

          {/* Letter Content */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Your Letter</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleRegenerate}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white whitespace-pre-line">{letter}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateLetter(property: any) {
  const templates = [
    `Dear Property Manager,

I am writing to express my strong interest in the ${property?.title} located in ${property?.city}. As a responsible and reliable tenant, I am very impressed with the property's features and location.

The ${property?.bedrooms} bedroom layout and ${property?.surfaceArea}m² space would perfectly suit my needs. I am financially stable with a steady income that comfortably covers the monthly rent of €${property?.price}.

I would greatly appreciate the opportunity to view the property and discuss my application further. I am available for viewings at your earliest convenience and can provide references upon request.

Thank you for considering my application.

Best regards,
John Doe`,

    `Dear Property Manager,

I am excited to submit my application for the ${property?.title} in ${property?.city}. The property's specifications of ${property?.bedrooms} bedrooms and ${property?.surfaceArea}m² align perfectly with what I'm looking for in a home.

I am a professional with a stable income that well exceeds the monthly rent requirement of €${property?.price}. I pride myself on being a responsible tenant who always maintains the property in excellent condition and pays rent promptly.

I would welcome the opportunity to view the property and discuss my application in person. I can provide references and any additional information you may need.

Thank you for your time and consideration.

Kind regards,
John Doe`
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}