import { ELEMENTS } from '../data/elements';
import { RARITY_COLORS, RARITY_LABELS, RARITY_BG } from '../data/creatures';
import CreatureArt from './CreatureArt';

const STAT_LABELS = { hp: 'HP', atk: 'ATK', def: 'DEF', spd: 'SPD', energy: 'NRG' };
const STAT_COLORS = { hp: '#ff3344', atk: '#ff8833', def: '#3399ff', spd: '#33ffcc', energy: '#ffcc22' };
const STAT_MAX = { hp: 150, atk: 120, def: 120, spd: 110, energy: 100 };

export default function CreatureCard({ creature, onClick, selected, compact, showParents }) {
  const elem = ELEMENTS[creature.element] || {};
  const rColor = RARITY_COLORS[creature.rarity] || '#888';
  const rBg = RARITY_BG[creature.rarity] || 'rgba(255,255,255,0.03)';

  if (compact) {
    return (
      <div onClick={onClick} className={`creature-card ${selected ? 'selected' : ''}`} style={{'--card-accent': elem.color+'44', background: rBg, padding: '16px', minWidth: 140}}>
        <div className="flex justify-center mb-2"><CreatureArt creature={creature} size={60} /></div>
        <div className="text-xs font-bold text-center truncate" style={{color: rColor}}>{creature.name}</div>
        <div className="text-[11px] text-center mt-0.5" style={{color: elem.color}}>{elem.icon} {elem.name}</div>
      </div>
    );
  }

  return (
    <div onClick={onClick} className={`creature-card ${selected ? 'selected' : ''}`} style={{'--card-accent': elem.color+'44', background: rBg}}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <CreatureArt creature={creature} size={56} />
          <div>
            <h3 className="font-bold" style={{color: rColor, fontSize: '1rem'}}>{creature.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] px-2 py-0.5 rounded-full" style={{background: elem.color+'15', color: elem.color, border: `1px solid ${elem.color}33`}}>
                {elem.icon} {elem.name}
              </span>
              <span className="text-[11px] font-medium" style={{color: rColor}}>{RARITY_LABELS[creature.rarity]}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1.5">
          {creature.isAI && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{background:'rgba(153,51,255,0.15)',color:'#bb66ff',border:'1px solid rgba(153,51,255,0.3)'}}>AI</span>}
          {creature.isBred && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{background:'rgba(0,187,255,0.15)',color:'#00bbff',border:'1px solid rgba(0,187,255,0.3)'}}>BRED</span>}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed mb-4" style={{color:'var(--color-text2)'}}>{creature.desc}</p>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-4 p-3 rounded-xl" style={{background:'rgba(0,0,0,0.2)'}}>
        {['hp','atk','def','spd','energy'].map(stat => {
          const val = creature[stat];
          const pct = Math.min(100, (val / STAT_MAX[stat]) * 100);
          return (
            <div key={stat} className="text-center">
              <div className="text-[10px] font-bold tracking-wider mb-1" style={{color:'var(--color-text3)'}}>{STAT_LABELS[stat]}</div>
              <div className="text-sm font-black" style={{color: STAT_COLORS[stat]}}>{val}</div>
              <div className="stat-bar mt-1.5"><div className="stat-bar-fill" style={{width:`${pct}%`, background:STAT_COLORS[stat]}} /></div>
            </div>
          );
        })}
      </div>

      {/* Abilities */}
      <div className="space-y-1.5">
        {creature.abilities.map((a, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-4 text-center">{ELEMENTS[a.element]?.icon || '?'}</span>
            <span className="font-medium flex-1">{a.name}</span>
            <span style={{color:'var(--color-text3)'}}>P{a.power}</span>
            <span style={{color:'var(--color-text3)'}}>E{a.cost}</span>
            {a.effect && <span className="text-[10px] px-1.5 py-0.5 rounded" style={{background:'rgba(153,51,255,0.1)',color:'#9966ff'}}>{a.effect}</span>}
          </div>
        ))}
      </div>

      {showParents && creature.parents && (
        <div className="mt-3 pt-3 text-[11px]" style={{borderTop:'1px solid var(--color-border)', color:'var(--color-text3)'}}>
          Parents: {creature.parents[0]} × {creature.parents[1]}
        </div>
      )}
    </div>
  );
}
