import React from 'react';
import { Heart, Eye, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  isWishlisted,
  onToggleWishlist,
}) => {
  return (
    <div className="group relative flex flex-col bg-white border border-stone-200/90 rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Product Image Container (65-75% height) */}
      <div className="relative aspect-[3/4] w-full bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle unboxed badge on image top-left */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-stone-900/85 text-stone-100 text-[10px] tracking-wider uppercase font-medium px-2 py-1 rounded">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button top-right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-stone-700 hover:text-amber-800 hover:bg-white transition-colors shadow-sm cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-amber-700 text-amber-700' : 'text-stone-600'
            }`}
          />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex-1 py-2.5 px-3 bg-stone-900/90 hover:bg-stone-950 text-white text-xs font-semibold tracking-wider uppercase rounded backdrop-blur-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View &amp; Tailor</span>
          </button>
        </div>
      </div>

      {/* Product Metadata & Purchasing Info */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Fabric (Unboxed text with bullet separator) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-medium text-[11px] text-amber-900/90">
              {product.category === 'unstitched'
                ? 'Unstitched 3-Pc'
                : product.category === 'chikankari'
                ? 'Chikankari Schiffli'
                : product.category === 'festive'
                ? 'Festive Organza'
                : product.category === 'coords'
                ? 'Ready Co-ord'
                : 'Luxury Pret'}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="truncate text-stone-500">{product.fabric}</span>
          </div>

          {/* Product Name in Cormorant Garamond */}
          <h3
            onClick={() => onSelect(product)}
            className="font-serif-luxury text-lg font-semibold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Primary Action */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-stone-950 text-sm tracking-tight tabular-nums">
              PKR {product.price.toLocaleString('en-PK')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                PKR {product.originalPrice.toLocaleString('en-PK')}
              </span>
            )}
          </div>

          <button
            onClick={() => onSelect(product)}
            className="text-xs font-medium text-stone-800 hover:text-stone-950 flex items-center gap-1 hover:underline underline-offset-4 cursor-pointer"
          >
            <span>Select Options</span>
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
