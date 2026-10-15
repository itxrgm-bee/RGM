import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-amber-800 fill-amber-800" />
          <h2 className="font-serif-luxury text-2xl font-semibold text-stone-900">
            Saved Summer Favorites ({wishlist.length})
          </h2>
        </div>
        <p className="text-xs text-stone-500 mb-6">
          Your shortlisted unstitched lawn and ready-to-wear pieces for Summer '26.
        </p>

        {wishlist.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <Heart className="w-12 h-12 text-stone-300 mx-auto" />
            <p className="text-sm font-medium text-stone-700">No suits in your wishlist yet</p>
            <p className="text-xs text-stone-400">Click the heart icon on any design to save it for later.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100 max-h-[60vh] overflow-y-auto pr-1">
            {wishlist.map((item) => (
              <div key={item.id} className="py-4 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-20 object-cover object-top rounded bg-stone-100 shrink-0"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-stone-900 line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-stone-500">{item.fabric}</p>
                  <p className="text-xs font-bold text-stone-950 mt-1 tabular-nums">
                    PKR {item.price.toLocaleString('en-PK')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectProduct(item);
                    }}
                    className="px-3 py-1.5 bg-stone-900 text-white text-xs font-semibold rounded hover:bg-stone-800 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>View Suit</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(item)}
                    aria-label="Remove item"
                    className="p-1.5 text-stone-400 hover:text-red-700 rounded transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-100 text-stone-800 text-xs font-semibold rounded hover:bg-stone-200 transition-colors cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
