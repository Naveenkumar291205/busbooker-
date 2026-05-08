import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Search',
      path: '/bus-search-route-selection',
      icon: 'Search',
      tooltip: 'Find bus routes'
    },
    {
      label: 'My Trips',
      path: '/user-dashboard-booking-management',
      icon: 'Calendar',
      tooltip: 'Manage your bookings'
    },
    {
      label: 'Operators',
      path: '/bus-operator-profiles-reviews',
      icon: 'Building2',
      tooltip: 'View bus operators'
    },
    {
      label: 'Account',
      path: '/user-registration-login',
      icon: 'User',
      tooltip: 'Account settings'
    }
  ];

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, [location]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
    navigate('/user-registration-login');
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-card">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/bus-search-route-selection')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Bus" size={20} color="white" />
            </div>
            <span className="text-xl font-bold text-foreground font-sans">
              BusBooker
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
              title={item.tooltip}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Menu & Mobile Menu Toggle */}
        <div className="flex items-center space-x-2">
          {/* User Menu */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={handleUserMenuToggle}
                className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-200"
              >
                <Icon name="User" size={16} />
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 top-10 w-48 bg-popover border border-border rounded-lg shadow-modal py-1 z-50">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-sm font-medium text-popover-foreground">Welcome back!</p>
                  </div>
                  <button
                    onClick={() => {
                      handleNavigation('/user-dashboard-booking-management');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-popover-foreground hover:bg-muted flex items-center space-x-2"
                  >
                    <Icon name="Calendar" size={14} />
                    <span>My Bookings</span>
                  </button>
                  <button
                    onClick={() => {
                      handleNavigation('/mobile-ticket-display');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-popover-foreground hover:bg-muted flex items-center space-x-2"
                  >
                    <Icon name="Ticket" size={14} />
                    <span>My Tickets</span>
                  </button>
                  <div className="border-t border-border mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-muted flex items-center space-x-2"
                    >
                      <Icon name="LogOut" size={14} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavigation('/user-registration-login')}
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-all duration-200
                  ${isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;