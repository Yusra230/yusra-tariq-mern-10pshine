import React from "react";
import { Sparkles, Heart, Star } from "lucide-react";

const HeroContent: React.FC = () => {
  return (
    <div className="text-center lg:text-left space-y-8">
    <div className="inline-flex items-center space-x-2 bg-pink-100 px-4 py-2 rounded-full">
      <Sparkles className="w-4 h-4 text-pink-500" />
      <span className="text-sm font-medium text-pink-700">
        Your Creative Space
      </span>
    </div>

    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
      <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
        Beautiful Notes
      </span>
      <br />
      <span className="text-gray-800">For Your Brightest Ideas</span>
    </h1>

    <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
      Transform your thoughts into beautifully organized notes. Write,
      create, and flourish with NotesBloom – where productivity meets
      elegance.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
      <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
        <span>Start Writing Free</span>
        <Heart className="w-5 h-5" />
      </button>
      <button className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-pink-200 hover:border-pink-300">
        Watch Demo
      </button>
    </div>

    {/* Social Proof */}
    <div className="flex items-center justify-center lg:justify-start space-x-6 pt-4">
      <div className="flex -space-x-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-pink-300 to-purple-400"
          />
        ))}
      </div>
      <div className="text-left">
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
        <p className="text-sm text-gray-600 font-medium">
          Loved by 50k+ users
        </p>
      </div>
    </div>
  </div>
  );
};

export default HeroContent;
