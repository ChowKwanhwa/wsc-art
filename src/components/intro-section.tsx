"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "./language-provider";

export function IntroSection() {
    const { t } = useLanguage();

    return (
        <section className="relative w-full py-20 px-6 md:px-20 bg-paper-white overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">

                {/* Left: Artist Portrait (Placeholder) */}
                <motion.div
                    className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-square flex items-center justify-center"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    {/* Decorative Frame */}
                    <div className="absolute inset-4 border border-ink-black/20 translate-x-4 translate-y-4" />
                    <div className="relative w-full h-full overflow-hidden shadow-2xl bg-white">
                        {/* Using the generated placeholder - Update path when relevant */}
                        <div className="relative w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                            <Image
                                src="/artist_placeholder_ink.png" // User will see this if copied to public, otherwise we use absolute path for dev? Next.js needs it in public.
                                alt="Portrait"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Right: Biography */}
                <motion.div
                    className="w-full md:w-1/2 space-y-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className="space-y-2">
                        <h3 className="text-seal-red font-serif text-lg tracking-widest">{t.intro.bioTitle}</h3>
                        <h2 className="text-4xl md:text-5xl font-calligraphy text-ink-black">{t.intro.name}</h2>
                        <p className="text-xl font-serif text-ink-black/60">{t.intro.titles}</p>
                    </div>

                    <div className="space-y-6 font-serif text-lg leading-relaxed text-neutral-800 text-justify">
                        <p>
                            <strong>{t.intro.desc1Strong}</strong>
                        </p>
                        <p>
                            {t.intro.desc2}
                        </p>
                        <p>
                            {t.intro.desc3}
                        </p>
                        <p>
                            {t.intro.desc4}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        {t.intro.tags.map((title, i) => (
                            <span key={i} className="px-4 py-2 border border-ink-black/10 rounded-full text-sm hover:bg-ink-black hover:text-white transition-colors cursor-default">
                                {title}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-10 right-0 text-[10rem] opacity-5 font-calligraphy pointer-events-none select-none writing-vertical-rl">
                墨韵
            </div>
        </section>
    );
}
