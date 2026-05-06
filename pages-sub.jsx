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
      h('div', { className: 'value-grid', style: { gridTemplateColumns: 'repeat(3, 1fr)' } },
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
function ContactForm() {
  const { t } = useT();
  const [vals, setVals] = hUseState({ name: '', company: '', email: '', role: '', interest: '', notes: '' });
  const [errs, setErrs] = hUseState({});
  const [submitting, setSubmitting] = hUseState(false);
  const [done, setDone] = hUseState(null); // { ref }

  const set = (k, v) => {
    setVals(s => ({ ...s, [k]: v }));
    if (errs[k]) setErrs(e => { const c = { ...e }; delete c[k]; return c; });
  };

  const validate = () => {
    const e = {};
    const required = t('contact.form.errors.required');
    if (!vals.name.trim()) e.name = required;
    if (!vals.company.trim()) e.company = required;
    if (!vals.email.trim()) e.email = required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email.trim())) e.email = t('contact.form.errors.email');
    if (!vals.interest.trim()) e.interest = required;
    if (!vals.notes.trim()) e.notes = required;
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      // Generate a mock reference like HX-2026-XXXX
      const refId = 'HX-2026-' + Math.floor(1000 + Math.random() * 9000);
      setDone({ ref: refId });
    }, 900);
  };

  if (done) {
    return h('div', { className: 'success-card' },
      h('div', { className: 'ic' }, h('i', { 'data-lucide': 'check', style: { width: 22, height: 22 } })),
      h('h3', null, t('contact.form.successTitle')),
      h('p', null, t('contact.form.successBody')),
      h('div', { className: 'ref' }, t('contact.form.successRef'), ' · ', h('b', null, done.ref)),
      h('div', { style: { marginTop: 24 } },
        h('a', { href: '#', onClick: (e) => { e.preventDefault(); setDone(null); setVals({ name: '', company: '', email: '', role: '', interest: '', notes: '' }); } },
          t('contact.form.successAgain'))
      )
    );
  }

  const f = t('contact.form');

  const Field = ({ name, label, required, children }) =>
    h('div', { className: 'field' },
      h('label', null, label, required && h('span', { className: 'req' }, '*')),
      children,
      errs[name] && h('span', { className: 'err-msg' }, errs[name])
    );

  const inp = (k) => ({
    value: vals[k],
    onChange: (e) => set(k, e.target.value),
    className: errs[k] ? 'err' : '',
  });

  return h('form', { className: 'form', onSubmit: submit, noValidate: true },
    h('h3', { style: { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, margin: '0 0 6px', letterSpacing: '-0.01em' } }, f.title),
    h('p', { style: { color: 'var(--fg-2)', fontSize: 14, margin: '0 0 24px', lineHeight: 1.55 } }, f.sub),

    h('div', { className: 'row' },
      h(Field, { name: 'name', label: f.name, required: true },
        h('input', { type: 'text', ...inp('name'), autoComplete: 'name' })
      ),
      h(Field, { name: 'company', label: f.company, required: true },
        h('input', { type: 'text', ...inp('company'), autoComplete: 'organization' })
      )
    ),
    h('div', { className: 'row' },
      h(Field, { name: 'email', label: f.email, required: true },
        h('input', { type: 'email', ...inp('email'), autoComplete: 'email' })
      ),
      h(Field, { name: 'role', label: f.role },
        h('input', { type: 'text', ...inp('role') })
      )
    ),
    h(Field, { name: 'interest', label: f.interest, required: true },
      h('select', { ...inp('interest') },
        h('option', { value: '' }, '—'),
        f.interestOpts.map((o, i) => h('option', { key: i, value: o }, o))
      )
    ),
    h(Field, { name: 'notes', label: f.notes, required: true },
      h('textarea', { ...inp('notes'), placeholder: f.notesPlaceholder })
    ),
    h('div', { className: 'submit' },
      h('span', { className: 'footnote' }, f.consent),
      h('button', { type: 'submit', disabled: submitting }, submitting ? f.submitting : f.submit)
    )
  );
}

function ContactPage() {
  const { t } = useT();
  const info = t('contact.info');
  return h('div', { className: 'page-fade', 'data-screen-label': 'Contact' },
    h(PageHeader, { eyebrow: t('contact.eyebrow'), title: t('contact.title'), lead: t('contact.lead') }),
    h('div', { className: 'contact-grid' },
      h('div', { className: 'contact-info' },
        ['partnerships', 'press', 'careers', 'hq', 'hours'].map(k =>
          h('div', { className: 'info-block', key: k },
            h('h3', null, info[k].l),
            (k === 'hq' || k === 'hours')
              ? h('div', { className: 'v', style: { whiteSpace: 'pre-line', fontFamily: k === 'hours' ? 'var(--font-mono)' : 'var(--font-sans)', fontSize: k === 'hours' ? 13 : 15, letterSpacing: k === 'hours' ? '0.02em' : 0 } }, info[k].v)
              : h('div', { className: 'v mono' }, h('a', { href: 'mailto:' + info[k].v }, info[k].v))
          )
        )
      ),
      h(ContactForm, null)
    )
  );
}

Object.assign(window, {
  ServicesPage, TechnologyPage, AboutPage, CareersPage, ContactPage,
});
