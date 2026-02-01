'use client';

import Link from "next/link";
import { Lock, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const handleLogout = () => {
        // Clear all admin auth tokens
        localStorage.removeItem("wsc_admin_auth"); // Legacy
        localStorage.removeItem("wsc_dashboard_auth");
        localStorage.removeItem("wsc_upload_auth");
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Admin Header */}
            <header className="bg-ink-black text-white py-4 px-6 shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-seal-red" />
                    <h1 className="font-serif text-lg tracking-widest">吉庐后台管理</h1>
                </div>
                <nav className="flex items-center gap-6 text-sm font-sans text-gray-300">
                    <Link
                        href="/admin/dashboard"
                        className={`hover:text-white transition-colors ${pathname === '/admin/dashboard' ? 'text-white font-bold' : ''}`}
                    >
                        管理看板
                    </Link>
                    <Link
                        href="/admin/upload"
                        className={`hover:text-white transition-colors ${pathname === '/admin/upload' ? 'text-white font-bold' : ''}`}
                    >
                        上传作品
                    </Link>
                    <button onClick={handleLogout} className="hover:text-white transition-colors flex items-center gap-1">
                        <LogOut className="w-4 h-4" /> 退出登录
                    </button>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
