
import React from 'react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-background pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">GamGaming</h3>
            <p className="text-gray-400 text-sm mb-4">
              متجرك العربي المميز لشراء مفاتيح الألعاب الأصلية بأسعار منافسة
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-gaming-400 transition-colors">الرئيسية</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-gaming-400 transition-colors">الألعاب</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-gaming-400 transition-colors">العروض</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-gaming-400 transition-colors">المدونة</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">الدعم</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-gaming-400 transition-colors">مركز المساعدة</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-gaming-400 transition-colors">الأسئلة الشائعة</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-gaming-400 transition-colors">سياسة الاسترجاع</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-gaming-400 transition-colors">اتصل بنا</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">تابعنا</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gaming-900 flex items-center justify-center hover:bg-gaming-800 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gaming-900 flex items-center justify-center hover:bg-gaming-800 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.162 5.65593C21.3986 5.99362 20.589 6.2154 19.76 6.31393C20.6337 5.79136 21.2877 4.96894 21.6 3.99993C20.78 4.48793 19.881 4.82993 18.944 5.01493C18.3146 4.34151 17.4804 3.89489 16.571 3.74451C15.6615 3.59413 14.7279 3.74842 13.9153 4.18338C13.1026 4.61834 12.4564 5.30961 12.0772 6.14972C11.6979 6.98983 11.6068 7.93171 11.818 8.82893C10.1551 8.74558 8.52832 8.31345 7.04328 7.56059C5.55823 6.80773 4.24812 5.75098 3.19799 4.45893C2.82628 5.09738 2.63095 5.82315 2.63199 6.56193C2.63199 8.01193 3.36999 9.29293 4.49199 10.0429C3.828 10.022 3.17862 9.84271 2.59799 9.51993V9.57193C2.59819 10.5376 2.93236 11.4735 3.5439 12.2211C4.15544 12.9688 5.00649 13.4815 5.95299 13.6729C5.33661 13.84 4.6903 13.8646 4.06299 13.7449C4.32986 14.5762 4.85 15.3031 5.55058 15.824C6.25117 16.345 7.09712 16.6337 7.96999 16.6499C7.10247 17.3313 6.10917 17.8349 5.04687 18.1321C3.98458 18.4293 2.87412 18.5142 1.77899 18.3819C3.69069 19.6114 5.91609 20.264 8.18899 20.2619C15.882 20.2619 20.089 13.8889 20.089 8.36193C20.089 8.18193 20.084 7.99993 20.076 7.82193C20.8949 7.23009 21.6016 6.49695 22.163 5.65693L22.162 5.65593Z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gaming-900 flex items-center justify-center hover:bg-gaming-800 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <Separator className="my-6 bg-gray-800" />
        
        <div className="text-center text-gray-400 text-sm">
          <p>© 2025 GamGaming. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
