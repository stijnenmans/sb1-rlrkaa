import React from 'react';
import { Euro } from 'lucide-react';

interface PriceSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function PriceSlider({ 
  value, 
  onChange, 
  min = 500, 
  max = 5000, 
  step = 100 
}: PriceSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
          <Euro className="w-4 h-4 text-accent" />
          Max Price
        </label>
        <span className="text-white font-medium">
          {value ? `€${value}` : 'No limit'}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value || max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-accent"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>€{min}</span>
        <span>€{max}</span>
      </div>
    </div>
  );
}