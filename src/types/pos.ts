export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  barcode?: string;
  description?: string;
}

export interface CartItemData {
  product: Product;
  quantity: number;
  subtotal: number;
  discount?: number;
  notes?: string;
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

export interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

export interface CompletedOrder {
  id: string;
  items: CartItemData[];
  total: number;
  paymentMethod: string;
  cashReceived: number;
  change: number;
  timestamp: Date;
  customerName?: string;
}
