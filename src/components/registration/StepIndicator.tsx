import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

const STEPS = ['Location', 'Filters'];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-6">
      {STEPS.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm
                ${index < currentStep
                  ? 'bg-accent border-accent text-white'
                  : index === currentStep
                  ? 'border-accent text-accent'
                  : 'border-white/20 text-white/40'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span
              className={`text-xs mt-2 ${
                index <= currentStep ? 'text-white' : 'text-white/40'
              }`}
            >
              {step}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div className="flex items-center mx-2">
              <div
                className={`w-16 h-0.5 translate-y-[-8px] ${
                  index < currentStep ? 'bg-accent' : 'bg-white/20'
                }`}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}