import { Eye, EyeOff, Lock } from "lucide-react";

// Reusable password input with show/hide toggle
interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  showPassword: boolean;
  onToggleShow: () => void;
  focusColor?: 'gray' | 'pink' | 'purple';
  autoFocus?: boolean;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  showPassword,
  onToggleShow,
  focusColor = 'gray',
  autoFocus = false,
  onKeyPress,
}) => {
  const focusRingColor = {
    gray: 'focus:ring-gray-100 focus:border-gray-400',
    pink: 'focus:ring-pink-100 focus:border-pink-400',
    purple: 'focus:ring-purple-100 focus:border-purple-400',
  }[focusColor];

  const hoverColor = {
    gray: 'hover:text-gray-600',
    pink: 'hover:text-pink-600',
    purple: 'hover:text-purple-600',
  }[focusColor];

  const gradientColor = {
    gray: 'from-gray-400 to-gray-400',
    pink: 'from-pink-400 to-purple-400',
    purple: 'from-purple-400 to-pink-400',
  }[focusColor];

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
        <Lock className="w-4 h-4 text-gray-500" />
        <span>{label}</span>
      </label>
      <div className="relative group">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onKeyPress={onKeyPress}
          className={`w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl ${focusRingColor} outline-none transition-all duration-300 placeholder:text-gray-400 pr-12`}
        />
        <button
          type="button"
          onClick={onToggleShow}
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 ${hoverColor} transition-colors`}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
        {focusColor !== 'gray' && (
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradientColor} opacity-0 group-focus-within:opacity-20 blur transition-opacity pointer-events-none`}></div>
        )}
      </div>
    </div>
  );
};

