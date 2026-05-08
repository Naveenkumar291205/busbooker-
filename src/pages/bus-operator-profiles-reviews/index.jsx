import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import OperatorHeader from './components/OperatorHeader';
import TabNavigation from './components/TabNavigation';
import OverviewTab from './components/OverviewTab';
import ReviewsTab from './components/ReviewsTab';
import PoliciesTab from './components/PoliciesTab';
import ContactTab from './components/ContactTab';
import OperatorSidebar from './components/OperatorSidebar';

const BusOperatorProfilesReviews = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [operator, setOperator] = useState(null);
  const [loading, setLoading] = useState(true);
  const { operatorId } = useParams();
  const location = useLocation();

  // Mock operator data
  const mockOperators = [
    {
      id: 1,
      name: "Express Transit Co.",
      logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=400&fit=crop",
      rating: 4.3,
      totalReviews: 2847,
      headquarters: "New York, NY",
      established: 1995,
      fleetSize: 156,
      averageAge: 3.2,
      routes: 45,
      onTimePerformance: 87,
      satisfactionRate: 92,
      safetyScore: 8.5,
      isVerified: true,
      certifications: [
        { name: "DOT Safety Certification", validUntil: "Dec 2025" },
        { name: "ISO 9001:2015", validUntil: "Mar 2026" },
        { name: "Green Fleet Certification", validUntil: "Jun 2025" }
      ],
      amenities: [
        { name: "Wi-Fi", icon: "Wifi" },
        { name: "AC", icon: "Snowflake" },
        { name: "Charging Ports", icon: "Zap" },
        { name: "Reclining Seats", icon: "Armchair" },
        { name: "Entertainment", icon: "Monitor" },
        { name: "Restroom", icon: "Home" },
        { name: "Snacks", icon: "Coffee" },
        { name: "Reading Light", icon: "Lightbulb" }
      ],
      popularRoutes: [
        { from: "New York", to: "Boston", frequency: "Every 2 hours" },
        { from: "New York", to: "Philadelphia", frequency: "Every hour" },
        { from: "Boston", to: "Washington DC", frequency: "4 times daily" }
      ],
      coverageAreas: ["Northeast", "Mid-Atlantic", "New England"],
      gallery: [
        { url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=400&fit=crop", caption: "Interior seating" },
        { url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=400&fit=crop", caption: "Entertainment system" },
        { url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop", caption: "Exterior view" },
        { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", caption: "Driver cabin" }
      ],
      ratingBreakdown: [
        { stars: 5, percentage: 45 },
        { stars: 4, percentage: 32 },
        { stars: 3, percentage: 15 },
        { stars: 2, percentage: 5 },
        { stars: 1, percentage: 3 }
      ],
      reviews: [
        {
          id: 1,
          userName: "Sarah Johnson",
          userAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
          rating: 5,
          date: "2025-01-20",
          route: "New York → Boston",
          comment: `Excellent service! The bus was clean, comfortable, and arrived exactly on time. The Wi-Fi worked perfectly throughout the journey, and the staff was very professional. I especially appreciated the charging ports at every seat and the smooth ride quality.`,
          isVerified: true,
          helpfulCount: 23,
          notHelpfulCount: 2,
          photos: [
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=200&h=200&fit=crop"
          ],
          operatorResponse: {
            date: "2025-01-21",
            message: "Thank you for your wonderful review, Sarah! We're delighted to hear that you had such a positive experience with our service. Your feedback about our amenities and punctuality means a lot to our team."
          }
        },
        {
          id: 2,
          userName: "Michael Chen",
          userAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
          rating: 4,
          date: "2025-01-18",
          route: "Boston → New York",
          comment: `Good overall experience. The bus was comfortable and the journey was smooth. Only minor issue was that the AC was a bit too cold, but the staff adjusted it when I asked. Would definitely use this service again for future trips.`,
          isVerified: true,
          helpfulCount: 15,
          notHelpfulCount: 1,
          photos: []
        },
        {
          id: 3,
          userName: "Emily Rodriguez",
          userAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
          rating: 3,
          date: "2025-01-15",
          route: "Philadelphia → New York",
          comment: `Average experience. The bus was delayed by 30 minutes without much explanation. The seats were comfortable enough, but the Wi-Fi was spotty during the trip. Customer service could be more communicative about delays.`,
          isVerified: false,
          helpfulCount: 8,
          notHelpfulCount: 4,
          photos: [],
          operatorResponse: {
            date: "2025-01-16",
            message: "We apologize for the delay and communication issues, Emily. We're working on improving our real-time updates and Wi-Fi connectivity. Thank you for your feedback - it helps us serve you better."
          }
        }
      ],
      policies: {
        booking: [
          {
            title: "Reservation Policy",
            details: [
              "Bookings can be made up to 90 days in advance",
              "Seats are assigned on a first-come, first-served basis",
              "Group bookings (10+ passengers) require 48-hour advance notice",
              "Special assistance requests must be made during booking"
            ]
          },
          {
            title: "Cancellation Policy",
            details: [
              "Free cancellation up to 24 hours before departure",
              "50% refund for cancellations 2-24 hours before departure",
              "No refund for cancellations within 2 hours of departure",
              "Processing fee of $5 applies to all refunds"
            ],
            note: "Cancellation policies may vary during peak seasons and holidays"
          }
        ],
        baggage: [
          {
            title: "Carry-on Baggage",
            details: [
              "One carry-on bag up to 25 lbs allowed per passenger",
              "Maximum dimensions: 22\" x 14\" x 9\"",
              "Must fit in overhead compartment or under seat",
              "Liquids must comply with TSA regulations"
            ]
          },
          {
            title: "Checked Baggage",
            details: [
              "Two checked bags up to 50 lbs each included in fare",
              "Additional bags charged at $25 per bag",
              "Maximum dimensions: 62 linear inches per bag",
              "Fragile items travel at passenger\'s risk"
            ]
          }
        ],
        travel: [
          {
            title: "Boarding Requirements",
            details: [
              "Valid government-issued photo ID required",
              "Arrive at boarding location 15 minutes early",
              "Children under 2 travel free on adult\'s lap",
              "Unaccompanied minors (5-17) require special booking"
            ]
          },
          {
            title: "Safety Guidelines",
            details: [
              "Seat belts must be worn when seated",
              "No smoking or vaping anywhere on the bus",
              "Alcohol consumption is prohibited",
              "Emergency exits must remain unobstructed"
            ]
          }
        ],
        payment: [
          {
            title: "Accepted Payment Methods",
            details: [
              "Major credit cards (Visa, MasterCard, American Express)",
              "Debit cards with Visa/MasterCard logo",
              "PayPal and digital wallet payments",
              "Cash payments at select locations only"
            ]
          },
          {
            title: "Refund Processing",
            details: [
              "Credit card refunds processed within 5-7 business days",
              "PayPal refunds processed within 3-5 business days",
              "Cash refunds available at original purchase location",
              "Refund confirmation sent via email"
            ]
          }
        ],
        lastUpdated: "January 15, 2025"
      },
      contact: {
        phone: "+1 (800) 555-0123",
        email: "support@expresstransit.com",
        address: "1234 Transit Avenue, New York, NY 10001",
        website: "www.expresstransit.com",
        officeHours: [
          { day: "Monday - Friday", hours: "6:00 AM - 10:00 PM" },
          { day: "Saturday", hours: "7:00 AM - 9:00 PM" },
          { day: "Sunday", hours: "8:00 AM - 8:00 PM" }
        ],
        socialMedia: [
          { platform: "Facebook", icon: "Facebook" },
          { platform: "Twitter", icon: "Twitter" },
          { platform: "Instagram", icon: "Instagram" },
          { platform: "LinkedIn", icon: "Linkedin" }
        ],
        faq: [
          {
            question: "How early should I arrive at the bus station?",
            answer: "We recommend arriving at least 15 minutes before your scheduled departure time to allow for check-in and boarding."
          },
          {
            question: "Can I change my ticket after booking?",
            answer: "Yes, you can change your ticket up to 2 hours before departure for a $10 change fee, subject to seat availability."
          },
          {
            question: "What happens if my bus is delayed?",
            answer: "We'll notify you via SMS and email about any delays. If the delay is more than 2 hours, you're eligible for a full refund or rebooking."
          },
          {
            question: "Do you offer student or senior discounts?",
            answer: "Yes, we offer 10% discounts for students with valid ID and seniors 65+. Discounts can be applied during booking."
          }
        ]
      },
      recentActivity: [
        { action: "Added new route: Albany → Syracuse", time: "2 days ago" },
        { action: "Fleet maintenance completed", time: "1 week ago" },
        { action: "Safety certification renewed", time: "2 weeks ago" },
        { action: "Customer service hours extended", time: "3 weeks ago" }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadOperator = () => {
      setLoading(true);
      setTimeout(() => {
        const foundOperator = mockOperators.find(op => op.id === parseInt(operatorId)) || mockOperators[0];
        setOperator(foundOperator);
        setLoading(false);
      }, 1000);
    };

    loadOperator();
  }, [operatorId]);

  useEffect(() => {
    // Check if there's a tab specified in the URL or state
    const searchParams = new URLSearchParams(location.search);
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && ['overview', 'reviews', 'policies', 'contact'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL without page reload
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('tab', tab);
    window.history.replaceState({}, '', `${location.pathname}?${searchParams.toString()}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab operator={operator} />;
      case 'reviews':
        return <ReviewsTab operator={operator} />;
      case 'policies':
        return <PoliciesTab operator={operator} />;
      case 'contact':
        return <ContactTab operator={operator} />;
      default:
        return <OverviewTab operator={operator} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading operator profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!operator) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <p className="text-foreground text-lg mb-2">Operator not found</p>
            <p className="text-muted-foreground">The requested operator profile could not be loaded.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <OperatorHeader operator={operator} />
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        
        <div className="max-w-7xl mx-auto px-4 py-6 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderTabContent()}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <OperatorSidebar operator={operator} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusOperatorProfilesReviews;