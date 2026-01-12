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
        "demos.d2.title": "Restaurant - Local taste, online",
        "demos.d2.text":
          "Menu, reservations, and fast contact options for nearby guests.",
        "demos.d2.result": "More reservations from your area.",
        "demos.d3.title": "Fitness Studio - More Members",
        "demos.d3.text":
          "Classes, pricing, and benefits clearly shown with strong CTAs.",
        "demos.d3.result": "More trial sessions and inquiries.",
        "demos.d4.title": "Tradesperson - Easy to find",
        "demos.d4.text": "Services, references, and direct contact that build instant trust.",
        "demos.d4.result": "More calls through clear contact paths.",
        "demos.viewDemo": "View demo",
        "demos.getSimilar": "Book a free consultation",
        "demos.prev": "Previous demo",
        "demos.next": "Next demo",
        "demos.dotLabel": "Go to demo",

        "pricing.kicker": "Pricing",
        "pricing.title": "Clear packages. No surprises.",
        "pricing.subtitle":
          "Choose a package that fits your business today - and scale later.",
        "pricing.popular": "Most popular",
        "pricing.starter.title": "Starter",
        "pricing.starter.tagline": "For solo professionals and small businesses with a clear offer.",
        "pricing.business.title": "Business",
        "pricing.business.tagline": "For local service providers with multiple services and steady inquiry volume.",
        "pricing.premium.title": "Premium",
        "pricing.premium.tagline": "For established businesses with many services or locations.",
        "pricing.deal.newyear": "New Year offer",
        "pricing.starter.p1": "Start, services, and contact on one page",
        "pricing.starter.p2": "Mobile-optimized for phone and tablet",
        "pricing.starter.p3": "Contact form or WhatsApp button",
        "pricing.starter.p4": "Local visibility on Google",
        "pricing.starter.p5": "Clear structure for quick orientation",
        "pricing.starter.p6": "One revision round included",
        "pricing.starter.p7": "Go-live and technical launch included",
        "pricing.starter.p8": "Delivery time: approx. 7-14 days",
        "pricing.business.p1": "Up to 5 pages with a clear structure",
        "pricing.business.p2": "Services, references, and contact clearly presented",
        "pricing.business.p3": "Focus on inquiries with form, phone, and WhatsApp",
        "pricing.business.p4": "Fast load times for a smooth user experience",
        "pricing.business.p5": "Local visibility on Google for multiple services",
        "pricing.business.p6": "Two revision rounds included",
        "pricing.business.p7": "Go-live and technical launch included",
        "pricing.business.p8": "Delivery time: approx. 7-14 days",
        "pricing.premium.p1": "Up to 8 pages with deeper content",
        "pricing.premium.p2": "Custom design aligned with the brand",
        "pricing.premium.p3": "Subtle animations for a premium feel",
        "pricing.premium.p4": "Clear page structure for better visibility",
        "pricing.premium.p5": "Three revision rounds included",
        "pricing.premium.p6": "14 days of support after launch",
        "pricing.premium.p7": "Go-live and technical launch included",
        "pricing.premium.p8": "Delivery time: approx. 7-14 days",
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
        "contact.methodsTitle": "تواصل مباشر",
        "contact.method.phoneLabel": "الهاتف",
        "contact.method.whatsappLabel": "واتساب",
        "contact.method.emailLabel": "البريد الإلكتروني",
        "contact.form.nameLabel": "Name",
        "contact.form.emailLabel": "Email",
        "contact.form.messageLabel": "Message",
        "contact.form.submit": "Send message",
        "contact.form.note": "No sales call. Just clear guidance.",
        "contact.form.trust": "I usually reply within 24 hours. Your message stays private.",
        "legal.kicker": "Legal",
        "legal.address.name": "Majd Al Mahamed",
        "legal.address.street": "Hollaenderstrasse 9",
        "legal.address.city": "94032 Passau",
        "legal.address.country": "Germany",
        "legal.emailLabel": "Email:",
        "impressum.pageTitle": "Imprint | LUMI DIGITAL",
        "impressum.title": "Imprint",
        "impressum.subtitle": "Information pursuant to Section 5 TMG and Section 18 MStV.",
        "impressum.provider.title": "Service provider",
        "impressum.responsible.title": "Responsible for the content under Section 18(2) MStV",
        "impressum.vat.title": "VAT identification number",
        "impressum.vat.text": "VAT identification number in accordance with Section 27a of the German VAT Act: not available.",
        "impressum.dispute.title": "Consumer dispute resolution",
        "impressum.dispute.text": "I am neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.",
        "impressum.content.title": "Liability for content",
        "impressum.content.p1": "As a service provider, I am responsible for my own content on these pages in accordance with Section 7(1) TMG and general laws.",
        "impressum.content.p2": "However, under Sections 8 to 10 TMG, I am not obliged to monitor transmitted or stored third-party information or investigate circumstances indicating unlawful activity.",
        "impressum.content.p3": "Obligations to remove or block the use of information under general laws remain unaffected.",
        "impressum.content.p4": "Liability is only possible from the time of knowledge of a specific legal infringement.",
        "impressum.content.p5": "If I become aware of any such infringements, I will remove the content immediately.",
        "impressum.links.title": "Liability for links",
        "impressum.links.p1": "This website may contain links to external third-party websites over whose content I have no control.",
        "impressum.links.p2": "Therefore, I cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content.",
        "impressum.links.p3": "The linked pages were checked for possible legal violations at the time of linking.",
        "impressum.links.p4": "No illegal content was identifiable at that time.",
        "impressum.links.p5": "Permanent content monitoring of the linked pages is not reasonable without concrete evidence of a legal violation.",
        "impressum.links.p6": "If I become aware of legal violations, I will remove such links immediately.",
        "impressum.notice.title": "Notice",
        "impressum.notice.text": "This website is solely for presenting projects and services. No sales are carried out via this website.",
        "privacy.pageTitle": "Privacy Policy | LUMI DIGITAL",
        "privacy.title": "Privacy Policy",
        "privacy.subtitle": "Information on the processing of personal data under the General Data Protection Regulation (GDPR).",
        "privacy.legalBasisLabel": "Legal basis:",
        "privacy.s1.title": "1. Controller",
        "privacy.s2.title": "2. General information",
        "privacy.s2.p1": "This privacy policy informs you about the nature, scope, and purpose of the processing of personal data on this website.",
        "privacy.s2.p2": "The website serves solely to present services and sample packages. No tracking or marketing tools are used (e.g., Google Analytics or Meta Pixel).",
        "privacy.s3.title": "3. Hosting (GitHub Pages)",
        "privacy.s3.p1": "This website is provided as a static website via GitHub Pages.",
        "privacy.s3.p2": "The provider is GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.",
        "privacy.s3.p3": "GitHub processes access data (e.g., IP address) for technical provision of the website and to ensure stable and secure operation (server log files).",
        "privacy.s3.p4": "The transfer of personal data to the USA is based on appropriate safeguards pursuant to Art. 46 GDPR, in particular the standard contractual clauses approved by the EU Commission.",
        "privacy.s3.p5": "Art. 6(1)(f) GDPR (legitimate interest in a secure and stable operation of the website).",
        "privacy.s4.title": "4. Server log files",
        "privacy.s4.p1": "When you access this website, the hosting provider automatically collects information such as:",
        "privacy.s4.li1": "IP address",
        "privacy.s4.li2": "Date and time of access",
        "privacy.s4.li3": "Page accessed",
        "privacy.s4.li4": "Amount of data transferred",
        "privacy.s4.li5": "Browser type and operating system",
        "privacy.s4.li6": "Referrer URL",
        "privacy.s4.p2": "The processing is carried out to ensure technical operation, to analyze errors, and to defend against attacks.",
        "privacy.s4.p3": "The log files are stored for a limited period and then deleted or anonymized.",
        "privacy.s5.title": "5. Contact by email",
        "privacy.s5.p1": "If you contact me by email, your information will be processed for the purpose of handling your request.",
        "privacy.s5.p2": "Art. 6(1)(b) GDPR (pre-contractual measures) or Art. 6(1)(f) GDPR (legitimate interest in communication).",
        "privacy.s6.title": "6. Contact form (EmailJS)",
        "privacy.s6.p1": "If you use the contact form, the entered data (name, email address, message) will be processed to handle your request.",
        "privacy.s6.p2": "The contact request is sent via the EmailJS service provider. Your information is transmitted to EmailJS and processed there.",
        "privacy.s6.p3": "Art. 6(1)(b) GDPR (pre-contractual measures) or Art. 6(1)(f) GDPR (legitimate interest in handling inquiries).",
        "privacy.s6.p4": "If the service provider is located in a third country, the transfer is based on appropriate safeguards, in particular the standard contractual clauses pursuant to Art. 46 GDPR.",
        "privacy.s7.title": "7. External scripts / CDN",
        "privacy.s7.p1": "To technically provide the contact form, a JavaScript library is loaded via a Content Delivery Network (CDN), currently jsDelivr.",
        "privacy.s7.p2": "Your IP address is transmitted to the CDN provider to deliver the file.",
        "privacy.s7.p3": "Art. 6(1)(f) GDPR (legitimate interest in a secure and efficient provision of the website).",
        "privacy.s8.title": "8. Technically necessary storage (Local Storage)",
        "privacy.s8.p1": "To store your selected language, an entry is saved in your browser's local storage (key: \"lumiLang\").",
        "privacy.s8.p2": "Section 25(2) no. 2 TTDSG and Art. 6(1)(f) GDPR.",
        "privacy.s8.p3": "You can delete this storage at any time via your browser settings.",
        "privacy.s9.title": "9. Cookies",
        "privacy.s9.p1": "This website does not use cookies for analytics or marketing purposes.",
        "privacy.s9.p2": "Any technically necessary cookies are used only to the extent required.",
        "privacy.s10.title": "10. Recipients of personal data",
        "privacy.s10.p1": "Recipients of personal data are solely technical service providers (e.g., hosting provider, contact form service) acting on my behalf.",
        "privacy.s11.title": "11. SSL/TLS encryption",
        "privacy.s11.p1": "This website uses SSL/TLS encryption (HTTPS) to protect data transmission from access by third parties.",
        "privacy.s12.title": "12. Rights of data subjects",
        "privacy.s12.p1": "You have the right to:",
        "privacy.s12.li1": "Access (Art. 15 GDPR)",
        "privacy.s12.li2": "Rectification (Art. 16 GDPR)",
        "privacy.s12.li3": "Erasure (Art. 17 GDPR)",
        "privacy.s12.li4": "Restriction of processing (Art. 18 GDPR)",
        "privacy.s12.li5": "Data portability (Art. 20 GDPR)",
        "privacy.s12.li6": "Objection (Art. 21 GDPR)",
        "privacy.s12.li7": "Withdrawal of consent (Art. 7(3) GDPR)",
        "privacy.s12.p2a": "To exercise your rights, an informal notification to ",
        "privacy.s12.p2b": ".",
        "privacy.s13.title": "13. Right to object",
        "privacy.s13.p1": "If the processing of your personal data is based on Art. 6(1)(f) GDPR, you have the right to object to the processing at any time for reasons arising from your particular situation.",
        "privacy.s14.title": "14. Right to lodge a complaint",
        "privacy.s14.p1": "You have the right to lodge a complaint with a competent data protection supervisory authority.",
        "privacy.s15.title": "15. Obligation to provide personal data",
        "privacy.s15.p1": "Providing personal data is neither legally nor contractually required. However, without this data, your request cannot be processed.",
        "privacy.s16.title": "16. Automated decision-making",
        "privacy.s16.p1": "Automated decision-making or profiling does not take place.",
        "privacy.s17.title": "17. As of",
        "privacy.s17.p1": "January 2026",
        "footer.brand": "Lumi Digital",
        "footer.impressum": "Imprint",
        "footer.privacy": "Privacy",
        "alerts.thanks": "Thank you!",
        "alerts.required": "Please fill in all required fields."
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
          "Schnelle, moderne Websites für mehr Anfragen und Vertrauen.",
        "hero.proof": "Für lokale Unternehmen & Startups gemacht.",
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
          "Schnell. Klar. Überzeugend.",
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
        "demos.d2.title": "Restaurant - Lokal, lecker, online",
        "demos.d2.text":
          "Menü, Reservierung und schneller Kontakt - ideal für Gäste in der Nähe.",
        "demos.d2.result": "Mehr Reservierungen aus deiner Region.",
        "demos.d3.title": "Fitnessstudio - Mehr Mitglieder",
        "demos.d3.text":
          "Kurse, Preise und Vorteile übersichtlich gezeigt - mit klaren CTAs.",
        "demos.d3.result": "Mehr Probetrainings und Anfragen.",
        "demos.d4.title": "Handwerker - Schnell gefunden",
        "demos.d4.text": "Leistungen, Referenzen und direkter Kontakt - Vertrauen auf den ersten Blick.",
        "demos.d4.result": "Mehr Anrufe durch klare Kontaktwege.",
        "demos.viewDemo": "Demo ansehen",
        "demos.getSimilar": "Kostenlose Beratung buchen",
        "demos.prev": "Vorherige Demo",
        "demos.next": "Nächste Demo",
        "demos.dotLabel": "Zur Demo",

        "pricing.kicker": "Preise",
        "pricing.title": "Klare Pakete. Keine Überraschungen.",
        "pricing.subtitle":
          "Wähle ein Paket, das heute zu deinem Business passt - skalieren kannst du später.",
        "pricing.popular": "Bestseller",
        "pricing.starter.title": "Starter",
        "pricing.starter.tagline": "Für Solo-Selbstständige und kleine Betriebe mit klarem Angebot.",
        "pricing.business.title": "Business",
        "pricing.business.tagline": "Für lokale Dienstleister mit mehreren Leistungen und regelmäßigem Anfragebedarf.",
        "pricing.premium.title": "Premium",
        "pricing.premium.tagline": "Für etablierte Betriebe mit vielen Leistungen oder Standorten.",
        "pricing.deal.newyear": "Neujahrsangebot",
        "pricing.starter.p1": "Start, Leistungen und Kontakt auf einer Seite",
        "pricing.starter.p2": "Mobiloptimiert für Handy und Tablet",
        "pricing.starter.p3": "Kontaktformular oder WhatsApp-Button",
        "pricing.starter.p4": "Lokale Auffindbarkeit bei Google",
        "pricing.starter.p5": "Klare Struktur für schnelle Orientierung",
        "pricing.starter.p6": "Eine Korrekturrunde inklusive",
        "pricing.starter.p7": "Live-Schaltung & technischer Launch inklusive",
        "pricing.starter.p8": "Lieferzeit: ca. 7-14 Tage",
        "pricing.business.p1": "Bis zu 5 Seiten mit klarer Struktur",
        "pricing.business.p2": "Leistungen, Referenzen und Kontakt übersichtlich",
        "pricing.business.p3": "Fokus auf Anfragen mit Formular, Telefon und WhatsApp",
        "pricing.business.p4": "Schnelle Ladezeiten für gutes Nutzererlebnis",
        "pricing.business.p5": "Lokale Auffindbarkeit bei Google für mehrere Leistungen",
        "pricing.business.p6": "Zwei Korrekturrunden inklusive",
        "pricing.business.p7": "Live-Schaltung & technischer Launch inklusive",
        "pricing.business.p8": "Lieferzeit: ca. 7-14 Tage",
        "pricing.premium.p1": "Bis zu 8 Seiten mit vertiefenden Inhalten",
        "pricing.premium.p2": "Individuelles Design passend zur Marke",
        "pricing.premium.p3": "Dezente Animationen für hochwertigen Eindruck",
        "pricing.premium.p4": "Klare Seitenstruktur für gute Auffindbarkeit",
        "pricing.premium.p5": "Drei Korrekturrunden inklusive",
        "pricing.premium.p6": "14 Tage Support nach dem Start",
        "pricing.premium.p7": "Live-Schaltung & technischer Launch inklusive",
        "pricing.premium.p8": "Lieferzeit: ca. 7-14 Tage",
        "pricing.cta": "Kostenlose Beratung buchen",

        "process.kicker": "Ablauf",
        "process.title": "Einfache Schritte. Saubere Lieferung.",
        "process.subtitle":
          "Klarer Workflow für schnelle, verlässliche Lieferung.",
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
        "contact.form.note": "Kein Verkaufsgespräch. Nur klare Empfehlung.",
        "contact.form.trust": "Ich antworte normalerweise innerhalb von 24 Stunden. Deine Nachricht bleibt privat.",
        "legal.kicker": "Rechtliches",
        "legal.address.name": "Majd Al Mahamed",
        "legal.address.street": "Holländerstraße 9",
        "legal.address.city": "94032 Passau",
        "legal.address.country": "Deutschland",
        "legal.emailLabel": "E-Mail:",
        "impressum.pageTitle": "Impressum | LUMI DIGITAL",
        "impressum.title": "Impressum",
        "impressum.subtitle": "Angaben gemäß § 5 TMG und § 18 MStV.",
        "impressum.provider.title": "Anbieter",
        "impressum.responsible.title": "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
        "impressum.vat.title": "Umsatzsteuer-Identifikationsnummer",
        "impressum.vat.text": "Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: nicht vorhanden.",
        "impressum.dispute.title": "Verbraucherstreitbeilegung",
        "impressum.dispute.text": "Ich bin weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        "impressum.content.title": "Haftung für Inhalte",
        "impressum.content.p1": "Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.",
        "impressum.content.p2": "Nach §§ 8 bis 10 TMG bin ich jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
        "impressum.content.p3": "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.",
        "impressum.content.p4": "Eine Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.",
        "impressum.content.p5": "Bei Bekanntwerden entsprechender Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.",
        "impressum.links.title": "Haftung für Links",
        "impressum.links.p1": "Diese Website enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe.",
        "impressum.links.p2": "Daher kann ich für diese fremden Inhalte keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
        "impressum.links.p3": "Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.",
        "impressum.links.p4": "Rechtswidrige Inhalte waren zu diesem Zeitpunkt nicht erkennbar.",
        "impressum.links.p5": "Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.",
        "impressum.links.p6": "Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.",
        "impressum.notice.title": "Hinweis",
        "impressum.notice.text": "Diese Webseite dient ausschließlich der Vorstellung von Projekten und Leistungen. Es findet kein Verkauf über diese Webseite statt.",
        "privacy.pageTitle": "Datenschutzerklärung | LUMI DIGITAL",
        "privacy.title": "Datenschutzerklärung",
        "privacy.subtitle": "Informationen zur Verarbeitung personenbezogener Daten nach der Datenschutz-Grundverordnung (DSGVO).",
        "privacy.legalBasisLabel": "Rechtsgrundlage:",
        "privacy.s1.title": "1. Verantwortlicher",
        "privacy.s2.title": "2. Allgemeine Hinweise",
        "privacy.s2.p1": "Diese Datenschutzerklärung informiert Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten auf dieser Website.",
        "privacy.s2.p2": "Die Website dient ausschließlich der Vorstellung von Leistungen und Beispiel-Paketen. Es werden keine Tracking- oder Marketing-Tools eingesetzt (z. B. Google Analytics oder Meta Pixel).",
        "privacy.s3.title": "3. Hosting (GitHub Pages)",
        "privacy.s3.p1": "Diese Website wird als statische Website über GitHub Pages bereitgestellt.",
        "privacy.s3.p2": "Anbieter ist die GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.",
        "privacy.s3.p3": "GitHub verarbeitet Zugriffsdaten (z. B. IP-Adresse) zur technischen Bereitstellung der Website und zur Sicherstellung eines stabilen und sicheren Betriebs (Server-Logfiles).",
        "privacy.s3.p4": "Die Übermittlung personenbezogener Daten in die USA erfolgt auf Grundlage geeigneter Garantien gemäß Art. 46 DSGVO, insbesondere der von der EU-Kommission genehmigten Standardvertragsklauseln.",
        "privacy.s3.p5": "Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb der Website).",
        "privacy.s4.title": "4. Server-Logfiles",
        "privacy.s4.p1": "Beim Aufruf dieser Website erfasst der Hosting-Anbieter automatisch Informationen wie:",
        "privacy.s4.li1": "IP-Adresse",
        "privacy.s4.li2": "Datum und Uhrzeit des Zugriffs",
        "privacy.s4.li3": "aufgerufene Seite",
        "privacy.s4.li4": "übertragene Datenmenge",
        "privacy.s4.li5": "Browsertyp und Betriebssystem",
        "privacy.s4.li6": "Referrer-URL",
        "privacy.s4.p2": "Die Verarbeitung erfolgt zur Sicherstellung des technischen Betriebs, zur Fehleranalyse sowie zur Abwehr von Angriffen.",
        "privacy.s4.p3": "Die Logfiles werden für einen begrenzten Zeitraum gespeichert und anschließend gelöscht oder anonymisiert.",
        "privacy.s5.title": "5. Kontaktaufnahme per E-Mail",
        "privacy.s5.p1": "Wenn Sie mich per E-Mail kontaktieren, werden Ihre Angaben zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet.",
        "privacy.s5.p2": "Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Kommunikation).",
        "privacy.s6.title": "6. Kontaktformular (EmailJS)",
        "privacy.s6.p1": "Wenn Sie das Kontaktformular nutzen, werden die eingegebenen Daten (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung Ihrer Anfrage verarbeitet.",
        "privacy.s6.p2": "Der Versand der Kontaktanfrage erfolgt über den Dienst EmailJS als technischen Dienstleister. Dabei werden Ihre Angaben an EmailJS übermittelt und dort verarbeitet.",
        "privacy.s6.p3": "Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bearbeitung von Anfragen).",
        "privacy.s6.p4": "Sofern der Dienstleister in einem Drittland sitzt, erfolgt die Übermittlung auf Basis geeigneter Garantien, insbesondere der Standardvertragsklauseln gemäß Art. 46 DSGVO.",
        "privacy.s7.title": "7. Externe Skripte / CDN",
        "privacy.s7.p1": "Zur technischen Bereitstellung des Kontaktformulars wird eine JavaScript-Bibliothek über ein Content Delivery Network (CDN) geladen, derzeit jsDelivr.",
        "privacy.s7.p2": "Dabei wird Ihre IP-Adresse an den CDN-Anbieter übermittelt, um die Datei technisch auszuliefern.",
        "privacy.s7.p3": "Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und effizienten Bereitstellung der Website).",
        "privacy.s8.title": "8. Technisch notwendige Speicherung (Local Storage)",
        "privacy.s8.p1": "Zur Speicherung der von Ihnen gewählten Sprache wird ein Eintrag im Local Storage Ihres Browsers gespeichert (Schlüssel: \"lumiLang\").",
        "privacy.s8.p2": "§ 25 Abs. 2 Nr. 2 TTDSG sowie Art. 6 Abs. 1 lit. f DSGVO.",
        "privacy.s8.p3": "Sie können diese Speicherung jederzeit über die Einstellungen Ihres Browsers löschen.",
        "privacy.s9.title": "9. Cookies",
        "privacy.s9.p1": "Diese Website verwendet keine Cookies zu Analyse- oder Marketingzwecken.",
        "privacy.s9.p2": "Etwaige technisch notwendige Cookies werden ausschließlich im erforderlichen Umfang eingesetzt.",
        "privacy.s10.title": "10. Empfänger personenbezogener Daten",
        "privacy.s10.p1": "Empfänger personenbezogener Daten sind ausschließlich technische Dienstleister (z. B. Hosting-Anbieter, Kontaktformular-Dienst), die in meinem Auftrag handeln.",
        "privacy.s11.title": "11. SSL-/TLS-Verschlüsselung",
        "privacy.s11.p1": "Diese Website nutzt eine SSL- bzw. TLS-Verschlüsselung (HTTPS), um die Übertragung von Daten vor dem Zugriff Dritter zu schützen.",
        "privacy.s12.title": "12. Rechte der betroffenen Personen",
        "privacy.s12.p1": "Sie haben das Recht auf:",
        "privacy.s12.li1": "Auskunft (Art. 15 DSGVO)",
        "privacy.s12.li2": "Berichtigung (Art. 16 DSGVO)",
        "privacy.s12.li3": "Löschung (Art. 17 DSGVO)",
        "privacy.s12.li4": "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
        "privacy.s12.li5": "Datenübertragbarkeit (Art. 20 DSGVO)",
        "privacy.s12.li6": "Widerspruch (Art. 21 DSGVO)",
        "privacy.s12.li7": "Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)",
        "privacy.s12.p2a": "Zur Wahrnehmung Ihrer Rechte genügt eine formlose Mitteilung an ",
        "privacy.s12.p2b": ".",
        "privacy.s13.title": "13. Widerspruchsrecht",
        "privacy.s13.p1": "Sofern die Verarbeitung Ihrer personenbezogenen Daten auf Art. 6 Abs. 1 lit. f DSGVO beruht, haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch gegen die Verarbeitung einzulegen.",
        "privacy.s14.title": "14. Beschwerderecht",
        "privacy.s14.p1": "Sie haben das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren.",
        "privacy.s15.title": "15. Pflicht zur Bereitstellung personenbezogener Daten",
        "privacy.s15.p1": "Die Bereitstellung personenbezogener Daten ist weder gesetzlich noch vertraglich vorgeschrieben. Ohne diese Daten kann die Bearbeitung Ihrer Anfrage jedoch nicht erfolgen.",
        "privacy.s16.title": "16. Automatisierte Entscheidungsfindung",
        "privacy.s16.p1": "Eine automatisierte Entscheidungsfindung oder ein Profiling findet nicht statt.",
        "privacy.s17.title": "17. Stand",
        "privacy.s17.p1": "Januar 2026",
        "footer.brand": "Lumi Digital",
        "footer.impressum": "Impressum",
        "footer.privacy": "Datenschutz",
        "alerts.thanks": "Danke!",
        "alerts.required": "Bitte fuellen Sie alle Pflichtfelder aus."
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
        "demos.d2.title": "مطعم - مذاق محلي عبر الإنترنت",
        "demos.d2.text":
          "قائمة الطعام، الحجوزات، وطرق تواصل سريعة للزبائن القريبين.",
        "demos.d2.result": "حجوزات أكثر من منطقتك.",
        "demos.d3.title": "نادي لياقة - مزيد من الأعضاء",
        "demos.d3.text":
          "الحصص، الأسعار، والمزايا بشكل واضح مع دعوات للتواصل.",
        "demos.d3.result": "مزيد من طلبات التجربة والاستفسارات.",
        "demos.d4.title": "حرفي - سهل العثور عليك",
        "demos.d4.text": "الخدمات، الأعمال السابقة، وتواصل مباشر يبني الثقة بسرعة.",
        "demos.d4.result": "مكالمات أكثر عبر تواصل واضح.",
        "demos.viewDemo": "عرض النموذج",
        "demos.getSimilar": "احجز استشارة مجانية",
        "demos.prev": "العرض السابق",
        "demos.next": "العرض التالي",
        "demos.dotLabel": "الانتقال إلى العرض",

        "pricing.kicker": "الأسعار",
        "pricing.title": "باقات واضحة. بدون مفاجآت.",
        "pricing.subtitle": "اختر باقة تناسب عملك اليوم - وتوسع لاحقًا.",
        "pricing.popular": "الأكثر طلبًا",
        "pricing.starter.title": "ستارتر",
        "pricing.starter.tagline": "للمستقلين وأصحاب الأعمال الصغيرة مع عرض واضح.",
        "pricing.business.title": "بزنس",
        "pricing.business.tagline": "لمقدمي الخدمات المحليين مع عدة خدمات واحتياج مستمر للاستفسارات.",
        "pricing.premium.title": "بريميوم",
        "pricing.premium.tagline": "للأعمال الراسخة مع خدمات متعددة أو فروع.",
        "pricing.deal.newyear": "عرض رأس السنة",
        "pricing.starter.p1": "صفحة واحدة تشمل البداية والخدمات والتواصل",
        "pricing.starter.p2": "مهيأ للهاتف والتابلت",
        "pricing.starter.p3": "نموذج تواصل أو زر واتساب",
        "pricing.starter.p4": "ظهور محلي أفضل على Google",
        "pricing.starter.p5": "هيكلة واضحة لتسهيل التصفح",
        "pricing.starter.p6": "جولة تعديل واحدة ضمن الباقة",
        "pricing.starter.p7": "الإطلاق المباشر والتشغيل التقني مشمولان",
        "pricing.starter.p8": "مدة التنفيذ: تقريبًا 7-14 يومًا",
        "pricing.business.p1": "حتى 5 صفحات بهيكل واضح",
        "pricing.business.p2": "عرض منظم للخدمات والمراجع والتواصل",
        "pricing.business.p3": "تركيز على الاستفسارات عبر النموذج والهاتف وواتساب",
        "pricing.business.p4": "سرعة تحميل جيدة لتجربة استخدام سلسة",
        "pricing.business.p5": "ظهور محلي أفضل على Google لعدة خدمات",
        "pricing.business.p6": "جولتا تعديل ضمن الباقة",
        "pricing.business.p7": "الإطلاق المباشر والتشغيل التقني مشمولان",
        "pricing.business.p8": "مدة التنفيذ: تقريبًا 7-14 يومًا",
        "pricing.premium.p1": "حتى 8 صفحات بمحتوى أعمق",
        "pricing.premium.p2": "تصميم مخصص متوافق مع الهوية",
        "pricing.premium.p3": "حركات خفيفة لمظهر احترافي",
        "pricing.premium.p4": "هيكلة صفحات واضحة لتحسين الظهور",
        "pricing.premium.p5": "ثلاث جولات تعديل ضمن الباقة",
        "pricing.premium.p6": "دعم لمدة 14 يومًا بعد الإطلاق",
        "pricing.premium.p7": "الإطلاق المباشر والتشغيل التقني مشمولان",
        "pricing.premium.p8": "مدة التنفيذ: تقريبًا 7-14 يومًا",
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
        "contact.methodsTitle": "تواصل مباشر",
        "contact.method.phoneLabel": "الهاتف",
        "contact.method.whatsappLabel": "واتساب",
        "contact.method.emailLabel": "البريد الإلكتروني",
        "contact.form.nameLabel": "الاسم",
        "contact.form.emailLabel": "البريد الإلكتروني",
        "contact.form.messageLabel": "الرسالة",
        "contact.form.submit": "إرسال الرسالة",
        "contact.form.note": "لا مكالمة بيع. فقط توصية واضحة.",
        "contact.form.trust": "عادةً أرد خلال 24 ساعة. رسالتك تبقى خاصة.",
        "legal.kicker": "معلومات قانونية",
        "legal.address.name": "Majd Al Mahamed",
        "legal.address.street": "Hollaenderstrasse 9",
        "legal.address.city": "94032 Passau",
        "legal.address.country": "ألمانيا",
        "legal.emailLabel": "البريد الإلكتروني:",
        "impressum.pageTitle": "بيانات قانونية | LUMI DIGITAL",
        "impressum.title": "بيانات قانونية",
        "impressum.subtitle": "بيانات وفقا للمادة 5 من TMG والمادة 18 من MStV.",
        "impressum.provider.title": "مقدم الخدمة",
        "impressum.responsible.title": "المسؤول عن المحتوى وفقا للمادة 18 الفقرة 2 من MStV",
        "impressum.vat.title": "رقم التعريف الضريبي",
        "impressum.vat.text": "رقم التعريف الضريبي وفقا للمادة 27أ من قانون ضريبة القيمة المضافة الألماني: غير متوفر.",
        "impressum.dispute.title": "تسوية نزاعات المستهلك",
        "impressum.dispute.text": "لست ملزم ولا مستعد للمشاركة في إجراءات تسوية النزاعات أمام هيئة تحكيم المستهلك.",
        "impressum.content.title": "المسؤولية عن المحتوى",
        "impressum.content.p1": "بصفتي مزود خدمة، فأنا مسؤول عن المحتوى الخاص بي على هذه الصفحات وفقا للمادة 7 الفقرة 1 من TMG والقوانين العامة.",
        "impressum.content.p2": "ومع ذلك، وفقا للمواد 8 إلى 10 من TMG لست ملزم بمراقبة المعلومات المنقولة أو المخزنة للغير أو البحث عن ظروف تشير إلى نشاط غير قانوني.",
        "impressum.content.p3": "تبقى الالتزامات بإزالة أو حجب استخدام المعلومات بموجب القوانين العامة دون تأثر.",
        "impressum.content.p4": "ولا تقوم المسؤولية إلا من وقت العلم بانتهاك قانوني محدد.",
        "impressum.content.p5": "وعند العلم بمثل هذه الانتهاكات، سأقوم بإزالة هذا المحتوى فورا.",
        "impressum.links.title": "المسؤولية عن الروابط",
        "impressum.links.p1": "قد يحتوي هذا الموقع على روابط لمواقع خارجية لأطراف ثالثة لا أملك السيطرة على محتواها.",
        "impressum.links.p2": "لذلك لا أتحمل أي مسؤولية عن هذه المحتويات الخارجية. ويظل مزود أو مشغل الصفحات المرتبطة مسؤول دائما عن محتواها.",
        "impressum.links.p3": "تم فحص الصفحات المرتبطة بحثا عن مخالفات قانونية محتملة وقت الربط.",
        "impressum.links.p4": "لم يكن هناك محتوى غير قانوني يمكن التعرف عليه في ذلك الوقت.",
        "impressum.links.p5": "لا يمكن توقع مراقبة دائمة لمحتوى الصفحات المرتبطة دون دلائل محددة على مخالفة قانونية.",
        "impressum.links.p6": "وعند العلم بمخالفات قانونية، سأزيل مثل هذه الروابط فورا.",
        "impressum.notice.title": "ملاحظة",
        "impressum.notice.text": "هذا الموقع مخصص فقط لعرض المشاريع والخدمات. لا يتم أي بيع عبر هذا الموقع.",
        "privacy.pageTitle": "سياسة الخصوصية | LUMI DIGITAL",
        "privacy.title": "سياسة الخصوصية",
        "privacy.subtitle": "معلومات حول معالجة البيانات الشخصية وفقا للائحة العامة لحماية البيانات (GDPR).",
        "privacy.legalBasisLabel": "الأساس القانوني:",
        "privacy.s1.title": "1. المسؤول",
        "privacy.s2.title": "2. ملاحظات عامة",
        "privacy.s2.p1": "توضح سياسة الخصوصية هذه طبيعة ونطاق وغرض معالجة البيانات الشخصية على هذا الموقع.",
        "privacy.s2.p2": "يستخدم الموقع فقط لعرض الخدمات وحزم الأمثلة. لا يتم استخدام أي أدوات تتبع أو تسويق (مثل Google Analytics أو Meta Pixel).",
        "privacy.s3.title": "3. الاستضافة (GitHub Pages)",
        "privacy.s3.p1": "يتم تقديم هذا الموقع كموقع ثابت عبر GitHub Pages.",
        "privacy.s3.p2": "المزود هو GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.",
        "privacy.s3.p3": "تقوم GitHub بمعالجة بيانات الوصول (مثل عنوان IP) لتوفير الموقع تقنيا ولضمان تشغيله بشكل مستقر وامن (ملفات سجلات الخادم).",
        "privacy.s3.p4": "يتم نقل البيانات الشخصية إلى الولايات المتحدة على أساس ضمانات مناسبة وفقا للمادة 46 من اللائحة العامة لحماية البيانات، وبخاصة البنود التعاقدية القياسية المعتمدة من المفوضية الأوروبية.",
        "privacy.s3.p5": "المادة 6 الفقرة 1 (و) من اللائحة العامة لحماية البيانات (مصلحة مشروعة في تشغيل الموقع بشكل امن ومستقر).",
        "privacy.s4.title": "4. ملفات سجلات الخادم",
        "privacy.s4.p1": "عند زيارة هذا الموقع، يقوم مزود الاستضافة تلقائيا بجمع معلومات مثل:",
        "privacy.s4.li1": "عنوان IP",
        "privacy.s4.li2": "تاريخ ووقت الوصول",
        "privacy.s4.li3": "الصفحة التي تم الوصول إليها",
        "privacy.s4.li4": "كمية البيانات المنقولة",
        "privacy.s4.li5": "نوع المتصفح ونظام التشغيل",
        "privacy.s4.li6": "عنوان URL المحيل",
        "privacy.s4.p2": "تتم المعالجة لضمان التشغيل الفني، وتحليل الأخطاء، والدفاع ضد الهجمات.",
        "privacy.s4.p3": "يتم تخزين ملفات السجلات لفترة محدودة ثم تحذف او تجعل مجهولة.",
        "privacy.s5.title": "5. التواصل عبر البريد الإلكتروني",
        "privacy.s5.p1": "إذا تواصلت معي عبر البريد الإلكتروني، فسيتم معالجة بياناتك بغرض معالجة طلبك.",
        "privacy.s5.p2": "المادة 6 الفقرة 1 (ب) من اللائحة العامة لحماية البيانات (إجراءات ما قبل التعاقد) أو المادة 6 الفقرة 1 (و) من اللائحة (مصلحة مشروعة في التواصل).",
        "privacy.s6.title": "6. نموذج الاتصال (EmailJS)",
        "privacy.s6.p1": "عند استخدام نموذج الاتصال، تتم معالجة البيانات المدخلة (الاسم، البريد الإلكتروني، الرسالة) لمعالجة طلبك.",
        "privacy.s6.p2": "يتم إرسال طلب الاتصال عبر خدمة EmailJS كمزود تقني، ويتم نقل بياناتك إلى EmailJS ومعالجتها هناك.",
        "privacy.s6.p3": "المادة 6 الفقرة 1 (ب) من اللائحة العامة لحماية البيانات (إجراءات ما قبل التعاقد) أو المادة 6 الفقرة 1 (و) (مصلحة مشروعة في معالجة الاستفسارات).",
        "privacy.s6.p4": "إذا كان مقدم الخدمة موجودا في دولة ثالثة، فيتم النقل على أساس ضمانات مناسبة، وبخاصة البنود التعاقدية القياسية وفقا للمادة 46 من اللائحة العامة لحماية البيانات.",
        "privacy.s7.title": "7. سكربتات خارجية / CDN",
        "privacy.s7.p1": "لتوفير نموذج الاتصال تقنيا، يتم تحميل مكتبة JavaScript عبر شبكة توصيل المحتوى (CDN)، حاليا jsDelivr.",
        "privacy.s7.p2": "يتم إرسال عنوان IP الخاص بك إلى مزود CDN لتسليم الملف.",
        "privacy.s7.p3": "المادة 6 الفقرة 1 (و) من اللائحة العامة لحماية البيانات (مصلحة مشروعة في توفير الموقع بشكل امن وفعال).",
        "privacy.s8.title": "8. التخزين الضروري تقنيا (Local Storage)",
        "privacy.s8.p1": "لحفظ اللغة التي اخترتها، يتم تخزين إدخال في التخزين المحلي للمتصفح (المفتاح: \"lumiLang\").",
        "privacy.s8.p2": "المادة 25 الفقرة 2 رقم 2 من TTDSG وكذلك المادة 6 الفقرة 1 (و) من اللائحة العامة لحماية البيانات.",
        "privacy.s8.p3": "يمكنك حذف هذا التخزين في أي وقت من خلال إعدادات المتصفح.",
        "privacy.s9.title": "9. ملفات تعريف الارتباط",
        "privacy.s9.p1": "لا يستخدم هذا الموقع ملفات تعريف الارتباط لأغراض التحليل أو التسويق.",
        "privacy.s9.p2": "يتم استخدام أي ملفات تعريف ارتباط ضرورية تقنيا فقط بالقدر اللازم.",
        "privacy.s10.title": "10. مستلمو البيانات الشخصية",
        "privacy.s10.p1": "مستلمو البيانات الشخصية هم فقط مزودو الخدمات التقنية (مثل مزود الاستضافة وخدمة نموذج الاتصال) الذين يعملون نيابة عني.",
        "privacy.s11.title": "11. تشفير SSL/TLS",
        "privacy.s11.p1": "يستخدم هذا الموقع تشفير SSL/TLS (HTTPS) لحماية نقل البيانات من وصول أطراف ثالثة.",
        "privacy.s12.title": "12. حقوق أصحاب البيانات",
        "privacy.s12.p1": "لديك الحق في:",
        "privacy.s12.li1": "الاطلاع (المادة 15 من اللائحة العامة لحماية البيانات)",
        "privacy.s12.li2": "التصحيح (المادة 16 من اللائحة العامة لحماية البيانات)",
        "privacy.s12.li3": "المحو (المادة 17 من اللائحة العامة لحماية البيانات)",
        "privacy.s12.li4": "تقييد المعالجة (المادة 18 من اللائحة العامة لحماية البيانات)",
        "privacy.s12.li5": "قابلية نقل البيانات (المادة 20 من اللائحة العامة لحماية البيانات)",
        "privacy.s12.li6": "الاعتراض (المادة 21 من اللائحة العامة لحماية البيانات)",
        "privacy.s12.li7": "سحب الموافقة (المادة 7 الفقرة 3 من اللائحة العامة لحماية البيانات)",
        "privacy.s12.p2a": "لممارسة حقوقك، يكفي إرسال إشعار غير رسمي إلى ",
        "privacy.s12.p2b": ".",
        "privacy.s13.title": "13. حق الاعتراض",
        "privacy.s13.p1": "إذا كانت معالجة بياناتك الشخصية تستند إلى المادة 6 الفقرة 1 (و) من اللائحة العامة لحماية البيانات، فيحق لك الاعتراض على المعالجة في أي وقت لأسباب تتعلق بوضعك الخاص.",
        "privacy.s14.title": "14. حق تقديم شكوى",
        "privacy.s14.p1": "لديك الحق في تقديم شكوى إلى سلطة رقابة حماية البيانات المختصة.",
        "privacy.s15.title": "15. إلزامية تقديم البيانات الشخصية",
        "privacy.s15.p1": "تقديم البيانات الشخصية غير مطلوب قانونيا أو تعاقديا. ومع ذلك، لا يمكن معالجة طلبك بدون هذه البيانات.",
        "privacy.s16.title": "16. اتخاذ القرار الآلي",
        "privacy.s16.p1": "لا يحدث اتخاذ قرار آلي أو إنشاء ملفات تعريف.",
        "privacy.s17.title": "17. تاريخ السريان",
        "privacy.s17.p1": "يناير 2026",
        "footer.brand": "Lumi Digital",
        "footer.impressum": "بيانات قانونية",
        "footer.privacy": "الخصوصية",
        "alerts.thanks": "شكرًا لك!",
        "alerts.required": "يرجى ملء جميع الحقول المطلوبة."
      }
    };

    const getUrlLang = () => {
      try {
        return new URLSearchParams(window.location.search).get("lang");
      } catch (_) {
        return null;
      }
    };

    const setUrlLang = (lang) => {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        history.replaceState(null, "", url.toString());
      } catch (_) {}
    };

    const updateLangLinks = (lang) => {
      try {
        const selectors = [
          'a[href^="index.html"]',
          'a[href^="impressum.html"]',
          'a[href^="datenschutz.html"]'
        ].join(", ");

        document.querySelectorAll(selectors).forEach((link) => {
          const href = link.getAttribute("href");
          if (!href) return;

          const [pathAndQuery, hash] = href.split("#");
          const [path, query = ""] = pathAndQuery.split("?");
          const params = new URLSearchParams(query);
          params.set("lang", lang);

          const next = `${path}?${params.toString()}${hash ? "#" + hash : ""}`;
          link.setAttribute("href", next);
        });
      } catch (_) {}
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
      setUrlLang(safe);
      updateLangLinks(safe);
      document.dispatchEvent(new CustomEvent("lumi:lang", { detail: safe }));
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

    const urlLang = getUrlLang();
    applyLang(urlLang || stored || document.documentElement.lang || "en");

    // Bind buttons (desktop + mobile)
    document.querySelectorAll(".lang__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang || "en";
        applyLang(lang);
      });
    });

    const reapplyLang = () => {
      applyLang(document.documentElement.lang || "en");
    };
    window.addEventListener("load", reapplyLang);
    setTimeout(reapplyLang, 0);
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
