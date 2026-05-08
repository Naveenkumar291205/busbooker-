import React from 'react';
import Icon from '../../../components/AppIcon';

const SeatLegend = ({ seatPricing = {} }) => {
  const legendItems = [
    {
      status: 'available',
      label: 'Available',
      color: 'bg-success/20 border-success',
      icon: 'Check',
      description: 'Regular seats'
    },
    {
      status: 'premium',
      label: 'Premium',
      color: 'bg-accent/20 border-accent',
      icon: 'Star',
      description: `Extra legroom - $${seatPricing.premium || 5} extra`
    },
    {
      status: 'sleeper',
      label: 'Sleeper',
      color: 'bg-primary/20 border-primary',
      icon: 'Bed',
      description: `Reclining seats - $${seatPricing.sleeper || 10} extra`
    },
    {
      status: 'selected',
      label: 'Selected',
      color: 'bg-primary border-primary text-primary-foreground',
      icon: 'User',
      description: 'Your selection'
    },
    {
      status: 'occupied',
      label: 'Occupied',
      color: 'bg-destructive/80 border-destructive',
      icon: 'X',
      description: 'Already booked'
    },
    {
      status: 'unavailable',
      label: 'Unavailable',
      color: 'bg-muted border-muted opacity-50',
      icon: 'Minus',
      description: 'Not available'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
      <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Icon name="Info" size={20} />
        <span>Seat Legend</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {legendItems.map((item) => (
          <div
            key={item.status}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-150"
          >
            {/* Seat Sample */}
            <div
              className={`
                w-8 h-8 rounded-md border-2 flex items-center justify-center
                ${item.color}
              `}
            >
              <Icon 
                name={item.icon} 
                size={12} 
                className={item.status === 'selected' ? 'text-primary-foreground' : 'text-current'}
              />
            </div>

            {/* Legend Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {item.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Info */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Seat Pricing</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Regular:</span>
            <span className="font-medium">${seatPricing.regular || 25}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Premium:</span>
            <span className="font-medium">${(seatPricing.regular || 25) + (seatPricing.premium || 5)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Sleeper:</span>
            <span className="font-medium">${(seatPricing.regular || 25) + (seatPricing.sleeper || 10)}</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Pro Tips</p>
            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
              <li>• Front seats offer better views and less motion</li>
              <li>• Aisle seats provide easier access to restroom</li>
              <li>• Window seats are perfect for scenic routes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatLegend;