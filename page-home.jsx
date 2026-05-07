// Home page

const { useState: hUseState, useEffect: hUseEffect, useRef: hUseRef } = React;

// ─── Hex lattice visual (signature, calm pulse) ─────────
function HexLattice() {
  // Render a 7-hex cluster matching the brand mark — six surrounding one center.
  // Uses pointy-top hex layout.
  const size = 460;
  const cx = size / 2, cy = size / 2;
  const r = 64;            // hex radius
  const sx = r * Math.sqrt(3); // horizontal spacing for adjacent hexes
  const sy = r * 1.5;          // vertical
  const positions = [
    { x: 0, y: 0, lit: true },                 // center
    { x: 0, y: -2 * r * Math.sin(Math.PI/3) }, // top
    { x: sx * Math.cos(Math.PI/6), y: -sy },   // top-right
    { x: sx * Math.cos(Math.PI/6), y: sy },    // bot-right
    { x: 0, y: 2 * r * Math.sin(Math.PI/3) },  // bot
    { x: -sx * Math.cos(Math.PI/6), y: sy },   // bot-left
    { x: -sx * Math.cos(Math.PI/6), y: -sy },  // top-left
  ];
  // Outer "dim" ring of additional hexes for atmosphere
  const outer = [];
  for (let i = 0; i < 6; i++) {
    const a = Math.PI/6 + i * Math.PI/3;
    outer.push({ x: 2 * sx * Math.cos(a), y: 2 * sy * Math.sin(a) });
  }
  // and a far ring
  const far = [];
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI/6;
    far.push({ x: 3 * sx * Math.cos(a), y: 3 * sy * Math.sin(a) });
  }
  const hexPath = (cx, cy, r) => {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const a = -Math.PI/2 + i * Math.PI/3;
      pts.push((cx + r * Math.cos(a)).toFixed(2) + ',' + (cy + r * Math.sin(a)).toFixed(2));
    }
    return 'M' + pts.join(' L') + 'Z';
  };
  return h('svg', {
    className: 'hex-lattice',
    viewBox: `0 0 ${size} ${size}`,
    xmlns: 'http://www.w3.org/2000/svg',
  },
    far.map((p, i) => h('path', { key: 'f' + i, className: 'h dim', d: hexPath(cx + p.x, cy + p.y, r * 0.85) })),
    outer.map((p, i) => h('path', { key: 'o' + i, className: 'h', d: hexPath(cx + p.x, cy + p.y, r) })),
    positions.map((p, i) => h('path', {
      key: 'p' + i,
      className: 'h' + (p.lit ? ' lit' : ''),
      d: hexPath(cx + p.x, cy + p.y, r),
    })),
  );
}

