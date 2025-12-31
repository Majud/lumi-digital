// Contact form (EmailJS)
(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  // 1) EmailJS init
  const PUBLIC_KEY = "skNWDK3Stcb3TfJzy";
  const SERVICE_ID = "service_tgaf1os";
  const TEMPLATE_ID = "template_8pjekl4";

  // Safety: check EmailJS loaded
  if (!window.emailjs) {
    console.warn("EmailJS not loaded. Did you include the CDN script?");
    return;
  }

  emailjs.init(PUBLIC_KEY);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const oldText = submitBtn ? submitBtn.textContent : "";

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      // 2) sendForm sends all inputs by their "name"
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form);

      const msg =\r\n        (window.LUMI_T && window.LUMI_T("alerts.thanks")) ||\r\n        "Danke! Deine Nachricht wurde gesendet.";\r\n      alert(msg);\r\n      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Ups — das Senden hat nicht funktioniert. Bitte versuch es nochmal.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = oldText;
      }
    }
  });
})();

