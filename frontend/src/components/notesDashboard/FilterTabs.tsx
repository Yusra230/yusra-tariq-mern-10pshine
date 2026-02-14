import React from 'react';

interface FilterTabsProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, setActiveFilter }) => {
  const filters = ['all', 'pinned'];

  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
            activeFilter === filter
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-600 hover:bg-pink-50 border-2 border-pink-100'
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;