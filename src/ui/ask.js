// Sends a visitor question to the site's own inbox. The caller keeps the text unless ok is true.
const MESSAGES = {
  ok: 'Thanks, your question was sent.',
  limited: "You've sent a lot of questions. Please try again later.",
  failed: "Couldn't send right now. Your question is still here, try again.",
};

export async function sendQuestion(payload, fetchImpl = fetch) {
  try {
    const res = await fetchImpl('/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.status === 200) return { ok: true, message: MESSAGES.ok };
    return { ok: false, message: res.status === 429 ? MESSAGES.limited : MESSAGES.failed };
  } catch {
    return { ok: false, message: MESSAGES.failed };
  }
}

/** Shows the "send a question" form in `host`, prefilled with `text`. context() gives { level, model, part }. */
export function openAsk(host, text, context) {
  const form = document.createElement('form');
  form.className = 'ask-form';
  const box = document.createElement('textarea');
  box.maxLength = 500;
  box.rows = 3;
  box.value = text;
  box.setAttribute('aria-label', 'Your question');
  // honeypot: hidden from people, filled in by simple bots
  const hp = document.createElement('input');
  hp.name = 'website';
  hp.tabIndex = -1;
  hp.autocomplete = 'off';
  hp.setAttribute('aria-hidden', 'true');
  hp.className = 'hp';
  const note = document.createElement('p');
  note.className = 'ask-note';
  note.textContent =
    'Only the words you type are sent, only when you press Send. Never camera data. No IP address is stored. Answered questions may be published anonymously in the README.';
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
    const r = await sendQuestion({ question: box.value, ...context(), website: hp.value });
    status.textContent = r.message;
    if (r.ok) box.value = '';
    else send.disabled = false;
  };
  host.replaceChildren(form);
  box.focus();
}
