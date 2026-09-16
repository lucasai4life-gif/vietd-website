# VIETD Website — Source Audit & Traceability

Every claim on the site maps to a labelled source. No invented facts.

## Source labels
- **[BRAND]** — `1789466214212_...jpg` (brand colour spec sheet, supplied by user)
- **[BRIEF]** — `Nội dung web vietd.docx` (final approved web content)
- **[PROFILE]** — `Profile Viện Đào tạo & Phát triển Doanh nhân Việt Nam (VIETD).pdf` (21 pages, official profile)
- **[ASSUMED]** — not stated in any source; placeholder or design decision

---

## 1. Brand system — [BRAND]

| Token | Hex | RGB | Role stated in spec |
|---|---|---|---|
| Burgundy (Primary) | `#981B22` | 152 27 34 | Main brand colour |
| Deep Burgundy | `#681217` | 104 18 23 | Sub-brand, footer, section titles |
| Heritage Gold | `#D5A84B` | 213 168 75 | Premium accents |
| Champagne Gold | `#E6C77B` | 230 199 123 | Light gold, background |
| Warm Ivory | `#F8F6F1` | 248 246 241 | Neutral main background |
| Charcoal | `#191B1F` | 25 27 31 | Body text, headings |
| Slate Gray | `#656A72` | 101 106 114 | Secondary text, metadata |
| Soft Border | `#E8E4DC` | 232 228 220 | Dividers, cards |
| Corporate Blue | `#174F78` | 23 79 120 | AI / technology / digital |
| VIETD Blue | `#1C7389` | 28 115 185* | Links, infographics |

