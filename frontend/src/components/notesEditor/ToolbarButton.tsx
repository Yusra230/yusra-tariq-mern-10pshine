// components/ToolbarButton.tsx
import React from 'react';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  title: string;
  isActive?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  icon, 
  onClick, 
  title, 
  isActive 
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all hover:scale-110 ${
        isActive
          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
          : 'hover:bg-white text-gray-700 hover:shadow-md'
      }`}
    >
      {icon}
    </button>
  );
};