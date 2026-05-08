import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistrationLogin from "pages/user-registration-login";
import MobileTicketDisplay from "pages/mobile-ticket-display";
import UserDashboardBookingManagement from "pages/user-dashboard-booking-management";
import BusSearchRouteSelection from "pages/bus-search-route-selection";
import InteractiveSeatSelection from "pages/interactive-seat-selection";
import BusOperatorProfilesReviews from "pages/bus-operator-profiles-reviews";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<BusSearchRouteSelection />} />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="/mobile-ticket-display" element={<MobileTicketDisplay />} />
        <Route path="/user-dashboard-booking-management" element={<UserDashboardBookingManagement />} />
        <Route path="/bus-search-route-selection" element={<BusSearchRouteSelection />} />
        <Route path="/interactive-seat-selection" element={<InteractiveSeatSelection />} />
        <Route path="/bus-operator-profiles-reviews" element={<BusOperatorProfilesReviews />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;