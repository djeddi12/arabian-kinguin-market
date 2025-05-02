import { toast } from "sonner";

// تغيير URL قاعدة الـ API للاتصال المباشر بواجهة Kinguin API
const API_BASE_URL = "https://gateway.kinguin.net/esa/api";
const API_KEY = "03403fcdbe5b2103ca5acc0964f996c4";

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
  // ... باقي البيانات الوهمية تم حذفها للاختصار
];

class ApiService {
  private headers: HeadersInit = {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json',
  };

  // استخدام proxy حديث للتغلب على مشاكل CORS
  private getProxiedUrl(url: string): string {
    // يمكننا استخدام خدمة cors-anywhere أو allorigins أو غيرها
    // هنا سنستخدم خدمة cors.sh التي تعتبر أكثر استقرارًا
    return `https://cors.sh/${url}`;
    // بديل آخر: return `https://corsproxy.io/?${encodeURIComponent(url)}`;
  }

  private async fetchWithFallback<T>(endpoint: string, options: RequestInit = {}, mockData?: T): Promise<T> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const proxiedUrl = this.getProxiedUrl(url);
      
      console.log("Fetching from URL:", proxiedUrl);
      
      // إضافة timeout لتحسين تجربة المستخدم
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
      
      const response = await fetch(proxiedUrl, {
        ...options,
        headers: {
          ...this.headers,
          // إضافة headers لدعم CORS proxy
          'x-cors-api-key': 'temp_me', // مفتاح مجاني مؤقت لـ cors.sh
        },
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
      console.error(`Error fetching from ${endpoint}:`, error);
      
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
      
      const endpoint = `/v1/products?${queryParams.toString()}`;
      
      console.log("Fetching products with endpoint:", endpoint);
      console.log("Query params:", queryParams.toString());
      
      // تحضير استجابة وهمية في حالة فشل API
      const mockResponse: KinguinApiResponse<KinguinProduct> = {
        results: mockProducts.slice(0, params.limit || 4),
        item_count: mockProducts.length
      };

      const data = await this.fetchWithFallback<KinguinApiResponse<KinguinProduct>>(endpoint, {}, mockResponse);
      
      console.log("API response for products:", data);
      
      // توحيد الاستجابة بناءً على بنية API - استخدام البنية الصحيحة من الوثائق
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
      const endpoint = `/v1/products/${id}`;
      
      console.log("Fetching product details with endpoint:", endpoint);
      
      // البحث عن منتج وهمي لاستخدامه كبديل
      const mockProduct = mockProducts.find(product => product.kinguinId.toString() === id) || mockProducts[0];
      
      const product = await this.fetchWithFallback<KinguinProduct>(endpoint, {}, mockProduct);
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
    if (query.length < 3) {
      toast.warning("مصطلح البحث يجب أن يكون 3 أحرف على الأقل");
      return {
        data: [],
        meta: {
          pagination: {
            total: 0,
            count: 0,
            per_page: limit,
            current_page: page,
            total_pages: 0
          }
        }
      };
    }
    
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

  // وظيفة لجلب المنتجات حسب المنصة
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

  // وظيفة لجلب جميع الأنظمة الأساسية - جلب قائمة حقيقية من API docs
  async getPlatforms() {
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

  // وظيفة لجلب جميع الأنواع من وثائق API
  async getGenres() {
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
      const endpoint = `/v1/balance`;
      return await this.fetchWithFallback<BalanceResponse>(endpoint, {}, { balance: 1000.00 });
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast.error("فشل في جلب رصيد الحساب");
      return { balance: 0 };
    }
  }

  // وظيفة لوضع طلب - تصحيح طريقة الاتصال
  async placeOrder(orderData: OrderInput): Promise<OrderDetail | null> {
    try {
      const endpoint = `/v1/order`;
      const url = this.getProxiedUrl(`${API_BASE_URL}${endpoint}`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...this.headers,
          'x-cors-api-key': 'temp_me',
        },
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
      const endpoint = `/v1/order/${orderId}`;
      return await this.fetchWithFallback<OrderDetail>(endpoint, {}, null);
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
      
      const endpoint = `/v1/order?${queryParams.toString()}`;
      
      return await this.fetchWithFallback<{results: OrderDetail[], item_count: number}>(
        endpoint, 
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
