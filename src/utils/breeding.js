import { ELEMENTS } from "../data/elements";

export function breed(p1, p2) {
  const child = {
    id: "breed_" + Date.now() + "_" + Math.random().toString(36).slice(2,6),
    name: generateBreedName(p1.name, p2.name),
    element: Math.random() > 0.5 ? p1.element : p2.element,
    emoji: pickEmoji(p1, p2),
    desc: `Born from the fusion of ${p1.name} and ${p2.name}. A hybrid with traits from both parents.`,
    hp: avg(p1.hp, p2.hp, 0.9, 1.15),
    atk: avg(p1.atk, p2.atk, 0.85, 1.2),
    def: avg(p1.def, p2.def, 0.85, 1.2),
    spd: avg(p1.spd, p2.spd, 0.85, 1.15),
    energy: avg(p1.energy, p2.energy, 0.9, 1.1),
    abilities: pickAbilities(p1, p2),
    rarity: pickRarity(p1.rarity, p2.rarity),
    parents: [p1.name, p2.name],
    isBred: true,
    createdAt: Date.now(),
  };
  return child;
}

function avg(a, b, min, max) {
  const base = (a + b) / 2;
  const mult = min + Math.random() * (max - min);
  return Math.round(base * mult);
}

function generateBreedName(n1, n2) {
  const p1 = n1.slice(0, Math.ceil(n1.length / 2));
  const p2 = n2.slice(Math.floor(n2.length / 2));
  const suffixes = ['ling', 'ix', 'orn', 'us', 'ra', 'kin', 'on', 'is'];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return (p1 + p2 + suffix).slice(0, 14);
}

function pickEmoji(p1, p2) {
  return Math.random() > 0.5 ? p1.emoji : p2.emoji;
}

function pickAbilities(p1, p2) {
  const all = [...p1.abilities, ...p2.abilities];
  const shuffled = all.sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, 2);
  if (Math.random() > 0.7) {
    picked.push({
      name: 'Hybrid Burst',
      power: 55,
      cost: 22,
      element: Math.random() > 0.5 ? p1.element : p2.element,
      desc: 'A fusion attack combining both parents\' energy',
    });
  }
  return picked;
}

function pickRarity(r1, r2) {
  const order = ['common','rare','epic','legendary'];
  const i1 = order.indexOf(r1);
  const i2 = order.indexOf(r2);
  const avg = Math.round((i1 + i2) / 2);
  const bonus = Math.random() > 0.8 ? 1 : 0;
  return order[Math.min(avg + bonus, 3)];
}
