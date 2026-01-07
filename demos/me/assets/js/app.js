/* ==========================================
   app.js — Lumi Digital main interactions
   - Footer year
   - Mobile menu
   - i18n (DE/EN/AR) + RTL dir switch
   - Smooth scroll
   - Reveal on scroll
   - Scroll spy
   ========================================== */

(function () {
  "use strict";

  function setYear() {
    const el = document.getElementById("year");
    if (!el) return;
    el.textContent = String(new Date().getFullYear());
  }

  function initMobileMenu() {
    const burger = document.querySelector(".burger");
    const mobile = document.getElementById("mobileMenu");
    const closeBtn = document.querySelector(".mobile__close");

    if (!burger || !mobile || !closeBtn) return;

    const open = () => {
      mobile.classList.add("is-open");
      mobile.setAttribute("aria-hidden", "false");
      burger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      mobile.classList.remove("is-open");
      mobile.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    burger.addEventListener("click", () => {
      const isOpen = mobile.classList.contains("is-open");
      if (isOpen) close();
      else open();
    });

    closeBtn.addEventListener("click", close);

    // Close when clicking outside inner panel
    mobile.addEventListener("click", (e) => {
      const inner = e.target.closest(".mobile__inner");
      if (!inner) close();
    });

    // Close when clicking a mobile nav link
    mobile.querySelectorAll("a[href^='#']").forEach((a) => {
      a.addEventListener("click", () => close());
    });

    // Escape closes
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  function initI18n() {
    const translations = {
      // ---------- EN ----------
      en: {
        "a11y.skipToContent": "Skip to content",
        "nav.menu": "Menu",
        "nav.services": "Services",
        "nav.demos": "Demos",
        "nav.pricing": "Pricing",
        "nav.process": "Process",
        "nav.contact": "Contact",
        "nav.who": "Who it's for",
        "nav.why": "Why Lumi",

        "hero.kicker": "Lumi Digital • Web Design & Development",
        "hero.title": "Websites that convert - not just look good.",
        "hero.subtitle":
          "Fast, modern websites that drive inquiries and trust.",
        "hero.proof": "Built for local businesses & startups.",
        "hero.ctaPrimary": "Book a free consultation",
        "hero.ctaSecondary": "View packages",
        "hero.trustLine": "Fast delivery • Clear pricing • Personal support",
        "hero.badge1": "Mobile-first",
        "hero.badge2": "Performance",
        "hero.badge3": "SEO basics",

        "who.kicker": "Who it's for",
        "who.title": "Designed for people who need results.",
        "who.subtitle":
          "If your website should bring you inquiries and trust, you're in the right place.",
        "who.card1.title": "Small businesses",
        "who.card1.text":
          "A strong website that looks professional and turns visitors into customers.",
        "who.card2.title": "Local services",
        "who.card2.text":
          "Clear offers, Google Maps integration, and a fast way for people to contact you.",
        "who.card3.title": "Freelancers & startups",
        "who.card3.text":
          "Modern brand presence, clean UI, and conversion-focused sections that sell.",

        "why.kicker": "Why Lumi Digital",
        "why.title": "Premium look. Practical results.",
        "why.subtitle": "Fast. Clear. Persuasive.",
        "why.b1.title": "Conversion-focused",
        "why.b1.text":
          "Clear structure, strong CTAs, and trust elements that help visitors act.",
        "why.b2.title": "Mobile-first & fast",
        "why.b2.text":
          "Responsive layout, optimized assets, and performance-friendly structure.",
        "why.b3.title": "Clean modern UI",
        "why.b3.text":
          "Premium minimal design with clear spacing and readable typography.",
        "why.b4.title": "SEO basics included",
        "why.b4.text":
          "Semantic structure, metadata, and best practices for discoverability.",

        "services.kicker": "Services",
        "services.title": "Everything you need to launch with confidence.",
        "services.subtitle":
          "From a landing page to a full business website - built to be fast, clean, and conversion-ready.",
        "services.pro.label": "What you get",
        "services.pro.hint":
          "A clean, modern website that loads fast and guides visitors to contact you.",
        "services.item1": "Landing pages",
        "services.pro.t1": "Focused pages that push a single goal: inquiries.",
        "services.item2": "Business websites",
        "services.pro.t2":
          "Multi-page sites with clear structure and trust sections.",
        "services.item3": "Website redesigns",
        "services.pro.t3": "Modern UI refresh while keeping what already works.",
        "services.item4": "Performance & SEO basics",
        "services.pro.t4":
          "Fast load times, clean HTML, metadata, and structure.",
        "services.item5": "Contact forms & WhatsApp integration",
        "services.pro.t5":
          "Easy contact options that reduce friction for clients.",
        "services.item6": "Google Maps integration",
        "services.pro.t6": "Ideal for local businesses - visibility and trust.",
        "services.item7": "Hosting & domain setup (optional)",
        "services.pro.t7":
          "If needed, I help you get everything online smoothly.",
        "services.pro.note":
          "Need something specific? I can customize the scope after the free call.",
        "services.aside.kicker": "Fast & clear delivery",
        "services.aside.title": "Want it done fast?",
        "services.aside.text":
          "I work with a clear process and fixed packages - so you know exactly what you get and when.",
        "services.aside.s1": "Clear packages",
        "services.aside.s2": "Modern UI",
        "services.aside.s3": "Conversion-ready",
        "services.aside.cta": "Book a free consultation",
        "services.aside.small":
          "No pressure - you'll get a clear recommendation and next steps.",
        "aftercare.kicker": "Aftercare (optional)",
        "aftercare.title": "Peace of mind after launch",
        "aftercare.subtitle": "I keep your site stable and updated so you can focus on your business.",
        "aftercare.b1": "Small changes",
        "aftercare.b2": "Technical checkups",
        "aftercare.b3": "Support when questions come up",
        "aftercare.price": "49 € / month or 499 € / year",
        "aftercare.cta": "Request aftercare",
        "aftercare.trust": "No sales pressure. Cancel anytime.",


        "demos.kicker": "Demos / Portfolio",
        "demos.title": "Examples of how your site can look.",
        "demos.subtitle":
          "Replace these thumbnails later with real screenshots - the layout is ready.",
        "demos.d1.title": "Barbershop / Hairdresser",
        "demos.d1.text":
          "Booking CTA, services, gallery, and Google Maps - perfect for local clients.",
        "demos.d2.title": "Restaurant",
        "demos.d2.text":
          "Menu highlights, reservations, and a WhatsApp button for quick contact.",
        "demos.d2.result": "Optimized for more local inquiries.",
        "demos.d3.title": "Fitness / Coaching",
        "demos.d3.text":
          "Packages, testimonials, and strong CTAs that turn visitors into leads.",
        "demos.d3.result": "Lead-focused structure with clear CTAs.",
        "demos.d4.result": "Trust-building with fast contact paths.",
        "demos.viewDemo": "View demo",
        "demos.getSimilar": "Book a free consultation",

        "pricing.kicker": "Pricing",
        "pricing.title": "Clear packages. No surprises.",
        "pricing.subtitle":
          "Choose a package that fits your business today - and scale later.",
        "pricing.popular": "Most popular",
        "pricing.starter.title": "Starter",
        "pricing.starter.tagline": "Fast online & professional",
        "pricing.business.title": "Business",
        "pricing.business.tagline": "More inquiries, more trust",
        "pricing.premium.title": "Premium",
        "pricing.premium.tagline": "Strong presence & long-term impact",
        "pricing.deal.newyear": "New Year offer",
        "pricing.starter.p1": "Ideal for solo entrepreneurs",
        "pricing.starter.p2": "Professional one-page website",
        "pricing.starter.p3": "Perfect on phone & tablet",
        "pricing.starter.p4": "Contact form or WhatsApp button",
        "pricing.starter.p5": "Google basic optimization (SEO)",
        "pricing.starter.p6": "1 revision round",
        "pricing.starter.p7": "Ready in about 7-14 days",
        "pricing.business.p1": "Ideal for growing businesses",
        "pricing.business.p2": "Up to 5 pages (Home, Services, About, Contact ...)",
        "pricing.business.p3": "Conversion-optimized structure (more inquiries)",
        "pricing.business.p4": "Fast load times & performance optimization",
        "pricing.business.p5": "SEO basics for multiple pages",
        "pricing.business.p6": "Forms & integrations",
        "pricing.business.p7": "2 revision rounds",
        "pricing.business.p8": "Ready in about 7-14 days",
        "pricing.premium.p1": "Ideal for established brands",
        "pricing.premium.p2": "Up to 8 pages",
        "pricing.premium.p3": "Premium design with subtle animations",
        "pricing.premium.p4": "Advanced SEO optimization (structure & metadata)",
        "pricing.premium.p5": "3 revision rounds",
        "pricing.premium.p6": "14 days support after launch",
        "pricing.premium.p7": "Ready in about 7-14 days",
        "pricing.cta": "Book a free consultation",

        "process.kicker": "Process",
        "process.title": "Simple steps. Clean delivery.",
        "process.subtitle": "A clear workflow for fast, reliable delivery.",
        "process.s1.title": "Free consultation",
        "process.s1.text":
          "We clarify goals, target audience, and what your site must achieve.",
        "process.s2.title": "Design & structure",
        "process.s2.text":
          "I create a modern layout with clear sections and conversion flow.",
        "process.s3.title": "Feedback & revisions",
        "process.s3.text":
          "You review, I adjust - fast iterations with clear checkpoints.",
        "process.s4.title": "Launch",
        "process.s4.text":
        "We launch your site live – optimized, responsive, and fully functional.",

        "contact.kicker": "Contact",
        "contact.title": "Ready to upgrade your website?",
        "contact.subtitle":
          "Send a message and I'll reply with next steps and a clear plan.",
        "contact.panel.title": "Free consultation",
        "contact.panel.text":
          "Tell me what you do and what you want to achieve - I'll suggest the best package.",
        "contact.chip1": "Fast response",
        "contact.chip2": "Clear scope",
        "contact.chip3": "Transparent pricing",
        "contact.methodsTitle": "Direct contact",
        "contact.method.phoneLabel": "Phone",
        "contact.method.whatsappLabel": "WhatsApp",
        "contact.method.emailLabel": "Email",
        "contact.form.nameLabel": "Name",
        "contact.form.emailLabel": "Email",
        "contact.form.messageLabel": "Message",
        "contact.form.submit": "Send message",
        "contact.form.note": "No sales call. Just clear guidance.",
        "contact.form.trust": "I usually reply within 24 hours. Your message stays private.",
        "footer.brand": "Lumi Digital",
        "footer.impressum": "Imprint",
        "footer.privacy": "Privacy",
        "alerts.thanks": "Thank you!"
      },

      // ---------- DE ----------
      de: {
        "a11y.skipToContent": "Zum Inhalt springen",
        "nav.menu": "Menü",
        "nav.services": "Leistungen",
        "nav.demos": "Demos",
        "nav.pricing": "Preise",
        "nav.process": "Ablauf",
        "nav.contact": "Kontakt",
        "nav.who": "Für wen",
        "nav.why": "Warum Lumi",

        "hero.kicker": "Lumi Digital • Webdesign & Entwicklung",
        "hero.title": "Websites, die konvertieren - nicht nur gut aussehen.",
        "hero.subtitle":
          "Schnelle, moderne Websites fuer mehr Anfragen und Vertrauen.",
        "hero.proof": "Fuer lokale Unternehmen & Startups gemacht.",
        "hero.ctaPrimary": "Kostenlose Beratung buchen",
        "hero.ctaSecondary": "Pakete ansehen",
        "hero.trustLine": "Schnelle Lieferung • Klare Preise • Persönlicher Support",
        "hero.badge1": "Mobile-first",
        "hero.badge2": "Performance",
        "hero.badge3": "SEO-Basics",

        "who.kicker": "Für wen",
        "who.title": "Für Menschen, die Ergebnisse brauchen.",
        "who.subtitle":
          "Wenn deine Website Anfragen und Vertrauen bringen soll, bist du hier richtig.",
        "who.card1.title": "Kleine Unternehmen",
        "who.card1.text":
          "Eine starke Website, die professionell wirkt und Besucher in Kunden verwandelt.",
        "who.card2.title": "Lokale Dienstleistungen",
        "who.card2.text":
          "Klare Angebote, Google-Maps-Integration und ein schneller Weg zur Kontaktaufnahme.",
        "who.card3.title": "Freelancer & Startups",
        "who.card3.text":
          "Moderner Markenauftritt, sauberes UI und conversion-starke Bereiche, die verkaufen.",

        "why.kicker": "Warum Lumi Digital",
        "why.title": "Premium-Look. Praktische Ergebnisse.",
        "why.subtitle":
          "Schnell. Klar. Ueberzeugend.",
        "why.b1.title": "Conversion-fokussiert",
        "why.b1.text":
          "Klare Struktur, starke CTAs und Trust-Elemente, die Besucher handeln lassen.",
        "why.b2.title": "Mobile-first & schnell",
        "why.b2.text":
          "Responsives Layout, optimierte Assets und performancefreundliche Struktur.",
        "why.b3.title": "Modernes, sauberes UI",
        "why.b3.text":
          "Premium-minimales Design mit klaren Abständen und guter Lesbarkeit.",
        "why.b4.title": "SEO-Basics inklusive",
        "why.b4.text":
          "Semantische Struktur, Metadaten und Best Practices für Sichtbarkeit.",

        "services.kicker": "Leistungen",
        "services.title": "Alles, was du brauchst, um sicher zu starten.",
        "services.subtitle":
          "Von der Landingpage bis zur kompletten Business-Website - schnell, sauber und conversion-ready.",
        "services.pro.label": "Was du bekommst",
        "services.pro.hint":
          "Eine saubere, moderne Website, die schnell lädt und Besucher zur Kontaktaufnahme führt.",
        "services.item1": "Landingpages",
        "services.pro.t1": "Fokussierte Seiten mit einem klaren Ziel: Anfragen.",
        "services.item2": "Business-Websites",
        "services.pro.t2": "Mehrseitige Sites mit klarer Struktur und Trust-Sektionen.",
        "services.item3": "Website-Redesigns",
        "services.pro.t3": "Modernes UI-Update, ohne das Bewährte zu verlieren.",
        "services.item4": "Performance & SEO-Basics",
        "services.pro.t4": "Schnelle Ladezeiten, sauberes HTML, Metadaten und Struktur.",
        "services.item5": "Kontaktformulare & WhatsApp-Integration",
        "services.pro.t5": "Einfache Kontaktoptionen mit wenig Reibung für Kunden.",
        "services.item6": "Google-Maps-Integration",
        "services.pro.t6": "Ideal für lokale Unternehmen - Sichtbarkeit und Vertrauen.",
        "services.item7": "Hosting & Domain-Setup (optional)",
        "services.pro.t7": "Wenn gewünscht, helfe ich dir, alles sauber online zu bringen.",
        "services.pro.note": "Du brauchst etwas Spezielles? Ich passe den Umfang nach dem Call an.",
        "services.aside.kicker": "Schnelle & klare Lieferung",
        "services.aside.title": "Schnell fertig?",
        "services.aside.text":
          "Ich arbeite mit klarem Prozess und festen Paketen - so weißt du genau, was du bekommst und wann.",
        "services.aside.s1": "Klare Pakete",
        "services.aside.s2": "Modernes UI",
        "services.aside.s3": "Conversion-ready",
        "services.aside.cta": "Kostenlose Beratung buchen",
        "services.aside.small": "Kein Druck - du bekommst eine klare Empfehlung und nächste Schritte.",
        "aftercare.kicker": "Nachbetreuung (optional)",
        "aftercare.title": "Sorgenfrei nach dem Launch",
        "aftercare.subtitle": "Ich halte deine Website stabil und aktuell, damit du dich auf dein Business konzentrieren kannst.",
        "aftercare.b1": "Kleine Änderungen",
        "aftercare.b2": "Technische Checks",
        "aftercare.b3": "Support bei Fragen",
        "aftercare.price": "49 € / Monat oder 499 € / Jahr",
        "aftercare.cta": "Nachbetreuung anfragen",
        "aftercare.trust": "Kein Verkaufsdruck. Jederzeit kündbar.",

        "demos.kicker": "Demos / Portfolio",
        "demos.title": "Beispiele, wie deine Website aussehen kann.",
        "demos.subtitle":
          "Ersetze diese Thumbnails später durch echte Screenshots - das Layout ist bereit.",
        "demos.d1.title": "Barbershop / Friseur",
        "demos.d1.text":
          "Buchungs-CTA, Services, Galerie und Google Maps - perfekt für lokale Kunden.",
        "demos.d2.title": "Restaurant",
        "demos.d2.text":
          "Menü-Highlights, Reservierungen und ein WhatsApp-Button für schnellen Kontakt.",
        "demos.d2.result": "Optimiert fuer mehr lokale Anfragen.",
        "demos.d3.title": "Fitness / Coaching",
        "demos.d3.text":
          "Pakete, Testimonials und starke CTAs, die Besucher zu Leads machen.",
        "demos.d3.result": "Lead-fokussierte Struktur mit klaren CTAs.",
        "demos.d4.result": "Vertrauensaufbau + schnelle Kontaktaufnahme.",
        "demos.viewDemo": "Demo ansehen",
        "demos.getSimilar": "Kostenlose Beratung buchen",

        "pricing.kicker": "Preise",
        "pricing.title": "Klare Pakete. Keine Überraschungen.",
        "pricing.subtitle":
          "Wähle ein Paket, das heute zu deinem Business passt - skalieren kannst du später.",
        "pricing.popular": "Bestseller",
        "pricing.starter.title": "Starter",
        "pricing.starter.tagline": "Schnell online & professionell",
        "pricing.business.title": "Business",
        "pricing.business.tagline": "Mehr Anfragen, mehr Vertrauen",
        "pricing.premium.title": "Premium",
        "pricing.premium.tagline": "Starker Auftritt & langfristige Wirkung",
        "pricing.deal.newyear": "Neujahrsangebot",
        "pricing.starter.p1": "Ideal fuer Solo-Selbststaendige",
        "pricing.starter.p2": "Professionelle 1-Seiten-Website",
        "pricing.starter.p3": "Perfekt auf Handy & Tablet",
        "pricing.starter.p4": "Kontaktformular oder WhatsApp-Button",
        "pricing.starter.p5": "Google-Grundoptimierung (SEO-Basics)",
        "pricing.starter.p6": "1 Korrekturrunde",
        "pricing.starter.p7": "Fertig in ca. 7-14 Tagen",
        "pricing.business.p1": "Ideal fuer wachsende Unternehmen",
        "pricing.business.p2": "Bis zu 5 Seiten (Start, Leistungen, Ueber uns, Kontakt ...)",
        "pricing.business.p3": "Conversion-optimierte Struktur (mehr Anfragen)",
        "pricing.business.p4": "Schnelle Ladezeiten & Performance-Optimierung",
        "pricing.business.p5": "SEO-Basics fuer mehrere Seiten",
        "pricing.business.p6": "Formulare & Integrationen",
        "pricing.business.p7": "2 Korrekturrunden",
        "pricing.business.p8": "Fertig in ca. 7-14 Tagen",
        "pricing.premium.p1": "Ideal fuer etablierte Marken",
        "pricing.premium.p2": "Bis zu 8 Seiten",
        "pricing.premium.p3": "Premium-Design mit dezenten Animationen",
        "pricing.premium.p4": "Erweiterte SEO-Optimierung (Struktur & Metadaten)",
        "pricing.premium.p5": "3 Korrekturrunden",
        "pricing.premium.p6": "14 Tage Support nach dem Launch",
        "pricing.premium.p7": "Fertig in ca. 7-14 Tagen",
        "pricing.cta": "Kostenlose Beratung buchen",

        "process.kicker": "Ablauf",
        "process.title": "Einfache Schritte. Saubere Lieferung.",
        "process.subtitle":
          "Klarer Workflow fuer schnelle, verlaessliche Lieferung.",
        "process.s1.title": "Kostenlose Beratung",
        "process.s1.text":
          "Wir klären Ziele, Zielgruppe und was deine Website erreichen soll.",
        "process.s2.title": "Design & Struktur",
        "process.s2.text":
          "Ich erstelle ein modernes Layout mit klaren Sektionen und Conversion-Flow.",
        "process.s3.title": "Feedback & Überarbeitungen",
        "process.s3.text":
          "Du gibst Feedback, ich passe an - schnelle Iterationen mit klaren Checkpoints.",
        "process.s4.title": "Launch",
        "process.s4.text":
          "Wir gehen live - optimiert, responsiv und bereit für Leads.",

        "contact.kicker": "Kontakt",
        "contact.title": "Bereit, deine Website aufzuwerten?",
        "contact.subtitle":
          "Schick mir eine Nachricht, und ich melde mich mit nächsten Schritten.",
        "contact.panel.title": "Kostenlose Beratung",
        "contact.panel.text":
          "Erzähl mir, was du machst und was du erreichen willst - ich empfehle das passende Paket.",
        "contact.chip1": "Schnelle Antwort",
        "contact.chip2": "Klarer Umfang",
        "contact.chip3": "Transparente Preise",
        "contact.methodsTitle": "Direktkontakt",
        "contact.method.phoneLabel": "Telefon",
        "contact.method.whatsappLabel": "WhatsApp",
        "contact.method.emailLabel": "E-Mail",
        "contact.form.nameLabel": "Name",
        "contact.form.emailLabel": "E-Mail",
        "contact.form.messageLabel": "Nachricht",
        "contact.form.submit": "Nachricht senden",
        "contact.form.note": "Kein Verkaufsgespraech. Nur klare Empfehlung.",
        "contact.form.trust": "Ich antworte normalerweise innerhalb von 24 Stunden. Deine Nachricht bleibt privat.",
        "footer.brand": "Lumi Digital",
        "footer.impressum": "Impressum",
        "footer.privacy": "Datenschutz",
        "alerts.thanks": "Danke!"
      },

      // ---------- AR ----------
      ar: {
        "a11y.skipToContent": "تخطي إلى المحتوى",
        "nav.menu": "القائمة",
        "nav.services": "الخدمات",
        "nav.demos": "نماذج",
        "nav.pricing": "الأسعار",
        "nav.process": "الخطوات",
        "nav.contact": "تواصل",
        "nav.who": "لمن هذا؟",
        "nav.why": "لماذا لومي",

        "hero.kicker": "Lumi Digital • تصميم وتطوير الويب",
        "hero.title": "مواقع تحول الزوار إلى عملاء - وليست مجرد شكل جميل.",
        "hero.subtitle":
          "مواقع سريعة وحديثة تجلب استفسارات وثقة.",
        "hero.proof": "مخصص للشركات المحلية والناشئة.",
        "hero.ctaPrimary": "احجز استشارة مجانية",
        "hero.ctaSecondary": "عرض الباقات",
        "hero.trustLine": "تسليم سريع • أسعار واضحة • دعم شخصي",
        "hero.badge1": "تصميم للهواتف أولًا",
        "hero.badge2": "الأداء",
        "hero.badge3": "أساسيات SEO",

        "who.kicker": "لمن هذا؟",
        "who.title": "مصمم لمن يحتاج نتائج حقيقية.",
        "who.subtitle":
          "إذا كان موقعك يجب أن يجلب لك استفسارات وثقة، فأنت في المكان الصحيح.",
        "who.card1.title": "الأعمال الصغيرة",
        "who.card1.text": "موقع قوي بمظهر احترافي يحول الزوار إلى عملاء.",
        "who.card2.title": "الخدمات المحلية",
        "who.card2.text":
          "عروض واضحة، دمج خرائط Google، وطريقة سريعة للتواصل.",
        "who.card3.title": "مستقلون وشركات ناشئة",
        "who.card3.text":
          "حضور علامة حديث، واجهات نظيفة، وأقسام تركز على التحويل.",

        "why.kicker": "لماذا Lumi Digital",
        "why.title": "مظهر فاخر. نتائج عملية.",
        "why.subtitle":
          "سريع. واضح. مقنع.",
        "why.b1.title": "تركيز على التحويل",
        "why.b1.text":
          "هيكلة واضحة، دعوات قوية للإجراء، وعناصر ثقة تدفع الزوار للخطوة.",
        "why.b2.title": "أولوية للهواتف والسرعة",
        "why.b2.text":
          "تصميم متجاوب وأصول محسّنة وهيكل مناسب للأداء.",
        "why.b3.title": "واجهة حديثة ونظيفة",
        "why.b3.text":
          "تصميم فاخر وبسيط مع مسافات واضحة وخطوط مقروءة.",
        "why.b4.title": "أساسيات SEO مدمجة",
        "why.b4.text":
          "بنية دلالية وبيانات وصفية وأفضل الممارسات للظهور.",

        "services.kicker": "الخدمات",
        "services.title": "كل ما تحتاجه لإطلاق بثقة.",
        "services.subtitle":
          "من صفحة هبوط إلى موقع أعمال متكامل - سريع ونظيف وموجه للتحويل.",
        "services.pro.label": "ما الذي ستحصل عليه",
        "services.pro.hint":
          "موقع نظيف وحديث يفتح بسرعة ويرشد الزوار للتواصل.",
        "services.item1": "صفحات هبوط",
        "services.pro.t1": "صفحات مركزة بهدف واحد: الاستفسارات.",
        "services.item2": "مواقع أعمال",
        "services.pro.t2":
          "مواقع متعددة الصفحات مع هيكل واضح وأقسام ثقة.",
        "services.item3": "إعادة تصميم المواقع",
        "services.pro.t3": "تحديث واجهة حديث مع الحفاظ على ما يعمل.",
        "services.item4": "الأداء وأساسيات SEO",
        "services.pro.t4": "سرعة تحميل، HTML نظيف، بيانات وصفية وهيكل واضح.",
        "services.item5": "نماذج تواصل ودمج واتساب",
        "services.pro.t5":
          "خيارات تواصل سهلة تقلل الاحتكاك للعملاء.",
        "services.item6": "دمج خرائط Google",
        "services.pro.t6": "مثالي للأعمال المحلية - رؤية وثقة.",
        "services.item7": "إعداد الاستضافة والنطاق (اختياري)",
        "services.pro.t7": "إذا لزم، أساعدك في تشغيل كل شيء بسلاسة.",
        "services.pro.note":
          "تحتاج شيئًا خاصًا؟ يمكنني تخصيص النطاق بعد المكالمة.",
        "services.aside.kicker": "تسليم سريع وواضح",
        "services.aside.title": "تريد إنجازه بسرعة؟",
        "services.aside.text":
          "أعمل بعملية واضحة وباقات ثابتة حتى تعرف ما ستحصل عليه ومتى.",
        "services.aside.s1": "باقات واضحة",
        "services.aside.s2": "واجهة حديثة",
        "services.aside.s3": "جاهز للتحويل",
        "services.aside.cta": "احجز استشارة مجانية",
        "services.aside.small":
          "بدون ضغط - ستحصل على توصية واضحة والخطوات التالية.",
        "aftercare.kicker": "متابعة (اختياري)",
        "aftercare.title": "راحة بال بعد الإطلاق",
        "aftercare.subtitle": "أحافظ على موقعك مستقراً ومحدثاً لتتفرغ لعملك.",
        "aftercare.b1": "تغييرات صغيرة",
        "aftercare.b2": "فحوصات تقنية",
        "aftercare.b3": "دعم عند الاستفسارات",
        "aftercare.price": "49 € / شهر أو 499 € / سنة",
        "aftercare.cta": "اطلب المتابعة",
        "aftercare.trust": "لا ضغط للبيع. يمكن الإلغاء في أي وقت.",


        "demos.kicker": "نماذج / أعمال",
        "demos.title": "أمثلة لشكل موقعك.",
        "demos.subtitle": "استبدل هذه الصور لاحقًا بلقطات حقيقية - التصميم جاهز.",
        "demos.d1.title": "صالون حلاقة / حلاق",
        "demos.d1.text":
          "زر حجز، خدمات، معرض، وخرائط Google - مثالي للعملاء المحليين.",
        "demos.d2.title": "مطعم",
        "demos.d2.text":
          "أبرز الأطباق، حجوزات، وزر واتساب للتواصل السريع.",
        "demos.d2.result": "محسن لزيادة الاستفسارات المحلية.",
        "demos.d3.title": "لياقة / تدريب",
        "demos.d3.text":
          "باقات، شهادات، ونداءات قوية لتحويل الزوار إلى عملاء.",
        "demos.d3.result": "هيكل يركز على العملاء المحتملين مع دعوات واضحة.",
        "demos.d4.result": "يبني الثقة مع تواصل سريع.",
        "demos.viewDemo": "عرض النموذج",
        "demos.getSimilar": "احجز استشارة مجانية",

        "pricing.kicker": "الأسعار",
        "pricing.title": "باقات واضحة. بدون مفاجآت.",
        "pricing.subtitle": "اختر باقة تناسب عملك اليوم - وتوسع لاحقًا.",
        "pricing.popular": "الأكثر طلبًا",
        "pricing.starter.title": "ستارتر",
        "pricing.starter.tagline": "سريع أونلاين وبشكل احترافي",
        "pricing.business.title": "بزنس",
        "pricing.business.tagline": "مزيد من الاستفسارات، مزيد من الثقة",
        "pricing.premium.title": "بريميوم",
        "pricing.premium.tagline": "حضور قوي وتأثير طويل الأمد",
        "pricing.deal.newyear": "عرض رأس السنة",
        "pricing.starter.p1": "مثالي للمستقلين الفرديين",
        "pricing.starter.p2": "موقع احترافي من صفحة واحدة",
        "pricing.starter.p3": "مثالي للهاتف والتابلت",
        "pricing.starter.p4": "نموذج تواصل أو زر واتساب",
        "pricing.starter.p5": "تحسين Google الأساسي (أساسيات SEO)",
        "pricing.starter.p6": "جولة تعديل واحدة",
        "pricing.starter.p7": "جاهز خلال حوالي 7-14 يوما",
        "pricing.business.p1": "مثالي للشركات النامية",
        "pricing.business.p2": "حتى 5 صفحات (الرئيسية، الخدمات، من نحن، التواصل ...)",
        "pricing.business.p3": "هيكل محسّن للتحويل (مزيد من الاستفسارات)",
        "pricing.business.p4": "سرعة تحميل عالية وتحسين الأداء",
        "pricing.business.p5": "أساسيات SEO لعدة صفحات",
        "pricing.business.p6": "نماذج وتكاملات",
        "pricing.business.p7": "جولتا تعديل",
        "pricing.business.p8": "جاهز خلال حوالي 7-14 يوما",
        "pricing.premium.p1": "مثالي للعلامات الراسخة",
        "pricing.premium.p2": "حتى 8 صفحات",
        "pricing.premium.p3": "تصميم متميز مع حركات خفيفة",
        "pricing.premium.p4": "تحسين SEO متقدم (الهيكلة والبيانات الوصفية)",
        "pricing.premium.p5": "3 جولات تعديل",
        "pricing.premium.p6": "دعم لمدة 14 يوما بعد الإطلاق",
        "pricing.premium.p7": "جاهز خلال حوالي 7-14 يوما",
        "pricing.cta": "احجز استشارة مجانية",

        "process.kicker": "الخطوات",
        "process.title": "خطوات بسيطة. تسليم نظيف.",
        "process.subtitle":
          "سير عمل واضح لتسليم سريع وموثوق.",
        "process.s1.title": "استشارة مجانية",
        "process.s1.text": "نحدد الأهداف والجمهور وما يجب أن يحققه الموقع.",
        "process.s2.title": "التصميم والهيكل",
        "process.s2.text": "أصمم تخطيطًا حديثًا بأقسام واضحة وتدفق تحويل.",
        "process.s3.title": "ملاحظات وتعديلات",
        "process.s3.text": "تراجع وتقدم ملاحظات، وأنا أعدّل بسرعة.",
        "process.s4.title": "الإطلاق",
        "process.s4.text": "نطلق الموقع - محسن ومتجاوب وجاهز لجلب العملاء.",

        "contact.kicker": "تواصل",
        "contact.title": "جاهز لتطوير موقعك؟",
        "contact.subtitle": "أرسل رسالة وسأرد عليك بالخطوات التالية وخطة واضحة.",
        "contact.panel.title": "استشارة مجانية",
        "contact.panel.text":
          "أخبرني عن عملك وما تريد تحقيقه - وسأقترح أفضل باقة.",
        "contact.chip1": "رد سريع",
        "contact.chip2": "نطاق واضح",
        "contact.chip3": "أسعار شفافة",
        "contact.methodsTitle": "Direct contact",
        "contact.method.phoneLabel": "Phone",
        "contact.method.whatsappLabel": "WhatsApp",
        "contact.method.emailLabel": "Email",
        "contact.form.nameLabel": "الاسم",
        "contact.form.emailLabel": "البريد الإلكتروني",
        "contact.form.messageLabel": "الرسالة",
        "contact.form.submit": "إرسال الرسالة",
        "contact.form.note": "لا مكالمة بيع. فقط توصية واضحة.",
        "contact.form.trust": "عادةً أرد خلال 24 ساعة. رسالتك تبقى خاصة.",
        "footer.brand": "Lumi Digital",
        "footer.impressum": "بيانات قانونية",
        "footer.privacy": "الخصوصية",
        "alerts.thanks": "شكرًا لك!"
      }
    };

    const getText = (lang, key) =>
      (translations[lang] && translations[lang][key]) ||
      (translations.en && translations.en[key]) ||
      "";

    const applyLang = (lang) => {
      const safe = translations[lang] ? lang : "en";
      const html = document.documentElement;

      html.lang = safe;
      html.dir = safe === "ar" ? "rtl" : "ltr";

      // Update text nodes
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const value = getText(safe, key);
        if (value) el.textContent = value;
      });

      // Update placeholders
      document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        const value = getText(safe, key);
        if (value) el.setAttribute("placeholder", value);
      });

      // Active button state
      document.querySelectorAll(".lang__btn").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.lang === safe);
      });

      // Persist
      try {
        localStorage.setItem("lumiLang", safe);
      } catch (_) {}
    };

    // Expose translator for other scripts (EmailJS etc.)
    window.LUMI_T = (key) => {
      const lang = document.documentElement.lang || "en";
      return getText(lang, key);
    };

    // Init from storage
    let stored = null;
    try {
      stored = localStorage.getItem("lumiLang");
    } catch (_) {}

    applyLang(stored || document.documentElement.lang || "en");

    // Bind buttons (desktop + mobile)
    document.querySelectorAll(".lang__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang || "en";
        applyLang(lang);
      });
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll("a[href^='#']").forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function applyStagger(containerSelector, itemSelector, stepMs) {
    document.querySelectorAll(containerSelector).forEach((container) => {
      const items = container.querySelectorAll(itemSelector);
      items.forEach((item, index) => {
        item.style.setProperty("--reveal-delay", `${index * stepMs}ms`);
      });
    });
  }

  function initScrollReveal() {
    document.documentElement.classList.add("reveal-ready");

    const selector = [
      ".hero__content > *",
      ".hero__visual",
      ".section-head",
      ".card",
      ".tile",
      ".service-item",
      ".services-pro__aside",
      ".demo",
      ".price",
      ".step",
      ".contact__copy",
      ".form",
      ".badges > *"
    ].join(", ");

    const targets = Array.from(document.querySelectorAll(selector));
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    applyStagger(".hero__content", ":scope > *", 90);
    applyStagger(".grid", ":scope > *", 90);
    applyStagger(".services-pro__grid", ":scope > *", 70);
    applyStagger(".steps", ":scope > *", 90);

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
  }

  function initScrollSpy() {
    const navLinks = Array.from(
      document.querySelectorAll(".nav__link, .mobile__link")
    );
    if (!navLinks.length) return;

    const sectionMap = new Map();
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const id = href.slice(1);
      const section = document.getElementById(id);
      if (!section) return;
      if (!sectionMap.has(id)) sectionMap.set(id, { section, links: [] });
      sectionMap.get(id).links.push(link);
    });

    const sections = Array.from(sectionMap.values()).map((x) => x.section);
    if (!sections.length) return;

    let orderedSections = sections
      .slice()
      .sort((a, b) => a.offsetTop - b.offsetTop);

    const setActive = (id) => {
      navLinks.forEach((link) => link.classList.remove("is-active"));
      if (!id) return;
      const entry = sectionMap.get(id);
      if (!entry) return;
      entry.links.forEach((link) => link.classList.add("is-active"));
    };

    const refreshOrder = () => {
      orderedSections = sections
        .slice()
        .sort((a, b) => a.offsetTop - b.offsetTop);
    };

    const getProbe = () => {
      const header = document.querySelector(".header");
      const headerOffset = (header ? header.offsetHeight : 0) + 16;
      const viewportProbe = Math.max(headerOffset, window.innerHeight * 0.35);
      return window.scrollY + viewportProbe;
    };

    const updateActive = () => {
      const scrollPos = getProbe();
      const doc = document.documentElement;
      const docHeight = doc ? doc.scrollHeight : document.body.scrollHeight;
      let currentId = null;

      orderedSections.forEach((section) => {
        if (scrollPos >= section.offsetTop) currentId = section.id;
      });

      if (!currentId && orderedSections.length) {
        currentId = orderedSections[0].id;
      }

      if (window.scrollY + window.innerHeight >= docHeight - 2) {
        const last = orderedSections[orderedSections.length - 1];
        if (last) currentId = last.id;
      }

      setActive(currentId);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      refreshOrder();
      onScroll();
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => setTimeout(updateActive, 0));
    });

    refreshOrder();
    updateActive();
  }

  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    initMobileMenu();
    initI18n();
    initSmoothScroll();
    initScrollReveal();
    initScrollSpy();
  });
})();
