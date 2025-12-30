import React from "react";
import { Sparkles } from "lucide-react";

const HeroPreview: React.FC = () => {
  return (
    <div className="relative">
            <div className="relative z-10">
              {/* Main Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Morning Thoughts
                      </h3>
                      <p className="text-sm text-gray-500">Today at 9:30 AM</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full w-full"></div>
                    <div className="h-3 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full w-5/6"></div>
                    <div className="h-3 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full w-4/6"></div>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-medium">
                      #ideas
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                      #creative
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Card 1 */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl shadow-xl p-4 w-40 transform rotate-6 hover:rotate-12 transition-transform">
                <div className="space-y-2">
                  <div className="h-2 bg-orange-300 rounded-full w-full"></div>
                  <div className="h-2 bg-orange-300 rounded-full w-3/4"></div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl shadow-xl p-4 w-40 transform -rotate-6 hover:-rotate-12 transition-transform">
                <div className="space-y-2">
                  <div className="h-2 bg-teal-300 rounded-full w-full"></div>
                  <div className="h-2 bg-teal-300 rounded-full w-2/3"></div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          </div>
  );
};

export default HeroPreview;
