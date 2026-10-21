/* ==================================================================
   Post manifest
   ------------------------------------------------------------------
   Static sites can't list a folder's contents from client-side JS,
   so new posts must be added to this array by filename. Order here
   controls fallback order before sorting by date.
   ================================================================== */
const POST_FILES = [
  'posts/combinatorial-analysis.md',
  'posts/axioms-of-probability.md',
  'posts/probability-on-a-finite-or-countable-space.md',
  'posts/conditional-probability-and-independence.md',
  'posts/random-variable-on-a-countable-space.md',
  'posts/random-variables.md',
  'posts/integration-with-respect-to-a-probability-measure.md',
  'posts/jointly-distributed-random-variables.md',
];

/* Allowed sidebar tags, in display order */
const TAGS = ['All', 'Math & CS', 'Readings', 'Table Tennis'];

/* ------------------------------------------------------------------
   Site root inference
   ------------------------------------------------------------------
   The blog may be served from a subdirectory (e.g. /repo/ on
   GitHub Pages). We can determine the correct prefix by looking at
   the location of this script (js/blog.js) and removing the /js.
   ------------------------------------------------------------------ */
function getScriptBase() {
  const script = document.currentScript || document.querySelector('script[src$="blog.js"]');
  if (!script || !script.src) return '';
  const dir = script.src.substring(0, script.src.lastIndexOf('/'));
  return dir.replace(/\/js$/, '');
}
const SITE_ROOT = getScriptBase();

function resolvePostUrl(file) {
  return file.startsWith('./') ? file : `./${file}`;
}

let POSTS = [];        // parsed post objects: { title, date, tag, summary, body, file }
let activeTag = 'All';
let mathMarkdown;

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
      const url = resolvePostUrl(file);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Could not load ${file} (${res.status}) from ${url}`);
      const raw = await res.text();
      const { meta, content } = splitFrontMatter(raw);
      return {
        file,
        title: meta.title || file,
        date: meta.date || '',
        tag: meta.tag || 'Math & CS',
        summary: meta.summary || '',
        compact: meta.compact === true,
        math: meta.math === true,
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

  if (failed.length) {
    if (location.protocol === 'file:') {
      statusEl.textContent = 'Could not load posts from local files. Serve this folder over HTTP.';
    } else {
      statusEl.textContent =
        `${loaded.length} post${loaded.length === 1 ? '' : 's'} loaded; ` +
        `${failed.length} failed (${failed.join(', ')}).`;
    }
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
  const bodyEl = document.getElementById('detail-body');
  bodyEl.classList.toggle('compact-notes', post.compact);
  bodyEl.innerHTML = (post.math ? mathMarkdown : marked).parse(post.body);

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
   Preserve TeX before Markdown consumes backslashes and underscores.
   Posts opt in with math: true; legacy posts keep their existing escaping.
   Tokenizers leave code spans and fenced code blocks to marked itself.
   KaTeX auto-render processes the escaped source after HTML is inserted.
   ------------------------------------------------------------------ */
function configureMarkdownMath() {
  mathMarkdown = new marked.Marked({
    extensions: [
      {
        name: 'mathBlock',
        level: 'block',
        start(src) { return src.search(/(?:^|\n) {0,3}(?:\$\$|\\\[)/); },
        tokenizer(src) {
          const match = /^ {0,3}\$\$([\s\S]+?)\$\$[ \t]*(?:\n|$)/.exec(src)
            || /^ {0,3}\\\[([\s\S]+?)\\\][ \t]*(?:\n|$)/.exec(src);
          if (match) return { type: 'mathBlock', raw: match[0], text: match[1] };
        },
        renderer(token) {
          return `<div class="math-block">$$${escapeHtml(token.text)}$$</div>\n`;
        },
      },
      {
        name: 'mathInline',
        level: 'inline',
        start(src) { return src.search(/\$|\\\(/); },
        tokenizer(src) {
          const display = /^\$\$([\s\S]+?)\$\$/.exec(src);
          const inline = /^\$(?!\$)((?:\\[\s\S]|[^\\$\n])+?)\$(?!\$)/.exec(src)
            || /^\\\(([\s\S]+?)\\\)/.exec(src);
          const match = display || inline;
          if (match) return {
            type: 'mathInline', raw: match[0], text: match[1], display: Boolean(display),
          };
        },
        renderer(token) {
          const delimiter = token.display ? '$$' : '$';
          return `<span class="math-source">${delimiter}${escapeHtml(token.text)}${delimiter}</span>`;
        },
      },
    ],
  });
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
  // A calendar date has no timezone. Parsing it as UTC shifts it back a day
  // for readers in timezones west of UTC.
  const dateOnly = typeof dateStr === 'string' && /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  const d = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(dateStr);
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
    configureMarkdownMath();
    await loadPosts();
    // Deep-link support: #posts/demo.md opens directly to that post
    if (location.hash) {
      const file = decodeURIComponent(location.hash.slice(1));
      if (POSTS.some((p) => p.file === file)) showDetail(file);
    }
  });
});
