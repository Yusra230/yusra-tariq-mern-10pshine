import React from 'react';
import { Sparkles, Plus, Grid, List } from 'lucide-react';

interface TopActionsBarProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  notesCount: number;
  onCreateNote: () => void;
}

const TopActionsBar: React.FC<TopActionsBarProps> = ({
  viewMode,
  setViewMode,
  notesCount,
  onCreateNote,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          My Notes
          <Sparkles className="inline-block w-8 h-8 text-pink-500 ml-2" />
        </h1>
        <p className="text-gray-600">
          You have <span className="font-semibold text-pink-600">{notesCount} notes</span> in your collection
        </p>
      </div>

      {/* View Controls */}
      <div className="flex items-center gap-3">
        <div className="flex bg-white border-2 border-pink-100 rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-pink-50'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-pink-50'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>

        {/* Create Note Button */}
        <button
          onClick={onCreateNote}
          className="group relative px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white rounded-xl font-bold shadow-xl shadow-pink-300/50 hover:shadow-2xl hover:shadow-pink-400/60 transition-all duration-500 hover:scale-105 overflow-hidden flex items-center space-x-2 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">New Note</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 "></div>
        </button>
      </div>
    </div>
  );
};

export default TopActionsBar;