'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Loader2, ChevronDown, ChevronLeft, ChevronRight, X, Filter } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GalleryItem, GalleryData } from '@/types/gallery';

import { getCategoryLabel } from '@/utils/category-map';

// Chunk 1: Imports removed

const categories = [
    { id: 'calligraphy', label: '书法作品' },
    { id: 'painting', label: '字画' },
    { id: 'seal', label: '篆刻' },
    { id: 'life', label: '艺术人生' },
    { id: 'other', label: '其他' },
];

const MAIN_CATEGORIES = ['calligraphy', 'painting', 'seal', 'life', 'other']; // "other" is special, but keys like "smoke" are strictly custom

const ITEMS_PER_PAGE_DESKTOP = 12; // Increased to approx 3 rows
const ITEMS_PER_PAGE_MOBILE = 4;

export function GallerySection({ showHeader = true, initialData }: { showHeader?: boolean; initialData: GalleryData }) {
    const galleryData = initialData;
    const [activeCategory, setActiveCategory] = useState('calligraphy');
    const [visibleItems, setVisibleItems] = useState<GalleryItem[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [dimensionFilter, setDimensionFilter] = useState('');
    const [subCategoryFilter, setSubCategoryFilter] = useState(''); // New: For custom categories under "Other"
    const [authorFilter, setAuthorFilter] = useState(''); // New: Filter by artist name

    // Ref for infinite scroll
    const bottomRef = useRef<HTMLDivElement>(null);

    // Identify custom categories (keys in data that are NOT in the fixed main list)
    // Note: 'other' is a UI tab, not a data key. Data keys will be 'smoke', 'wine', etc.
    const customCategoryKeys = useMemo(() => {
        const fixedKeys = ['calligraphy', 'painting', 'seal', 'life'];
        return Object.keys(galleryData).filter(key => !fixedKeys.includes(key));
    }, [galleryData]);
    // Get available dimensions for current category
    const availableDimensions = useMemo(() => {
        let items: GalleryItem[] = [];
        if (activeCategory === 'other') {
            // Combine all custom categories
            items = customCategoryKeys.flatMap(key => galleryData[key] || []);
        } else {
            items = galleryData[activeCategory] || [];
        }

        const dims = new Set(items.map(item => item.dimensions).filter(Boolean));
        return Array.from(dims).sort();
    }, [activeCategory, galleryData, customCategoryKeys]);

    // Get available artists for current category
    const availableArtists = useMemo(() => {
        let items: GalleryItem[] = [];
        if (activeCategory === 'other') {
            items = customCategoryKeys.flatMap(key => galleryData[key] || []);
        } else {
            items = galleryData[activeCategory] || [];
        }
        const artists = new Set(items.map(item => item.artist).filter(Boolean));
        return Array.from(artists).sort();
    }, [activeCategory, galleryData, customCategoryKeys]);

    // Filter items based on category, search query, and dimensions
    // Filter items based on category, search query, and dimensions
    const getFilteredItems = () => {
        let items: GalleryItem[] = [];

        if (activeCategory === 'other') {
            if (subCategoryFilter) {
                // Show specific custom category
                items = galleryData[subCategoryFilter] || [];
            } else {
                // Show ALL custom categories
                items = customCategoryKeys.flatMap(key => galleryData[key] || []);
            }
        } else {
            // Standard category
            items = galleryData[activeCategory] || [];
        }

        // Filter out items without images
        items = items.filter(item => item.imagePath);

        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            items = items.filter(item =>
                item.title.toLowerCase().includes(query) ||
                (item.description && item.description.toLowerCase().includes(query))
            );
        }

        // Dimension Filter
        if (dimensionFilter) {
            items = items.filter(item => item.dimensions === dimensionFilter);
        }

        // Author Filter
        if (authorFilter) {
            items = items.filter(item => item.artist === authorFilter);
        }

        return items;
    };

    // Reset logic when category, search, or filter changes
    useEffect(() => {
        const filtered = getFilteredItems();
        const isMobile = window.innerWidth < 768;
        const initialSize = isMobile ? ITEMS_PER_PAGE_MOBILE * 2 : ITEMS_PER_PAGE_DESKTOP;

        setVisibleItems(filtered.slice(0, initialSize));
        setPage(1);
        setHasMore(filtered.length > initialSize);
        setIsLoading(false);
    }, [activeCategory, searchQuery, dimensionFilter, subCategoryFilter, authorFilter]);

    // Reset filters when category changes
    useEffect(() => {
        setDimensionFilter('');
        setSubCategoryFilter('');
        setAuthorFilter('');
    }, [activeCategory]);

    // Load More Handler
    const loadMore = async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));

        const filtered = getFilteredItems();
        const isMobile = window.innerWidth < 768;
        const pageSize = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;
        const nextPage = page + 1;

        const nextItems = filtered.slice(0, (visibleItems.length + pageSize));

        setVisibleItems(nextItems);
        setPage(nextPage);
        setHasMore(filtered.length > nextItems.length);
        setIsLoading(false);
    };

    // Infinite Scroll for Mobile (using Intersection Observer)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Only trigger on mobile
                if (entries[0].isIntersecting && window.innerWidth < 768) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (bottomRef.current) observer.observe(bottomRef.current);
        return () => observer.disconnect();
    }, [hasMore, isLoading, visibleItems]); // Re-attach when list changes

    return (
        <section id="gallery" className="py-24 bg-white min-h-screen">
            <div className="container mx-auto px-6">

                {/* Header */}
                {showHeader && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 space-y-4"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-ma-shan-zheng">墨韵流芳</h2>
                        <p className="text-lg text-gray-600 font-serif">Calligraphy & Painting Gallery</p>
                    </motion.div>
                )}

                {/* Controls: Categories + Filters */}
                <div className="flex flex-col gap-6 mb-12">

                    {/* Categories */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-6 py-2 rounded-full text-lg transition-all duration-300 font-serif ${activeCategory === cat.id
                                    ? 'bg-ink-black text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Sub-Category Filter (Only for 'Other') */}
                    {activeCategory === 'other' && customCategoryKeys.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-center -mt-2 animate-fade-in">
                            <button
                                onClick={() => setSubCategoryFilter('')}
                                className={`px-4 py-1.5 rounded-full text-sm font-serif transition-colors ${!subCategoryFilter
                                    ? 'bg-seal-red text-white'
                                    : 'bg-white border border-gray-200 text-gray-500 hover:border-seal-red hover:text-seal-red'
                                    }`}
                            >
                                全部
                            </button>
                            {customCategoryKeys.map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setSubCategoryFilter(key)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-serif transition-colors ${subCategoryFilter === key
                                        ? 'bg-seal-red text-white'
                                        : 'bg-white border border-gray-200 text-gray-500 hover:border-seal-red hover:text-seal-red'
                                        }`}
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Search & Filter Bar */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-4xl mx-auto w-full">

                        {/* Search Input */}
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="搜索作品..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-ink-black/20 font-serif"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>

                        {/* Dimension Filter */}
                        <div className="relative w-full md:w-48 group">
                            <div className="relative">
                                <select
                                    value={dimensionFilter}
                                    onChange={(e) => setDimensionFilter(e.target.value)}
                                    className="w-full appearance-none pl-10 pr-8 py-2 border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-ink-black/20 font-serif cursor-pointer hover:border-gray-300 transition-colors"
                                >
                                    <option value="">所有尺寸</option>
                                    {availableDimensions.map((dim: unknown) => (
                                        <option key={String(dim)} value={String(dim)}>{String(dim)}</option>
                                    ))}
                                </select>
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors" />
                            </div>
                        </div>

                        {/* Author Filter */}
                        {availableArtists.length > 1 && (
                            <div className="relative w-full md:w-48 group">
                                <div className="relative">
                                    <select
                                        value={authorFilter}
                                        onChange={(e) => setAuthorFilter(e.target.value)}
                                        className="w-full appearance-none pl-10 pr-8 py-2 border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-ink-black/20 font-serif cursor-pointer hover:border-gray-300 transition-colors"
                                    >
                                        <option value="">所有作者</option>
                                        {availableArtists.map((artist: unknown) => (
                                            <option key={String(artist)} value={String(artist)}>{String(artist)}</option>
                                        ))}
                                    </select>
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors" />
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    <AnimatePresence mode="popLayout">
                        {visibleItems.map((item, index) => (
                            <motion.div
                                key={`${item.id}-${index}`}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group cursor-pointer flex flex-col gap-3"
                                onClick={() => {
                                    setSelectedImage(item);
                                    setCurrentImageIndex(0);
                                }}
                            >
                                {/* Image Card */}
                                <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-all">
                                    <Image
                                        src={item.imagePath}
                                        alt={item.title}
                                        fill
                                        quality={65}
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                                    {/* Tags Overlay (Bottom Log) - Hide for Life category */}
                                    {item.category !== 'life' && (
                                        <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end pointer-events-none">
                                            <span className="bg-seal-red/90 text-white text-xs px-2 py-1 rounded backdrop-blur-[2px] shadow-sm">
                                                {item.artist || '巫师传'}
                                            </span>
                                            <span className="bg-seal-red/90 text-white text-xs px-2 py-1 rounded backdrop-blur-[2px] shadow-sm">
                                                {item.dimensions || '-'}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold font-serif text-gray-900 line-clamp-1">{item.title}</h3>
                                    <div className="flex gap-2 text-xs text-gray-500">
                                        <span className="bg-gray-100 px-1.5 py-0.5 rounded">{getCategoryLabel(item.category)}</span>
                                        {item.dimensions && item.category !== 'life' && (
                                            <span className="bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">{item.dimensions}</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {visibleItems.length === 0 && !isLoading && (
                    <div className="text-center py-20 text-gray-400 font-serif">
                        <p>没有找到匹配的作品</p>
                        {(searchQuery || dimensionFilter) && (
                            <button
                                onClick={() => { setSearchQuery(''); setDimensionFilter(''); }}
                                className="mt-4 text-ink-black underline hover:text-seal-red"
                            >
                                清除筛选条件
                            </button>
                        )}
                    </div>
                )}

                {/* Load More Trigger */}
                <div className="mt-16 text-center">
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2 text-gray-500">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>正在加载更多佳作...</span>
                        </div>
                    ) : hasMore ? (
                        <>
                            {/* Desktop Button */}
                            <button
                                onClick={loadMore}
                                className="hidden md:inline-flex items-center gap-2 px-8 py-3 rounded-full border border-gray-300 hover:border-ink-black hover:bg-ink-black hover:text-white transition-all group font-serif"
                            >
                                <span>浏览更多</span>
                                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                            </button>

                            {/* Mobile Infinite Scroll Trigger */}
                            <div ref={bottomRef} className="md:hidden h-10" />
                        </>
                    ) : (
                        visibleItems.length > 0 && <p className="text-gray-400 font-serif italic">—— 已展示全部作品 ——</p>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm p-4 md:p-10 flex items-center justify-center"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative w-full max-w-6xl max-h-full flex flex-col md:flex-row gap-8 items-center" onClick={e => e.stopPropagation()}>
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-2 right-2 md:-top-8 md:-right-8 p-2 text-white/50 hover:text-white transition-colors z-50"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            {/* Image Container */}
                            <div className="relative w-full md:w-2/3 h-[50vh] md:h-[80vh] flex-shrink-0 flex flex-col gap-4">
                                <div className="relative w-full flex-1 min-h-0">
                                    <Image
                                        src={selectedImage.images ? selectedImage.images[currentImageIndex] : selectedImage.imagePath}
                                        alt={selectedImage.title}
                                        fill
                                        quality={90}
                                        className="object-contain"
                                    />

                                    {/* Artwork Navigation Arrows (Previous/Next Item) */}
                                    {visibleItems.length > 1 && (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const currentIndex = visibleItems.findIndex(item => item.id === selectedImage.id);
                                                    const prevIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
                                                    setSelectedImage(visibleItems[prevIndex]);
                                                    setCurrentImageIndex(0);
                                                }}
                                                className="fixed left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[70] backdrop-blur-sm group/nav"
                                                title="Previous Artwork"
                                            >
                                                <ChevronLeft className="w-8 h-8 opacity-70 group-hover/nav:opacity-100" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const currentIndex = visibleItems.findIndex(item => item.id === selectedImage.id);
                                                    const nextIndex = (currentIndex + 1) % visibleItems.length;
                                                    setSelectedImage(visibleItems[nextIndex]);
                                                    setCurrentImageIndex(0);
                                                }}
                                                className="fixed right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[70] backdrop-blur-sm group/nav"
                                                title="Next Artwork"
                                            >
                                                <ChevronRight className="w-8 h-8 opacity-70 group-hover/nav:opacity-100" />
                                            </button>
                                        </>
                                    )}

                                    {/* Internal Image Navigation Arrows (only if multiple images) */}
                                    {selectedImage.images && selectedImage.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : (selectedImage.images?.length || 1) - 1);
                                                }}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                            >
                                                ←
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentImageIndex(prev => prev < (selectedImage.images?.length || 1) - 1 ? prev + 1 : 0);
                                                }}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                            >
                                                →
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Thumbnails (only if multiple images) */}
                                {selectedImage.images && selectedImage.images.length > 1 && (
                                    <div className="h-20 w-full overflow-x-auto flex gap-2 justify-center py-2 custom-scrollbar">
                                        {selectedImage.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentImageIndex(idx);
                                                }}
                                                className={`relative w-16 h-16 flex-shrink-0 border-2 rounded overflow-hidden transition-all ${currentImageIndex === idx ? 'border-seal-red scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                                                    }`}
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`Thumbnail ${idx + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Info Panel */}
                            <div className="w-full md:w-1/3 text-white overflow-y-auto max-h-[30vh] md:max-h-[80vh] custom-scrollbar flex flex-col h-full">
                                <div className="flex-1">
                                    <h3 className="text-3xl font-bold font-ma-shan-zheng mb-6 text-seal-red">{selectedImage.title}</h3>

                                    {/* Detailed Attributes Table */}
                                    <div className="space-y-3 font-serif text-sm text-gray-300 mb-8">
                                        {[
                                            { label: '【字体】', value: selectedImage.font },
                                            { label: '【年代】', value: selectedImage.era },
                                            { label: '【尺寸/规格】', value: selectedImage.dimensions },
                                            { label: '【装裱】', value: selectedImage.mounting },
                                            { label: '【材质】', value: selectedImage.material },
                                            { label: '【样式】', value: selectedImage.style },
                                            { label: '【作者】', value: selectedImage.artist || '巫师传' },
                                            { label: '【性质】', value: selectedImage.nature },
                                        ].filter(attr => attr.value).map((attr, i) => (
                                            <div key={i} className="flex border-b border-dashed border-white/20 pb-2 last:border-0">
                                                <span className="font-bold text-gray-400 w-24 flex-shrink-0">{attr.label}</span>
                                                <span className="text-white">{attr.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Description */}
                                    <div className="prose prose-invert prose-sm max-w-none text-gray-300 font-serif leading-relaxed mb-8">
                                        <h4 className="font-bold text-gray-400 mb-2">作品简介</h4>
                                        <ReactMarkdown>{selectedImage.description || '中书协理事苏适精品书法作品\n竞拍成功赠送 收藏证书\n自然拍摄 无修图 实物更佳\n印刷品十倍赔偿'}</ReactMarkdown>
                                    </div>
                                </div>

                                {/* Purchase Button */}
                                <div className="pt-6 border-t border-white/10 mt-auto">
                                    <a
                                        href={selectedImage.purchaseLink || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-center w-full font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg text-lg tracking-widest ${selectedImage.purchaseLink
                                            ? 'bg-seal-red hover:bg-red-700 text-white'
                                            : 'bg-gray-700 cursor-not-allowed text-gray-400'
                                            }`}
                                        onClick={(e) => !selectedImage.purchaseLink && e.preventDefault()}
                                    >
                                        {selectedImage.purchaseLink ? '立即购买 / 竞拍' : '暂无购买链接'}
                                    </a>
                                    <p className="text-center text-xs text-gray-500 mt-3 font-serif">
                                        * 点击跳转至微拍堂进行交易
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
