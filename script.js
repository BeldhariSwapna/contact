const API_BASE = "http://localhost:5000";

    const form = document.getElementById("contactForm");
    const msgEl = document.getElementById("formMessage");
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setMsg(text, type) {
      msgEl.textContent = text;
      msgEl.className = "msg " + (type || "");
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !subject || !message) {
        return setMsg("⚠️ All fields are required.", "error");
      }
      if (!emailRx.test(email)) {
        return setMsg("⚠️ Please enter a valid email address.", "error");
      }

      setMsg("Sending…");

      try {
        const res = await fetch(`${API_BASE}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message })
        });

        if (res.ok) {
          setMsg("✅ Your message has been sent!", "success");
          form.reset();
        } else {
          const data = await res.json().catch(() => ({}));
          setMsg(`❌ ${data.error || "Something went wrong."}`, "error");
        }
      } catch (err) {
        console.error(err);
        setMsg("❌ Unable to reach server. Check API_BASE and CORS.", "error");
      }
    });