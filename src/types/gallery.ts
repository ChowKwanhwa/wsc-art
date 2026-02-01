export interface GalleryItem {
    id: string;
    category: string;
    title: string;
    imagePath: string;
    images?: string[];
    description: string;
    artist?: string;
    dimensions?: string;
    // New detailed attributes
    purchaseLink?: string;
    font?: string;      // 字体
    era?: string;       // 年代
    mounting?: string;  // 装裱
    material?: string;  // 材质
    style?: string;     // 样式
    nature?: string;    // 性质
    createdAt?: number; // Useful for sorting
}

export interface GalleryData {
    [category: string]: GalleryItem[];
}
