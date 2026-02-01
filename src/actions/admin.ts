'use server';

import fs from 'node:fs/promises';
import path from 'node:path';
import { GalleryItem, GalleryData } from '@/types/gallery';
import { revalidatePath } from 'next/cache';

const PENDING_DATA_PATH = path.join(process.cwd(), 'src/data/pending-gallery-data.json');
const PUBLIC_DATA_PATH = path.join(process.cwd(), 'src/data/gallery-data.json');
const PENDING_UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/pending');
const GALLERY_UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/gallery');

// Ensure directories exist
async function ensureDirs() {
    await fs.mkdir(PENDING_UPLOAD_DIR, { recursive: true });
    await fs.mkdir(GALLERY_UPLOAD_DIR, { recursive: true });
}

export async function submitArtwork(formData: FormData) {
    await ensureDirs();

    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const customCategory = formData.get('customCategory') as string;
    const finalCategory = category === 'custom' ? customCategory : category;

    const artist = formData.get('artist') as string;
    const dimensions = formData.get('dimensions') as string;
    const description = formData.get('description') as string;
    const purchaseLink = formData.get('purchaseLink') as string;

    // Detailed attributes
    const font = formData.get('font') as string;
    const era = formData.get('era') as string;
    const mounting = formData.get('mounting') as string;
    const material = formData.get('material') as string;
    const style = formData.get('style') as string;
    const nature = formData.get('nature') as string;

    const images = formData.getAll('images') as File[];

    if (!title || !finalCategory || images.length === 0) {
        throw new Error('Missing required fields');
    }

    const id = Date.now().toString();
    const savedImagePaths: string[] = [];

    // Save images to pending folder
    for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const buffer = Buffer.from(await file.arrayBuffer());
        // Clean filename
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${id}_${i}_${safeName}`;
        const filePath = path.join(PENDING_UPLOAD_DIR, fileName);

        await fs.writeFile(filePath, buffer);
        savedImagePaths.push(`/uploads/pending/${fileName}`);
    }

    const newItem: GalleryItem = {
        id,
        category: finalCategory,
        title,
        imagePath: savedImagePaths[0],
        images: savedImagePaths,
        description,
        artist,
        dimensions,
        purchaseLink,
        font,
        era,
        mounting,
        material,
        style,
        nature,
        createdAt: Date.now(),
    };

    // Update pending JSON
    let pendingData: GalleryData = {};
    try {
        const fileContent = await fs.readFile(PENDING_DATA_PATH, 'utf-8');
        pendingData = JSON.parse(fileContent);
    } catch (e) {
        // File might not exist or be empty
        pendingData = {};
    }

    if (!pendingData[finalCategory]) {
        pendingData[finalCategory] = [];
    }
    pendingData[finalCategory].push(newItem);

    await fs.writeFile(PENDING_DATA_PATH, JSON.stringify(pendingData, null, 2));
    revalidatePath('/admin/dashboard');
    return { success: true };
}

export async function getPendingArtworks(): Promise<GalleryItem[]> {
    console.log('--- getPendingArtworks called ---');
    console.log('Reading from:', PENDING_DATA_PATH);
    try {
        const fileContent = await fs.readFile(PENDING_DATA_PATH, 'utf-8');
        console.log('File content length:', fileContent.length);

        const data: GalleryData = JSON.parse(fileContent);
        console.log('Parsed data keys:', Object.keys(data));

        // Flatten all categories into a single list
        const items = Object.values(data).flat().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        console.log('Found items:', items.length);
        return items;
    } catch (error) {
        console.error('Error in getPendingArtworks:', error);
        return [];
    }
}

export async function approveArtwork(item: GalleryItem) {
    // 1. Move images from pending to gallery
    const newImagePaths: string[] = [];

    for (const imgPath of (item.images || [item.imagePath])) {
        const fileName = path.basename(imgPath);
        const oldPath = path.join(PENDING_UPLOAD_DIR, fileName);
        const newPath = path.join(GALLERY_UPLOAD_DIR, fileName);

        try {
            await fs.rename(oldPath, newPath);
            newImagePaths.push(`/uploads/gallery/${fileName}`);
        } catch (e) {
            console.error(`Failed to move image: ${oldPath}`, e);
            // If move fails (e.g. file not found), keep old path to avoid crashing
            newImagePaths.push(imgPath);
        }
    }

    // 2. Update item paths
    const approvedItem: GalleryItem = {
        ...item,
        imagePath: newImagePaths[0],
        images: newImagePaths,
    };

    // 3. Add to public gallery data
    let galleryData: GalleryData = {};
    try {
        const fileContent = await fs.readFile(PUBLIC_DATA_PATH, 'utf-8');
        galleryData = JSON.parse(fileContent);
    } catch (e) {
        console.error("Error reading gallery data", e);
    }

    if (!galleryData[item.category]) {
        galleryData[item.category] = [];
    }
    galleryData[item.category].unshift(approvedItem); // Add to top

    await fs.writeFile(PUBLIC_DATA_PATH, JSON.stringify(galleryData, null, 2));

    // 4. Remove from pending data
    await removeFromPending(item.id, item.category);

    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return { success: true };
}

export async function rejectArtwork(id: string, category: string) {
    // 1. Get item to find images
    const items = await getPendingArtworks();
    const item = items.find(i => i.id === id);

    if (item) {
        // 2. Delete images
        for (const imgPath of (item.images || [item.imagePath])) {
            const fileName = path.basename(imgPath);
            const filePath = path.join(PENDING_UPLOAD_DIR, fileName);
            try {
                await fs.unlink(filePath);
            } catch (e) {
                console.error(`Failed to delete file: ${filePath}`, e);
            }
        }
    }

    // 3. Remove from JSON
    await removeFromPending(id, category);

    revalidatePath('/admin/dashboard');
    return { success: true };
}

async function removeFromPending(id: string, category: string) {
    let pendingData: GalleryData = {};
    try {
        const fileContent = await fs.readFile(PENDING_DATA_PATH, 'utf-8');
        pendingData = JSON.parse(fileContent);
    } catch (e) {
        return;
    }

    if (pendingData[category]) {
        pendingData[category] = pendingData[category].filter(i => i.id !== id);
        if (pendingData[category].length === 0) {
            delete pendingData[category];
        }
        await fs.writeFile(PENDING_DATA_PATH, JSON.stringify(pendingData, null, 2));
    }
}

export async function getApprovedArtworks(): Promise<GalleryItem[]> {
    try {
        const fileContent = await fs.readFile(PUBLIC_DATA_PATH, 'utf-8');
        const data: GalleryData = JSON.parse(fileContent);
        // Flatten all categories into a single list
        return Object.values(data).flat().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch (error) {
        return [];
    }
}

export async function deleteApprovedArtwork(id: string, category: string) {
    // 1. Get public to find images
    let galleryData: GalleryData = {};
    try {
        const fileContent = await fs.readFile(PUBLIC_DATA_PATH, 'utf-8');
        galleryData = JSON.parse(fileContent);
    } catch (e) {
        return { success: false, error: 'File not found' };
    }

    const items = galleryData[category] || [];
    const item = items.find(i => i.id === id);

    if (item) {
        // 2. Delete images
        for (const imgPath of (item.images || [item.imagePath])) {
            const fileName = path.basename(imgPath);
            const filePath = path.join(GALLERY_UPLOAD_DIR, fileName);
            try {
                await fs.unlink(filePath);
            } catch (e) {
                console.error(`Failed to delete file: ${filePath}`, e);
            }
        }

        // 3. Remove from JSON
        galleryData[category] = items.filter(i => i.id !== id);
        if (galleryData[category].length === 0) {
            delete galleryData[category];
        }
        await fs.writeFile(PUBLIC_DATA_PATH, JSON.stringify(galleryData, null, 2));
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard');
    return { success: true };
}
