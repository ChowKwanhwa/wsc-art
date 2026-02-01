'use client';

import { motion } from 'framer-motion';
import { Layers, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const collections = [
    {
        title: "禅意书法系列",
        subtitle: "Zen Calligraphy",
        desc: "以空灵淡远的笔墨，诠释佛家禅意与道家清静无为的哲学境界。字体多为行草，笔势连绵，气韵生动。",
        image: "/uploads/gallery/1769930774067_0_artist_placeholder_ink.png", // Corrected path
        count: "12 幅作品",
        color: "bg-stone-100"
    },
    {
        title: "岭南风物系列",
        subtitle: "Lingnan Landscape",
        desc: "描绘岭南地区的秀丽山水与人文风情，色彩明快清新，笔触细腻，展现南国独有的温润与生机。",
        image: "/uploads/gallery/1769930774067_1_artwork_placeholder_landscape.png",
        count: "8 幅作品",
        color: "bg-orange-50"
    },
    {
        title: "金石篆刻集",
        subtitle: "Seal Carving Collection",
        desc: "方寸之间见天地。收录了巫师传老师多年来的篆刻精品，朱白相间，刀法苍劲，古朴浑厚。",
        image: "/吉庐logo/logo_seal_carved.png",
        count: "24 方印章",
        color: "bg-red-50"
    },
    {
        title: "名家合作系列",
        subtitle: "Master Collaborations",
        desc: "与当代多位著名书画家联手创作的珍品，集诗书画印于一体，极具收藏价值与艺术欣赏价值。",
        image: "/uploads/gallery/1769930774067_0_artist_placeholder_ink.png",
        count: "5 幅作品",
        color: "bg-blue-50"
    }
];

export default function CollectionPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="container mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="flex justify-center mb-4">
                        <Layers className="w-12 h-12 text-seal-red" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-ma-shan-zheng mb-4 text-gray-900">精选收藏</h1>
                    <p className="text-lg text-gray-600 font-serif tracking-wide">Featured Collections</p>
                    <div className="w-24 h-1 bg-seal-red mx-auto mt-8 opacity-80" />
                </motion.div>

                {/* Series List */}
                <div className="space-y-12 max-w-5xl mx-auto">
                    {collections.map((coll, index) => (
                        <CollectionCard key={index} collection={coll} index={index} />
                    ))}
                </div>

                {/* Custom Commission Call to Action */}
                <div className="mt-24 bg-stone-900 text-white rounded-2xl p-12 text-center relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="text-3xl font-ma-shan-zheng mb-6">私人定制收藏</h3>
                        <p className="text-gray-300 font-serif mb-8 leading-relaxed">
                            如果您有特殊的题材需求或想要为特定空间定制专属作品，
                            吉庐提供专业的私人定制服务，为您打造独一无二的传世佳作。
                        </p>
                        <Link
                            href="/#footer"
                            className="inline-block px-8 py-3 bg-white text-ink-black rounded-full font-bold hover:bg-gray-100 transition-colors"
                        >
                            联系我们就定制 (Contact Us)
                        </Link>
                    </div>
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('/hero-texture.png')] bg-cover" />
                </div>

            </div>
        </main>
    );
}

function CollectionCard({ collection, index }: { collection: any; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`group relative flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 ${isEven ? '' : 'md:flex-row-reverse'}`}
        >
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative min-h-[300px] overflow-hidden">
                <div className={`absolute inset-0 ${collection.color} opacity-20 group-hover:opacity-0 transition-opacity`} />
                <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                        // Fallback handling if specific image fails, but can't do it in Server Component easily
                        // We rely on valid props.
                    }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
                <span className="text-xs font-bold tracking-widest text-seal-red mb-3 uppercase">
                    {collection.subtitle}
                </span>
                <h3 className="text-3xl font-bold font-ma-shan-zheng text-gray-900 mb-4 group-hover:text-seal-red transition-colors">
                    {collection.title}
                </h3>
                <p className="text-gray-600 font-serif leading-relaxed mb-8 text-justify">
                    {collection.desc}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
                    <span className="text-sm font-medium text-gray-500">{collection.count}</span>
                    <Link href="/gallery" className="flex items-center gap-2 text-ink-black font-bold hover:gap-3 transition-all">
                        浏览作品 <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
