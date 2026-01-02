import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Sparkles, Heart, Star, Cloud, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';

const NotesLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  console.log("login")

  const handleSubmit = () => {
    console.log('Form submitted:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 via-purple-50 to-indigo-100 relative overflow-x-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Sparkles className="w-8 h-8 text-pink-300 opacity-40" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float animation-delay-2000">
          <Heart className="w-6 h-6 text-rose-300 opacity-40" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float animation-delay-4000">
          <Star className="w-7 h-7 text-purple-300 opacity-40" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 animate-float">
          <Cloud className="w-9 h-9 text-indigo-300 opacity-40" />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding & Info */}
        <div className="hidden lg:flex flex-col space-y-8 pr-12">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                NotesBloom
              </span>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                Welcome Back!
              </span>
              <span className="block text-gray-800 mt-2">
                Your Ideas Await ✨
              </span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Step back into your creative sanctuary where every thought blooms into beautiful notes.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            {[
              { icon: CheckCircle2, text: 'Unlimited beautiful notes', color: 'from-pink-500 to-rose-500' },
              { icon: CheckCircle2, text: 'Sync across all devices', color: 'from-purple-500 to-indigo-500' },
              { icon: CheckCircle2, text: 'Premium templates & themes', color: 'from-rose-500 to-pink-500' },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 group cursor-pointer"
              >
                <div className={`w-6 h-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Decorative Quote */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-pink-200 shadow-lg">
            <p className="text-gray-700 italic mb-2">
              "NotesBloom transformed how I organize my thoughts. It's like having a beautiful garden for my ideas!"
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"></div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Sarah Mitchell</p>
                <p className="text-xs text-gray-500">Creative Writer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-pink-100 p-8 sm:p-10 hover:shadow-pink-300/50 transition-all duration-500">
            
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl blur opacity-75"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                NotesBloom
              </span>
            </div>

            {/* Tab Toggle */}
            <div className="flex bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  isLogin
                    ? 'bg-white text-pink-600 shadow-lg'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  !isLogin
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {isLogin ? 'Welcome Back!' : 'Join NotesBloom'}
              </h2>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Continue your creative journey' 
                  : 'Start your beautiful note-taking journey'}
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full py-3.5 px-4 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-pink-300 hover:bg-pink-50 transition-all duration-300 flex items-center justify-center space-x-3 shadow-sm hover:shadow-md group">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <button className="w-full py-3.5 px-4 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center space-x-3 shadow-sm hover:shadow-md group">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-pink-100"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with email</span>
              </div>
            </div>

            {/* Login Form */}
            <div className="space-y-5">
              {/* Email Input */}
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
                    placeholder="you@example.com"
                    className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 placeholder:text-gray-400"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-focus-within:opacity-20 blur transition-opacity pointer-events-none"></div>
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
                  <Lock className="w-4 h-4 text-purple-500" />
                  <span>Password</span>
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 placeholder:text-gray-400 pr-12"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-focus-within:opacity-20 blur transition-opacity pointer-events-none"></div>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-gray-300 text-pink-500 focus:ring-2 focus:ring-pink-200 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600 font-medium group-hover:text-pink-600 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-sm font-semibold text-pink-600 hover:text-purple-600 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="group relative w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white rounded-xl font-bold shadow-xl shadow-pink-300/50 hover:shadow-2xl hover:shadow-pink-400/60 transition-all duration-500 hover:scale-105 overflow-x-hidden mt-6"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>{isLogin ? 'Login to NotesBloom' : 'Create Account'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </div>

            {/* Footer Text */}
            <p className="text-center text-sm text-gray-600 mt-6">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold text-pink-600 hover:text-purple-600 transition-colors"
              >
                {isLogin ? 'Sign up free' : 'Login here'}
              </button>
            </p>

            {/* Terms */}
            <p className="text-center text-xs text-gray-500 mt-4 leading-relaxed">
              By continuing, you agree to our{' '}
              <a href="#" className="text-pink-600 hover:text-purple-600 font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-pink-600 hover:text-purple-600 font-medium">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
              ))}
            </div>
            <span className="font-medium">Trusted by 50,000+ creative minds</span>
          </div>
        </div>
      </div>

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
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
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

export default NotesLogin;