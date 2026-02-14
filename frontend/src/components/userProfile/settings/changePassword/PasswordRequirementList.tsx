import { Check, X } from "lucide-react";
import { PASSWORD_REQUIREMENTS } from "../../../../utils/password";

// List of password requirements with check/x icons
interface PasswordRequirementListProps {
  password: string;
}

export const PasswordRequirementList: React.FC<PasswordRequirementListProps> = ({ password }) => (
  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 border-2 border-pink-100">
    <p className="text-sm font-semibold text-gray-700 mb-3">Password Requirements</p>
    <div className="space-y-2">
      {PASSWORD_REQUIREMENTS.map((req, index) => {
        const met = req.test(password);
        return (
          <div key={index} className="flex items-center space-x-2">
            {met ? (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
            ) : (
              <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <X className="w-3 h-3 text-white" />
              </div>
            )}
            <span className={`text-sm ${met ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
              {req.label}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);
