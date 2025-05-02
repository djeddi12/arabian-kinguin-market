
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash, ArrowLeft, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

const Cart = () => {
  const { items, removeItem, clearCart, calculateTotal } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    toast.info("سيتم تحويلك إلى موقع Kinguin لإتمام عملية الشراء");
    // In a real implementation, this would create an order via API
    // and then redirect to Kinguin checkout
    clearCart();
    navigate('/checkout-success');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 py-8">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-6 w-6" />
              <h1 className="text-3xl font-bold">سلة المشتريات</h1>
            </div>
            <Button variant="ghost" asChild className="mt-2">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                متابعة التسوق
              </Link>
            </Button>
          </div>
          
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex justify-center items-center w-16 h-16 mb-6 bg-muted rounded-full">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">سلة المشتريات فارغة</h2>
              <p className="text-muted-foreground mb-6">لم تقم بإضافة أي منتجات إلى سلة المشتريات بعد.</p>
              <Button asChild>
                <Link to="/products">استعراض المنتجات</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                {items.map(item => {
                  const markedUpPrice = parseFloat((item.price * 1.15).toFixed(2));
                  
                  return (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 bg-secondary p-4 rounded-lg">
                      <div className="w-full sm:w-24 h-24 overflow-hidden rounded-md flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">
                              <Link to={`/game/${item.id}`} className="hover:text-gaming-400">
                                {item.name}
                              </Link>
                            </h3>
                            <div className="text-sm text-muted-foreground">
                              {item.platform}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-medium text-gaming-400">${markedUpPrice}</div>
                            <div className="text-sm text-muted-foreground line-through">${item.price}</div>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-100/10"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            إزالة
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={clearCart}>إفراغ السلة</Button>
                </div>
              </div>
              
              <div>
                <div className="bg-secondary p-6 rounded-lg space-y-4 sticky top-20">
                  <h3 className="font-bold text-lg">ملخص الطلب</h3>
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">عدد المنتجات</span>
                      <span>{items.length}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">المجموع الفرعي</span>
                      <span>${calculateTotal().original.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">هامش الربح (15%)</span>
                      <span>${calculateTotal().markup.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold">
                      <span>الإجمالي</span>
                      <span className="text-gaming-400">${calculateTotal().final.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" onClick={handleCheckout}>
                    إتمام الشراء
                  </Button>
                  
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    سيتم تحويلك إلى موقع Kinguin لإتمام عملية الشراء
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
