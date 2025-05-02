import { toast } from "sonner";

// تغيير URL قاعدة الـ API لاستخدام CORS proxy أفضل
const API_BASE_URL = "https://api.allorigins.win/raw?url=https://gateway.kinguin.net/esa/api";
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
  productId?: string;
  name: string;
  originalName?: string;
  description?: string;
  developers?: string[];
  publishers?: string[];
  genres?: string[];
  platform?: string;
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

// بيانات وهمية للاستخدام فقط عند فشل API
const mockProducts: KinguinProduct[] = [
  {
    kinguinId: 1001,
    productId: "p1001",
    name: "Cyberpunk 2077",
    originalName: "Cyberpunk 2077",
    description: "Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City.",
    platform: "Steam",
    releaseDate: "2020-12-10",
    price: 49.99,
    genres: ["RPG", "Action", "Open World"],
    publishers: ["CD Projekt RED"],
    developers: ["CD Projekt RED"],
    metacriticScore: 86,
    languages: ["English", "French", "German", "Spanish", "Russian", "Polish"],
    systemRequirements: [
      {
        system: "Windows",
        requirement: [
          "OS: Windows 10",
          "Processor: Intel Core i5-3570K or AMD FX-8310",
          "Memory: 8 GB RAM",
          "Graphics: NVIDIA GTX 780 or AMD Radeon RX 470",
          "Storage: 70 GB available space"
        ]
      }
    ],
    activationDetails: "Activate the product on your Steam account",
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
    productId: "p1002",
    name: "Red Dead Redemption 2",
    originalName: "Red Dead Redemption 2",
    description: "Red Dead Redemption 2 is an epic tale of life in America's unforgiving heartland.",
    platform: "Epic Games",
    releaseDate: "2019-11-05",
    price: 44.99,
    genres: ["Action", "Adventure", "Open World"],
    publishers: ["Rockstar Games"],
    developers: ["Rockstar Games"],
    metacriticScore: 93,
    languages: ["English", "French", "German", "Spanish", "Italian", "Portuguese"],
    systemRequirements: [
      {
        system: "Windows",
        requirement: [
          "OS: Windows 10",
          "Processor: Intel Core i7-4770K / AMD Ryzen 5 1500X",
          "Memory: 12 GB RAM",
          "Graphics: Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB",
          "Storage: 150 GB available space"
        ]
      }
    ],
    activationDetails: "Activate the product on your Epic Games account",
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
    productId: "p1003",
    name: "The Witcher 3: Wild Hunt",
    originalName: "The Witcher 3: Wild Hunt",
    description: "A story-driven, open world RPG set in a visually stunning fantasy universe.",
    platform: "GOG",
    releaseDate: "2015-05-19",
    price: 29.99,
    genres: ["RPG", "Open World", "Adventure"],
    publishers: ["CD Projekt RED"],
    developers: ["CD Projekt RED"],
    metacriticScore: 92,
    languages: ["English", "French", "German", "Spanish", "Polish", "Russian"],
    systemRequirements: [
      {
        system: "Windows",
        requirement: [
          "OS: 64-bit Windows 7, 64-bit Windows 8 (8.1) or 64-bit Windows 10",
          "Processor: Intel CPU Core i5-2500K 3.3GHz / AMD CPU Phenom II X4 940",
          "Memory: 6 GB RAM",
          "Graphics: Nvidia GPU GeForce GTX 660 / AMD GPU Radeon HD 7870",
          "Storage: 35 GB available space"
        ]
      }
    ],
    activationDetails: "Activate the product on your GOG account",
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
    productId: "p1004",
    name: "FIFA 23",
    originalName: "FIFA 23",
    description: "Experience the world's game with FIFA 23.",
    platform: "Origin",
    releaseDate: "2022-09-30",
    price: 59.99,
    genres: ["Sports", "Simulation"],
    publishers: ["Electronic Arts"],
    developers: ["EA Sports"],
    metacriticScore: 78,
    languages: ["English", "French", "German", "Spanish", "Portuguese", "Italian"],
    systemRequirements: [
      {
        system: "Windows",
        requirement: [
          "OS: Windows 10 64-bit",
          "Processor: Intel Core i5-6600K / AMD Ryzen 5 1600",
          "Memory: 8 GB RAM",
          "Graphics: NVIDIA GeForce GTX 1050 Ti / AMD Radeon RX 570",
          "Storage: 100 GB available space"
        ]
      }
    ],
    activationDetails: "Activate the product on your Origin account",
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
      console.log("Fetching from URL:", url);
      
      // إضافة timeout لتحسين تجربة المستخدم
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
      
      const response = await fetch(url, {
        ...options,
        headers: this.headers,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json() as T;
      console.log("API response:", data);
      return data;
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      
      // إذا كان هناك بيانات وهمية، استخدمها كخطة بديلة وأظهر إشعار
      if (mockData) {
        console.log("Using mock data as fallback");
        toast.error("تعذر الاتصال بخدمة API، يتم استخدام بيانات بديلة مؤقتاً");
        return mockData;
      }
      
      throw error;
    }
  }

  // وظيفة لجلب المنتجات مع الصفحات والتصفية
  async getProducts(params: ProductQueryParams = {}) {
    try {
      // تكوين سلسلة الاستعلام من المعلمات
      const queryParams = new URLSearchParams();
      
      // إضافة جميع المعلمات المحددة
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
      
      // الصفحة الافتراضية والحد إذا لم يتم توفيرها
      if (!params.page) queryParams.append('page', '1');
      if (!params.limit) queryParams.append('limit', '20');
      
      // استخدام URL مشفر لتجنب مشاكل الأحرف الخاصة
      const encodedApiUrl = encodeURIComponent(`https://gateway.kinguin.net/esa/api/v1/products?${queryParams.toString()}`);
      const url = `https://api.allorigins.win/raw?url=${encodedApiUrl}`;
      
      console.log("Fetching products with URL:", url);
      console.log("Original query params:", queryParams.toString());
      
      // تحضير استجابة وهمية في حالة فشل API
      const mockResponse: KinguinApiResponse<KinguinProduct> = {
        results: mockProducts.slice(0, params.limit || 4),
        item_count: mockProducts.length
      };

      const data = await this.fetchWithFallback<KinguinApiResponse<KinguinProduct>>(url, {}, mockResponse);
      
      console.log("API response for products:", data);
      
      // توحيد الاستجابة بناءً على بنية API
      if (data.results) {
        return { 
          data: data.results || [], 
          meta: { 
            pagination: { 
              total: data.item_count || 0, 
              count: (data.results || []).length, 
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
      
      // إرجاع بيانات وهمية عند الفشل
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

  // وظيفة لجلب منتج واحد حسب المعرف
  async getProductById(id: string) {
    try {
      // استخدام URL مشفر لتجنب مشاكل الأحرف الخاصة
      const encodedApiUrl = encodeURIComponent(`https://gateway.kinguin.net/esa/api/v1/products/${id}`);
      const url = `https://api.allorigins.win/raw?url=${encodedApiUrl}`;
      
      console.log("Fetching product details with URL:", url);
      
      // البحث عن منتج وهمي لاستخدامه كبديل
      const mockProduct = mockProducts.find(product => product.kinguinId.toString() === id) || mockProducts[0];
      
      const product = await this.fetchWithFallback<KinguinProduct>(url, {}, mockProduct);
      console.log("Product details response:", product);
      return product;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      toast.error("فشل في جلب تفاصيل المنتج، يرجى المحاولة مرة أخرى");
      
      // إرجاع بيانات وهمية للمعرف المحدد أو أول منتج وهمي
      return mockProducts.find(product => product.kinguinId.toString() === id) || mockProducts[0];
    }
  }

  // وظيفة للبحث عن المنتجات
  async searchProducts(query: string, page = 1, limit = 20) {
    return this.getProducts({
      name: query,
      page,
      limit
    });
  }

  // وظيفة لجلب المنتجات حسب الفئة
  async getProductsByGenre(genre: string, page = 1, limit = 20) {
    return this.getProducts({
      genre,
      page,
      limit
    });
  }

  // وظيفة لجلب المنتجات حسب платформة
  async getProductsByPlatform(platform: string, page = 1, limit = 20) {
    return this.getProducts({
      platform,
      page,
      limit
    });
  }

  // وظيفة للحصول على المنتجات المميزة/المسلط عليها الضوء
  async getFeaturedProducts(limit = 4) {
    // بالنسبة للمنتجات المميزة، يمكننا الترتيب حسب الشعبية أو الحصول على أحدث المنتجات
    console.log("Getting featured products");
    const response = await this.getProducts({
      sortBy: 'updatedAt',
      sortType: 'desc',
      limit
    });
    console.log("Featured products response:", response);
    return response;
  }

  // وظيفة لجلب جميع الأنظمة الأساسية
  async getPlatforms() {
    // هذا هو قائمة من الأنظمة الأساسية الشائعة على Kinguin
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

  // وظيفة لجلب جميع الأنواع الفنية من Kinguin API Docs
  async getGenres() {
    // هذا هو القائمة من الأنواع الفنية من الوثائق
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

  // وظيفة لجلب رصيد الحساب
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

  // وظيفة لوضع طلب
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

  // وظيفة لجلب تفاصيل طلب حسب المعرف
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

  // وظيفة لجلب قائمة الطلبات مع التصفية
  async getOrders(page = 1, limit = 20, filters: Record<string, any> = {}): Promise<{results: OrderDetail[], item_count: number}> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());
      
      // إضافة additional filters
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
