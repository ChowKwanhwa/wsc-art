'use client';

import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

interface AuthGuardProps {
    children: React.ReactNode;
    requiredUser: string;
    requiredPass: string;
    storageKey: string;
    title: string;
}

export function AuthGuard({ children, requiredUser, requiredPass, storageKey, title }: AuthGuardProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const auth = localStorage.getItem(storageKey);
        if (auth === "true") {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [storageKey]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === requiredUser && password === requiredPass) {
            setIsAuthenticated(true);
            localStorage.setItem(storageKey, "true");
            setError("");
        } else {
            setError("Invalid credentials");
        }
    };

    if (isLoading) return null;

    if (!isAuthenticated) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-ink-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-gray-900">{title === 'Dashboard' ? '管理后台' : '员工上传'}登录</h1>
                        <p className="text-gray-500 text-sm">内部访问系统</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">账号 (Username)</label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ink-black/20 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">密码 (Password)</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ink-black/20 outline-none"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">账号或密码错误</p>}
                        <button
                            type="submit"
                            className="w-full bg-ink-black text-white hover:bg-gray-800 py-2.5 rounded-lg font-medium transition-colors"
                        >
                            进入系统
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
