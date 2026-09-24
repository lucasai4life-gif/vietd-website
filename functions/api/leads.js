/**
 * Cloudflare Pages Function: /api/leads
 * Trang xem & xuất danh sách Leads trực tiếp từ Cloudflare D1 Database
 * Bảo vệ bằng mã bảo mật query: ?key=vietd2026
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  // Kiểm tra mã khóa truy cập bảo mật
  if (key !== "vietd2026") {
    return new Response(
      `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>VIETD — Quản lý Leads</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; display: grid; place-items: center; height: 100vh; margin: 0; background: #f8f6f1; color: #191b1f; }
    .box { background: #fff; padding: 32px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); text-align: center; max-width: 400px; }
    h2 { color: #981b22; margin-top: 0; }
    input { width: 100%; padding: 10px; border: 1.5px solid #d1d5db; border-radius: 6px; box-sizing: border-box; margin: 12px 0; font-size: 15px; }
    button { width: 100%; padding: 10px; background: #981b22; color: #fff; border: 0; border-radius: 6px; font-weight: bold; cursor: pointer; }
    button:hover { background: #681217; }
  </style>
</head>
<body>
  <div class="box">
    <h2>VIETD Leads Access</h2>
    <p>Vui lòng nhập khoá bảo mật để xem danh sách khách hàng đăng ký:</p>
    <form method="get">
      <input type="password" name="key" placeholder="Nhập khoá bảo mật..." required autofocus>
      <button type="submit">Đăng nhập</button>
    </form>
  </div>
</body>
</html>`,
      { status: 401, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  if (!env.DB) {
    return new Response("Cơ sở dữ liệu D1 chưa được liên kết với project.", { status: 500 });
  }

  // Lấy toàn bộ danh sách lead từ bảng leads
  const { results } = await env.DB.prepare(
    "SELECT * FROM leads ORDER BY id DESC LIMIT 1000"
  ).all();

  // Kiểm tra nếu muốn xuất file CSV (?format=csv)
  if (url.searchParams.get("format") === "csv") {
    let csv = "\uFEFFID,Thời gian,Họ và tên,Doanh nghiệp,Số điện thoại,Email,Nhu cầu,Nội dung,Nguồn UTM,Campaign,Trang đăng ký,Địa chỉ IP\n";
    results.forEach(r => {
      const cleanMsg = (r.message || "").replace(/[\r\n]+/g, " ");
      csv += `"${r.id}","${r.created_at}","${r.name}","${r.org}","${r.tel}","${r.email || ""}","${r.need || ""}","${cleanMsg}","${r.utm_source || ""}","${r.utm_campaign || ""}","${r.page_url || ""}","${r.client_ip || ""}"\n`;
    });

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="vietd-leads-${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  }

  // Render bảng danh sách HTML
  let rowsHtml = "";
  if (!results || results.length === 0) {
    rowsHtml = `<tr><td colspan="9" style="text-align:center; padding:30px; color:#6b7280;">Chưa có dữ liệu lead nào được ghi nhận.</td></tr>`;
  } else {
    results.forEach(r => {
      rowsHtml += `
      <tr>
        <td><strong>#${r.id}</strong></td>
        <td><b>${escapeHtml(r.name)}</b><br><small style="color:#6b7280;">${escapeHtml(r.org)}</small></td>
        <td><a href="tel:${escapeHtml(r.tel)}" style="color:#1d4ed8;font-weight:600;">${escapeHtml(r.tel)}</a><br><small>${escapeHtml(r.email || '—')}</small></td>
        <td><span class="badge">${escapeHtml(r.need || 'Tư vấn')}</span></td>
        <td style="max-width:280px;font-size:13px;line-height:1.4;">${escapeHtml(r.message || '—')}</td>
        <td><small>Source: <b>${escapeHtml(r.utm_source || 'direct')}</b><br>Campaign: ${escapeHtml(r.utm_campaign || '—')}</small></td>
        <td><small>${escapeHtml(r.client_ip || '—')}</small></td>
        <td style="white-space:nowrap;font-size:12px;color:#4b5563;">${r.created_at}</td>
      </tr>`;
    });
  }

  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VIETD — Quản lý Leads (Cloudflare D1)</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8f6f1; margin: 0; padding: 24px; color: #191b1f; }
    .container { max-width: 1300px; margin: 0 auto; background: #fff; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 4px 16px rgba(0,0,0,0.04); overflow: hidden; }
    .header { padding: 20px 24px; background: linear-gradient(135deg, #681217, #981B22); color: #fff; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .btn-export { background: #D5A84B; color: #fff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 700; display: inline-block; transition: background .2s; }
    .btn-export:hover { background: #b88d36; }
    .stats { padding: 16px 24px; background: #fafafa; border-bottom: 1px solid #e5e7eb; font-size: 14px; font-weight: 600; color: #4b5563; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { background: #f3f4f6; color: #374151; font-weight: 700; font-size: 13px; padding: 12px 14px; border-bottom: 1px solid #e5e7eb; }
    td { padding: 12px 14px; border-bottom: 1px solid #f3f4f6; font-size: 14px; vertical-align: middle; }
    tr:hover { background: #fdfaf6; }
    .badge { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; padding: 3px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; white-space: nowrap; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1>VIỆN VIETD — Danh Sách Khách Hàng Tư Vấn</h1>
        <small style="opacity:.85;">Lưu trữ trực tiếp tại Cloudflare D1 Database</small>
      </div>
      <div>
        <a href="?key=vietd2026&format=csv" class="btn-export">⬇️ Xuất File Excel (CSV)</a>
      </div>
    </div>
    <div class="stats">
      Tổng cộng: <span style="color:#981B22;">${results.length}</span> lead được lưu trữ
    </div>
    <div style="overflow-x: auto;">
      <table>
        <thead>
          <tr>
            <th style="width:50px;">ID</th>
            <th>Khách hàng & Đơn vị</th>
            <th>Liên hệ</th>
            <th>Nhu cầu</th>
            <th>Nội dung trao đổi</th>
            <th>Chiến dịch (UTM)</th>
            <th>IP</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
