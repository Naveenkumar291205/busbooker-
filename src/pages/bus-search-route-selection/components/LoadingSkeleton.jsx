import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Operator Info Skeleton */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-muted rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>
            </div>

            {/* Journey Details Skeleton */}
            <div className="flex items-center space-x-6 lg:space-x-8">
              {/* Departure */}
              <div className="text-center space-y-1">
                <div className="h-6 bg-muted rounded w-16"></div>
                <div className="h-3 bg-muted rounded w-12"></div>
                <div className="h-3 bg-muted rounded w-20"></div>
              </div>

              {/* Journey Info */}
              <div className="flex flex-col items-center space-y-1">
                <div className="h-3 bg-muted rounded w-12"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                  <div className="w-16 h-0.5 bg-muted"></div>
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                </div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>

              {/* Arrival */}
              <div className="text-center space-y-1">
                <div className="h-6 bg-muted rounded w-16"></div>
                <div className="h-3 bg-muted rounded w-12"></div>
                <div className="h-3 bg-muted rounded w-20"></div>
              </div>
            </div>

            {/* Price & Booking Skeleton */}
            <div className="flex items-center justify-between lg:flex-col lg:items-end lg:space-y-2">
              <div className="text-right space-y-1">
                <div className="h-8 bg-muted rounded w-16"></div>
                <div className="h-3 bg-muted rounded w-12"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>
              <div className="h-10 bg-muted rounded w-32"></div>
            </div>
          </div>

          {/* Amenities Skeleton */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-12"></div>
                </div>
              ))}
            </div>
            <div className="h-8 bg-muted rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;