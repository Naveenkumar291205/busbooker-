import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BusCard = ({ bus }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSelectSeats = () => {
    // Store bus selection data for seat selection page
    localStorage.setItem('selectedBus', JSON.stringify(bus));
    navigate('/interactive-seat-selection');
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      'wifi': 'Wifi',
      'power-outlets': 'Zap',
      'restroom': 'Home',
      'air-conditioning': 'Wind',
      'reclining-seats': 'Armchair',
      'entertainment': 'Monitor'
    };
    return iconMap[amenity] || 'Star';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Main Card Content */}
      <div className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Operator Info */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src={bus.operator.logo}
                alt={bus.operator.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{bus.operator.name}</h3>
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < Math.floor(bus.operator.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {bus.operator.rating} ({bus.operator.reviews} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Journey Details */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            {/* Departure */}
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{bus.departure.time}</div>
              <div className="text-sm text-muted-foreground">{bus.departure.city}</div>
              <div className="text-xs text-muted-foreground">{bus.departure.terminal}</div>
            </div>

            {/* Journey Info */}
            <div className="flex flex-col items-center space-y-1">
              <div className="text-xs text-muted-foreground">{formatDuration(bus.duration)}</div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-16 h-0.5 bg-border"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <div className="text-xs text-muted-foreground">
                {bus.stops > 0 ? `${bus.stops} stops` : 'Direct'}
              </div>
            </div>

            {/* Arrival */}
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{bus.arrival.time}</div>
              <div className="text-sm text-muted-foreground">{bus.arrival.city}</div>
              <div className="text-xs text-muted-foreground">{bus.arrival.terminal}</div>
            </div>
          </div>

          {/* Price & Booking */}
          <div className="flex items-center justify-between lg:flex-col lg:items-end lg:space-y-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">${bus.price}</div>
              <div className="text-xs text-muted-foreground">per person</div>
              <div className="text-xs text-success">
                {bus.availableSeats} seats left
              </div>
            </div>
            <Button
              variant="default"
              onClick={handleSelectSeats}
              iconName="ArrowRight"
              iconPosition="right"
              className="lg:w-32"
            >
              Select Seats
            </Button>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-4">
            {bus.amenities.slice(0, 4).map((amenity) => (
              <div key={amenity} className="flex items-center space-x-1">
                <Icon name={getAmenityIcon(amenity)} size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground capitalize">
                  {amenity.replace('-', ' ')}
                </span>
              </div>
            ))}
            {bus.amenities.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{bus.amenities.length - 4} more
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Less Info' : 'More Info'}
          </Button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border p-4 bg-muted/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Route Stops */}
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center">
                <Icon name="MapPin" size={16} className="mr-2" />
                Route Stops
              </h4>
              <div className="space-y-2">
                {bus.routeStops.map((stop, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                      <span className="text-foreground">{stop.city}</span>
                    </div>
                    <span className="text-muted-foreground">{stop.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center">
                <Icon name="FileText" size={16} className="mr-2" />
                Policies
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Icon name="RotateCcw" size={14} className="text-muted-foreground mt-0.5" />
                  <div>
                    <span className="text-foreground font-medium">Cancellation: </span>
                    <span className="text-muted-foreground">{bus.policies.cancellation}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Luggage" size={14} className="text-muted-foreground mt-0.5" />
                  <div>
                    <span className="text-foreground font-medium">Baggage: </span>
                    <span className="text-muted-foreground">{bus.policies.baggage}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Clock" size={14} className="text-muted-foreground mt-0.5" />
                  <div>
                    <span className="text-foreground font-medium">Boarding: </span>
                    <span className="text-muted-foreground">{bus.policies.boarding}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusCard;