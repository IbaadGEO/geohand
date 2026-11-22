// Info panel for the selected part or boundary. Top level is DOM-free so formatRef can be tested in node.

/** APA-style reference line, as in docs/sources.md. Titles may carry rich markup (e.g. MgSiO~3~). */
export function formatRef(r) {
  const where = r.book
    ? `${r.container}.`
    : `${r.container}${r.volume != null ? `, ${r.volume}` : ''}${r.issue != null ? `(${r.issue})` : ''}${r.pages ? `, ${r.pages}` : ''}.`;
  const link = r.doi ? ` https://doi.org/${r.doi}` : r.url ? ` ${r.url}` : '';
  return `${r.authors} (${r.year}). ${r.title}. ${where}${link}`;
}
