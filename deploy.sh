#!/usr/bin/env bash
set -e

echo "🚀 [1/3] Kiểm tra cấu trúc website..."
python3 _validate.py

echo "📦 [2/3] Commit & Push lên GitHub..."
git add .
COMMIT_MSG="${1:-update: sync changes to production}"
if git diff --staged --quiet; then
  echo "ℹ️ Không có thay đổi mới cần commit."
else
  git commit -m "$COMMIT_MSG"
fi
git push origin main

echo "⛅ [3/3] Deploy lên Cloudflare Pages (vietd)..."
npx --yes wrangler pages deploy . --project-name=vietd --branch=main

echo "✅ Hoàn tất đồng bộ! Website đã online tại: https://vietd.pages.dev"
