// Shared shell: Nav (with language switcher) + Footer + i18n hook + router

const { useState, useEffect, useRef, useCallback, createElement: h, Fragment } = React;

// ───── i18n hook ─────────────────────────────────────────
function useLocale() {
  const [loc, setLoc] = useState(() => {
    const saved = localStorage.getItem('hexbit_lang');
    if (saved && I18N[saved]) return saved;
    return 'en';
  });
  const set = useCallback((l) => {
    setLoc(l);
    localStorage.setItem('hexbit_lang', l);
    document.documentElement.setAttribute('lang', l);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute('lang', loc);
  }, [loc]);
  return [loc, set];
}

// Resolve a dotted key path against the active locale, falling back to EN.
function resolveT(loc, key) {
  const tree = I18N[loc] || I18N.en;
  const parts = key.split('.');
  let cur = tree;
  for (const p of parts) {
    if (cur == null) break;
    cur = cur[p];
  }
  if (cur == null) {
    // fallback to EN
    let fb = I18N.en;
    for (const p of parts) {
      if (fb == null) break;
      fb = fb[p];
    }
    return fb == null ? key : fb;
  }
  return cur;
}

// LangContext for child components
const LangContext = React.createContext({ loc: 'en', t: (k) => k, setLoc: () => {} });

function useT() {
  return React.useContext(LangContext);
}

// ───── Hash router ───────────────────────────────────────
function useRoute() {
  const [route, setRoute] = useState(() => (window.location.hash.replace('#/', '') || 'home'));
  useEffect(() => {
    const onHash = () => {
      const r = window.location.hash.replace('#/', '') || 'home';
      setRoute(r);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function navigate(route) {
  window.location.hash = '#/' + route;
}

// ───── Top Nav ───────────────────────────────────────────
function LangSwitch() {
  const { loc, setLoc } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const cur = LOCALES.find(l => l.id === loc) || LOCALES[0];

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return h('div', { className: 'lang-switch', ref },
    h('button', { className: 'lang-btn', onClick: () => setOpen(o => !o), 'aria-haspopup': 'menu', 'aria-expanded': open },
      h('i', { 'data-lucide': 'globe', style: { width: 13, height: 13, opacity: 0.8 } }),
      h('span', null, cur.code),
      h('svg', { className: 'chev', viewBox: '0 0 12 12', fill: 'none' },
        h('path', { d: 'M3 4.5L6 7.5L9 4.5', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' })
      )
    ),
    open && h('div', { className: 'lang-menu', role: 'menu' },
      LOCALES.map(l =>
        h('button', {
          key: l.id,
          className: l.id === loc ? 'active' : '',
          onClick: () => { setLoc(l.id); setOpen(false); },
          role: 'menuitem',
        },
          h('span', null, l.label),
          h('span', { className: 'code' }, l.code)
        )
      )
    )
  );
}

function Nav({ route }) {
  const { t } = useT();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [route]);

  const NavLink = ({ to, children }) =>
    h('a', {
      href: '#/' + to,
      className: route === to ? 'active' : '',
      onClick: (e) => { e.preventDefault(); setMenuOpen(false); navigate(to); },
    }, children);

  return h('header', { className: 'mk-nav' + (menuOpen ? ' menu-open' : '') },
    h('a', {
      href: '#/home',
      className: 'lock',
      onClick: (e) => { e.preventDefault(); setMenuOpen(false); navigate('home'); },
    },
      h('img', { src: 'assets/hexbit-logo-reverse.svg', alt: 'HEXBIT', style: { background: 'transparent' } })
    ),
    h('nav', { className: menuOpen ? 'open' : '' },
      h(NavLink, { to: 'home' }, t('nav.home')),
      h(NavLink, { to: 'services' }, t('nav.services')),
      h(NavLink, { to: 'technology' }, t('nav.technology')),
      h(NavLink, { to: 'about' }, t('nav.about')),
      h(NavLink, { to: 'careers' }, t('nav.careers')),
      h(NavLink, { to: 'contact' }, t('nav.contact')),
    ),
    h('div', { className: 'right' },
      h(LangSwitch, null),
      h('a', {
        href: '#/contact',
        className: 'cta',
        onClick: (e) => { e.preventDefault(); setMenuOpen(false); navigate('contact'); },
      }, t('nav.cta')),
      h('button', {
        className: 'mk-nav-burger',
        onClick: () => setMenuOpen(o => !o),
        'aria-label': 'Menu',
        'aria-expanded': menuOpen,
      },
        h('i', { 'data-lucide': menuOpen ? 'x' : 'menu', style: { width: 20, height: 20 } })
      ),
    )
  );
}

// ───── Footer ────────────────────────────────────────────
function Footer() {
  const { t } = useT();
  const Lk = ({ to, children }) =>
    h('a', { href: '#/' + to, onClick: (e) => { e.preventDefault(); navigate(to); } }, children);

  return h('footer', { className: 'mk-footer' },
    h('div', { className: 'mk-footer-inner' },
      h('div', { className: 'col-brand' },
        h('img', { className: 'logo-img', src: 'assets/hexbit-logo-reverse.svg', alt: 'HEXBIT' }),
        h('p', null, t('footer.tagline')),
        h('div', { className: 'addr' },
          'Hexbit Pte. Ltd.', h('br'),
          '33A PAGODA STREET', h('br'),
          '059192 SINGAPORE'
        )
      ),
      h('div', null,
        h('h6', null, t('footer.cols.services')),
        h('ul', null,
          h('li', null, h(Lk, { to: 'services' }, t('footer.links.marketMaking'))),
          h('li', null, h(Lk, { to: 'services' }, t('footer.links.liquidityService'))),
          h('li', null, h(Lk, { to: 'services' }, t('footer.links.quantDesk'))),
          h('li', null, h(Lk, { to: 'technology' }, t('footer.links.technology'))),
        )
      ),
      h('div', null,
        h('h6', null, t('footer.cols.company')),
        h('ul', null,
          h('li', null, h(Lk, { to: 'about' }, t('footer.links.about'))),
          h('li', null, h(Lk, { to: 'careers' }, t('footer.links.careers'))),
          h('li', null, h(Lk, { to: 'contact' }, t('footer.links.contact'))),
          h('li', null, h('a', { href: '#', onClick: (e) => e.preventDefault() }, t('footer.links.engineering'))),
        )
      ),
      h('div', null,
        h('h6', null, t('footer.cols.resources')),
        h('ul', null,
          h('li', null, h('a', { href: '#', onClick: (e) => e.preventDefault() }, t('footer.links.docs'))),
          h('li', null, h('a', { href: '#', onClick: (e) => e.preventDefault() }, t('footer.links.status'))),
          h('li', null, h('a', { href: '#', onClick: (e) => e.preventDefault() }, t('footer.links.security'))),
        )
      ),
      h('div', null,
        h('h6', null, t('footer.cols.legal')),
        h('ul', null,
          h('li', null, h('a', { href: '#', onClick: (e) => e.preventDefault() }, t('footer.links.terms'))),
          h('li', null, h('a', { href: '#', onClick: (e) => e.preventDefault() }, t('footer.links.privacy'))),
          h('li', null, h('a', { href: '#', onClick: (e) => e.preventDefault() }, t('footer.links.compliance'))),
        )
      ),
    ),
    h('div', { className: 'legal' },
      h('span', null, t('footer.legal')),
      h('span', { className: 'status' }, t('footer.status'))
    )
  );
}

Object.assign(window, { Nav, Footer, LangContext, useT, useLocale, resolveT, useRoute, navigate, h, Fragment });
