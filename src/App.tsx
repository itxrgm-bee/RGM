/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { SizeChartModal } from './components/SizeChartModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { WishlistModal } from './components/WishlistModal';
import { FabricStory } from './components/FabricStory';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CategoryType, StitchingType, SizeType, CartItem, OrderDetails } from './types';
import { SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation & Filtering State
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string>('');

  // Checkout Data
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState<string>('');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [isOrderConfirmedOpen, setIsOrderConfirmedOpen] = useState(false);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Fabric filter
      if (selectedFabric !== 'all') {
        if (!product.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchSubtitle = product.subtitle.toLowerCase().includes(q);
        const matchFabric = product.fabric.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        if (!matchName && !matchSubtitle && !matchFabric && !matchDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // featured default
    });
  }, [selectedCategory, selectedFabric, searchQuery, sortBy]);

  // Cart Operations
  const handleAddToCart = (
    product: Product,
    stitching: StitchingType,
    size?: SizeType,
    quantity: number = 1
  ) => {
    const stitchingFee = stitching === 'stitched_standard' ? 2800 : stitching === 'stitched_custom' ? 3500 : 0;
    const pricePerUnit = product.price + stitchingFee;
    const cartItemId = `${product.id}-${stitching}-${size || 'unstitched'}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          stitching,
          size,
          quantity,
          pricePerUnit,
        },
      ];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleInstantBuy = (product: Product, stitching: StitchingType, size?: SizeType) => {
    handleAddToCart(product, stitching, size, 1);
    setIsProductModalOpen(false);
    setIsCartOpen(false);
    setCheckoutDiscount(0);
    setCheckoutPromoCode('');
    setIsCheckoutOpen(true);
  };

  // Wishlist Operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Checkout Operations
  const handleProceedToCheckout = (discountAmount: number, promoCode: string) => {
    setCheckoutDiscount(discountAmount);
    setCheckoutPromoCode(promoCode);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    setConfirmedOrder(order);
    setCartItems([]); // clear cart
    setIsCheckoutOpen(false);
    setIsOrderConfirmedOpen(true);
  };

  const handleTrackOrderFromConfirmation = (orderId: string) => {
    setIsOrderConfirmedOpen(false);
    setTrackingOrderId(orderId);
    setIsTrackingOpen(true);
  };

  // Product Selection
  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      {/* Top Header */}
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracking={() => {
          setTrackingOrderId('');
          setIsTrackingOpen(true);
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('collection-grid');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Campaign Hero */}
      <Hero
        onExplore={(category) => {
          setSelectedCategory(category);
          const el = document.getElementById('collection-grid');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Catalog Section */}
      <main id="collection-grid" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Section Heading & Category Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-amber-900 uppercase">
              <span>Summer Lawn 2026</span>
              <span aria-hidden="true">·</span>
              <span>Volume 01</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 mt-1">
              {selectedCategory === 'all'
                ? 'The Summer Edit · All Lawn & Pret'
                : selectedCategory === 'unstitched'
                ? 'Unstitched 3-Piece Luxury Lawn'
                : selectedCategory === 'chikankari'
                ? 'Chikankari & Schiffli Needlework'
                : selectedCategory === 'festive'
                ? 'Festive Organza & Tilla Lawn'
                : selectedCategory === 'coords'
                ? 'Breezy Cambric 2-Piece Co-ords'
                : 'Ready-to-Wear Stitched Pret'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              100% pure Swiss cotton lawn with embroidered resham borders and pure silk dupattas.
              Nationwide Cash on Delivery (COD) across Pakistan.
            </p>
          </div>

          {/* Result Count */}
          <div className="text-xs text-stone-500 font-medium tabular-nums">
            Showing <strong>{filteredProducts.length}</strong> summer designs
          </div>
        </div>

        {/* Filter Bar: Category Tabs, Fabric Pill, Sort Options */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4">
          {/* Category Filter Buttons (Functional Segmented Controls) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/60 rounded-md">
            {[
              { id: 'all', label: 'All Suits' },
              { id: 'unstitched', label: 'Unstitched 3-Pc' },
              { id: 'chikankari', label: 'Chikankari' },
              { id: 'festive', label: 'Festive Organza' },
              { id: 'pret', label: 'Luxury Pret' },
              { id: 'coords', label: 'Co-ord Sets' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as CategoryType)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-300/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Secondary Controls: Fabric Filter & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Fabric Selector */}
            <div className="flex items-center gap-1.5 text-xs text-stone-700">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <label htmlFor="fabric-select" className="font-medium">Fabric:</label>
              <select
                id="fabric-select"
                value={selectedFabric}
                onChange={(e) => setSelectedFabric(e.target.value)}
                className="bg-white border border-stone-300 rounded px-2.5 py-1 text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
              >
                <option value="all">All Fabrics</option>
                <option value="swiss lawn">Pure Swiss Lawn</option>
                <option value="schiffli">Schiffli Lawn</option>
                <option value="chikankari">Chikankari Cotton</option>
                <option value="organza">Organza / Jacquard</option>
                <option value="cambric">Breezy Cambric</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-stone-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <label htmlFor="sort-select" className="font-medium">Sort:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-300 rounded px-2.5 py-1 text-xs focus:ring-1 focus:ring-stone-900 focus:outline-none"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid: 3-column desktop layout with generous gap-8 */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="text-base font-serif-luxury text-stone-800">
              No summer suits found matching your selected filters.
            </p>
            <p className="text-xs text-stone-500">
              Try adjusting your search query or selecting "All Suits".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedFabric('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded hover:bg-stone-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={handleOpenProduct}
                isWishlisted={wishlist.some((p) => p.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}
      </main>

      {/* Educational & Craftsmanship Story: The Art of Pakistani Lawn */}
      <FabricStory />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('collection-grid');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTracking={() => {
          setTrackingOrderId('');
          setIsTrackingOpen(true);
        }}
        onOpenSizeChart={() => setIsSizeChartOpen(true)}
      />

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
        isWishlisted={selectedProduct ? wishlist.some((p) => p.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeChart={() => setIsSizeChartOpen(true)}
      />

      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountAmount={checkoutDiscount}
        promoCode={checkoutPromoCode}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        isOpen={isOrderConfirmedOpen}
        onClose={() => setIsOrderConfirmedOpen(false)}
        onTrackOrder={handleTrackOrderFromConfirmation}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        activeOrder={confirmedOrder}
        initialOrderId={trackingOrderId}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectProduct={handleOpenProduct}
      />
    </div>
  );
}
