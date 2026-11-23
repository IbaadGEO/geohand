// Both columns use the same 45 km depth axis. The targets mark two possible boundaries.
const COLUMNS = [
  { title: 'Oceanic', depth: 7, distractor: 22 },
  { title: 'Continental', depth: 38, distractor: 17 },
];

export function showCrustActivity(host, activity, demonstrate = false) {
  host.replaceChildren();
  host.hidden = !activity;
  if (!activity) return;

  const add = (parent, tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    parent.append(node);
    return node;
  };
  const button = (parent, text) => {
    const b = add(parent, 'button', text);
    b.type = 'button';
    return b;
  };
  const feedback = document.createElement('p');
  feedback.className = 'activity-feedback';
  feedback.setAttribute('aria-live', 'polite');

  if (activity === 'transfer') {
    const choices = add(host, 'div', '', 'activity-choices');
    const answer = button(choices, 'Moho');
    answer.onclick = () => {
      feedback.textContent = 'Correct. The Moho is the boundary between crust and mantle. In PREM, compressional waves speed up across it.';
    };
    button(choices, 'Base of the tectonic plate').onclick = () => {
      feedback.textContent = 'Try again. A tectonic plate includes some mantle below the crust. Which boundary sits at the base of the crust?';
    };
    host.append(feedback);
    if (demonstrate) answer.click();
    return;
  }

  const comparison = add(host, 'figure', '', 'crust-comparison');
  add(comparison, 'figcaption', 'Same depth scale in both columns (0–45 km). Each starts at the top of its crust.', 'comparison-caption');
  const columns = add(comparison, 'div', '', 'crust-columns');
  const picks = new Map();
  const targets = [];
  const reveal = () => {
    for (const { node, correct, depth, title } of targets) {
      node.disabled = true;
      node.hidden = !correct;
      if (correct) {
        node.textContent = `Moho · ~${depth} km`;
        node.setAttribute('aria-label', `${title} Moho, about ${depth} kilometres deep`);
      }
    }
    showAnswer.hidden = true;
    feedback.textContent = 'The Moho marks the base of each crustal column. The continental column is thicker, so its Moho is deeper below the top of the crust. These are representative values. Local thickness varies.';
  };

  for (const { title, depth, distractor } of COLUMNS) {
    const column = add(columns, 'div', '', 'crust-column');
    add(column, 'b', title);
    const profile = add(column, 'div', '', 'crust-profile');
    profile.style.setProperty('--contact', `${(depth / 45) * 100}%`);
    for (const [index, candidate] of [depth, distractor].sort((a, b) => a - b).entries()) {
      const node = button(profile, String(index + 1));
      const correct = candidate === depth;
      targets.push({ node, correct, depth, title });
      node.className = 'boundary-choice';
      node.style.top = `${(candidate / 45) * 100}%`;
      node.setAttribute('aria-label', `${title} crust, ${index === 0 ? 'shallower' : 'deeper'} line`);
      node.setAttribute('aria-pressed', 'false');
      node.onclick = () => {
        picks.get(title)?.node.setAttribute('aria-pressed', 'false');
        picks.set(title, { node, correct });
        node.setAttribute('aria-pressed', 'true');
        if (picks.size < COLUMNS.length) feedback.textContent = 'Now select the line in the other column.';
        else if ([...picks.values()].every((pick) => pick.correct)) reveal();
        else feedback.textContent = 'Try again. Find where the lighter crust meets the darker mantle in each column.';
      };
    }
  }
  const showAnswer = button(host, 'Show the Moho');
  showAnswer.onclick = reveal;
  host.append(feedback);
  if (demonstrate) reveal();
}
