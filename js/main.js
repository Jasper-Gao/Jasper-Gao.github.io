document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------
     1. Smooth-scroll for in-page anchor links
        (CSS scroll-behavior handles most of it;
        this adds a graceful fallback + closes
        any mobile nav state if added later)
     ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', targetId);
    });
  });

  /* ------------------------------------------
     2. Active-section highlighting in sidebar
        via IntersectionObserver
     ------------------------------------------ */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('#side-nav .nav-link[href^="#"]');

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-15% 0px -70% 0px',
        threshold: 0,
      }
    );
    sections.forEach((section) => observer.observe(section));
  }

  /* ------------------------------------------
     3. KaTeX auto-render for $...$ and $$...$$
     ------------------------------------------ */
  function renderMath() {
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true },
        ],
        throwOnError: false,
      });
    } else {
      // KaTeX auto-render script loads with `defer`; retry shortly if not ready yet.
      setTimeout(renderMath, 50);
    }
  }
  renderMath();

  /* ------------------------------------------
     4. highlight.js code block initialization
     ------------------------------------------ */
  function initHighlight() {
    if (typeof hljs !== 'undefined') {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    } else {
      setTimeout(initHighlight, 50);
    }
  }
  initHighlight();

});
