import { ArrowLeft, BookOpen, Shield } from "lucide-react";

// Header with back button and logo
interface HeaderProps {
  onBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBack }) => (
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-pink-100 shadow-sm">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-pink-100 transition-colors group"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:text-pink-600" />
          </button>
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl blur opacity-75"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
              NotesBloom
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-pink-500" />
          <span className="hidden sm:inline text-sm font-semibold text-gray-600">Secure Settings</span>
        </div>
      </div>
    </div>
  </header>
);
