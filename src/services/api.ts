// API Configuration
const API_BASE_URL = 'http://localhost:7800';

import { Product, CartItemData as CartItem, Customer, Order } from '@/types';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Handle 401 Unauthorized - token expired or invalid
      if (response.status === 401) {
        console.warn('Token expired or invalid, clearing auth data...');
        // Clear authentication data
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        document.cookie = 'isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax';
        
        // In development, don't redirect automatically - let user login manually
        if (process.env.NODE_ENV === 'production') {
          window.location.href = '/login';
        }
        
        throw new Error('Authentication expired. Please login again.');
      }

      const error = await response.text();
      throw new Error(error || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Products API
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      // Return empty array if API is not available
      return [];
    }
  }

  async getProductByBarcode(barcode: string): Promise<Product | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/barcode/${barcode}`, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error('Failed to fetch product by barcode:', error);
      return null;
    }
  }

  // Orders API
  async getOrders(): Promise<Order[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      return [];
    }
  }

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(orderData),
    });
    return this.handleResponse(response);
  }

  async getOrder(id: string): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Customers API
  async getCustomers(): Promise<Customer[]> {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async createCustomer(customerData: CreateCustomerRequest): Promise<Customer> {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(customerData),
    });
    return this.handleResponse(response);
  }

  // Products Management API
  async createProduct(productData: any): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    return this.handleResponse(response);
  }

  async updateProduct(id: string, productData: any): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    return this.handleResponse(response);
  }

  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  }
}

export const apiService = new ApiService();

// API-specific types
export interface CreateOrderRequest {
  customerId?: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  paymentMethod: 'cash' | 'card' | 'mobile';
  cashReceived?: number;
  notes?: string;
}

export interface CreateCustomerRequest {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
}
