import { useState, useEffect, useRef } from 'react';
import { PRESET_CREATURES } from '../data/creatures';
import { ELEMENTS } from '../data/elements';
import { initBattleState, processTurn, aiChooseAction } from '../utils/battle';
import { generateBattleNarration } from '../utils/ai';
import CreatureCard from '../components/CreatureCard';
import CreatureArt from '../components/CreatureArt';
import { Swords, RotateCcw, Heart, Battery, Loader2, Zap } from 'lucide-react';

function HpBar({ current, max, height = 10 }) {
  const pct = Math.max(0, (current / max) * 100);
  const color = pct > 50 ? '#ff3344' : pct > 25 ? '#ffaa00' : '#ff2222';
  return (
    <div className="hp-bar-battle" style={{height}}>
      <div className="hp-bar-battle-fill" style={{width:`${pct}%`, background: color}} />
    </div>
  );
}

function EnergyBar({ current, max }) {
  const pct = Math.max(0, (current / max) * 100);
  return (
    <div className="energy-bar-battle">
      <div className="stat-bar-fill" style={{width:`${pct}%`, background:'#ffcc22'}} />
    </div>
  );
}

function BattleCreature({ creature, side, shaking }) {
  const elem = ELEMENTS[creature.element] || {};
  const isLeft = side === 'left';
  return (
    <div style={{flex:1, display:'flex', flexDirection:'column', alignItems: isLeft ? 'flex-start' : 'flex-end'}} className={shaking ? 'anim-shake' : ''}>
      <div style={{display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.75rem', flexDirection: isLeft ? 'row' : 'row-reverse'}}>
        <span style={{fontSize:'1.1rem', fontWeight:900, letterSpacing:'0.02em'}}>{creature.name}</span>
        <span style={{fontSize:'0.65rem', padding:'2px 8px', borderRadius:20, background:elem.color+'15', color:elem.color, border:`1px solid ${elem.color}33`}}>
          {elem.icon} {elem.name}
        </span>
      </div>
      <div style={{width:'100%', maxWidth:260, marginLeft: isLeft ? 0 : 'auto', marginRight: isLeft ? 'auto' : 0}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4}}>
          <div style={{display:'flex', alignItems:'center', gap:6}}><Heart size={12} style={{color:'#ff3344'}} /><span style={{fontSize:'0.65rem', fontWeight:700, color:'#ff3344'}}>HP</span></div>
          <span style={{fontSize:'0.65rem', fontFamily:'monospace', fontWeight:700, color:'#ff3344'}}>{creature.hp}/{creature.maxHp}</span>
        </div>
        <HpBar current={creature.hp} max={creature.maxHp} />
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:6, marginBottom:3}}>
          <div style={{display:'flex', alignItems:'center', gap:6}}><Battery size={11} style={{color:'#ffcc22'}} /><span style={{fontSize:'0.6rem', fontWeight:700, color:'#ffcc22'}}>NRG</span></div>
          <span style={{fontSize:'0.6rem', fontFamily:'monospace', color:'#ffcc22'}}>{creature.currentEnergy}/{creature.energy}</span>
        </div>
        <EnergyBar current={creature.currentEnergy} max={creature.energy} />
      </div>
    </div>
  );
}

