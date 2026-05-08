import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const QRCodeSection = ({ booking, isOffline = false }) => {
  const [qrCode, setQrCode] = useState('');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    // Generate dynamic QR code data
    const generateQRCode = () => {
      const qrData = {
        bookingId: booking.id,
        passengerName: booking.passenger.name,
        seatNumber: booking.seatNumber,
        timestamp: Date.now(),
        route: `${booking.route.from}-${booking.route.to}`,
        date: booking.date
      };
      
      // Simulate QR code generation (in real app, this would be actual QR code)
      const qrString = btoa(JSON.stringify(qrData));
      setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrString)}`);
      setLastRefresh(new Date());
    };

    generateQRCode();
    
    // Refresh QR code every 5 minutes for security
    const interval = setInterval(generateQRCode, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [booking]);

  const handleRefreshQR = () => {
    const qrData = {
      bookingId: booking.id,
      passengerName: booking.passenger.name,
      seatNumber: booking.seatNumber,
      timestamp: Date.now(),
      route: `${booking.route.from}-${booking.route.to}`,
      date: booking.date
    };
    
    const qrString = btoa(JSON.stringify(qrData));
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrString)}`);
    setLastRefresh(new Date());
  };

  return (
    <div className="bg-card px-6 py-8">
      <div className="text-center">
        {/* QR Code */}
        <div className="relative inline-block">
          <div className="w-48 h-48 mx-auto bg-white p-4 rounded-2xl shadow-card border border-border">
            {qrCode ? (
              <img
                src={qrCode}
                alt="Ticket QR Code"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
                <Icon name="QrCode" size={48} className="text-muted-foreground" />
              </div>
            )}
          </div>
          
          {/* Offline Indicator */}
          {isOffline && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-warning text-warning-foreground rounded-full flex items-center justify-center">
              <Icon name="WifiOff" size={14} />
            </div>
          )}
        </div>

        {/* QR Code Instructions */}
        <div className="mt-6 space-y-2">
          <p className="text-lg font-semibold text-foreground">Show this QR code to the conductor</p>
          <p className="text-sm text-muted-foreground">
            Keep your screen brightness high for better scanning
          </p>
          
          {/* Refresh Button */}
          <button
            onClick={handleRefreshQR}
            className="inline-flex items-center space-x-2 text-xs text-primary hover:text-primary/80 transition-colors duration-200 mt-3"
          >
            <Icon name="RotateCcw" size={14} />
            <span>Refresh QR Code</span>
          </button>
          
          <p className="text-xs text-muted-foreground">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>

        {/* Security Watermark */}
        <div className="mt-4 opacity-30">
          <div className="text-xs text-muted-foreground font-mono">
            SECURE • {booking.id.slice(-8).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeSection;