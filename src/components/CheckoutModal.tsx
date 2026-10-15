import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Truck, CreditCard, Smartphone, Building2 } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { PAKISTANI_CITIES } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  promoCode: string;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  promoCode,
  onOrderSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(PAKISTANI_CITIES[0].name);
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash' | 'easypaisa' | 'bank_transfer' | 'card'>('cod');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);
  const shippingFee = subtotal >= 5000 ? 0 : 250;
  const total = subtotal - discountAmount + shippingFee;

  const selectedCityData = PAKISTANI_CITIES.find((c) => c.name === city) || PAKISTANI_CITIES[0];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your full name';
    if (!phone.trim()) {
      errs.phone = 'Please enter your Pakistani mobile number';
    } else if (!/^((\+92)|(0092)|(0))?3[0-9]{9}$/.test(phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Please enter a valid 11-digit Pakistani number (e.g. 0300-1234567)';
    }
    if (!address.trim()) errs.address = 'Please enter your complete street & house address';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderId = `ZN-PK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const order: OrderDetails = {
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }),
        customerName: name,
        phone,
        city,
        address: `${address}${landmark ? ` (Near ${landmark})` : ''}`,
        paymentMethod,
        items,
        subtotal,
        shipping: shippingFee,
        discount: discountAmount,
        total,
        status: 'Booked',
        courier: city === 'Karachi' || city === 'Lahore' || city === 'Islamabad' ? 'TCS Express Prime' : 'Leopards Courier Overnight',
        estimatedDelivery: selectedCityData.deliveryDays,
      };

      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[94vh] overflow-y-auto relative p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-6 h-6 text-emerald-700" />
          <h2 className="font-serif-luxury text-2xl font-semibold text-stone-900">
            Checkout &amp; Pakistani Doorstep Delivery
          </h2>
        </div>
        <p className="text-xs text-stone-500 mb-6">
          Enjoy swift courier dispatch with nationwide Cash on Delivery (COD) or instant mobile wallet payment.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-1.5">
              1. Customer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Full Recipient Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ayesha Malik"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 ${
                    errors.name ? 'border-red-500 bg-red-50/50' : 'border-stone-300'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  WhatsApp / Mobile Number (for Courier SMS) *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 ${
                    errors.phone ? 'border-red-500 bg-red-50/50' : 'border-stone-300'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-1.5 flex items-center justify-between">
              <span>2. Delivery Address in Pakistan</span>
              <span className="text-[11px] text-amber-800 font-normal lowercase flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Est: {selectedCityData.deliveryDays}
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  City *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white"
                >
                  {PAKISTANI_CITIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} ({c.province})
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Complete Street Address &amp; Sector/Town *
                </label>
                <input
                  type="text"
                  placeholder="e.g. House 42, Street 8, Phase 5, DHA"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 ${
                    errors.address ? 'border-red-500 bg-red-50/50' : 'border-stone-300'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Nearby Landmark / Special Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Opposite Main Park or Call before arrival"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-1.5">
              3. Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* COD Option */}
              <label
                className={`p-3 rounded-md border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-stone-900 bg-amber-50/50 ring-1 ring-stone-900'
                    : 'border-stone-200 hover:border-stone-400 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-stone-900">Cash on Delivery (COD)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                      Most Popular
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Pay the courier in Pakistani Rupees at your door upon inspecting parcel bag.
                  </p>
                </div>
              </label>

              {/* JazzCash / EasyPaisa Option */}
              <label
                className={`p-3 rounded-md border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'jazzcash'
                    ? 'border-stone-900 bg-amber-50/50 ring-1 ring-stone-900'
                    : 'border-stone-200 hover:border-stone-400 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'jazzcash'}
                  onChange={() => setPaymentMethod('jazzcash')}
                  className="mt-1"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-stone-700" />
                    <span className="text-xs font-bold text-stone-900">JazzCash / EasyPaisa</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Transfer instantly via JazzCash or EasyPaisa mobile account wallet.
                  </p>
                </div>
              </label>

              {/* Direct Bank Transfer */}
              <label
                className={`p-3 rounded-md border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-stone-900 bg-amber-50/50 ring-1 ring-stone-900'
                    : 'border-stone-200 hover:border-stone-400 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="mt-1"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-stone-700" />
                    <span className="text-xs font-bold text-stone-900">Online Bank Transfer</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Direct IBAN transfer to Meezan Bank / HBL / Bank Alfalah.
                  </p>
                </div>
              </label>

              {/* Card Option */}
              <label
                className={`p-3 rounded-md border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-stone-900 bg-amber-50/50 ring-1 ring-stone-900'
                    : 'border-stone-200 hover:border-stone-400 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-stone-700" />
                    <span className="text-xs font-bold text-stone-900">Credit / Debit Card</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Secure Visa / Mastercard Pakistani bank payment gateway.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Order Summary Recap */}
          <div className="p-4 bg-stone-100/70 rounded-md space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Items ({items.reduce((a, b) => a + b.quantity, 0)})</span>
              <span className="tabular-nums font-medium text-stone-900">PKR {subtotal.toLocaleString('en-PK')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount ({promoCode})</span>
                <span className="tabular-nums font-medium">- PKR {discountAmount.toLocaleString('en-PK')}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Delivery to {city}</span>
              <span className="tabular-nums font-medium text-stone-900">{shippingFee === 0 ? 'FREE' : 'PKR 250'}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
              <span>Payable Amount</span>
              <span className="tabular-nums text-base">PKR {total.toLocaleString('en-PK')}</span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-stone-900 text-white text-xs font-semibold tracking-wider uppercase rounded hover:bg-stone-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Generating Order Invoice...</span>
              ) : (
                <span>Confirm Order via {paymentMethod.toUpperCase()} (PKR {total.toLocaleString('en-PK')})</span>
              )}
            </button>
            <p className="text-[11px] text-center text-stone-500 mt-2">
              🔒 Safe &amp; verified delivery. Our Lahore dispatch team will call or WhatsApp to confirm before handing to courier.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
