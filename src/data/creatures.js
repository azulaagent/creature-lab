export const PRESET_CREATURES = [
  {
    id: 'flameling', name: 'Flameling', element: 'fire',
    svgType: 'flame', emoji: '🔥',
    desc: 'A tiny flame spirit born from volcanic eruptions. Playful but dangerous.',
    hp: 70, atk: 85, def: 45, spd: 75, energy: 60,
    abilities: [
      { name: 'Ember Burst', power: 40, cost: 15, element: 'fire', desc: 'Launches concentrated embers' },
      { name: 'Heat Wave', power: 25, cost: 10, element: 'fire', desc: 'Radiates intense heat' },
    ],
    rarity: 'common',
  },
  {
    id: 'aquafin', name: 'Aquafin', element: 'water',
    svgType: 'wave', emoji: '🐋',
    desc: 'A graceful water serpent that controls ocean currents.',
    hp: 90, atk: 60, def: 75, spd: 55, energy: 70,
    abilities: [
      { name: 'Tidal Slam', power: 45, cost: 18, element: 'water', desc: 'Crashes a wave onto the enemy' },
      { name: 'Aqua Shield', power: 0, cost: 12, element: 'water', desc: 'Raises defense with water barrier', effect: 'def_up' },
    ],
    rarity: 'common',
  },
  {
    id: 'terrashell', name: 'Terrashell', element: 'earth',
    svgType: 'mountain', emoji: '🐢',
    desc: 'An ancient turtle with a mountain growing on its shell.',
    hp: 120, atk: 50, def: 95, spd: 30, energy: 80,
    abilities: [
      { name: 'Boulder Toss', power: 50, cost: 20, element: 'earth', desc: 'Hurls a massive boulder' },
      { name: 'Earthquake', power: 35, cost: 15, element: 'earth', desc: 'Shakes the ground beneath' },
    ],
    rarity: 'common',
  },
  {
    id: 'zephyrwisp', name: 'Zephyrwisp', element: 'wind',
    svgType: 'tornado', emoji: '🌪️',
    desc: 'A mischievous wind sprite that rides tornadoes.',
    hp: 60, atk: 70, def: 40, spd: 95, energy: 55,
    abilities: [
      { name: 'Gale Slash', power: 38, cost: 14, element: 'wind', desc: 'Slices with razor wind' },
      { name: 'Tailwind', power: 0, cost: 10, element: 'wind', desc: 'Boosts speed dramatically', effect: 'spd_up' },
    ],
    rarity: 'common',
  },
  {
    id: 'lumifox', name: 'Lumifox', element: 'light',
    svgType: 'star', emoji: '🦊',
    desc: 'A nine-tailed fox that channels pure starlight.',
    hp: 80, atk: 80, def: 60, spd: 80, energy: 65,
    abilities: [
      { name: 'Starfall', power: 42, cost: 16, element: 'light', desc: 'Calls down a shower of stars' },
      { name: 'Radiant Heal', power: -30, cost: 20, element: 'light', desc: 'Heals with warm light', effect: 'heal' },
    ],
    rarity: 'rare',
  },
  {
    id: 'shadowmaw', name: 'Shadowmaw', element: 'dark',
    svgType: 'void', emoji: '🐺',
    desc: 'A wolf made of living shadows. Hunts in complete darkness.',
    hp: 85, atk: 90, def: 50, spd: 70, energy: 60,
    abilities: [
      { name: 'Void Bite', power: 48, cost: 18, element: 'dark', desc: 'Bites with shadowy fangs' },
      { name: 'Dark Veil', power: 0, cost: 12, element: 'dark', desc: 'Cloaks in darkness', effect: 'eva_up' },
    ],
    rarity: 'rare',
  },
  {
    id: 'pyronova', name: 'Pyronova', element: 'fire',
    svgType: 'nova', emoji: '☄️',
    desc: 'A living meteor. Its core temperature exceeds 5000°C.',
    hp: 75, atk: 100, def: 35, spd: 85, energy: 50,
    abilities: [
      { name: 'Meteor Strike', power: 60, cost: 25, element: 'fire', desc: 'Slams into enemy like a meteor' },
      { name: 'Nova Explosion', power: 45, cost: 20, element: 'fire', desc: 'Explodes in a fiery nova' },
    ],
    rarity: 'epic',
  },
  {
    id: 'abysskraken', name: 'Abysskraken', element: 'water',
    svgType: 'kraken', emoji: '🦑',
    desc: 'Terror of the deep. Its tentacles can crush steel.',
    hp: 110, atk: 85, def: 80, spd: 35, energy: 75,
    abilities: [
      { name: 'Tentacle Crush', power: 55, cost: 22, element: 'water', desc: 'Crushes with massive tentacles' },
      { name: 'Ink Cloud', power: 20, cost: 12, element: 'water', desc: 'Blinds enemy, reduces accuracy' },
    ],
    rarity: 'epic',
  },
  {
    id: 'thornweaver', name: 'Thornweaver', element: 'earth',
    svgType: 'tree', emoji: '🌵',
    desc: 'A cactus golem that controls all plant life in the desert.',
    hp: 95, atk: 70, def: 85, spd: 40, energy: 70,
    abilities: [
      { name: 'Thorn Barrage', power: 40, cost: 15, element: 'earth', desc: 'Launches a volley of thorns' },
      { name: 'Root Bind', power: 30, cost: 14, element: 'earth', desc: 'Traps enemy in roots' },
    ],
    rarity: 'rare',
  },
  {
    id: 'stormrider', name: 'Stormrider', element: 'wind',
    svgType: 'bolt', emoji: '🦅',
    desc: 'A thunderbird that commands lightning within hurricanes.',
    hp: 70, atk: 88, def: 45, spd: 90, energy: 55,
    abilities: [
      { name: 'Thunder Dive', power: 50, cost: 20, element: 'wind', desc: 'Dives from the storm with lightning' },
      { name: 'Cyclone', power: 35, cost: 15, element: 'wind', desc: 'Traps enemy in a cyclone' },
    ],
    rarity: 'epic',
  },
  {
    id: 'celestine', name: 'Celestine', element: 'light',
    svgType: 'diamond', emoji: '🦄',
    desc: 'A unicorn born from a dying star. Pure cosmic energy incarnate.',
    hp: 90, atk: 75, def: 70, spd: 75, energy: 90,
    abilities: [
      { name: 'Cosmic Ray', power: 50, cost: 20, element: 'light', desc: 'Fires a beam of starlight' },
      { name: 'Aurora Shield', power: 0, cost: 18, element: 'light', desc: 'Creates a shimmering barrier', effect: 'def_up' },
      { name: 'Starlight Heal', power: -40, cost: 25, element: 'light', desc: 'Heals with starlight', effect: 'heal' },
    ],
    rarity: 'legendary',
  },
  {
    id: 'voidwalker', name: 'Voidwalker', element: 'dark',
    svgType: 'eye', emoji: '👁️',
    desc: 'Exists between dimensions. Its gaze erases reality itself.',
    hp: 80, atk: 95, def: 60, spd: 80, energy: 70,
    abilities: [
      { name: 'Reality Tear', power: 55, cost: 22, element: 'dark', desc: 'Tears a rift in reality' },
      { name: 'Void Drain', power: 35, cost: 16, element: 'dark', desc: 'Drains life force, heals self', effect: 'drain' },
    ],
    rarity: 'legendary',
  },
  {
    id: 'magmadrake', name: 'Magmadrake', element: 'fire',
    svgType: 'dragon', emoji: '🐉',
    desc: "A dragon forged in the earth's core. Its breath melts mountains.",
    hp: 100, atk: 95, def: 70, spd: 50, energy: 65,
    abilities: [
      { name: 'Magma Breath', power: 55, cost: 22, element: 'fire', desc: 'Breathes molten lava' },
      { name: 'Volcanic Armor', power: 0, cost: 15, element: 'fire', desc: 'Coats in cooling magma', effect: 'def_up' },
    ],
    rarity: 'epic',
  },
  {
    id: 'frostbite', name: 'Frostbite', element: 'water',
    svgType: 'crystal', emoji: '❄️',
    desc: 'A crystalline fox made of eternal ice from the north pole.',
    hp: 65, atk: 78, def: 55, spd: 88, energy: 60,
    abilities: [
      { name: 'Ice Shard', power: 42, cost: 16, element: 'water', desc: 'Launches razor-sharp ice' },
      { name: 'Blizzard', power: 30, cost: 14, element: 'water', desc: 'Summons a blizzard' },
    ],
    rarity: 'rare',
  },
  {
    id: 'irongolem', name: 'Irongolem', element: 'earth',
    svgType: 'cube', emoji: '🗿',
    desc: 'An ancient construct of stone and iron. Nearly indestructible.',
    hp: 140, atk: 60, def: 110, spd: 20, energy: 85,
    abilities: [
      { name: 'Iron Fist', power: 45, cost: 18, element: 'earth', desc: 'Punches with massive iron fists' },
      { name: 'Fortress Mode', power: 0, cost: 20, element: 'earth', desc: 'Maxes defense', effect: 'fortress' },
    ],
    rarity: 'rare',
  },
  {
    id: 'sparkfly', name: 'Sparkfly', element: 'wind',
    svgType: 'spark', emoji: '⚡',
    desc: 'A tiny fly that generates electricity from wing friction.',
    hp: 45, atk: 65, def: 30, spd: 100, energy: 45,
    abilities: [
      { name: 'Static Shock', power: 35, cost: 12, element: 'wind', desc: 'Zaps with static electricity' },
      { name: 'Speed Blitz', power: 25, cost: 10, element: 'wind', desc: 'Ultra-fast multi-hit attack' },
    ],
    rarity: 'common',
  },
  {
    id: 'solarchariot', name: 'Solarchariot', element: 'light',
    svgType: 'sun', emoji: '☀️',
    desc: 'A blazing chariot pulled by miniature suns. Unstoppable force.',
    hp: 85, atk: 90, def: 55, spd: 70, energy: 65,
    abilities: [
      { name: 'Solar Flare', power: 52, cost: 20, element: 'light', desc: 'Unleashes blinding solar energy' },
      { name: 'Daybreak', power: 30, cost: 14, element: 'light', desc: 'Purifying light attack' },
    ],
    rarity: 'epic',
  },
  {
    id: 'nightmare', name: 'Nightmare', element: 'dark',
    svgType: 'crescent', emoji: '🦇',
    desc: 'Born from the worst fears of sleeping children. Feeds on terror.',
    hp: 75, atk: 88, def: 45, spd: 82, energy: 60,
    abilities: [
      { name: 'Night Terror', power: 48, cost: 18, element: 'dark', desc: 'Manifests worst fears as attack' },
      { name: 'Sleep Drain', power: 30, cost: 14, element: 'dark', desc: 'Drains energy from sleeping foe', effect: 'drain' },
    ],
    rarity: 'rare',
  },
  {
    id: 'prismadragon', name: 'Prismadragon', element: 'light',
    svgType: 'prism', emoji: '🐲',
    desc: 'The rarest creature. Its scales refract light into all elements simultaneously.',
    hp: 100, atk: 100, def: 80, spd: 70, energy: 80,
    abilities: [
      { name: 'Prismatic Beam', power: 60, cost: 25, element: 'light', desc: 'Fires a beam of all elements' },
      { name: 'Rainbow Shield', power: 0, cost: 20, element: 'light', desc: 'Absorbs any element attack', effect: 'barrier' },
      { name: 'Elemental Storm', power: 45, cost: 22, element: 'light', desc: 'Unleashes all elements at once' },
    ],
    rarity: 'legendary',
  },
];

export const RARITY_COLORS = {
  common: '#556677',
  rare: '#3399ff',
  epic: '#9933ff',
  legendary: '#ffaa00',
};

export const RARITY_BG = {
  common: 'rgba(85,102,119,0.08)',
  rare: 'rgba(51,153,255,0.08)',
  epic: 'rgba(153,51,255,0.08)',
  legendary: 'rgba(255,170,0,0.08)',
};

export const RARITY_LABELS = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};
