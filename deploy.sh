#!/usr/bin/env bash
set -e

echo "🚀 [1/4] Kiểm tra cấu trúc website cục bộ..."
python3 _validate.py

echo "📦 [2/4] Commit & Push lên GitHub..."
git add .
COMMIT_MSG="${1:-update: sync changes to production}"
if git diff --staged --quiet; then
  echo "ℹ️ Không có thay đổi mới cần commit."
else
  git commit -m "$COMMIT_MSG"
fi
git push origin main

echo "⛅ [3/4] Deploy lên Cloudflare Pages (vietd)..."
npx --yes wrangler pages deploy . --project-name=vietd --branch=main

echo "🔍 [4/4] Kiểm tra trạng thái production..."
curl -s -I -A "Mozilla/5.0" "https://vietd.pages.dev" | head -n 1
curl -s -I -A "Mozilla/5.0" "https://vietd-website.pages.dev" | head -n 1

echo "✅ Hoàn tất! Website đã online tại:"
echo "   - Production: https://vietd.pages.dev"
echo "   - Git Auto-Deploy: https://vietd-website.pages.dev"
