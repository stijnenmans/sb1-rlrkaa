import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FilterOptions } from '../types';
import { filterProperties } from '../utils/filterProperties';
import { mockProperties } from '../data/mockData';
import StepIndicator from '../components/registration/StepIndicator';
import LocationStep from '../components/registration/LocationStep';
import PreferencesStep from '../components/registration/PreferencesStep';
import ContactStep from '../components/registration/ContactStep';
import PaymentStep from '../components/registration/PaymentStep';
import Navbar from '../components/registration/Navbar';

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialFilters = location.state?.initialFilters;
  const startAtLocation = location.state?.startAtLocation;

  const [currentStep, setCurrentStep] = useState(startAtLocation ? 0 : 1);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [filters, setFilters] = useState<FilterOptions>({
    city: 'Amsterdam',
    maxPrice: 2000,
    minBedrooms: 2,
    minSurfaceArea: 40,
  });

  // Update filters if coming from landing page
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const filteredProperties = filterProperties(mockProperties, filters);

  const handleSubmit = () => {
    console.log('Register:', { ...formData, filters });
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <LocationStep
            filters={filters}
            onFilterChange={setFilters}
            properties={filteredProperties}
            onNext={() => setCurrentStep(1)}
          />
        );
      case 1:
        return (
          <PreferencesStep
            filters={filters}
            onFilterChange={setFilters}
            properties={filteredProperties}
            onBack={() => setCurrentStep(0)}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <ContactStep
            formData={formData}
            filters={filters}
            onChange={setFormData}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        );
      case 3:
        return (
          <PaymentStep
            filters={filters}
            onBack={() => setCurrentStep(2)}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-dark pt-24 px-4 relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            {currentStep < 2 && <StepIndicator currentStep={currentStep} />}
            {renderStep()}
          </div>
        </div>
      </div>
    </>
  );
}