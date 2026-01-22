import type { Metadata } from "next";
import { Noto_Serif_SC, Ma_Shan_Zheng } from "next/font/google";
import "./globals.css";

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const maShanZheng = Ma_Shan_Zheng({
  variable: "--font-ma-shan-zheng",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Wsc Art | 巫师传 - 诗书双绝，翰墨大家",
  description: "巫师传（字山竹），中国书坛“诗书双绝”大家，深圳市书法家协会创始人之一。网站展示其行草书法、国画作品及诗词创作。诗心铸魂，墨韵千秋。",
  keywords: ["巫师传", "书法", "国画", "诗书合璧", "深圳书协", "行草", "Wsc Art", "Chinese Calligraphy", "艺术收藏"],
  icons: {
    icon: "/artwork_placeholder_landscape.png",
  },
  openGraph: {
    title: "Wsc Art | 巫师传 - 诗书合璧",
    description: "探索巫师传先生的艺术世界 - 诗心铸魂，墨韵千秋。",
    type: "website",
    locale: "zh_CN",
    siteName: "Wsc Art",
    images: [
      {
        url: "/artwork_placeholder_landscape.png",
        width: 1200,
        height: 630,
        alt: "Wsc Art - 巫师传",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${notoSerifSC.variable} ${maShanZheng.variable} antialiased bg-paper-white text-ink-black`}
      >
        {children}
      </body>
    </html>
  );
}
