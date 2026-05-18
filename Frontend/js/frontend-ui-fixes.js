(function () {
  const fallbackAvatar = '../assets/svg/profile-image-temp.svg';

  function cleanTextNodes(root) {
    const walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT);
    const replacements = [
      [/^undefined$/i, '0'],
      [/\bundefined\b/gi, ''],
      [/^Unknown Date$/i, 'Recién llegado']
    ];
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      let value = node.nodeValue;
      replacements.forEach(([pattern, replacement]) => { value = value.replace(pattern, replacement); });
      node.nodeValue = value.replace(/\s{2,}/g, ' ').trimStart();
    });
  }

  function fixBrokenImages() {
    document.querySelectorAll('img').forEach((img) => {
      img.addEventListener('error', () => {
        if (!img.dataset.fallbackApplied && /profile|avatar|temp/i.test(img.id + ' ' + img.className + ' ' + img.alt)) {
          img.dataset.fallbackApplied = '1';
          img.src = fallbackAvatar;
        }
      });
    });
  }

  function markActiveNav() {
    const current = (location.pathname.split('/').pop() || 'learn.html').toLowerCase();
    document.querySelectorAll('.mockup-nav a').forEach((link) => {
      const href = (link.getAttribute('href') || '').split('/').pop().toLowerCase();
      const isActive = href === current;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    markActiveNav();
    fixBrokenImages();
    cleanTextNodes(document.body);
    setTimeout(() => cleanTextNodes(document.body), 900);
  });
})();
