"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed right-2 md:right-6 top-0 bottom-0 w-1 md:w-1.5 z-50 flex flex-col items-center justify-start pointer-events-none mix-blend-multiply">
            {/* Top Seal decoration */}
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-seal-red/80 mb-1 mt-4 shadow-sm" />

            {/* The Line */}
            <motion.div
                className="w-full bg-seal-red/60 origin-top rounded-b-full shadow-[0_0_10px_rgba(192,57,43,0.3)]"
                style={{ scaleY, height: "85vh" }}
            />

            {/* Bottom character or symbol (optional) */}
            <div className="absolute bottom-8 right-[-10px] md:right-[-12px] opacity-20 writing-vertical-rl font-calligraphy text-xs md:text-sm text-seal-red">
                巫师传
            </div>
        </div>
    );
}
