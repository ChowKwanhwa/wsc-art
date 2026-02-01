'use client';

import { useState } from 'react';
import { submitArtwork } from '@/actions/admin';
import { Loader2, Upload, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UploadPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        try {
            await submitArtwork(formData);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);

            // Reset form
            const form = document.querySelector('form') as HTMLFormElement;
            form.reset();
        } catch (e) {
            alert('Upload failed. Please try again.');
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
            setPreviews(prev => {
                prev.forEach(url => URL.revokeObjectURL(url));
                return newPreviews;
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-bold mb-6 text-gray-800 border-b pb-4">作品上传系统</h2>

            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2"
                >
                    <CheckCircle className="w-5 h-5" />
                    <span>上传成功！已自动提交至待审核列表。</span>
                </motion.div>
            )}

            <form action={handleSubmit} className="space-y-6">

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">作品图片 (最多5张)</label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 hover:bg-gray-50 transition-colors text-center">
                        <input
                            type="file"
                            name="images"
                            multiple
                            accept="image/*"
                            required
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">点击或拖拽图片至此处</p>
                        <p className="text-xs text-gray-400 mt-1">支持 JPG, PNG, WEBP 格式</p>
                    </div>

                    {/* Previews */}
                    {previews.length > 0 && (
                        <div className="mt-4 grid grid-cols-5 gap-2">
                            {previews.map((url, idx) => (
                                <div key={idx} className="relative aspect-square rounded overflow-hidden border border-gray-200">
                                    <img src={url} alt="预览" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">作品名称</label>
                        <input name="title" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ink-black/20 outline-none" placeholder="例如：兰亭序拓本" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                        <CategorySelector />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">作者</label>
                        <input name="artist" defaultValue="巫师传" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ink-black/20 outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">尺寸/规格</label>
                        <input name="dimensions" placeholder="例如：138cm x 69cm" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ink-black/20 outline-none" />
                    </div>
                </div>

                {/* Detailed Attributes Section */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 space-y-4">
                    <h3 className="font-bold text-gray-800 border-b pb-2 mb-4">详细参数 (选填)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">字体</label>
                            <input name="font" placeholder="例如：行书" className="w-full px-3 py-2 bg-white border rounded focus:ring-2 focus:ring-ink-black/20 outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">年代</label>
                            <input name="era" defaultValue="当代" className="w-full px-3 py-2 bg-white border rounded focus:ring-2 focus:ring-ink-black/20 outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">装裱</label>
                            <input name="mounting" defaultValue="未装裱" className="w-full px-3 py-2 bg-white border rounded focus:ring-2 focus:ring-ink-black/20 outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">材质</label>
                            <input name="material" defaultValue="纸本" className="w-full px-3 py-2 bg-white border rounded focus:ring-2 focus:ring-ink-black/20 outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">样式</label>
                            <input name="style" defaultValue="竖幅" className="w-full px-3 py-2 bg-white border rounded focus:ring-2 focus:ring-ink-black/20 outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">性质</label>
                            <input name="nature" defaultValue="原创" className="w-full px-3 py-2 bg-white border rounded focus:ring-2 focus:ring-ink-black/20 outline-none text-sm" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">购买链接 (微拍堂/淘宝等)</label>
                    <input
                        name="purchaseLink"
                        type="url"
                        placeholder="https://..."
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-seal-red/20 outline-none text-seal-red"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">作品简介</label>
                    <textarea
                        name="description"
                        rows={4}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ink-black/20 outline-none"
                        placeholder="请输入作品的背景故事、题词内容等..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-ink-black text-white hover:bg-gray-800 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>正在提交...</span>
                        </>
                    ) : (
                        '提交审核'
                    )}
                </button>
            </form>
        </div>
    );
}

function CategorySelector() {
    const [isCustom, setIsCustom] = useState(false);

    return (
        <div className="space-y-2">
            <select
                name="category"
                onChange={(e) => setIsCustom(e.target.value === 'custom')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ink-black/20 outline-none"
            >
                <option value="calligraphy">书法作品</option>
                <option value="painting">字画</option>
                <option value="seal">篆刻</option>
                <option value="life">艺术人生</option>
                <option value="custom">自定义类别</option>
            </select>

            {isCustom && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                    <input
                        name="customCategory"
                        required={isCustom}
                        placeholder="输入自定义分类ID (如 'ceramics')"
                        className="w-full px-4 py-2 border border-seal-red/30 bg-red-50 rounded-lg focus:ring-2 focus:ring-seal-red/20 outline-none text-seal-red text-sm"
                    />
                </motion.div>
            )}
        </div>
    );
}
