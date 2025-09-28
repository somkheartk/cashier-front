export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  barcode?: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: Date;
  tableNumber?: string;
}

export interface SearchFilters {
  searchTerm: string;
  category: string;
  priceRange: [number, number];
}
