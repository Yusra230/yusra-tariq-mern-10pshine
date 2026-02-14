import React, { useState } from 'react';
import Header from '../components/userProfile/Header';
import ProfileCard from '../components/userProfile/ProfileCard';
import StatsGrid from '../components/userProfile/StatsGrid';
import Achievements from '../components/userProfile/Achievements';
import Preferences from '../components/userProfile/Preferences';
import AnimatedBackground from '../components/userProfile/AnimatedBackground';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Notes', value: '127', icon: 'BookOpen', color: 'from-pink-500 to-rose-500' },
    { label: 'Favorites', value: '42', icon: 'Heart', color: 'from-rose-500 to-pink-500' },
    { label: 'Tags Used', value: '28', icon: 'Star', color: 'from-purple-500 to-indigo-500' },
    { label: 'Days Active', value: '365', icon: 'TrendingUp', color: 'from-indigo-500 to-purple-500' }
  ] as const;

  const achievements = [
    { title: 'First Note', description: 'Created your first note', icon: 'BookOpen', earned: true },
    { title: 'Dedicated Writer', description: '100+ notes created', icon: 'Award', earned: true },
    { title: 'Organizer', description: 'Used 20+ different tags', icon: 'Star', earned: true },
    { title: 'Consistent', description: '30 day streak', icon: 'TrendingUp', earned: false }
  ] as const;

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
    localStorage.removeItem("token"); // remove token
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 via-purple-50 to-indigo-100">
      <AnimatedBackground />
      
      <Header 
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleLogout={handleLogout}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl relative z-10">
        <ProfileCard 
          isEditing={isEditing}
          userData={userData}
          editData={editData}
          setEditData={setEditData}
        />
        
        <StatsGrid stats={stats} />
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Achievements achievements={achievements} />
          <Preferences 
            handleDeleteAccount={() => {
              if (confirm('⚠️ Are you sure you want to delete your account? This action cannot be undone!')) {
                console.log('Deleting account...');
                alert('Account deletion process initiated...');
              }
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default UserProfile;