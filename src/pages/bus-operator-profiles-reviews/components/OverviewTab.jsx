import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OverviewTab = ({ operator }) => {
  return (
    <div className="space-y-8">
      {/* Fleet Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Bus" size={20} />
          Fleet Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-foreground">{operator.fleetSize}</div>
            <div className="text-sm text-muted-foreground">Total Buses</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-foreground">{operator.averageAge}</div>
            <div className="text-sm text-muted-foreground">Average Age (years)</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-foreground">{operator.routes}</div>
            <div className="text-sm text-muted-foreground">Active Routes</div>
          </div>
        </div>
      </div>

      {/* Safety Certifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Shield" size={20} />
          Safety & Certifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {operator.certifications.map((cert, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-success/20 text-success rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={16} />
              </div>
              <div>
                <div className="font-medium text-foreground">{cert.name}</div>
                <div className="text-sm text-muted-foreground">Valid until {cert.validUntil}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Star" size={20} />
          Amenities & Features
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {operator.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
              <Icon name={amenity.icon} size={16} className="text-primary" />
              <span className="text-sm text-foreground">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Route Map */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Map" size={20} />
          Route Network
        </h3>
        
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Operator Route Network"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.7128,-74.0060&z=8&output=embed"
            className="border-0"
          />
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Popular Routes</h4>
            <div className="space-y-2">
              {operator.popularRoutes.map((route, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span className="text-sm text-foreground">{route.from} → {route.to}</span>
                  <span className="text-xs text-muted-foreground">{route.frequency}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Coverage Areas</h4>
            <div className="flex flex-wrap gap-2">
              {operator.coverageAreas.map((area, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Camera" size={20} />
          Bus Interior & Amenities
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {operator.gallery.map((photo, index) => (
            <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;