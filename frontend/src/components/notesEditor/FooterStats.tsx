// components/FooterStats.tsx
import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const FooterStats: React.FC = () => {
  return (
    <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600">
      <div className="flex items-center space-x-2">
        <Heart className="w-4 h-4 text-pink-500" />
        <span>Made with love</span>
      </div>
      <div className="flex items-center space-x-2">
        <Sparkles className="w-4 h-4 text-purple-500" />
        <span>NotesBloom Editor</span>
      </div>
    </div>
  );
};