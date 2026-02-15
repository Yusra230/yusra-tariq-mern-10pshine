import React from 'react';
import { Mail, ArrowLeft,Lock } from 'lucide-react';
import { LoadingButton } from '../LoadingButton';
import { ErrorAlert } from '../ErrorAlert';

interface EmailStepProps {
  email: string;
  setEmail: (email: string) => void;
  errors: string;
  isLoading: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

export const EmailStep: React.FC<EmailStepProps> = ({
  email,
  setEmail,
  errors,
  isLoading,
  onSubmit,
  onBack
}) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Lock className="w-8 h-8 text-pink-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
      <p className="text-gray-600">
        No worries! Enter your email and we'll send you a verification code.
      </p>
    </div>

    {errors && <ErrorAlert message={errors} />}

    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
        <Mail className="w-4 h-4 text-pink-500" />
        <span>Email Address</span>
      </label>
      <div className="relative group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
          placeholder="you@example.com"
          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 placeholder:text-gray-400"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-focus-within:opacity-20 blur transition-opacity pointer-events-none"></div>
      </div>
    </div>

    <LoadingButton
      isLoading={isLoading}
      onClick={onSubmit}
      text="Continue"
      gradientFrom="from-pink-500"
      gradientVia="via-rose-500"
      gradientTo="to-purple-600"
      shadowColor="shadow-pink"
    />

    <button
      onClick={onBack}
      className="w-full text-sm font-semibold text-gray-600 hover:text-pink-600 transition-colors flex items-center justify-center space-x-1"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back to Login</span>
    </button>
  </div>
);