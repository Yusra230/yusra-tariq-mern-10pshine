// components/Header.tsx
import React from "react";
import { ArrowLeft, BookOpen, Pin, X, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onCancel: () => void;
  onSave: () => void;
  isPinned: boolean;
  setIsPinned: (pinned: boolean) => void;
  isSaving: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onCancel,
  onSave,
  isPinned,
  setIsPinned,
  isSaving,
}) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (confirm("Are you sure you want to discard changes?")) {
      navigate("/dashboard");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-pink-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCancel}
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

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPinned(!isPinned)}
              className={`p-2.5 rounded-xl transition-all ${
                isPinned
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "hover:bg-pink-100 text-gray-600"
              }`}
            >
              <Pin className="w-5 h-5" />
            </button>

            <button
              onClick={onCancel}
              className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-pink-300 hover:bg-pink-50 transition-all"
            >
              <span className="hidden sm:inline">Cancel</span>
              <X className="sm:hidden w-5 h-5" />
            </button>

            <button
              onClick={onSave}
              disabled={isSaving}
              className="group relative px-6 py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white rounded-xl font-bold shadow-xl shadow-pink-300/50 hover:shadow-2xl hover:shadow-pink-400/60 transition-all duration-500 hover:scale-105 overflow-hidden flex items-center space-x-2 disabled:opacity-70"
            >
              {/* Content (icon + text / loader) */}
              <div className="relative z-20 flex items-center space-x-2">
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span className="hidden sm:inline">Save Note</span>
                  </>
                )}
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
