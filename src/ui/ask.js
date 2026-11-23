// Sends a visitor question, or a bug report (kind: 'bug'), to the site's own inbox. The caller keeps the text unless ok is true.
const MESSAGES = {
  question: { ok: 'Your question has been sent.', failed: 'The question could not be sent. Your text is still here, so you can try again.' },
  bug: { ok: 'Thanks, your report has been sent.', failed: 'The report could not be sent. Your text is still here, so you can try again.' },
};
const LIMITED = 'You’ve reached the limit for questions and reports. Please try again later.';

/** "Chrome 131 on Windows": name, major version and system only, for bug reports. */
export function browserName(ua) {
  const os = /Windows/.test(ua) ? 'Windows' : /Mac OS X/.test(ua) ? 'macOS' : /CrOS/.test(ua) ? 'ChromeOS' : /Linux/.test(ua) ? 'Linux' : '';
  const safari = ua.match(/Version\/(\d+).*Safari/);
  const [, name, v] = ua.match(/(Edg|Firefox|OPR)\/(\d+)/) || ua.match(/(Chrome)\/(\d+)/) || (safari ? [, 'Safari', safari[1]] : []);
  if (!name) return 'Other browser';
  const label = { Edg: 'Edge', OPR: 'Opera' }[name] || name;
  return `${label} ${v}${os ? ` on ${os}` : ''}`;
}

export async function sendQuestion(payload, fetchImpl = fetch) {
  const m = MESSAGES[payload.kind === 'bug' ? 'bug' : 'question'];
  try {
    // the site sends Referrer-Policy: no-referrer, which would make a POST say Origin: null and be refused
    const res = await fetchImpl('/api/ask', { method: 'POST', referrerPolicy: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.status === 200) return { ok: true, message: m.ok };
    return { ok: false, message: res.status === 429 ? LIMITED : m.failed };
  } catch {
    return { ok: false, message: m.failed };
  }
}

const FORMS = {
  question: {
    min: 5, max: 500, label: 'Your question', field: 'question',
    note: 'Your question is sent with the level and the part you have selected. Camera data is never sent, and no IP address is stored. Answered questions may appear anonymously in the README.',
  },
  bug: {
    min: 10, max: 1000, label: 'What went wrong?', field: 'report', placeholder: 'What went wrong, and what were you trying to do?',
    note: 'Sent with your report: the level, mouse or hands, the view, what was running, your browser and screen size. No camera images, screenshots or IP address.',
  },
};

/**
 * Shows the "send a question" form (kind 'question') or the "report a problem" form (kind 'bug') in `host`,
 * prefilled with `text`. context() gives the fields sent with it: { level, model, part } and, for a bug, its context.
 */
export function openAsk(host, text, context, kind = 'question') {
  const f = FORMS[kind];
  const form = document.createElement('form');
  form.className = 'ask-form';
  const box = document.createElement('textarea');
  box.required = true;
  box.minLength = f.min;
  box.maxLength = f.max;
  box.rows = 3;
  box.value = text;
  if (f.placeholder) box.placeholder = f.placeholder;
  box.setAttribute('aria-label', f.label);
  // honeypot: hidden from people, filled in by simple bots
  const hp = document.createElement('input');
  hp.name = 'website';
  hp.tabIndex = -1;
  hp.autocomplete = 'off';
  hp.setAttribute('aria-hidden', 'true');
  hp.className = 'hp';
  const note = document.createElement('p');
  note.className = 'ask-note';
  note.textContent = f.note;
  const send = document.createElement('button');
  send.type = 'submit';
  send.className = 'ask-btn';
  send.textContent = 'Send';
  const status = document.createElement('p');
  status.className = 'ask-status';
  status.setAttribute('role', 'status');
  form.append(box, hp, note, send, status);
  form.onsubmit = async (e) => {
    e.preventDefault();
    send.disabled = true;
    const r = await sendQuestion({ ...(kind === 'bug' && { kind }), [f.field]: box.value, ...context(), website: hp.value });
    status.textContent = r.message;
    if (r.ok) box.value = ''; // the empty box can't be sent (required), so Send stays usable for the next one
    send.disabled = false;
  };
  host.replaceChildren(form);
  box.focus();
}
