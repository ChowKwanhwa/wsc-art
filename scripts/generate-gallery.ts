
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'data', 'gallery-data.json');

const CATEGORIES = [
    { dir: '书法作品', id: 'calligraphy', hasMarkdown: true },
    { dir: '国画', id: 'painting', hasMarkdown: false },
    { dir: '生活', id: 'life', hasMarkdown: false },
];

interface GalleryItem {
    id: string;
    category: string;
    title: string;
    imagePath: string;
    description?: string;
    year?: string; // Optional, extract if possible or leave empty
}

function parseMarkdown(filePath: string) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        const title = lines[0].replace(/^#\s*/, '').trim();
        const description = lines.slice(1).join('\n').trim();
        return { title, description };
    } catch (e) {
        return { title: '', description: '' };
    }
}

function generateData() {
    const galleryData: Record<string, GalleryItem[]> = {};

    CATEGORIES.forEach((cat) => {
        const dirPath = path.join(PUBLIC_DIR, cat.dir);
        if (!fs.existsSync(dirPath)) {
            console.warn(`Directory not found: ${dirPath}`);
            return;
        }

        const files = fs.readdirSync(dirPath);
        const items: GalleryItem[] = [];

        files.forEach((file) => {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
                const basename = path.basename(file, ext);
                const imagePath = `/${cat.dir}/${file}`;
                let title = basename;
                let description = '';

                if (cat.hasMarkdown) {
                    const mdFile = path.join(dirPath, `${basename}.md`);
                    if (fs.existsSync(mdFile)) {
                        const mdData = parseMarkdown(mdFile);
                        if (mdData.title) title = mdData.title;
                        description = mdData.description;
                    }
                }

                items.push({
                    id: basename,
                    category: cat.id,
                    title,
                    imagePath,
                    description,
                });
            }
        });

        galleryData[cat.id] = items;
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(galleryData, null, 2));
    console.log(`Generated gallery data at ${OUTPUT_FILE}`);
}

generateData();