// ─── Live spread panel (mock) ───────────────────────────
function LiveSpreadPanel() {
  const { t, loc } = useT();
  const initial = [
    { p: 'BTC-USD',  bid: 67924.18, ask: 67924.92, vol: 8.2 },
    { p: 'ETH-USD',  bid: 3872.46,  ask: 3872.71,  vol: 6.4 },
    { p: 'SOL-USD',  bid: 184.31,   bid2: 184.31,  ask: 184.36,  vol: 12 },
    { p: 'BNB-USD',  bid: 612.18,   ask: 612.27,   vol: 5.8 },
    { p: 'XRP-USD',  bid: 2.4732,   ask: 2.4738,   vol: 6.2,  prec: 4 },
    { p: 'TON-USD',  bid: 5.612,    ask: 5.618,    vol: 8.4,  prec: 3 },
    { p: 'AVAX-USD', bid: 41.83,    ask: 41.86,    vol: 5.1 },
  ];
  const [rows, setRows] = hUseState(initial);
  const [flash, setFlash] = hUseState({}); // { 'BTC-USD-bid': true }

  hUseEffect(() => {
    let id;
    const tick = () => {
      setRows(prev => {
        const next = prev.map(r => {
          // Random walk on bid; ask = bid + spread component
          const drift = (Math.random() - 0.5) * 2 * r.vol * 0.0008 * (r.bid || 1);
          const newBid = Math.max(0.0001, (r.bid || 0) + drift);
          const spreadBp = 1 + Math.random() * 4; // 1–5 bps
          const newAsk = newBid * (1 + spreadBp / 10000);
          return { ...r, bid: newBid, ask: newAsk };
        });
        // pick a random row to flash
        const idx = Math.floor(Math.random() * next.length);
        const side = Math.random() < 0.5 ? 'bid' : 'ask';
        const key = next[idx].p + '-' + side;
        setFlash(f => ({ ...f, [key]: side }));
        setTimeout(() => setFlash(f => { const c = { ...f }; delete c[key]; return c; }), 220);
        return next;
      });
      id = setTimeout(tick, 800 + Math.random() * 600);
    };
    id = setTimeout(tick, 600);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fmt = (n, prec) => {
    const p = prec || (n > 1000 ? 2 : n > 10 ? 2 : 4);
    return n.toLocaleString('en-US', { minimumFractionDigits: p, maximumFractionDigits: p });
  };

  const headers = t('home.spreadHeaders');

  return h('div', { className: 'spread-panel' },
    h('div', { className: 'sp-head' },
      h('span', { className: 'ttl' }, t('home.spreadTitle').replace('BTC-USD', '7 pairs')),
      h('span', { className: 'live' }, t('home.spreadLive'))
    ),
    h('table', null,
      h('thead', null,
        h('tr', null,
          h('th', null, headers.pair),
          h('th', null, headers.bid),
          h('th', null, headers.ask),
          h('th', null, headers.spread)
        )
      ),
      h('tbody', null,
        rows.map((r) => {
          const sp = ((r.ask - r.bid) / r.bid * 10000);
          return h('tr', { key: r.p },
            h('td', null, r.p),
            h('td', { className: 'bid' + (flash[r.p + '-bid'] ? ' flash-bid' : '') }, fmt(r.bid, r.prec)),
            h('td', { className: 'ask' + (flash[r.p + '-ask'] ? ' flash-ask' : '') }, fmt(r.ask, r.prec)),
            h('td', null, sp.toFixed(1) + ' bp')
          );
        })
      )
    )
  );
}

// ─── Hero ────────────────────────────────────────────────
function Hero() {
  const { t } = useT();
  return h('section', { className: 'mk-hero' },
    h('div', { className: 'hero-grid' },
      h('div', null,
        h('span', { className: 'eyebrow-row' }, t('home.heroEyebrow')),
        h('h1', null,
          t('home.heroTitle1'), ' ',
          h('em', null, t('home.heroTitle2'))
        ),
        h('p', { className: 'lead' }, t('home.heroLead')),
        h('div', { className: 'actions' },
          h('a', {
            className: 'cta',
            href: '#/contact',
            onClick: (e) => { e.preventDefault(); navigate('contact'); },
          }, t('home.heroCta')),
          h('a', {
            className: 'ghost',
            href: '#live-spreads',
            onClick: (e) => {
              e.preventDefault();
              const el = document.getElementById('live-spreads');
              if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
            },
          }, t('home.heroGhost')),
        )
      ),
      h('div', { className: 'hero-lattice' },
        h(HexLattice, null)
      )
    )
  );
}

// ─── Metric strip ───────────────────────────────────────
function MetricStrip() {
  const { t } = useT();
  const lbl = t('home.stripLabels');
  const ft = t('home.stripFoot');
  return h('section', { className: 'mk-strip', id: 'metrics' },
    h('div', { className: 'mk-strip-inner' },
      h('div', { className: 'cell' },
        h('span', { className: 'lbl' }, lbl.notional),
        h('span', { className: 'val' }, '$2.34', h('span', { className: 'unit' }, 'B')),
        h('span', { className: 'foot' }, ft.notional)
      ),
      h('div', { className: 'cell' },
        h('span', { className: 'lbl' }, lbl.latency),
        h('span', { className: 'val' }, '1.4', h('span', { className: 'unit' }, 'ms')),
        h('span', { className: 'foot' }, ft.latency)
      ),
      h('div', { className: 'cell' },
        h('span', { className: 'lbl' }, lbl.spread),
        h('span', { className: 'val' }, '3.2', h('span', { className: 'unit' }, 'bps')),
        h('span', { className: 'foot' }, ft.spread)
      ),
      h('div', { className: 'cell' },
        h('span', { className: 'lbl' }, lbl.uptime),
        h('span', { className: 'val' }, '99.97', h('span', { className: 'unit' }, '%')),
        h('span', { className: 'foot' }, ft.uptime)
      ),
    )
  );
}

// ─── Live spread section ─────────────────────────────────
function LiveSpreadSection() {
  const { t } = useT();
  return h('section', { className: 'mk-section', id: 'live-spreads' },
    h('div', { className: 'live-spread-grid' },
      h('div', null,
        h('span', { className: 'eyebrow' }, t('home.spreadLive')),
        h('h2', null, t('home.spreadTitle')),
        h('p', { className: 'sec-lead' },
          'A 7-pair sample from the venues we quote on. Updates stream in real time. ',
          'Cells flash on every update — green for bid, red for ask — then settle into the new value.'
        )
      ),
      h(LiveSpreadPanel, null)
    )
  );
}

// ─── What we do ──────────────────────────────────────────
function WhatWeDo() {
  const { t } = useT();
  const items = t('home.what');
  const icons = ['activity', 'layers', 'line-chart'];
  return h('section', { className: 'mk-section' },
    h('span', { className: 'eyebrow' }, t('home.whatEyebrow')),
    h('h2', null, t('home.whatTitle')),
    h('p', { className: 'sec-lead' }, t('home.whatLead')),
    h('div', { className: 'mk-features' },
      items.map((it, i) => h('div', { className: 'mk-feature', key: i },
        h('div', { className: 'icon' }, h('i', { 'data-lucide': icons[i], style: { width: 18, height: 18 } })),
        h('h3', null, it.t),
        h('p', null, it.d),
        h('span', { className: 'stat' }, it.s, ' · ', h('b', null, it.sv))
      ))
    )
  );
}

// ─── Markets we cover ────────────────────────────────────
function Markets() {
  const { t } = useT();
  const items = t('home.markets');
  const icons = ['bitcoin', 'trending-up', 'sigma', 'gauge', 'network'];
  return h('section', { className: 'mk-section' },
    h('span', { className: 'eyebrow' }, t('home.marketsEyebrow')),
    h('h2', null, t('home.marketsTitle')),
    h('p', { className: 'sec-lead' }, t('home.marketsLead')),
    h('div', { className: 'markets-grid' },
      items.map((it, i) => h('div', { className: 'market', key: i },
        h('span', { className: 'ic' }, h('i', { 'data-lucide': icons[i], style: { width: 20, height: 20 } })),
        h('span', { className: 'nm' }, it.t),
        h('span', { className: 'desc' }, it.d),
        h('span', { className: 'stat' }, h('b', null, it.s.split(' · ')[0]), ' · ', it.s.split(' · ')[1] || '')
      ))
    )
  );
}

// ─── Why Hexbit ──────────────────────────────────────────
function Why() {
  const { t } = useT();
  const items = t('home.why');
  return h('section', { className: 'mk-section' },
    h('span', { className: 'eyebrow' }, t('home.whyEyebrow')),
    h('h2', null, t('home.whyTitle')),
    h('p', { className: 'sec-lead' }, t('home.whyLead')),
    h('div', { className: 'why-rows' },
      items.map((it, i) => h('div', { className: 'why-row', key: i },
        h('span', { className: 'num' }, '0' + (i + 1)),
        h('h3', { className: 'h' }, it.h),
        h('div', null,
          h('p', { className: 'b' }, it.b),
          h('span', { className: 'tag' }, it.tag)
        )
      ))
    )
  );
}

// ─── Closing CTA strip ───────────────────────────────────
function CtaStrip() {
  const { t } = useT();
  return h('section', { className: 'cta-strip' },
    h('div', null,
      h('h3', null, t('home.ctaTitle')),
      h('p', null, t('home.ctaLead'))
    ),
    h('div', { className: 'actions' },
      h('a', {
        className: 'cta',
        href: '#/contact',
        onClick: (e) => { e.preventDefault(); navigate('contact'); },
      }, t('home.ctaButton')),
      h('span', { className: 'meta' }, t('home.ctaMeta'))
    )
  );
}

function HomePage() {
  return h('div', { className: 'page-fade', 'data-screen-label': 'Home' },
    h(Hero, null),
    h(MetricStrip, null),
    h(LiveSpreadSection, null),
    h(WhatWeDo, null),
    h(Markets, null),
    h(Why, null),
    h(CtaStrip, null),
  );
}

window.HomePage = HomePage;
