/**
 * MathGo Sidebar Component v2.3
 * - Tienda visible para todos los usuarios
 * - Iconos FontAwesome 6
 * - Enlace Admin visible solo para usuarios con role: "admin"
 */

import { logout, getInitials } from '../services/auth.js';
import { getProfile } from '../services/api.js';
import { auth, db } from '../firebaseConfig.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js';

const NAV_ITEMS = [
  { id: 'learn',       icon: 'fa-solid fa-graduation-cap',  label: 'Aprender',      href: 'learn.html' },
  { id: 'assignments', icon: 'fa-solid fa-clipboard-list',  label: 'Asignaciones',  href: 'assignments.html' },
  { id: 'leaderboard', icon: 'fa-solid fa-trophy',          label: 'Clasificación', href: 'leaderboard.html' },
  { id: 'dashboard',   icon: 'fa-solid fa-chart-line',      label: 'Mi progreso',   href: 'dashboard.html' },
  { id: 'tienda',      icon: 'fa-solid fa-store',           label: 'Tienda',        href: 'tienda.html' },
  { id: 'profile',     icon: 'fa-solid fa-user',            label: 'Perfil',        href: 'profile-page.html' },
  { id: 'faq',         icon: 'fa-solid fa-circle-question', label: 'Ayuda',         href: 'faq.html' },
];

const ADMIN_ITEM   = { id: 'admin',   icon: 'fa-solid fa-shield-halved',    label: 'Admin',   href: 'admin.html' };
const TEACHER_ITEM = { id: 'teacher', icon: 'fa-solid fa-chalkboard-user', label: 'Profesor', href: 'teacher.html' };

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
  const navHTML = NAV_ITEMS.map(i => buildNavItem(i, activeId, basePath)).join('');
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
      <div class="mg-profile-card mg-mb-4" style="padding:12px;">
        <div class="mg-avatar" id="sb-avatar" style="width:38px;height:38px;font-size:14px;">
          ${initials}
        </div>
        <div class="mg-profile-card-info">
          <h3 id="sb-name" style="font-size:14px;">${userName || 'Cargando...'}</h3>
          <span><i class="fa-solid fa-bolt" style="color:var(--mg-xp);"></i> <strong id="sb-xp">${userXp ?? '–'}</strong> XP &nbsp;<i class="fa-solid fa-fire" style="color:var(--mg-streak);"></i> <strong id="sb-streak">${userStreak ?? '–'}</strong> &nbsp;<i class="fa-solid fa-heart" style="color:var(--mg-hearts);"></i> <strong id="sb-hearts">–</strong></span>
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
  return NAV_ITEMS.map(item => `
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

  const heartsEl = document.getElementById('sb-hearts');
  if (heartsEl) heartsEl.textContent = isAdminUser ? '∞' : (profile?.hearts ?? 15);

  if (isAdminUser) {
    const isActive = activeId === ADMIN_ITEM.id;

    // Enlace en sidebar desktop
    const nav = sidebarEl.querySelector('.mg-nav');
    if (nav) {
      const adminEl = document.createElement('a');
      adminEl.href = `${basePath}${ADMIN_ITEM.href}`;
      if (isActive) { adminEl.className = 'active'; adminEl.setAttribute('aria-current', 'page'); }
      adminEl.title = ADMIN_ITEM.label;
      adminEl.style.cssText = isActive ? '' : 'color:var(--mg-primary);';
      adminEl.innerHTML = `
        <span class="mg-nav-icon" style="background:rgba(79,70,229,0.1);color:var(--mg-primary);">
          <i class="${ADMIN_ITEM.icon}"></i>
        </span>${ADMIN_ITEM.label}`;
      nav.appendChild(adminEl);
    }

    // Enlace en bottom nav móvil
    const adminBottom = document.createElement('a');
    adminBottom.href = `${basePath}${ADMIN_ITEM.href}`;
    if (isActive) { adminBottom.className = 'active'; adminBottom.setAttribute('aria-current', 'page'); }
    adminBottom.title = ADMIN_ITEM.label;
    adminBottom.innerHTML = `<i class="${ADMIN_ITEM.icon}"></i><span class="nav-label">${ADMIN_ITEM.label}</span>`;
    bottomNavEl.appendChild(adminBottom);
  }

  if (isTeacherUser) {
    const isActive = activeId === TEACHER_ITEM.id;

    // Enlace en sidebar desktop
    const nav = sidebarEl.querySelector('.mg-nav');
    if (nav) {
      const teacherEl = document.createElement('a');
      teacherEl.href = `${basePath}${TEACHER_ITEM.href}`;
      if (isActive) { teacherEl.className = 'active'; teacherEl.setAttribute('aria-current', 'page'); }
      teacherEl.title = TEACHER_ITEM.label;
      teacherEl.style.cssText = isActive ? '' : 'color:var(--mg-primary);';
      teacherEl.innerHTML = `
        <span class="mg-nav-icon" style="background:rgba(79,70,229,0.1);color:var(--mg-primary);">
          <i class="${TEACHER_ITEM.icon}"></i>
        </span>${TEACHER_ITEM.label}`;
      nav.appendChild(teacherEl);
    }

    // Enlace en bottom nav móvil
    const teacherBottom = document.createElement('a');
    teacherBottom.href = `${basePath}${TEACHER_ITEM.href}`;
    if (isActive) { teacherBottom.className = 'active'; teacherBottom.setAttribute('aria-current', 'page'); }
    teacherBottom.title = TEACHER_ITEM.label;
    teacherBottom.innerHTML = `<i class="${TEACHER_ITEM.icon}"></i><span class="nav-label">${TEACHER_ITEM.label}</span>`;
    bottomNavEl.appendChild(teacherBottom);
  }
}
