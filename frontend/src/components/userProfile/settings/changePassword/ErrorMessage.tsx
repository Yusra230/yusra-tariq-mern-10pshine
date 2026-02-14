import { AlertCircle } from "lucide-react";

// Error message banner
interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="mb-6 flex items-start space-x-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-red-600 font-medium">{message}</p>
    </div>
  );
};

// 