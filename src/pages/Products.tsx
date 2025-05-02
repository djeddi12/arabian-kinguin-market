
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard, { Game } from '@/components/GameCard';
import { apiService, ProductQueryParams, KinguinProduct } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('name') || '');
  const [genres, setGenres] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(searchParams.get('genre') || null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(searchParams.get('platform') || null);

  useEffect(() => {
    // Load genres and platforms once
    const fetchFilters = async () => {
      const genresList = await apiService.getGenres();
      const platformsList = await apiService.getPlatforms();
      setGenres(genresList);
      setPlatforms(platformsList);
    };
    
    fetchFilters();
    
    // Extract query params
    const currentGenre = searchParams.get('genre');
    const currentPlatform = searchParams.get('platform');
    const currentName = searchParams.get('name');
    const currentPage = searchParams.get('page');
    
    if (currentGenre) setSelectedGenre(currentGenre);
    if (currentPlatform) setSelectedPlatform(currentPlatform);
    if (currentName) setSearchQuery(currentName);
    if (currentPage) setPage(parseInt(currentPage));
    
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    
    // Build query params based on filters
    const queryParams: ProductQueryParams = {
      page,
      limit: 20
    };
    
    if (selectedGenre) {
      queryParams.genre = selectedGenre;
    }
    
    if (selectedPlatform) {
      queryParams.platform = selectedPlatform;
    }
    
    if (searchQuery) {
      queryParams.name = searchQuery;
    }
    
    const response = await apiService.getProducts(queryParams);
    
    if (response && response.data) {
      // Transform API data into our Game interface format
      const transformedProducts = response.data.map((item: KinguinProduct) => ({
        id: item.kinguinId,
        name: item.name,
        originalPrice: item.price || 0,
        price: parseFloat(((item.price || 0) * 1.15).toFixed(2)),
        image: item.images?.cover?.url || item.images?.screenshots?.[0]?.url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
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
    
    // Update URL params and trigger a reload
    const newParams = new URLSearchParams(searchParams);
    
    if (searchQuery) {
      newParams.set('name', searchQuery);
    } else {
      newParams.delete('name');
    }
    
    // Reset to page 1 when searching
    newParams.set('page', '1');
    setPage(1);
    
    setSearchParams(newParams);
  };

  const handleGenreFilter = (genre: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (genre) {
      newParams.set('genre', genre);
      setSelectedGenre(genre);
    } else {
      newParams.delete('genre');
      setSelectedGenre(null);
    }
    
    // Reset to page 1 when filtering
    newParams.set('page', '1');
    setPage(1);
    
    setSearchParams(newParams);
  };

  const handlePlatformFilter = (platform: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (platform) {
      newParams.set('platform', platform);
      setSelectedPlatform(platform);
    } else {
      newParams.delete('platform');
      setSelectedPlatform(null);
    }
    
    // Reset to page 1 when filtering
    newParams.set('page', '1');
    setPage(1);
    
    setSearchParams(newParams);
  };
  
  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setPage(newPage);
    setSearchParams(newParams);
    
    // Scroll to top when changing page
    window.scrollTo(0, 0);
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
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Filter className="h-4 w-4" />
                    <h3 className="font-medium">الفئات</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={selectedGenre === null ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handleGenreFilter(null)}
                    >
                      الكل
                    </Button>
                    {genres.slice(0, 10).map((genre) => (
                      <Button 
                        key={genre} 
                        variant={selectedGenre === genre ? "default" : "outline"} 
                        size="sm"
                        onClick={() => handleGenreFilter(genre)}
                      >
                        {genre}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Filter className="h-4 w-4" />
                    <h3 className="font-medium">المنصات</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={selectedPlatform === null ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handlePlatformFilter(null)}
                    >
                      الكل
                    </Button>
                    {platforms.map((platform) => (
                      <Button 
                        key={platform} 
                        variant={selectedPlatform === platform ? "default" : "outline"} 
                        size="sm"
                        onClick={() => handlePlatformFilter(platform)}
                      >
                        {platform}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="bg-secondary animate-pulse h-[350px] rounded-lg"></div>
              ))}
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
                  <p className="text-gray-400">لم يتم العثور على منتجات متاحة بناءً على معايير البحث.</p>
                </div>
              )}
              
              {products.length > 0 && (
                <div className="flex justify-center mt-8 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handlePageChange(Math.max(1, page - 1))}
                    disabled={page === 1}
                  >
                    السابق
                  </Button>
                  <Button variant="outline" disabled>
                    {page} من {totalPages}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
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
