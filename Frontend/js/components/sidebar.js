/**
 * MathGo Sidebar Component v2.4
 * - Tienda visible para todos los usuarios
 * - Iconos FontAwesome 6
 * - Enlace Admin visible solo para usuarios con role: "admin"
 * - Sistema de notificaciones en tiempo real para estudiantes
 */

import { logout, getInitials } from '../services/auth.js';
import { getProfile } from '../services/api.js';
import { auth, db } from '../firebaseConfig.js';
import {
  doc, getDoc,
  collection, getDocs, query, where,
  updateDoc, arrayUnion,
} from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js';
import { getTitleById } from '../title-catalog.js';

const NAV_ITEMS = [
  { id: 'learn',       icon: 'fa-solid fa-graduation-cap',  label: 'Aprender',      href: 'learn.html' },
  { id: 'assignments', icon: 'fa-solid fa-clipboard-list',  label: 'Asignaciones',  href: 'assignments.html' },
  { id: 'leaderboard', icon: 'fa-solid fa-trophy',          label: 'Clasificación', href: 'leaderboard.html' },
  { id: 'amigos',      icon: 'fa-solid fa-user-group',      label: 'Amigos',        href: 'amigos.html' },
  { id: 'dashboard',   icon: 'fa-solid fa-chart-line',      label: 'Mi progreso',   href: 'dashboard.html' },
  { id: 'tienda',      icon: 'fa-solid fa-store',           label: 'Tienda',        href: 'tienda.html' },
  { id: 'profile',     icon: 'fa-solid fa-user',            label: 'Perfil',        href: 'profile-page.html' },
  { id: 'faq',         icon: 'fa-solid fa-circle-question', label: 'Ayuda',         href: 'faq.html' },
];

// Ítems que aparecen en el bottom nav móvil (máx 6 para caber en 375px)
const BOTTOM_NAV_IDS = new Set(['learn', 'leaderboard', 'amigos', 'dashboard', 'tienda', 'profile']);

const ADMIN_ITEM   = { id: 'admin',   icon: 'fa-solid fa-shield-halved',    label: 'Admin',    href: 'admin.html' };
const TEACHER_ITEM = { id: 'teacher', icon: 'fa-solid fa-chalkboard-user',  label: 'Profesor', href: 'teacher.html' };

// ── Notificaciones ────────────────────────────────────────────────────────────

const NOTIF_LS_KEY = 'mg_notif_seen';

const escHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function getSeenState() {
  try { return JSON.parse(localStorage.getItem(NOTIF_LS_KEY) || '{}'); }
  catch { return {}; }
}

function saveSeenState(state) {
  try { localStorage.setItem(NOTIF_LS_KEY, JSON.stringify(state)); }
  catch {}
}

