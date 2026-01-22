"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function GalleryPreview() {
    const categories = [
        { title: "行草风韵", count: "30+ 作品", color: "bg-neutral-800" },
        { title: "自作诗词", count: "20+ 作品", color: "bg-neutral-700" },
        { title: "楹联墨迹", count: "15+ 作品", color: "bg-neutral-600" },
    ];

    return (
        <section className="w-full py-24 px-6 bg-paper-white relative">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl text-ink-black font-calligraphy mb-2">作品画廊</h2>
                        <div className="w-12 h-1 bg-seal-red" />
                    </div>
                    <button className="group flex items-center gap-2 text-ink-black font-serif hover:text-seal-red transition-colors">
                        全部作品 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            {/* Placeholder for Gallery Category Image */}
                            <div className={`w-full h-full ${cat.color} opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out`} />

                            {/* Overlay Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white bg-gradient-to-t from-black/60 to-transparent">
                                <h3 className="text-2xl font-calligraphy mb-1">{cat.title}</h3>
                                <p className="font-serif text-sm opacity-80">{cat.count}</p>
                            </div>

                            {/* Hover Border Effect */}
                            <div className="absolute inset-4 border border-white/0 group-hover:border-white/50 transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
