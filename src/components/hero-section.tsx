"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-paper-white">
            {/* Background Ink Effect (Placeholder for now, could be an image or canvas) */}
            {/* Background Ink Effect */}
            <div className="absolute inset-0 pointer-events-none select-none">
                <Image
                    src="/hero_background_ink.png"
                    alt="Ink Wash Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                {/* Subtle gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-paper-white/30 via-transparent to-paper-white/80" />
            </div>

            <div className="z-10 text-center space-y-8 p-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    {/* Vertical Title using Calligraphy Font */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-calligraphy text-ink-black writing-vertical-rl tracking-widest leading-loose">
                        诗书合璧
                    </h1>
                    <h2 className="mt-8 text-2xl md:text-3xl font-serif text-ink-black/80 tracking-[0.2em] uppercase">
                        Wsc Art
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <p className="font-serif text-lg text-gray-600">
                        巫师传先生的艺术世界
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
