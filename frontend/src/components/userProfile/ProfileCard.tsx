import React from 'react';
import { User, Mail, Calendar, MapPin, Camera, Sparkles } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  bio: string;
  location: string;
  joinDate: string;
  avatar: string;
  coverColor: string;
}

interface ProfileCardProps {
  isEditing: boolean;
  userData: UserData;
  editData: UserData;
  setEditData: (data: UserData) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  isEditing,
  userData,
  editData,
  setEditData
}) => {
  const coverColors = [
    'from-pink-400 via-rose-400 to-purple-500',
    'from-purple-400 via-indigo-400 to-blue-500',
    'from-rose-400 via-pink-400 to-fuchsia-500',
    'from-amber-400 via-orange-400 to-red-500',
    'from-emerald-400 via-teal-400 to-cyan-500',
    'from-blue-400 via-cyan-400 to-teal-500'
  ];

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-pink-100 overflow-hidden mb-8">
      {/* Cover Image */}
      <div className={`h-48 sm:h-64 bg-gradient-to-r ${editData.coverColor} relative`}>
        {isEditing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="text-center p-4">
              <p className="text-white font-semibold mb-4">Choose Cover Color</p>
              <div className="flex flex-wrap gap-3 justify-center max-w-md">
                {coverColors.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setEditData({ ...editData, coverColor: color });
                    }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${color} border-4 ${
                      editData.coverColor === color ? 'border-white scale-110' : 'border-white/50'
                    } hover:scale-110 transition-all shadow-lg hover:shadow-xl cursor-pointer`}
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
            {editData.avatar ? (
              <img 
                src={editData.avatar} 
                alt="Profile" 
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover border-4 border-white shadow-2xl"
              />
            ) : (
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 rounded-3xl flex items-center justify-center border-4 border-white shadow-2xl">
                <User className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
              </div>
            )}
            {isEditing && (
              <>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <label 
                  htmlFor="avatar-upload"
                  className="absolute bottom-2 right-2 p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-110 cursor-pointer"
                >
                  <Camera className="w-5 h-5 text-pink-600" />
                </label>
              </>
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
              <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                <Mail className="w-5 h-5 text-pink-600" />
              </div>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="flex-1 bg-transparent outline-none text-gray-700 font-medium min-w-0"
                />
              ) : (
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 font-semibold">Email</p>
                  <p className="text-gray-700 font-medium truncate">{userData.email}</p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
              <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  className="flex-1 bg-transparent outline-none text-gray-700 font-medium min-w-0"
                />
              ) : (
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 font-semibold">Location</p>
                  <p className="text-gray-700 font-medium truncate">{userData.location}</p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
              <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                <Calendar className="w-5 h-5 text-rose-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 font-semibold">Joined</p>
                <p className="text-gray-700 font-medium truncate">{userData.joinDate}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
              <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                <Sparkles className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 font-semibold">Status</p>
                <p className="text-gray-700 font-medium truncate">Premium Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;