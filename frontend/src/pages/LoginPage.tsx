// LoginPage.tsx
import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import {SocialButtons} from '../components/auth/SocialButtons';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Continue your creative journey"
    >
      <SocialButtons />
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;