*Spec sheet states RGB 28 115 185 for VIETD Blue; hex given as `#1C7389`.
**Discrepancy logged:** `#1C7389` = RGB(28,115,137), but spec text says RGB(28,115,185).
Hex value treated as authoritative (it renders as the teal-blue seen in the spec's own swatch).
Flagged in README for client confirmation.

### Usage ratio — [BRAND]
- Warm Ivory / White — **65%**
- Charcoal — **15%**
- Burgundy — **10%**
- Blue (technology) — **7%**
- Gold — **3%**

The CSS enforces this ratio: ivory-dominant surfaces, charcoal text, burgundy accents,
blue reserved for AI/technology sections, gold only for eyebrow labels and honours.

### Tagline — [BRAND]
> "Nâng tầm tri thức · Kiến tạo tương lai"
> Sub-line: "Hiện đại · Uy tín · Phát triển bền vững"

### CTA style — [BRAND]
- Primary: solid Burgundy pill, white text, arrow →
- Secondary: outline pill, `1px` champagne-gold border, burgundy text, arrow →

---

## 2. Identity & contact — [PROFILE p.1]

- Legal name: **Viện Đào tạo & Phát triển Doanh nhân Việt Nam (VIETD)**
- English: Vietnam Institute for Entrepreneur Training and Development *(from logo lockup, [PROFILE p.1])*
- Headquarters: **155-157 An Dương Vương, Phường An Đông, Tp. Hồ Chí Minh**
- Transaction office: **Số 6 Thái Văn Lung, Phường Sài Gòn, Tp. Hồ Chí Minh**
- Email: `viendoanhnhan.vietd@gmail.com` **[PROFILE p.1]**
- Website: `vietd.edu.vn` **[PROFILE p.1]**
- Logo tagline: **"Beyond Learning"** *(observed in profile footer lockups)*

**Phone number: NOT FOUND in any source.** Marked `[ASSUMED — awaiting client]` on the site.

---

## 3. Vision / mission / values

**[PROFILE p.3 — VIETD's own wording, treated as canonical]**
- Sứ mệnh: "Nâng tầm tri thức cho cộng đồng người Việt Nam, khai mở tiềm năng trí tuệ,
  tạo nên thế hệ trẻ ưu tú có nền tảng thể chất tốt, trí tuệ vượt trội, có nhân cách tốt,
  có kỹ năng sống, bắt nhịp kịp, tự tin hòa nhập nền kinh tế và giáo dục Thế Giới."
- Tầm nhìn: "Viện Đào tạo VIETD trở thành tổ chức giáo dục hàng đầu Việt Nam về phát triển tiềm năng con người."
- Giá trị cốt lõi: "Lắng nghe, trách nhiệm, đổi mới, yêu thương, chuyên nghiệp, hợp tác,
  nhất quán, cam kết, minh bạch, biết ơn!"

Core values **Tâm – Tín – Trí – Đức** with definitions — **[PROFILE p.3]**

**[BRIEF] gives a condensed business voice** for the AI positioning; used for the AI-facing pages,
[PROFILE] wording used for the institutional/about pages. Both retained deliberately.
Where they differ in emphasis, the site presents [PROFILE] as the institute's founding charter
and [BRIEF] as the AI-era extension. This is logged, not silently merged.

**[PROFILE p.4] also records:** Montessori, Glenn Doman, Shichida methods; IQ/EQ/AQ development;
philosophy "học làm người, học làm việc, học làm giàu".

---

## 4. Leadership — CONFLICT RESOLVED

| Role | [PROFILE p.5] | [BRIEF] | Site uses |
|---|---|---|---|
| Chủ tịch | DƯƠNG MẠNH HẢI — TS Kinh tế, Ths. Luật | same | **PROFILE** |
| Viện trưởng | DƯƠNG MẠNH HÙNG — Master MBA, Luật sư | same | **PROFILE** |
| Phó Viện trưởng | ĐỖ ĐỨC KHẢ, ĐINH VĨNH CƯỜNG (Thạc sĩ), VŨ NGỌC SỸ, NGUYỄN NGỌC HUY | ĐINH VĨNH CƯỜNG, VŨ NGỌC SỸ, NGUYỄN NGỌC HUY (no Đỗ Đức Khả) | **PROFILE** |

**Discrepancy logged:** [BRIEF] omits **ĐỖ ĐỨC KHẢ** (Phó Viện trưởng, TS. Quản Lý Kinh tế),
who is present in [PROFILE p.5] with a portrait and an org-chart position.
The site includes him — [PROFILE] is the oficial published document with his photograph.
**Action required:** client to confirm whether he is still in post.

Portraits for all five are extracted from [PROFILE p.5]. No stock faces are used.

Also noted but NOT placed on the site (single-source, no portrait, unclear scope):
**NGUYỄN THANH QUANG — Giám Đốc Điều Hành**, named in a [PROFILE p.13] photo caption.
Logged as an open item rather than silently dropped or silently promoted.

---

## 5. Ecosystem — [PROFILE p.8]

Centres, offices and clubs stated in the profile. Reproduced as listed:
- Văn phòng đại diện VIETD Đắk Lắk
- Trung tâm phát triển Quỹ Vietd (VDFC)
- Trung tâm xúc tiến thương mại đầu tư quốc tế Thái Mỹ (VITP)
- Trung tâm giao lưu và hợp tác quốc tế VN–TQ
- Trung tâm điều phối xúc tiến thương mại điện tử Asean tại VN
- Trung tâm phát triển cây nông nghiệp công nghệ cao
- Chi hội: CLB Doanh nhân VIETD Đắk Lắk
- CLB Doanh nhân làm đẹp VIETD (VBB Club)
- CLB Khởi nghiệp sáng tạo (VCS Club)
- CLB Kết nối doanh nhân Việt Nam quốc tế (VIENC)
- CLB Sinh viên khởi nghiệp (VSSV Club)

Four operating pillars — **[PROFILE p.6]:**
1. Tư vấn, setup Tái cấu trúc Doanh nghiệp
2. Đào tạo chuyển giao quy trình cho Đơn vị QLHC & DN
3. Giáo dục định hướng nghề nghiệp
4. Giải pháp Công nghệ & Chuyển đổi số

---

## 6. Track record — [BRIEF] "NĂNG LỰC VIETD"

10.000+ học viên · 100+ dự án & chương trình · 50+ đối tác & khách hàng · 10+ năm kinh nghiệm

Source: [BRIEF]. Not independently verifiable from [PROFILE].
Site presents them as VIETD's own stated figures; labelled as client-provided.

---

## 7. Customers — [PROFILE pp.18-20]

Logo wall extracted verbatim from [PROFILE p.18]. Legible brands include:
Manulife · Phú Hưng · Hanwha Life Bảo hiểm Nhân thọ · Vietsovpetro · Petrovietnam PV Trans ·
Vedan · Bibica (PAN Group) · Dây cáp điện CADIVI · Trường Thành · TTP Toàn Thịnh Phát ·
SEAREFICO · VNSTEEL Thép Miền Nam · Phong Phú · HMC · Thăng Lợi · EVNSPC PC Long An ·
EVNSPC Công ty TNHH Viễn thông · BWACO · DAKWACO · Cholontourist · Bệnh viện Thiện Hạnh ·
NBC · SEANAMICO

**[BRIEF] flags:** "CẦN BỔ SUNG: rà soát danh sách logo được phép công bố chính thức."
→ The wall is rendered **de-emphasised** (grayscale-lift on hover) and the site carries no
claim of endorsement beyond "khách hàng tiêu biểu" as the profile itself states.
**Action required:** client to confirm publication rights.

---

## 8. Activity imagery — [PROFILE pp.9-17]

Six authentic photographs extracted, each with its real caption from the profile:
- p.9 — Đoàn Doanh Nhân Việt Nam Yết kiến Tổng bí thư, Chủ tịch nước Tô Lâm, 13/10/2024
- p.10 — Viện Trưởng DƯƠNG MẠNH HÙNG cùng Đoàn Doanh nghiệp Việt Nam, Hội nghị G7 Quebec, Canada 2018
- p.10 — Hợp tác triển khai công nghệ số, Bộ Quốc Phòng tỉnh Khánh Hoà
- p.11 — Hội nghị xúc tiến thương mại Thủ Đức – Cần Thơ – Thanh Hoá, TP. Cần Thơ
- p.14 — Lễ ký kết ASP (Công viên Phần mềm Quân đội) và VIETD
- p.15 — Chương trình đào tạo / workshop

Captions on the site are taken from the profile. No stock photography is used anywhere.

---

## 9. Navigation & page structure — [BRIEF]

**[BRIEF] defines the exact information architecture.** Implemented as written:

```
HOME
├── VỀ VIETD
│   ├── Tổng quan — Giới thiệu · Sứ mệnh · Tầm nhìn · Giá trị cốt lõi
│   ├── Ban lãnh đạo & Chuyên gia
│   ├── Hệ sinh thái & Pháp lý — Hệ sinh thái · Pháp lý · Chứng nhận
│   └── Đối tác & Hoạt động — Khách hàng · Đối tác · Hình ảnh hoạt động
├── ĐÀO TẠO AI
│   ├── AI for Everyone
│   ├── AI for Professionals
│   └── AI for Leaders
├── GIẢI PHÁP AI
│   ├── Sales & Marketing
│   ├── People & Learning
│   ├── Operations
│   └── Customer Experience
└── TIN TỨC & CHIA SẺ
    ├── Tin tức VIETD
    └── Kiến thức & Góc nhìn AI
```

**[BRIEF] mandates:** "Nút Liên hệ tư vấn mở form popup, không tạo trang riêng."
→ Implemented exactly: every "Liên hệ tư vấn" opens a modal, never navigates.

### Content authored from [BRIEF] — implemented verbatim
- Homepage: Hero, Năng lực, Hai trụ cột, LEARN→APPLY→BUILD→SCALE framework,
  3 principles (THỰC TIỄN / HỆ THỐNG / PHÙ HỢP), final CTA
- Về VIETD: 5 sections (Hero, Tổng quan, Ban lãnh đạo, Hệ sinh thái & Pháp lý, Đối tác & Hoạt động)
- Đào tạo AI: 5 sections incl. LEARN→PRACTICE→APPLY→IMPROVE
  ⚠️ [BRIEF] explicitly advises AGAINST reusing the homepage framework here. Followed.
- Giải pháp AI: 5 sections incl. DISCOVER→DESIGN→BUILD→DEPLOY
  ⚠️ [BRIEF] explicitly advises this framework belongs to the Solutions page only. Followed.

### Form fields — [BRIEF], [PROFILE p.6 illustration]
Họ và tên* · Doanh nghiệp/Tổ chức* · Số điện thoại* · Email ·
Nhu cầu tư vấn* (Đào tạo AI / Giải pháp AI / Khác) · Nội dung cần trao đổi

---

## 10. Items the brief flags as outstanding

Reproduced in the README as a client checklist, not hidden:
- Official phone number
- Tuition, duration, syllabus, certification criteria
- Legal registration document details (number, issuer, date) + high-res scans
- Customer/partner logo publication rights
- HR/Learning and website portfolio scopes
- Whether ĐỖ ĐỨC KHẢ remains Phó Viện trưởng
- Contact form submission endpoint

---

## 11. Design decisions — [ASSUMED]

Not specified by any source; recorded so the client can overrule:
- Typography: `Be Vietnam Pro` (headings + body) — a Vietnamese-designed typeface with
  complete diacritic support, chosen over a Latin-only face for rendering correctness
- Section rhythm: ivory base with alternating deep-burgundy "authority" bands
- Gold used only for eyebrow labels, rules and honours — never body text or large fills
- Blue restricted to AI/technology contexts, per the spec's stated role
- Animations: scroll-reveal only; `prefers-reduced-motion` respected
- No stock imagery, no invented testimonials, no fabricated statistics

---

## 12. Verification method

- Docx text extracted directly from `word/document.xml` (raw XML, all runs preserved)
- PDF text and images extracted with PyMuPDF; images cropped from rendered pages at
  5×–18× scale to recover resolution
- Logo alpha channel built by luminance keying; verified `alpha` range 0–255
- Brand hex values read from the spec sheet and cross-checked against the
  logo's own dominant colours — Burgundy #981B22 ≈ logo (155,44,48);
  Gold #FFCA58 ≈ logo (255,202,88); Blue #1B75BB ≈ logo (27,117,187)

All extraction was performed on local copies. Originals in `Downloads/` were not modified.

---

## 13. QA round — visual & responsive verification

Verification used headless Chrome (render + DOM measurement) and a Python
`HTMLParser`-based structural checker. Findings were reproduced before any fix.

### Defects found and fixed

| # | Defect | Evidence | Fix |
|---|---|---|---|
| 1 | **Duplicate CTA in header.** `Liên hệ tư vấn` appeared twice side by side on desktop. | Screenshot at 1440px showed two identical buttons; markup confirmed one inside `.nav`, one inside `.hdr-actions`. The in-`.nav` button belongs to the mobile drawer but was visible on desktop. | Added `.nav-cta` (hidden by default, `display:inline-flex` only inside the `max-width:1080px` drawer) to all 5 pages. |
| 2 | **Reveal animation hid content without JS.** `.rv{opacity:0}` meant every animated block was invisible if the script failed to load, was blocked, or for crawlers/print. | DOM probe with JS disabled showed all `.rv` blocks at `opacity:0`. | Gated the hidden state behind `html.js`, armed by an inline script in `<head>` before the stylesheet. Verified: with JS disabled the page now renders fully visible. |
| 3 | **Hero float badge overlapped the photo caption.** `Uy tín từ thực tiễn` sat on top of the caption text. | Screenshot at 1440px showed caption text obscured at bottom-right of the hero frame. | Reserved `padding-right:min(46%, 15rem)` on `.hero-frame-cap` on desktop; reset to normal padding ≤640px. |
| 4 | **Hero floats clipped the caption on phones.** `--tl`/`--br` badges are absolutely positioned outside the frame and collided with content at ≤640px. | Screenshot at 430px showed the `10+` badge and caption colliding. | ≤640px: badges drop into normal flow (`position:static`, full width) instead of overlapping. |

### Measured results after fixes

- **Structural validation:** all 5 pages PASS — no unclosed tags, no duplicate IDs,
  no `label`→missing-control, no broken internal links, no missing anchors or assets.
- **Responsive overflow:** 45 combinations (5 pages × 9 widths: 320/390/430/600/768/900/1080/1280/1440px)
  → `scrollWidth == clientWidth` everywhere. **No horizontal overflow at any width.**
- **Content fit at 430px** (`clientWidth` 415): `h1` R=397, `p` R=397, `.hero-badge` R=395 — all inside the viewport.
- **Header:** verified at 1440px (full nav, single CTA) and ≤1080px (drawer + single CTA).

### Method notes (false-positive traps)

Two measurement traps were encountered and corrected. Recorded here because they
would otherwise produce misleading "pass" or "fail" results:

1. **`.rv` blocks looked blank in full-page screenshots.** Headless Chrome captures
   the full page height while the viewport stays at the top, so below-the-fold
   `IntersectionObserver` callbacks never fire. Rendering with a tall
   `--window-size` (9000px) revealed the content was present and correct. The
   blank appearance was a capture artifact, not a layout defect.
2. **The overflow checker initially flagged the mobile nav.** `nav.nav` is
   `position:fixed; transform:translateX(100%)` — deliberately parked off-canvas as
   a closed drawer. Element-bounding-box tests report transformed positions and so
   produce false positives. `scrollWidth > clientWidth` on the root element is the
   authoritative test and reports **no** overflow.

A third issue was a bug in the validator itself, not the site: an early checker did
not implement `handle_startendtag`, so the 26 self-closing SVG `<path/>` elements
were pushed onto the element stack and never popped, corrupting the balance check
and reporting the whole document as unclosed. The corrected validator handles void
elements, self-closing tags, and raw-text elements (`script`/`style`).

---

## 14. Leadership section — verification and correction

### The trap: text extraction missed a real person

An audit pass searched the PDF text layer for the name "KHẢ" and found **zero
hits**, which initially suggested that **ĐỖ ĐỨC KHẢ** had been invented. That
conclusion was **wrong**.

Rendering page 5 at 4× and cropping the name box proved the name is genuinely
present — it is drawn as **vector outlines**, not as live text, so
`get_text()` cannot see it. The rendered org chart reads:

| Position | Person | Credential | Role |
|---|---|---|---|
| Box 1 (y≈246) | DƯƠNG MẠNH HẢI | Tiến Sỹ Kinh Tế - Ths. Luật | Chủ Tịch |
| Box 2 (y≈377) | DƯƠNG MẠNH HÙNG | Master MBA, Luật sư | Viện Trưởng |
| Row x≈17 | **ĐỖ ĐỨC KHẢ** | TS. (Ph.d) Quản Lý Kinh Tế | Phó Viện Trưởng |
| Row x≈155 | ĐINH VĨNH CƯỜNG | Thạc sĩ | Phó Viện Trưởng |
| Row x≈303 | VŨ NGỌC SỸ | — | Phó Viện Trưởng |
| Row x≈450 | NGUYỄN NGỌC HUY | — | Phó Viện Trưởng |

**Lesson recorded:** for this PDF, text extraction alone is not authoritative.
Names rendered inside graphic boxes may be vector outlines. Always render the
page and read it visually before concluding a name is absent.

### Portrait → name mapping (derived from geometry, not guessed)

Mapping was established by comparing each image's placement rect against the
rendered org chart, then confirmed with a contact sheet:

| xref | native px | file | person |
|---|---|---|---|
| 273 | 69×93 | `leader-hai` | DƯƠNG MẠNH HẢI |
| 272 | 103×129 | `leader-hung` | DƯƠNG MẠNH HÙNG |
| 274 | 46×66 | `leader-kha` | ĐỖ ĐỨC KHẢ |
| 275 | 55×73 | `leader-cuong` | ĐINH VĨNH CƯỜNG |
| 276 | 61×70 | `leader-sy` | VŨ NGỌC SỸ |
| 277 | 49×73 | `leader-huy` | NGUYỄN NGỌC HUY |

### Corrections applied

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 5 | **Duplicated role text** on VŨ NGỌC SỸ and NGUYỄN NGỌC HUY — "Phó Viện trưởng" rendered twice (once as credential, once as role badge). | Card extraction showed `cred="Phó Viện trưởng"` **and** `role="Phó Viện trưởng"`. | Removed the duplicate `cred` span. `[BRIEF]` states no credential for these two. |
| 6 | **Portraits visually blurry.** Displayed at ~430px wide from a 46–66px source — a ~10× blow-up. | Native sizes measured from the PDF: 46×66 to 103×129 px. | Changed member cards from a large photo panel to a compact 72×86px avatar layout; portraits re-exported at 600px (2× retina for their display size). |

### Role badge vs credential — source resolution

`[BRIEF]` gives credentials for only two people; `[PROFILE]` gives a third.
The site now reflects exactly that, with no invention:

| Person | Credential shown | Source |
|---|---|---|
| DƯƠNG MẠNH HẢI | Tiến sĩ Kinh tế · Thạc sĩ Luật | [BRIEF] |
| DƯƠNG MẠNH HÙNG | Master MBA · Luật sư | [BRIEF] |
| ĐỖ ĐỨC KHẢ | TS. Quản Lý Kinh Tế | [PROFILE p.5] |
| ĐINH VĨNH CƯỜNG | Thạc sĩ | [BRIEF] |
| VŨ NGỌC SỸ | *(none shown)* | [BRIEF] states none |
| NGUYỄN NGỌC HUY | *(none shown)* | [BRIEF] states none |

**Open item — client confirmation still required:** `[BRIEF]` lists only five
leaders and omits ĐỖ ĐỨC KHẢ, while `[PROFILE]` includes him with a portrait and
a named position in the org chart. The site follows `[PROFILE]` (which the brief
itself acknowledges as the current source: *"Cơ cấu lãnh đạo trên được thể hiện
trong profile hiện tại của VIETD"*). **Please confirm he is still in post.**

### Portrait resolution — honest limitation

Source portraits are 1–2 KB JPEGs at 46–129 px wide. Output is generated at
600px (2× the maximum display size) so the browser never re-samples them. The
avatars now display at 72×86px, which is close to native, so they read as
intentional. **Higher-resolution originals should be requested from the client**
if these will appear larger anywhere (e.g. a future team detail page).


