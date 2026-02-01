"use client";

import { useLanguage } from "./language-provider";
import Image from "next/image";

export function Footer() {
    const { t } = useLanguage();
    return (
        <footer className="w-full py-12 bg-ink-black text-white/60 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
                {/* Seal */}
                {/* Seal */}
                <div className="relative w-20 h-20 transition-transform duration-300 hover:scale-105">
                    <Image
                        src="/吉庐logo/logo_seal_carved.png"
                        alt="吉庐 - Ji Lu"
                        fill
                        className="object-contain"
                    />
                </div>

                <nav className="flex gap-8 text-sm font-serif tracking-widest">
                    <a href="#" className="hover:text-white transition-colors">{t.footer.nav.works}</a>
                    <a href="#" className="hover:text-white transition-colors">{t.footer.nav.bio}</a>
                    <a href="#" className="hover:text-white transition-colors">{t.footer.nav.collections}</a>
                    <a href="#" className="hover:text-white transition-colors">{t.footer.nav.contact}</a>
                </nav>

                <div className="text-xs text-center space-y-2">
                    <p>{t.footer.copyright.replace("{year}", new Date().getFullYear().toString())}</p>
                    <p className="opacity-50">{t.footer.slogan}</p>
                </div>
            </div>
        </footer>
    );
}
