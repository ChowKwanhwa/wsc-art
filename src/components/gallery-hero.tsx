'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function GalleryHero() {
    return (
        <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden flex items-center justify-center bg-stone-50">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-40">
                <Image
                    src="/hero_background_ink.png"
                    alt="Ink Background"
                    fill
                    className="object-cover object-top"
                    priority
                />
            </div>

            {/* Gradient Overlay for smooth transition */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
            <div className="absolute inset-0 bg-stone-50/30" />

            {/* Content */}
            <div className="relative z-10 text-center space-y-4 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold font-ma-shan-zheng text-ink-black mb-2">
                        墨韵流芳
                    </h1>
                    <div className="w-16 h-1 bg-seal-red mx-auto my-4 rounded-full opacity-80" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg md:text-xl text-gray-600 font-serif tracking-widest uppercase"
                >
                    The Art Gallery
                </motion.p>
            </div>
        </div>
    );
}
