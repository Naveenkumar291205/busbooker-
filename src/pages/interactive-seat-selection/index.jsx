import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookingProgress from '../../components/ui/BookingProgress';
import Button from '../../components/ui/Button';

import SeatMap from './components/SeatMap';
import SeatLegend from './components/SeatLegend';
import RouteDetails from './components/RouteDetails';
import FareBreakdown from './components/FareBreakdown';
import PassengerDetails from './components/PassengerDetails';

const InteractiveSeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get route data from navigation state or use mock data
  const routeData = location.state?.routeData;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [appliedPromoCode, setAppliedPromoCode] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [showPassengerDetails, setShowPassengerDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockRouteInfo = {
    from: "New York",
    to: "Boston",
    date: "Dec 28, 2024",
    departureTime: "08:30",
    arrivalTime: "13:45",
    duration: 315, // minutes
    boardingPoint: {
      name: "Port Authority Bus Terminal",
      address: "625 8th Ave, New York, NY 10018"
    },
    droppingPoint: {
      name: "South Station Bus Terminal",
      address: "700 Atlantic Ave, Boston, MA 02111"
    }
  };

  const mockBusInfo = {
    busNumber: "NY-BOS-001",
    busType: "Luxury Coach",
    operatorName: "Premium Express",
    operatorLogo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop&crop=center",
    rating: 4.5,
    reviewCount: 1247,
    totalSeats: 45,
    availableSeats: 23,
    amenities: [
      { name: "WiFi", icon: "Wifi" },
      { name: "AC", icon: "Snowflake" },
      { name: "Charging", icon: "Zap" },
      { name: "Entertainment", icon: "Monitor" },
      { name: "Snacks", icon: "Coffee" },
      { name: "Blanket", icon: "Shirt" }
    ]
  };

  const mockBusLayout = {
    busNumber: "NY-BOS-001",
    busType: "Luxury Coach",
    rows: [
      {
        leftSeats: [
          { id: "1A", number: "1A", type: "premium" },
          { id: "1B", number: "1B", type: "premium" }
        ],
        rightSeats: [
          { id: "1C", number: "1C", type: "premium" },
          { id: "1D", number: "1D", type: "premium" }
        ]
      },
      {
        leftSeats: [
          { id: "2A", number: "2A", type: "regular" },
          { id: "2B", number: "2B", type: "regular" }
        ],
        rightSeats: [
          { id: "2C", number: "2C", type: "regular" },
          { id: "2D", number: "2D", type: "regular" }
        ]
      },
      {
        leftSeats: [
          { id: "3A", number: "3A", type: "regular" },
          { id: "3B", number: "3B", type: "regular" }
        ],
        rightSeats: [
          { id: "3C", number: "3C", type: "regular" },
          { id: "3D", number: "3D", type: "regular" }
        ]
      },
      {
        leftSeats: [
          { id: "4A", number: "4A", type: "sleeper" },
          { id: "4B", number: "4B", type: "sleeper" }
        ],
        rightSeats: [
          { id: "4C", number: "4C", type: "sleeper" },
          { id: "4D", number: "4D", type: "sleeper" }
        ]
      },
      {
        leftSeats: [
          { id: "5A", number: "5A", type: "regular" },
          { id: "5B", number: "5B", type: "regular" }
        ],
        rightSeats: [
          { id: "5C", number: "5C", type: "regular" },
          { id: "5D", number: "5D", type: "regular" }
        ]
      }
    ]
  };

  const seatPricing = {
    regular: 25,
    premium: 5, // extra charge
    sleeper: 10 // extra charge
  };

  const occupiedSeats = ["2A", "3C", "4A", "5B"];
  const unavailableSeats = ["1C", "4D"];

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const handleSeatSelect = (seatId, seatType) => {
    const allSeats = mockBusLayout.rows.flatMap(row => [...row.leftSeats, ...row.rightSeats]);
    const seat = allSeats.find(s => s.id === seatId);
    
    if (!seat) return;

    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.id === seatId);
      
      if (isSelected) {
        // Remove seat
        const updated = prev.filter(s => s.id !== seatId);
        setShowPassengerDetails(updated.length > 0);
        return updated;
      } else {
        // Add seat (limit to 6 seats)
        if (prev.length >= 6) {
          alert('Maximum 6 seats can be selected');
          return prev;
        }
        const updated = [...prev, seat];
        setShowPassengerDetails(true);
        return updated;
      }
    });
  };

  const handlePassengerUpdate = (passengerData) => {
    setPassengers(passengerData);
  };

  const handlePromoCodeApply = (promoCode) => {
    // Mock promo code validation
    const validPromoCodes = {
      'SAVE10': 10,
      'FIRST20': 20,
      'STUDENT15': 15
    };

    if (validPromoCodes[promoCode.toUpperCase()]) {
      setAppliedPromoCode(promoCode.toUpperCase());
      setDiscount(validPromoCodes[promoCode.toUpperCase()]);
    } else {
      alert('Invalid promo code');
    }
  };

  const handleContinueToPayment = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    if (showPassengerDetails && passengers.length !== selectedSeats.length) {
      alert('Please complete passenger details for all selected seats');
      return;
    }

    setIsLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      const bookingData = {
        route: routeData || mockRouteInfo,
        bus: mockBusInfo,
        selectedSeats,
        passengers,
        pricing: seatPricing,
        promoCode: appliedPromoCode,
        discount,
        timestamp: new Date().toISOString()
      };

      navigate('/payment-gateway', { 
        state: { bookingData },
        replace: false 
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleBackToSearch = () => {
    navigate('/bus-search-route-selection');
  };

  const isFormComplete = () => {
    if (selectedSeats.length === 0) return false;
    if (!showPassengerDetails) return true;
    
    return passengers.length === selectedSeats.length && 
           passengers.every(p => p.name.trim() && p.age && p.gender);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Booking Progress */}
      <div className="pt-16">
        <BookingProgress currentStep={2} totalSteps={4} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleBackToSearch}
            iconName="ArrowLeft"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Back to Search Results
          </Button>
        </div>

        {/* Route Details */}
        <div className="mb-6">
          <RouteDetails 
            routeInfo={routeData || mockRouteInfo} 
            busInfo={mockBusInfo} 
          />
        </div>

        {/* Main Selection Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Seat Map & Legend */}
          <div className="lg:col-span-2 space-y-6">
            <SeatMap
              busLayout={mockBusLayout}
              selectedSeats={selectedSeats.map(s => s.id)}
              onSeatSelect={handleSeatSelect}
              occupiedSeats={occupiedSeats}
              unavailableSeats={unavailableSeats}
              seatPricing={seatPricing}
            />
            
            <SeatLegend seatPricing={seatPricing} />

            {/* Passenger Details - Mobile */}
            {showPassengerDetails && (
              <div className="lg:hidden">
                <PassengerDetails
                  selectedSeats={selectedSeats}
                  onPassengerUpdate={handlePassengerUpdate}
                />
              </div>
            )}
          </div>

          {/* Right Column - Fare Breakdown */}
          <div className="space-y-6">
            <FareBreakdown
              selectedSeats={selectedSeats}
              baseFare={seatPricing.regular}
              seatPricing={seatPricing}
              discount={discount}
              promoCode={appliedPromoCode}
              onPromoCodeApply={handlePromoCodeApply}
            />

            {/* Passenger Details - Desktop */}
            {showPassengerDetails && (
              <div className="hidden lg:block">
                <PassengerDetails
                  selectedSeats={selectedSeats}
                  onPassengerUpdate={handlePassengerUpdate}
                />
              </div>
            )}
          </div>
        </div>

        {/* Continue Button - Sticky on Mobile */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border lg:relative lg:bg-transparent lg:border-0 lg:p-0 lg:mt-8 z-40">
          <div className="max-w-7xl mx-auto">
            <Button
              onClick={handleContinueToPayment}
              disabled={!isFormComplete() || isLoading}
              loading={isLoading}
              fullWidth
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              className="shadow-lg lg:shadow-none"
            >
              {selectedSeats.length === 0 
                ? 'Select Seats to Continue'
                : `Continue to Payment (${selectedSeats.length} seat${selectedSeats.length > 1 ? 's' : ''})`
              }
            </Button>
            
            {selectedSeats.length > 0 && (
              <p className="text-center text-sm text-muted-foreground mt-2">
                Total: ${selectedSeats.reduce((total, seat) => {
                  return total + seatPricing.regular + (seatPricing[seat.type] || 0);
                }, 0) + Math.round((selectedSeats.reduce((total, seat) => {
                  return total + seatPricing.regular + (seatPricing[seat.type] || 0);
                }, 0)) * 0.12) - discount}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Spacing for Mobile Sticky Button */}
        <div className="h-20 lg:h-0"></div>
      </div>
    </div>
  );
};

export default InteractiveSeatSelection;