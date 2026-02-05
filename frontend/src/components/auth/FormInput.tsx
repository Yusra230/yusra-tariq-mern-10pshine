// components/common/FormInput.tsx
import { useState } from 'react';
import { AlertCircle, Eye, EyeOff, type LucideIcon } from 'lucide-react';

interface FormInputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: LucideIcon;
  required?: boolean;
  error?: string;
  showPasswordToggle?: boolean;
  disabled?: boolean;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
  error,
  showPasswordToggle = false,
  disabled = false,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = showPasswordToggle && type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="space-y-2">
      <label 
        htmlFor={name}
        className="text-sm font-semibold text-gray-700 flex items-center space-x-1"
      >
        {Icon && <Icon className="w-4 h-4 text-pink-500" />}
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative group">
        <input
          id={name}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full px-4 py-3.5 bg-white border-2 rounded-xl
            focus:outline-none transition-all duration-300
            placeholder:text-gray-400
            ${error 
              ? 'border-red-400 focus:ring-4 focus:ring-red-100' 
              : 'border-gray-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${className}
          `}
        />
        
        {/* Show/Hide password toggle */}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600 transition-colors"
            disabled={disabled}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
        
        {/* Gradient background effect */}
        <div 
          className={`
            absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 
            opacity-0 blur transition-opacity pointer-events-none
            ${isFocused && !error ? 'opacity-20' : ''}
          `}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-600 mt-1 flex items-center space-x-1">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

// Also create a Button component
// components/common/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  fullWidth = true,
  disabled,
  className = '',
  ...props
}) => {
  const baseClasses = `
    py-4 rounded-xl font-bold shadow-xl
    transition-all duration-500 hover:scale-105
    overflow-x-hidden relative
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 
      text-white shadow-pink-300/50 hover:shadow-2xl hover:shadow-pink-400/60
    `,
    secondary: `
      bg-gradient-to-r from-blue-500 to-cyan-500
      text-white shadow-blue-300/50 hover:shadow-2xl hover:shadow-blue-400/60
    `,
    outline: `
      bg-white border-2 border-gray-200 text-gray-700
      hover:border-pink-300 hover:bg-pink-50 shadow-sm hover:shadow-md
    `,
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <span className="relative z-10">{children}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 opacity-0 hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000" />
        </>
      )}
    </button>
  );
};