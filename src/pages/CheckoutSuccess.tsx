
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container px-4">
          <div className="max-w-md mx-auto text-center bg-secondary p-8 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">تم تقديم الطلب بنجاح!</h1>
            <p className="text-gray-400 mb-6">
              شكراً لك على طلبك. تم تحويلك إلى موقع Kinguin لإتمام عملية الشراء.
              ستتلقى تأكيدًا بالبريد الإلكتروني قريبًا.
            </p>
            
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/products">
                  متابعة التسوق
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link to="/" className="flex items-center justify-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  العودة للرئيسية
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
