import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onFilterRemove, onClearAll }) => {
  const filterChips = [
    {
      key: 'departureTime',
      label: 'Departure',
      value: activeFilters.departureTime,
      icon: 'Clock'
    },
    {
      key: 'priceRange',
      label: 'Price',
      value: activeFilters.priceRange ? `$${activeFilters.priceRange.min} - $${activeFilters.priceRange.max}` : null,
      icon: 'DollarSign'
    },
    {
      key: 'operators',
      label: 'Operators',
      value: activeFilters.operators?.length > 0 ? `${activeFilters.operators.length} selected` : null,
      icon: 'Building2'
    },
    {
      key: 'amenities',
      label: 'Amenities',
      value: activeFilters.amenities?.length > 0 ? `${activeFilters.amenities.length} selected` : null,
      icon: 'Star'
    }
  ].filter(chip => chip.value);

  if (filterChips.length === 0) {
    return null;
  }

  return (
    <div className="bg-muted/30 p-3 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Active Filters</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-xs h-6 px-2"
        >
          Clear All
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filterChips.map((chip) => (
          <div
            key={chip.key}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm border border-primary/20"
          >
            <Icon name={chip.icon} size={12} />
            <span className="font-medium">{chip.label}:</span>
            <span>{chip.value}</span>
            <button
              onClick={() => onFilterRemove(chip.key)}
              className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterChips;