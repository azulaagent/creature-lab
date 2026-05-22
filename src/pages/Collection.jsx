import { useState } from 'react';
import { ELEMENTS } from '../data/elements';
import { RARITY_COLORS, RARITY_LABELS } from '../data/creatures';
import CreatureCard from '../components/CreatureCard';
import { removeCreature } from '../utils/storage';
import { Trash2, Search, Zap } from 'lucide-react';

export default function Collection({ creatures, setCreatures, setPage }) {
  const [search, setSearch] = useState('');
  const [filterRarity, setFilterRarity] = useState('');

  const filtered = creatures.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterRarity && c.rarity !== filterRarity) return false;
    return true;
  });

  function handleRemove(id) {
    if (!confirm('Remove this creature?')) return;
    setCreatures(removeCreature(id));
  }

  const stats = {
    total: creatures.length,
    bred: creatures.filter(c => c.isBred).length,
    ai: creatures.filter(c => c.isAI).length,
    legendary: creatures.filter(c => c.rarity === 'legendary').length,
  };

  return (
    <div className="bg-radial" style={{minHeight:'calc(100vh - 56px)', padding:'2rem', maxWidth:1300, margin:'0 auto'}}>
      <h1 style={{fontSize:'1.5rem', fontWeight:900, letterSpacing:'0.02em', display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'2rem'}}>
        <span style={{color:'var(--color-neon2)'}}>📚</span> COLLECTION
      </h1>

      {/* Stats */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1rem', marginBottom:'2rem'}}>
        {[
          { label: 'TOTAL', value: stats.total, color: 'var(--color-neon)' },
          { label: 'BRED', value: stats.bred, color: 'var(--color-neon2)' },
          { label: 'AI GENERATED', value: stats.ai, color: '#9933ff' },
          { label: 'LEGENDARY', value: stats.legendary, color: '#ffaa00' },
        ].map(s => (
          <div key={s.label} className="panel" style={{padding:'1.25rem', textAlign:'center'}}>
            <div style={{fontSize:'1.8rem', fontWeight:900, color: s.color}}>{s.value}</div>
            <div style={{fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.05em', marginTop:'0.25rem', color:'var(--color-text3)'}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{display:'flex', gap:'1rem', marginBottom:'2rem'}}>
        <div style={{flex:1, position:'relative'}}>
          <Search size={15} style={{position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', color:'var(--color-text3)'}} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search collection..." className="input" style={{paddingLeft:44}} />
        </div>
        <div style={{display:'flex', gap:'0.5rem'}}>
          {['','common','rare','epic','legendary'].map(r => (
            <button key={r} onClick={() => setFilterRarity(r)} className={`btn text-xs ${filterRarity === r ? '' : 'btn-ghost'}`}
              style={filterRarity === r ? {background: (RARITY_COLORS[r]||'var(--color-neon)')+'12', border:`1px solid ${RARITY_COLORS[r]||'var(--color-neon)'}44`, color: RARITY_COLORS[r]||'var(--color-neon)'} : {}}>
              {r ? RARITY_LABELS[r] : 'All'}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{textAlign:'center', padding:'6rem 0'}}>
          <div style={{fontSize:'3.5rem', marginBottom:'1rem'}}>🧬</div>
          <p style={{fontSize:'1.1rem', marginBottom:'0.5rem', color:'var(--color-text2)'}}>{creatures.length === 0 ? 'No creatures yet' : 'No matches'}</p>
          <p style={{fontSize:'0.85rem', marginBottom:'1.5rem', color:'var(--color-text3)'}}>{creatures.length === 0 ? 'Start creating in the Lab' : 'Try a different filter'}</p>
          {creatures.length === 0 && <button onClick={() => setPage('lab')} className="btn btn-primary"><Zap size={14} /> Go to Lab</button>}
        </div>
      ) : (
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'1.25rem'}}>
          {filtered.map(c => (
            <div key={c.id} style={{position:'relative'}} className="group">
              <CreatureCard creature={c} showParents />
              <button onClick={() => handleRemove(c.id)}
                className="btn btn-ghost"
                style={{position:'absolute', top:20, right:20, padding:8, opacity:0, color:'#ff4444', borderColor:'rgba(255,0,0,0.2)'}}
                onMouseEnter={e => e.currentTarget.style.opacity=1}
                onMouseLeave={e => e.currentTarget.style.opacity=0}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
