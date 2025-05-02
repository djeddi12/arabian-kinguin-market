
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard, { Game } from '@/components/GameCard';
import { apiService } from '@/services/api';

const Products = () => {
  const [products, setProducts] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await apiService.getProducts(page);
    if (response && response.data) {
      // Transform API data into our Game interface format
      const transformedProducts = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        originalPrice: item.price?.amount || 0,
        price: parseFloat((item.price?.amount * 1.15).toFixed(2)) || 0,
        image: item.coverImage || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        platform: item.platform || "PC",
      }));
      
      setProducts(transformedProducts);
      
      if (response.meta?.pagination) {
        setTotalPages(response.meta.pagination.total_pages);
      }
    }
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLoading(true);
      const response = await apiService.searchProducts(searchQuery);
      if (response && response.data) {
        const transformedProducts = response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          originalPrice: item.price?.amount || 0,
          price: parseFloat((item.price?.amount * 1.15).toFixed(2)) || 0,
          image: item.coverImage || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
          platform: item.platform || "PC",
        }));
        
        setProducts(transformedProducts);
        
        if (response.meta?.pagination) {
          setTotalPages(response.meta.pagination.total_pages);
          setPage(1);
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">استكشف الألعاب</h1>
            
            <form onSubmit={handleSearch} className="flex gap-2 max-w-md mb-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن الألعاب..." 
                  className="w-full pr-10 bg-secondary" 
                />
              </div>
              <Button type="submit">بحث</Button>
            </form>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">الكل</Button>
              <Button variant="outline" size="sm">ألعاب الأكشن</Button>
              <Button variant="outline" size="sm">ألعاب المغامرات</Button>
              <Button variant="outline" size="sm">ألعاب الرياضة</Button>
              <Button variant="outline" size="sm">ألعاب الإستراتيجية</Button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gaming-400 border-r-transparent"></div>
            </div>
          ) : (
            <>
              {products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {products.map((game) => (
                    <div key={game.id}>
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <h2 className="text-2xl font-bold mb-2">لا توجد منتجات</h2>
                  <p className="text-gray-400">لم يتم العثور على منتجات متاحة حالياً.</p>
                </div>
              )}
              
              {products.length > 0 && (
                <div className="flex justify-center mt-8 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                  >
                    السابق
                  </Button>
                  <Button variant="outline" disabled>
                    {page} من {totalPages}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                  >
                    التالي
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
