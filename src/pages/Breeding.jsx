import { useState } from 'react';
import { breed } from '../utils/breeding';
import { addCreature } from '../utils/storage';
import { Dna, Sparkles, X } from 'lucide-react';
import CreatureCard from '../components/CreatureCard';

export default function Breeding({ creatures, setCreatures, setPage }) {
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);
  const [child, setChild] = useState(null);
  const [selecting, setSelecting] = useState(null);
  const [show, setShow] = useState(false);

  function doBreed() {
    if (!p1 || !p2 || p1.id === p2.id) return;
    setChild(breed(p1, p2));
    setShow(false);
    setTimeout(() => setShow(true), 100);
  }

  function saveChild() {
    if (!child) return;
    setCreatures(addCreature(child));
    setChild(null); setP1(null); setP2(null); setShow(false);
  }

  if (creatures.length < 2) {
    return (
      <div className="bg-radial" style={{minHeight:'calc(100vh - 56px)', padding:'2rem', maxWidth:700, margin:'0 auto', textAlign:'center'}}>
        <h1 style={{fontSize:'1.5rem', fontWeight:900, letterSpacing:'0.02em', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem', marginBottom:'2rem'}}>
          <span style={{color:'var(--color-neon2)'}}>🧬</span> BREEDING LAB
        </h1>
        <div className="panel" style={{padding:'4rem 2rem'}}>
          <div style={{fontSize:'3.5rem', marginBottom:'1rem'}}>🥚</div>
          <p style={{fontSize:'1.1rem', marginBottom:'0.5rem', color:'var(--color-text2)'}}>Need at least 2 creatures</p>
          <p style={{fontSize:'0.85rem', marginBottom:'2rem', color:'var(--color-text3)'}}>Current: {creatures.length} creature{creatures.length !== 1 ? 's' : ''}</p>
          <button onClick={() => setPage('lab')} className="btn btn-primary"><Dna size={16} /> Go to Lab</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-radial" style={{minHeight:'calc(100vh - 56px)', padding:'2rem', maxWidth:1100, margin:'0 auto'}}>
      <h1 style={{fontSize:'1.5rem', fontWeight:900, letterSpacing:'0.02em', display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'2.5rem'}}>
        <span style={{color:'var(--color-neon2)'}}>🧬</span> BREEDING LAB
      </h1>

      <div style={{display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:'2rem', alignItems:'start', marginBottom:'2.5rem'}}>
        {/* Parent 1 */}
        <div>
          <h3 style={{fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--color-text3)'}}>PARENT 1</h3>
          {p1 ? (
            <div style={{position:'relative'}}>
              <CreatureCard creature={p1} compact />
              <button onClick={() => { setP1(null); setChild(null); }} style={{position:'absolute', top:12, right:12, padding:4, borderRadius:8, background:'transparent', border:'none', color:'#ff4444', cursor:'pointer'}}><X size={14} /></button>
            </div>
          ) : (
            <button onClick={() => setSelecting('p1')} className="panel" style={{width:'100%', padding:'2.5rem', textAlign:'center', cursor:'pointer', border:'2px dashed var(--color-border)', background:'transparent'}}>
              <div style={{fontSize:'2.5rem', marginBottom:'0.5rem', opacity:0.4}}>➕</div>
              <div style={{fontSize:'0.85rem', color:'var(--color-text3)'}}>Select Parent 1</div>
            </button>
          )}
        </div>

        {/* Center */}
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem', paddingTop:'3rem'}}>
          <div style={{fontSize:'3rem', color:'var(--color-neon2)', opacity:0.5}}>×</div>
          <button onClick={doBreed} disabled={!p1 || !p2 || p1.id === p2.id} className="btn btn-primary" style={{padding:'10px 2rem'}}>
            <Dna size={16} /> Breed
          </button>
        </div>

        {/* Parent 2 */}
        <div>
          <h3 style={{fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--color-text3)'}}>PARENT 2</h3>
          {p2 ? (
            <div style={{position:'relative'}}>
              <CreatureCard creature={p2} compact />
              <button onClick={() => { setP2(null); setChild(null); }} style={{position:'absolute', top:12, right:12, padding:4, borderRadius:8, background:'transparent', border:'none', color:'#ff4444', cursor:'pointer'}}><X size={14} /></button>
            </div>
          ) : (
            <button onClick={() => setSelecting('p2')} className="panel" style={{width:'100%', padding:'2.5rem', textAlign:'center', cursor:'pointer', border:'2px dashed var(--color-border)', background:'transparent'}}>
              <div style={{fontSize:'2.5rem', marginBottom:'0.5rem', opacity:0.4}}>➕</div>
              <div style={{fontSize:'0.85rem', color:'var(--color-text3)'}}>Select Parent 2</div>
            </button>
          )}
        </div>
      </div>

      {child && show && (
        <div className="anim-slide-up" style={{maxWidth:500, margin:'0 auto'}}>
          <div style={{display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.25rem'}}>
            <Sparkles size={20} style={{color:'var(--color-neon2)'}} />
            <h2 style={{fontSize:'1.1rem', fontWeight:900, letterSpacing:'0.02em'}}>NEW OFFSPRING</h2>
          </div>
          <CreatureCard creature={child} showParents />
          <div style={{display:'flex', gap:'1rem', marginTop:'1.25rem'}}>
            <button onClick={saveChild} className="btn btn-primary" style={{flex:1}}><Sparkles size={14} /> Save to Collection</button>
            <button onClick={doBreed} className="btn btn-ghost">Rebreed</button>
          </div>
        </div>
      )}

      {selecting && (
        <div style={{position:'fixed', inset:0, zIndex:60, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)'}}>
          <div className="panel anim-slide-up" style={{padding:'2rem', width:900, maxHeight:'80vh', overflowY:'auto'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem'}}>
              <h3 style={{fontWeight:700, letterSpacing:'0.02em'}}>SELECT {selecting === 'p1' ? 'PARENT 1' : 'PARENT 2'}</h3>
              <button onClick={() => setSelecting(null)} className="btn btn-ghost text-xs"><X size={14} /> Close</button>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'1rem'}}>
              {creatures.filter(c => selecting === 'p1' ? c.id !== p2?.id : c.id !== p1?.id).map(c => (
                <div key={c.id} onClick={() => {
                  if (selecting === 'p1') setP1(c); else setP2(c);
                  setSelecting(null); setChild(null); setShow(false);
                }}>
                  <CreatureCard creature={c} compact />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
