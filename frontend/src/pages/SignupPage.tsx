// pages/SignupPage.tsx
import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import  SignupForm  from '../components/auth/SignupForm';
import { SocialButtons } from '../components/auth/SocialButtons';

const SignupPage: React.FC = () => {
  return (
    <AuthLayout
      title="Join NotesBloom"
      subtitle="Start your beautiful note-taking journey"
    >
      <SocialButtons />
      
      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-pink-100"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">
            Or sign up with email
          </span>
        </div>
      </div>

      <SignupForm />
      
      {/* Terms */}
      <p className="text-center text-xs text-gray-500 mt-4 leading-relaxed">
        By continuing, you agree to our{" "}
        <a
          href="/terms"
          className="text-pink-600 hover:text-purple-600 font-medium"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          className="text-pink-600 hover:text-purple-600 font-medium"
        >
          Privacy Policy
        </a>
      </p>

      {/* Trust Badge */}
      <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <svg
              key={i}
              className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-lg"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="font-medium">
          Trusted by 50,000+ creative minds
        </span>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;