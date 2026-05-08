import React from 'react';
import Icon from '../AppIcon';

const BookingProgress = ({ currentStep = 1, totalSteps = 4 }) => {
  const steps = [
    { id: 1, label: 'Search', icon: 'Search' },
    { id: 2, label: 'Seats', icon: 'Armchair' },
    { id: 3, label: 'Payment', icon: 'CreditCard' },
    { id: 4, label: 'Confirm', icon: 'CheckCircle' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex items-center">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                      ${status === 'completed'
                        ? 'bg-success text-success-foreground'
                        : status === 'current' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                      }
                    `}
                  >
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step.icon} size={16} />
                    )}
                  </div>
                  
                  {/* Step Label - Hidden on mobile */}
                  <span
                    className={`
                      ml-2 text-sm font-medium hidden sm:block
                      ${status === 'current' ?'text-foreground'
                        : status === 'completed' ?'text-success' :'text-muted-foreground'
                      }
                    `}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div className="flex-1 mx-2 sm:mx-4">
                    <div
                      className={`
                        h-0.5 transition-all duration-300
                        ${status === 'completed'
                          ? 'bg-success' :'bg-border'
                        }
                      `}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Step Numbers */}
        <div className="sm:hidden mt-2 text-center">
          <span className="text-xs text-muted-foreground">
            Step {currentStep} of {totalSteps}: {steps[currentStep - 1]?.label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingProgress;