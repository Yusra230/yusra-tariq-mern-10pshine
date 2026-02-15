import React from 'react';
import { Shield } from 'lucide-react';

export const TrustBadge: React.FC = () => (
  <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
    <Shield className="w-4 h-4 text-pink-500" />
    <span className="font-medium">Secure password recovery</span>
  </div>
);