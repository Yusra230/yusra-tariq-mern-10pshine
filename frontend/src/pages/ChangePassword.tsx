import React, { useState } from 'react';
import { Check
} from 'lucide-react';
import { BackgroundAnimations } from '../components/userProfile/settings/changePassword/BackgroundAnimations';
import { Header } from '../components/userProfile/settings/changePassword/Header';
import { SuccessMessage } from '../components/userProfile/settings/changePassword/SuccessMessage';
import { ErrorMessage } from '../components/userProfile/settings/changePassword/ErrorMessage';
import { SecurityTip } from '../components/userProfile/settings/changePassword/SecurityTip';
import { PasswordInput } from '../components/userProfile/settings/changePassword/PasswordInput';
import { PasswordRequirementList } from '../components/userProfile/settings/changePassword/PasswordRequirementList';
import { PasswordMatchIndicator } from '../components/userProfile/settings/changePassword/PasswordMatchIndicator';
import { AdditionalSecurityInfo } from '../components/userProfile/settings/changePassword/AdditionalSecurityInfo';
import { PageHeader } from '../components/userProfile/settings/changePassword/PageHeader';
import { calculatePasswordStrength } from '../utils/passwordUtils';
import { PasswordStrengthIndicator } from '../components/userProfile/settings/changePassword/PasswordStrengthIndicator';
import { changePasswordOnServer } from '../services/authService';
import { useNavigate } from 'react-router-dom';

// -----------------------------
// 1. Types & Constants
// -----------------------------

// -----------------------------
// 4. Main Container Component
// -----------------------------
const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const passwordStrength = calculatePasswordStrength(newPassword);
  // window.scrollTo({
  //   top: 0,
  //   behavior: "smooth",
  // });  

  const handleSubmit = async () => {
    setErrors("");
  
    if (!currentPassword) {
      setErrors("Please enter your current password");
      return;
    }
  
    if (!newPassword || newPassword.length < 8) {
      setErrors("New password must be at least 8 characters long");
      return;
    }
  
    if (newPassword === currentPassword) {
      setErrors("New password must be different from current password");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setErrors("Passwords do not match");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const data = await changePasswordOnServer({
        currentPassword,
        newPassword,
      });
  
      setShowSuccess(true);
      console.log(data.message);
  
      setTimeout(() => {
        setShowSuccess(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }, 3000);
    } catch (err: any) {
      setErrors(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/myprofile')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 via-purple-50 to-indigo-100 relative overflow-hidden">
      <BackgroundAnimations />

      <Header onBack={handleBack} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-2xl relative z-10">
        <PageHeader />

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-pink-100 p-6 sm:p-10">
          <SuccessMessage show={showSuccess} />
          <ErrorMessage message={errors} />
          <SecurityTip />

          <div className="space-y-6">
            {/* Current Password */}
            <PasswordInput
              id="current-password"
              label="Current Password"
              value={currentPassword}
              onChange={setCurrentPassword}
              placeholder="Enter your current password"
              showPassword={showCurrentPassword}
              onToggleShow={() => setShowCurrentPassword(!showCurrentPassword)}
              focusColor="gray"
            />

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-pink-100"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm font-semibold text-gray-500">New Password</span>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <PasswordInput
                id="new-password"
                label="New Password"
                value={newPassword}
                onChange={setNewPassword}
                placeholder="Enter your new password"
                showPassword={showNewPassword}
                onToggleShow={() => setShowNewPassword(!showNewPassword)}
                focusColor="pink"
              />
              {newPassword && <PasswordStrengthIndicator strength={passwordStrength} />}
            </div>

            {/* Password Requirements */}
            {newPassword && <PasswordRequirementList password={newPassword} />}

            {/* Confirm Password */}
            <div className="space-y-2">
              <PasswordInput
                id="confirm-password"
                label="Confirm New Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Re-enter your new password"
                showPassword={showConfirmPassword}
                onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                focusColor="purple"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <PasswordMatchIndicator newPassword={newPassword} confirmPassword={confirmPassword} />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="group relative w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white rounded-xl font-bold shadow-xl shadow-pink-300/50 hover:shadow-2xl hover:shadow-pink-400/60 transition-all duration-500 hover:scale-105 overflow-hidden mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating Password...</span>
                </span>
              ) : (
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Change Password</span>
                  <Check className="w-5 h-5" />
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </div>

        <AdditionalSecurityInfo />
      </main>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ChangePassword;