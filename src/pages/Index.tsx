
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import FeaturedGames from '@/components/FeaturedGames';
import Categories from '@/components/Categories';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 py-6">
          <HeroBanner />
          
          <FeaturedGames title="الأكثر مبيعاً" />
          
          <Categories />
          
          <FeaturedGames title="عروض خاصة" />
          
          <div className="py-12">
            <div className="container">
              <div className="bg-gradient-to-r from-gaming-900 to-gaming-700 rounded-lg p-8 text-white">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold">انضم إلى مجتمع GamGaming</h2>
                    <p className="text-gray-200">
                      احصل على إشعارات حول أحدث العروض والألعاب الجديدة. كن أول من يعلم عن الخصومات الحصرية.
                    </p>
                    <div className="flex gap-2">
                      <input 
                        type="email" 
                        placeholder="بريدك الإلكتروني" 
                        className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white w-full"
                      />
                      <button className="bg-white text-gaming-800 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors">
                        اشتراك
                      </button>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <img 
                      src="https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                      alt="Gaming Setup" 
                      className="rounded-lg h-48 w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="py-12">
            <div className="container text-center space-y-6">
              <h2 className="text-3xl font-bold">لماذا تختار GamGaming؟</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="p-6 bg-secondary rounded-lg">
                  <div className="w-12 h-12 bg-gaming-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">💰</span>
                  </div>
                  <h3 className="font-bold mb-2">أسعار منافسة</h3>
                  <p className="text-sm text-gray-400">نقدم أفضل الألعاب بأسعار منافسة مع هامش ربح معقول</p>
                </div>
                <div className="p-6 bg-secondary rounded-lg">
                  <div className="w-12 h-12 bg-gaming-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">⚡</span>
                  </div>
                  <h3 className="font-bold mb-2">تسليم فوري</h3>
                  <p className="text-sm text-gray-400">استلم مفاتيح الألعاب فوراً بعد الشراء</p>
                </div>
                <div className="p-6 bg-secondary rounded-lg">
                  <div className="w-12 h-12 bg-gaming-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">🔒</span>
                  </div>
                  <h3 className="font-bold mb-2">مفاتيح أصلية 100%</h3>
                  <p className="text-sm text-gray-400">جميع مفاتيح الألعاب أصلية ومضمونة من المصدر</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
