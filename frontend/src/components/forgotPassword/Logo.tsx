import React from 'react';
import { BookOpen } from 'lucide-react';

export const Logo: React.FC = () => (
  <div className="flex items-center justify-center space-x-3 mb-8">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl blur opacity-75"></div>
      <div className="relative w-14 h-14 bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
        <BookOpen className="w-7 h-7 text-white" />
      </div>
    </div>
    <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
      NotesBloom
    </span>
  </div>
);