import { Product, Professional, Vendor, ImpactStats } from './types';
import { API_BASE_URL } from './config/api';

export const api = {
  async getProducts(category?: string): Promise<Product[]> {
    const url = category 
      ? `${API_BASE_URL}/api/products?category=${category}`
      : `${API_BASE_URL}/api/products`;
    const response = await fetch(url);
    return response.json();
  },

  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
    return response.json();
  },

  async getVendors(): Promise<Vendor[]> {
    const response = await fetch(`${API_BASE_URL}/api/vendors`);
    return response.json();
  },

  async getVendor(id: string): Promise<Vendor> {
    const response = await fetch(`${API_BASE_URL}/api/vendors/${id}`);
    return response.json();
  },

  async getProfessionals(category?: string): Promise<Professional[]> {
    const url = category 
      ? `${API_BASE_URL}/api/professionals?category=${category}`
      : `${API_BASE_URL}/api/professionals`;
    const response = await fetch(url);
    return response.json();
  },

  async getProfessional(id: string): Promise<Professional> {
    const response = await fetch(`${API_BASE_URL}/api/professionals/${id}`);
    return response.json();
  },

  async getImpactStats(): Promise<ImpactStats> {
    const response = await fetch(`${API_BASE_URL}/api/impact`);
    return response.json();
  },

  async createProduct(vendorId: string, productData: {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image_url?: string;
  }): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/api/vendors/${vendorId}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return response.json();
  },

  async uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    return response.json();
  }
};
