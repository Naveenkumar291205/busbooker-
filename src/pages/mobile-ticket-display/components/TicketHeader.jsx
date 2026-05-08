import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TicketHeader = ({ booking, onBack }) => {
  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Icon name="ArrowLeft" size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <Image
            src={booking.operator.logo}
            alt={booking.operator.name}
            className="w-8 h-8 rounded-lg object-cover"
          />
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">{booking.operator.name}</p>
            <p className="text-xs text-muted-foreground">Bus Operator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;