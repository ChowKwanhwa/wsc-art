import { GallerySection } from '@/components/gallery-section';
import { GalleryHero } from '@/components/gallery-hero';

export const metadata = {
    title: '作品集 Gallery - 吉庐艺术',
    description: '巫师传老师的书法、国画与篆刻作品展示',
};

export default function GalleryPage() {
    return (
        <main className="min-h-screen">
            <GalleryHero />
            <GallerySection showHeader={false} />
        </main>
    );
}
