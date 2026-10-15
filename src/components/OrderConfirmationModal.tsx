import React from 'react';
import { CheckCircle2, Truck, Package, PhoneCall, Copy, ArrowRight, X } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderConfirmationModalProps {
  order: OrderDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  isOpen,
  onClose,
  onTrackOrder,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !order) return null;

  const copyTracking = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-stone-900">
            Shukriya, {order.customerName}!
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Your Summer Lawn '26 order has been confirmed. Our team in Lahore is preparing your parcel for quality check and courier handover.
          </p>
        </div>

        {/* Order Reference Box */}
        <div className="mt-6 p-4 bg-stone-50 border border-stone-200 rounded-md">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500 uppercase tracking-wider font-semibold">Order Tracking ID:</span>
            <button
              onClick={copyTracking}
              className="text-stone-700 hover:text-stone-950 flex items-center gap-1 font-mono font-bold text-sm cursor-pointer"
            >
              <span>{order.orderId}</span>
              <Copy className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>
          {copied && <p className="text-[10px] text-emerald-600 text-right mt-1">Copied to clipboard!</p>}

          <div className="mt-3 pt-3 border-t border-stone-200 grid grid-cols-2 gap-2 text-xs text-stone-600">
            <div>
              <span className="text-stone-400">Payment:</span>{' '}
              <strong className="text-stone-900 uppercase">{order.paymentMethod}</strong>
            </div>
            <div>
              <span className="text-stone-400">City:</span>{' '}
              <strong className="text-stone-900">{order.city}</strong>
            </div>
            <div>
              <span className="text-stone-400">Courier:</span>{' '}
              <strong className="text-stone-900">{order.courier}</strong>
            </div>
            <div>
              <span className="text-stone-400">Est. Dispatch:</span>{' '}
              <strong className="text-stone-900">{order.estimatedDelivery}</strong>
            </div>
          </div>
        </div>

        {/* Itemized Recap */}
        <div className="mt-4 max-h-48 overflow-y-auto divide-y divide-stone-100 text-xs">
          {order.items.map((item) => (
            <div key={item.id} className="py-2.5 flex justify-between items-center">
              <div>
                <p className="font-semibold text-stone-900">{item.product.name}</p>
                <p className="text-[11px] text-stone-500">
                  {item.stitching === 'unstitched'
                    ? 'Unstitched'
                    : `Stitched (${item.size})`} · Qty: {item.quantity}
                </p>
              </div>
              <span className="font-semibold tabular-nums text-stone-900">
                PKR {(item.pricePerUnit * item.quantity).toLocaleString('en-PK')}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-4 pt-3 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-950">
          <span>Total Payable on Delivery:</span>
          <span className="tabular-nums text-base">PKR {order.total.toLocaleString('en-PK')}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2">
          <button
            onClick={() => onTrackOrder(order.orderId)}
            className="w-full py-3 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>Track Live Delivery Status</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-stone-100 text-stone-800 text-xs font-semibold rounded hover:bg-stone-200 transition-colors cursor-pointer"
          >
            Continue Browsing Collection
          </button>
        </div>
      </div>
    </div>
  );
};
