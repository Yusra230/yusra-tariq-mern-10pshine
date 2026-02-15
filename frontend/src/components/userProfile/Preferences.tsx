import React from 'react';
import { Settings, Bell, Moon, Lock, Download, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PreferencesProps {
  handleDeleteAccount: () => void;
}

const Preferences: React.FC<PreferencesProps> = ({ handleDeleteAccount }) => {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-pink-100 p-6 sm:p-8">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">Preferences</h2>
      </div>
      <div className="space-y-4">
        
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-pink-600" />
            <div>
              <p className="font-semibold text-gray-800">Notifications</p>
              <p className="text-xs text-gray-600">Email notifications</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
          <div className="flex items-center space-x-3">
            <Moon className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-semibold text-gray-800">Dark Mode</p>
              <p className="text-xs text-gray-600">Toggle theme</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-indigo-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
          <div className="flex items-center space-x-3">
            <Lock className="w-5 h-5 text-rose-600" />
            <div>
              <p className="font-semibold text-gray-800">Privacy</p>
              <p className="text-xs text-gray-600">Private notes</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-rose-500 peer-checked:to-pink-600"></div>
          </label>
        </div>

        <button className="w-full flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-blue-100 transition-all">
          <Download className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold text-gray-800">Export All Notes</span>
        </button>

        <Link to="/change-password" className="w-full flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-blue-100 transition-all cursor-pointer">
          <Lock className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold text-gray-800">Change Password</span>
        </Link>

        <button
          onClick={handleDeleteAccount}
          className="w-full flex items-center justify-center space-x-2 p-4 bg-red-50 rounded-xl border border-red-200 hover:bg-red-100 transition-all group"
        >
          <Trash2 className="w-5 h-5 text-red-600" />
          <span className="font-semibold text-red-600">Delete Account</span>
        </button>
      </div>
    </div>
  );
};

export default Preferences;