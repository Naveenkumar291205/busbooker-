import React from 'react';
import Icon from '../../../components/AppIcon';

const TripSummary = ({ booking }) => {
  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card px-6 py-6 border-b border-border">
      {/* Booking Reference */}
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground">Booking Reference</p>
        <p className="text-2xl font-bold text-foreground font-mono tracking-wider">
          {booking.id}
        </p>
      </div>

      {/* Passenger Info */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
            <Icon name="User" size={20} />
          </div>
          <div>
            <p className="font-semibold text-foreground">{booking.passenger.name}</p>
            <p className="text-sm text-muted-foreground">{booking.passenger.phone}</p>
          </div>
        </div>
      </div>

      {/* Route Information */}
      <div className="space-y-4">
        {/* From */}
        <div className="flex items-start space-x-4">
          <div className="w-3 h-3 bg-success rounded-full mt-2"></div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{booking.route.from}</p>
            <p className="text-sm text-muted-foreground">{booking.route.fromAddress}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-lg font-bold text-foreground">
                {formatTime(booking.departureTime)}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatDate(booking.date)}
              </span>
            </div>
          </div>
        </div>

        {/* Journey Duration */}
        <div className="flex items-center space-x-4 ml-7">
          <div className="w-px h-8 bg-border"></div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>{booking.duration}</span>
          </div>
        </div>

        {/* To */}
        <div className="flex items-start space-x-4">
          <div className="w-3 h-3 bg-destructive rounded-full mt-2"></div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{booking.route.to}</p>
            <p className="text-sm text-muted-foreground">{booking.route.toAddress}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-lg font-bold text-foreground">
                {formatTime(booking.arrivalTime)}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatDate(booking.date)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Seat and Bus Info */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="w-12 h-12 bg-accent text-accent-foreground rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Armchair" size={24} />
          </div>
          <p className="text-sm text-muted-foreground">Seat Number</p>
          <p className="text-xl font-bold text-foreground">{booking.seatNumber}</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Bus" size={24} />
          </div>
          <p className="text-sm text-muted-foreground">Bus Number</p>
          <p className="text-xl font-bold text-foreground">{booking.busNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;