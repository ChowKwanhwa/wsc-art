export function Footer() {
    return (
        <footer className="w-full py-12 bg-ink-black text-white/60 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
                {/* Seal */}
                <div className="w-16 h-16 border-2 border-seal-red rounded flex items-center justify-center bg-seal-red text-white text-2xl font-serif">
                    吉庐
                </div>

                <nav className="flex gap-8 text-sm font-serif tracking-widest">
                    <a href="#" className="hover:text-white transition-colors">作品</a>
                    <a href="#" className="hover:text-white transition-colors">简介</a>
                    <a href="#" className="hover:text-white transition-colors">收藏</a>
                    <a href="#" className="hover:text-white transition-colors">联系</a>
                </nav>

                <div className="text-xs text-center space-y-2">
                    <p>Copyright © {new Date().getFullYear()} Wsc Art. All rights reserved.</p>
                    <p className="opacity-50">诗心墨韵 · 薪火相传</p>
                </div>
            </div>
        </footer>
    );
}
