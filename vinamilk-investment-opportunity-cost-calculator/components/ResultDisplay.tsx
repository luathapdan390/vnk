
import React from 'react';

interface ResultDisplayProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  isCurrency?: boolean;
  isShares?: boolean;
  className?: string;
  description: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  icon,
  label,
  value,
  isCurrency = true,
  isShares = false,
  className = '',
  description
}) => {
  const formattedValue = isCurrency
    ? value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 })
    : isShares
    ? value.toLocaleString('vi-VN', { maximumFractionDigits: 2 })
    : value;

  return (
    <div className={`bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-start justify-between">
          <p className="text-base font-medium text-slate-400">{label}</p>
          {icon}
        </div>
        <p className="text-3xl lg:text-4xl font-bold text-emerald-400 mt-2 break-words">
          {formattedValue}
        </p>
      </div>
      <p className="text-sm text-slate-500 mt-4">{description}</p>
    </div>
  );
};

export default ResultDisplay;
