
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export interface Game {
  id: number;
  name: string;
  originalPrice: number;
  price: number;
  image: string;
  platform: string;
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { addItem, isInCart } = useCart();
  const alreadyInCart = isInCart(game.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (alreadyInCart) return;
    
    addItem({
      id: game.id,
      name: game.name,
      price: game.originalPrice,
      image: game.image,
      platform: game.platform,
    });
  };

  return (
    <div className="game-card bg-secondary h-full rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
      <Link to={`/game/${game.id}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <img 
            src={game.image} 
            alt={game.name} 
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
            <h3 className="font-bold text-white text-lg line-clamp-2">{game.name}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gaming-300 font-semibold">{game.platform}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground line-through">${game.originalPrice.toFixed(2)}</span>
            <span className="font-bold text-gaming-400">${game.price.toFixed(2)}</span>
          </div>
          <Button 
            size="sm" 
            className={`w-8 h-8 p-0 rounded-full ${alreadyInCart ? 'bg-green-600 hover:bg-green-700' : ''}`}
            onClick={handleAddToCart}
            disabled={alreadyInCart}
          >
            {alreadyInCart ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          </Button>
        </div>
        <Link to={`/game/${game.id}`} className="text-center">
          <Button variant="ghost" className="w-full text-sm hover:text-gaming-400">
            عرض التفاصيل
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
