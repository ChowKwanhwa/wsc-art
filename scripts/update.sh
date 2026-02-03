#!/bin/bash

# 确保脚本出错时停止
set -e

echo "🚀 开始更新 Wsc Art..."

# 1. 确保在正确的目录
cd /var/www/wsc-art || { echo "❌ 找不到项目目录 /var/www/wsc-art"; exit 1; }

# 2. 拉取最新代码
echo "📥 拉取代码 (git pull)..."
git pull

# 3. 安装可能的新依赖
echo "📦 检查依赖 (npm install)..."
npm install --production=false

# 4. 构建项目
echo "🏗️ 构建项目 (next build)..."
npm run build

# 5. 重启服务
echo "🔄 重启 PM2..."
pm2 restart wsc-art

echo "✅ 更新成功！服务已重启。"
