/**
 * Cloudflare Pages Function: /api/submit
 * Tự động nhận dữ liệu Lead từ Form và bắn thông báo tức thì qua Telegram Bot
 * Hoạt động 100% không cần hosting PHP/MySQL!
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // 1. Đọc dữ liệu gửi lên (Hỗ trợ cả JSON và FormData)
    let body = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const formData = await request.formData();
      body = Object.fromEntries(formData);
    }

    const name    = (body.name || "").trim();
    const org     = (body.org || "").trim();
    const tel     = (body.tel || "").trim();
    const email   = (body.email || "").trim();
    const need    = (body.need || "training").trim();
    const message = (body.message || "").trim();

    // UTM Tracking & Context
    const utm_source   = (body.utm_source || "").trim();
    const utm_medium   = (body.utm_medium || "").trim();
    const utm_campaign = (body.utm_campaign || "").trim();
    const page_url     = (body.page_url || request.headers.get("referer") || "").trim();

    // Thông tin địa chỉ IP & Vị trí do Cloudflare cung cấp
    const clientIp = request.headers.get("cf-connecting-ip") || "Unknown";
    const country  = request.headers.get("cf-ipcountry") || "VN";
    const city     = request.cf && request.cf.city ? request.cf.city : "";

    // 2. Kiểm tra tính hợp lệ cơ bản
    if (!name || !org || !tel) {
      return new Response(
        JSON.stringify({ success: false, message: "Vui lòng nhập đầy đủ họ tên, tổ chức và số điện thoại." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Mapping nhãn nhu cầu
    const needLabels = {
      "training": "🎓 Đào tạo AI",
      "solution": "🤖 Giải pháp AI",
      "trade-promotion": "🌐 Xúc tiến thương mại",
      "other": "🤝 Hợp tác khác"
    };
    const needDisplay = needLabels[need] || need;

    // 4. Gửi thông báo đến Telegram Bot
    const botToken = env.TELEGRAM_BOT_TOKEN;
    const chatId   = env.TELEGRAM_CHAT_ID;
    const threadId = env.TELEGRAM_THREAD_ID;

    let telegramSent = false;
    let telegramError = null;

    if (botToken && chatId) {
      const dateStr = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

      let utmInfo = "";
      if (utm_source || utm_campaign) {
        utmInfo = `\n🔗 <b>Nguồn:</b> ${utm_source || "-"} | <b>Campaign:</b> ${utm_campaign || "-"}`;
      }

      let locationInfo = "";
      if (clientIp) {
        locationInfo = `\n📍 <b>Vị trí:</b> ${city ? city + ", " : ""}${country} (<code>${clientIp}</code>)`;
      }

      const telegramText = `🔔 <b>CÓ YÊU CẦU TƯ VẤN MỚI — VIETD</b>
━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Họ và tên:</b> <b>${escapeHtml(name)}</b>
🏢 <b>Doanh nghiệp:</b> ${escapeHtml(org)}
📞 <b>Điện thoại:</b> <a href="tel:${escapeHtml(tel)}">${escapeHtml(tel)}</a>
✉️ <b>Email:</b> ${email ? escapeHtml(email) : "<i>(Chưa cung cấp)</i>"}
🎯 <b>Nhu cầu:</b> <b>${needDisplay}</b>
💬 <b>Nội dung:</b>
${message ? escapeHtml(message) : "<i>(Không có ghi chú thêm)</i>"}
━━━━━━━━━━━━━━━━━━━━━━
⏰ <b>Thời gian:</b> ${dateStr}${utmInfo}
🌐 <b>Trang gửi:</b> ${page_url || "vietd.pages.dev"}${locationInfo}`;

      const tgPayload = {
        chat_id: chatId,
        text: telegramText,
        parse_mode: "HTML",
        disable_web_page_preview: true
      };

      if (threadId) {
        tgPayload.message_thread_id = threadId;
      }

      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tgPayload)
        });

        const tgData = await tgRes.json();
        telegramSent = tgData.ok === true;
        if (!telegramSent) {
          telegramError = tgData.description;
        }
      } catch (tgErr) {
        telegramError = tgErr.message;
      }
    } else {
      telegramError = "Chưa cấu hình TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID trong Environment Variables trên Cloudflare.";
    }

    // 5. Lưu trữ vào Cloudflare D1 Database
    let d1Saved = false;
    if (env.DB) {
      try {
        await env.DB.prepare(
          `INSERT INTO leads (name, org, tel, email, need, message, utm_source, utm_campaign, page_url, client_ip)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(name, org, tel, email, needDisplay, message, utm_source, utm_campaign, page_url, clientIp)
        .run();
        d1Saved = true;
      } catch (dbErr) {
        console.error("Lỗi lưu D1 Database:", dbErr);
      }
    }

    // 6. Dự phòng: Gửi webhook lưu vào Google Sheets (nếu cấu hình)
    if (env.GOOGLE_SHEET_WEBHOOK) {
      try {
        await fetch(env.GOOGLE_SHEET_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name,
            org,
            tel,
            email,
            need: needDisplay,
            message,
            utm_source,
            utm_medium,
            utm_campaign,
            page_url,
            ip: clientIp
          })
        });
      } catch (sheetErr) {
        console.error("Lỗi gửi Google Sheet:", sheetErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Đã ghi nhận yêu cầu thành công!",
        telegram_sent: telegramSent,
        d1_saved: d1Saved,
        telegram_error: telegramError
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: "Lỗi máy chủ Cloudflare: " + err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
