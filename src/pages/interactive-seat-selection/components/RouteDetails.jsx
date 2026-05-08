import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RouteDetails = ({ routeInfo, busInfo }) => {
  const formatTime = (timeString) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const amenities = busInfo.amenities || [];

  return (
    <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
      {/* Route Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-lg font-semibold text-foreground">
              {routeInfo.from} → {routeInfo.to}
            </h2>
            <div className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
              {routeInfo.date}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>{formatTime(routeInfo.departureTime)} - {formatTime(routeInfo.arrivalTime)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Timer" size={16} />
              <span>{formatDuration(routeInfo.duration)}</span>
            </div>
          </div>
        </div>

        {/* Bus Operator Logo */}
        <div className="flex items-center space-x-3">
          <Image
            src={busInfo.operatorLogo}
            alt={busInfo.operatorName}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="text-right">
            <p className="font-medium text-foreground">{busInfo.operatorName}</p>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-sm text-muted-foreground">
                {busInfo.rating} ({busInfo.reviewCount})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bus Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Bus Info */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-3">Bus Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bus Number:</span>
                <span className="font-medium">{busInfo.busNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bus Type:</span>
                <span className="font-medium">{busInfo.busType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Seats:</span>
                <span className="font-medium">{busInfo.totalSeats}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Available:</span>
                <span className="font-medium text-success">{busInfo.availableSeats}</span>
              </div>
            </div>
          </div>

          {/* Boarding Points */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Boarding Point</h4>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{routeInfo.boardingPoint.name}</p>
                  <p className="text-xs text-muted-foreground">{routeInfo.boardingPoint.address}</p>
                  <p className="text-xs text-primary font-medium mt-1">
                    Departure: {formatTime(routeInfo.departureTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Amenities & Policies */}
        <div className="space-y-4">
          {/* Amenities */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Bus Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg"
                >
                  <Icon name={amenity.icon} size={16} className="text-primary" />
                  <span className="text-sm">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Policies</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={12} />
                <span>Free cancellation up to 2 hours before departure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Luggage" size={12} />
                <span>1 check-in bag (20kg) + 1 carry-on bag included</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={12} />
                <span>Travel insurance available at checkout</span>
              </div>
            </div>
          </div>

          {/* Dropping Point */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Dropping Point</h4>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="MapPin" size={16} className="text-destructive mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{routeInfo.droppingPoint.name}</p>
                  <p className="text-xs text-muted-foreground">{routeInfo.droppingPoint.address}</p>
                  <p className="text-xs text-destructive font-medium mt-1">
                    Arrival: {formatTime(routeInfo.arrivalTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetails;