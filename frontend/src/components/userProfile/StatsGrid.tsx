import React from 'react';
import * as Icons from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  icon: keyof typeof Icons;
  color: string;
}

interface StatsGridProps {
  stats: readonly StatItem[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = Icons[stat.icon];
        return (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-pink-100 p-6 hover:shadow-xl hover:shadow-pink-200/50 transition-all hover:-translate-y-1 cursor-pointer"
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;