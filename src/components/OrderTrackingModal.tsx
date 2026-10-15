import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, Package, MapPin } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrder?: OrderDetails | null;
  initialOrderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  activeOrder,
  initialOrderId,
}) => {
  const [searchId, setSearchId] = useState(initialOrderId || activeOrder?.orderId || 'ZN-PK-2026-8492');
  const [trackedData, setTrackedData] = useState<any>(null);

  React.useEffect(() => {
    if (initialOrderId) {
      setSearchId(initialOrderId);
      handleTrack(initialOrderId);
    } else if (activeOrder) {
      setSearchId(activeOrder.orderId);
      handleTrack(activeOrder.orderId);
    } else {
      handleTrack('ZN-PK-2026-8492');
    }
  }, [isOpen, initialOrderId, activeOrder]);

  if (!isOpen) return null;

  const handleTrack = (idToSearch: string) => {
    const trimmed = idToSearch.trim().toUpperCase();
    if (!trimmed) return;

    if (activeOrder && activeOrder.orderId === trimmed) {
      setTrackedData({
        id: activeOrder.orderId,
        customer: activeOrder.customerName,
        city: activeOrder.city,
        courier: activeOrder.courier,
        step: 2, // Dispatched
        date: activeOrder.date,
        itemsCount: activeOrder.items.length,
        total: activeOrder.total,
        statusText: 'Dispatched from Lahore Central Hub via TCS Express Prime',
      });
    } else {
      // Demo order status for prefilled ID
      setTrackedData({
        id: trimmed,
        customer: 'Mariam Jahangir',
        city: 'Gulberg 3, Lahore',
        courier: 'TCS Overnight Air Express',
        step: 3, // Out for Delivery
        date: 'Today, 8:30 AM',
        itemsCount: 2,
        total: 25800,
        statusText: 'Out for Delivery with Rider Muhammad Rizwan (+92 321-9876543)',
      });
    }
  };

  const steps = [
    { title: 'Order Booked', desc: 'Order verified & payment terms confirmed' },
    { title: 'Quality Inspection', desc: 'Fabric cuts, embroidery & borders checked in Lahore' },
    { title: 'Dispatched with Courier', desc: 'Handed over to TCS / Leopards Express Hub' },
    { title: 'Out for Delivery', desc: 'Rider en route to delivery address' },
    { title: 'Delivered & COD Received', desc: 'Parcel safely delivered at doorstep' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Truck className="w-6 h-6 text-amber-800" />
          <h2 className="font-serif-luxury text-2xl font-semibold text-stone-900">
            Track Pakistani Summer Lawn Delivery
          </h2>
        </div>
        <p className="text-xs text-stone-500 mb-6">
          Enter your 10-digit Zahra Noor Order ID (e.g. ZN-PK-2026-8492) to view live courier transit status.
        </p>

        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. ZN-PK-2026-8492"
              className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 uppercase font-mono"
            />
          </div>
          <button
            onClick={() => handleTrack(searchId)}
            className="px-5 py-2 bg-stone-900 text-white text-xs font-semibold rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Track
          </button>
        </div>

        {trackedData && (
          <div className="space-y-6">
            {/* Status Summary Banner */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-md">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-stone-500">Order ID: </span>
                  <span className="font-mono font-bold text-stone-900">{trackedData.id}</span>
                </div>
                <div>
                  <span className="text-stone-500">Destination: </span>
                  <span className="font-semibold text-stone-900">{trackedData.city}</span>
                </div>
                <div>
                  <span className="text-stone-500">Courier: </span>
                  <span className="font-semibold text-stone-900">{trackedData.courier}</span>
                </div>
              </div>
              <p className="mt-2 text-xs font-medium text-amber-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>{trackedData.statusText}</span>
              </p>
            </div>

            {/* Stepper Timeline */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
              {steps.map((st, idx) => {
                const isPassed = idx <= trackedData.step;
                const isCurrent = idx === trackedData.step;

                return (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div
                      className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-amber-800 text-white ring-4 ring-amber-100'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>
                    <div>
                      <h4
                        className={`text-xs font-bold ${
                          isCurrent ? 'text-amber-900' : isPassed ? 'text-stone-900' : 'text-stone-400'
                        }`}
                      >
                        {st.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Need help with delivery? WhatsApp: <strong>+92 300 8472911</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
