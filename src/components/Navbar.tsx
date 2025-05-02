
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-gaming-400 to-gaming-600 bg-clip-text text-transparent">
              GamGaming
            </span>
          </Link>
        </div>

        <div className="hidden md:flex md:w-1/3">
          <div className="relative w-full">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="ابحث عن الألعاب..." 
              className="w-full pr-10 bg-secondary" 
            />
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">
            الفئات
          </Link>
          <Link to="/offers" className="text-sm font-medium hover:text-primary transition-colors">
            العروض
          </Link>
          <Link to="/new" className="text-sm font-medium hover:text-primary transition-colors">
            الأحدث
          </Link>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground">0</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
