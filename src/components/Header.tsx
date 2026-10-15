import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Truck, X } from 'lucide-react';
import { CategoryType } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTracking: () => void;
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTracking,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80">
      {/* Slim Promotional Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 px-4 py-2 text-xs tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-300">SUMMER '26 LAWN</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span>Nationwide Free Delivery on Orders Over PKR 5,000</span>
          </div>
          <div className="flex items-center gap-4 text-stone-300">
            <span className="hidden sm:inline">Cash on Delivery (COD) Across Pakistan</span>
            <button
              onClick={onOpenTracking}
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-xs underline underline-offset-4"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Your Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Bar (Strict 3-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => onSelectCategory('all')}
            className="text-left cursor-pointer group"
          >
            <span className="font-serif-luxury text-2xl sm:text-3xl font-medium tracking-[0.18em] text-stone-900 uppercase block leading-none">
              ZAHRA NOOR
            </span>
            <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-medium mt-1 block">
              Summer Lawn · Lahore
            </span>
          </button>

          {/* Zone 2: 4-5 single-line clean text links with hover underlines */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-700">
            <button
              onClick={() => onSelectCategory('all')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer hover:text-stone-950 ${
                selectedCategory === 'all'
                  ? 'text-stone-950 border-b-2 border-stone-900 font-semibold'
                  : 'hover:border-b-2 hover:border-stone-300'
              }`}
            >
              All Summer Edits
            </button>
            <button
              onClick={() => onSelectCategory('unstitched')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer hover:text-stone-950 ${
                selectedCategory === 'unstitched'
                  ? 'text-stone-950 border-b-2 border-stone-900 font-semibold'
                  : 'hover:border-b-2 hover:border-stone-300'
              }`}
            >
              Unstitched 3-Piece
            </button>
            <button
              onClick={() => onSelectCategory('chikankari')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer hover:text-stone-950 ${
                selectedCategory === 'chikankari'
                  ? 'text-stone-950 border-b-2 border-stone-900 font-semibold'
                  : 'hover:border-b-2 hover:border-stone-300'
              }`}
            >
              Chikankari & Schiffli
            </button>
            <button
              onClick={() => onSelectCategory('festive')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer hover:text-stone-950 ${
                selectedCategory === 'festive'
                  ? 'text-stone-950 border-b-2 border-stone-900 font-semibold'
                  : 'hover:border-b-2 hover:border-stone-300'
              }`}
            >
              Festive Organza
            </button>
            <button
              onClick={() => onSelectCategory('pret')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer hover:text-stone-950 ${
                selectedCategory === 'pret'
                  ? 'text-stone-950 border-b-2 border-stone-900 font-semibold'
                  : 'hover:border-b-2 hover:border-stone-300'
              }`}
            >
              Ready-to-Wear Pret
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Search, Wishlist, Cart Bag) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {showSearchInput ? (
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search lawn, chikankari, silk..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="w-48 sm:w-64 pl-8 pr-8 py-1.5 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 pointer-events-none" />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="absolute right-2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                aria-label="Search Collection"
                className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={onOpenWishlist}
              aria-label="View Saved Items"
              className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors relative cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              aria-label="Shopping Bag"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-stone-900 text-white text-xs font-medium tracking-wide uppercase rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Shopping Bag</span>
              <span className="bg-stone-800 text-amber-300 text-xs font-semibold px-1.5 py-0.5 rounded tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Category Quick Bar */}
      <div className="lg:hidden border-t border-stone-200 overflow-x-auto scrollbar-none px-4 py-2 flex items-center gap-4 bg-white/70">
        <button
          onClick={() => onSelectCategory('all')}
          className={`text-xs whitespace-nowrap shrink-0 py-1 ${
            selectedCategory === 'all' ? 'font-semibold text-stone-900 border-b border-stone-900' : 'text-stone-600'
          }`}
        >
          All Suits
        </button>
        <button
          onClick={() => onSelectCategory('unstitched')}
          className={`text-xs whitespace-nowrap shrink-0 py-1 ${
            selectedCategory === 'unstitched' ? 'font-semibold text-stone-900 border-b border-stone-900' : 'text-stone-600'
          }`}
        >
          Unstitched 3-Pc
        </button>
        <button
          onClick={() => onSelectCategory('chikankari')}
          className={`text-xs whitespace-nowrap shrink-0 py-1 ${
            selectedCategory === 'chikankari' ? 'font-semibold text-stone-900 border-b border-stone-900' : 'text-stone-600'
          }`}
        >
          Chikankari
        </button>
        <button
          onClick={() => onSelectCategory('festive')}
          className={`text-xs whitespace-nowrap shrink-0 py-1 ${
            selectedCategory === 'festive' ? 'font-semibold text-stone-900 border-b border-stone-900' : 'text-stone-600'
          }`}
        >
          Festive Organza
        </button>
        <button
          onClick={() => onSelectCategory('pret')}
          className={`text-xs whitespace-nowrap shrink-0 py-1 ${
            selectedCategory === 'pret' ? 'font-semibold text-stone-900 border-b border-stone-900' : 'text-stone-600'
          }`}
        >
          Ready to Wear
        </button>
        <button
          onClick={() => onSelectCategory('coords')}
          className={`text-xs whitespace-nowrap shrink-0 py-1 ${
            selectedCategory === 'coords' ? 'font-semibold text-stone-900 border-b border-stone-900' : 'text-stone-600'
          }`}
        >
          Co-ord Sets
        </button>
      </div>
    </header>
  );
};
