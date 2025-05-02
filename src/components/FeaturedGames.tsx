
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import GameCard, { Game } from './GameCard';
import { apiService, KinguinProduct } from '../services/api';
import { Skeleton } from '@/components/ui/skeleton';

interface FeaturedGamesProps {
  title: string;
  limit?: number;
  category?: string;
}

const FeaturedGames: React.FC<FeaturedGamesProps> = ({ title, limit = 4, category }) => {
  const transformData = (data: KinguinProduct[]): Game[] => {
    return data.map((item: KinguinProduct) => ({
      id: item.kinguinId,
      name: item.name,
      originalPrice: item.price || 0,
      price: parseFloat(((item.price || 0) * 1.15).toFixed(2)),
      image: item.images?.cover?.url || 
             item.images?.screenshots?.[0]?.url || 
             "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      platform: item.platform || "PC",
    }));
  };

  // Fetch featured games with ReactQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ['featuredGames', category, limit],
    queryFn: async () => {
      let response;
      if (category === 'genre') {
        response = await apiService.getProductsByGenre(category || 'Action', 1, limit);
      } else if (category === 'platform') {
        response = await apiService.getProductsByPlatform(category || 'Steam', 1, limit);
      } else {
        response = await apiService.getFeaturedProducts(limit);
      }
      
      return transformData(response.data || []);
    },
  });

  // Show error in console but don't display to user
  if (error) {
    console.error("Error fetching featured games:", error);
  }

  return (
    <section className="py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <a href="/products" className="text-gaming-400 hover:text-gaming-500 transition-colors text-sm">
            عرض الكل
          </a>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: limit }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data && data.map((game) => (
              <div key={game.id}>
                <GameCard game={game} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedGames;
