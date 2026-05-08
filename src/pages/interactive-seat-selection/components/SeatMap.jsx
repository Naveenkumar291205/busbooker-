import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SeatMap = ({ 
  busLayout, 
  selectedSeats, 
  onSeatSelect, 
  occupiedSeats = [], 
  unavailableSeats = [],
  seatPricing = {} 
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showZoomControls, setShowZoomControls] = useState(false);

  useEffect(() => {
    // Show zoom controls on desktop
    const checkScreenSize = () => {
      setShowZoomControls(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getSeatStatus = (seatId) => {
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (unavailableSeats.includes(seatId)) return 'unavailable';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const getSeatColor = (status, seatType = 'regular') => {
    const colors = {
      available: seatType === 'premium' ? 'bg-accent/20 border-accent hover:bg-accent/30' : 
                 seatType === 'sleeper'? 'bg-primary/20 border-primary hover:bg-primary/30' : 'bg-success/20 border-success hover:bg-success/30',
      occupied: 'bg-destructive/80 border-destructive cursor-not-allowed',
      selected: 'bg-primary border-primary text-primary-foreground',
      unavailable: 'bg-muted border-muted cursor-not-allowed opacity-50'
    };
    return colors[status] || colors.available;
  };

  const handleSeatClick = (seatId, seatType) => {
    const status = getSeatStatus(seatId);
    if (status === 'occupied' || status === 'unavailable') return;
    
    onSeatSelect(seatId, seatType);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
  };

  const renderSeat = (seat, rowIndex, seatIndex) => {
    const status = getSeatStatus(seat.id);
    const isClickable = status === 'available' || status === 'selected';
    
    return (
      <button
        key={seat.id}
        onClick={() => handleSeatClick(seat.id, seat.type)}
        disabled={!isClickable}
        className={`
          w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 transition-all duration-200 
          flex items-center justify-center text-xs font-medium relative
          ${getSeatColor(status, seat.type)}
          ${isClickable ? 'transform hover:scale-105 active:scale-95' : ''}
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
        `}
        title={`Seat ${seat.number} - ${seat.type} - $${seatPricing[seat.type] || 0}`}
        aria-label={`Seat ${seat.number}, ${seat.type}, ${status}`}
      >
        <span className="text-xs font-semibold">
          {seat.number}
        </span>
        
        {/* Premium/Sleeper indicator */}
        {seat.type !== 'regular' && (
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent flex items-center justify-center">
            <Icon 
              name={seat.type === 'premium' ? 'Star' : 'Bed'} 
              size={8} 
              color="white" 
            />
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
      {/* Bus Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Bus" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Select Your Seats</h3>
            <p className="text-sm text-muted-foreground">
              {busLayout.busNumber} - {busLayout.busType}
            </p>
          </div>
        </div>

        {/* Zoom Controls - Desktop Only */}
        {showZoomControls && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 rounded-md border border-border hover:bg-muted flex items-center justify-center"
              disabled={zoomLevel <= 0.6}
            >
              <Icon name="ZoomOut" size={16} />
            </button>
            <span className="text-sm text-muted-foreground min-w-12 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="w-8 h-8 rounded-md border border-border hover:bg-muted flex items-center justify-center"
              disabled={zoomLevel >= 2}
            >
              <Icon name="ZoomIn" size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Seat Map Container */}
      <div className="overflow-auto max-h-96 lg:max-h-none">
        <div 
          className="mx-auto transition-transform duration-200"
          style={{ 
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            minWidth: '280px',
            width: 'fit-content'
          }}
        >
          {/* Driver Section */}
          <div className="mb-6 flex justify-end">
            <div className="w-16 h-8 bg-muted rounded-lg flex items-center justify-center">
              <Icon name="User" size={16} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground ml-1">Driver</span>
            </div>
          </div>

          {/* Seat Rows */}
          <div className="space-y-4">
            {busLayout.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center justify-center space-x-2">
                {/* Left Side Seats */}
                <div className="flex space-x-1">
                  {row.leftSeats.map((seat, seatIndex) => 
                    renderSeat(seat, rowIndex, seatIndex)
                  )}
                </div>

                {/* Aisle */}
                <div className="w-8 flex items-center justify-center">
                  <div className="w-0.5 h-8 bg-border"></div>
                </div>

                {/* Right Side Seats */}
                <div className="flex space-x-1">
                  {row.rightSeats.map((seat, seatIndex) => 
                    renderSeat(seat, rowIndex, seatIndex)
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bus Rear */}
          <div className="mt-6 h-4 bg-muted rounded-b-lg"></div>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-medium text-foreground mb-2">Selected Seats</h4>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map(seatId => {
              const seat = busLayout.rows
                .flatMap(row => [...row.leftSeats, ...row.rightSeats])
                .find(s => s.id === seatId);
              
              return (
                <div
                  key={seatId}
                  className="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full"
                >
                  <span className="text-sm font-medium">
                    Seat {seat?.number}
                  </span>
                  <button
                    onClick={() => onSeatSelect(seatId, seat?.type)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatMap;