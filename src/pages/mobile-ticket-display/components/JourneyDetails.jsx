import React from 'react';
import Icon from '../../../components/AppIcon';
import ExpandableSection from './ExpandableSection';

const JourneyDetails = ({ booking }) => {
  const boardingInstructions = [
    "Arrive at the boarding point 15 minutes before departure time",
    "Have your ticket QR code ready for scanning",
    "Carry a valid photo ID for verification",
    "Board only from the designated boarding point",
    "Follow COVID-19 safety protocols if applicable"
  ];

  const amenities = [
    { name: "Air Conditioning", icon: "Snowflake", available: booking.amenities.ac },
    { name: "WiFi", icon: "Wifi", available: booking.amenities.wifi },
    { name: "Charging Port", icon: "Zap", available: booking.amenities.charging },
    { name: "Entertainment", icon: "Monitor", available: booking.amenities.entertainment },
    { name: "Blanket", icon: "Shirt", available: booking.amenities.blanket },
    { name: "Water Bottle", icon: "Droplets", available: booking.amenities.water }
  ];

  const emergencyContacts = [
    { label: "Customer Support", number: "+1-800-BUS-HELP", icon: "Headphones" },
    { label: "Emergency Helpline", number: "+1-800-EMERGENCY", icon: "Phone" },
    { label: "Bus Operator", number: booking.operator.phone, icon: "Building2" }
  ];

  return (
    <div className="bg-card">
      {/* Journey Details */}
      <ExpandableSection title="Journey Details" icon="MapPin" defaultExpanded>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Distance</p>
              <p className="font-semibold text-foreground">{booking.distance}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bus Type</p>
              <p className="font-semibold text-foreground">{booking.busType}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Fare</p>
              <p className="font-semibold text-success">${booking.fare}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm font-medium text-success">Paid</span>
              </div>
            </div>
          </div>
        </div>
      </ExpandableSection>

      {/* Boarding Instructions */}
      <ExpandableSection title="Boarding Instructions" icon="Info">
        <div className="space-y-3">
          {boardingInstructions.map((instruction, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                {index + 1}
              </div>
              <p className="text-sm text-foreground flex-1">{instruction}</p>
            </div>
          ))}
        </div>
      </ExpandableSection>

      {/* Bus Amenities */}
      <ExpandableSection title="Bus Amenities" icon="Star">
        <div className="grid grid-cols-2 gap-3">
          {amenities.map((amenity, index) => (
            <div 
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                amenity.available ? 'bg-success/10' : 'bg-muted'
              }`}
            >
              <Icon 
                name={amenity.icon} 
                size={16} 
                className={amenity.available ? 'text-success' : 'text-muted-foreground'} 
              />
              <span className={`text-sm ${
                amenity.available ? 'text-success font-medium' : 'text-muted-foreground'
              }`}>
                {amenity.name}
              </span>
              {amenity.available && (
                <Icon name="Check" size={14} className="text-success ml-auto" />
              )}
            </div>
          ))}
        </div>
      </ExpandableSection>

      {/* Emergency Contacts */}
      <ExpandableSection title="Emergency Contacts" icon="Phone">
        <div className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={contact.icon} size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">{contact.label}</span>
              </div>
              <a 
                href={`tel:${contact.number}`}
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                {contact.number}
              </a>
            </div>
          ))}
        </div>
      </ExpandableSection>
    </div>
  );
};

export default JourneyDetails;