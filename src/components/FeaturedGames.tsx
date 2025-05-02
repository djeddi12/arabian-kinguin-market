
import React from 'react';
import GameCard, { Game } from './GameCard';

// Fake data for now, will be replaced with API data
const demoGames: Game[] = [
  {
    id: 1,
    name: "Cyberpunk 2077",
    originalPrice: 59.99,
    price: 69.99,
    image: "https://images.unsplash.com/photo-1640079421264-61f50d5379ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    platform: "PC / Steam"
  },
  {
    id: 2,
    name: "FIFA 23",
    originalPrice: 49.99,
    price: 57.49,
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    platform: "PC / Origin"
  },
  {
    id: 3,
    name: "Elden Ring",
    originalPrice: 69.99,
    price: 80.49,
    image: "https://images.unsplash.com/photo-1614465000772-1b302f406c67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    platform: "PC / Steam"
  },
  {
    id: 4,
    name: "Call of Duty: Modern Warfare",
    originalPrice: 59.99,
    price: 68.99,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    platform: "PC / Battle.net"
  }
];

interface FeaturedGamesProps {
  title: string;
}

const FeaturedGames: React.FC<FeaturedGamesProps> = ({ title }) => {
  return (
    <section className="py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <a href="#" className="text-gaming-400 hover:text-gaming-500 transition-colors text-sm">
            عرض الكل
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {demoGames.map((game) => (
            <div key={game.id}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGames;
