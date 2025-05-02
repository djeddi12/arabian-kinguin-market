
import { create } from 'zustand';
import { toast } from 'sonner';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  platform: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  calculateTotal: () => { original: number; markup: number; final: number };
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const { items } = get();
        const exists = items.some((i) => i.id === item.id);
        
        if (exists) {
          toast.info("هذا المنتج موجود بالفعل في سلة المشتريات");
          return;
        }
        
        set({ items: [...items, item] });
        toast.success("تمت إضافة المنتج إلى سلة المشتريات");
      },
      
      removeItem: (id) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== id) });
        toast.success("تمت إزالة المنتج من سلة المشتريات");
      },
      
      clearCart: () => {
        set({ items: [] });
        toast.success("تم إفراغ سلة المشتريات");
      },
      
      isInCart: (id) => {
        const { items } = get();
        return items.some((item) => item.id === id);
      },
      
      calculateTotal: () => {
        const { items } = get();
        const original = items.reduce((total, item) => total + item.price, 0);
        const markup = original * 0.15;
        const final = original + markup;
        
        return {
          original,
          markup,
          final,
        };
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
