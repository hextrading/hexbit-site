// Sub-pages: Services, Technology, About, Careers, Contact

// ─── Page header ────────────────────────────────────────
function PageHeader({ eyebrow, title, lead }) {
  return h('header', { className: 'page-header' },
    h('span', { className: 'eyebrow' }, eyebrow),
    h('h1', null, title),
    lead && h('p', { className: 'lead' }, lead)
  );
}

// ─── Services ───────────────────────────────────────────
function ServicesPage() {
  const { t } = useT();
  const blocks = t('services.blocks');
  return h('div', { className: 'page-fade', 'data-screen-label': 'Services' },
    h(PageHeader, { eyebrow: t('services.eyebrow'), title: t('services.title'), lead: t('services.lead') }),
    h('section', { className: 'mk-section', style: { paddingTop: 32 } },
      blocks.map((b, i) => h('div', { className: 'service-block', key: i },
        h('div', { className: 'meta' },
          h('span', { className: 'num' }, b.num),
          h('h3', null, b.title),
          h('span', { className: 'tag' }, b.tag)
        ),
        h('div', { className: 'body' },
          h('p', { className: 'lead' }, b.lead),
          h('ul', null, b.features.map((f, j) => h('li', { key: j }, f))),
          h('div', { className: 'stats' },
            b.stats.map((s, j) => h('div', { key: j },
              h('span', { className: 'v' }, s.v),
              h('span', { className: 'l' }, s.l)
            ))
          )
        )
      ))
    ),
    h(CtaStrip, null)
  );
}

// ─── Technology ─────────────────────────────────────────
function TechnologyPage() {
  const { t } = useT();
  const stack = t('technology.stack');
  const principles = t('technology.principles');
  return h('div', { className: 'page-fade', 'data-screen-label': 'Technology' },
    h(PageHeader, { eyebrow: t('technology.eyebrow'), title: t('technology.title'), lead: t('technology.lead') }),
    h('section', { className: 'mk-section' },
      h('span', { className: 'eyebrow' }, t('technology.stackHeader')),
      h('div', { className: 'tech-stack' },
        stack.map((s, i) => h('div', { className: 'layer', key: i },
          h('span', { className: 'lay' }, s.lay),
          h('h3', null, s.t),
          h('p', null, s.d),
          h('div', { className: 'chips' },
            s.chips.map((c, j) => h('span', { key: j }, c))
          )
        ))
      )
    ),
    h('section', { className: 'mk-section' },
      h('span', { className: 'eyebrow' }, t('technology.principlesEyebrow')),
      h('h2', null, t('technology.principlesTitle')),
      h('div', { className: 'why-rows', style: { marginTop: 24 } },
        principles.map((p, i) => h('div', { className: 'why-row', key: i },
          h('span', { className: 'num' }, p.n),
          h('h3', { className: 'h' }, p.h),
          h('p', { className: 'b' }, p.p)
        ))
      )
    ),
    h(CtaStrip, null)
  );
}

// ─── About ──────────────────────────────────────────────
function AboutPage() {
  const { t } = useT();
  const facts = t('about.facts');
  const values = t('about.values');
  return h('div', { className: 'page-fade', 'data-screen-label': 'About' },
    h(PageHeader, { eyebrow: t('about.eyebrow'), title: t('about.title'), lead: t('about.lead') }),
    h('section', { className: 'mk-section' },
      h('div', { className: 'about-rows' },
        facts.map((f, i) => h('div', { className: 'fact-row', key: i },
          h('span', { className: 'l' }, f.l),
          h('span', { className: 'v' }, f.v)
        ))
      )
    ),
    h('section', { className: 'mk-section' },
      h('span', { className: 'eyebrow' }, t('about.valuesEyebrow')),
      h('h2', null, t('about.valuesTitle')),
      h('div', { className: 'value-grid' },
        values.map((v, i) => h('div', { className: 'val', key: i },
          h('span', { className: 'n' }, v.n),
          h('h4', null, v.h),
          h('p', null, v.p)
        ))
      )
    ),
    h(CtaStrip, null)
  );
}

