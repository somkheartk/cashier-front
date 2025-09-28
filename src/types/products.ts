export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  barcode?: string;
  description?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  barcode: string;
  stock: string;
  tags: string;
}