function injectNotifStyles() {
  if (document.getElementById('mg-notif-styles')) return;
  const style = document.createElement('style');
  style.id = 'mg-notif-styles';
  style.textContent = `
    .mg-notif-btn {
      display: flex; align-items: center; gap: 10px;
      width: 100%; padding: 8px 10px;
      border: 1px solid transparent; border-radius: 10px;
      background: none; color: var(--mg-muted);
      font-size: 14px; font-weight: 700; cursor: pointer;
      font-family: var(--mg-font); text-align: left;
      transition: all 0.15s;
    }
    .mg-notif-btn:hover { background: var(--mg-surface-2); color: var(--mg-text); border-color: var(--mg-border); }
    .mg-notif-btn-icon {
      width: 32px; height: 32px; flex-shrink: 0;
      border-radius: 10px; background: rgba(90,18,54,0.08);
      color: var(--mg-primary); display: flex;
      align-items: center; justify-content: center;
      font-size: 14px; position: relative;
    }
    .mg-notif-badge {
      position: absolute; top: -5px; right: -5px;
      min-width: 18px; height: 18px; padding: 0 4px;
      background: #ef4444; color: #fff;
      font-size: 10px; font-weight: 800; border-radius: 9px;
      display: flex; align-items: center; justify-content: center;
      font-family: var(--mg-font); box-sizing: border-box;
      border: 2px solid var(--mg-surface);
    }
    .mg-notif-panel {
      position: fixed; z-index: 500;
      width: 340px; max-height: 480px;
      background: var(--mg-surface);
      border: 1px solid var(--mg-border); border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.14);
      display: none; flex-direction: column; overflow: hidden;
      animation: mgFadeIn 150ms ease both;
    }
    .mg-notif-panel.open { display: flex; }
    .mg-notif-panel-hd {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px 10px; border-bottom: 1px solid var(--mg-border);
      flex-shrink: 0;
    }
    .mg-notif-panel-hd h3 { margin: 0; font-size: 15px; font-weight: 800; color: var(--mg-text); }
    .mg-notif-mark-all {
      padding: 5px 10px; border: 1px solid var(--mg-border); border-radius: 6px;
      background: none; color: var(--mg-muted);
      font-size: 12px; font-weight: 700; cursor: pointer;
      font-family: var(--mg-font); white-space: nowrap; transition: all 0.15s;
    }
    .mg-notif-mark-all:hover { border-color: var(--mg-primary); color: var(--mg-primary); }
    .mg-notif-list { overflow-y: auto; flex: 1; }
    .mg-notif-item {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 12px 16px; border-bottom: 1px solid var(--mg-border);
      text-decoration: none; color: inherit; transition: background 0.1s;
    }
    .mg-notif-item:last-child { border-bottom: none; }
    .mg-notif-item:hover { background: var(--mg-surface-2); }
    .mg-notif-item.is-new { background: rgba(90,18,54,0.04); }
    .mg-notif-item.is-new:hover { background: rgba(90,18,54,0.08); }
    .mg-notif-item-icon {
      width: 36px; height: 36px; flex-shrink: 0; border-radius: 10px;
      background: rgba(90,18,54,0.1); color: var(--mg-primary);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; margin-top: 1px;
    }
    .mg-notif-item-body { flex: 1; display: flex; align-items: flex-start; gap: 8px; min-width: 0; }
    .mg-notif-item-text { flex: 1; font-size: 13px; line-height: 1.45; color: var(--mg-text-2); }
    .mg-notif-item-dot {
      width: 8px; height: 8px; border-radius: 50%; background: #ef4444;
      flex-shrink: 0; margin-top: 5px;
    }
    .mg-notif-empty {
      padding: 32px 16px; text-align: center; color: var(--mg-muted); font-size: 14px;
    }
    .mg-notif-empty i { font-size: 32px; display: block; margin-bottom: 10px; opacity: 0.4; }
    .mg-notif-actions { display: flex; gap: 8px; margin-top: 8px; }
    .mg-notif-action-btn {
      padding: 5px 12px; border: none; border-radius: 7px;
      font-size: 12px; font-weight: 700; cursor: pointer;
      font-family: var(--mg-font); transition: opacity .15s; line-height: 1.4;
    }
    .mg-notif-action-btn:hover { opacity: .85; }
    .mg-notif-action-btn:disabled { opacity: .5; cursor: not-allowed; }
    .mg-notif-action-accept { background: var(--mg-primary); color: #fff; }
    .mg-notif-action-reject {
      background: rgba(239,68,68,.12); color: var(--mg-error, #ef4444);
      border: 1px solid rgba(239,68,68,.3);
    }
  `;
  document.head.appendChild(style);
}

let _notifPanel   = null;
let _panelOpen    = false;
let _notifData    = [];
let _userRole     = 'student';

function positionPanel() {
  const btn = document.getElementById('mg-notif-btn');
  if (!btn || !_notifPanel) return;
  const rect        = btn.getBoundingClientRect();
  const panelH      = Math.min(480, window.innerHeight - 40);
  const topIdeal    = rect.top;
  const topClamped  = Math.min(topIdeal, window.innerHeight - panelH - 20);
  _notifPanel.style.top       = `${Math.max(20, topClamped)}px`;
  _notifPanel.style.left      = `${rect.right + 10}px`;
  _notifPanel.style.maxHeight = `${panelH}px`;
}

