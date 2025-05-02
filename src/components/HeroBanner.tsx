
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-tr from-black to-gaming-900 rounded-lg">
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              أفضل الألعاب
              <span className="block text-gaming-400">بأسعار منافسة</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-md mx-auto md:mx-0">
              اكتشف أحدث الألعاب وأكثرها شعبية بأسعار منافسة واحصل على مفاتيح التفعيل فوراً
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button className="bg-gaming-600 hover:bg-gaming-700 text-white">
                استكشف الألعاب
              </Button>
              <Button variant="outline" className="border-gaming-400 text-gaming-400 hover:bg-gaming-400/10">
                آخر العروض
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="relative h-64 md:h-80 overflow-hidden rounded-lg animate-glow">
              <div className="absolute inset-0 bg-gradient-to-r from-gaming-700/30 to-gaming-900/30 z-10 rounded-lg" />
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Gaming Showcase"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0"></div>
    </div>
  );
};

export default HeroBanner;
