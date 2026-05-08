import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import FilterSidebar from './components/FilterSidebar';
import SortDropdown from './components/SortDropdown';
import BusCard from './components/BusCard';
import LoadingSkeleton from './components/LoadingSkeleton';

const BusSearchRouteSelection = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('price-low');

  // Search parameters
  const [searchParams, setSearchParams] = useState({
    from: 'New York, NY',
    to: 'Boston, MA',
    date: '2025-07-28',
    passengers: 1
  });

  // Filter state
  const [filters, setFilters] = useState({
    departureTime: [],
    operators: [],
    amenities: [],
    priceRange: { min: 0, max: 200 }
  });

  // Mock bus data
  const mockBuses = [
    {
      id: 1,
      operator: {
        name: 'Greyhound Lines',
        logo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop&crop=center',
        rating: 4.2,
        reviews: 1248
      },
      departure: {
        time: '08:30 AM',
        city: 'New York',
        terminal: 'Port Authority Bus Terminal'
      },
      arrival: {
        time: '12:45 PM',
        city: 'Boston',
        terminal: 'South Station Bus Terminal'
      },
      duration: 255,
      price: 45,
      availableSeats: 12,
      stops: 2,
      amenities: ['wifi', 'power-outlets', 'restroom', 'air-conditioning'],
      routeStops: [
        { city: 'New York, NY', time: '08:30 AM' },
        { city: 'Hartford, CT', time: '10:15 AM' },
        { city: 'Springfield, MA', time: '11:30 AM' },
        { city: 'Boston, MA', time: '12:45 PM' }
      ],
      policies: {
        cancellation: 'Free cancellation up to 24 hours before departure',
        baggage: '1 carry-on + 2 checked bags included',
        boarding: 'Arrive 30 minutes before departure'
      }
    },
    {
      id: 2,
      operator: {
        name: 'Megabus',
        logo: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=100&h=100&fit=crop&crop=center',
        rating: 4.0,
        reviews: 892
      },
      departure: {
        time: '10:15 AM',
        city: 'New York',
        terminal: 'Penn Station'
      },
      arrival: {
        time: '02:30 PM',
        city: 'Boston',
        terminal: 'South Station'
      },
      duration: 255,
      price: 35,
      availableSeats: 8,
      stops: 1,
      amenities: ['wifi', 'power-outlets', 'air-conditioning', 'reclining-seats'],
      routeStops: [
        { city: 'New York, NY', time: '10:15 AM' },
        { city: 'New Haven, CT', time: '12:00 PM' },
        { city: 'Boston, MA', time: '02:30 PM' }
      ],
      policies: {
        cancellation: 'Cancellation fee applies within 24 hours',
        baggage: '1 carry-on included, checked bags extra',
        boarding: 'Arrive 15 minutes before departure'
      }
    },
    {
      id: 3,
      operator: {
        name: 'FlixBus',
        logo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop&crop=center',
        rating: 4.3,
        reviews: 567
      },
      departure: {
        time: '06:45 AM',
        city: 'New York',
        terminal: 'Port Authority'
      },
      arrival: {
        time: '11:15 AM',
        city: 'Boston',
        terminal: 'South Station'
      },
      duration: 270,
      price: 42,
      availableSeats: 15,
      stops: 3,
      amenities: ['wifi', 'power-outlets', 'restroom', 'entertainment', 'air-conditioning'],
      routeStops: [
        { city: 'New York, NY', time: '06:45 AM' },
        { city: 'Stamford, CT', time: '08:00 AM' },
        { city: 'Hartford, CT', time: '09:30 AM' },
        { city: 'Springfield, MA', time: '10:30 AM' },
        { city: 'Boston, MA', time: '11:15 AM' }
      ],
      policies: {
        cancellation: 'Free cancellation up to 15 minutes before departure',
        baggage: '1 carry-on + 1 checked bag included',
        boarding: 'Arrive 20 minutes before departure'
      }
    },
    {
      id: 4,
      operator: {
        name: 'Peter Pan Bus Lines',
        logo: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=100&h=100&fit=crop&crop=center',
        rating: 3.9,
        reviews: 423
      },
      departure: {
        time: '02:30 PM',
        city: 'New York',
        terminal: 'Port Authority'
      },
      arrival: {
        time: '07:00 PM',
        city: 'Boston',
        terminal: 'South Station'
      },
      duration: 270,
      price: 38,
      availableSeats: 6,
      stops: 2,
      amenities: ['wifi', 'power-outlets', 'restroom', 'air-conditioning'],
      routeStops: [
        { city: 'New York, NY', time: '02:30 PM' },
        { city: 'New Haven, CT', time: '04:15 PM' },
        { city: 'Hartford, CT', time: '05:30 PM' },
        { city: 'Boston, MA', time: '07:00 PM' }
      ],
      policies: {
        cancellation: 'Cancellation allowed up to 2 hours before departure',
        baggage: '2 carry-on bags included',
        boarding: 'Arrive 30 minutes before departure'
      }
    },
    {
      id: 5,
      operator: {
        name: 'BoltBus',
        logo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop&crop=center',
        rating: 4.1,
        reviews: 334
      },
      departure: {
        time: '07:15 PM',
        city: 'New York',
        terminal: 'Penn Station'
      },
      arrival: {
        time: '11:45 PM',
        city: 'Boston',
        terminal: 'South Station'
      },
      duration: 270,
      price: 48,
      availableSeats: 18,
      stops: 1,
      amenities: ['wifi', 'power-outlets', 'air-conditioning', 'reclining-seats', 'entertainment'],
      routeStops: [
        { city: 'New York, NY', time: '07:15 PM' },
        { city: 'Hartford, CT', time: '09:00 PM' },
        { city: 'Boston, MA', time: '11:45 PM' }
      ],
      policies: {
        cancellation: 'Free cancellation up to 1 hour before departure',
        baggage: '1 carry-on + 1 checked bag included',
        boarding: 'Arrive 25 minutes before departure'
      }
    }
  ];

  const [buses, setBuses] = useState(mockBuses);
  const [filteredBuses, setFilteredBuses] = useState(mockBuses);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let filtered = [...buses];

    // Apply filters
    if (filters.departureTime.length > 0) {
      filtered = filtered.filter(bus => {
        const hour = parseInt(bus.departure.time.split(':')[0]);
        const isAM = bus.departure.time.includes('AM');
        const hour24 = isAM ? (hour === 12 ? 0 : hour) : (hour === 12 ? 12 : hour + 12);
        
        return filters.departureTime.some(timeSlot => {
          switch (timeSlot) {
            case 'early-morning': return hour24 >= 4 && hour24 < 8;
            case 'morning': return hour24 >= 8 && hour24 < 12;
            case 'afternoon': return hour24 >= 12 && hour24 < 18;
            case 'evening': return hour24 >= 18 && hour24 < 23;
            default: return false;
          }
        });
      });
    }

    if (filters.operators.length > 0) {
      filtered = filtered.filter(bus => 
        filters.operators.includes(bus.operator.name.toLowerCase().replace(/\s+/g, '-'))
      );
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(bus =>
        filters.amenities.every(amenity => bus.amenities.includes(amenity))
      );
    }

    if (filters.priceRange) {
      filtered = filtered.filter(bus =>
        bus.price >= filters.priceRange.min && bus.price <= filters.priceRange.max
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'duration-short':
          return a.duration - b.duration;
        case 'departure-early':
          return a.departure.time.localeCompare(b.departure.time);
        case 'departure-late':
          return b.departure.time.localeCompare(a.departure.time);
        case 'rating-high':
          return b.operator.rating - a.operator.rating;
        default:
          return 0;
      }
    });

    setFilteredBuses(filtered);
  }, [buses, filters, currentSort]);

  const handleSearchUpdate = (newParams) => {
    setSearchParams(newParams);
    setIsLoading(true);
    // Simulate new search
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFilterRemove = (filterKey) => {
    const newFilters = { ...filters };
    if (filterKey === 'priceRange') {
      newFilters.priceRange = { min: 0, max: 200 };
    } else {
      newFilters[filterKey] = [];
    }
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      departureTime: [],
      operators: [],
      amenities: [],
      priceRange: { min: 0, max: 200 }
    });
  };

  const hasActiveFilters = () => {
    return filters.departureTime.length > 0 ||
           filters.operators.length > 0 ||
           filters.amenities.length > 0 ||
           (filters.priceRange && (filters.priceRange.min > 0 || filters.priceRange.max < 200));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              searchParams={searchParams}
              onSearchUpdate={handleSearchUpdate}
            />
          </div>

          {/* Filter Chips */}
          {hasActiveFilters() && (
            <div className="mb-4">
              <FilterChips
                activeFilters={filters}
                onFilterRemove={handleFilterRemove}
                onClearAll={handleClearAllFilters}
              />
            </div>
          )}

          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAllFilters}
                      disabled={!hasActiveFilters()}
                    >
                      Clear All
                    </Button>
                  </div>
                  <FilterSidebar
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    isVisible={true}
                    onToggle={() => {}}
                  />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Mobile Filter Button & Sort */}
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterSidebarOpen(true)}
                  iconName="Filter"
                  iconPosition="left"
                  className="lg:hidden"
                >
                  Filters
                  {hasActiveFilters() && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      {Object.values(filters).flat().length}
                    </span>
                  )}
                </Button>

                <SortDropdown
                  currentSort={currentSort}
                  onSortChange={setCurrentSort}
                  resultCount={filteredBuses.length}
                />
              </div>

              {/* Results */}
              <div className="space-y-4">
                {isLoading ? (
                  <LoadingSkeleton />
                ) : filteredBuses.length > 0 ? (
                  filteredBuses.map((bus) => (
                    <BusCard key={bus.id} bus={bus} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No buses found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleClearAllFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>

              {/* Load More Button */}
              {!isLoading && filteredBuses.length > 0 && (
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    iconName="ChevronDown"
                    iconPosition="right"
                  >
                    Load More Results
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isVisible={isFilterSidebarOpen}
          onToggle={() => setIsFilterSidebarOpen(false)}
        />
      </main>
    </div>
  );
};

export default BusSearchRouteSelection;