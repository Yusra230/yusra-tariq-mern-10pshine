import React from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { LoadingButton } from '../LoadingButton';
import { ErrorAlert } from '../ErrorAlert';

interface ResetStepProps {
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  showNewPassword: boolean;
  setShowNewPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
  errors: string;
  isLoading: boolean;
  onSubmit: () => void;
}

export const ResetStep: React.FC<ResetStepProps> = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  errors,
  isLoading,
  onSubmit
}) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Lock className="w-8 h-8 text-rose-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
      <p className="text-gray-600">
        Create a strong password to secure your account
      </p>
    </div>

    {errors && <ErrorAlert message={errors} />}

    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
          <Lock className="w-4 h-4 text-rose-500" />
          <span>New Password</span>
        </label>
        <div className="relative group">
          <input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all duration-300 placeholder:text-gray-400 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-600 transition-colors"
          >
            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 opacity-0 group-focus-within:opacity-20 blur transition-opacity pointer-events-none"></div>
        </div>
        <p className="text-xs text-gray-500">Must be at least 8 characters</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
          <Lock className="w-4 h-4 text-pink-500" />
          <span>Confirm Password</span>
        </label>
        <div className="relative group">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
            placeholder="Confirm new password"
            className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 placeholder:text-gray-400 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-focus-within:opacity-20 blur transition-opacity pointer-events-none"></div>
        </div>
      </div>
    </div>

    <LoadingButton
      isLoading={isLoading}
      onClick={onSubmit}
      text="Reset Password"
      gradientFrom="from-rose-500"
      gradientVia="via-pink-500"
      gradientTo="to-fuchsia-600"
      shadowColor="shadow-rose"
      icon="check"
    />
  </div>
);