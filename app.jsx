// Top-level App: routes between pages, wires LangContext

function App() {
  const [loc, setLoc] = useLocale();
  const route = useRoute();
  const t = (k) => resolveT(loc, k);

  // Re-render lucide icons on route or locale change
  hUseEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  const ctx = { loc, setLoc, t };

  const page =
    route === 'services'   ? h(ServicesPage, null) :
    route === 'technology' ? h(TechnologyPage, null) :
    route === 'about'      ? h(AboutPage, null) :
    route === 'careers'    ? h(CareersPage, null) :
    route === 'contact'    ? h(ContactPage, null) :
    h(HomePage, null);

  return h(LangContext.Provider, { value: ctx },
    h(Nav, { route }),
    h('main', { key: route + '|' + loc }, page),
    h(Footer, null)
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App, null));
