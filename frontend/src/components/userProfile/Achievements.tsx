import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import * as Icons from 'lucide-react';

interface Achievement {
  title: string;
  description: string;
  icon: keyof typeof Icons;
  earned: boolean;
}

interface AchievementsProps {
  achievements: readonly Achievement[];
}

const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-pink-100 p-6 sm:p-8">
      <div className="flex items-center space-x-2 mb-6">
        <Award className="w-6 h-6 text-pink-600" />
        <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
      </div>
      <div className="space-y-4">
        {achievements.map((achievement, index) => {
          const Icon = Icons[achievement.icon];
          return (
            <div
              key={index}
              className={`flex items-start space-x-4 p-4 rounded-xl border-2 transition-all ${
                achievement.earned
                  ? 'bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className={`p-3 rounded-xl shadow-sm ${
                achievement.earned
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600'
                  : 'bg-gray-300'
              }`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-gray-800">{achievement.title}</h3>
                  {achievement.earned && (
                    <CheckCircle2 className="w-4 h-4 text-pink-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;