function setPanel(open) {
  _panelOpen = open;
  if (open) {
    _notifPanel.classList.add('open');
    positionPanel();
  } else {
    _notifPanel.classList.remove('open');
  }
  document.getElementById('mg-notif-btn')?.setAttribute('aria-expanded', open);
}

function renderNotifList(notifications) {
  const listEl = _notifPanel?.querySelector('.mg-notif-list');
  if (!listEl) return;

  if (!notifications.length) {
    listEl.innerHTML = `
      <div class="mg-notif-empty">
        <i class="fa-solid fa-bell-slash"></i>
        No tienes notificaciones nuevas
      </div>`;
    return;
  }

  listEl.innerHTML = notifications.map(n => {
    if (n.actions) {
      const actionsHtml = n.actions.map((a, i) =>
        `<button class="mg-notif-action-btn mg-notif-action-${a.style}" data-notif-id="${n.id}" data-action-idx="${i}">${a.label}</button>`
      ).join('');
      return `
        <div class="mg-notif-item${n.isNew ? ' is-new' : ''}" data-notif-type="${n.type}" data-notif-id="${n.id}">
          <div class="mg-notif-item-icon"><i class="fa-solid ${n.icon}"></i></div>
          <div class="mg-notif-item-body" style="flex-direction:column;align-items:flex-start;gap:0;">
            <div style="display:flex;align-items:flex-start;gap:8px;width:100%;">
              <div class="mg-notif-item-text">${n.text}</div>
              ${n.isNew ? '<div class="mg-notif-item-dot"></div>' : ''}
            </div>
            <div class="mg-notif-actions">${actionsHtml}</div>
          </div>
        </div>`;
    }
    return `
      <a class="mg-notif-item${n.isNew ? ' is-new' : ''}" href="${n.href}" data-notif-type="${n.type}" data-notif-id="${n.id}">
        <div class="mg-notif-item-icon"><i class="fa-solid ${n.icon}"></i></div>
        <div class="mg-notif-item-body">
          <div class="mg-notif-item-text">${n.text}</div>
          ${n.isNew ? '<div class="mg-notif-item-dot"></div>' : ''}
        </div>
      </a>`;
  }).join('');

  // Wire up inline action buttons
  listEl.querySelectorAll('.mg-notif-action-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const notifId   = btn.dataset.notifId;
      const actionIdx = parseInt(btn.dataset.actionIdx);
      const notif     = _notifData.find(n => n.id === notifId);
      if (!notif?.actions?.[actionIdx]) return;

      listEl.querySelectorAll(`.mg-notif-action-btn[data-notif-id="${notifId}"]`)
        .forEach(b => { b.disabled = true; });

      try {
        await notif.actions[actionIdx].fn();
        _notifData = _notifData.filter(n => n.id !== notifId);
        updateBadge(_notifData.filter(n => n.isNew).length);
        renderNotifList(_notifData);
      } catch (err) {
        console.error('[sidebar] Invite action failed:', err);
        listEl.querySelectorAll(`.mg-notif-action-btn[data-notif-id="${notifId}"]`)
          .forEach(b => { b.disabled = false; });
      }
    });
  });
}

function updateBadge(count) {
  const badgeEl = document.getElementById('mg-notif-badge');
  if (!badgeEl) return;
  if (count > 0) {
    badgeEl.textContent    = count > 99 ? '99+' : String(count);
    badgeEl.style.display  = 'flex';
  } else {
    badgeEl.style.display  = 'none';
  }
}

