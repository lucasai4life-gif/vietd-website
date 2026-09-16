# VIETD — Viện Đào tạo & Phát triển Doanh nhân Việt Nam

Trang web chính thức của **Viện Đào tạo & Phát triển Doanh nhân Việt Nam (VIETD)** — Tiên phong đào tạo ứng dụng AI và chuyển giao giải pháp AI cho doanh nghiệp và tổ chức.

- **Website Production:** [https://vietd.pages.dev](https://vietd.pages.dev)
- **Deployment Platform:** Cloudflare Pages

---

## Cấu trúc dự án

```
Web VIETD/
├── index.html            # Trang chủ VIETD
├── ve-vietd.html         # Về VIETD (Tổng quan, Lãnh đạo, Hệ sinh thái, Đối tác)
├── dao-tao-ai.html       # Đào tạo AI (AI for Everyone, Professionals, Leaders)
├── giai-phap-ai.html     # Giải pháp AI (Marketing, Nhân sự, Vận hành, CX)
├── tin-tuc.html          # Tin tức & Sự kiện VIETD
├── assets/               # Hình ảnh, CSS, JS
│   ├── styles.css        # Hệ thống CSS Design System theo chuẩn thương hiệu VIETD
│   ├── main.js           # Xử lý navigation, mobile menu, modals, animations
│   └── *.jpg, *.png      # Hình ảnh lãnh đạo, hoạt động, logo VIETD
├── _validate.py          # Script kiểm tra tính toàn vẹn HTML và tài nguyên
└── SOURCE-AUDIT.md       # Tài liệu đối chiếu nguồn thông tin và định vị thương hiệu
```

---

## Kiểm tra cục bộ (Local Testing)

Mở trực tiếp các file `.html` trên trình duyệt hoặc sử dụng Python HTTP server:

```bash
# Khởi chạy server local
python3 -m http.server 8000
```
Sau đó truy cập `http://localhost:8000` trên trình duyệt.

Để chạy bộ kiểm tra cấu trúc liên kết và tài nguyên:
```bash
python3 _validate.py
```

---

## Triển khai Cloudflare Pages

Dự án được kết nối tự động với Cloudflare Pages. Khi code được push lên branch `main`, Cloudflare Pages sẽ tự động kích hoạt quá trình build và cập nhật phiên bản mới nhất tại:
👉 [https://vietd.pages.dev](https://vietd.pages.dev)
