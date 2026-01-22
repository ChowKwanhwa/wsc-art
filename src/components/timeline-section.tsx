"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./language-provider";

export function TimelineSection() {
    const { t } = useLanguage();

    return (
        <section className="w-full py-24 px-6 bg-paper-white relative overflow-hidden">
            <h2 className="text-center text-3xl font-calligraphy mb-16">{t.timeline.title}</h2>

            <div className="max-w-4xl mx-auto relative">
                {/* Center Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-300 -translate-x-1/2" />

                <div className="space-y-12">
                    {t.timeline.events.map((evt, idx) => (
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
