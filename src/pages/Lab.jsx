import { useState } from 'react';
import { PRESET_CREATURES, RARITY_COLORS } from '../data/creatures';
import { ELEMENTS } from '../data/elements';
import { generateCreature } from '../utils/ai';
import { addCreature } from '../utils/storage';
import CreatureCard from '../components/CreatureCard';
import { Plus, Wand2, Search, Loader2, Check, AlertCircle, X } from 'lucide-react';

export default function Lab({ mode, settings, creatures, setCreatures }) {
  const [tab, setTab] = useState('preset');
  const [search, setSearch] = useState('');
  const [filterElem, setFilterElem] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiSuccess, setAiSuccess] = useState('');
  const [detailCreature, setDetailCreature] = useState(null);

  const filtered = PRESET_CREATURES.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterElem && c.element !== filterElem) return false;
    return true;
  });

  function addToCollection(preset) {
    if (creatures.find(c => c.id === preset.id)) return;
    const updated = addCreature({ ...preset, createdAt: Date.now() });
    setCreatures(updated);
  }

  async function handleAIGenerate() {
    if (!aiPrompt.trim()) return;
    if (!settings.apiKey) { setAiError('API key required. Open Settings.'); return; }
    setAiLoading(true); setAiError(''); setAiSuccess('');
    try {
      const creature = await generateCreature(aiPrompt, settings.apiKey);
      const updated = addCreature(creature);
      setCreatures(updated);
      setAiSuccess(`${creature.name} created!`);
      setAiPrompt('');
    } catch (err) { setAiError(err.message); }
    finally { setAiLoading(false); }
  }

  const ownedIds = new Set(creatures.map(c => c.id));

  return (
    <div className="bg-radial" style={{minHeight:'calc(100vh - 56px)', padding:'2rem', maxWidth:1300, margin:'0 auto'}}>
      {/* Header */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem'}}>
        <div>
          <h1 style={{fontSize:'1.5rem', fontWeight:900, letterSpacing:'0.02em', display:'flex', alignItems:'center', gap:'0.75rem'}}>
            <span style={{color:'var(--color-neon)'}}>🧪</span> CREATURE LAB
          </h1>
          <p style={{fontSize:'0.75rem', marginTop:'0.25rem', color:'var(--color-text2)'}}>{PRESET_CREATURES.length} preset creatures available</p>
        </div>
        {mode === 'ai' && (
          <div style={{display:'flex', gap:'0.5rem'}}>
            <button onClick={() => setTab('preset')} className={`btn text-xs ${tab === 'preset' ? 'btn-primary' : 'btn-ghost'}`}>Presets</button>
            <button onClick={() => setTab('ai')} className={`btn text-xs ${tab === 'ai' ? 'btn-ai' : 'btn-ghost'}`}>
              <Wand2 size={13} /> AI Generator
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      {tab === 'preset' && (
        <div style={{display:'flex', gap:'1rem', marginBottom:'2rem'}}>
          <div style={{flex:1, position:'relative'}}>
            <Search size={15} style={{position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', color:'var(--color-text3)'}} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search creatures..." className="input" style={{paddingLeft:44}} />
          </div>
          <div style={{display:'flex', gap:'0.5rem', flexWrap:'wrap'}}>
            <button onClick={() => setFilterElem('')} className={`btn text-xs ${!filterElem ? 'btn-primary' : 'btn-ghost'}`}>All</button>
            {Object.entries(ELEMENTS).map(([k,v]) => (
              <button key={k} onClick={() => setFilterElem(k)} className={`btn text-xs ${filterElem === k ? '' : 'btn-ghost'}`}
                style={filterElem === k ? {background:v.color+'12', border:`1px solid ${v.color}44`, color:v.color} : {}}>
                {v.icon}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preset Grid */}
      {tab === 'preset' && (
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'1.25rem'}}>
          {filtered.map(c => {
            const owned = ownedIds.has(c.id);
            return (
              <div key={c.id} style={{position:'relative'}} className="group">
                <CreatureCard creature={c} onClick={() => setDetailCreature(c)} />
                <button
                  onClick={(e) => { e.stopPropagation(); addToCollection(c); }}
                  disabled={owned}
                  className={`btn text-xs ${owned ? 'btn-ghost' : 'btn-primary'}`}
                  style={{position:'absolute', top:20, right:20}}
                >
                  {owned ? <><Check size={12} /> Owned</> : <><Plus size={12} /> Add</>}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* AI Generator */}
      {tab === 'ai' && mode === 'ai' && (
        <div style={{maxWidth:700, margin:'0 auto'}}>
          <div className="panel" style={{padding:'2rem', marginBottom:'2rem', border:'1px solid rgba(153,51,255,0.2)'}}>
            <h2 style={{fontSize:'1.1rem', fontWeight:700, marginBottom:'0.5rem', display:'flex', alignItems:'center', gap:'0.5rem'}}>
              <Wand2 size={20} style={{color:'#9933ff'}} /> AI Creature Generator
            </h2>
            <p style={{fontSize:'0.85rem', marginBottom:'1.5rem', color:'var(--color-text2)'}}>
              Describe your creature in natural language. MiMo AI generates stats, abilities, and lore.
            </p>
            <textarea
              value={aiPrompt} onChange={e => setAiPrompt(e.target.value)}
              placeholder="e.g. A crystal phoenix that breathes prismatic fire and heals with its tears. Rare, high attack but fragile defense."
              className="input" style={{height:120, resize:'none'}}
            />
            {aiError && <div style={{display:'flex', alignItems:'center', gap:'0.5rem', marginTop:'0.75rem', fontSize:'0.85rem', color:'#ff4444'}}><AlertCircle size={14} /> {aiError}</div>}
            {aiSuccess && <div style={{display:'flex', alignItems:'center', gap:'0.5rem', marginTop:'0.75rem', fontSize:'0.85rem', color:'var(--color-neon)'}}><Check size={14} /> {aiSuccess}</div>}
            <button onClick={handleAIGenerate} disabled={aiLoading || !aiPrompt.trim()} className="btn btn-ai" style={{marginTop:'1.25rem'}}>
              {aiLoading ? <><Loader2 size={15} className="animate-spin" /> Generating...</> : <><Wand2 size={15} /> Generate Creature</>}
            </button>
          </div>

          {creatures.filter(c => c.isAI).length > 0 && (
            <div>
              <h3 style={{fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--color-text3)'}}>YOUR AI CREATURES</h3>
              <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'1.25rem'}}>
                {creatures.filter(c => c.isAI).map(c => <CreatureCard key={c.id} creature={c} showParents />)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {detailCreature && (
        <div style={{position:'fixed', inset:0, zIndex:60, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)'}}>
          <div className="panel anim-slide-up" style={{padding:'2rem', width:520, border:`1px solid ${ELEMENTS[detailCreature.element]?.color}33`}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem'}}>
              <h2 style={{fontWeight:900, fontSize:'1.25rem', color: RARITY_COLORS[detailCreature.rarity]}}>{detailCreature.name}</h2>
              <button onClick={() => setDetailCreature(null)} style={{padding:8, borderRadius:8, background:'transparent', border:'none', color:'var(--color-text)', cursor:'pointer'}}><X size={18} /></button>
            </div>
            <CreatureCard creature={detailCreature} />
            <div style={{display:'flex', gap:'0.75rem', marginTop:'1rem'}}>
              <button onClick={() => { addToCollection(detailCreature); setDetailCreature(null); }} className="btn btn-primary" style={{flex:1}} disabled={ownedIds.has(detailCreature.id)}>
                {ownedIds.has(detailCreature.id) ? <><Check size={14} /> Already Owned</> : <><Plus size={14} /> Add to Collection</>}
              </button>
              <button onClick={() => setDetailCreature(null)} className="btn btn-ghost">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
