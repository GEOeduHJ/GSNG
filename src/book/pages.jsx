// Route name → page component. Later tasks register their pages here.
const PAGES = {};

export function pageFor(name) {
  return PAGES[name] ?? null;
}
