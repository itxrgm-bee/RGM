import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Check, Tag } from 'lucide-react';
import { CartItem } from '../types';
import { PROMO_CODES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: (discountAmount: number, promoCodeApplied: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);
  const freeShippingThreshold = 5000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Promo Calculation
  let discountAmount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo];
    if (subtotal >= promo.minSpend) {
      discountAmount = Math.round((subtotal * promo.discountPercent) / 100);
    }
  }

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      const p = PROMO_CODES[code];
      if (subtotal < p.minSpend) {
        setPromoError(`Minimum spend of PKR ${p.minSpend.toLocaleString('en-PK')} required for this code.`);
      } else {
        setAppliedPromo(code);
        setPromoError(null);
      }
    } else {
      setPromoError('Invalid coupon code. Try SUMMER10 or WELCOME5.');
    }
  };

  const handleCheckoutClick = () => {
    onProceedToCheckout(discountAmount, appliedPromo || '');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="font-serif-luxury text-xl font-semibold text-stone-900">
                Shopping Bag ({items.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3 bg-amber-50/60 border-b border-amber-200/50 text-xs">
            {remainingForFreeShipping === 0 ? (
              <p className="text-emerald-800 font-medium flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Congratulations! You qualify for <strong>FREE Delivery</strong> across Pakistan!</span>
              </p>
            ) : (
              <div>
                <p className="text-stone-700">
                  Add <strong>PKR {remainingForFreeShipping.toLocaleString('en-PK')}</strong> more for FREE nationwide delivery!
                </p>
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-amber-800 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Itemized List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300" />
                <h3 className="font-serif-luxury text-lg font-medium text-stone-800">Your bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs">
                  Explore our Summer Lawn '26 collection to add handcrafted Pakistani unstitched and ready-to-wear suits.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-stone-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover object-top rounded bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-stone-500 mt-0.5">
                        {item.stitching === 'unstitched'
                          ? 'Unstitched 3-Pc Fabric'
                          : item.stitching === 'stitched_standard'
                          ? `Stitched Pret · Size ${item.size}`
                          : `Custom Bespoke Tailoring · Size ${item.size}`}
                      </p>

                      <p className="text-xs font-semibold text-stone-900 mt-1 tabular-nums">
                        PKR {item.pricePerUnit.toLocaleString('en-PK')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-300 rounded text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-semibold tabular-nums text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-stone-900 tabular-nums">
                        PKR {(item.pricePerUnit * item.quantity).toLocaleString('en-PK')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-stone-200 bg-stone-50/50 space-y-4">
              {/* Promo Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. SUMMER10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:outline-none uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 text-white text-xs font-semibold rounded hover:bg-stone-900 transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoError && (
                <p className="text-[11px] text-red-600">{promoError}</p>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 rounded border border-emerald-200">
                  <span>{PROMO_CODES[appliedPromo]?.label} ({appliedPromo})</span>
                  <button
                    onClick={() => {
                      setAppliedPromo(null);
                      setPromoInput('');
                    }}
                    className="text-stone-500 hover:text-stone-900 underline text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold text-stone-900">
                    PKR {subtotal.toLocaleString('en-PK')}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="tabular-nums font-semibold">
                      - PKR {discountAmount.toLocaleString('en-PK')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Nationwide Shipping</span>
                  <span className="tabular-nums font-semibold text-stone-900">
                    {subtotal >= freeShippingThreshold ? 'FREE' : 'PKR 250'}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-stone-950 pt-2 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="tabular-nums">
                    PKR {(subtotal - discountAmount + (subtotal >= freeShippingThreshold ? 0 : 250)).toLocaleString('en-PK')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 bg-stone-900 text-white text-xs font-semibold tracking-wider uppercase rounded hover:bg-stone-800 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-md"
              >
                <span>Proceed to Cash on Delivery / Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-[11px] text-center text-stone-500">
                Cash on Delivery (COD) · JazzCash · EasyPaisa · Direct Bank Transfer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
