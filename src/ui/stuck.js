// The Stuck? menu: go back, replay, jump to the step you're stuck on, ask a question or report a problem.
// Opened by its corner button (click, or point and hold), never by a gesture, so pointing to read can't open it.

/**
 * button, menu: elements. current() returns what is running, or null:
 *   { names: [step names], at: index, back(), replay(), jump(k) }
 * idle: [[label, fn], ...] offered when nothing is running. ask() opens the question box.
 * report(host) shows the report form in `host`, inside the menu.
 */
export function mountStuck(button, menu, { current, idle, ask, report }) {
  const close = () => {
    menu.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  };
  const add = (parent, label, fn, cls = '') => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = cls;
    b.textContent = label;
    b.onclick = () => {
      close();
      fn();
    };
    parent.append(b);
    return b;
  };
  const head = (text) => {
    const h = document.createElement('p');
    h.className = 'stuck-head';
    h.textContent = text;
    menu.append(h);
  };

  function open() {
    menu.replaceChildren();
    const run = current();
    if (run) {
      head('Need help? Choose an option');
      add(menu, 'Return to the previous step', run.back).disabled = run.at <= 0;
      add(menu, 'Repeat this step', run.replay);
      head('Where are you stuck?');
      const list = document.createElement('div');
      list.className = 'stuck-steps';
      menu.append(list);
      run.names.forEach((name, k) => {
        const b = add(list, name, () => run.jump(k), 'step');
        if (k === run.at) b.setAttribute('aria-current', 'step');
      });
    } else {
      head('Need help? Try one of these');
      for (const [label, fn] of idle) add(menu, label, fn);
    }
    add(menu, 'Ask a question', ask);
    add(menu, 'Report a problem', () => {
      menu.replaceChildren();
      head('Report a problem');
      const host = document.createElement('div');
      menu.append(host);
      add(menu, 'Close', () => {}, 'ghost');
      show();
      report(host);
    });
    add(menu, 'Close', () => {}, 'ghost');
    show();
  }
  function show() {
    menu.hidden = false;
    button.setAttribute('aria-expanded', 'true');
  }

  button.onclick = () => (menu.hidden ? open() : close());
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) close();
  });
  return { close };
}
