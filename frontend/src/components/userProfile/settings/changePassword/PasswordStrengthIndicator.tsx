import type { PasswordStrength } from "../../../../utils/password";

// Password strength bar and label
interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ strength }) => (
  <div className="space-y-3 mt-4">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold text-gray-600">Password Strength</span>
      <span className={`text-xs font-bold bg-gradient-to-r ${strength.color} bg-clip-text text-transparent`}>
        {strength.label}
      </span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r ${strength.color} transition-all duration-500`}
        style={{ width: `${(strength.score / 5) * 100}%` }}
      />
    </div>
  </div>
);