import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ReviewsTab = ({ operator }) => {
  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState('all');

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="Star"
          size={14}
          className={i <= rating ? "text-warning fill-current" : "text-border"}
        />
      );
    }
    return stars;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="text-center lg:text-left">
            <div className="text-4xl font-bold text-foreground mb-2">{operator.rating}</div>
            <div className="flex items-center justify-center lg:justify-start gap-1 mb-2">
              {renderStars(Math.floor(operator.rating))}
            </div>
            <div className="text-sm text-muted-foreground">
              Based on {operator.totalReviews.toLocaleString()} reviews
            </div>
          </div>
          
          <div className="space-y-2">
            {operator.ratingBreakdown.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-8">{item.stars}★</span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-warning h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          className="sm:w-48"
        />
        <Select
          label="Filter by rating"
          options={ratingOptions}
          value={filterRating}
          onChange={setFilterRating}
          className="sm:w-48"
        />
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {operator.reviews.map((review) => (
          <div key={review.id} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-muted rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-foreground">{review.userName}</span>
                  {review.isVerified && (
                    <div className="bg-success/10 text-success px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Icon name="BadgeCheck" size={12} />
                      <span className="text-xs">Verified</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(review.date)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {review.route}
                  </span>
                </div>
                
                <p className="text-foreground mb-4 leading-relaxed">
                  {review.comment}
                </p>
                
                {review.photos && review.photos.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {review.photos.map((photo, index) => (
                      <div key={index} className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Review photo ${index + 1}`}
                          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review.helpfulCount})</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="ThumbsDown" size={14} />
                    <span>Not helpful ({review.notHelpfulCount})</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="Flag" size={14} />
                    <span>Report</span>
                  </button>
                </div>
                
                {review.operatorResponse && (
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Building2" size={16} className="text-primary" />
                      <span className="font-medium text-foreground">Response from {operator.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review.operatorResponse.date)}
                      </span>
                    </div>
                    <p className="text-foreground text-sm leading-relaxed">
                      {review.operatorResponse.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default ReviewsTab;