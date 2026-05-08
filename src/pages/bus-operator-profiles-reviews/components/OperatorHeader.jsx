import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OperatorHeader = ({ operator }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="StarHalf" size={16} className="text-warning fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-border" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Operator Info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={operator.logo}
                alt={`${operator.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-xl lg:text-2xl font-bold text-foreground">
                  {operator.name}
                </h1>
                {operator.isVerified && (
                  <div className="bg-success/10 text-success px-2 py-1 rounded-full flex items-center gap-1">
                    <Icon name="BadgeCheck" size={14} />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  {renderStars(operator.rating)}
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {operator.rating}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({operator.totalReviews.toLocaleString()} reviews)
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={14} />
                  <span>{operator.headquarters}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  <span>Est. {operator.established}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Bus" size={14} />
                  <span>{operator.fleetSize} buses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 lg:flex-col lg:items-end">
            <div className="text-right hidden lg:block">
              <div className="text-2xl font-bold text-success">
                {operator.onTimePerformance}%
              </div>
              <div className="text-xs text-muted-foreground">On-time</div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                <Icon name="Heart" size={20} />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                <Icon name="Share2" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile On-time Performance */}
        <div className="lg:hidden mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">On-time Performance</span>
            <span className="text-lg font-bold text-success">{operator.onTimePerformance}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorHeader;