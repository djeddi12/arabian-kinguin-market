
import { toast } from "sonner";

// The base URL for Kinguin API
const API_BASE_URL = "https://gateway.kinguin.net/esa/api";
// For development and testing, we could use the sandbox
// const API_BASE_URL = "https://gateway.sandbox.kinguin.net/esa/api";

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
  regionId?: number;
  tags?: string;
}

class ApiService {
  private headers: HeadersInit = {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json',
  };

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
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json() as KinguinApiResponse<KinguinProduct>;
      
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

      return await response.json() as KinguinProduct;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      toast.error("فشل في جلب تفاصيل المنتج، يرجى المحاولة مرة أخرى");
      return null;
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
}

export const apiService = new ApiService();
