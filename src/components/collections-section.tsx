"use client";

import { motion } from "framer-motion";

export function CollectionsSection() {
    return (
        <section className="w-full py-20 px-6 bg-neutral-100">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-white p-12 shadow-sm border border-neutral-200">
                <div className="flex-1 space-y-6">
                    <h2 className="text-3xl font-calligraphy text-ink-black">个人收藏</h2>
                    <p className="font-serif text-neutral-600 leading-relaxed">
                        除了创作，巫师传先生亦醉心于古今书画收藏。
                        这里展示了他多年来精心搜集的艺术珍品，以此作为艺术交流与鉴赏的延伸。
                    </p>
                    <button className="px-8 py-3 border border-ink-black hover:bg-ink-black hover:text-white transition-all duration-300 font-serif text-sm tracking-widest">
                        浏览藏品
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
