
import { toast } from "sonner";

// The base URL for API calls - using a CORS proxy for development environment
const API_BASE_URL = "https://corsproxy.io/?https://gateway.kinguin.net/esa/api";
// For production, you would use direct endpoint with proper CORS headers
// const API_BASE_URL = "https://gateway.kinguin.net/esa/api";

const API_KEY = "c6520b20c5ed50387b610ee53251c52f";

export interface KinguinApiResponse<T> {
  results?: T[];
  data?: T;
  item_count?: number;
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

export interface KinguinProduct {
  kinguinId: number;
  productId: string;
  name: string;
  originalName: string;
  description: string;
  developers?: string[];
  publishers?: string[];
  genres?: string[];
  platform: string;
  releaseDate?: string;
  qty?: number;
  price?: number;
  textQty?: number;
  cheapestOfferId?: string[];
  isPreorder?: boolean;
  metacriticScore?: number;
  regionalLimitations?: string;
  regionId?: number;
  activationDetails?: string;
  videos?: Array<{name: string; video_id: string}>;
  languages?: string[];
  systemRequirements?: Array<{
    system: string;
    requirement: string[];
  }>;
  tags?: string[];
  offers?: Array<{
    name: string;
    offerId: string;
    price: number;
    qty: number;
    textQty: number;
    merchantName: string;
    isPreorder: boolean;
    releaseDate: string;
  }>;
  offersCount?: number;
  totalQty?: number;
  merchantName?: string[];
  images?: {
    screenshots?: Array<{
      url: string;
      thumbnail: string;
    }>;
    cover?: {
      url: string;
      thumbnail: string;
    };
  };
  updatedAt?: string;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  name?: string;
  sortBy?: 'kinguinId' | 'updatedAt';
  sortType?: 'asc' | 'desc';
  platform?: string;
  genre?: string;
  languages?: string;
  isPreorder?: 'yes' | 'no';
  activePreorder?: 'yes';
  regionId?: number;
  tags?: string;
}

export interface OrderInput {
  products: Array<{
    kinguinId: number;
    qty: number;
    price: number;
    keyType?: string;
    offerId?: string;
  }>;
  orderExternalId?: string;
  couponCode?: string;
}

export interface OrderDetail {
  totalPrice: number;
  requestTotalPrice: number;
  status: string;
  userEmail: string;
  storeId: number;
  createdAt: string;
  orderId: string;
  orderExternalId?: string;
  couponCode?: string;
  paymentPrice: number;
  products: Array<{
    kinguinId: number;
    offerId: string;
    productId: string;
    qty: number;
    name: string;
    price: number;
    totalPrice: number;
    requestPrice: number;
    isPreorder: boolean;
    releaseDate: string;
    keyType: string;
    keys?: Array<{
      id: string;
      status: string;
    }>;
  }>;
  totalQty: number;
  isPreorder: boolean;
  preorderReleaseDate?: string;
}

export interface BalanceResponse {
  balance: number;
}

// Mock data for development if API fails
const mockProducts = [
  {
    kinguinId: 1001,
    name: "Cyberpunk 2077",
    originalName: "Cyberpunk 2077",
    description: "Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City.",
    platform: "Steam",
    releaseDate: "2020-12-10",
    price: 49.99,
    genres: ["RPG", "Action", "Open World"],
    images: {
      cover: {
        url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
      },
      screenshots: [
        {url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f"},
        {url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f"},
      ]
    }
  },
  {
    kinguinId: 1002,
    name: "Red Dead Redemption 2",
    originalName: "Red Dead Redemption 2",
    description: "Red Dead Redemption 2 is an epic tale of life in America's unforgiving heartland.",
    platform: "Epic Games",
    releaseDate: "2019-11-05",
    price: 44.99,
    genres: ["Action", "Adventure", "Open World"],
    images: {
      cover: {
        url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
        thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
      },
      screenshots: [
        {url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f", thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f"},
        {url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f", thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f"},
      ]
    }
  },
  {
    kinguinId: 1003,
    name: "The Witcher 3: Wild Hunt",
    originalName: "The Witcher 3: Wild Hunt",
    description: "A story-driven, open world RPG set in a visually stunning fantasy universe.",
    platform: "GOG",
    releaseDate: "2015-05-19",
    price: 29.99,
    genres: ["RPG", "Open World", "Adventure"],
    images: {
      cover: {
        url: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
      },
      screenshots: [
        {url: "https://images.unsplash.com/photo-1542751371-adc38448a05e", thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e"},
        {url: "https://images.unsplash.com/photo-1542751371-adc38448a05e", thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e"},
      ]
    }
  },
  {
    kinguinId: 1004,
    name: "FIFA 23",
    originalName: "FIFA 23",
    description: "Experience the world's game with FIFA 23.",
    platform: "Origin",
    releaseDate: "2022-09-30",
    price: 59.99,
    genres: ["Sports", "Simulation"],
    images: {
      cover: {
        url: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12",
        thumbnail: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12",
      },
      screenshots: [
        {url: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12", thumbnail: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12"},
        {url: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12", thumbnail: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12"},
      ]
    }
  }
];

class ApiService {
  private headers: HeadersInit = {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json',
  };

  private async fetchWithFallback<T>(url: string, options: RequestInit = {}, mockData?: T): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json() as T;
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      
      // If mock data is provided, use it as fallback
      if (mockData) {
        console.log("Using mock data as fallback");
        return mockData;
      }
      
      throw error;
    }
  }

  // Function to fetch products with pagination and filtering
  async getProducts(params: ProductQueryParams = {}) {
    try {
      // Build query string from params
      const queryParams = new URLSearchParams();
      
      // Add all params that are defined
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
      
      // Default page and limit if not provided
      if (!params.page) queryParams.append('page', '1');
      if (!params.limit) queryParams.append('limit', '20');

      const url = `${API_BASE_URL}/v1/products?${queryParams.toString()}`;
      
      // Prepare mock response in case API fails
      const mockResponse = {
        results: mockProducts.slice(0, params.limit || 4),
        item_count: mockProducts.length
      };

      const data = await this.fetchWithFallback<KinguinApiResponse<KinguinProduct>>(url, {}, mockResponse);
      
      // Normalize the response based on the API structure
      if (data.results) {
        return { 
          data: data.results, 
          meta: { 
            pagination: { 
              total: data.item_count || 0, 
              count: data.results.length, 
              per_page: parseInt(params.limit?.toString() || '20'), 
              current_page: parseInt(params.page?.toString() || '1'),
              total_pages: Math.ceil((data.item_count || 0) / (params.limit || 20))
            } 
          } 
        };
      }
      
      return { 
        data: [], 
        meta: { 
          pagination: { 
            total: 0, 
            count: 0, 
            per_page: parseInt(params.limit?.toString() || '20'), 
            current_page: parseInt(params.page?.toString() || '1'),
            total_pages: 0
          } 
        } 
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("فشل في جلب المنتجات، يرجى المحاولة مرة أخرى");
      
      // Return mock data on failure
      return { 
        data: mockProducts.slice(0, params.limit || 4), 
        meta: { 
          pagination: { 
            total: mockProducts.length, 
            count: Math.min(mockProducts.length, params.limit || 4), 
            per_page: parseInt(params.limit?.toString() || '20'), 
            current_page: parseInt(params.page?.toString() || '1'),
            total_pages: Math.ceil(mockProducts.length / (params.limit || 20))
          } 
        } 
      };
    }
  }

  // Function to fetch a single product by ID
  async getProductById(id: string) {
    try {
      const url = `${API_BASE_URL}/v1/products/${id}`;
      
      // Find a mock product to use as fallback
      const mockProduct = mockProducts.find(product => product.kinguinId.toString() === id) || mockProducts[0];
      
      return await this.fetchWithFallback<KinguinProduct>(url, {}, mockProduct);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      toast.error("فشل في جلب تفاصيل المنتج، يرجى المحاولة مرة أخرى");
      
      // Return mock data for the specific ID or the first mock product
      return mockProducts.find(product => product.kinguinId.toString() === id) || mockProducts[0];
    }
  }

  // Function to search products
  async searchProducts(query: string, page = 1, limit = 20) {
    return this.getProducts({
      name: query,
      page,
      limit
    });
  }

  // Function to get products by genre
  async getProductsByGenre(genre: string, page = 1, limit = 20) {
    return this.getProducts({
      genre,
      page,
      limit
    });
  }

  // Function to get products by platform
  async getProductsByPlatform(platform: string, page = 1, limit = 20) {
    return this.getProducts({
      platform,
      page,
      limit
    });
  }

  // Function to get featured/highlighted products
  async getFeaturedProducts(limit = 4) {
    // For featured products, we can sort by popularity or just get the latest
    return this.getProducts({
      sortBy: 'updatedAt',
      sortType: 'desc',
      limit
    });
  }

  // Get all available platforms
  async getPlatforms() {
    // This is a list of common gaming platforms on Kinguin
    return [
      "Steam",
      "Origin",
      "Uplay",
      "Battle.net",
      "Epic Games",
      "GOG",
      "PlayStation",
      "Xbox",
      "Nintendo",
    ];
  }

  // Get all available genres from Kinguin API docs
  async getGenres() {
    // This is the list of genres from the API documentation
    return [
      "Action",
      "Adventure",
      "Anime",
      "Casual",
      "Co-op",
      "Dating Simulator",
      "Fighting",
      "FPS",
      "Hack and Slash",
      "Hidden Object",
      "Horror",
      "Indie",
      "Life Simulation",
      "MMO",
      "Music / Soundtrack",
      "Online Courses",
      "Open World",
      "Platformer",
      "Point & click",
      "Puzzle",
      "Racing",
      "RPG",
      "Simulation",
      "Software",
      "Sport",
      "Story rich",
      "Strategy",
      "Subscription",
      "Survival",
      "Third-Person Shooter",
      "Visual Novel",
      "VR Games",
    ];
  }

  // Get account balance
  async getBalance(): Promise<BalanceResponse> {
    try {
      const url = `${API_BASE_URL}/v1/balance`;
      return await this.fetchWithFallback<BalanceResponse>(url, {}, { balance: 1000.00 });
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast.error("فشل في جلب رصيد الحساب");
      return { balance: 0 };
    }
  }

  // Place an order
  async placeOrder(orderData: OrderInput): Promise<OrderDetail | null> {
    try {
      const url = `${API_BASE_URL}/v1/order`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      toast.success("تم تقديم الطلب بنجاح");
      return data;
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("فشل في تقديم الطلب");
      return null;
    }
  }

  // Get order details by ID
  async getOrderById(orderId: string): Promise<OrderDetail | null> {
    try {
      const url = `${API_BASE_URL}/v1/order/${orderId}`;
      return await this.fetchWithFallback<OrderDetail>(url, {}, null);
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      toast.error("فشل في جلب تفاصيل الطلب");
      return null;
    }
  }

  // Get list of orders with filters
  async getOrders(page = 1, limit = 20, filters: Record<string, any> = {}): Promise<{results: OrderDetail[], item_count: number}> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());
      
      // Add additional filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
      
      const url = `${API_BASE_URL}/v1/order?${queryParams.toString()}`;
      
      return await this.fetchWithFallback<{results: OrderDetail[], item_count: number}>(
        url, 
        {}, 
        {results: [], item_count: 0}
      );
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("فشل في جلب قائمة الطلبات");
      return {results: [], item_count: 0};
    }
  }
}

export const apiService = new ApiService();
