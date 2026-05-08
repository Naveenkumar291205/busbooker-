import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import StatsCard from './components/StatsCard';
import BookingCard from './components/BookingCard';
import SavedRouteCard from './components/SavedRouteCard';
import QuickActionsPanel from './components/QuickActionsPanel';
import BookingFilters from './components/BookingFilters';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserDashboardBookingManagement = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [userName, setUserName] = useState('John Smith');
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    sortBy: 'date-desc'
  });
  const navigate = useNavigate();

  // Mock data for user stats
  const userStats = {
    upcomingTrips: 3,
    totalBookings: 24,
    savedRoutes: 8,
    walletBalance: 125.50
  };

  // Mock data for upcoming bookings
  const upcomingBookings = [
    {
      bookingId: 'BUS001234',
      route: 'New York → Boston',
      from: 'New York',
      to: 'Boston',
      date: '2025-07-30',
      departureTime: '09:30',
      arrivalTime: '13:45',
      seats: ['A12', 'A13'],
      operator: 'MegaBus Express',
      status: 'Confirmed',
      totalPrice: 89.50,
      passengers: 2,
      rated: false
    },
    {
      bookingId: 'BUS001235',
      route: 'Boston → Philadelphia',
      from: 'Boston',
      to: 'Philadelphia',
      date: '2025-08-05',
      departureTime: '14:15',
      arrivalTime: '19:30',
      seats: ['B08'],
      operator: 'Greyhound Lines',
      status: 'Confirmed',
      totalPrice: 65.00,
      passengers: 1,
      rated: false
    },
    {
      bookingId: 'BUS001236',
      route: 'Philadelphia → Washington DC',
      from: 'Philadelphia',
      to: 'Washington DC',
      date: '2025-08-12',
      departureTime: '11:00',
      arrivalTime: '14:20',
      seats: ['C15'],
      operator: 'BoltBus',
      status: 'Pending',
      totalPrice: 45.00,
      passengers: 1,
      rated: false
    }
  ];

  // Mock data for past bookings
  const pastBookings = [
    {
      bookingId: 'BUS001230',
      route: 'Washington DC → New York',
      from: 'Washington DC',
      to: 'New York',
      date: '2025-07-15',
      departureTime: '16:45',
      arrivalTime: '21:30',
      seats: ['A05'],
      operator: 'Peter Pan Bus Lines',
      status: 'Completed',
      totalPrice: 75.00,
      passengers: 1,
      rated: true
    },
    {
      bookingId: 'BUS001228',
      route: 'New York → Atlantic City',
      from: 'New York',
      to: 'Atlantic City',
      date: '2025-07-08',
      departureTime: '10:30',
      arrivalTime: '13:15',
      seats: ['B12', 'B13'],
      operator: 'NJ Transit',
      status: 'Completed',
      totalPrice: 120.00,
      passengers: 2,
      rated: false
    },
    {
      bookingId: 'BUS001225',
      route: 'Boston → New York',
      from: 'Boston',
      to: 'New York',
      date: '2025-06-28',
      departureTime: '08:00',
      arrivalTime: '12:30',
      seats: ['A20'],
      operator: 'MegaBus Express',
      status: 'Completed',
      totalPrice: 55.00,
      passengers: 1,
      rated: true
    }
  ];

  // Mock data for saved routes
  const savedRoutes = [
    {
      id: 1,
      name: 'NYC-Boston Express',
      from: 'New York',
      to: 'Boston',
      duration: '4h 15m',
      distance: '215 miles',
      minPrice: 45.00,
      maxPrice: 95.00,
      operators: ['MegaBus Express', 'Greyhound Lines', 'Peter Pan Bus'],
      priceAlert: true
    },
    {
      id: 2,
      name: 'Philly-DC Corridor',
      from: 'Philadelphia',
      to: 'Washington DC',
      duration: '3h 20m',
      distance: '140 miles',
      minPrice: 35.00,
      maxPrice: 75.00,
      operators: ['BoltBus', 'Greyhound Lines'],
      priceAlert: false
    },
    {
      id: 3,
      name: 'Boston-NYC Weekend',
      from: 'Boston',
      to: 'New York',
      duration: '4h 30m',
      distance: '215 miles',
      minPrice: 40.00,
      maxPrice: 85.00,
      operators: ['MegaBus Express', 'FlixBus', 'Concord Coach'],
      priceAlert: true
    }
  ];

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/user-registration-login');
      return;
    }

    // Load user data
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name || 'User');
    }
  }, [navigate]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      dateFrom: '',
      dateTo: '',
      sortBy: 'date-desc'
    });
  };

  const filterBookings = (bookings) => {
    let filtered = [...bookings];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(booking =>
        booking.route.toLowerCase().includes(filters.search.toLowerCase()) ||
        booking.bookingId.toLowerCase().includes(filters.search.toLowerCase()) ||
        booking.operator.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(booking =>
        booking.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Date filters
    if (filters.dateFrom) {
      filtered = filtered.filter(booking => booking.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(booking => booking.date <= filters.dateTo);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'price-asc':
          return a.totalPrice - b.totalPrice;
        case 'price-desc':
          return b.totalPrice - a.totalPrice;
        case 'route':
          return a.route.localeCompare(b.route);
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return filtered;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Trips', icon: 'Calendar', count: upcomingBookings.length },
    { id: 'past', label: 'Past Bookings', icon: 'History', count: pastBookings.length },
    { id: 'saved', label: 'Saved Routes', icon: 'Heart', count: savedRoutes.length }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 lg:px-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {getGreeting()}, {userName}!
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your bookings and travel preferences
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button
                  variant="default"
                  iconName="Search"
                  iconPosition="left"
                  onClick={() => navigate('/bus-search-route-selection')}
                >
                  Book New Trip
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Upcoming Trips"
              value={userStats.upcomingTrips}
              icon="Calendar"
              color="primary"
              trend={{ direction: 'up', value: '+2 this month' }}
            />
            <StatsCard
              title="Total Bookings"
              value={userStats.totalBookings}
              icon="TicketCheck"
              color="success"
              trend={{ direction: 'up', value: '+4 this year' }}
            />
            <StatsCard
              title="Saved Routes"
              value={userStats.savedRoutes}
              icon="Heart"
              color="warning"
            />
            <StatsCard
              title="Wallet Balance"
              value={`$${userStats.walletBalance.toFixed(2)}`}
              icon="Wallet"
              color="accent"
              trend={{ direction: 'down', value: '-$25.50' }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg mb-6">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 border-b-2 ${
                        activeTab === tab.id
                          ? 'text-primary border-primary bg-primary/5' :'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.label}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filters */}
              {(activeTab === 'upcoming' || activeTab === 'past') && (
                <BookingFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              )}

              {/* Content */}
              <div className="space-y-4">
                {activeTab === 'upcoming' && (
                  <>
                    {filterBookings(upcomingBookings).length > 0 ? (
                      filterBookings(upcomingBookings).map((booking) => (
                        <BookingCard
                          key={booking.bookingId}
                          booking={booking}
                          type="upcoming"
                        />
                      ))
                    ) : (
                      <div className="text-center py-12 bg-card border border-border rounded-lg">
                        <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No upcoming trips</h3>
                        <p className="text-muted-foreground mb-4">
                          {filters.search || filters.status !== 'all' || filters.dateFrom || filters.dateTo ?'No trips match your current filters' :'Start planning your next adventure!'
                          }
                        </p>
                        <Button
                          variant="default"
                          iconName="Search"
                          iconPosition="left"
                          onClick={() => navigate('/bus-search-route-selection')}
                        >
                          Search Buses
                        </Button>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'past' && (
                  <>
                    {filterBookings(pastBookings).length > 0 ? (
                      filterBookings(pastBookings).map((booking) => (
                        <BookingCard
                          key={booking.bookingId}
                          booking={booking}
                          type="past"
                        />
                      ))
                    ) : (
                      <div className="text-center py-12 bg-card border border-border rounded-lg">
                        <Icon name="History" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No past bookings</h3>
                        <p className="text-muted-foreground mb-4">
                          {filters.search || filters.status !== 'all' || filters.dateFrom || filters.dateTo ?'No bookings match your current filters' :'Your completed trips will appear here'
                          }
                        </p>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'saved' && (
                  <>
                    {savedRoutes.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {savedRoutes.map((route) => (
                          <SavedRouteCard key={route.id} route={route} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-card border border-border rounded-lg">
                        <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No saved routes</h3>
                        <p className="text-muted-foreground mb-4">
                          Save your favorite routes for quick access and price alerts
                        </p>
                        <Button
                          variant="default"
                          iconName="Search"
                          iconPosition="left"
                          onClick={() => navigate('/bus-search-route-selection')}
                        >
                          Explore Routes
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <QuickActionsPanel walletBalance={userStats.walletBalance} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboardBookingManagement;