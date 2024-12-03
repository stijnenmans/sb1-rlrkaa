import React from 'react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Monthly',
    price: 9.99,
    discount: 0,
    period: '1 month'
  },
  {
    name: 'Quarterly',
    price: 8.49,
    discount: 15,
    period: '3 months',
    recommended: true
  },
  {
    name: 'Annual',
    price: 7.49,
    discount: 25,
    period: '12 months'
  }
];

export default function PricingSection() {
  const navigate = useNavigate();

  const handleSelect = () => {
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
    <section className="py-24 bg-dark relative overflow-hidden" id="pricing">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-secondary via-secondary to-secondary/80 bg-clip-text text-transparent">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the plan that best fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white/5 backdrop-blur-lg rounded-xl p-4 border transition-all ${
                plan.recommended
                  ? 'border-accent scale-[1.02] shadow-lg shadow-accent/10'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                    {plan.recommended && (
                      <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold text-white">€{plan.price}</span>
                    <span className="text-sm text-gray-400">/month</span>
                  </div>
                  {plan.discount > 0 && (
                    <p className="text-sm text-accent mt-1">Save {plan.discount}% compared to monthly</p>
                  )}
                </div>
                <button
                  onClick={handleSelect}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                    plan.recommended
                      ? 'bg-accent text-white hover:bg-accent/90'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}