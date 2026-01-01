import React from 'react';
import { BookOpen } from 'lucide-react';

interface EmptyStateProps {
  onCreateNote: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateNote }) => {
  return (
    <div className="text-center py-20">
      <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mx-auto mb-6 flex items-center justify-center">
        <BookOpen className="w-12 h-12 text-pink-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">No notes yet</h3>
      <p className="text-gray-600 mb-6">Start your creative journey by creating your first note!</p>
      <button
        onClick={onCreateNote}
        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
      >
        Create Your First Note
      </button>
    </div>
  );
};

export default EmptyState;