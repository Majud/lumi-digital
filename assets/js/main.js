/* ==========================================
   main.js — Contact form (EmailJS)
   - Sends form via EmailJS
   - Uses translated alerts via window.LUMI_T
   ========================================== */

(function () {
  "use strict";

  const form = document.getElementById("contactForm");
  if (!form) return;

  // Make sure EmailJS script is loaded
  if (!window.emailjs) {
    console.warn("EmailJS not loaded. Did you include the CDN script?");
    return;
  }

  // Your EmailJS keys
  const PUBLIC_KEY = "skNWDK3Stcb3TfJzy";
  const SERVICE_ID = "service_tgaf1os";
  const TEMPLATE_ID = "template_8pjekl4";

  // init
  try {
    window.emailjs.init(PUBLIC_KEY);
  } catch (e) {
    console.error("EmailJS init failed:", e);
    return;
  }

  const errorMessage = form.querySelector(".form__error");
  const name = form.querySelector("#name");
  const email = form.querySelector("#email");
  const message = form.querySelector("#message");
  const requiredFields = [name, email, message].filter(Boolean);
  let hasSubmitted = false;

  const setFormError = (msg) => {
    if (!errorMessage) return;
    if (msg) {
      errorMessage.textContent = msg;
      errorMessage.hidden = false;
    } else {
      errorMessage.textContent = "";
      errorMessage.hidden = true;
    }
  };

  const getRequiredMessage = () =>
    (window.LUMI_T && window.LUMI_T("alerts.required")) ||
    "Bitte fuellen Sie alle Pflichtfelder aus.";

  // Simple required validation
  function markInvalid(el, invalid) {
    if (!el) return;
    if (invalid) el.setAttribute("aria-invalid", "true");
    else el.removeAttribute("aria-invalid");
  }

  function validateRequired() {
    let firstInvalid = null;
    let hasMissing = false;

    requiredFields.forEach((field) => {
      const invalid = !field.value.trim();
      markInvalid(field, invalid);
      if (invalid) {
        hasMissing = true;
        if (!firstInvalid) firstInvalid = field;
      }
    });

    return { hasMissing, firstInvalid };
  }

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      if (!hasSubmitted) return;
      markInvalid(field, !field.value.trim());
      if (requiredFields.every((el) => el.value.trim())) {
        setFormError("");
      }
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    hasSubmitted = true;
    const { hasMissing, firstInvalid } = validateRequired();

    if (hasMissing) {
      setFormError(getRequiredMessage());
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    setFormError("");

    const submitBtn = form.querySelector('button[type="submit"]');
    const oldText = submitBtn ? submitBtn.textContent : "";

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      await window.emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form);

      const msg =
        (window.LUMI_T && window.LUMI_T("alerts.thanks")) ||
        "Danke! Deine Nachricht wurde gesendet.";
      alert(msg);

      form.reset();
      requiredFields.forEach((field) => markInvalid(field, false));
      setFormError("");
      hasSubmitted = false;
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Ups - das Senden hat nicht funktioniert. Bitte versuch es nochmal.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = oldText;
      }
    }
  });
})();
