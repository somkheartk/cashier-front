export interface TopProduct {
  name: string;
  sold: number;
  revenue: number;
}

export interface StatCardData {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  trendValue: string;
  color: string;
}
