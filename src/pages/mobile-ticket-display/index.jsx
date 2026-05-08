import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TicketHeader from './components/TicketHeader';
import QRCodeSection from './components/QRCodeSection';
import TripSummary from './components/TripSummary';
import JourneyDetails from './components/JourneyDetails';
import TicketActions from './components/TicketActions';
import MultiTicketNavigation from './components/MultiTicketNavigation';
import Icon from '../../components/AppIcon';


const MobileTicketDisplay = () => {
  const navigate = useNavigate();
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Mock booking data with multiple tickets for group booking
  const mockTickets = [
    {
      id: "BUS2025012701",
      passenger: {
        name: "John Smith",
        phone: "+1-555-0123",
        email: "john.smith@email.com"
      },
      route: {
        from: "New York",
        to: "Washington DC",
        fromAddress: "Port Authority Bus Terminal, 625 8th Ave",
        toAddress: "Union Station, 50 Massachusetts Ave NE"
      },
      date: "2025-01-28",
      departureTime: "08:30",
      arrivalTime: "13:15",
      duration: "4h 45m",
      distance: "225 miles",
      seatNumber: "A12",
      busNumber: "NY-DC-001",
      busType: "Luxury Coach",
      fare: "45.00",
      operator: {
        name: "Express Lines",
        logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop&crop=center",
        phone: "+1-800-EXPRESS"
      },
      amenities: {
        ac: true,
        wifi: true,
        charging: true,
        entertainment: true,
        blanket: false,
        water: true
      }
    },
    {
      id: "BUS2025012702",
      passenger: {
        name: "Sarah Johnson",
        phone: "+1-555-0124",
        email: "sarah.johnson@email.com"
      },
      route: {
        from: "New York",
        to: "Washington DC",
        fromAddress: "Port Authority Bus Terminal, 625 8th Ave",
        toAddress: "Union Station, 50 Massachusetts Ave NE"
      },
      date: "2025-01-28",
      departureTime: "08:30",
      arrivalTime: "13:15",
      duration: "4h 45m",
      distance: "225 miles",
      seatNumber: "A13",
      busNumber: "NY-DC-001",
      busType: "Luxury Coach",
      fare: "45.00",
      operator: {
        name: "Express Lines",
        logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop&crop=center",
        phone: "+1-800-EXPRESS"
      },
      amenities: {
        ac: true,
        wifi: true,
        charging: true,
        entertainment: true,
        blanket: false,
        water: true
      }
    }
  ];

  const currentBooking = mockTickets[currentTicketIndex];

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cache ticket data for offline use
    localStorage.setItem('cachedTickets', JSON.stringify(mockTickets));

    // Prevent screen sleep (if supported)
    if ('wakeLock' in navigator) {
      navigator.wakeLock.request('screen').catch(() => {
        // Wake lock not supported or failed
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleBackToDashboard = () => {
    navigate('/user-dashboard-booking-management');
  };

  const handleTicketChange = (index) => {
    setCurrentTicketIndex(index);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-optimized full screen layout */}
      <div className="max-w-md mx-auto bg-card shadow-modal min-h-screen">
        {/* Header */}
        <TicketHeader 
          booking={currentBooking}
          onBack={handleBackToDashboard}
        />

        {/* Multi-ticket navigation */}
        <MultiTicketNavigation
          tickets={mockTickets}
          currentTicketIndex={currentTicketIndex}
          onTicketChange={handleTicketChange}
        />

        {/* Main ticket content */}
        <div className="overflow-y-auto">
          {/* QR Code Section */}
          <QRCodeSection 
            booking={currentBooking}
            isOffline={isOffline}
          />

          {/* Trip Summary */}
          <TripSummary booking={currentBooking} />

          {/* Journey Details */}
          <JourneyDetails booking={currentBooking} />

          {/* Ticket Actions */}
          <TicketActions 
            booking={currentBooking}
            onBackToDashboard={handleBackToDashboard}
          />
        </div>

        {/* Offline notification */}
        {isOffline && (
          <div className="fixed bottom-4 left-4 right-4 bg-warning text-warning-foreground px-4 py-2 rounded-lg shadow-modal flex items-center space-x-2 z-50">
            <Icon name="WifiOff" size={16} />
            <span className="text-sm font-medium">Offline Mode - Ticket cached locally</span>
          </div>
        )}
      </div>

      {/* Desktop/Tablet additional context */}
      <div className="hidden lg:block fixed inset-0 bg-muted/50 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          {/* This ensures the mobile ticket stays centered on larger screens */}
        </div>
      </div>
    </div>
  );
};

export default MobileTicketDisplay;