export default function Battle({ mode, settings, creatures }) {
  const [phase, setPhase] = useState('select');
  const [player, setPlayer] = useState(null);
  const [enemy, setEnemy] = useState(null);
  const [pState, setPState] = useState(null);
  const [eState, setESState] = useState(null);
  const [log, setLog] = useState([]);
  const [turn, setTurn] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [narration, setNarration] = useState('');
  const [shakeP, setShakeP] = useState(false);
  const [shakeE, setShakeE] = useState(false);
  const [lastDmgE, setLastDmgE] = useState(null);
  const [lastDmgP, setLastDmgP] = useState(null);
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  function startBattle(p, e) {
    setPlayer(p); setEnemy(e);
    setPState(initBattleState(p));
    setESState(initBattleState(e));
    setLog([{ type: 'info', text: `${p.name} enters the arena against ${e.name}!` }]);
    setTurn(1); setPhase('battle'); setNarration('');
  }

  async function handleAbility(abilityIndex) {
    if (animating) return;
    setAnimating(true);
    const ability = abilityIndex === -1
      ? { name: 'Struggle', power: 15, cost: 0, element: pState.element, desc: 'Desperate attack' }
      : pState.abilities[abilityIndex];
    let newLog = [...log];
    newLog.push({ type: 'turn', text: `── Turn ${turn} ──` });

    let result = processTurn(pState, eState, ability, newLog);
    let newP = result.attacker, newE = result.defender;
    newLog = result.log;
    setShakeE(true);
    const lastDmg = newLog.filter(l => l.type === 'damage').pop();
    if (lastDmg) setLastDmgE({ text: `-${lastDmg.damage}`, time: Date.now() });
    setTimeout(() => setShakeE(false), 400);

    if (!newE.isAlive) {
      setPState(newP); setESState(newE); setLog(newLog);
      setTimeout(() => setPhase('win'), 800);
      setAnimating(false); return;
    }
    setPState(newP); setESState(newE); setLog([...newLog]);
    await new Promise(r => setTimeout(r, 600));

    const enemyAction = aiChooseAction(newE);
    result = processTurn(newE, newP, enemyAction.ability, newLog);
    newE = result.attacker; newP = result.defender;
    newLog = result.log;
    setShakeP(true);
    const enemyDmg = newLog.filter(l => l.type === 'damage').pop();
    if (enemyDmg) setLastDmgP({ text: `-${enemyDmg.damage}`, time: Date.now() });
    setTimeout(() => setShakeP(false), 400);

    if (!newP.isAlive) {
      setPState(newP); setESState(newE); setLog(newLog);
      setTimeout(() => setPhase('lose'), 800);
      setAnimating(false); return;
    }
    newP.currentEnergy = Math.min(newP.energy, newP.currentEnergy + 5);
    newE.currentEnergy = Math.min(newE.energy, newE.currentEnergy + 5);
    setPState(newP); setESState(newE); setLog([...newLog]);
    setTurn(t => t + 1);

    if (mode === 'ai' && settings.apiKey && turn % 2 === 0) {
      try {
        const narr = await generateBattleNarration(newP, newE, newLog.slice(-4), settings.apiKey);
        if (narr) setNarration(narr);
      } catch {}
    }
    setAnimating(false);
  }

  // SELECT
  if (phase === 'select') {
    const allCreatures = creatures.length > 0 ? creatures : PRESET_CREATURES;
    return (
      <div className="bg-radial" style={{minHeight:'calc(100vh - 56px)', padding:'2rem', maxWidth:1300, margin:'0 auto'}}>
        <div style={{marginBottom:'2rem'}}>
          <h1 style={{fontSize:'1.5rem', fontWeight:900, letterSpacing:'0.02em', display:'flex', alignItems:'center', gap:'0.75rem'}}>
            <span style={{color:'var(--color-neon3)'}}>⚔️</span> BATTLE ARENA
          </h1>
          <p style={{fontSize:'0.75rem', marginTop:'0.25rem', color:'var(--color-text2)'}}>Choose your fighter to enter the arena</p>
        </div>
        {creatures.length === 0 && (
          <div className="panel" style={{padding:'1rem', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'0.75rem', fontSize:'0.85rem', color:'var(--color-text2)', borderColor:'rgba(0,255,170,0.2)'}}>
            <Zap size={16} style={{color:'var(--color-neon)'}} /> Create creatures in the Lab first, or use preset creatures below.
          </div>
        )}
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'1.25rem'}}>
          {allCreatures.map(c => (
            <div key={c.id}>
              <CreatureCard creature={c} onClick={() => {
                const pool = PRESET_CREATURES.filter(e => e.id !== c.id);
                startBattle(c, pool[Math.floor(Math.random() * pool.length)]);
              }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // RESULT
  if (phase === 'win' || phase === 'lose') {
    return (
      <div className="bg-radial" style={{minHeight:'calc(100vh - 56px)', padding:'2rem', maxWidth:700, margin:'0 auto', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <div className="panel anim-battle-entry" style={{padding:'3rem', width:'100%', textAlign:'center'}}>
          <div style={{fontSize:'4rem', marginBottom:'1.5rem'}}>{phase === 'win' ? '🏆' : '💀'}</div>
          <h2 style={{fontSize:'2.5rem', fontWeight:900, marginBottom:'0.75rem', letterSpacing:'0.02em', color: phase === 'win' ? 'var(--color-neon)' : '#ff3344'}}>
            {phase === 'win' ? 'VICTORY' : 'DEFEATED'}
          </h2>
          <p style={{fontSize:'0.85rem', marginBottom:'2rem', color:'var(--color-text2)'}}>
            {phase === 'win' ? `${pState.name} defeated ${eState.name} in ${turn} turns!` : `${pState.name} fell to ${eState.name}.`}
          </p>
          <button onClick={() => { setPhase('select'); setLog([]); setNarration(''); }} className="btn btn-primary" style={{padding:'10px 2.5rem'}}>
            <RotateCcw size={16} /> New Battle
          </button>
        </div>
        <div className="panel" style={{padding:'1.25rem', marginTop:'1.5rem', width:'100', maxHeight:180, overflowY:'auto'}} ref={logRef}>
          {log.map((l, i) => (
            <div key={i} style={{fontSize:'0.7rem', fontFamily:'monospace', padding:'1px 0', color: l.type === 'damage' ? '#ff3344' : l.type === 'buff' ? 'var(--color-neon)' : l.type === 'ko' ? '#ff3344' : l.type === 'drain' ? '#9933ff' : l.type === 'turn' ? 'var(--color-neon2)' : 'var(--color-text3)', fontWeight: l.type === 'ko' || l.type === 'turn' ? 700 : 400, marginTop: l.type === 'turn' ? 4 : 0}}>
              {l.text}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // BATTLE
  return (
    <div className="bg-radial" style={{minHeight:'calc(100vh - 56px)', padding:'2rem', maxWidth:1000, margin:'0 auto'}}>
      <div style={{textAlign:'center', marginBottom:'1.5rem'}}>
        <span style={{fontSize:'0.65rem', padding:'6px 16px', borderRadius:20, fontWeight:700, letterSpacing:'0.1em', background:'rgba(255,68,136,0.08)', border:'1px solid rgba(255,68,136,0.2)', color:'var(--color-neon3)'}}>
          TURN {turn}
        </span>
      </div>

      <div className="panel" style={{padding:'2rem', marginBottom:'1.5rem', position:'relative', overflow:'hidden', border:'1px solid rgba(255,68,136,0.15)'}}>
        {/* BG effects */}
        <div className="bg-grid" style={{position:'absolute', inset:0, opacity:0.3}} />
        <div style={{position:'absolute', top:0, left:'25%', width:256, height:256, borderRadius:'50%', filter:'blur(100px)', opacity:0.1, background: ELEMENTS[player.element]?.color || '#00ffaa'}} />
        <div style={{position:'absolute', bottom:0, right:'25%', width:256, height:256, borderRadius:'50%', filter:'blur(100px)', opacity:0.1, background: ELEMENTS[enemy.element]?.color || '#ff3333'}} />

        <div style={{position:'relative', zIndex:10, display:'flex', alignItems:'flex-start', gap:'2rem', marginBottom:'2rem'}}>
          {/* Player */}
          <div style={{flex:1, display:'flex', alignItems:'flex-end', gap:'1.25rem'}}>
            <div style={{position:'relative'}}>
              <CreatureArt creature={player} size={120} />
              {lastDmgP && <div key={lastDmgP.time} className="dmg-popup" style={{top:-8, left:'50%', transform:'translateX(-50%)', color:'#ff4444'}}>{lastDmgP.text}</div>}
            </div>
            <BattleCreature creature={pState} side="left" shaking={shakeP} />
          </div>

          {/* VS */}
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem', paddingTop:'2rem'}}>
            <div style={{fontSize:'1.8rem', fontWeight:900, color:'var(--color-neon3)', textShadow:'0 0 20px rgba(255,68,136,0.3)'}}>VS</div>
          </div>

          {/* Enemy */}
          <div style={{flex:1, display:'flex', alignItems:'flex-start', gap:'1.25rem', flexDirection:'row-reverse'}}>
            <div style={{position:'relative'}}>
              <CreatureArt creature={enemy} size={120} />
              {lastDmgE && <div key={lastDmgE.time} className="dmg-popup" style={{top:-8, left:'50%', transform:'translateX(-50%)', color:'#ff4444'}}>{lastDmgE.text}</div>}
            </div>
            <BattleCreature creature={eState} side="right" shaking={shakeE} />
          </div>
        </div>

        {narration && (
          <div className="anim-slide-up" style={{position:'relative', zIndex:10, marginBottom:'1.25rem', padding:'1rem', borderRadius:12, fontSize:'0.85rem', fontStyle:'italic', background:'rgba(153,51,255,0.06)', border:'1px solid rgba(153,51,255,0.15)', color:'#bb88ff'}}>
            ✨ {narration}
          </div>
        )}

        <div ref={logRef} style={{position:'relative', zIndex:10, height:96, overflowY:'auto', marginBottom:'1.5rem', padding:'0.75rem', borderRadius:12, background:'rgba(0,0,0,0.3)'}}>
          {log.map((l, i) => (
            <div key={i} style={{fontSize:'0.7rem', fontFamily:'monospace', padding:'1px 0', color: l.type === 'damage' ? '#ff3344' : l.type === 'buff' ? 'var(--color-neon)' : l.type === 'ko' ? '#ff3344' : l.type === 'drain' ? '#9933ff' : l.type === 'turn' ? 'var(--color-neon2)' : 'var(--color-text3)', fontWeight: l.type === 'ko' || l.type === 'turn' ? 700 : 400, marginTop: l.type === 'turn' ? 4 : 0}}>
              {l.text}
            </div>
          ))}
        </div>

        <div style={{position:'relative', zIndex:10, display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'0.75rem'}}>
          {pState.abilities.map((a, i) => {
            const elem = ELEMENTS[a.element] || {};
            const canUse = pState.currentEnergy >= a.cost;
            return (
              <button key={i} onClick={() => canUse && handleAbility(i)} disabled={animating || !canUse}
                className={`ability-chip ${!canUse ? 'disabled' : ''}`}
                style={{textAlign:'left', borderColor: canUse ? elem.color+'33' : undefined}}>
                <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:4}}>
                  <span style={{fontSize:'0.85rem'}}>{elem.icon}</span>
                  <span style={{fontWeight:700, fontSize:'0.7rem'}}>{a.name}</span>
                </div>
                <div style={{fontSize:'0.6rem', color:'var(--color-text3)'}}>
                  <span style={{color: elem.color}}>P{a.power}</span> · <span style={{color:'#ffcc22'}}>E{a.cost}</span>
                  {a.effect && <span style={{marginLeft:6, color:'#9933ff'}}>{a.effect}</span>}
                </div>
              </button>
            );
          })}
          <button onClick={() => handleAbility(-1)} disabled={animating} className="ability-chip" style={{textAlign:'left'}}>
            <div style={{fontWeight:700, fontSize:'0.7rem', marginBottom:4}}>👊 Struggle</div>
            <div style={{fontSize:'0.6rem', color:'var(--color-text3)'}}>P15 · E0</div>
          </button>
        </div>

        {animating && (
          <div style={{textAlign:'center', marginTop:'1rem', fontSize:'0.7rem', color:'var(--color-text3)'}} className="anim-pulse">
            <Loader2 size={14} style={{display:'inline', animation:'spin 1s linear infinite', marginRight:4}} /> Processing...
          </div>
        )}
      </div>
    </div>
  );
}
