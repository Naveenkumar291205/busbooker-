import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange, resultCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'price-low', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'duration-short', label: 'Duration: Shortest First', icon: 'Clock' },
    { value: 'departure-early', label: 'Departure: Earliest First', icon: 'Sunrise' },
    { value: 'departure-late', label: 'Departure: Latest First', icon: 'Sunset' },
    { value: 'rating-high', label: 'Rating: Highest First', icon: 'Star' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const currentOption = sortOptions.find(option => option.value === currentSort);
    return currentOption ? currentOption.label : 'Sort by';
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm text-muted-foreground">
        {resultCount} buses found
      </div>

      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          iconName="ChevronDown"
          iconPosition="right"
          className="min-w-48"
        >
          {getCurrentSortLabel()}
        </Button>

        {isOpen && (
          <div className="absolute right-0 top-12 w-64 bg-popover border border-border rounded-lg shadow-modal py-1 z-50">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`
                  w-full text-left px-4 py-3 hover:bg-muted transition-colors duration-150 flex items-center space-x-3
                  ${currentSort === option.value ? 'bg-muted text-primary' : 'text-popover-foreground'}
                `}
              >
                <Icon name={option.icon} size={16} />
                <span className="text-sm">{option.label}</span>
                {currentSort === option.value && (
                  <Icon name="Check" size={14} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;