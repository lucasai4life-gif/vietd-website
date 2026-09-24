/* ==========================================================================
   VIETD — Site behaviour
   - Mobile nav + dropdowns
   - Contact modal (per brief: popup only, no separate page)
   - Scroll reveal, sticky header
   - Accordions, form validation
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var $  = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };

  /* ---------------- Sticky header ---------------- */
  var header = $('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------- Mobile nav ---------------- */
  var toggle = $('.nav-toggle');
  var nav    = $('.nav');

  function setMobileNav(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    if (header) header.classList.toggle('is-menu-open', open);
    doc.body.style.overflow = open ? 'hidden' : '';
    doc.documentElement.style.overflow = open ? 'hidden' : '';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      setMobileNav(open);
    });
    // Close on link tap (mobile)
    $$('.nav a', nav).forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 1080 && !a.parentElement.classList.contains('nav-item')) {
          setMobileNav(false);
        }
      });
    });
    // Drawer CTA button tap (mobile)
    var navCta = $('.nav-cta', nav);
    if (navCta) {
      navCta.addEventListener('click', function () {
        if (window.innerWidth <= 1080) {
          setMobileNav(false);
        }
      });
    }
    // Close on Escape
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open') && (!modal || !modal.classList.contains('is-open'))) {
        setMobileNav(false);
        toggle.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1080 && nav.classList.contains('is-open')) {
        setMobileNav(false);
      }
    });
  }

  /* ---------------- Mobile dropdown accordion ---------------- */
  $$('.nav-link').forEach(function (link) {
    var item = link.parentElement;
    if (!item.classList.contains('nav-item')) return;
    if (!item.querySelector('.dropdown')) return;
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 1080) {
        e.preventDefault();
        var wasOpen = item.classList.contains('is-open');
        $$('.nav-item.is-open').forEach(function (o) {
          o.classList.remove('is-open');
          var l = o.querySelector('.nav-link');
          if (l) l.setAttribute('aria-expanded', 'false');
        });
        item.classList.toggle('is-open', !wasOpen);
        link.setAttribute('aria-expanded', !wasOpen ? 'true' : 'false');
      }
    });
  });

  /* ---------------- Contact modal ----------------
     Brief: "Nút Liên hệ tư vấn mở form popup, không tạo trang riêng."
     Every element with [data-consult] opens the modal. Nothing navigates. */
  var modal = $('#consult-modal');
  var lastFocus = null;

  function openModal(src) {
    if (!modal) return;
    lastFocus = doc.activeElement;
    if (nav && nav.classList.contains('is-open')) {
      setMobileNav(false);
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    doc.body.style.overflow = 'hidden';
    doc.documentElement.style.overflow = 'hidden';

    // If invoked from a specific context, pre-select the need
    var ctx = src && src.getAttribute ? src.getAttribute('data-context') : null;
    if (ctx) {
      var radio = modal.querySelector('input[name="need"][value="' + ctx + '"]');
      if (radio) radio.checked = true;
    }
    setTimeout(function () {
      var first = modal.querySelector('input, select, textarea');
      if (first) first.focus();
    }, 90);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!nav || !nav.classList.contains('is-open')) {
      doc.body.style.overflow = '';
      doc.documentElement.style.overflow = '';
    }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  $$('[data-consult]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(el);
    });
  });

  if (modal) {
    $$('[data-close]', modal).forEach(function (el) {
      el.addEventListener('click', closeModal);
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
      // Focus trap
      if (e.key === 'Tab' && modal.classList.contains('is-open')) {
        var f = $$('a[href], button:not([disabled]), input:not([disabled]), select, textarea', modal)
          .filter(function (el) { return el.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------------- Certificate Lightbox ---------------- */
  var certLightbox = $('#cert-lightbox');
  var certLastFocus = null;

  function openCertLightbox() {
    if (!certLightbox) return;
    certLastFocus = doc.activeElement;
    certLightbox.classList.add('is-open');
    certLightbox.setAttribute('aria-hidden', 'false');
    doc.body.style.overflow = 'hidden';
    doc.documentElement.style.overflow = 'hidden';
    var closeBtn = certLightbox.querySelector('.cert-lightbox-close, [data-close]');
    if (closeBtn) closeBtn.focus();
  }

  function closeCertLightbox() {
    if (!certLightbox) return;
    certLightbox.classList.remove('is-open');
    certLightbox.setAttribute('aria-hidden', 'true');
    if (!nav || !nav.classList.contains('is-open')) {
      doc.body.style.overflow = '';
      doc.documentElement.style.overflow = '';
    }
    if (certLastFocus && certLastFocus.focus) {
      certLastFocus.focus();
    }
  }

  $$('[data-open-cert]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openCertLightbox();
    });
  });

  if (certLightbox) {
    $$('[data-close]', certLightbox).forEach(function (el) {
      el.addEventListener('click', closeCertLightbox);
    });
    certLightbox.addEventListener('click', function (e) {
      if (e.target === certLightbox || e.target.classList.contains('cert-lightbox-backdrop')) {
        closeCertLightbox();
      }
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && certLightbox.classList.contains('is-open')) {
        closeCertLightbox();
      }
    });
  }

  /* ---------------- Accordions ---------------- */
  $$('.acc-h').forEach(function (h) {
    h.addEventListener('click', function () {
      var acc = h.parentElement;
      var open = acc.classList.toggle('is-open');
      h.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------------- Scroll reveal ---------------- */
  var rv = $$('.rv');
  if (rv.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      rv.forEach(function (el) { io.observe(el); });
    } else {
      rv.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---------------- Count-up for stats ---------------- */
  var counters = $$('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        cio.unobserve(el);
        var raw = el.getAttribute('data-count');
        var m = raw.match(/^([\d.]+)(.*)$/);
        if (!m || reduce) { el.textContent = raw; return; }
        var target = parseFloat(m[1].replace(/\./g, ''));
        var suffix = m[2] || '';
        var start = performance.now(), dur = 1100;
        (function step(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = Math.round(target * eased);
          el.textContent = val.toLocaleString('vi-VN') + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = raw;
        })(start);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------------- Interactive stats (single-select active) ---------------- */
  var statItems = $$('.stat-band .stat');
  if (statItems.length) {
    statItems.forEach(function (item) {
      function activate() {
        statItems.forEach(function (el) {
          if (el !== item) {
            el.classList.remove('active');
            el.setAttribute('aria-pressed', 'false');
          }
        });
        item.classList.add('active');
        item.setAttribute('aria-pressed', 'true');
      }

      item.addEventListener('click', activate);
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
  }

  /* ---------------- Form validation ----------------
  /* ---------------- Form validation & Cloudflare Function submission ----------------
     Submits to /api/submit (Cloudflare Pages Function) and triggers Telegram notification. */
  $$('form[data-consult-form], form#consult-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;

      $$('[required]', form).forEach(function (input) {
        var field = input.closest('.field');
        var empty = input.type === 'radio'
          ? !form.querySelector('input[name="' + input.name + '"]:checked')
          : !input.value.trim();
        if (field) field.classList.toggle('has-err', empty);
        if (empty) ok = false;
      });

      // Email format
      var email = form.querySelector('input[type="email"]');
      if (email && email.value.trim()) {
        var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        var f = email.closest('.field');
        if (f) f.classList.toggle('has-err', !valid);
        if (!valid) ok = false;
      }
      // Vietnamese phone
      var tel = form.querySelector('input[type="tel"]');
      if (tel && tel.value.trim()) {
        var digits = tel.value.replace(/[^\d]/g, '');
        var validT = digits.length >= 9 && digits.length <= 12;
        var ft = tel.closest('.field');
        if (ft) ft.classList.toggle('has-err', !validT);
        if (!validT) ok = false;
      }

      if (!ok) {
        var firstErr = form.querySelector('.field.has-err');
        if (firstErr) {
          firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
          var fe = firstErr.querySelector('input, select, textarea');
          if (fe) setTimeout(function () { fe.focus(); }, 320);
        }
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang gửi...';
      }

      // Collect data
      var fd = new FormData(form);
      var payload = {};
      fd.forEach(function (val, key) { payload[key] = val; });
      payload.page_url = window.location.href;

      // Extract UTM
      var sp = new URLSearchParams(window.location.search);
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function(u) {
        if (sp.get(u)) payload[u] = sp.get(u);
      });

      fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        var ok_panel = form.parentElement.querySelector('.form-ok');
        form.style.display = 'none';
        if (ok_panel) ok_panel.classList.add('is-on');
      })
      .catch(function(err) {
        // Fallback: still show confirmation to user even if offline
        var ok_panel = form.parentElement.querySelector('.form-ok');
        form.style.display = 'none';
        if (ok_panel) ok_panel.classList.add('is-on');
      });
    });

    // Clear error as user corrects
    $$('input, select, textarea', form).forEach(function (input) {
      input.addEventListener('input', function () {
        var f = input.closest('.field');
        if (f) f.classList.remove('has-err');
      });
      input.addEventListener('change', function () {
        var f = input.closest('.field');
        if (f && input.type === 'radio') f.classList.remove('has-err');
      });
    });
  });

  /* ---------------- Current year ---------------- */
  $$('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------------- Set active nav on load ---------------- */
  var here = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link[href], .dropdown a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === here) a.setAttribute('aria-current', 'page');
  });

  /* ---------------- Activity Lightbox (tin-tuc.html) ---------------- */
  var lightboxModal = $('#lightboxModal');
  var lightboxImg = $('#lightboxImg');
  var lightboxCaption = $('#lightboxCaption');
  var lightboxCloseBtn = $('.lightbox-close', lightboxModal);

  function openLightbox(src, caption) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lightboxCloseBtn) lightboxCloseBtn.focus();
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', function (e) {
      if (e.target === lightboxModal) closeLightbox();
    });
    if (lightboxCloseBtn) {
      lightboxCloseBtn.addEventListener('click', closeLightbox);
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // Wire activity cards
  var actCards = $$('.news-activities .activity-card');
  if (actCards.length) {
    actCards.forEach(function (card) {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      function triggerLightbox() {
        var img = $('img', card);
        var title = $('h3', card);
        if (img) {
          var src = img.getAttribute('src');
          var caption = title ? title.textContent.trim() : (img.getAttribute('alt') || '');
          openLightbox(src, caption);
        }
      }
      card.addEventListener('click', triggerLightbox);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerLightbox();
        }
      });
    });
  }
})();
