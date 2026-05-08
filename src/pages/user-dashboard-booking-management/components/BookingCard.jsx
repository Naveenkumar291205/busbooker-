import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingCard = ({ booking, type = 'upcoming' }) => {
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'text-success bg-success/10 border-success/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'cancelled': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'completed': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-foreground">{booking.route}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Booking ID: {booking.bookingId}</p>
        </div>
        <button
          onClick={() => setShowQR(!showQR)}
          className="p-2 hover:bg-muted rounded-md transition-colors duration-200"
          title="Show QR Code"
        >
          <Icon name="QrCode" size={20} className="text-muted-foreground" />
        </button>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="mb-4 p-4 bg-muted rounded-lg text-center">
          <div className="w-32 h-32 bg-white border-2 border-border rounded-lg mx-auto mb-2 flex items-center justify-center">
            <Icon name="QrCode" size={48} className="text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">Scan for mobile ticket</p>
        </div>
      )}

      {/* Journey Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Calendar" size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="text-sm font-medium text-foreground">{formatDate(booking.date)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="Clock" size={16} className="text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Departure</p>
            <p className="text-sm font-medium text-foreground">{formatTime(booking.departureTime)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="Armchair" size={16} className="text-success" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Seats</p>
            <p className="text-sm font-medium text-foreground">{booking.seats.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Route Information */}
      <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">{booking.from}</p>
          <p className="text-xs text-muted-foreground">{formatTime(booking.departureTime)}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <div className="w-8 h-0.5 bg-border"></div>
          <Icon name="Bus" size={16} className="text-primary" />
          <div className="w-8 h-0.5 bg-border"></div>
          <div className="w-2 h-2 bg-success rounded-full"></div>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">{booking.to}</p>
          <p className="text-xs text-muted-foreground">{formatTime(booking.arrivalTime)}</p>
        </div>
      </div>

      {/* Operator and Price */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Building2" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{booking.operator}</span>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-foreground">${booking.totalPrice}</p>
          <p className="text-xs text-muted-foreground">{booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {type === 'upcoming' && booking.status === 'Confirmed' && (
          <>
            <Button
              variant="default"
              size="sm"
              iconName="Ticket"
              iconPosition="left"
              onClick={() => navigate('/mobile-ticket-display')}
            >
              View Ticket
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              iconPosition="left"
              onClick={() => navigate('/interactive-seat-selection')}
            >
              Modify
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="X"
              iconPosition="left"
            >
              Cancel
            </Button>
          </>
        )}
        
        {type === 'past' && (
          <>
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={() => navigate('/bus-search-route-selection')}
            >
              Book Again
            </Button>
            {!booking.rated && (
              <Button
                variant="secondary"
                size="sm"
                iconName="Star"
                iconPosition="left"
              >
                Rate Trip
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingCard;