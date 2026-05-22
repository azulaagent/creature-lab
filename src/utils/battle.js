import { getElementAdvantage } from "../data/elements";

export function calcDamage(attacker, defender, ability) {
  const elemAdv = getElementAdvantage(ability.element, defender.element);
  const base = ability.power * (attacker.atk / (attacker.atk + defender.def));
  const variance = 0.85 + Math.random() * 0.3;
  const damage = Math.max(1, Math.round(base * elemAdv * variance));
  return damage;
}

export function applyEffect(caster, ability) {
  const result = { ...caster };
  switch (ability.effect) {
    case 'heal':
      result.hp = Math.min(result.maxHp, result.hp + Math.abs(ability.power));
      return { target: result, msg: `${caster.name} healed for ${Math.abs(ability.power)} HP!` };
    case 'def_up':
      result.def = Math.round(result.def * 1.3);
      return { target: result, msg: `${caster.name}'s defense rose!` };
    case 'spd_up':
      result.spd = Math.round(result.spd * 1.4);
      return { target: result, msg: `${caster.name}'s speed rose!` };
    case 'eva_up':
      result.spd = Math.round(result.spd * 1.25);
      return { target: result, msg: `${caster.name}'s evasion rose!` };
    case 'drain': {
      const healed = Math.round(Math.abs(ability.power) * 0.5);
      result.hp = Math.min(result.maxHp, result.hp + healed);
      return { target: result, msg: `${caster.name} drained and healed ${healed} HP!` };
    }
    case 'fortress':
      result.def = Math.round(result.def * 2);
      result.spd = Math.round(result.spd * 0.3);
      return { target: result, msg: `${caster.name} entered fortress mode!` };
    default:
      return { target: result, msg: '' };
  }
}

export function aiChooseAction(creature) {
  const usable = creature.abilities.filter(a => a.cost <= creature.currentEnergy);
  if (usable.length === 0) {
    return { ability: { name: 'Struggle', power: 15, cost: 0, element: creature.element, desc: 'A desperate attack' }, index: -1 };
  }
  
  const hpRatio = creature.hp / creature.maxHp;
  
  if (hpRatio < 0.3) {
    const heal = usable.find(a => a.effect === 'heal');
    if (heal && creature.currentEnergy >= heal.cost) {
      return { ability: heal, index: creature.abilities.indexOf(heal) };
    }
  }
  
  const best = usable.reduce((a, b) => (b.power * (1 - b.cost/100)) > (a.power * (1 - a.cost/100)) ? b : a);
  return { ability: best, index: creature.abilities.indexOf(best) };
}

export function initBattleState(creature) {
  return {
    ...creature,
    maxHp: creature.hp,
    currentEnergy: creature.energy,
    buffs: [],
    isAlive: true,
  };
}

export function processTurn(attacker, defender, ability, log) {
  const messages = [...log];
  
  if (ability.cost > attacker.currentEnergy) {
    messages.push({ type: 'info', text: `${attacker.name} doesn\'t have enough energy!` });
    return { attacker, defender, log: messages };
  }

  attacker.currentEnergy -= ability.cost;

  if (ability.effect === 'heal' || ability.effect === 'def_up' || ability.effect === 'spd_up' || ability.effect === 'eva_up' || ability.effect === 'fortress') {
    const eff = applyEffect(attacker, ability);
    attacker = eff.target;
    messages.push({ type: 'buff', text: eff.msg, attacker: attacker.name });
  } else {
    let damage = calcDamage(attacker, defender, ability);
    if (ability.effect === 'drain') {
      const healAmt = Math.round(damage * 0.5);
      attacker.hp = Math.min(attacker.maxHp, attacker.hp + healAmt);
      messages.push({ type: 'drain', text: `${attacker.name} drained ${healAmt} HP!`, attacker: attacker.name });
    }
    defender.hp -= damage;
    const elemAdv = getElementAdvantage(ability.element, defender.element);
    let extra = '';
    if (elemAdv > 1) extra = ' Super effective!';
    if (elemAdv < 1) extra = ' Not very effective...';
    messages.push({ type: 'damage', text: `${attacker.name} used ${ability.name}! ${damage} damage!${extra}`, attacker: attacker.name, damage });
    
    if (defender.hp <= 0) {
      defender.hp = 0;
      defender.isAlive = false;
      messages.push({ type: 'ko', text: `${defender.name} fainted!` });
    }
  }

  return { attacker, defender, log: messages };
}
