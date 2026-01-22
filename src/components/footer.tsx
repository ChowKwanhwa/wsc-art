"use client";

import { useLanguage } from "./language-provider";

export function Footer() {
    const { t } = useLanguage();
    return (
        <footer className="w-full py-12 bg-ink-black text-white/60 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
                {/* Seal */}
                <div className="w-16 h-16 border-2 border-seal-red rounded flex items-center justify-center bg-seal-red text-white text-2xl font-serif">
                    吉庐
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