async function loadNotifications(uid, basePath, role = 'student') {
  _userRole = role;
  injectNotifStyles();

  // Reveal the bell button (hidden by default until role confirmed)
  const wrapEl = document.getElementById('mg-notif-wrap');
  if (wrapEl) wrapEl.style.display = '';

  // Create panel and mount to body
  if (!_notifPanel) {
    _notifPanel = document.createElement('div');
    _notifPanel.className = 'mg-notif-panel';
    _notifPanel.setAttribute('role', 'dialog');
    _notifPanel.setAttribute('aria-label', 'Notificaciones');
    _notifPanel.innerHTML = `
      <div class="mg-notif-panel-hd">
        <h3><i class="fa-solid fa-bell" style="margin-right:6px;font-size:13px;"></i>Notificaciones</h3>
        <button class="mg-notif-mark-all" id="mg-notif-mark-all">Marcar como leído</button>
      </div>
      <div class="mg-notif-list">
        <div class="mg-notif-empty">
          <i class="fa-solid fa-spinner fa-spin"></i>
          Cargando...
        </div>
      </div>`;
    document.body.appendChild(_notifPanel);

    // Toggle panel on bell click
    document.getElementById('mg-notif-btn')?.addEventListener('click', e => {
      e.stopPropagation();
      setPanel(!_panelOpen);
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (_panelOpen && _notifPanel && !_notifPanel.contains(e.target)) {
        setPanel(false);
      }
    });

    // Mark all as read
    document.getElementById('mg-notif-mark-all')?.addEventListener('click', async e => {
      e.stopPropagation();
      const responseNotifs = _notifData.filter(n => n.type === 'classroomInviteResponse');
      if (responseNotifs.length) {
        await Promise.all(
          responseNotifs.map(n =>
            updateDoc(doc(db, 'classroomInvites', n.id), { teacherSeen: true })
              .catch(err => console.error('[sidebar] Error marking invite seen:', n.id, err.code, err))
          )
        );
      }
      saveSeenState({
        friendReqIds:  _notifData.filter(n => n.type === 'friendRequest').map(n => n.id),
        classroomIds:  _notifData.filter(n => n.type === 'classroom').map(n => n.id),
        assignmentIds: _notifData.filter(n => n.type === 'assignment').map(n => n.id),
      });
      _notifData = _notifData.map(n => ({ ...n, isNew: false }));
      updateBadge(0);
      renderNotifList(_notifData);
    });

    // Mark individual notification as read on click
    const keyMap = { friendRequest: 'friendReqIds', classroom: 'classroomIds', assignment: 'assignmentIds' };
    _notifPanel.addEventListener('click', e => {
      if (e.target.closest('.mg-notif-action-btn')) return;
      const item = e.target.closest('.mg-notif-item');
      if (!item) return;
      const type = item.dataset.notifType;
      const id   = item.dataset.notifId;
      if (!type || !id) return;

      if (type === 'classroomInviteResponse') {
        updateDoc(doc(db, 'classroomInvites', id), { teacherSeen: true })
          .catch(err => console.error('[sidebar] Error marking response as seen:', id, err.code, err));
        const notif = _notifData.find(n => n.id === id && n.type === type);
        if (notif?.isNew) {
          notif.isNew = false;
          updateBadge(_notifData.filter(n => n.isNew).length);
          item.classList.remove('is-new');
          item.querySelector('.mg-notif-item-dot')?.remove();
        }
        return;
      }

      const key = keyMap[type];
      if (!key) return;
      const state = getSeenState();
      if (!state[key]) state[key] = [];
      if (!state[key].includes(id)) {
        state[key].push(id);
        saveSeenState(state);
      }
      const notif = _notifData.find(n => n.id === id && n.type === type);
      if (notif && notif.isNew) {
        notif.isNew = false;
        updateBadge(_notifData.filter(n => n.isNew).length);
        item.classList.remove('is-new');
        item.querySelector('.mg-notif-item-dot')?.remove();
      }
    });
  }

  // ── Fetch data based on role ──────────────────────────────────────────────
  try {
    if (role === 'teacher') {
      const responseSnap = await getDocs(query(
        collection(db, 'classroomInvites'),
        where('teacherId',   '==', uid),
        where('status',      'in', ['accepted', 'rejected']),
        where('teacherSeen', '==', false),
      ));

      const notifications = [];
      responseSnap.forEach(d => {
        const data       = d.data();
        const isAccepted = data.status === 'accepted';
        notifications.push({
          type:  'classroomInviteResponse',
          id:    d.id,
          icon:  isAccepted ? 'fa-check' : 'fa-xmark',
          text:  isAccepted
            ? `<strong>${escHtml(data.studentName || 'Un alumno')}</strong> aceptó unirse a tu salón <strong>${escHtml(data.classroomName || 'sin nombre')}</strong>`
            : `<strong>${escHtml(data.studentName || 'Un alumno')}</strong> rechazó la invitación al salón <strong>${escHtml(data.classroomName || 'sin nombre')}</strong>`,
          href:  `${basePath}teacher.html`,
          isNew: true,
        });
      });

      _notifData = notifications;
      updateBadge(notifications.filter(n => n.isNew).length);
      renderNotifList(notifications);

    } else {
      const [progressSnap, friendReqSnap, classroomsSnap, inviteSnap] = await Promise.all([
        getDoc(doc(db, 'mathgo_progress', uid)),
        getDocs(query(collection(db, 'friendRequests'), where('toUid', '==', uid))),
        getDocs(query(collection(db, 'classrooms'), where('studentIds', 'array-contains', uid))),
        getDocs(query(collection(db, 'classroomInvites'), where('studentId', '==', uid), where('status', '==', 'pending'))),
      ]);

      const progress = progressSnap.exists() ? progressSnap.data() : {};

      // Pending friend requests only
      const friendReqs = [];
      friendReqSnap.forEach(d => {
        const data = d.data();
        if (data.status === 'pending') friendReqs.push({ id: d.id, ...data });
      });

      const classrooms = [];
      classroomsSnap.forEach(d => classrooms.push({ id: d.id, ...d.data() }));

      // Assignments for all student classrooms in parallel
      const assignSnaps = classrooms.length
        ? await Promise.all(
            classrooms.map(c =>
              getDocs(query(collection(db, 'assignments'), where('classroomId', '==', c.id)))
            )
          )
        : [];

      const allAssignments = [];
      assignSnaps.forEach((snap, i) => {
        snap.forEach(d => allAssignments.push({ id: d.id, _classroomId: classrooms[i].id, ...d.data() }));
      });

      // Only non-completed assignments
      const pendingAssignments = allAssignments.filter(a => {
        const wp = progress?.worlds?.[String(a.worldId)] ?? {};
        return a.levelId == null
          ? wp.allComplete !== true
          : !(wp.levelsCompleted ?? []).includes(Number(a.levelId));
      });

      // ── Build notification list ───────────────────────────────────────────
      const seen            = getSeenState();
      const seenFriendReqs  = seen.friendReqIds  ?? [];
      const seenClassrooms  = seen.classroomIds  ?? [];
      const seenAssignments = seen.assignmentIds ?? [];

      const notifications = [];

      // Pending classroom invites for this student
      const pendingInvites = [];
      inviteSnap.forEach(d => pendingInvites.push({ id: d.id, ...d.data() }));
      pendingInvites.forEach(inv => {
        notifications.push({
          type:  'classroomInvite',
          id:    inv.id,
          icon:  'fa-chalkboard-user',
          text:  `<strong>Prof. ${escHtml(inv.teacherName || 'Desconocido')}</strong> te invita a unirte al salón <strong>${escHtml(inv.classroomName || 'sin nombre')}</strong>`,
          isNew: true,
          actions: [
            {
              label: '<i class="fa-solid fa-check"></i> Aceptar',
              style: 'accept',
              fn: async () => {
                await Promise.all([
                  updateDoc(doc(db, 'classroomInvites', inv.id), { status: 'accepted' }),
                  updateDoc(doc(db, 'classrooms', inv.classroomId), { studentIds: arrayUnion(uid) }),
                ]);
              },
            },
            {
              label: '<i class="fa-solid fa-xmark"></i> Rechazar',
              style: 'reject',
              fn: async () => {
                await updateDoc(doc(db, 'classroomInvites', inv.id), { status: 'rejected' });
              },
            },
          ],
        });
      });

      friendReqs.forEach(r => {
        notifications.push({
          type:  'friendRequest',
          id:    r.id,
          icon:  'fa-user-plus',
          text:  `<strong>${escHtml(r.fromName || 'Alguien')}</strong> te envió una solicitud de amistad`,
          href:  `${basePath}amigos.html`,
          isNew: !seenFriendReqs.includes(r.id),
        });
      });

      // Classrooms only shown once (disappear once seen)
      classrooms.forEach(c => {
        if (!seenClassrooms.includes(c.id)) {
          notifications.push({
            type:  'classroom',
            id:    c.id,
            icon:  'fa-chalkboard',
            text:  `Estás en el salón <strong>${escHtml(c.name || 'sin nombre')}</strong>`,
            href:  `${basePath}assignments.html`,
            isNew: true,
          });
        }
      });

      pendingAssignments.forEach(a => {
        notifications.push({
          type:  'assignment',
          id:    a.id,
          icon:  'fa-clipboard-list',
          text:  `Tienes una asignación pendiente: <strong>${escHtml(a.title || 'sin título')}</strong>`,
          href:  `${basePath}assignments.html`,
          isNew: !seenAssignments.includes(a.id),
        });
      });

      _notifData = notifications;
      updateBadge(notifications.filter(n => n.isNew).length);
      renderNotifList(notifications);
    }

  } catch (err) {
    console.error('[sidebar] Error al cargar notificaciones:', err);
    const listEl = _notifPanel?.querySelector('.mg-notif-list');
    if (listEl) {
      listEl.innerHTML = `
        <div class="mg-notif-empty">
          <i class="fa-solid fa-triangle-exclamation"></i>
          No se pudo cargar
        </div>`;
    }
  }
}

