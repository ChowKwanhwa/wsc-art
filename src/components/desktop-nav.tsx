'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navItems = [
    { name: '首页', href: '/' },
    { name: '作品', href: '/gallery' },
    { name: '收藏', href: '/collection' },
    { name: '证书', href: '/certificate' },
];

export function DesktopNav() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (pathname.startsWith('/admin')) return null;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
            className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-300 ${scrolled || pathname !== '/' ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src="/吉庐logo/logo_seal_carved.png"
                            alt="吉庐 - Ji Lu"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                <div className="flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-sm tracking-widest hover:text-seal-red transition-colors font-serif ${pathname === item.href
                                    ? 'text-seal-red font-bold'
                                    : (scrolled || pathname !== '/' ? 'text-gray-800' : 'text-gray-900')
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
}
