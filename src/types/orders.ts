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

export interface OrderStatusCounts {
  pending: number;
  preparing: number;
  ready: number;
  completed: number;
}
