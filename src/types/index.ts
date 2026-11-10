export interface Product {
  id: string;
  title: string;
  name?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  ratingCount?: number;
  reviewsCount?: number;
  imageUrl?: string;
  image?: string;
  category: string;
  description?: string;
  tag?: string;
  inStock: boolean;
  isPrimeEligible?: boolean;
  deliveryDate?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
}
