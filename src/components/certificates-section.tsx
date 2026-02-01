'use client';

import { motion } from 'framer-motion';
import { Award, Star } from 'lucide-react';

const certificates = [
    {
        title: "深圳市书法家协会创始人",
        year: "1984",
        description: "参与创建深圳市书法家协会，担任主要负责人，推动深圳书法艺术发展。",
        icon: Star
    },
    {
        title: "中国书画名家网艺委会副主席",
        year: "2010",
        description: "受聘担任中国书画名家网艺委会副主席，指导全国书画艺术交流。",
        icon: Award
    },
    {
        title: "国家一级美术师",
        year: "2015",
        description: "获评国家一级美术师职称，表彰其在书法绘画领域的卓越成就。",
        icon: Award
    },
    {
        title: "中华诗词学会会员",
        year: "2018",
        description: "加入中华诗词学会，致力于传统诗词文化的创作与传承。",
        icon: Award
    }
];

export function CertificatesSection() {
    return (
        <section id="certificates" className="py-20 bg-stone-50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-ma-shan-zheng mb-4">荣誉资质</h2>
                    <p className="text-lg text-gray-600 font-serif">Certificates & Honors</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {certificates.map((cert, index) => {
                        const Icon = cert.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex gap-4"
                            >
                                <div className="flex-shrink-0">
                                    <div className="p-3 bg-seal-red/10 rounded-full">
                                        <Icon className="w-6 h-6 text-seal-red" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold font-serif">{cert.title}</h3>
                                        <span className="text-sm px-2 py-0.5 bg-gray-100 rounded text-gray-600">{cert.year}</span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed text-sm">{cert.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
