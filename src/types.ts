export type CategoryType = 'all' | 'unstitched' | 'pret' | 'chikankari' | 'festive' | 'coords';

export type StitchingType = 'unstitched' | 'stitched_standard' | 'stitched_custom';

export type SizeType = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryType;
  fabric: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  packageDetails: {
    shirt: string;
    dupatta: string;
    trouser: string;
    embroideryBorders: string;
  };
  careGuide: string[];
  inStock: boolean;
  colors: { name: string; hex: string }[];
  reviews: ProductReview[];
}

export interface CartItem {
  id: string; // unique cart entry id
  productId: string;
  product: Product;
  stitching: StitchingType;
  size?: SizeType;
  quantity: number;
  pricePerUnit: number;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: 'cod' | 'jazzcash' | 'easypaisa' | 'bank_transfer' | 'card';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'Booked' | 'Dispatched' | 'Out for Delivery' | 'Delivered';
  courier: string;
  estimatedDelivery: string;
}
