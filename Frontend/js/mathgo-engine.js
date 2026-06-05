// js/mathgo-engine.js — Motor del juego MathGo
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const EXAM_SIZE = 12;
const PASS_THRESHOLD = Math.ceil(EXAM_SIZE * 0.83); // 10 de 12

export async function initEngine({
  worldData, futureNodes = [], getVisual,
  worldId, prereqWorldId = null, prereqWorldData = null,
  user, db, onSignOut,
}) {
  const app = document.getElementById("app");
  const examModal = document.getElementById("exam-modal");
  const uid = user.uid;
  const totalLevels = worldData.levels.length;

  app.innerHTML = `<div class="mg-loading"><div class="mg-loading-inner"><div class="brand-mark">M</div><span>Cargando…</span></div></div>`;

  // ---- Cargar rol y progreso en paralelo (fallos independientes) ----
  let raw = {};
  let isAdmin = false;
  let firestoreName = null;
  const [progressResult, userResult] = await Promise.allSettled([
    getDoc(doc(db, "mathgo_progress", uid)),
    getDoc(doc(db, "users", uid)),
  ]);
  if (progressResult.status === "fulfilled" && progressResult.value.exists()) {
    raw = progressResult.value.data();
  } else if (progressResult.status === "rejected") {
    console.warn("Error cargando progreso:", progressResult.reason);
  }
  if (userResult.status === "fulfilled" && userResult.value.exists()) {
    const ud = userResult.value.data();
    isAdmin = ud.role === "admin";
    firestoreName = ud.name ?? null;
  } else if (userResult.status === "rejected") {
    console.warn("Error cargando rol (revisa reglas de Firestore para users/{uid}):", userResult.reason);
  }

  // ---- Racha diaria ----
  const todayStr = new Date().toLocaleDateString('en-CA'); // "YYYY-MM-DD" en hora local
  const lastDate = raw.lastActiveDate ?? null;
  let dailyStreak = raw.dailyStreak ?? 0;
  if (lastDate !== todayStr) {
    const dayGap = lastDate
      ? Math.round((new Date(todayStr + 'T12:00:00') - new Date(lastDate + 'T12:00:00')) / 86400000)
      : null;
    dailyStreak = dayGap === 1 ? dailyStreak + 1 : 1;
    try {
      await setDoc(doc(db, "mathgo_progress", uid),
        { dailyStreak, lastActiveDate: todayStr }, { merge: true });
    } catch (e) { console.warn("Error guardando racha diaria:", e); }
  }

  const worldProg = () => raw?.worlds?.[worldId] ?? {};

  // ---- Desbloqueo ----
  // Admin: acceso total a todos los mundos.
  // Student: progresión normal (nivel anterior completo o examen de salto aprobado).
  const isUnlocked =
    isAdmin ||
    worldId === 1 ||
    (raw?.worlds?.[prereqWorldId]?.allComplete === true) ||
    (raw?.worlds?.[worldId]?.jumpExam?.passed === true);

  // ---- Estado principal ----
  const S = {
    phase: "home",
    level: 0, step: 0,
    xp: raw.totalXp ?? 0,
    streak: raw.streak ?? 0,
    selected: [], chosen: null, placed: {}, result: null, showHint: false,
    completed: buildCompleted(),
  };

  function buildCompleted() {
    const map = {};
    (worldProg().levelsCompleted ?? []).forEach(li => { map[li] = true; });
    return map;
  }

  // ---- Estado del examen ----
  const examData = raw?.worlds?.[worldId]?.jumpExam ?? {};
  const E = {
    phase: "intro",
    questions: [], index: 0, score: 0,
    selected: [], chosen: null, placed: {}, result: null, showHint: false,
    attempts: examData.attempts ?? 0,
    passed: examData.passed ?? false,
  };
  let pendingExamSave = null;

  // ---- Accesos rápidos ----
  const curLevel    = () => worldData.levels[S.level];
  const curTheory   = () => curLevel().theory;
  const curChallenges = () => curLevel().challenges;
  const levelTotal  = () => curTheory().length + curChallenges().length;

  function levelState(li) {
    if (S.completed[li]) return "completed";
    if (isAdmin || li === 0 || S.completed[li - 1]) return "current";
    return "locked";
  }

  // ---- Fragmentos HTML reutilizables ----
  function sidebar() {
    return `<aside class="mockup-sidebar">
      <div class="brand"><div class="brand-mark">M</div><div class="brand-name">Math<span>Go</span></div></div>
      <nav class="mockup-nav">
        <a href="learn.html" class="active"><span>🏠</span>Aprender</a>
        <a href="profile-page.html"><span>👤</span>Perfil</a>
        <a href="faq.html"><span>❔</span>Soporte</a>
      </nav>
      <div class="sidebar-footer">
        <a onclick="MG.signOut()" style="cursor:pointer;">⛔ Cerrar sesión</a>
      </div>
    </aside>`;
  }

  function rightPanel(completedCount = 0) {
    const name = firestoreName || user.displayName || user.email || "Usuario";
    const initials = name.slice(0, 2).toUpperCase();
    const xpPct = Math.min(100, Math.round((S.xp % 100) / 100 * 100));
    return `<aside class="right-panel">
      <div class="profile-card">
        <div class="avatar">${initials}</div>
        <div><h3>${name}</h3><span>Nivel ${1 + completedCount}</span></div>
      </div>
      <div class="card">
        <h2>Misiones diarias</h2>
        <div class="mission"><p>Gana 100 XP</p>
          <div class="bar"><span style="width:${xpPct}%"></span></div></div>
        <div class="mission"><p>Completa 1 lección perfecta</p>
          <div class="bar"><span style="width:${completedCount > 0 ? 100 : 0}%"></span></div></div>
        <div class="mission"><p>Racha activa</p>
          <div class="bar"><span style="width:${Math.min(100, dailyStreak * 20)}%"></span></div></div>
      </div>
      <div class="card center"><h2>💚 Liga Esmeralda</h2><p>Puesto #4 de 30</p></div>
    </aside>`;
  }

  // ---- Confeti ----
  function confetti() {
    const cols = ["#4A6CF7", "#58cc02", "#ffc800", "#1cb0f6", "#ff4b4b"];
    let html = "";
    for (let i = 0; i < 18; i++) {
      const l = 10 + Math.random() * 80, t = 45 + Math.random() * 15, d = Math.random() * .15;
      html += `<span class="mg-conf" style="left:${l}%;top:${t}%;background:${cols[i % cols.length]};animation:mgConf .9s ease-out ${d}s forwards"></span>`;
    }
    const layer = document.createElement("div");
    layer.style.cssText = "position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:300";
    layer.innerHTML = html;
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 1100);
  }

  // ---- Drag & drop ----
  let drag = null;

  function bindDrag() {
    document.querySelectorAll(".mg-drag").forEach(el =>
      el.addEventListener("pointerdown", e => startDrag(e, el))
    );
  }

  function startDrag(e, el) {
    const inExam = !!el.closest("#exam-modal");
    const st = inExam ? E : S;
    if (st.result === "ok") return;
    e.preventDefault();
    const r = el.getBoundingClientRect();
    const ghost = el.cloneNode(true);
    ghost.classList.add("dragging-ghost");
    ghost.style.cssText += `left:${r.left}px;top:${r.top}px;width:${r.width}px`;
    document.body.appendChild(ghost);
    el.classList.add("lifted");
    drag = { ghost, label: el.dataset.label, dx: e.clientX - r.left, dy: e.clientY - r.top, inExam };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  }

  function zoneUnder(x, y) {
    drag.ghost.style.display = "none";
    const el = document.elementFromPoint(x, y);
    drag.ghost.style.display = "";
    return el ? el.closest(".dropzone") : null;
  }

  function onMove(e) {
    if (!drag) return;
    drag.ghost.style.left = (e.clientX - drag.dx) + "px";
    drag.ghost.style.top  = (e.clientY - drag.dy) + "px";
    document.querySelectorAll(".dropzone.over").forEach(z => z.classList.remove("over"));
    const z = zoneUnder(e.clientX, e.clientY);
    if (z) z.classList.add("over");
  }

  function onUp(e) {
    if (!drag) return;
    const z = zoneUnder(e.clientX, e.clientY);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
    drag.ghost.remove();
    const { label, inExam } = drag;
    drag = null;
    if (z && z.dataset.zone != null) {
      inExam ? MG.examDrop(label, z.dataset.zone) : MG.drop(label, z.dataset.zone);
    } else {
      inExam ? renderExam() : render();
    }
  }

  // ---- Validación de respuesta ----
  function canCheck(c, st) {
    if (c.type === "build" || c.type === "buildSeq") return st.selected.length > 0;
    if (c.type === "mc"    || c.type === "vf")       return st.chosen !== null;
    if (c.type === "match")  return Object.keys(st.placed).length === c.pairs.length;
    if (c.type === "slots")  return Object.keys(st.placed).length === c.slots;
    return false;
  }

  function evaluate(c, st) {
    if (c.type === "mc" || c.type === "vf") return c.options[st.chosen].correct;
    if (c.type === "build") {
      const ops = st.selected.map(s => s.label).filter(l => l !== "+").sort();
      const plus = st.selected.filter(s => s.label === "+").length;
      const need = [...c.operands].sort();
      return ops.length === need.length && ops.every((v, i) => v === need[i]) && plus === need.length - 1;
    }
    if (c.type === "buildSeq") {
      const seq = st.selected.map(s => s.label);
      return c.answers.some(a => a.length === seq.length && a.every((v, i) => v === seq[i]));
    }
    if (c.type === "match") return c.pairs.every((p, i) => st.placed[i] === p.sym);
    if (c.type === "slots") {
      const vals = Object.values(st.placed).sort();
      const ans  = [...c.answer].sort();
      return vals.length === ans.length && vals.every((v, i) => v === ans[i]);
    }
    return false;
  }

  // ---- Render de un reto (compartido player/examen) ----
  function challengeHTML(c, st, h) {
    if (c.type === "mc" || c.type === "vf") {
      const cls = c.type === "vf" ? "mg-vf" : "mg-options";
      return `<div class="${cls}">` + c.options.map((o, i) => {
        let btnCls = "";
        if (st.result && o.correct) btnCls = "right";
        else if (st.result === "no" && st.chosen === i) btnCls = "wrong";
        else if (st.chosen === i) btnCls = "sel";
        return `<button class="mg-opt ${btnCls}" ${st.result === "ok" ? "disabled" : ""} onclick="${h.pick}(${i})">${o.label}</button>`;
      }).join("") + `</div>`;
    }
    if (c.type === "build" || c.type === "buildSeq") {
      const ans = st.selected.length === 0
        ? `<span class="mg-placeholder">Toca los bloques para construir tu respuesta…</span>`
        : st.selected.map(s => `<span class="mg-chip in" onclick="${h.unpick}(${s.id})">${s.label}</span>`).join("");
      const rem = c.bank.map((label, i) => ({ id: i, label }))
        .filter(b => !st.selected.find(s => s.id === b.id));
      return `<div class="mg-answer">${ans}</div>
        <div class="mg-bank">${rem.map(b => `<span class="mg-chip" onclick="${h.put}(${b.id},'${b.label}')">${b.label}</span>`).join("")}</div>`;
    }
    if (c.type === "match") {
      const used = Object.values(st.placed);
      const rows = c.pairs.map((p, i) => {
        const lab = st.placed[i];
        return `<div class="mg-match-row">
          <span class="mg-match-desc">${p.desc}</span>
          <div class="dropzone ${lab ? "filled" : ""}" data-zone="${i}">
            ${lab ? `<span class="mg-placed" onclick="${h.takeOut}(${i})">${lab}</span>` : ""}
          </div></div>`;
      }).join("");
      const bank = c.symOrder.filter(s => !used.includes(s))
        .map(s => `<span class="mg-drag" data-label="${s}">${s}</span>`).join("");
      return `<div class="mg-match">${rows}</div><div class="mg-tilebank">${bank}</div>`;
    }
    if (c.type === "slots") {
      const used = Object.values(st.placed);
      const parts = [];
      if (c.prefix) parts.push(`<span>${c.prefix}</span>`);
      for (let i = 0; i < c.slots; i++) {
        const lab = st.placed[i];
        parts.push(`<div class="dropzone ${lab ? "filled" : ""}" data-zone="${i}">
          ${lab ? `<span class="mg-placed" onclick="${h.takeOut}(${i})">${lab}</span>` : ""}
        </div>`);
        if (i < c.slots - 1) parts.push(`<span>+</span>`);
      }
      const bank = c.bank.filter(s => !used.includes(s))
        .map(s => `<span class="mg-drag" data-label="${s}">${s}</span>`).join("");
      return `<div class="mg-slots">${parts.join("")}</div><div class="mg-tilebank">${bank}</div>`;
    }
    return "";
  }

  // ---- Firestore: guardar progreso ----
  async function saveProgress() {
    const completedArr = Object.keys(S.completed).map(Number).filter(li => S.completed[li]);
    const allComplete  = completedArr.length >= totalLevels;
    try {
      await setDoc(doc(db, "mathgo_progress", uid), {
        totalXp: S.xp,
        streak:  S.streak,
        worlds: {
          [worldId]: {
            levelsCompleted: completedArr,
            allComplete,
            jumpExam: { attempts: E.attempts, passed: E.passed },
          },
        },
      }, { merge: true });
    } catch (e) { console.warn("Error guardando progreso:", e); }
  }

  async function saveJumpExam(passed) {
    try {
      await setDoc(doc(db, "mathgo_progress", uid), {
        worlds: {
          [worldId]: {
            jumpExam: { attempts: E.attempts, passed },
          },
        },
      }, { merge: true });
    } catch (e) { console.warn("Error guardando examen:", e); }
  }

  // ---- Examen de salto: muestreo ----
  function sampleExamQuestions() {
    if (!prereqWorldData) return [];
    const all = [];
    prereqWorldData.levels.forEach(lv => lv.challenges.forEach(c => all.push({ ...c })));
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all.slice(0, Math.min(EXAM_SIZE, all.length));
  }

  // ======= RENDERS =======

  function renderLocked() {
    const prevNum = prereqWorldId ?? worldId - 1;
    const attemptsLeft = 2 - E.attempts;
    app.innerHTML = `
      <div class="mockup-layout mg-fade">
        ${sidebar()}
        <main class="main-content">
          <div class="locked-world-screen">
            <div class="locked-world-icon">🔒</div>
            <h1 class="locked-world-title">${worldData.title}</h1>
            <p class="locked-world-desc">Completa el <strong>Mundo ${prevNum}</strong> para desbloquear este mundo.</p>
            ${attemptsLeft > 0 && !E.passed ? `
            <div class="jump-exam-card">
              <h2>¿Ya dominas el contenido?</h2>
              <p>Demuestra que conoces el Mundo ${prevNum} y desbloquea este mundo directamente.</p>
              <div class="jump-exam-meta">
                <span>📝 ${EXAM_SIZE} preguntas</span>
                <span>🎯 ${PASS_THRESHOLD}/${EXAM_SIZE} para aprobar</span>
                <span>🔁 ${attemptsLeft} intento${attemptsLeft !== 1 ? "s" : ""} restante${attemptsLeft !== 1 ? "s" : ""}</span>
              </div>
              <div class="mg-btn-wrap blue" style="max-width:280px;margin:18px auto 0">
                <button class="mg-btn" onclick="MG.press(this, MG.openExam)">Tomar examen de salto</button>
              </div>
            </div>` : !E.passed ? `
            <div class="jump-exam-exhausted">
              <p>Has agotado tus 2 intentos del examen de salto.</p>
              <p>Completa el Mundo ${prevNum} para desbloquear este.</p>
            </div>` : ""}
            <a href="world-${prevNum}.html" class="back-world-link">← Ir al Mundo ${prevNum}</a>
          </div>
        </main>
        ${rightPanel()}
      </div>`;
  }

  function renderHome() {
    const completedCount = worldData.levels.filter((_, li) => S.completed[li]).length;
    const nodes = worldData.levels.map((lv, li) => {
      const st = levelState(li);
      const offClass = li % 2 === 0 ? "" : (Math.floor(li / 2) % 2 === 0 ? "off2" : "off1");
      const icon = st === "completed" ? "✓" : st === "current" ? "★" : "🔒";
      const bubble = st === "current" ? `<div class="start-bubble">¡EMPIEZA!</div>` : "";
      const click  = st === "locked" ? "" : `onclick="MG.node(${li})"`;
      return `<div class="lesson ${st} ${offClass}" ${click}>${bubble}<div class="circle">${icon}</div><p>${lv.node}</p></div>`;
    }).join("");
    const futureHtml = futureNodes.map((f, i) => {
      const idx = totalLevels + i;
      const offClass = idx % 2 === 0 ? "" : (Math.floor(idx / 2) % 2 === 0 ? "off2" : "off1");
      return `<div class="lesson locked ${offClass}"><div class="circle">🔒</div><p>${f.node}</p></div>`;
    }).join("");

    app.innerHTML = `
      <div class="mockup-layout mg-fade">
        ${sidebar()}
        <main class="main-content">
          <div class="stats-bar">
            <div class="stat-chip">❤️ <strong>${raw.lives ?? 5}</strong></div>
            <div class="stat-chip">🔥 <strong>${dailyStreak}</strong></div>
            <div class="stat-chip">💎 <strong>${raw.gems ?? 0}</strong></div>
            <div class="stat-chip xp">⚡ <strong>${S.xp} XP</strong></div>
          </div>
          <section class="hero-banner">
            <div>
              <small>Mundo ${worldData.id} · ${completedCount}/${totalLevels} niveles</small>
              <h1>${worldData.title}</h1>
            </div>
            <button onclick="MG.toast('Guía disponible próximamente')">📖 Guía</button>
          </section>
          <section class="lesson-path">${nodes}${futureHtml}</section>
        </main>
        ${rightPanel(completedCount)}
      </div>`;
  }

  function renderPlayer() {
    if (S.phase === "leveldone") {
      const lv = worldData.levels[S.level];
      const nextIdx = S.level + 1;
      const nextBtn = nextIdx < totalLevels
        ? `<div class="mg-btn-wrap green" style="max-width:280px;width:100%"><button class="mg-btn" onclick="MG.press(this,()=>MG.startLevel(${nextIdx}))">Siguiente nivel →</button></div>`
        : "";
      app.innerHTML = `<div class="mg-player"><div class="mg-center mg-fade">
        <div style="font-size:60px">🏆</div>
        <h1 style="font-family:'din-round-bold';font-weight:800;font-size:30px;margin:0">¡Nivel ${lv.id} completado!</h1>
        <p class="mg-sub">${lv.title}</p>
        <div class="mg-card-xp"><div style="font-size:12px;font-weight:800;color:rgb(var(--hare));letter-spacing:1px">XP TOTAL</div><div class="n">⭐ ${S.xp}</div></div>
        ${nextBtn}
        <div class="mg-btn-wrap blue" style="max-width:280px;width:100%"><button class="mg-btn" onclick="MG.press(this,MG.home)">Volver al mapa</button></div>
      </div></div>`;
      confetti();
      return;
    }

    const streakHtml = S.streak > 1 ? `<span class="mg-streak">🔥${S.streak}</span>` : "";
    const top = `<div class="mg-top">
      <button class="mg-close" onclick="MG.home()" title="Salir">✕</button>
      <div class="mg-progress"><div class="mg-progress-fill" style="width:${(S.step / levelTotal()) * 100}%"></div></div>
      ${streakHtml}<span class="mg-xp">⭐ ${S.xp}</span></div>`;

    if (S.step < curTheory().length) {
      const t = curTheory()[S.step];
      app.innerHTML = `<div class="mg-player">${top}<div class="mg-content mg-fade">
        <span class="mg-tag">${t.tag}</span><div class="mg-icon">${t.icon}</div>
        <h2 class="mg-title">${t.title}</h2><p class="mg-body">${t.body}</p>
        ${getVisual(t.visual)}
        <div class="mg-note key"><div class="lbl">💡 Idea clave</div><div class="txt">${t.key}</div></div>
      </div><div class="mg-footer"><div class="mg-btn-wrap blue"><button class="mg-btn" onclick="MG.press(this,MG.next)">Continuar</button></div></div></div>`;
      return;
    }

    const c = curChallenges()[S.step - curTheory().length];
    const h = { pick: "MG.pick", put: "MG.put", unpick: "MG.unpick", takeOut: "MG.takeOut" };
    const mid  = challengeHTML(c, S, h);
    const hint = (S.showHint && S.result !== "ok")
      ? `<div class="mg-note hint"><div class="lbl">💡 Pista</div><div class="txt">${c.hint}</div></div>` : "";

    let footer;
    if (S.result === "ok")
      footer = `<div class="mg-btn-wrap green"><button class="mg-btn" onclick="MG.press(this,MG.next)">¡Correcto! Continuar</button></div>`;
    else if (S.result === "no")
      footer = `<div class="mg-btn-wrap red"><button class="mg-btn" onclick="MG.press(this,MG.retry)">Casi… inténtalo de nuevo</button></div>`;
    else
      footer = canCheck(c, S)
        ? `<div class="mg-btn-wrap green"><button class="mg-btn" onclick="MG.press(this,MG.check)">Comprobar</button></div>`
        : `<div class="mg-btn-wrap disabled"><button class="mg-btn" disabled>Comprobar</button></div>`;

    app.innerHTML = `<div class="mg-player">${top}<div class="mg-content mg-fade ${S.result === "no" ? "mg-shake" : ""}">
      <span class="mg-tag">${c.tag}</span><p class="mg-prompt">${c.prompt}</p>${mid}${hint}</div>
      <div class="mg-footer">${footer}</div></div>`;
    bindDrag();
  }

  function renderExam() {
    examModal.classList.remove("hidden");

    if (E.phase === "intro") {
      const attemptsLeft = 2 - E.attempts;
      examModal.innerHTML = `
        <div class="exam-modal-content mg-fade">
          <div class="exam-modal-header">
            <button class="mg-close" onclick="MG.closeExam()">✕</button>
            <h2 class="exam-title">Examen de salto · Mundo ${prereqWorldId ?? worldId - 1}</h2>
          </div>
          <div class="exam-intro-body">
            <div style="font-size:52px">📋</div>
            <p>Responde correctamente al menos <strong>${PASS_THRESHOLD} de ${EXAM_SIZE} preguntas</strong> para desbloquear este mundo.</p>
            <div class="exam-meta-grid">
              <div class="exam-meta-item">📝 ${EXAM_SIZE} preguntas</div>
              <div class="exam-meta-item">🎯 ${PASS_THRESHOLD}/${EXAM_SIZE} para aprobar</div>
              <div class="exam-meta-item">🔁 ${attemptsLeft} intento${attemptsLeft !== 1 ? "s" : ""} restante${attemptsLeft !== 1 ? "s" : ""}</div>
            </div>
          </div>
          <div class="exam-modal-footer">
            <div class="mg-btn-wrap green"><button class="mg-btn" onclick="MG.press(this,MG.startExam)">Comenzar examen</button></div>
            <div class="mg-btn-wrap"><button class="mg-btn" style="background:rgb(var(--swan));color:rgb(var(--eel))" onclick="MG.closeExam()">Cancelar</button></div>
          </div>
        </div>`;
      return;
    }

    if (E.phase === "done") {
      const passed = E.score >= PASS_THRESHOLD;
      const pct = Math.round((E.score / EXAM_SIZE) * 100);
      examModal.innerHTML = `
        <div class="exam-modal-content mg-fade">
          <div class="exam-modal-header">
            <h2 class="exam-title">${passed ? "🎉 ¡Aprobaste!" : "😔 No aprobaste"}</h2>
          </div>
          <div class="exam-intro-body">
            <div style="font-size:52px">${passed ? "🏆" : "📚"}</div>
            <div class="exam-score-display">
              <div class="exam-score-num" style="color:${passed ? "var(--owl-green)" : "var(--cardinal)"}">${E.score}/${EXAM_SIZE}</div>
              <div class="exam-score-pct">${pct}%</div>
            </div>
            <p>${passed
              ? `Excelente dominio del Mundo ${prereqWorldId ?? worldId - 1}. El Mundo ${worldId} queda desbloqueado.`
              : E.attempts >= 2
                ? `Has agotado tus 2 intentos. Completa el Mundo ${prereqWorldId ?? worldId - 1} para desbloquear este.`
                : `Necesitabas ${PASS_THRESHOLD} correctas. Te queda 1 intento más.`}</p>
          </div>
          <div class="exam-modal-footer">
            ${passed
              ? `<div class="mg-btn-wrap green"><button class="mg-btn" onclick="MG.examAccept()">¡Continuar al Mundo ${worldId}!</button></div>`
              : E.attempts >= 2
                ? `<div class="mg-btn-wrap blue"><button class="mg-btn" onclick="MG.closeExam()">Entendido</button></div>`
                : `<div class="mg-btn-wrap blue"><button class="mg-btn" onclick="MG.press(this,MG.startExam)">Reintentar</button></div>
                   <div class="mg-btn-wrap"><button class="mg-btn" style="background:rgb(var(--swan));color:rgb(var(--eel))" onclick="MG.closeExam()">Cancelar</button></div>`}
          </div>
        </div>`;
      if (passed) confetti();
      return;
    }

    // phase === "play"
    const c = E.questions[E.index];
    const h = { pick: "MG.examPick", put: "MG.examPut", unpick: "MG.examUnpick", takeOut: "MG.examTakeOut" };
    const mid  = challengeHTML(c, E, h);
    const hint = (E.showHint && E.result !== "ok")
      ? `<div class="mg-note hint"><div class="lbl">💡 Pista</div><div class="txt">${c.hint}</div></div>` : "";

    let footer;
    if (E.result === "ok")
      footer = `<div class="mg-btn-wrap green"><button class="mg-btn" onclick="MG.press(this,MG.examNext)">¡Correcto! Continuar</button></div>`;
    else if (E.result === "no")
      footer = `<div class="mg-btn-wrap red"><button class="mg-btn" onclick="MG.press(this,MG.examNext)">Continuar</button></div>`;
    else
      footer = canCheck(c, E)
        ? `<div class="mg-btn-wrap green"><button class="mg-btn" onclick="MG.press(this,MG.examCheck)">Comprobar</button></div>`
        : `<div class="mg-btn-wrap disabled"><button class="mg-btn" disabled>Comprobar</button></div>`;

    examModal.innerHTML = `
      <div class="exam-modal-content mg-fade ${E.result === "no" ? "mg-shake" : ""}">
        <div class="exam-modal-header">
          <button class="mg-close" onclick="MG.closeExam()">✕</button>
          <div class="mg-progress"><div class="mg-progress-fill" style="width:${(E.index / EXAM_SIZE) * 100}%"></div></div>
          <span class="exam-counter">${E.index + 1}/${EXAM_SIZE}</span>
        </div>
        <div class="mg-content">
          <span class="mg-tag">${c.tag ?? ""}</span>
          <p class="mg-prompt">${c.prompt}</p>
          ${mid}${hint}
        </div>
        <div class="mg-footer">${footer}</div>
      </div>`;
    bindDrag();
  }

  function render() {
    if (!isUnlocked) { renderLocked(); return; }
    if (S.phase === "home") renderHome();
    else renderPlayer();
  }

  // ======= MG: API pública =======
  const MG = {
    // -- Mapa --
    home() {
      Object.assign(S, { phase: "home", step: 0, selected: [], chosen: null, placed: {}, result: null, showHint: false });
      render();
    },
    node(li) { if (levelState(li) !== "locked") MG.startLevel(li); },
    startLevel(l) {
      S.level = l;
      Object.assign(S, { phase: "play", step: 0, selected: [], chosen: null, placed: {}, result: null, showHint: false, streak: 0 });
      render();
    },

    // -- Player --
    async next() {
      if (S.step + 1 >= levelTotal()) {
        S.completed[S.level] = true;
        S.phase = "leveldone";
        await saveProgress();
      } else {
        S.step++;
      }
      Object.assign(S, { selected: [], chosen: null, placed: {}, result: null, showHint: false });
      render();
    },
    retry()       { S.result = null; S.selected = []; S.chosen = null; S.placed = {}; render(); },
    pick(i)       { if (S.result === "ok") return; S.chosen = i; S.result = null; render(); },
    put(id, l)    { if (S.result === "ok") return; S.selected.push({ id, label: l }); render(); },
    unpick(id)    { if (S.result === "ok") return; S.selected = S.selected.filter(s => s.id !== id); render(); },
    drop(l, zone) { if (S.result === "ok") return; for (const k in S.placed) { if (S.placed[k] === l) delete S.placed[k]; } S.placed[zone] = l; S.result = null; render(); },
    takeOut(zone) { if (S.result === "ok") return; delete S.placed[zone]; render(); },
    check() {
      const c = curChallenges()[S.step - curTheory().length];
      const ok = evaluate(c, S);
      S.result = ok ? "ok" : "no";
      if (ok) { S.xp += S.showHint ? 5 : 10; S.streak++; render(); confetti(); }
      else    { S.showHint = true; S.streak = 0; render(); }
    },

    // -- Examen --
    openExam() {
      if (!prereqWorldData) return;
      E.phase = "intro";
      renderExam();
    },
    closeExam() {
      examModal.classList.add("hidden");
      examModal.innerHTML = "";
      render();
    },
    startExam() {
      E.questions = sampleExamQuestions();
      E.index = 0; E.score = 0; E.phase = "play";
      Object.assign(E, { selected: [], chosen: null, placed: {}, result: null, showHint: false });
      renderExam();
    },
    examNext() {
      E.index++;
      Object.assign(E, { selected: [], chosen: null, placed: {}, result: null, showHint: false });
      if (E.index >= E.questions.length) {
        E.phase = "done";
        E.attempts++;
        const passed = E.score >= PASS_THRESHOLD;
        E.passed = passed;
        pendingExamSave = saveJumpExam(passed);
      }
      renderExam();
    },
    examPick(i)       { if (E.result === "ok") return; E.chosen = i; E.result = null; renderExam(); },
    examPut(id, l)    { if (E.result === "ok") return; E.selected.push({ id, label: l }); renderExam(); },
    examUnpick(id)    { if (E.result === "ok") return; E.selected = E.selected.filter(s => s.id !== id); renderExam(); },
    examDrop(l, zone) { if (E.result === "ok") return; for (const k in E.placed) { if (E.placed[k] === l) delete E.placed[k]; } E.placed[zone] = l; E.result = null; renderExam(); },
    examTakeOut(zone) { if (E.result === "ok") return; delete E.placed[zone]; renderExam(); },
    examCheck() {
      const c = E.questions[E.index];
      const ok = evaluate(c, E);
      E.result = ok ? "ok" : "no";
      if (ok) { E.score++; confetti(); }
      else    { E.showHint = true; }
      renderExam();
    },
    async examAccept() {
      if (pendingExamSave) await pendingExamSave.catch(console.warn);
      window.location.reload();
    },

    // -- Utilidades --
    press(btn, fn) {
      const w = btn.parentElement;
      w.classList.add("clicked");
      setTimeout(() => { w.classList.remove("clicked"); fn && fn(); }, 130);
    },
    toast(msg) {
      const t = document.createElement("div");
      t.textContent = msg;
      t.style.cssText = "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgb(var(--eel));color:#fff;font-family:'din-round-bold';font-weight:800;font-size:13px;padding:12px 18px;border-radius:14px;z-index:99;box-shadow:0 6px 18px rgba(0,0,0,.25)";
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 1600);
    },
    signOut() { if (onSignOut) onSignOut(); },
  };

  window.MG = MG;
  render();
}
