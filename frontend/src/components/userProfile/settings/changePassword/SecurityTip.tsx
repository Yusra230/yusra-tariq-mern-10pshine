import { Shield } from "lucide-react";

// Security tip card (always visible)
export const SecurityTip: React.FC = () => (
  <div className="mb-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-2xl">
    <div className="flex items-start space-x-3">
      <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
      <div>
        <h3 className="font-bold text-gray-800 mb-1">Security Tip</h3>
        <p className="text-sm text-gray-600">
          Use a strong, unique password that you don't use for other accounts. Consider using a password manager.
        </p>
      </div>
    </div>
  </div>
);
