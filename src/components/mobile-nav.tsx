'use client';

import { Home, Image as ImageIcon, Layers, Award } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: '首页', href: '/', icon: Home },
    { name: '作品', href: '/gallery', icon: ImageIcon },
    { name: '收藏', href: '/collection', icon: Layers },
    { name: '证书', href: '/certificate', icon: Award },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 md:hidden pb-safe">
            <div className="flex items-center justify-around h-16 safe-area-bottom">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-seal-red' : 'text-gray-500 hover:text-seal-red'
                                }`}
                        >
                            <Icon className="w-6 h-6" strokeWidth={isActive ? 2 : 1.5} />
                            <span className="text-[10px] font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
