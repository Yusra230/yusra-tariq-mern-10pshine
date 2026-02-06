import { BookOpen, CheckCircle2, Cloud, Heart, Sparkles, Star } from "lucide-react";

// AuthLayout.tsx
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 via-purple-50 to-indigo-100 relative overflow-x-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements (same as your current code) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

          {/* Floating Icons */}
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
      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Branding Side (shared between login/signup) */}
        <div className="hidden lg:flex flex-col space-y-8 pr-12">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  NotesBloom
                </span>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                  {title}
                </span>
                <span className="block text-gray-800 mt-2">
                {subtitle}
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Step back into your creative sanctuary where every thought blooms
                into beautiful notes.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {[
                {
                  icon: CheckCircle2,
                  text: "Unlimited beautiful notes",
                  color: "from-pink-500 to-rose-500",
                },
                {
                  icon: CheckCircle2,
                  text: "Sync across all devices",
                  color: "from-purple-500 to-indigo-500",
                },
                {
                  icon: CheckCircle2,
                  text: "Premium templates & themes",
                  color: "from-rose-500 to-pink-500",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 group cursor-pointer"
                >
                  <div
                    className={`w-6 h-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Decorative Quote */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-pink-200 shadow-lg">
              <p className="text-gray-700 italic mb-2">
                "NotesBloom transformed how I organize my thoughts. It's like
                having a beautiful garden for my ideas!"
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Sarah Mitchell
                  </p>
                  <p className="text-xs text-gray-500">Creative Writer</p>
                </div>
              </div>
            </div>
          </div>
        {/* Right Form Side */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-pink-100 p-8 sm:p-10 hover:shadow-pink-300/50 transition-all duration-500">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;