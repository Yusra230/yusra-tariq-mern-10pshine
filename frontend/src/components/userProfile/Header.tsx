import React from 'react';
import { ArrowLeft, Edit2, LogOut, Save, X , BookOpen} from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  handleLogout: () => void;
  handleSave: () => void;
  handleCancel: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isEditing,
  setIsEditing,
  handleLogout,
  handleSave,
  handleCancel
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-pink-100 shadow-sm">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={'/dashboard'} className="p-2 rounded-xl hover:bg-pink-100 transition-colors group">
            <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:text-pink-600" />
          </Link>
          
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

        <div className="flex items-center space-x-3">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 bg-white border-2 border-pink-200 rounded-xl font-semibold text-gray-700 hover:border-pink-400 hover:bg-pink-50 transition-all flex items-center space-x-2"
              >
                <Edit2 className="w-4 h-4" />
                <span className="hidden sm:inline">Edit Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="group relative px-5 py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white rounded-xl font-bold shadow-xl shadow-pink-300/50 hover:shadow-2xl hover:shadow-pink-400/60 transition-all duration-500 hover:scale-105 overflow-hidden flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save Changes</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </header>
  );
};

export default Header;