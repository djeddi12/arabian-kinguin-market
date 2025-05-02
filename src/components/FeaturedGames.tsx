
import React, { useEffect, useState } from 'react';
import GameCard, { Game } from './GameCard';
import { apiService, KinguinProduct } from '../services/api';
import { toast } from 'sonner';

interface FeaturedGamesProps {
  title: string;
}

const FeaturedGames: React.FC<FeaturedGamesProps> = ({ title }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedGames = async () => {
      try {
        setLoading(true);
        const response = await apiService.getFeaturedProducts(4);
        
        if (response && response.data) {
          // Transform API data into our Game interface format
          const transformedGames = response.data.map((item: KinguinProduct) => ({
            id: item.kinguinId,
            name: item.name,
            originalPrice: item.price || 0,
            price: parseFloat(((item.price || 0) * 1.15).toFixed(2)),
            image: item.images?.cover?.url || item.images?.screenshots?.[0]?.url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            platform: item.platform || "PC",
          }));
          
          setGames(transformedGames);
        }
      } catch (error) {
        console.error("Error fetching featured games:", error);
        toast.error("فشل في جلب الألعاب المميزة");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedGames();
  }, []);

  return (
    <section className="py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <a href="/products" className="text-gaming-400 hover:text-gaming-500 transition-colors text-sm">
            عرض الكل
          </a>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((placeholder) => (
              <div key={placeholder} className="bg-secondary animate-pulse h-[350px] rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {games.map((game) => (
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
