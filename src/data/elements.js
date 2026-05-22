export const ELEMENTS = {
  fire:  { name: 'Fire',  icon: '🔥', color: '#ff4444', strong: ['wind','earth'], weak: ['water','fire'] },
  water: { name: 'Water', icon: '💧', color: '#4488ff', strong: ['fire','earth'],  weak: ['wind','water'] },
  earth: { name: 'Earth', icon: '🌿', color: '#88cc44', strong: ['water','wind'], weak: ['fire','earth'] },
  wind:  { name: 'Wind',  icon: '💨', color: '#88ffcc', strong: ['earth','water'],weak: ['fire','wind'] },
  light: { name: 'Light', icon: '✨', color: '#ffdd44', strong: ['dark'],          weak: ['dark'] },
  dark:  { name: 'Dark',  icon: '🌙', color: '#aa44ff', strong: ['light'],         weak: ['light'] },
};

export function getElementAdvantage(atk, def) {
  const a = ELEMENTS[atk];
  if (!a) return 1;
  if (a.strong.includes(def)) return 1.5;
  if (a.weak.includes(def)) return 0.67;
  return 1;
}
