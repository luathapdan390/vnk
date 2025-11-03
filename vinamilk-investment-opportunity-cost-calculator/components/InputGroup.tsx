
import React from 'react';

interface InputGroupProps {
  label: string;
  id: string;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  min: number;
  max: number;
  step: number;
  isCurrency?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  id,
  value,
  onChange,
  unit,
  min,
  max,
  step,
  isCurrency = false
}) => {
  const displayValue = isCurrency 
    ? value.toLocaleString('vi-VN') 
    : value;

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-400">
        {label}
      </label>
      <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-lg p-2 focus-within:ring-2 focus-within:ring-emerald-500 transition">
        <input
          type="number"
          id={id}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={min}
          max={max}
          step={step}
          className="w-full bg-transparent text-slate-100 font-semibold text-lg outline-none appearance-none"
          style={{ MozAppearance: 'textfield' }}
        />
        <span className="text-slate-400 font-medium">{unit}</span>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
      />
    </div>
  );
};

export default InputGroup;
