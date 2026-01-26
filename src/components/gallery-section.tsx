"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import galleryDataRaw from "@/data/gallery-data.json";
import { useLanguage } from "./language-provider";

// Type definition based on JSON structure
interface GalleryItem {
    id: string;
    category: string;
    title: string;
    imagePath: string;
    description: string;
}

const galleryData = galleryDataRaw as Record<string, GalleryItem[]>;

// Available categories
const CATEGORIES = [
    { id: 'calligraphy', labelKey: 'calligraphy' },
    { id: 'painting', labelKey: 'painting' },
    { id: 'life', labelKey: 'life' },
];

export function GallerySection() {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState("calligraphy");
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const items = galleryData[activeCategory] || [];

    // Filter out items without images if any (safety check)
    const validItems = items.filter(item => item.imagePath);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 px-4 md:px-0 bg-paper-white relative" id="gallery">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12 text-center px-4 md:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-calligraphy text-ink-black mb-6"
                >
                    {t.gallery.title}
                </motion.h2>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-4">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-2 rounded-full text-sm md:text-base font-serif transition-all duration-300 border ${activeCategory === cat.id
                                    ? "bg-ink-black text-white border-ink-black shadow-md transform scale-105"
                                    : "bg-transparent text-neutral-600 border-neutral-300 hover:border-ink-black/50"
                                }`}
                        >
                            {/* We need to ensure these keys exist in translations, defaulting to English labels for now if missing */}
                            {cat.id === 'calligraphy' ? (t.gallery.categories[0]?.title.split(' ')[0] || "Calligraphy") :
                                cat.id === 'painting' ? "国画 / Paintings" :
                                    cat.id === 'life' ? "生活 / Life" : cat.id}
                        </button>
                    ))}
                </div>
            </div>

            {/* Horizontal Scroll Carousel Container */}
            <div className="relative group w-full">
                {/* Scroll Controls (Visible on Desktop) */}
                <div className="hidden md:block absolute top-[43%] -translate-y-1/2 left-8 z-20">
                    <button
                        onClick={scrollLeft}
                        className="bg-white/80 backdrop-blur shadow-md hover:bg-white text-ink-black p-3 rounded-full transition-all hover:scale-110 active:scale-95 border border-neutral-200"
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>
                <div className="hidden md:block absolute top-[43%] -translate-y-1/2 right-8 z-20">
                    <button
                        onClick={scrollRight}
                        className="bg-white/80 backdrop-blur shadow-md hover:bg-white text-ink-black p-3 rounded-full transition-all hover:scale-110 active:scale-95 border border-neutral-200"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Carousel */}
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-6 px-4 md:px-12 py-8 pb-12 snap-x snap-mandatory scrollbar-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <AnimatePresence mode="popLayout">
                        {validItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className={`relative flex-none snap-center group/card cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 bg-white ${item.category === 'calligraphy'
                                        ? "w-[280px] h-[500px]" // Taller for calligraphy
                                        : "w-[360px] h-[260px]" // Wider for landscapes/photos
                                    }`}
                                onClick={() => setSelectedImage(item)}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={item.imagePath}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                                        sizes="(max-width: 768px) 80vw, 300px"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/card:opacity-100">
                                        <div className="bg-white/90 backdrop-blur text-ink-black px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                                            <ZoomIn size={16} />
                                            <span className="font-serif text-sm">
                                                {t.featured.hint}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Caption Strip */}
                                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-3 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 border-t border-neutral-100">
                                    <h3 className="font-serif text-ink-black font-medium truncate text-center">{item.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-6xl h-[85vh] bg-paper-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image Container */}
                            <div className="relative flex-1 bg-neutral-900/5 min-h-[50vh] md:min-h-full flex items-center justify-center p-4">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={selectedImage.imagePath}
                                        alt={selectedImage.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Info Container (if description exists) */}
                            {selectedImage.description && (
                                <div className="w-full md:w-[380px] flex-none flex flex-col border-l border-neutral-200 bg-white h-[40vh] md:h-full">
                                    <div className="p-6 md:p-8 overflow-y-auto h-full scrollbar-thin">
                                        <h3 className="text-2xl font-serif text-ink-black mb-6 pb-4 border-b border-neutral-100 sticky top-0 bg-white z-10">
                                            {selectedImage.title}
                                        </h3>
                                        {selectedImage.category === 'calligraphy' ? (
                                            <div className="prose prose-stone prose-sm max-w-none">
                                                <div className="whitespace-pre-line font-serif text-neutral-600 leading-relaxed font-light">
                                                    {selectedImage.description}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="font-serif text-neutral-600 leading-relaxed">
                                                {selectedImage.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* If no description, maintain modal structure */}
                            {!selectedImage.description && (
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                                    <h3 className="text-white text-xl font-serif text-center">{selectedImage.title}</h3>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
