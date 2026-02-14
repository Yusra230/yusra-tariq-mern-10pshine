import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
  <div className="flex items-center space-x-2 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
    <p className="text-sm text-red-600 font-medium">{message}</p>
  </div>
);