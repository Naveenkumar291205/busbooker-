import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OperatorSidebar = ({ operator }) => {
  const navigate = useNavigate();

  const handleSearchRoutes = () => {
    navigate('/bus-search-route-selection', {
      state: { selectedOperator: operator.name }
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        
        <div className="space-y-3">
          <Button
            fullWidth
            iconName="Search"
            iconPosition="left"
            onClick={handleSearchRoutes}
          >
            Search Routes
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            iconName="Heart"
            iconPosition="left"
          >
            Add to Favorites
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            iconName="Share2"
            iconPosition="left"
          >
            Share Profile
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Performance</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} className="text-success" />
              <span className="text-sm text-foreground">On-time</span>
            </div>
            <span className="text-sm font-semibold text-success">{operator.onTimePerformance}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm text-foreground">Satisfaction</span>
            </div>
            <span className="text-sm font-semibold text-primary">{operator.satisfactionRate}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={16} className="text-warning" />
              <span className="text-sm text-foreground">Safety Score</span>
            </div>
            <span className="text-sm font-semibold text-warning">{operator.safetyScore}/10</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        
        <div className="space-y-3">
          {operator.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Quick Links */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Need Help?</h3>
        
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted rounded-lg transition-colors">
            <Icon name="Phone" size={16} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Call Support</div>
              <div className="text-xs text-muted-foreground">{operator.contact.phone}</div>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted rounded-lg transition-colors">
            <Icon name="MessageCircle" size={16} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Live Chat</div>
              <div className="text-xs text-muted-foreground">Available 24/7</div>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted rounded-lg transition-colors">
            <Icon name="Mail" size={16} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Email Us</div>
              <div className="text-xs text-muted-foreground">Response in 24h</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperatorSidebar;