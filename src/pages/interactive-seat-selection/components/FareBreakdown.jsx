import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FareBreakdown = ({ 
  selectedSeats = [], 
  baseFare = 25, 
  seatPricing = {}, 
  taxes = 0,
  discount = 0,
  promoCode = null,
  onPromoCodeApply
}) => {
  const calculateSeatCharges = () => {
    return selectedSeats.reduce((total, seat) => {
      const extraCharge = seatPricing[seat.type] || 0;
      return total + extraCharge;
    }, 0);
  };

  const calculateSubtotal = () => {
    const seatsTotal = selectedSeats.length * baseFare;
    const seatCharges = calculateSeatCharges();
    return seatsTotal + seatCharges;
  };

  const calculateTaxes = () => {
    const subtotal = calculateSubtotal();
    return Math.round(subtotal * 0.12); // 12% tax
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = calculateTaxes();
    return subtotal + taxAmount - discount;
  };

  const [promoCodeInput, setPromoCodeInput] = React.useState('');
  const [isApplyingPromo, setIsApplyingPromo] = React.useState(false);

  const handlePromoCodeSubmit = async (e) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    
    setIsApplyingPromo(true);
    // Simulate API call
    setTimeout(() => {
      if (onPromoCodeApply) {
        onPromoCodeApply(promoCodeInput);
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
      <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Icon name="Receipt" size={20} />
        <span>Fare Breakdown</span>
      </h3>

      {selectedSeats.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Armchair" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Select seats to view fare breakdown</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Selected Seats Details */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Selected Seats ({selectedSeats.length})</h4>
            <div className="space-y-2">
              {selectedSeats.map((seat, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Seat {seat.number}</span>
                    {seat.type !== 'regular' && (
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
                        {seat.type}
                      </span>
                    )}
                  </div>
                  <span className="font-medium">
                    ${baseFare + (seatPricing[seat.type] || 0)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            {/* Base Fare */}
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-muted-foreground">Base Fare ({selectedSeats.length} × ${baseFare})</span>
              <span className="font-medium">${selectedSeats.length * baseFare}</span>
            </div>

            {/* Seat Charges */}
            {calculateSeatCharges() > 0 && (
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-muted-foreground">Seat Charges</span>
                <span className="font-medium">+${calculateSeatCharges()}</span>
              </div>
            )}

            {/* Taxes */}
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-muted-foreground">Taxes & Fees</span>
              <span className="font-medium">+${calculateTaxes()}</span>
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-success">Discount Applied</span>
                <span className="font-medium text-success">-${discount}</span>
              </div>
            )}

            {/* Promo Code Section */}
            {!promoCode && (
              <div className="my-4 p-3 bg-muted/30 rounded-lg">
                <form onSubmit={handlePromoCodeSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="submit"
                    disabled={!promoCodeInput.trim() || isApplyingPromo}
                    className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isApplyingPromo ? (
                      <Icon name="Loader2" size={16} className="animate-spin" />
                    ) : (
                      'Apply'
                    )}
                  </button>
                </form>
              </div>
            )}

            {promoCode && (
              <div className="flex justify-between items-center text-sm mb-2 p-2 bg-success/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Tag" size={14} className="text-success" />
                  <span className="text-success font-medium">{promoCode}</span>
                </div>
                <span className="text-success font-medium">Applied</span>
              </div>
            )}

            {/* Total */}
            <div className="border-t border-border pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Total Amount</span>
                <span className="text-xl font-bold text-primary">${calculateTotal()}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods Preview */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Accepted Payment Methods</h4>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Icon name="CreditCard" size={16} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Cards</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Smartphone" size={16} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">UPI</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Wallet" size={16} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Wallets</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Building2" size={16} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Net Banking</span>
              </div>
            </div>
          </div>

          {/* Savings Info */}
          {discount > 0 && (
            <div className="p-3 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">
                  You saved ${discount} on this booking!
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FareBreakdown;