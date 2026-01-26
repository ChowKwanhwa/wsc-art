"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "./language-provider";

export function HeroSection() {
    const [mounted, setMounted] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === 'zh' ? 'en' : 'zh');
    };

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-paper-white">
            {/* Language Toggle */}
            <div className="absolute top-6 right-6 z-50">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-full hover:bg-white hover:shadow-md transition-all duration-300 group"
                >
                    <Globe className="w-4 h-4 text-neutral-600 group-hover:text-seal-red transition-colors" />
                    <span className="font-serif text-sm text-neutral-800">
                        {language === 'zh' ? 'EN' : '中文'}
                    </span>
                </button>
            </div>

            {/* Background Ink Effect (Placeholder for now, could be an image or canvas) */}
            {/* Background Ink Effect */}
            <div className="absolute inset-0 pointer-events-none select-none">
                <Image
                    src="/hero-bg-building.jpeg"
                    alt="Building Background"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                {/* Subtle gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-paper-white/30 via-transparent to-paper-white/80" />

                {/* Image Label */}
                <motion.div
                    className="absolute bottom-32 right-8 md:bottom-1/3 md:right-16 z-20"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <div className="bg-seal-red/90 backdrop-blur-sm px-4 py-2 rounded-r-none rounded-l-xl shadow-lg border-y border-l border-white/20 animate-pulse-slow hover:bg-seal-red transition-colors">
                        <p className="text-sm font-serif text-white tracking-wide shadow-sm">
                            {t.hero.imageLabel}
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="z-10 text-center space-y-8 p-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    {/* Vertical Title using Calligraphy Font */}
                    <h1 className={`text-6xl md:text-8xl lg:text-9xl font-calligraphy text-ink-black tracking-widest leading-loose ${language === 'zh' ? 'writing-vertical-rl' : ''}`}>
                        {t.hero.title}
                    </h1>
                    <h2 className="mt-8 text-2xl md:text-3xl font-serif text-ink-black/80 tracking-[0.2em] uppercase">
                        {t.hero.subtitle}
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <p className="font-serif text-lg text-gray-600">
                        {t.hero.description}
                    </p>
                </motion.div>
            </div>

            {/* Scroll indicator - Red Seal style */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <div className="w-12 h-12 border-2 border-seal-red rounded-full flex items-center justify-center text-seal-red animate-bounce bg-white/50 backdrop-blur-sm cursor-pointer">
                    <ChevronDown className="w-6 h-6" />
                </div>
            </motion.div>
        </section>
    );
}
