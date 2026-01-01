import React, { useState } from 'react';
import { 
  User, Mail, Calendar, MapPin, Edit2, Save, X, Camera, 
  BookOpen, Heart, Star, Sparkles, LogOut, Shield, Bell,
  Palette, Moon, Sun, Globe, Lock, Trash2, Download,
  Award, TrendingUp, CheckCircle2, ArrowLeft, Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserData {
  name: string;
  email: string;
  bio: string;
  location: string;
  joinDate: string;
  avatar: string;
  coverColor: string;
}

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@notesbloom.com',
    bio: 'Creative writer & productivity enthusiast 💫 | Capturing thoughts and turning them into beautiful notes | Coffee addict ☕',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    avatar: '',
    coverColor: 'from-pink-400 via-rose-400 to-purple-500'
  });

  const [editData, setEditData] = useState(userData);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const stats = [
    { label: 'Total Notes', value: '127', icon: BookOpen, color: 'from-pink-500 to-rose-500' },
    { label: 'Favorites', value: '42', icon: Heart, color: 'from-rose-500 to-pink-500' },
    { label: 'Tags Used', value: '28', icon: Star, color: 'from-purple-500 to-indigo-500' },
    { label: 'Days Active', value: '365', icon: TrendingUp, color: 'from-indigo-500 to-purple-500' }
  ];

  const achievements = [
    { title: 'First Note', description: 'Created your first note', icon: BookOpen, earned: true },
    { title: 'Dedicated Writer', description: '100+ notes created', icon: Award, earned: true },
    { title: 'Organizer', description: 'Used 20+ different tags', icon: Star, earned: true },
    { title: 'Consistent', description: '30 day streak', icon: TrendingUp, earned: false }
  ];

  const coverColors = [
    'from-pink-400 via-rose-400 to-purple-500',
    'from-purple-400 via-indigo-400 to-blue-500',
    'from-rose-400 via-pink-400 to-fuchsia-500',
    'from-amber-400 via-orange-400 to-red-500',
    'from-emerald-400 via-teal-400 to-cyan-500',
    'from-blue-400 via-cyan-400 to-teal-500'
  ];

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
    alert('Profile updated successfully! ✨');
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      console.log('Logging out...');
      alert('Logging out... See you soon! 💫');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('⚠️ Are you sure you want to delete your account? This action cannot be undone!')) {
      console.log('Deleting account...');
      alert('Account deletion process initiated...');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 via-purple-50 to-indigo-100">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl relative z-10">
        
        {/* Profile Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-pink-100 overflow-hidden mb-8">
          
          {/* Cover Image */}
          <div className={`h-48 sm:h-64 bg-gradient-to-r ${editData.coverColor} relative`}>
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white font-semibold mb-4">Choose Cover Color</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {coverColors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setEditData({ ...editData, coverColor: color })}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} border-4 ${
                          editData.coverColor === color ? 'border-white scale-110' : 'border-transparent'
                        } hover:scale-110 transition-all`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-24 h-24 text-white/30" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 sm:px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-20 mb-6">
              <div className="relative inline-block">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 rounded-3xl flex items-center justify-center border-4 border-white shadow-2xl">
                  <User className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-2 right-2 p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-110">
                    <Camera className="w-5 h-5 text-pink-600" />
                  </button>
                )}
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="text-3xl sm:text-4xl font-bold text-gray-800 outline-none border-2 border-pink-200 rounded-xl px-4 py-2 w-full focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                  />
                ) : (
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">{userData.name}</h1>
                )}
              </div>

              {/* Bio */}
              <div>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    rows={3}
                    className="w-full text-gray-600 leading-relaxed outline-none border-2 border-pink-200 rounded-xl px-4 py-3 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 resize-none"
                  />
                ) : (
                  <p className="text-gray-600 text-lg leading-relaxed">{userData.bio}</p>
                )}
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Mail className="w-5 h-5 text-pink-600" />
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="flex-1 bg-transparent outline-none text-gray-700 font-medium"
                    />
                  ) : (
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Email</p>
                      <p className="text-gray-700 font-medium">{userData.email}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      className="flex-1 bg-transparent outline-none text-gray-700 font-medium"
                    />
                  ) : (
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Location</p>
                      <p className="text-gray-700 font-medium">{userData.location}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Calendar className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Joined</p>
                    <p className="text-gray-700 font-medium">{userData.joinDate}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Status</p>
                    <p className="text-gray-700 font-medium">Premium Member</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-pink-100 p-6 hover:shadow-xl hover:shadow-pink-200/50 transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Achievements */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-pink-100 p-6 sm:p-8">
            <div className="flex items-center space-x-2 mb-6">
              <Award className="w-6 h-6 text-pink-600" />
              <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
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
                    <achievement.icon className="w-5 h-5 text-white" />
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
              ))}
            </div>
          </div>

          {/* Settings & Preferences */}
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

              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center justify-center space-x-2 p-4 bg-red-50 rounded-xl border border-red-200 hover:bg-red-100 transition-all group"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-600">Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;