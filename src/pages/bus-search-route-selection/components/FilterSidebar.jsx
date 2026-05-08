import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFiltersChange, isVisible, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const departureTimeOptions = [
    { value: 'early-morning', label: 'Early Morning (4AM - 8AM)', count: 12 },
    { value: 'morning', label: 'Morning (8AM - 12PM)', count: 18 },
    { value: 'afternoon', label: 'Afternoon (12PM - 6PM)', count: 15 },
    { value: 'evening', label: 'Evening (6PM - 11PM)', count: 9 }
  ];

  const operatorOptions = [
    { value: 'greyhound', label: 'Greyhound Lines', count: 24 },
    { value: 'megabus', label: 'Megabus', count: 18 },
    { value: 'flixbus', label: 'FlixBus', count: 15 },
    { value: 'peter-pan', label: 'Peter Pan Bus Lines', count: 12 },
    { value: 'boltbus', label: 'BoltBus', count: 8 }
  ];

  const amenityOptions = [
    { value: 'wifi', label: 'Free WiFi', count: 42 },
    { value: 'power-outlets', label: 'Power Outlets', count: 38 },
    { value: 'restroom', label: 'Onboard Restroom', count: 35 },
    { value: 'air-conditioning', label: 'Air Conditioning', count: 54 },
    { value: 'reclining-seats', label: 'Reclining Seats', count: 29 },
    { value: 'entertainment', label: 'Entertainment System', count: 16 }
  ];

  const handleFilterChange = (category, value, checked) => {
    const newFilters = { ...localFilters };
    
    if (!newFilters[category]) {
      newFilters[category] = [];
    }

    if (checked) {
      newFilters[category] = [...newFilters[category], value];
    } else {
      newFilters[category] = newFilters[category].filter(item => item !== value);
    }

    setLocalFilters(newFilters);
  };

  const handlePriceRangeChange = (min, max) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: { min, max }
    }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  const resetFilters = () => {
    const emptyFilters = {
      departureTime: [],
      operators: [],
      amenities: [],
      priceRange: { min: 0, max: 200 }
    };
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const sidebarClasses = `
    fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-full bg-card border-r lg:border-r-0 border-border
    transform transition-transform duration-300 ease-in-out z-40 lg:z-auto lg:transform-none
    ${isVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    overflow-y-auto
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isVisible && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div className={sidebarClasses}>
        <div className="p-4 lg:p-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="DollarSign" size={16} className="mr-2" />
              Price Range
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={localFilters.priceRange?.min || 0}
                  onChange={(e) => handlePriceRangeChange(parseInt(e.target.value), localFilters.priceRange?.max || 200)}
                  className="flex-1"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${localFilters.priceRange?.min || 0}</span>
                <span>${localFilters.priceRange?.max || 200}</span>
              </div>
            </div>
          </div>

          {/* Departure Time */}
          <div className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="Clock" size={16} className="mr-2" />
              Departure Time
            </h3>
            <div className="space-y-2">
              {departureTimeOptions.map((option) => (
                <div key={option.value} className="flex items-center justify-between">
                  <Checkbox
                    label={option.label}
                    checked={localFilters.departureTime?.includes(option.value) || false}
                    onChange={(e) => handleFilterChange('departureTime', option.value, e.target.checked)}
                  />
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {option.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bus Operators */}
          <div className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="Building2" size={16} className="mr-2" />
              Bus Operators
            </h3>
            <div className="space-y-2">
              {operatorOptions.map((option) => (
                <div key={option.value} className="flex items-center justify-between">
                  <Checkbox
                    label={option.label}
                    checked={localFilters.operators?.includes(option.value) || false}
                    onChange={(e) => handleFilterChange('operators', option.value, e.target.checked)}
                  />
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {option.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="Star" size={16} className="mr-2" />
              Amenities
            </h3>
            <div className="space-y-2">
              {amenityOptions.map((option) => (
                <div key={option.value} className="flex items-center justify-between">
                  <Checkbox
                    label={option.label}
                    checked={localFilters.amenities?.includes(option.value) || false}
                    onChange={(e) => handleFilterChange('amenities', option.value, e.target.checked)}
                  />
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {option.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              variant="default"
              onClick={applyFilters}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;