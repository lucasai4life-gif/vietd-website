# VIETD Project Guidelines & Rules

## 1. QUY TẮC TỰ ĐỘNG ĐỒNG BỘ (BẮT BUỘC)
Sau mỗi lần hoàn thành bất kỳ task chỉnh sửa, tối ưu, hoặc sửa lỗi nào trong codebase:
1. **Kiểm tra cục bộ**: Luôn chạy `python3 _validate.py` để đảm bảo cấu trúc HTML/CSS và assets toàn vẹn, không có liên kết hỏng hay lỗi thẻ.
2. **Tự động Commit & Push lên GitHub**:
   - `git add .`
   - `git commit -m "<mô tả ngắn gọn thay đổi>"`
   - `git push origin main`
3. **Tự động Deploy Cloudflare Pages**:
   - Chạy `npx --yes wrangler pages deploy . --project-name=vietd --branch=main` (hoặc chạy `./deploy.sh "<mô tả>"`).
4. **Báo cáo kết quả**:
   - Báo cáo rõ mã commit đã push lên GitHub.
   - Báo cáo link Cloudflare Pages production (`https://vietd.pages.dev`).
   - **Tuyệt đối không dừng lại để chờ người dùng nhắc mới đồng bộ.**

## 2. Thông tin dự án
- **Repository**: `https://github.com/lucasai4life-gif/vietd-website.git` (nhánh `main`)
- **Cloudflare Pages Production**: `https://vietd.pages.dev` (Project: `vietd`)
- **Cloudflare Pages Git Integration**: `https://vietd-website.pages.dev` (Project: `vietd-website`)
