document.addEventListener('DOMContentLoaded', () => {
  let userData = {};
  try {
    userData = JSON.parse(sessionStorage.getItem('user-info')) || JSON.parse(localStorage.getItem('mathgo_user')) || {};
  } catch (error) {
    userData = {};
  }

  const getLanguageFlagPath = (languageCode) => `../assets/svg/country-flags/${languageCode || 'transparent'}-flag.svg`;
  const setText = (selector, value) => document.querySelectorAll(selector).forEach((item) => { item.textContent = value; });

  const flag = document.querySelector('.country-flag');
  if (flag) flag.src = getLanguageFlagPath(userData.learnLang);
  setText('.fire-text', userData.xp ?? userData.totalXp ?? 0);
  setText('.heart-text', userData.hearts ?? 5);
  setText('.gem-text', userData.gems ?? 0);
});
