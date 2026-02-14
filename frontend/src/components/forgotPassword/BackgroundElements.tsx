import React from 'react';
import { Sparkles, Heart, Star, Cloud } from 'lucide-react';

export const BackgroundElements: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    
    <div className="absolute top-1/4 left-1/4 animate-float">
      <Sparkles className="w-8 h-8 text-pink-300 opacity-40" />
    </div>
    <div className="absolute top-1/3 right-1/4 animate-float animation-delay-2000">
      <Heart className="w-6 h-6 text-rose-300 opacity-40" />
    </div>
    <div className="absolute bottom-1/3 left-1/3 animate-float animation-delay-4000">
      <Star className="w-7 h-7 text-purple-300 opacity-40" />
    </div>
    <div className="absolute bottom-1/4 right-1/3 animate-float">
      <Cloud className="w-9 h-9 text-indigo-300 opacity-40" />
    </div>
  </div>
);