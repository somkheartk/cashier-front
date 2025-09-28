export interface StatData {
  label: string;
  value: string;
  change: string;
  progress: number;
  icon: React.ReactNode;
  color: string;
  trend: 'up' | 'down';
}

export interface QuickAction {
  title: string;
  desc: string;
  href: string;
  icon: React.ReactElement;
  color: string;
  primary?: boolean;
  badge?: string;
}

export interface AlertData {
  id: string;
  type: 'warning' | 'success' | 'error' | 'info';
  message: string;
  time: string;
}

export interface RecentOrder {
  id: string;
  customer: string;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
  time: string;
  items: number;
}
