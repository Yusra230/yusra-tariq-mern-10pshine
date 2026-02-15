import React from 'react';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { LoadingButton } from '../LoadingButton';

interface SuccessStepProps {
  onBack: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ onBack }) => (
  <div className="space-y-6 animate-fadeIn text-center">
    <div className="mb-8">
      <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Password Reset Successful!</h2>
      <p className="text-gray-600 text-lg">
        Your password has been reset successfully. You can now login with your new password.
      </p>
    </div>

    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-100">
      <Sparkles className="w-8 h-8 text-pink-500 mx-auto mb-3" />
      <p className="text-gray-700 font-medium">
        Welcome back to NotesBloom! ✨
      </p>
    </div>

    <LoadingButton
      isLoading={false}
      onClick={onBack}
      text="Back to Login"
      gradientFrom="from-pink-500"
      gradientVia="via-rose-500"
      gradientTo="to-purple-600"
      shadowColor="shadow-pink"
    />
  </div>
);