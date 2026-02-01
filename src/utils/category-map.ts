export const CATEGORY_MAP: Record<string, string> = {
    calligraphy: '书法作品',
    painting: '字画',
    seal: '篆刻',
    life: '艺术人生',
    custom: '自定义',
};

export const getCategoryLabel = (category: string) => {
    return CATEGORY_MAP[category] || category;
};
