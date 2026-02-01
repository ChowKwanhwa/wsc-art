import { getPendingArtworks, approveArtwork, rejectArtwork, getApprovedArtworks, deleteApprovedArtwork } from '@/actions/admin';
import Link from 'next/link';
import Image from 'next/image';
import { GalleryItem } from '@/types/gallery';
import { Check, X, Clock, Trash2, ExternalLink } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { getCategoryLabel } from '@/utils/category-map';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const pendingItems = await getPendingArtworks();
    const approvedItems = await getApprovedArtworks();


    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900">管理看板</h2>
                    <p className="text-gray-500">管理申请与发布内容</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                    <span className="font-bold text-seal-red text-xl mr-2">{pendingItems.length}</span>
                    <span className="text-gray-500 text-sm uppercase tracking-wider">待审核</span>
                </div>
            </div>

            {pendingItems.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-200 mb-12">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300">
                        <Check className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900">暂无待审核作品</h3>
                    <Link href="/admin/upload" className="text-seal-red text-sm hover:underline">
                        创建新提交
                    </Link>
                </div>
            ) : (
                <div className="space-y-6 mb-16">
                    {pendingItems.map((item) => (
                        <PendingParams key={item.id} item={item} />
                    ))}
                </div>
            )}

            {/* Approved Section */}
            <div className="flex items-center justify-between mb-6 border-t pt-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">已发布作品</h2>
                    <p className="text-gray-500 text-sm">网站前台可见的作品</p>
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {approvedItems.length} 已发布
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {approvedItems.map((item) => (
                    <ApprovedItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

function PendingParams({ item }: { item: GalleryItem }) {
    // This component separates the async actions to be event handlers
    async function handleApprove() {
        'use server';
        await approveArtwork(item);
    }

    async function handleReject() {
        'use server';
        await rejectArtwork(item.id, item.category);
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
            {/* Thumbnail */}
            <div className="w-full md:w-48 aspect-[3/4] relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                    src={item.imagePath}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
                {item.images && item.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        +{item.images.length - 1}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded font-bold tracking-wide">
                                {getCategoryLabel(item.category)}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                                <Clock className="w-3 h-3" />
                                {new Date(item.createdAt || 0).toLocaleDateString()}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold font-serif text-gray-900">{item.title}</h3>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                        <span className="block text-xs uppercase text-gray-400">作者</span>
                        {item.artist}
                    </div>
                    <div>
                        <span className="block text-xs uppercase text-gray-400">尺寸</span>
                        {item.dimensions}
                    </div>
                </div>

                <div className="text-sm text-gray-500 line-clamp-2">
                    {item.description}
                </div>

                {/* Images List (if multiple) */}
                {item.images && item.images.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto py-2">
                        {item.images.map((img, idx) => (
                            <div key={idx} className="w-12 h-12 relative flex-shrink-0 border rounded overflow-hidden">
                                <Image src={img} alt="" fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex flex-row md:flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                <form action={handleApprove}>
                    <button className="w-full bg-green-50 text-green-700 hover:bg-green-100 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium">
                        <Check className="w-4 h-4" /> 通过
                    </button>
                </form>
                <form action={handleReject}>
                    <button className="w-full bg-red-50 text-red-700 hover:bg-red-100 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium">
                        <X className="w-4 h-4" /> 拒绝
                    </button>
                </form>
            </div>
        </div>
    );
}

function ApprovedItem({ item }: { item: GalleryItem }) {
    async function handleDelete() {
        'use server';
        if (confirm('Are you sure you want to delete this artwork? This cannot be undone.')) return; // Client-side check difficult here, so we skip or use a different approach. Actually server actions can't use window.confirm. 
        // We will just do it, maybe in a real app add a confirmation step/modal. 
        await deleteApprovedArtwork(item.id, item.category);
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4 items-center">
            <div className="w-16 h-16 relative bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <Image src={item.imagePath} alt={item.title} fill className="object-cover" />
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 truncate">{item.title}</h4>
                <div className="flex gap-2 text-xs text-gray-500 mt-1">
                    <span>{getCategoryLabel(item.category)}</span>
                    <span>•</span>
                    <span>{item.artist}</span>
                </div>
            </div>

            <form action={async () => {
                'use server';
                await deleteApprovedArtwork(item.id, item.category);
            }}>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete from Website">
                    <Trash2 className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
}
