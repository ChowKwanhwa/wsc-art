"use client";

import { motion } from "framer-motion";

export function PhilosophySection() {
    const principles = [
        { title: "诗心为魂", desc: "笔墨起于诗心，源于墨韵" },
        { title: "书臻神功", desc: "书风清雅俊秀，具二王风韵" },
        { title: "诗书合璧", desc: "读诗可见笔墨灵动，赏字可悟诗词深邃" },
    ];

    return (
        <section className="relative w-full py-32 bg-ink-black text-paper-white overflow-hidden">
            {/* Background Texture/Effect */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] mix-blend-overlay" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-16 md:gap-32">

                    {/* Introductory Text */}
                    <motion.div
                        className="md:w-1/3 space-y-8"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-calligraphy text-paper-white">
                            艺术理念
                        </h2>
                        <div className="w-16 h-1 bg-seal-red" />
                        <p className="text-lg font-serif text-white/70 leading-relaxed">
                            巫师传先生的书法，自始至终贯穿着“诗心为魂”的底色。
                            在遍汲众家之长后自成一体，挥毫落纸间，尽显非凡气度。
                        </p>
                    </motion.div>

                    {/* Vertical Scroll/Principles */}
                    <div className="flex flex-row-reverse gap-8 md:gap-16">
                        {principles.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center gap-6 writing-vertical-rl"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                            >
                                <h3 className="text-3xl md:text-4xl font-calligraphy tracking-[0.2em] text-paper-white border-l border-white/20 pl-4 py-4">
                                    {item.title}
                                </h3>
                                <p className="text-sm md:text-base font-serif text-white/50 tracking-widest mt-4">
                                    {item.desc}
                                </p>
                                {/* Seal */}
                                <div className="w-8 h-8 border border-seal-red/50 rounded flex items-center justify-center text-seal-red/80 text-xs mt-4">
                                    {index === 0 ? "心" : index === 1 ? "神" : "合"}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
