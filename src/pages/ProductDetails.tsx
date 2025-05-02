
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { apiService } from '@/services/api';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        setLoading(true);
        const data = await apiService.getProductById(id);
        if (data) {
          setProduct(data);
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Calculate 15% markup if product exists
  const originalPrice = product?.price?.amount || 0;
  const markedUpPrice = parseFloat((originalPrice * 1.15).toFixed(2));

  // Handle buy button click
  const handleBuyClick = () => {
    toast.info("سيتم تحويلك إلى موقع Kinguin لإتمام عملية الشراء");
    // In a real implementation, this would redirect to Kinguin with the product
    window.open(`https://www.kinguin.net/en/category/43867/undefined?r=${id}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gaming-400 border-r-transparent"></div>
            <p className="mt-4 text-gray-400">جاري تحميل تفاصيل المنتج...</p>
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
                src={product.coverImage || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"} 
                alt={product.name} 
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <div className="grid grid-cols-2 gap-2">
                  {product.screenshots?.slice(0, 4).map((screenshot: string, index: number) => (
                    <div key={index} className="aspect-video rounded overflow-hidden">
                      <img src={screenshot} alt={`Screenshot ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center mt-2">
                  <span className="bg-gaming-900 text-gaming-300 text-xs px-2 py-1 rounded">
                    {product.platform || "PC"}
                  </span>
                  {product.releaseDate && (
                    <span className="text-sm text-gray-400 mr-2">
                      تاريخ الإصدار: {new Date(product.releaseDate).toLocaleDateString('ar-SA')}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
                    <div className="text-3xl font-bold text-gaming-400">${markedUpPrice}</div>
                  </div>
                  <Button className="gap-2" onClick={handleBuyClick}>
                    <ShoppingCart className="h-4 w-4" />
                    شراء الآن
                  </Button>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  * سيتم تحويلك إلى موقع Kinguin لإتمام عملية الشراء
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-2">الوصف</h2>
                <p className="text-gray-400">{product.description || "لا يوجد وصف متاح لهذا المنتج."}</p>
              </div>
              
              {product.requirements && (
                <div>
                  <h2 className="text-xl font-bold mb-2">متطلبات النظام</h2>
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">الحد الأدنى</h3>
                        <p className="text-sm text-gray-400">{product.requirements.minimum || "غير متاح"}</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-semibold">الموصى به</h3>
                        <p className="text-sm text-gray-400">{product.requirements.recommended || "غير متاح"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {product.languages && (
                <div>
                  <h2 className="text-xl font-bold mb-2">اللغات المدعومة</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.languages.split(',').map((language: string, index: number) => (
                      <span key={index} className="bg-secondary text-xs px-2 py-1 rounded">
                        {language.trim()}
                      </span>
                    ))}
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
