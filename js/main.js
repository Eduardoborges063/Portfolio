(() => {
  "use strict";

  const EMAIL = "1eduardomacedo2525@gmail.com";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;

  /* ---------- Projetos: monta os cards a partir de data/projects.js ---------- */
  const link = (url, key, fill) => url
    ? `<a class="pill${fill ? " pill--fill" : ""}" href="${url}" target="_blank" rel="noopener" data-i18n="${key}"></a>` : "";
  $("#project-list").innerHTML = window.PROJECTS.map((p, i) => `
    <article class="proj${p.featured ? " proj--feat" : ""}" style="--d:${i}">
      <div class="proj__img"><img src="${p.image}" alt="${p.name}" width="1000" height="${p.h}" loading="lazy"></div>
      <div class="proj__body rise" style="--d:${i + 2}">
        <p class="proj__kind" data-i18n="proj.${p.id}.kind"></p>
        <h3 class="proj__name">${p.name}</h3>
        <p data-i18n="proj.${p.id}.desc"></p>
        ${p.goal ? `<p class="proj__goal"><b data-i18n="proj.goal"></b> <span data-i18n="proj.${p.id}.goal"></span></p>` : ""}
        ${p.tech.length ? `<ul class="tech">${p.tech.map((t) => `<li>${t}</li>`).join("")}</ul>` : ""}
        <div class="proj__links">${link(p.links.github, "proj.gh", true)}${link(p.links.demo, "proj.demo")}</div>
      </div>
    </article>`).join("");

  /* ---------- Idioma ---------- */
  let lang = "pt";
  try { lang = localStorage.getItem("lang") === "en" ? "en" : "pt"; } catch (_) {}

  function setLang(next) {
    lang = next;
    const dict = window.I18N[lang];
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    $$("[data-i18n]").forEach((el) => { if (dict[el.dataset.i18n]) el.textContent = dict[el.dataset.i18n]; });
    const btn = $("#lang");
    btn.textContent = lang === "pt" ? "EN" : "PT";
    btn.setAttribute("aria-label", lang === "pt" ? "Switch to English" : "Mudar para português");
    try { localStorage.setItem("lang", lang); } catch (_) {}
  }
  $("#lang").addEventListener("click", () => setLang(lang === "pt" ? "en" : "pt"));
  setLang(lang);

  /* ---------- Letras: cada uma sobe por trás de uma máscara ---------- */
  $$("[data-split]").forEach((el) => {
    const front = el.dataset.split === "front";
    const text = el.textContent.trim();
    el.textContent = "";
    [...text].forEach((c, i) => {
      const s = document.createElement("span");
      s.className = "ch" + (front && (i === 2 || i === 3) ? " on" : "");
      s.style.setProperty("--i", i);
      s.textContent = c;
      el.appendChild(s);
    });
  });

  /* ---------- Loader ---------- */
  const count = $("#count"), bar = $("#bar");
  const finish = () => { body.classList.remove("is-loading"); body.classList.add("is-ready"); };

  if (reduce) {
    count.textContent = "100"; finish();
  } else {
    const dur = 1300, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      count.textContent = Math.round(e * 100);
      bar.style.width = e * 100 + "%";
      p < 1 ? requestAnimationFrame(tick) : setTimeout(finish, 150);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Profundidade: mouse e rolagem ---------- */
  const stage = $("#stage");
  if (!reduce) {
    let raf = 0, mx = 0, my = 0;
    const apply = () => {
      raf = 0;
      stage.style.setProperty("--mx", mx.toFixed(3));
      stage.style.setProperty("--my", my.toFixed(3));
      stage.style.setProperty("--sy", Math.min(scrollY / innerHeight, 1).toFixed(3));
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(apply); };
    if (matchMedia("(pointer: fine)").matches) {
      addEventListener("pointermove", (e) => {
        mx = (e.clientX / innerWidth - .5) * 2;
        my = (e.clientY / innerHeight - .5) * 2;
        queue();
      }, { passive: true });
    }
    addEventListener("scroll", queue, { passive: true });
  }

  /* ---------- Sobre: entrada dos cards, brilho no hover e menu ativo ---------- */
  const about = $("#about");
  if (reduce || !("IntersectionObserver" in window)) about.classList.add("in");
  else new IntersectionObserver((es, o) => es.forEach((e) => {
    if (e.isIntersecting) { about.classList.add("in"); o.disconnect(); }
  }), { threshold: .15 }).observe(about);

  $$(".card").forEach((c, i) => {
    c.style.setProperty("--d", i);
    c.addEventListener("pointermove", (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--x", e.clientX - r.left + "px");
      c.style.setProperty("--y", e.clientY - r.top + "px");
    });
  });

  /* ---------- Conhecimentos: palavras sobem em sequência ---------- */
  const skills = $("#skills");
  $$("#skills ul").forEach((ul) => [...ul.children].forEach((li, i) => li.style.setProperty("--i", i)));
  if (reduce || !("IntersectionObserver" in window)) skills.classList.add("in");
  else new IntersectionObserver((es, o) => es.forEach((e) => {
    if (e.isIntersecting) { skills.classList.add("in"); o.disconnect(); }
  }), { threshold: .15 }).observe(skills);

  /* ---------- Projetos, formação e contato: entrada ao rolar + copiar e-mail ---------- */
  $$("#experience .tl li").forEach((li, i) => { li.classList.add("rise"); li.style.setProperty("--d", i); });
  $$("#projects, #experience, #contact").forEach((sec) => {
    if (reduce || !("IntersectionObserver" in window)) return sec.classList.add("in");
    new IntersectionObserver((es, o) => es.forEach((e) => {
      if (e.isIntersecting) { sec.classList.add("in"); o.disconnect(); }
    }), { threshold: .12 }).observe(sec);
  });

  const copyBtn = $("#copy");
  copyBtn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch (_) { return; }
    copyBtn.textContent = window.I18N[lang]["contact.copied"];
    setTimeout(() => { copyBtn.textContent = window.I18N[lang]["contact.copy"]; }, 1800);
  });

  const links = $$(".menu a");
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.getAttribute("href") === "#" + e.target.id
        ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
    }), { rootMargin: "-45% 0px -45% 0px" });
    $$("main section[id]").forEach((sec) => spy.observe(sec));
  }

  /* ---------- Feedback (abre o e-mail do visitante) ---------- */
  const dlg = $("#fb"), form = $("#fb-form");
  $("#fb-open").addEventListener("click", () => dlg.showModal());
  $("#fb-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });

  form.addEventListener("submit", () => {
    const d = window.I18N[lang], f = new FormData(form);
    const lines = [];
    if (f.get("rate")) lines.push(`${d["fb.l.rate"]}: ${f.get("rate")}/5`);
    if (f.get("name")) lines.push(`${d["fb.l.name"]}: ${f.get("name")}`);
    lines.push("", f.get("msg"));
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(d["fb.subject"])}&body=${encodeURIComponent(lines.join("\n"))}`;
  });
})();
