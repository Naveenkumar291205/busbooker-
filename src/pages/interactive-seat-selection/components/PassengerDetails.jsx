import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PassengerDetails = ({ selectedSeats = [], onPassengerUpdate }) => {
  const [passengers, setPassengers] = useState(
    selectedSeats.map((seat, index) => ({
      seatId: seat.id,
      seatNumber: seat.number,
      name: '',
      age: '',
      gender: '',
      phone: index === 0 ? '' : '', // Only primary passenger needs phone
      email: index === 0 ? '' : '', // Only primary passenger needs email
      isPrimary: index === 0
    }))
  );

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setPassengers(updatedPassengers);
    
    if (onPassengerUpdate) {
      onPassengerUpdate(updatedPassengers);
    }
  };

  const validateAge = (age) => {
    const numAge = parseInt(age);
    return numAge >= 1 && numAge <= 120;
  };

  const isFormValid = () => {
    return passengers.every(passenger => {
      const hasBasicInfo = passenger.name.trim() && passenger.age && passenger.gender;
      const hasContactInfo = !passenger.isPrimary || (passenger.phone.trim() && passenger.email.trim());
      const validAge = validateAge(passenger.age);
      return hasBasicInfo && hasContactInfo && validAge;
    });
  };

  if (selectedSeats.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Select seats to add passenger details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
      <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Icon name="Users" size={20} />
        <span>Passenger Details</span>
      </h3>

      <div className="space-y-6">
        {passengers.map((passenger, index) => (
          <div key={passenger.seatId} className="border border-border rounded-lg p-4">
            {/* Passenger Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {passenger.seatNumber}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">
                    {passenger.isPrimary ? 'Primary Passenger' : `Passenger ${index + 1}`}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Seat {passenger.seatNumber}
                  </p>
                </div>
              </div>
              
              {passenger.isPrimary && (
                <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  Contact Person
                </div>
              )}
            </div>

            {/* Passenger Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter full name"
                value={passenger.name}
                onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                required
                className="md:col-span-1"
              />

              {/* Age */}
              <Input
                label="Age"
                type="number"
                placeholder="Age"
                value={passenger.age}
                onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                min="1"
                max="120"
                required
                error={passenger.age && !validateAge(passenger.age) ? 'Age must be between 1-120' : ''}
              />

              {/* Gender */}
              <Select
                label="Gender"
                options={genderOptions}
                value={passenger.gender}
                onChange={(value) => handlePassengerChange(index, 'gender', value)}
                placeholder="Select gender"
                required
              />

              {/* Contact Details - Only for Primary Passenger */}
              {passenger.isPrimary && (
                <>
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={passenger.phone}
                    onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                    required
                    description="For booking confirmations and updates"
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    value={passenger.email}
                    onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                    required
                    description="Ticket will be sent to this email"
                    className="md:col-span-1"
                  />
                </>
              )}
            </div>

            {/* Age-based Info */}
            {passenger.age && (
              <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={parseInt(passenger.age) < 12 ? 'Baby' : parseInt(passenger.age) >= 60 ? 'Heart' : 'User'} 
                    size={16} 
                    className="text-primary" 
                  />
                  <span className="text-sm text-muted-foreground">
                    {parseInt(passenger.age) < 12 
                      ? 'Child passenger - Special care will be provided'
                      : parseInt(passenger.age) >= 60 
                      ? 'Senior citizen - Priority boarding available' :'Adult passenger'
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Form Validation Status */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon 
              name={isFormValid() ? 'CheckCircle' : 'AlertCircle'} 
              size={16} 
              className={isFormValid() ? 'text-success' : 'text-warning'} 
            />
            <span className={`text-sm font-medium ${isFormValid() ? 'text-success' : 'text-warning'}`}>
              {isFormValid() ? 'All passenger details completed' : 'Please complete all required fields'}
            </span>
          </div>
          
          {isFormValid() && (
            <div className="flex items-center space-x-1 text-success">
              <Icon name="Shield" size={14} />
              <span className="text-xs">Ready for payment</span>
            </div>
          )}
        </div>

        {/* Important Notes */}
        <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Important Notes</p>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>• Names must match government-issued ID for verification</li>
                <li>• Children under 5 travel free (no separate seat)</li>
                <li>• Senior citizens (60+) get priority boarding</li>
                <li>• Contact details will be used for booking updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;