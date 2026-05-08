import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Secured'
    },
    {
      icon: 'Lock',
      text: 'Privacy Protected'
    },
    {
      icon: 'Users',
      text: '50K+ Happy Travelers'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        {trustFeatures.map((feature, index) => (
          <div key={index} className="flex items-center space-x-1">
            <Icon name={feature.icon} size={12} />
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 underline">
            Terms of Service
          </button>
          {' '}and{' '}
          <button className="text-primary hover:text-primary/80 underline">
            Privacy Policy
          </button>
        </p>
      </div>
      
      <div className="mt-3 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} TravelHub. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;