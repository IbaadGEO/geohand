// Level choice: remembered per viewer when the browser allows it, and mapping a selected part across levels.
import { LEVEL_IDS } from './content/levels.js';
import { EARTH } from './content/earth/index.js';

const KEY = 'geohand.level';
const browserStorage = () => {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined; // storage blocked
  }
};

export function loadLevel(storage = browserStorage()) {
  try {
    const v = storage?.getItem(KEY);
    return LEVEL_IDS.includes(v) ? v : null;
  } catch {
    return null;
  }
}

export function saveLevel(id, storage = browserStorage()) {
  try {
    storage?.setItem(KEY, id);
  } catch {
    // blocked storage: the level still applies for this visit
  }
}

/** Same id at the new level, else the nearest ancestor there, else its first child there, else null. */
export function mapPart(fromId, fromLevel, toLevel, content = EARTH) {
  if (!fromId) return null;
  const to = content[toLevel].parts;
  const has = (id) => to.some((p) => p.id === id);
  if (has(fromId)) return fromId;
  const parentOf = (id) => {
    for (const lv of Object.values(content)) {
      const p = lv.parts.find((q) => q.id === id && q.parent);
      if (p) return p.parent;
    }
    return null;
  };
  for (let id = parentOf(fromId); id; id = parentOf(id)) if (has(id)) return id;
  return to.find((p) => p.parent === fromId)?.id ?? null;
}
