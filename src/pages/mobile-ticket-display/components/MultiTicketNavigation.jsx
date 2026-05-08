import React from 'react';
import Icon from '../../../components/AppIcon';

const MultiTicketNavigation = ({ tickets, currentTicketIndex, onTicketChange }) => {
  if (tickets.length <= 1) return null;

  const handlePrevious = () => {
    const newIndex = currentTicketIndex > 0 ? currentTicketIndex - 1 : tickets.length - 1;
    onTicketChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentTicketIndex < tickets.length - 1 ? currentTicketIndex + 1 : 0;
    onTicketChange(newIndex);
  };

  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
        >
          <Icon name="ChevronLeft" size={16} />
          <span className="text-sm">Previous</span>
        </button>

        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            Passenger {currentTicketIndex + 1} of {tickets.length}
          </span>
        </div>

        <button
          onClick={handleNext}
          className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
        >
          <span className="text-sm">Next</span>
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>

      {/* Ticket Indicators */}
      <div className="flex justify-center space-x-2 mt-3">
        {tickets.map((_, index) => (
          <button
            key={index}
            onClick={() => onTicketChange(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentTicketIndex ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiTicketNavigation;