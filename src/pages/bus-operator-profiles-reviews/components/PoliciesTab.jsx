import React from 'react';
import Icon from '../../../components/AppIcon';

const PoliciesTab = ({ operator }) => {
  const policyCategories = [
    {
      title: 'Booking & Cancellation',
      icon: 'Calendar',
      policies: operator.policies.booking
    },
    {
      title: 'Baggage & Luggage',
      icon: 'Package',
      policies: operator.policies.baggage
    },
    {
      title: 'Travel & Safety',
      icon: 'Shield',
      policies: operator.policies.travel
    },
    {
      title: 'Payment & Refunds',
      icon: 'CreditCard',
      policies: operator.policies.payment
    }
  ];

  return (
    <div className="space-y-6">
      {policyCategories.map((category, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name={category.icon} size={20} />
            {category.title}
          </h3>
          
          <div className="space-y-4">
            {category.policies.map((policy, policyIndex) => (
              <div key={policyIndex} className="border-l-4 border-primary/20 pl-4">
                <h4 className="font-medium text-foreground mb-2">{policy.title}</h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  {policy.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start gap-2">
                      <Icon name="ChevronRight" size={14} className="mt-0.5 text-primary flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
                {policy.note && (
                  <div className="mt-3 p-3 bg-warning/10 text-warning rounded-lg">
                    <div className="flex items-start gap-2">
                      <Icon name="AlertTriangle" size={16} className="mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{policy.note}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Terms & Conditions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="FileText" size={20} />
          Terms & Conditions
        </h3>
        
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p className="mb-4">
            By booking with {operator.name}, you agree to the following terms and conditions. 
            Please read carefully before making your reservation.
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Passenger Responsibilities</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Arrive at the boarding point at least 15 minutes before departure</li>
                <li>Carry valid government-issued photo identification</li>
                <li>Follow all safety instructions provided by the crew</li>
                <li>Respect other passengers and maintain appropriate behavior</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-2">Operator Rights</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Right to refuse service to passengers under influence of alcohol or drugs</li>
                <li>Authority to remove disruptive passengers without refund</li>
                <li>Right to modify routes due to weather or road conditions</li>
                <li>Authority to cancel services with appropriate notice and full refund</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-foreground font-medium mb-1">Last Updated</p>
              <p className="text-muted-foreground">
                These terms were last updated on {operator.policies.lastUpdated}. 
                We recommend reviewing them periodically for any changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesTab;