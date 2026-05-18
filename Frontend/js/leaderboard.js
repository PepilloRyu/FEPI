import arrayForProfiles from './leaderBfetch.js';

const FALLBACK_AVATAR = '../assets/svg/profile-image-temp.svg';

const safeUserData = () => {
  try {
    return JSON.parse(sessionStorage.getItem('user-info')) || JSON.parse(localStorage.getItem('mathgo_user')) || {};
  } catch (error) {
    return {};
  }
};

const getDisplayName = (entry = {}) => {
  return entry.name || entry.displayName || entry.username || (entry.email ? entry.email.split('@')[0] : '') || 'Usuario MathGo';
};

const getXp = (entry = {}) => {
  return Number(entry.xp ?? entry.totalXp ?? entry.experience ?? 0) || 0;
};

const getAvatar = (entry = {}) => {
  return entry.profileImage || entry.photoURL || FALLBACK_AVATAR;
};

const setTextIfExists = (selector, value) => {
  document.querySelectorAll(selector).forEach((item) => {
    item.textContent = value;
  });
};

const setSrcIfExists = (selector, value) => {
  document.querySelectorAll(selector).forEach((item) => {
    item.src = value;
  });
};

const getLanguageFlagPath = (languageCode) => {
  const code = languageCode || 'transparent';
  return `../assets/svg/country-flags/${code}-flag.svg`;
};

function placeUserStatistics() {
  const userData = safeUserData();
  setSrcIfExists('#profile-image, #profile-image-bottom, #profilePicture', getAvatar(userData));
  const flag = document.querySelector('.country-flag');
  if (flag) flag.src = getLanguageFlagPath(userData.learnLang);
  setTextIfExists('.fire-text', getXp(userData));
  setTextIfExists('.heart-text', userData.hearts ?? 5);
  setTextIfExists('.gem-text', userData.gems ?? 0);
}

function buildFallbackProfiles() {
  const userData = safeUserData();
  return [
    { name: getDisplayName(userData), xp: getXp(userData) || 120, profileImage: getAvatar(userData), userId: userData.userId || userData.uid || 'current' },
    { name: 'Ana', xp: 980, profileImage: FALLBACK_AVATAR, userId: 'demo-1' },
    { name: 'Luis', xp: 760, profileImage: FALLBACK_AVATAR, userId: 'demo-2' },
    { name: 'Marta', xp: 610, profileImage: FALLBACK_AVATAR, userId: 'demo-3' }
  ];
}

function renderLeaderboard(profiles) {
  const leaderboardList = document.getElementById('centre-container-secdiv');
  if (!leaderboardList) return;
  leaderboardList.innerHTML = '';

  const cleanProfiles = (profiles && profiles.length ? profiles : buildFallbackProfiles())
    .filter(Boolean)
    .map((entry) => ({ ...entry, xp: getXp(entry) }))
    .sort((a, b) => getXp(b) - getXp(a));

  const userData = safeUserData();
  const currentUserId = userData.userId || userData.uid;

  cleanProfiles.forEach((entry, index) => {
    const listItem = document.createElement('a');
    listItem.classList.add('eachprofile');
    listItem.href = '#';
    listItem.setAttribute('id', `eachprofile_${index + 1}`);

    const profindex = document.createElement('div');
    if (index < 3) {
      profindex.classList.add('indImage');
      const medal = document.createElement('span');
      medal.textContent = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
      medal.style.fontSize = '30px';
      profindex.appendChild(medal);
    } else {
      profindex.classList.add('profindex');
      profindex.textContent = `${index + 1}`;
    }

    const pic = document.createElement('div');
    pic.classList.add('divforimg');
    const profpic = document.createElement('img');
    profpic.classList.add('image');
    profpic.src = getAvatar(entry);
    profpic.alt = getDisplayName(entry);
    profpic.onerror = () => { profpic.src = FALLBACK_AVATAR; };
    pic.appendChild(profpic);

    const namediv = document.createElement('div');
    namediv.classList.add('divforname');
    const namespan = document.createElement('span');
    namespan.classList.add('spanforname');
    namespan.textContent = getDisplayName(entry);
    namediv.appendChild(namespan);

    const xpSpan = document.createElement('span');
    xpSpan.classList.add('spanforxp');
    xpSpan.textContent = `${getXp(entry)} XP`;

    listItem.appendChild(profindex);
    listItem.appendChild(pic);
    listItem.appendChild(namediv);
    listItem.appendChild(xpSpan);

    if (currentUserId && currentUserId === (entry.userId || entry.uid)) {
      listItem.style.borderColor = '#84d8ff';
      listItem.style.backgroundColor = '#ddf4ff';
    }

    leaderboardList.appendChild(listItem);
  });
}

placeUserStatistics();
renderLeaderboard(arrayForProfiles);
