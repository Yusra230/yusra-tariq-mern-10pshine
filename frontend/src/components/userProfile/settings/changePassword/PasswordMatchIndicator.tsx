import { AlertCircle, CheckCircle2 } from "lucide-react";

// Password match indicator
interface PasswordMatchIndicatorProps {
  newPassword: string;
  confirmPassword: string;
}

export const PasswordMatchIndicator: React.FC<PasswordMatchIndicatorProps> = ({ newPassword, confirmPassword }) => {
  if (!confirmPassword) return null;
  return (
    <div className="flex items-center space-x-2 mt-2">
      {newPassword === confirmPassword ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-600 font-medium">Passwords match</span>
        </>
      ) : (
        <>
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-600 font-medium">Passwords don't match</span>
        </>
      )}
    </div>
  );
};