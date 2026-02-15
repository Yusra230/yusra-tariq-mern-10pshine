import React from 'react';
import { type Step } from '../../utils/type';

interface ProgressBarProps {
  currentStep: Step;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const getStepProgress = () => {
    const steps = { email: 33, verification: 66, reset: 100, success: 100 };
    return steps[currentStep];
  };

  return (
    <div className="mb-8">
      <div className="h-2 bg-white/60 backdrop-blur-xl rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 transition-all duration-500 ease-out"
          style={{ width: `${getStepProgress()}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-600 font-medium">
        <span className={currentStep === 'email' ? 'text-pink-600 font-bold' : ''}>Email</span>
        <span className={currentStep === 'verification' ? 'text-pink-600 font-bold' : ''}>Verify</span>
        <span className={currentStep === 'reset' ? 'text-pink-600 font-bold' : ''}>Reset</span>
      </div>
    </div>
  );
};