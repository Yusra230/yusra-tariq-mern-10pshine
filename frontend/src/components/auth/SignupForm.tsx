// components/auth/SignupForm.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { addUserToServer } from '../../services/authService';

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
  
    setError('');
    setLoading(true);
  
    try {
      const {token } = await addUserToServer({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.password,
      });
  
      // ✅ Save the token in localStorage
      localStorage.setItem("token", token);
  
      // console.log("User registered successfully:", user);
  
      // Navigate to dashboard or login
      navigate("/login"); // or "/login" if you want them to login manually
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email Input */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
          <Mail className="w-4 h-4 text-pink-500" />
          <span>Email Address</span>
        </label>
        <div className="relative group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 placeholder:text-gray-400"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-focus-within:opacity-20 blur transition-opacity pointer-events-none"></div>
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
          <Lock className="w-4 h-4 text-purple-500" />
          <span>Password</span>
        </label>
        <div className="relative group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 placeholder:text-gray-400 pr-12"
          />
          <button aria-label="Toggle password visibility"
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

      {/* Confirm Password Input */}
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
          <Lock className="w-4 h-4 text-purple-500" />
          <span>Confirm Password</span>
        </label>
        <div className="relative group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 placeholder:text-gray-400 pr-12"
          />
          <button aria-label="Toggle Confirm password visibility"
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600 transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-focus-within:opacity-20 blur transition-opacity pointer-events-none"></div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 text-center">{error}</p>
        </div>
      )}

      {/* Terms Agreement */}
      <label className="flex items-start space-x-2 cursor-pointer group">
        <input
          type="checkbox"
          required
          className="w-5 h-5 rounded border-2 border-gray-300 text-pink-500 focus:ring-2 focus:ring-pink-200 cursor-pointer mt-1"
        />
        <span className="text-sm text-gray-600 font-medium group-hover:text-pink-600 transition-colors">
          I agree to the Terms of Service and Privacy Policy
        </span>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="group relative w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white rounded-xl font-bold shadow-xl shadow-pink-300/50 hover:shadow-2xl hover:shadow-pink-400/60 transition-all duration-500 hover:scale-105 overflow-x-hidden mt-6"
      >
        <span className="relative z-10 flex items-center justify-center space-x-2">
          <span>
            {loading ? 'Creating Account...' : 'Create Account'}
          </span>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-pink-600 hover:text-purple-600 transition-colors">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;