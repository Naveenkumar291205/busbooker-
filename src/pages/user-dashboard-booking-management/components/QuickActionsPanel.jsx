import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ walletBalance = 0 }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Search Buses',
      description: 'Find and book your next trip',
      icon: 'Search',
      color: 'primary',
      action: () => navigate('/bus-search-route-selection')
    },
    {
      title: 'View Tickets',
      description: 'Access your mobile tickets',
      icon: 'Ticket',
      color: 'success',
      action: () => navigate('/mobile-ticket-display')
    },
    {
      title: 'Operator Reviews',
      description: 'Check bus operator ratings',
      icon: 'Star',
      color: 'warning',
      action: () => navigate('/bus-operator-profiles-reviews')
    },
    {
      title: 'Support Center',
      description: 'Get help with your bookings',
      icon: 'HelpCircle',
      color: 'accent',
      action: () => {}
    }
  ];

  const formatBalance = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="space-y-4">
      {/* Wallet Balance */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon name="Wallet" size={20} />
            <span className="font-medium">Wallet Balance</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            className="text-primary-foreground hover:bg-white/20"
          >
            Add Money
          </Button>
        </div>
        <p className="text-2xl font-bold">{formatBalance(walletBalance)}</p>
        <p className="text-sm opacity-90 mt-1">Available for bookings</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={18} className="mr-2 text-primary" />
          Quick Actions
        </h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="w-full flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-colors duration-200 text-left"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${action.color}/10`}>
                <Icon name={action.icon} size={18} className={`text-${action.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{action.title}</p>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Activity" size={18} className="mr-2 text-primary" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-2">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={14} className="text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Booking Confirmed</p>
              <p className="text-xs text-muted-foreground">New York → Boston • 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="CreditCard" size={14} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Payment Processed</p>
              <p className="text-xs text-muted-foreground">$45.00 • Yesterday</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2">
            <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="Bell" size={14} className="text-warning" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Price Alert</p>
              <p className="text-xs text-muted-foreground">Boston → NYC route • 3 days ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Contact */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="text-center">
          <Icon name="MessageCircle" size={24} className="text-primary mx-auto mb-2" />
          <h4 className="font-medium text-foreground mb-1">Need Help?</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Our support team is available 24/7
          </p>
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            fullWidth
          >
            Start Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;