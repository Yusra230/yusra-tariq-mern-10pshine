import { Key } from "lucide-react";

// Page header with icon and title
export const PageHeader: React.FC = () => (
  <div className="text-center mb-8">
    <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
      <Key className="w-10 h-10 text-pink-600" />
    </div>
    <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
      Change Password
    </h1>
    <p className="text-lg text-gray-600">
      Update your password to keep your account secure
    </p>
  </div>
);