// ── Sidebar HTML builders ─────────────────────────────────────────────────────

function buildNavItem(item, activeId, basePath) {
  const isActive = item.id === activeId;
  return `
    <a href="${basePath}${item.href}"
       class="${isActive ? 'active' : ''}"
       ${isActive ? 'aria-current="page"' : ''}
       title="${item.label}">
      <span class="mg-nav-icon"><i class="${item.icon}"></i></span>
      ${item.label}
    </a>
  `;
}

function buildSidebar(activeId, basePath, userName, userXp, userStreak) {
  const navHTML  = NAV_ITEMS.map(i => buildNavItem(i, activeId, basePath)).join('');
  const initials = getInitials(userName);

  return `
    <a href="${basePath}learn.html" class="mg-brand" aria-label="Ir a Mundos">
      <div class="mg-brand-icon"><i class="fa-solid fa-square-root-variable"></i></div>
      <div class="mg-brand-name">Math<span>Go</span></div>
    </a>

    <nav class="mg-nav" aria-label="Navegacion principal">
      ${navHTML}
    </nav>

    <div class="mg-sidebar-footer">
      <div id="mg-notif-wrap" style="display:none; margin-bottom:8px;">
        <button class="mg-notif-btn" id="mg-notif-btn" aria-label="Notificaciones" aria-expanded="false">
          <div class="mg-notif-btn-icon">
            <i class="fa-solid fa-bell"></i>
            <span class="mg-notif-badge" id="mg-notif-badge" style="display:none;"></span>
          </div>
          Notificaciones
        </button>
      </div>

      <div class="mg-profile-card mg-mb-4" style="padding:12px;">
        <div class="mg-avatar" id="sb-avatar" style="width:38px;height:38px;font-size:14px;">
          ${initials}
        </div>
        <div class="mg-profile-card-info">
          <h3 id="sb-name" style="font-size:14px;">${userName || 'Cargando...'}</h3>
          <div id="sb-equipped-title" style="margin:2px 0;"></div>
          <span>
            <i class="fa-solid fa-bolt" style="color:var(--mg-xp);"></i>
            <strong id="sb-xp">${userXp ?? '–'}</strong> XP &nbsp;
            <i class="fa-solid fa-fire" style="color:var(--mg-streak);"></i>
            <strong id="sb-streak">${userStreak ?? '–'}</strong> &nbsp;
            <i class="fa-solid fa-heart" style="color:var(--mg-hearts);"></i>
            <strong id="sb-hearts">–</strong>
          </span>
        </div>
      </div>
      <button class="mg-logout-btn" id="mg-logout-btn" aria-label="Cerrar sesion">
        <i class="fa-solid fa-right-from-bracket"></i>
        Cerrar sesión
      </button>
    </div>
  `;
}

