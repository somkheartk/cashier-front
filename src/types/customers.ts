export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipLevel: 'bronze' | 'silver' | 'gold';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  avatar?: string;
}

export interface CustomerStats {
  total: number;
  bronze: number;
  silver: number;
  gold: number;
  avgSpent: number;
}

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  membershipLevel: Customer['membershipLevel'];
}
