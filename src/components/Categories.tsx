
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { apiService } from '@/services/api';

interface Category {
  id: number;
  name: string;
  icon: string;
}

// Map emoji icons to genres
const getGenreIcon = (genre: string): string => {
  const iconMap: Record<string, string> = {
    'Action': '🎯',
    'Adventure': '🗺️',
    'RPG': '🛡️',
    'Strategy': '🧠',
    'Simulation': '🌍',
    'Sports': '⚽',
    'Racing': '🏎️',
    'FPS': '🔫',
    'Fighting': '🥊',
    'Platformer': '🕹️',
    'Puzzle': '🧩',
    'Survival': '🏕️',
    'Horror': '👻',
    'Indie': '🎮',
    'Casual': '🎲',
    'MMO': '👥',
    'Open World': '🌐',
  };
  
  return iconMap[genre] || '🎮';
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const genres = await apiService.getGenres();
        
        // Take the first 6 genres for display
        const topGenres = genres.slice(0, 6).map((genre, index) => ({
          id: index + 1,
          name: genre,
          icon: getGenreIcon(genre)
        }));
        
        setCategories(topGenres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <section className="py-12 bg-secondary/20 backdrop-blur">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">استكشف حسب الفئة</h2>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((placeholder) => (
              <div key={placeholder} className="bg-secondary animate-pulse h-28 rounded-md"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="h-auto flex flex-col py-6 gap-3 bg-secondary hover:bg-gaming-900 hover:text-white border-gaming-800 transition-all"
                asChild
              >
                <Link to={`/products?genre=${category.name}`}>
                  <span className="text-3xl">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
