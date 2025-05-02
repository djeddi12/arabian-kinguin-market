
import React from 'react';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 1, name: "ألعاب الأكشن", icon: "🎯" },
  { id: 2, name: "ألعاب المغامرات", icon: "🗺️" },
  { id: 3, name: "ألعاب الرياضة", icon: "⚽" },
  { id: 4, name: "ألعاب الإستراتيجية", icon: "🧠" },
  { id: 5, name: "ألعاب التصويب", icon: "🔫" },
  { id: 6, name: "ألعاب السباقات", icon: "🏎️" },
];

const Categories = () => {
  return (
    <section className="py-12 bg-secondary/20 backdrop-blur">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">استكشف حسب الفئة</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              className="h-auto flex flex-col py-6 gap-3 bg-secondary hover:bg-gaming-900 hover:text-white border-gaming-800 transition-all"
            >
              <span className="text-3xl">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
