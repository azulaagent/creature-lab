const STORAGE_KEY = 'creature_lab_creatures';
const SETTINGS_KEY = 'creature_lab_settings';

export function loadCreatures() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch { return []; }
}

export function saveCreatures(creatures) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(creatures));
}

export function addCreature(creature) {
  const all = loadCreatures();
  all.push(creature);
  saveCreatures(all);
  return all;
}

export function removeCreature(id) {
  const all = loadCreatures().filter(c => c.id !== id);
  saveCreatures(all);
  return all;
}

export function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || { mode: 'normal', apiKey: '' };
  } catch { return { mode: 'normal', apiKey: '' }; }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
