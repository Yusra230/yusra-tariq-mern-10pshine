import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface LoadingButtonProps {
  isLoading: boolean;
  onClick: () => void;
  text: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  shadowColor: string;
  icon?: 'arrow' | 'check';
  disabled?: boolean;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  onClick,
  text,
  gradientFrom,
  gradientVia,
  gradientTo,
  shadowColor,
  icon = 'arrow',
  disabled = false
}) => (
  <button
    onClick={onClick}
    disabled={isLoading || disabled}
    className={`group relative w-full py-4 bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo} text-white rounded-xl font-bold shadow-xl ${shadowColor}/50 hover:shadow-2xl ${shadowColor}/60 transition-all duration-500 hover:scale-105 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed`}
  >
    {isLoading ? (
      <span className="flex items-center justify-center space-x-2">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>{text}...</span>
      </span>
    ) : (
      <span className="relative z-10 flex items-center justify-center space-x-2">
        <span>{text}</span>
        {icon === 'arrow' ? (
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        ) : (
          <Check className="w-5 h-5" />
        )}
      </span>
    )}
    <div className={`absolute inset-0 bg-gradient-to-r ${gradientTo} ${gradientVia} ${gradientFrom} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
  </button>
);