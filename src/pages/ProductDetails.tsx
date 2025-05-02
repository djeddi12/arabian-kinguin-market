
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart, ArrowLeft, Star, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { apiService } from '@/services/api';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // استخدام React Query لجلب تفاصيل المنتج مع الكتابة المناسبة
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (id) {
        console.log("Fetching product with ID:", id);
        return await apiService.getProductById(id);
      }
      return null;
    }
  });

  // إذا حدث خطأ، عرضه في وحدة التحكم وإظهار رسالة للمستخدم
  if (error) {
    console.error("Error fetching product:", error);
    toast.error("فشل في جلب تفاصيل المنتج");
  }

  // حساب هامش 15٪ إذا كان المنتج موجودًا
  const originalPrice = product?.price || 0;
  const markedUpPrice = parseFloat((originalPrice * 1.15).toFixed(2));

  // معالجة النقر على زر الشراء
  const handleBuyClick = () => {
    toast.info("سيتم تحويلك إلى موقع Kinguin لإتمام عملية الشراء");
    // في التنفيذ الحقيقي، سيؤدي هذا إلى إعادة التوجيه إلى Kinguin مع المنتج
    window.open(`https://www.kinguin.net/en/category/43867/undefined?r=${id}`, '_blank');
  };

  // إنشاء علامة مخطط لتحسين محركات البحث
  const getProductSchemaMarkup = () => {
    if (!product) return '';
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description || "",
      "image": product.images?.cover?.url || product.images?.screenshots?.[0]?.url,
      "brand": product.publishers?.[0] || "",
      "sku": product.kinguinId.toString(),
      "offers": {
        "@type": "Offer",
        "price": markedUpPrice,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    };
    
    return JSON.stringify(schema);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container px-4">
            <div className="mb-4">
              <Button variant="ghost" asChild className="gap-2">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                  <span>العودة للمتجر</span>
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-[500px] w-full rounded-lg" />
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <Skeleton className="h-[100px] w-full rounded-lg" />
                <div className="space-y-3">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">لم يتم العثور على المنتج</h2>
            <p className="text-gray-400">تعذر العثور على تفاصيل المنتج المطلوب.</p>
            <Button asChild>
              <Link to="/">العودة إلى الصفحة الرئيسية</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 py-8">
          {/* إضافة علامة Schema.org لتحسين محركات البحث */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: getProductSchemaMarkup() }} />
          
          <div className="mb-4">
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                <span>العودة للمتجر</span>
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary rounded-lg overflow-hidden">
              <img 
                src={product.images?.cover?.url || product.images?.screenshots?.[0]?.url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"} 
                alt={product.name} 
                className="w-full h-80 object-cover"
              />
              {product.images?.screenshots && product.images.screenshots.length > 0 && (
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-2">
                    {product.images.screenshots.slice(0, 4).map((screenshot, index) => (
                      <div key={index} className="aspect-video rounded overflow-hidden">
                        <img src={screenshot.url} alt={`Screenshot ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center mt-2 gap-3">
                  <span className="bg-gaming-900 text-gaming-300 text-xs px-2 py-1 rounded">
                    {product.platform || "PC"}
                  </span>
                  {product.metacriticScore && (
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{product.metacriticScore}/100</span>
                    </div>
                  )}
                  {product.releaseDate && (
                    <span className="text-sm text-gray-400">
                      تاريخ الإصدار: {new Date(product.releaseDate).toLocaleDateString('ar-SA')}
                    </span>
                  )}
                </div>

                {product.genres && product.genres.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.genres.map((genre, index) => (
                      <Link 
                        key={index} 
                        to={`/products?genre=${genre}`}
                        className="inline-block bg-gaming-800/50 text-xs px-2 py-1 rounded hover:bg-gaming-700/50 transition-colors"
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-secondary p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
                    <div className="text-3xl font-bold text-gaming-400">${markedUpPrice}</div>
                  </div>
                  <Button className="gap-2" onClick={handleBuyClick}>
                    <ShoppingCart className="h-4 w-4" />
                    شراء الآن
                  </Button>
                </div>
                <div className="mt-4 text-sm text-gray-400 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  سيتم تحويلك إلى موقع Kinguin لإتمام عملية الشراء
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-2">الوصف</h2>
                <p className="text-gray-400">{product.description || "لا يوجد وصف متاح لهذا المنتج."}</p>
              </div>
              
              {product.systemRequirements && product.systemRequirements.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-2">متطلبات النظام</h2>
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="space-y-4">
                      {product.systemRequirements.map((sysReq, index) => (
                        <div key={index}>
                          <h3 className="font-semibold">{sysReq.system}</h3>
                          <ul className="text-sm text-gray-400 mt-2 list-disc list-inside space-y-1">
                            {sysReq.requirement.map((req, reqIndex) => (
                              <li key={reqIndex}>{req}</li>
                            ))}
                          </ul>
                          {index < product.systemRequirements.length - 1 && <Separator className="my-3" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {product.languages && product.languages.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-2">اللغات المدعومة</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.languages.map((language, index) => (
                      <span key={index} className="bg-secondary text-xs px-2 py-1 rounded">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.activationDetails && (
                <div>
                  <h2 className="text-xl font-bold mb-2">تفاصيل التفعيل</h2>
                  <div className="bg-secondary rounded-lg p-4 text-sm text-gray-400">
                    <p style={{whiteSpace: 'pre-line'}}>{product.activationDetails}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