function buildBottomNav(activeId, basePath) {
  return NAV_ITEMS
    .filter(item => BOTTOM_NAV_IDS.has(item.id))
    .map(item => `
      <a href="${basePath}${item.href}"
         class="${item.id === activeId ? 'active' : ''}"
         ${item.id === activeId ? 'aria-current="page"' : ''}
         title="${item.label}">
        <i class="${item.icon}"></i>
        <span class="nav-label">${item.label}</span>
      </a>
    `).join('');
}

/**
 * Inicializa e inyecta el sidebar en la pagina actual.
 * @param {string} activeId - ID de la pagina activa
 */
export async function initSidebar(activeId = 'learn') {
  const isInHtml = window.location.pathname.includes('/html/');
  const basePath = isInHtml ? '' : 'html/';

  // Inyectar FontAwesome 6 CDN si no está ya cargado
  if (!document.querySelector('link[href*="fontawesome"]')) {
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css';
    faLink.crossOrigin = 'anonymous';
    document.head.appendChild(faLink);
  }

  // Crear sidebar
  const sidebarEl = document.createElement('aside');
  sidebarEl.className = 'mg-sidebar';
  sidebarEl.id = 'mg-sidebar';
  sidebarEl.innerHTML = buildSidebar(activeId, basePath, '', null, null);

  // Crear bottom nav móvil
  const bottomNavEl = document.createElement('nav');
  bottomNavEl.className = 'mg-bottom-nav';
  bottomNavEl.id = 'mg-bottom-nav';
  bottomNavEl.setAttribute('aria-label', 'Navegacion movil');
  bottomNavEl.innerHTML = buildBottomNav(activeId, basePath);

  // Inyectar en el layout
  const layout = document.querySelector('.mg-layout, .mg-layout-2col');
  if (layout) {
    layout.insertBefore(sidebarEl, layout.firstChild);
  } else {
    document.body.insertBefore(sidebarEl, document.body.firstChild);
  }
  document.body.appendChild(bottomNavEl);

  // Bind de logout
  document.getElementById('mg-logout-btn')?.addEventListener('click', () => {
    logout();
  });

  // Cargar perfil (backend) y rol (Firestore) en paralelo
  const currentUser = auth.currentUser;
  const [profileResult, roleResult] = await Promise.allSettled([
    getProfile(),
    currentUser ? getDoc(doc(db, 'users', currentUser.uid)) : Promise.resolve(null),
  ]);

  // Actualizar datos del perfil
  const profile = profileResult.status === 'fulfilled' ? profileResult.value?.data : null;
  if (profile) {
    const nameEl   = document.getElementById('sb-name');
    const xpEl     = document.getElementById('sb-xp');
    const streakEl = document.getElementById('sb-streak');
    const avatarEl = document.getElementById('sb-avatar');

    if (nameEl)   nameEl.textContent   = profile.name || profile.email || 'Usuario';
    if (xpEl)     xpEl.textContent     = profile.xpTotal ?? 0;
    if (streakEl) streakEl.textContent = profile.dailyStreak ?? 0;
    if (avatarEl) avatarEl.textContent = getInitials(profile.name || profile.email);
  }

  // Inyectar enlace Admin/Profesor según rol
  const roleSnap = roleResult.status === 'fulfilled' ? roleResult.value : null;
  const userRole = roleSnap?.exists?.() ? roleSnap.data().role : null;
  const isAdminUser   = userRole === 'admin';
  const isTeacherUser = userRole === 'teacher';
  const isStudentUser = userRole === 'student';

  // Mostrar título equipado bajo el nombre
  const equippedTitleId = roleSnap?.exists?.() ? (roleSnap.data().equippedTitle ?? null) : null;
  if (equippedTitleId) {
    const titleDef = getTitleById(equippedTitleId);
    const titleEl  = document.getElementById('sb-equipped-title');
    if (titleEl && titleDef) {
      titleEl.innerHTML = `<span class="mg-title-name mg-title-${titleDef.rank}" style="font-size:11px; padding:2px 8px;">${titleDef.name}</span>`;
    }
  }

  const heartsEl = document.getElementById('sb-hearts');
  if (heartsEl) heartsEl.textContent = isAdminUser ? '∞' : (profile?.hearts ?? 15);

  if (isAdminUser) {
    const isActive = activeId === ADMIN_ITEM.id;

    const nav = sidebarEl.querySelector('.mg-nav');
    if (nav) {
      const adminEl = document.createElement('a');
      adminEl.href = `${basePath}${ADMIN_ITEM.href}`;
      if (isActive) { adminEl.className = 'active'; adminEl.setAttribute('aria-current', 'page'); }
      adminEl.title = ADMIN_ITEM.label;
      adminEl.style.cssText = isActive ? '' : 'color:var(--mg-primary);';
      adminEl.innerHTML = `
        <span class="mg-nav-icon" style="background:rgba(90,18,54,0.1);color:var(--mg-primary);">
          <i class="${ADMIN_ITEM.icon}"></i>
        </span>${ADMIN_ITEM.label}`;
      nav.appendChild(adminEl);
    }

    const adminBottom = document.createElement('a');
    adminBottom.href = `${basePath}${ADMIN_ITEM.href}`;
    if (isActive) { adminBottom.className = 'active'; adminBottom.setAttribute('aria-current', 'page'); }
    adminBottom.title = ADMIN_ITEM.label;
    adminBottom.innerHTML = `<i class="${ADMIN_ITEM.icon}"></i><span class="nav-label">${ADMIN_ITEM.label}</span>`;
    bottomNavEl.appendChild(adminBottom);
  }

  if (isTeacherUser) {
    const isActive = activeId === TEACHER_ITEM.id;

    const nav = sidebarEl.querySelector('.mg-nav');
    if (nav) {
      const teacherEl = document.createElement('a');
      teacherEl.href = `${basePath}${TEACHER_ITEM.href}`;
      if (isActive) { teacherEl.className = 'active'; teacherEl.setAttribute('aria-current', 'page'); }
      teacherEl.title = TEACHER_ITEM.label;
      teacherEl.style.cssText = isActive ? '' : 'color:var(--mg-primary);';
      teacherEl.innerHTML = `
        <span class="mg-nav-icon" style="background:rgba(90,18,54,0.1);color:var(--mg-primary);">
          <i class="${TEACHER_ITEM.icon}"></i>
        </span>${TEACHER_ITEM.label}`;
      nav.appendChild(teacherEl);
    }

    const teacherBottom = document.createElement('a');
    teacherBottom.href = `${basePath}${TEACHER_ITEM.href}`;
    if (isActive) { teacherBottom.className = 'active'; teacherBottom.setAttribute('aria-current', 'page'); }
    teacherBottom.title = TEACHER_ITEM.label;
    teacherBottom.innerHTML = `<i class="${TEACHER_ITEM.icon}"></i><span class="nav-label">${TEACHER_ITEM.label}</span>`;
    bottomNavEl.appendChild(teacherBottom);
  }

  // Cargar notificaciones para estudiantes y profesores
  if ((isStudentUser || isTeacherUser) && currentUser) {
    loadNotifications(currentUser.uid, basePath, userRole).catch(err =>
      console.warn('[sidebar] loadNotifications falló silenciosamente:', err)
    );
  }
}
