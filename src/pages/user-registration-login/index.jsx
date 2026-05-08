import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TrustSignals from './components/TrustSignals';
import LanguageSelector from './components/LanguageSelector';

const UserRegistrationLogin = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      const redirectTo = location.state?.from || '/user-dashboard-booking-management';
      navigate(redirectTo, { replace: true });
    }
  }, [navigate, location]);

  const handleAuthSuccess = () => {
    const redirectTo = location.state?.from || '/user-dashboard-booking-management';
    navigate(redirectTo, { replace: true });
  };

  const handleLogoClick = () => {
    navigate('/bus-search-route-selection');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
          alt="Bus travel scenic route"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 lg:p-6">
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Bus" size={20} color="white" />
          </div>
          <span className="text-xl font-bold text-foreground font-sans">
            BusBooker
          </span>
        </button>

        {/* Language Selector */}
        <LanguageSelector />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-card border border-border rounded-xl shadow-modal p-6 lg:p-8">
            {/* Welcome Message */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {activeTab === 'login' ? 'Welcome Back!' : 'Join BusBooker'}
              </h1>
              <p className="text-muted-foreground text-sm">
                {activeTab === 'login' ?'Sign in to manage your bookings and travel plans' :'Create your account to start booking bus tickets'
                }
              </p>
            </div>

            {/* Auth Tabs */}
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Auth Forms */}
            <div className="transition-all duration-300">
              {activeTab === 'login' ? (
                <LoginForm onSuccess={handleAuthSuccess} />
              ) : (
                <RegisterForm onSuccess={handleAuthSuccess} />
              )}
            </div>

            {/* Trust Signals */}
            <TrustSignals />
          </div>

          {/* Additional Help */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Need help?{' '}
              <button className="text-primary hover:text-primary/80 underline">
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Mobile-Optimized Bottom Navigation Hint */}
      <div className="fixed bottom-4 left-4 right-4 z-10 sm:hidden">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-modal">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Smartphone" size={12} />
              <span>Mobile Optimized</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Zap" size={12} />
              <span>Quick Booking</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={12} />
              <span>Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationLogin;