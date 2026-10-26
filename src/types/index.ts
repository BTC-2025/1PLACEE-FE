export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  imageUrl: string;
  category: string;
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
