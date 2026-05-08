import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserContextMenu = ({ isAuthenticated = false, userName = 'User' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: 'My Dashboard',
      path: '/user-dashboard-booking-management',
      icon: 'LayoutDashboard',
      description: 'View bookings and account'
    },
    {
      label: 'My Tickets',
      path: '/mobile-ticket-display',
      icon: 'Ticket',
      description: 'Active and past tickets'
    },
    {
      label: 'Seat Selection',
      path: '/interactive-seat-selection',
      icon: 'Armchair',
      description: 'Current seat selection'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsOpen(false);
    navigate('/user-registration-login');
    window.location.reload();
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isAuthenticated) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate('/user-registration-login')}
        iconName="LogIn"
        iconPosition="left"
      >
        Sign In
      </Button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={handleMenuToggle}
        className="w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="User menu"
      >
        <span className="text-sm font-medium">
          {getInitials(userName)}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-64 bg-popover border border-border rounded-lg shadow-modal py-2 z-50 animate-fade-in">
          {/* User Greeting */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-popover-foreground">
              Welcome back!
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {userName}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="w-full text-left px-4 py-3 hover:bg-muted transition-colors duration-150 group"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors">
                    <Icon name={item.icon} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-popover-foreground group-hover:text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border my-1" />

          {/* Account Actions */}
          <div className="py-1">
            <button
              onClick={() => {
                handleNavigation('/user-registration-login');
              }}
              className="w-full text-left px-4 py-2 hover:bg-muted transition-colors duration-150 flex items-center space-x-3"
            >
              <Icon name="Settings" size={16} className="text-muted-foreground" />
              <span className="text-sm text-popover-foreground">Account Settings</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-muted transition-colors duration-150 flex items-center space-x-3 text-destructive"
            >
              <Icon name="LogOut" size={16} />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContextMenu;