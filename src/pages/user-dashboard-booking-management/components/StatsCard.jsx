import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, icon, color = 'primary', trend = null }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    accent: 'bg-accent/10 text-accent border-accent/20'
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <Icon 
                name={trend.direction === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
                className={trend.direction === 'up' ? 'text-success' : 'text-destructive'} 
              />
              <span className={`text-xs ml-1 ${trend.direction === 'up' ? 'text-success' : 'text-destructive'}`}>
                {trend.value}
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;