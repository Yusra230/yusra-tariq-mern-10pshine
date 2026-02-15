// components/Tag.tsx
import React from 'react';
import { X, Tag as TagIcon } from 'lucide-react';

interface TagProps {
  tag: string;
  onRemove: (tag: string) => void;
}

export const Tag: React.FC<TagProps> = ({ tag, onRemove }) => {
  return (
    <span className="group flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-sm font-semibold border border-pink-200">
      <TagIcon className="w-3 h-3" />
      <span>#{tag}</span>
      <button
        onClick={() => onRemove(tag)}
        className="ml-1 hover:text-red-600 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
};