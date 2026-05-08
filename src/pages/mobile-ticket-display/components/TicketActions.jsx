import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TicketActions = ({ booking, onBackToDashboard }) => {
  const [brightness, setBrightness] = useState(100);
  const [batterySaver, setBatterySaver] = useState(false);

  const handleShareTicket = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Bus Ticket',
        text: `My bus ticket for ${booking.route.from} to ${booking.route.to}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const ticketInfo = `Bus Ticket\nBooking: ${booking.id}\nRoute: ${booking.route.from} to ${booking.route.to}\nSeat: ${booking.seatNumber}\nDate: ${booking.date}`;
      navigator.clipboard.writeText(ticketInfo);
      alert('Ticket details copied to clipboard!');
    }
  };

  const handleDownloadTicket = () => {
    // Simulate ticket download
    const ticketData = {
      bookingId: booking.id,
      passenger: booking.passenger.name,
      route: `${booking.route.from} to ${booking.route.to}`,
      seat: booking.seatNumber,
      date: booking.date,
      time: booking.departureTime
    };
    
    const dataStr = JSON.stringify(ticketData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ticket-${booking.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const toggleBatterySaver = () => {
    setBatterySaver(!batterySaver);
    if (!batterySaver) {
      setBrightness(50);
    } else {
      setBrightness(100);
    }
  };

  return (
    <div className="bg-card border-t border-border px-6 py-6 space-y-6">
      {/* Screen Controls */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Screen Controls</h3>
        
        {/* Brightness Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Sun" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Brightness</span>
            </div>
            <span className="text-sm text-muted-foreground">{brightness}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Battery Saver Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Battery" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Battery Saver</span>
          </div>
          <button
            onClick={toggleBatterySaver}
            className={`w-12 h-6 rounded-full transition-colors duration-200 ${
              batterySaver ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                batterySaver ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareTicket}
            iconName="Share2"
            iconPosition="left"
            className="justify-center"
          >
            Share
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadTicket}
            iconName="Download"
            iconPosition="left"
            className="justify-center"
          >
            Download
          </Button>
        </div>
      </div>

      {/* Support Actions */}
      <div className="space-y-3">
        <Button
          variant="outline"
          fullWidth
          iconName="MessageCircle"
          iconPosition="left"
          onClick={() => window.open('tel:+1-800-BUS-HELP', '_self')}
        >
          Contact Support
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          iconName="AlertTriangle"
          iconPosition="left"
          onClick={() => window.open('tel:+1-800-EMERGENCY', '_self')}
        >
          Report Emergency
        </Button>
      </div>

      {/* Navigation */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="default"
          fullWidth
          onClick={onBackToDashboard}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default TicketActions;