import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  icon: React.ReactNode;
  unit?: string;
  min?: number;
  max?: number;
  options?: number[];
}

export default function NumberInput({
  value,
  onChange,
  label,
  icon,
  unit = '',
  min = 0,
  max = 100,
  options = []
}: NumberInputProps) {
  const handleIncrement = () => {
    if (!options.length) return;
    const currentIndex = options.indexOf(value);
    if (currentIndex < options.length - 1) {
      onChange(options[currentIndex + 1]);
    }
  };

  const handleDecrement = () => {
    if (!options.length) return;
    const currentIndex = options.indexOf(value);
    if (currentIndex > 0) {
      onChange(options[currentIndex - 1]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="flex items-center gap-3">
        <select
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-12 bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white"
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-dark">
              {unit}{opt}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1">
          <button
            onClick={handleDecrement}
            disabled={value <= options[0]}
            className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={handleIncrement}
            disabled={value >= options[options.length - 1]}
            className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}