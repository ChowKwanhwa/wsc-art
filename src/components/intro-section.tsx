"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function IntroSection() {
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
                                alt="巫师传 Portrait"
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
                        <h3 className="text-seal-red font-serif text-lg tracking-widest">艺术家简介</h3>
                        <h2 className="text-4xl md:text-5xl font-calligraphy text-ink-black">巫师传</h2>
                        <p className="text-xl font-serif text-ink-black/60">字山竹 · 号吉塱山人 · 别署吉庐</p>
                    </div>

                    <div className="space-y-6 font-serif text-lg leading-relaxed text-neutral-800 text-justify">
                        <p>
                            <strong>诗心铸魂，墨韵千秋。</strong>
                        </p>
                        <p>
                            巫师传先生，1945年生于广东惠阳，乃<strong>深圳市书法家协会创始人之一</strong>。半个多世纪以来，先生于诗香墨韵间潜心耕耘，以“诗书合璧”之独特造诣，在当代书坛独树一帜。
                        </p>
                        <p>
                            其书，起于诗心，源于墨韵。挥毫落纸间，如有游龙惊鸿之姿，既具风樯阵马之雄浑气势，又不乏云升雾涌之含蓄意境。刚柔相济，铁画银钩，尽显毫端万象。
                        </p>
                        <p>
                            先生不仅是造诣精深的书法大家，更是一位境界高远的诗人。其诗词立足盛唐正脉，情真意切，立意高远。读其诗，可见笔墨之灵动；赏其字，可悟诗词之深邃。诗书交融，浑然天成，实乃当今书坛不可多得的“诗书双绝”大家。
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        {["中国书法家协会会员", "中华诗词学会会员", "中国楹联学会会员", "深圳书协创始人"].map((title, i) => (
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
