import React from 'react';
import { ArrowLeft, MapPin, Euro, BedDouble, Maximize } from 'lucide-react';
import { FilterOptions } from '../../types';
import PaymentDetails from './PaymentDetails';
import { useExpectedMatches } from '../../hooks/useExpectedMatches';

interface PaymentStepProps {
  filters: FilterOptions;
  onBack: () => void;
  onSubmit: () => void;
}

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

export default function PaymentStep({ filters, onBack, onSubmit }: PaymentStepProps) {
  const [selectedPlan, setSelectedPlan] = React.useState(plans[1]);
  const [showPaymentDetails, setShowPaymentDetails] = React.useState(false);
  const expectedMatches = useExpectedMatches(filters);

  if (showPaymentDetails) {
    return (
      <PaymentDetails
        filters={filters}
        selectedPlan={selectedPlan}
        onBack={() => setShowPaymentDetails(false)}
        onSubmit={onSubmit}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left side - Selected Preferences */}
      <div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Your Preferences</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span className="text-[10px] text-white font-medium">City</span>
              </div>
              <p className="text-xs text-white font-medium mt-1 truncate">{filters.city}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
              <div className="flex items-center gap-1.5">
                <Euro className="w-3.5 h-3.5 text-white" />
                <span className="text-[10px] text-white font-medium">Max Price</span>
              </div>
              <p className="text-xs text-white font-medium mt-1">
                {filters.maxPrice ? `€${filters.maxPrice}` : 'No limit'}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-white" />
                <span className="text-[10px] text-white font-medium">Min Bedrooms</span>
              </div>
              <p className="text-xs text-white font-medium mt-1">
                {filters.minBedrooms ? `${filters.minBedrooms}+` : 'Any'}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
              <div className="flex items-center gap-1.5">
                <Maximize className="w-3.5 h-3.5 text-white" />
                <span className="text-[10px] text-white font-medium">Min Surface</span>
              </div>
              <p className="text-xs text-white font-medium mt-1">
                {filters.minSurfaceArea ? `${filters.minSurfaceArea}+ m²` : 'Any'}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-white bg-white/5 rounded-lg p-2 border border-white/10">
            <span className="text-lg">🔥</span>
            <span>You can expect <span className="font-semibold">{expectedMatches}</span> matches per week</span>
          </div>
        </div>
      </div>

      {/* Right side - Plans */}
      <div className="md:col-span-2">
        <div className="space-y-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white/5 backdrop-blur-lg rounded-xl p-3 border transition-all ${
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
                  onClick={() => {
                    setSelectedPlan(plan);
                    setShowPaymentDetails(true);
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
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

        <button
          onClick={onBack}
          className="mt-4 flex items-center gap-2 px-6 py-2 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
    </div>
  );
}