
import { toast } from "sonner";

// The base URL for Kinguin API
const API_BASE_URL = "https://gateway.kinguin.net/esa/api";
// For development and testing, we could use the sandbox
// const API_BASE_URL = "https://gateway.sandbox.kinguin.net/esa/api";

const API_KEY = "c6520b20c5ed50387b610ee53251c52f";

interface KinguinApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    };
  };
}

class ApiService {
  private headers: HeadersInit = {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json',
  };

  // Function to fetch products with pagination
  async getProducts(page = 1, limit = 20) {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/products?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json() as KinguinApiResponse<any[]>;
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("فشل في جلب المنتجات، يرجى المحاولة مرة أخرى");
      return { data: [], meta: { pagination: { total: 0, count: 0, per_page: limit, current_page: page, total_pages: 0 } } };
    }
  }

  // Function to fetch a single product by ID
  async getProductById(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/products/${id}`, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      toast.error("فشل في جلب تفاصيل المنتج، يرجى المحاولة مرة أخرى");
      return null;
    }
  }

  // For future implementation - search products
  async searchProducts(query: string, page = 1, limit = 20) {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/products?search=${encodeURIComponent(query)}&page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json() as KinguinApiResponse<any[]>;
    } catch (error) {
      console.error("Error searching products:", error);
      toast.error("فشل في البحث، يرجى المحاولة مرة أخرى");
      return { data: [], meta: { pagination: { total: 0, count: 0, per_page: limit, current_page: page, total_pages: 0 } } };
    }
  }
}

export const apiService = new ApiService();