// ─── Careers ────────────────────────────────────────────
function CareersPage() {
  const { t } = useT();
  const roles = t('careers.roles');
  const teams = t('careers.teams');
  const locs = t('careers.locations');
  const types = t('careers.types');
  const heads = t('careers.headers');
  const culture = t('careers.culture');

  return h('div', { className: 'page-fade', 'data-screen-label': 'Careers' },
    h(PageHeader, { eyebrow: t('careers.eyebrow'), title: t('careers.title'), lead: t('careers.lead') }),
    h('section', { className: 'mk-section' },
      h('span', { className: 'eyebrow' }, t('careers.cultureEyebrow')),
      h('h2', null, t('careers.cultureTitle')),
      h('div', { className: 'value-grid' },
        culture.map((c, i) => h('div', { className: 'val', key: i },
          h('span', { className: 'n' }, c.n),
          h('h4', null, c.h),
          h('p', null, c.p)
        ))
      )
    ),
    h('section', { className: 'mk-section' },
      h('span', { className: 'eyebrow' }, t('careers.cultureEyebrow').split('').slice(0, 4).join('') ? 'Open roles · 9' : 'Open roles · 9'),
      h('h2', { style: { fontSize: 36 } }, '9 open roles'),
      h('div', { className: 'role-list' },
        h('div', { className: 'role-head' },
          h('span', null, heads.role),
          h('span', null, heads.team),
          h('span', null, heads.loc),
          h('span', null, heads.type),
          h('span', null, '')
        ),
        roles.map((r, i) => h('div', { className: 'role', key: i, onClick: () => navigate('contact') },
          h('span', { className: 't' }, r.t),
          h('span', { className: 'team' }, teams[r.team]),
          h('span', { className: 'loc' }, locs[r.loc]),
          h('span', { className: 'type' }, types[r.type]),
          h('span', { className: 'arrow' }, '→')
        ))
      )
    )
  );
}

// ─── Contact ────────────────────────────────────────────
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMoviI6s-xm5QxKLaOWlXVwH3I_LXrkG4YyHRbLKDujTAOBg/viewform';

function ContactFormCTA() {
  const { t } = useT();
  const cta = t('contact.cta');
  return h('div', { className: 'form contact-cta' },
    h('h3', null, cta.title),
    h('p', null, cta.body),
    h('a', {
      className: 'cta-btn',
      href: GOOGLE_FORM_URL,
      target: '_blank',
      rel: 'noopener noreferrer',
    }, cta.button)
  );
}

function ContactPage() {
  const { t } = useT();
  const info = t('contact.info');
  return h('div', { className: 'page-fade', 'data-screen-label': 'Contact' },
    h(PageHeader, { eyebrow: t('contact.eyebrow'), title: t('contact.title'), lead: t('contact.lead') }),
    h('div', { className: 'contact-grid' },
      h('div', { className: 'contact-info' },
        ['contact', 'hq', 'hours'].map(k =>
          h('div', { className: 'info-block', key: k },
            h('h3', null, info[k].l),
            (k === 'hq' || k === 'hours')
              ? h('div', { className: 'v', style: { whiteSpace: 'pre-line', fontFamily: k === 'hours' ? 'var(--font-mono)' : 'var(--font-sans)', fontSize: k === 'hours' ? 13 : 15, letterSpacing: k === 'hours' ? '0.02em' : 0 } }, info[k].v)
              : h('div', { className: 'v mono' }, h('a', { href: 'mailto:' + info[k].v }, info[k].v))
          )
        )
      ),
      h(ContactFormCTA, null)
    )
  );
}

Object.assign(window, {
  ServicesPage, TechnologyPage, AboutPage, CareersPage, ContactPage,
});
