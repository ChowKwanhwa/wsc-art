'use client';

import { motion } from 'framer-motion';
import { Award, Star, Scroll, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const certificates = [
    {
        title: "深圳市书法家协会创始人",
        year: "1984",
        category: "行业贡献",
        description: "参与创建深圳市书法家协会，担任主要负责人，推动深圳书法艺术发展。为特区初期文化建设做出了不可磨灭的贡献，见证了深圳书法从无到有的过程。",
        icon: Star
    },
    {
        title: "国家一级美术师",
        year: "2015",
        category: "专业职称",
        description: "获评国家一级美术师职称。这是国家对艺术家在专业领域的最高认可，象征着其在书法绘画艺术上的卓越造诣与深厚功底。",
        icon: Award
    },
    {
        title: "中国书画名家网艺委会副主席",
        year: "2010",
        category: "学术任职",
        description: "受聘担任中国书画名家网艺委会副主席，负责指导全国书画艺术交流活动，评审各类重要赛事，在业内享有崇高声誉。",
        icon: ShieldCheck
    },
    {
        title: "中华诗词学会会员",
        year: "2018",
        category: "文化传承",
        description: "加入中华诗词学会，致力于传统诗词文化的创作与传承。诗书画印兼修，体现了传统文人的全面素养。",
        icon: Scroll
    }
];

export default function CertificatePage() {
    return (
        <main className="min-h-screen bg-stone-50 pt-24 pb-20">
            <div className="container mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="flex justify-center mb-4">
                        <Award className="w-12 h-12 text-seal-red" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-ma-shan-zheng mb-4 text-gray-900">荣誉与资质</h1>
                    <p className="text-lg text-gray-600 font-serif tracking-wide">Honors & Certificates</p>
                    <div className="w-24 h-1 bg-seal-red mx-auto mt-8 opacity-80" />
                </motion.div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {certificates.map((cert, index) => (
                        <CertificateCard key={index} cert={cert} index={index} />
                    ))}
                </div>

                {/* Additional Context */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 max-w-3xl mx-auto text-center space-y-6"
                >
                    <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
                        <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">艺术成就</h3>
                        <p className="text-gray-600 leading-relaxed font-serif">
                            巫师传老师从艺六十余载，不仅在个人创作上达到了极高境界，更长期致力于书法教育与文化推广。
                            其作品多次在国内外大型展览中获奖，并被多家博物馆及专业机构收藏。
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

function CertificateCard({ cert, index }: { cert: any; index: number }) {
    const Icon = cert.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon className="w-32 h-32" />
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <span className="inline-block px-3 py-1 bg-red-50 text-seal-red text-xs font-bold rounded-full tracking-wider border border-red-100">
                        {cert.category}
                    </span>
                    <span className="text-4xl font-serif font-bold text-gray-100 group-hover:text-gray-200 transition-colors">
                        {cert.year}
                    </span>
                </div>

                <h3 className="text-2xl font-bold font-serif text-gray-900 mb-4 group-hover:text-seal-red transition-colors">
                    {cert.title}
                </h3>

                <p className="text-gray-600 leading-relaxed font-serif text-justify">
                    {cert.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-seal-red text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <Award className="w-4 h-4" />
                    <span>查看详情</span>
                </div>
            </div>

            {/* Border Effect */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-seal-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
}
