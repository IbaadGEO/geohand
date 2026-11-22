// Tiny fixed markup for content text: _italic_, ^superscript^, ~subscript~. No nesting, no HTML.
const MARK = /_([^_]+)_|\^([^^]+)\^|~([^~]+)~/g;

export function parseRich(text) {
  const out = [];
  let last = 0;
  for (const m of String(text).matchAll(MARK)) {
    if (m.index > last) out.push({ t: 'text', s: text.slice(last, m.index) });
    out.push(m[1] != null ? { t: 'i', s: m[1] } : m[2] != null ? { t: 'sup', s: m[2] } : { t: 'sub', s: m[3] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ t: 'text', s: text.slice(last) });
  return out;
}

/** The only path from content or visitor text to the DOM: text nodes and <i>/<sup>/<sub> set via textContent. */
export function renderRich(el, text) {
  el.replaceChildren(
    ...parseRich(text ?? '').map(({ t, s }) => {
      if (t === 'text') return document.createTextNode(s);
      const n = document.createElement(t);
      n.textContent = s;
      return n;
    }),
  );
}
