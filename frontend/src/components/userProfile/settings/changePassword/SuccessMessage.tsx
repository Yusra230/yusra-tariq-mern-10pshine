import { CheckCircle2 } from "lucide-react";

// Success message banner
interface SuccessMessageProps {
  show: boolean;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ show }) => {
  if (!show) return null;
  return (
    <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl animate-slideDown">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">Password Changed Successfully!</h3>
          <p className="text-sm text-gray-600">Your password has been updated. Keep it safe and secure.</p>
        </div>
      </div>
    </div>
  );
};
