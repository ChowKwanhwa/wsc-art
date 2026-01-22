"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useLanguage } from "./language-provider";

export function FeaturedSection() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative w-full h-[150vh] bg-paper-white">
            {/* Sticky Container for the "Museum View" experience */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Artwork Layer */}
                <motion.div
                    style={{ scale }}
                    className="relative w-[90%] md:w-[80%] aspect-[16/9] shadow-2xl border-4 border-white bg-white"
                >
                    <Image
                        src="/artwork_placeholder_landscape.png"
                        alt={t.featured.title}
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Interactive Hint */}
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 text-xs rounded-full backdrop-blur-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-seal-red rounded-full animate-pulse" />
                        {t.featured.hint}
                    </div>
                </motion.div>

                {/* Floating Caption / Insight */}
                <motion.div
                    style={{ opacity }}
                    className="absolute bottom-10 left-10 md:bottom-20 md:left-20 max-w-md bg-white/90 p-8 shadow-lg backdrop-blur border-l-4 border-seal-red"
                >
                    <h3 className="text-2xl font-calligraphy text-ink-black mb-2">{t.featured.title}</h3>
                    <p className="font-serif text-sm leading-relaxed text-neutral-600">
                        {t.featured.desc}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
