import React, { useState } from 'react';
import { X, Check, Ruler, Truck, ShieldCheck, Heart, Sparkles, Star } from 'lucide-react';
import { Product, StitchingType, SizeType } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, stitching: StitchingType, size?: SizeType, quantity?: number) => void;
  onInstantBuy: (product: Product, stitching: StitchingType, size?: SizeType) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeChart: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onInstantBuy,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeChart,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [stitching, setStitching] = useState<StitchingType>('unstitched');
  const [selectedSize, setSelectedSize] = useState<SizeType>('M');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setStitching(product.category === 'pret' || product.category === 'coords' ? 'stitched_standard' : 'unstitched');
      setQuantity(1);
      setAddedNotice(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const getStitchingFee = (type: StitchingType) => {
    if (type === 'stitched_standard') return 2800;
    if (type === 'stitched_custom') return 3500;
    return 0;
  };

  const finalUnitPrice = product.price + getStitchingFee(stitching);
  const totalPrice = finalUnitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(product, stitching, stitching !== 'unstitched' ? selectedSize : undefined, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const handleBuyNow = () => {
    onInstantBuy(product, stitching, stitching !== 'unstitched' ? selectedSize : undefined);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto relative flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photography Gallery */}
        <div className="md:w-1/2 p-4 sm:p-6 bg-stone-50/70 border-b md:border-b-0 md:border-r border-stone-200">
          <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-stone-200 mb-3 shadow-sm">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-stone-900/90 text-white text-[11px] tracking-wider uppercase font-medium px-2.5 py-1 rounded">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.gallery.length > 1 && (
            <div className="flex gap-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                    (selectedImage || product.image) === img
                      ? 'border-stone-900 ring-1 ring-stone-900'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Fabric meters breakdown */}
          <div className="mt-6 pt-5 border-t border-stone-200/90 space-y-2 text-xs text-stone-600">
            <h4 className="font-semibold uppercase tracking-wider text-stone-800 text-[11px]">
              Box Package Inclusions (3-Piece):
            </h4>
            <div className="grid grid-cols-1 gap-1.5 pl-1">
              <p><strong className="text-stone-900">Shirt:</strong> {product.packageDetails.shirt}</p>
              <p><strong className="text-stone-900">Dupatta:</strong> {product.packageDetails.dupatta}</p>
              <p><strong className="text-stone-900">Trouser:</strong> {product.packageDetails.trouser}</p>
              <p><strong className="text-stone-900">Laces &amp; Borders:</strong> {product.packageDetails.embroideryBorders}</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Metadata & Title */}
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                <span className="uppercase tracking-wider font-semibold text-amber-900">
                  {product.category.toUpperCase()}
                </span>
                <span aria-hidden="true">·</span>
                <span>{product.fabric}</span>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-semibold text-stone-800">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewCount})</span>
                </div>
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-stone-900">
                {product.name}
              </h2>
              <p className="text-xs text-stone-500 mt-1">{product.subtitle}</p>

              {/* Price display with PKR tabular formatting */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold tracking-tight text-stone-900 tabular-nums">
                  PKR {finalUnitPrice.toLocaleString('en-PK')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    PKR {(product.originalPrice + getStitchingFee(stitching)).toLocaleString('en-PK')}
                  </span>
                )}
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                  In Stock · Ready for Dispatch
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Stitching Option Selector */}
            <div className="pt-2 border-t border-stone-200">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 mb-2">
                Stitching &amp; Tailoring Choice:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setStitching('unstitched')}
                  className={`p-2.5 text-left rounded border transition-all cursor-pointer ${
                    stitching === 'unstitched'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                  }`}
                >
                  <p className="text-xs font-semibold">Unstitched</p>
                  <p className="text-[11px] opacity-80">Included in price</p>
                </button>

                <button
                  type="button"
                  onClick={() => setStitching('stitched_standard')}
                  className={`p-2.5 text-left rounded border transition-all cursor-pointer ${
                    stitching === 'stitched_standard'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                  }`}
                >
                  <p className="text-xs font-semibold">Stitched Pret</p>
                  <p className="text-[11px] opacity-80">+PKR 2,800</p>
                </button>

                <button
                  type="button"
                  onClick={() => setStitching('stitched_custom')}
                  className={`p-2.5 text-left rounded border transition-all cursor-pointer ${
                    stitching === 'stitched_custom'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                  }`}
                >
                  <p className="text-xs font-semibold">Custom Laces</p>
                  <p className="text-[11px] opacity-80">+PKR 3,500</p>
                </button>
              </div>
            </div>

            {/* Size Selector (If Stitched is selected) */}
            {stitching !== 'unstitched' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                    Select Size:
                  </label>
                  <button
                    onClick={onOpenSizeChart}
                    className="text-xs text-amber-900 hover:text-stone-900 flex items-center gap-1 font-medium underline underline-offset-4 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>View Pakistani Size Chart</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  {(['XS', 'S', 'M', 'L', 'XL'] as SizeType[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-10 rounded border text-xs font-semibold transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                Quantity:
              </span>
              <div className="flex items-center border border-stone-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 text-sm font-semibold"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-semibold text-stone-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 text-sm font-semibold"
                >
                  +
                </button>
              </div>

              <div className="text-xs text-stone-500 tabular-nums">
                Subtotal: <strong>PKR {totalPrice.toLocaleString('en-PK')}</strong>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-6 border-t border-stone-200 space-y-3">
            {addedNotice && (
              <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded flex items-center gap-2 border border-emerald-200 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Added to your shopping bag successfully!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAdd}
                className="w-full py-3 px-4 bg-white border border-stone-900 text-stone-900 text-xs font-semibold tracking-wider uppercase rounded hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Add to Shopping Bag
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 px-4 bg-stone-900 text-white text-xs font-semibold tracking-wider uppercase rounded hover:bg-stone-800 transition-colors cursor-pointer shadow-sm"
              >
                Buy Now (Cash on Delivery)
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-stone-400" />
                <span>Free delivery over PKR 5,000</span>
              </div>
              <button
                onClick={() => onToggleWishlist(product)}
                className="flex items-center gap-1 text-stone-600 hover:text-amber-800 cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-amber-700 text-amber-700' : ''}`} />
                <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
