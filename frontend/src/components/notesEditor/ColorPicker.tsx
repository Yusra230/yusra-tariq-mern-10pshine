// components/ColorPicker.tsx
import React from 'react';

interface ColorPickerProps {
  colors: string[];
  onSelect: (color: string) => void;
  title?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ colors, onSelect, title }) => {
  return (
    <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-pink-200 p-3 z-50">
      {title && <div className="text-xs text-gray-500 mb-2">{title}</div>}
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onSelect(color)}
            className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-pink-400 transition-all hover:scale-110"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};