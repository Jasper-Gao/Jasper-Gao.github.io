/* ==================================================================
   Post manifest
   ------------------------------------------------------------------
   Static sites can't list a folder's contents from client-side JS,
   so new posts must be added to this array by filename. Order here
   controls fallback order before sorting by date.
   ================================================================== */
const POST_FILES = [
  'posts/demo.md',
];

/* Allowed sidebar tags, in display order */
const TAGS = ['All', 'Math & CS', 'Readings', 'Table Tennis'];

let POSTS = [];        // parsed post objects: { title, date, tag, summary, body, file }
let activeTag = 'All';

/* ------------------------------------------------------------------
   Front matter parsing
   ------------------------------------------------------------------
   Splits a raw markdown file into { meta, content } using the
   leading "---\n...\n---" YAML block.
   ------------------------------------------------------------------ */
function splitFrontMatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) {
    return { meta: {}, content: raw };
  }
  const [, yamlBlock, content] = match;
  let meta = {};
  try {
    meta = jsyaml.load(yamlBlock) || {};
  } catch (err) {
    console.error('Front matter parse error:', err);
  }
  return { meta, content };
}

/* ------------------------------------------------------------------
   Load + parse all posts in the manifest
   ------------------------------------------------------------------ */
async function loadPosts() {
  const statusEl = document.getElementById('list-status');
  const results = await Promise.allSettled(
    POST_FILES.map(async (file) => {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Could not load ${file} (${res.status})`);
      const raw = await res.text();
      const { meta, content } = splitFrontMatter(raw);
      return {
        file,
        title: meta.title || file,
        date: meta.date || '',
        tag: meta.tag || 'Math & CS',
        summary: meta.summary || '',
        body: content.trim(),
      };
    })
  );

  const loaded = [];
  const failed = [];
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      loaded.push(r.value);
    } else {
      failed.push(POST_FILES[i]);
      console.error(r.reason);
    }
  });

  // Newest first
  loaded.sort((a, b) => new Date(b.date) - new Date(a.date));
  POSTS = loaded;

  if (failed.length && !loaded.length) {
    statusEl.textContent =
      'Could not load posts. If you\u2019re viewing this file directly (file://), ' +
      'serve the site over a local server so fetch() can read the posts/ folder.';
  } else {
    statusEl.textContent = `${loaded.length} post${loaded.length === 1 ? '' : 's'}`;
  }

  renderList();
}

/* ------------------------------------------------------------------
   List view rendering
   ------------------------------------------------------------------ */
function renderList() {
  const listEl = document.getElementById('post-list');
  const emptyEl = document.getElementById('empty-state');

  const visible = activeTag === 'All'
    ? POSTS
    : POSTS.filter((p) => p.tag === activeTag);

  listEl.innerHTML = '';

  if (!visible.length) {
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');

  visible.forEach((post) => {
    const card = document.createElement('article');
    card.className = 'post-card pb-10 border-b border-rule last:border-b-0 last:pb-0';
    card.innerHTML = `
      <p class="text-[12px] uppercase tracking-[0.14em] text-ink/40 mb-3">${escapeHtml(post.tag)}</p>
      <h2 class="mb-2">
        <button type="button" class="post-title-btn font-serif text-[19px] leading-snug text-left hover:text-ink/70 transition-colors" data-file="${escapeHtml(post.file)}">
          ${escapeHtml(post.title)}
        </button>
      </h2>
      <p class="text-[13px] text-ink/45 mb-3">${formatDate(post.date)}</p>
      <p class="text-[14.5px] text-ink/70 leading-relaxed">${escapeHtml(post.summary)}</p>
    `;
    listEl.appendChild(card);
  });

  listEl.querySelectorAll('.post-title-btn').forEach((btn) => {
    btn.addEventListener('click', () => showDetail(btn.dataset.file));
  });
}

/* ------------------------------------------------------------------
   Detail view rendering
   ------------------------------------------------------------------ */
function showDetail(file) {
  const post = POSTS.find((p) => p.file === file);
  if (!post) return;

  document.getElementById('detail-tag').textContent = post.tag;
  document.getElementById('detail-title').textContent = post.title;
  document.getElementById('detail-date').textContent = formatDate(post.date);
  document.getElementById('detail-body').innerHTML = marked.parse(post.body);

  document.getElementById('list-view').classList.add('hidden');
  document.getElementById('detail-view').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

  renderMath();
  highlightCode();

  history.pushState({ view: 'detail', file }, '', '#' + encodeURIComponent(file));
}

function showList() {
  document.getElementById('detail-view').classList.add('hidden');
  document.getElementById('list-view').classList.remove('hidden');
  history.pushState({ view: 'list' }, '', location.pathname);
}

/* ------------------------------------------------------------------
   Tag filter interactions
   ------------------------------------------------------------------ */
function setActiveTag(tag) {
  activeTag = tag;
  document.querySelectorAll('.tag-link').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.tag === tag);
  });
  renderList();
}

/* ------------------------------------------------------------------
   KaTeX / highlight.js triggers (retry until CDNs are ready)
   ------------------------------------------------------------------ */
function renderMath() {
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(document.getElementById('detail-body'), {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true },
      ],
      throwOnError: false,
    });
  } else {
    setTimeout(renderMath, 50);
  }
}

function highlightCode() {
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('#detail-body pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  } else {
    setTimeout(highlightCode, 50);
  }
}

/* ------------------------------------------------------------------
   Utilities
   ------------------------------------------------------------------ */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ------------------------------------------------------------------
   Init
   ------------------------------------------------------------------ */
function initReady(fn) {
  if (typeof marked !== 'undefined' && typeof jsyaml !== 'undefined') {
    fn();
  } else {
    setTimeout(() => initReady(fn), 50);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tag-link').forEach((btn) => {
    btn.addEventListener('click', () => setActiveTag(btn.dataset.tag));
  });

  document.getElementById('back-to-list').addEventListener('click', showList);
  document.getElementById('back-to-list-bottom').addEventListener('click', showList);

  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.view === 'detail') {
      showDetail(e.state.file);
    } else {
      showList();
    }
  });

  initReady(async () => {
    await loadPosts();
    // Deep-link support: #posts/demo.md opens directly to that post
    if (location.hash) {
      const file = decodeURIComponent(location.hash.slice(1));
      if (POSTS.some((p) => p.file === file)) showDetail(file);
    }
  });
});
