import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedRouteCard = ({ route }) => {
  const [priceAlert, setPriceAlert] = useState(route.priceAlert || false);
  const navigate = useNavigate();

  const handlePriceAlertToggle = () => {
    setPriceAlert(!priceAlert);
    // In a real app, this would make an API call to update the preference
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{route.name}</h3>
          <p className="text-sm text-muted-foreground">{route.from} → {route.to}</p>
        </div>
        <button
          className="p-1 hover:bg-muted rounded-md transition-colors duration-200"
          title="Remove from saved"
        >
          <Icon name="Heart" size={18} className="text-destructive fill-current" />
        </button>
      </div>

      {/* Route Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={14} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{route.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={14} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{route.distance}</span>
        </div>
      </div>

      {/* Price Information */}
      <div className="bg-muted/50 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Current Price Range</span>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingDown" size={14} className="text-success" />
            <span className="text-xs text-success">-5%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(route.minPrice)} - {formatPrice(route.maxPrice)}
          </span>
          <span className="text-xs text-muted-foreground">per seat</span>
        </div>
      </div>

      {/* Price Alert Toggle */}
      <div className="flex items-center justify-between mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={16} className="text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Price Alerts</p>
            <p className="text-xs text-muted-foreground">Get notified of price drops</p>
          </div>
        </div>
        <button
          onClick={handlePriceAlertToggle}
          className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${
            priceAlert ? 'bg-primary' : 'bg-border'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 absolute top-0.5 ${
              priceAlert ? 'translate-x-6' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      {/* Popular Operators */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">Popular Operators</p>
        <div className="flex flex-wrap gap-1">
          {route.operators.slice(0, 3).map((operator, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-xs text-foreground rounded-full"
            >
              {operator}
            </span>
          ))}
          {route.operators.length > 3 && (
            <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-full">
              +{route.operators.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="default"
          size="sm"
          iconName="Search"
          iconPosition="left"
          onClick={() => navigate('/bus-search-route-selection')}
          fullWidth
        >
          Search Buses
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Calendar"
          iconPosition="left"
        >
          Schedule
        </Button>
      </div>
    </div>
  );
};

export default SavedRouteCard;