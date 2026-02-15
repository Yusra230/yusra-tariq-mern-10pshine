import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { LoadingButton } from '../LoadingButton';
import { ErrorAlert } from '../ErrorAlert';

interface VerificationStepProps {
  email: string;
  verificationCode: string[];
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  errors: string;
  isLoading: boolean;
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const VerificationStep: React.FC<VerificationStepProps> = ({
  email,
  verificationCode,
  inputRefs,
  errors,
  isLoading,
  onChange,
  onKeyDown,
  onSubmit,
  onBack
}) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Shield className="w-8 h-8 text-purple-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
      <p className="text-gray-600">
        We sent a 6-digit code to <span className="font-semibold text-pink-600">{email}</span>
      </p>
    </div>

    {errors && <ErrorAlert message={errors} />}

    <div className="space-y-4">
      <label className="text-sm font-semibold text-gray-700 text-center block">
        Enter Verification Code
      </label>
      <div className="flex justify-center space-x-2 sm:space-x-3">
        {verificationCode.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => onChange(index, e.target.value)}
            onKeyDown={(e) => onKeyDown(index, e)}
            className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-white border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
          />
        ))}
      </div>
    </div>

    <LoadingButton
      isLoading={isLoading}
      onClick={onSubmit}
      text="Verify Code"
      gradientFrom="from-purple-500"
      gradientVia="via-indigo-500"
      gradientTo="to-blue-600"
      shadowColor="shadow-purple"
    />

    <div className="text-center">
      <p className="text-sm text-gray-600">
        Didn't receive the code?{' '}
        <button className="font-bold text-purple-600 hover:text-pink-600 transition-colors">
          Resend Code
        </button>
      </p>
    </div>

    <button
      onClick={onBack}
      className="w-full text-sm font-semibold text-gray-600 hover:text-purple-600 transition-colors flex items-center justify-center space-x-1"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Change Email</span>
    </button>
  </div>
);