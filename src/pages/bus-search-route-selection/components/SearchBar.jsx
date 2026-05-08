import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchParams, onSearchUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(searchParams);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    onSearchUpdate(formData);
    setIsEditing(false);
  };

  const handleSwapCities = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  if (isEditing) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* From City */}
          <div className="md:col-span-3">
            <Input
              label="From"
              type="text"
              value={formData.from}
              onChange={(e) => handleInputChange('from', e.target.value)}
              placeholder="Departure city"
            />
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex items-end justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwapCities}
              className="h-10 w-10"
            >
              <Icon name="ArrowLeftRight" size={16} />
            </Button>
          </div>

          {/* To City */}
          <div className="md:col-span-3">
            <Input
              label="To"
              type="text"
              value={formData.to}
              onChange={(e) => handleInputChange('to', e.target.value)}
              placeholder="Destination city"
            />
          </div>

          {/* Date */}
          <div className="md:col-span-2">
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
          </div>

          {/* Passengers */}
          <div className="md:col-span-2">
            <Input
              label="Passengers"
              type="number"
              value={formData.passengers}
              onChange={(e) => handleInputChange('passengers', e.target.value)}
              min="1"
              max="9"
            />
          </div>

          {/* Search Button */}
          <div className="md:col-span-1 flex items-end">
            <Button
              variant="default"
              onClick={handleSearch}
              iconName="Search"
              iconPosition="left"
              className="w-full"
            >
              Search
            </Button>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <span className="font-medium text-foreground">{searchParams.from}</span>
            <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
            <span className="font-medium text-foreground">{searchParams.to}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {new Date(searchParams.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {searchParams.passengers} passenger{searchParams.passengers > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(true)}
          iconName="Edit2"
          iconPosition="left"
        >
          Modify
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;