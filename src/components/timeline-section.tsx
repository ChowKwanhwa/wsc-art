"use client";

import { motion } from "framer-motion";

export function TimelineSection() {
    const events = [
        { year: "1945", title: "生于广东惠阳", desc: "开启艺术人生" },
        { year: "1980s", title: "创立书协", desc: "参与创建深圳市书法家协会" },
        { year: "2014", title: "名家邀请展", desc: "作品参展“投资时报——秋季·当代书画名家邀请展”" },
        { year: "2023", title: "跨界交流", desc: "出席电影文化活动，拓展艺术边界" },
    ];

    return (
        <section className="w-full py-24 px-6 bg-paper-white relative overflow-hidden">
            <h2 className="text-center text-3xl font-calligraphy mb-16">艺术历程</h2>

            <div className="max-w-4xl mx-auto relative">
                {/* Center Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-300 -translate-x-1/2" />

                <div className="space-y-12">
                    {events.map((evt, idx) => (
                        <motion.div
                            key={idx}
                            className={`flex items-center gap-8 ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            {/* Content */}
                            <div className={`flex-1 ${idx % 2 === 0 ? "text-right" : "text-left"}`}>
                                <div className="text-2xl font-serif text-seal-red font-bold">{evt.year}</div>
                                <h3 className="text-xl font-bold text-ink-black mt-1">{evt.title}</h3>
                                <p className="text-neutral-500 text-sm mt-2">{evt.desc}</p>
                            </div>

                            {/* Node */}
                            <div className="w-4 h-4 bg-paper-white border-4 border-ink-black rounded-full z-10" />

                            {/* Spacer for opposite side */}
                            <div className="flex-1" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
