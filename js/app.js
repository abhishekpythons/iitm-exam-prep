/* Quiz 1 Prep — Vue 3 single-page app (no build step, hash routing). */
(function () {
  const { createApp, ref, reactive, computed, watch, onMounted, onBeforeUnmount } = Vue;

  /* ---------- helpers ---------- */
  function tex(src, display) {
    src = src.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    if (!window.katex) return display ? '<pre>' + src + '</pre>' : '<code>' + src + '</code>';
    try {
      return katex.renderToString(src, { displayMode: display, throwOnError: false });
    } catch (e) {
      return '<code>' + src + '</code>';
    }
  }
  // Turns "$...$" and "$$...$$" into rendered maths; the rest is trusted HTML from our own data files.
  function rich(s) {
    if (!s) return '';
    return s
      .replace(/\$\$([\s\S]+?)\$\$/g, (m, t) => tex(t, true))
      .replace(/\$([^$\n]+?)\$/g, (m, t) => tex(t, false));
  }
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };
  const plain = s => s.replace(/<[^>]+>/g, ' ').replace(/\$/g, ' ').toLowerCase();

  const TABS = [
    { id: 'overview', label: 'Exam pattern' },
    { id: 'concepts', label: 'Concepts' },
    { id: 'formulas', label: 'Formulas' },
    { id: 'examples', label: 'Worked examples' },
    { id: 'quiz', label: 'Practice' }
  ];

  /* ---------- components ---------- */
  const QuizCard = {
    props: ['item', 'index', 'sid'],
    emits: ['answered'],
    setup(props, { emit }) {
      const picked = ref(null);
      const pick = i => {
        if (picked.value !== null) return;
        picked.value = i;
        emit('answered', i === props.item.answer);
      };
      const reset = () => { picked.value = null; };
      return { picked, pick, reset, rich };
    },
    template: `
      <article class="card quiz">
        <p class="q"><span class="num">Q{{ index + 1 }}</span><span v-html="rich(item.q)"></span></p>
        <ul class="opts">
          <li v-for="(o, i) in item.options" :key="i">
            <button type="button" class="opt"
              :class="{ right: picked !== null && i === item.answer, wrong: picked === i && i !== item.answer }"
              :disabled="picked !== null" @click="pick(i)">
              <span class="letter">{{ 'ABCDEF'[i] }}</span><span v-html="rich(o)"></span>
            </button>
          </li>
        </ul>
        <div v-if="picked !== null" class="why" :class="picked === item.answer ? 'ok' : 'no'">
          <strong>{{ picked === item.answer ? 'Correct.' : 'Not quite.' }}</strong>
          <span v-html="rich(item.why)"></span>
        </div>
      </article>`
  };

  const SubjectPage = {
    components: { QuizCard },
    props: ['subject', 'tab'],
    setup(props) {
      const filter = ref('');
      const done = reactive({});
      const open = reactive({});
      const quizKey = ref(0);
      const score = reactive({ right: 0, total: 0 });

      const load = () => {
        Object.keys(done).forEach(k => delete done[k]);
        Object.assign(done, store.get('rev:' + props.subject.id, {}));
        Object.keys(open).forEach(k => delete open[k]);
        filter.value = '';
        score.right = 0; score.total = 0; quizKey.value++;
      };
      load();
      watch(() => props.subject.id, load);

      const toggleDone = t => {
        done[t.title] = !done[t.title];
        store.set('rev:' + props.subject.id, { ...done });
      };
      const f = computed(() => filter.value.trim().toLowerCase());
      const topics = computed(() => props.subject.topics.filter(t => !f.value || plain(t.title + ' ' + t.html).includes(f.value)));
      const formulas = computed(() => props.subject.formulas
        .map(g => ({ group: g.group, items: g.items.filter(it => !f.value || plain(g.group + ' ' + it.name + ' ' + (it.note || '')).includes(f.value)) }))
        .filter(g => g.items.length));
      const doneCount = computed(() => props.subject.topics.filter(t => done[t.title]).length);
      const answered = ok => { score.total++; if (ok) score.right++; };
      const restart = () => { score.right = 0; score.total = 0; quizKey.value++; };

      return { TABS, filter, done, open, toggleDone, topics, formulas, doneCount, score, answered, restart, quizKey, rich };
    },
    template: `
      <section class="subject" :style="{ '--accent': subject.color }">
        <header class="hero">
          <a class="back" href="#/">← All subjects</a>
          <p class="eyebrow">{{ subject.level }}</p>
          <h1>{{ subject.name }}</h1>
          <p class="lede">{{ subject.blurb }}</p>
        </header>

        <nav class="tabs" aria-label="Sections">
          <a v-for="t in TABS" :key="t.id" :href="'#/' + subject.id + '/' + t.id" :class="{ active: tab === t.id }">{{ t.label }}</a>
        </nav>

        <!-- Exam pattern -->
        <div v-if="tab === 'overview'" class="stack">
          <div class="facts">
            <div v-for="x in subject.pattern.facts" :key="x.k" class="fact"><span>{{ x.k }}</span><strong>{{ x.v }}</strong></div>
          </div>
          <div class="card">
            <h2>What the past papers keep asking</h2>
            <table class="freq">
              <thead><tr><th>Topic</th><th>How it shows up</th><th>Weight</th></tr></thead>
              <tbody>
                <tr v-for="r in subject.pattern.rows" :key="r.topic">
                  <td><strong>{{ r.topic }}</strong></td>
                  <td v-html="rich(r.how)"></td>
                  <td><span class="pill" :class="r.weight">{{ r.weight }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card">
            <h2>Exam-day tips</h2>
            <ul class="tips"><li v-for="(t, i) in subject.tips" :key="i" v-html="rich(t)"></li></ul>
          </div>
          <p class="source">Based on: {{ subject.papers }}</p>
        </div>

        <!-- Concepts -->
        <div v-else-if="tab === 'concepts'" class="stack">
          <div class="toolbar">
            <input v-model="filter" type="search" placeholder="Filter concepts…" aria-label="Filter concepts">
            <span class="progress">{{ doneCount }} / {{ subject.topics.length }} revised</span>
          </div>
          <article v-for="t in topics" :key="t.title" class="card topic" :class="{ done: done[t.title] }">
            <div class="topic-head">
              <h2>{{ t.title }}</h2>
              <span class="pill" :class="t.weight">{{ t.weight }}</span>
            </div>
            <div class="prose" v-html="rich(t.html)"></div>
            <label class="check"><input type="checkbox" :checked="!!done[t.title]" @change="toggleDone(t)"> Mark as revised</label>
          </article>
          <p v-if="!topics.length" class="empty">Nothing matches “{{ filter }}”.</p>
        </div>

        <!-- Formulas -->
        <div v-else-if="tab === 'formulas'" class="stack">
          <div class="toolbar">
            <input v-model="filter" type="search" placeholder="Filter formulas…" aria-label="Filter formulas">
            <button type="button" class="ghost" onclick="window.print()">Print sheet</button>
          </div>
          <section v-for="g in formulas" :key="g.group" class="card">
            <h2>{{ g.group }}</h2>
            <dl class="formulas">
              <div v-for="it in g.items" :key="it.name" class="formula">
                <dt>{{ it.name }}</dt>
                <dd>
                  <pre v-if="it.code" class="codeline"><code>{{ it.code }}</code></pre>
                  <div v-else class="math" v-html="rich('$$' + it.tex + '$$')"></div>
                  <p v-if="it.note" class="note" v-html="rich(it.note)"></p>
                </dd>
              </div>
            </dl>
          </section>
          <p v-if="!formulas.length" class="empty">Nothing matches “{{ filter }}”.</p>
        </div>

        <!-- Worked examples -->
        <div v-else-if="tab === 'examples'" class="stack">
          <article v-for="(e, i) in subject.examples" :key="i" class="card example">
            <p class="tag">{{ e.tag }}</p>
            <div class="prose q" v-html="rich(e.q)"></div>
            <button type="button" class="ghost" @click="open[i] = !open[i]">{{ open[i] ? 'Hide solution' : 'Show solution' }}</button>
            <div v-if="open[i]" class="prose solution" v-html="rich(e.a)"></div>
          </article>
        </div>

        <!-- Practice -->
        <div v-else class="stack">
          <div class="toolbar">
            <span class="progress">Score: {{ score.right }} / {{ score.total }} answered ({{ subject.quiz.length }} questions)</span>
            <button type="button" class="ghost" @click="restart">Restart</button>
          </div>
          <quiz-card v-for="(q, i) in subject.quiz" :key="quizKey + '-' + i" :item="q" :index="i" :sid="subject.id" @answered="answered"></quiz-card>
        </div>
      </section>`
  };

  const HomePage = {
    props: ['subjects'],
    setup(props) {
      const revised = s => {
        const d = store.get('rev:' + s.id, {});
        return s.topics.filter(t => d[t.title]).length;
      };
      return { revised };
    },
    template: `
      <section class="home">
        <header class="hero">
          <p class="eyebrow">IIT Madras BS · Quiz 1</p>
          <h1>Revise what the papers actually ask.</h1>
          <p class="lede">Four subjects. For each one: the recurring question types from past Quiz 1 papers, the concepts behind them, a formula sheet, worked solutions, and practice questions with explanations.</p>
        </header>
        <div class="grid">
          <a v-for="s in subjects" :key="s.id" class="card subject-card" :href="'#/' + s.id + '/overview'" :style="{ '--accent': s.color }">
            <p class="eyebrow">{{ s.level }}</p>
            <h2>{{ s.name }}</h2>
            <p>{{ s.blurb }}</p>
            <ul class="chips"><li v-for="c in s.chips" :key="c">{{ c }}</li></ul>
            <div class="meter" :aria-label="revised(s) + ' of ' + s.topics.length + ' topics revised'">
              <span :style="{ width: (100 * revised(s) / s.topics.length) + '%' }"></span>
            </div>
            <p class="meta">{{ revised(s) }} / {{ s.topics.length }} topics revised · {{ s.quiz.length }} practice questions</p>
          </a>
        </div>
        <div class="card how">
          <h2>How to use this</h2>
          <ol>
            <li><strong>Exam pattern</strong> first — see which topics carry the marks.</li>
            <li><strong>Concepts</strong> — read, then tick each topic as revised (saved in this browser).</li>
            <li><strong>Formulas</strong> — printable one-page sheet per subject.</li>
            <li><strong>Worked examples</strong> — try each before opening the solution.</li>
            <li><strong>Practice</strong> — instant feedback with the reasoning.</li>
          </ol>
        </div>
      </section>`
  };

  /* ---------- root ---------- */
  createApp({
    components: { HomePage, SubjectPage },
    setup() {
      const subjects = window.SUBJECTS;
      const route = ref(location.hash || '#/');
      const onHash = () => { route.value = location.hash || '#/'; window.scrollTo(0, 0); };
      onMounted(() => window.addEventListener('hashchange', onHash));
      onBeforeUnmount(() => window.removeEventListener('hashchange', onHash));

      const parts = computed(() => route.value.replace(/^#\/?/, '').split('/').filter(Boolean));
      const subject = computed(() => subjects.find(s => s.id === parts.value[0]) || null);
      const tab = computed(() => TABS.some(t => t.id === parts.value[1]) ? parts.value[1] : 'overview');

      const theme = ref(store.get('theme', null));
      const applyTheme = () => {
        if (theme.value) document.documentElement.dataset.theme = theme.value;
        else delete document.documentElement.dataset.theme;
      };
      applyTheme();
      const toggleTheme = () => {
        const dark = theme.value ? theme.value === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
        theme.value = dark ? 'light' : 'dark';
        store.set('theme', theme.value);
        applyTheme();
      };
      watch(subject, s => { document.title = (s ? s.name + ' — ' : '') + 'Quiz 1 Prep'; }, { immediate: true });

      return { subjects, subject, tab, toggleTheme };
    },
    template: `
      <div class="shell">
        <header class="topbar">
          <a class="brand" href="#/">Quiz 1 Prep</a>
          <nav class="subnav" aria-label="Subjects">
            <a v-for="s in subjects" :key="s.id" :href="'#/' + s.id + '/overview'" :class="{ active: subject && subject.id === s.id }">{{ s.short }}</a>
          </nav>
          <button type="button" class="ghost theme" @click="toggleTheme" aria-label="Switch between light and dark theme">Theme</button>
        </header>
        <main>
          <subject-page v-if="subject" :subject="subject" :tab="tab"></subject-page>
          <home-page v-else :subjects="subjects"></home-page>
        </main>
        <footer class="foot">Study notes written from the recurring question types in past Quiz 1 papers. Always cross-check with your course material.</footer>
      </div>`
  }).mount('#app');
})();
