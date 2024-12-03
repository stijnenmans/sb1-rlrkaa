import React, { useState } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import { FilterOptions } from '../../types';

interface PaymentDetailsProps {
  filters: FilterOptions;
  onBack: () => void;
  onSubmit: () => void;
  selectedPlan: {
    name: string;
    price: number;
    period: string;
  };
}

const paymentMethods = [
  {
    id: 'ideal',
    name: 'iDEAL',
    icon: 'https://www.ideal.nl/img/ideal-logo.svg',
  },
  {
    id: 'card',
    name: 'Credit Card',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
  },
];

const countries = [
  'Netherlands',
  'Belgium',
  'Germany',
  'France',
  'United Kingdom',
  'Spain',
  'Italy',
];

export default function PaymentDetails({ filters, onBack, onSubmit, selectedPlan }: PaymentDetailsProps) {
  const [paymentMethod, setPaymentMethod] = useState('ideal');
  const [country, setCountry] = useState('Netherlands');
  const [coupon, setCoupon] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);

  const total = selectedPlan.price;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left side - Order Summary */}
      <div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
          
          {/* Plan Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div>
                <p className="text-white">{selectedPlan.name} Plan</p>
                <p className="text-sm text-gray-400">{selectedPlan.period}</p>
              </div>
              <p className="text-white font-semibold">€{selectedPlan.price}/month</p>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-2">
              <p className="text-white font-semibold">Total</p>
              <p className="text-xl font-bold text-white">€{total}/month</p>
            </div>
          </div>

          {/* Coupon */}
          <div className="mt-6">
            {!showCouponInput ? (
              <button
                onClick={() => setShowCouponInput(true)}
                className="text-sm text-accent hover:text-accent/80"
              >
                Have a coupon code?
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white text-sm"
                />
                <button className="px-3 py-2 bg-accent text-white rounded-lg text-sm font-medium">
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right side - Payment Form */}
      <div className="md:col-span-2 space-y-6">
        {/* Country Selection */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Country of Residence
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-3 text-white"
          >
            {countries.map((c) => (
              <option key={c} value={c} className="bg-dark">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Methods */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-medium text-gray-300 mb-4">Payment Method</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                  paymentMethod === method.id
                    ? 'bg-white/10 border-accent'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-accent"
                  />
                  <span className="text-white">{method.name}</span>
                </div>
                <div className="h-6 flex items-center">
                  <img 
                    src={method.icon} 
                    alt={method.name} 
                    className={`h-full object-contain ${method.id === 'ideal' ? 'scale-110' : ''}`}
                  />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={onSubmit}
            className="flex items-center gap-2 px-8 py-2.5 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-all duration-200"
          >
            Pay and start receiving matches
          </button>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <Lock className="w-4 h-4" />
          Secure payment powered by Stripe
        </div>
      </div>
    </div>
  );
}