"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./language-provider";

export function CollectionsSection() {
    const { t } = useLanguage();

    return (
        <section className="w-full py-20 px-6 bg-neutral-100">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-white p-12 shadow-sm border border-neutral-200">
                <div className="flex-1 space-y-6">
                    <h2 className="text-3xl font-calligraphy text-ink-black">{t.collections.title}</h2>
                    <p className="font-serif text-neutral-600 leading-relaxed">
                        {t.collections.desc}
                    </p>
                    <button className="px-8 py-3 border border-ink-black hover:bg-ink-black hover:text-white transition-all duration-300 font-serif text-sm tracking-widest">
                        {t.collections.button}
                    </button>
                </div>

                {/* Abstract Collage representation of collections */}
                <div className="flex-1 relative h-64 w-full">
                    <motion.div
                        className="absolute top-0 right-10 w-40 h-52 bg-neutral-300 shadow-lg rotate-3 border-4 border-white"
                        whileHover={{ rotate: 0, scale: 1.05 }}
                    />
                    <motion.div
                        className="absolute top-4 right-24 w-40 h-52 bg-neutral-400 shadow-lg -rotate-6 border-4 border-white"
                        whileHover={{ rotate: 0, scale: 1.05 }}
                    />
                    <motion.div
                        className="absolute top-8 right-40 w-40 h-52 bg-neutral-800 shadow-lg rotate-6 border-4 border-white"
                        whileHover={{ rotate: 0, scale: 1.05 }}
                    />
                </div>
            </div>
        </section>
    );
}
