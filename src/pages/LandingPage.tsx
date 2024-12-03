import React from 'react';
import HeroSection from '../components/LandingPage/HeroSection';
import FeatureCards from '../components/LandingPage/FeatureCards';
import RegisterSection from '../components/LandingPage/RegisterSection';
import Testimonials from '../components/LandingPage/Testimonials';
import PricingSection from '../components/LandingPage/PricingSection';
import FAQSection from '../components/LandingPage/FAQSection';
import FinalCTA from '../components/LandingPage/FinalCTA';
import Footer from '../components/LandingPage/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark">
      <HeroSection />
      <FeatureCards />
      <RegisterSection />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}