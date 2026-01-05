import React from 'react';
import { Bell, Settings, Heart, User } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="sm:hidden mt-4 bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-pink-100 shadow-xl p-6 animate-slideDown">
      <div className="space-y-4">
        {/* User Profile */}
        <div className="flex items-center space-x-3 pb-4 border-b-2 border-pink-100">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-800">Sarah Mitchell</p>
            <p className="text-sm text-gray-500">sarah@notesbloom.com</p>
          </div>
        </div>

        {/* Menu Items */}
        <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-pink-50 transition-colors text-left">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Notifications</span>
          </div>
          <span className="w-6 h-6 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
        </button>

        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left">
          <Settings className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-700">Settings</span>
        </button>

        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-rose-50 transition-colors text-left">
          <Heart className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-700">Favorites</span>
        </button>

        <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
          Logout
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;