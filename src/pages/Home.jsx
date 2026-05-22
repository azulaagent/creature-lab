import { Dna, Swords, Beaker, Sparkles, Zap, Monitor } from 'lucide-react';
import CreatureArt from '../components/CreatureArt';
import { PRESET_CREATURES } from '../data/creatures';

export default function Home({ setPage, mode, onSettings }) {
  const showcase = PRESET_CREATURES.filter(c => ['pyronova','celestine','voidwalker','prismadragon'].includes(c.id));

  const features = [
    { icon: Beaker, title: 'CREATE', desc: 'Design creatures from 20 presets or describe them in natural language with MiMo AI', color: 'var(--color-neon)', bg: 'rgba(0,255,170,0.06)' },
    { icon: Dna, title: 'BREED', desc: 'Combine two creatures to create unique offspring with inherited stats, abilities, and traits', color: 'var(--color-neon2)', bg: 'rgba(0,187,255,0.06)' },
    { icon: Swords, title: 'BATTLE', desc: 'Turn-based strategic combat with elemental advantages, energy management, and AI narration', color: 'var(--color-neon3)', bg: 'rgba(255,68,136,0.06)' },
    { icon: Sparkles, title: 'EVOLVE', desc: 'AI mode generates infinite unique creatures from your imagination. Every creation is one-of-a-kind', color: '#9933ff', bg: 'rgba(153,51,255,0.06)' },
  ];

  return (
    <div className="bg-radial scanlines" style={{minHeight:'calc(100vh - 56px)'}}>
      {/* Hero */}
      <section style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'calc(100vh - 56px)', padding:'0 2rem'}}>
        <div style={{maxWidth:1100, width:'100%', display:'flex', alignItems:'center', gap:'4rem'}}>
          {/* Left */}
          <div style={{flex:1}} className="anim-slide-right">
            <div style={{display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.5rem'}}>
              <span style={{fontSize:'3rem'}}>🧬</span>
              <div>
                <h1 style={{fontSize:'3rem', fontWeight:900, letterSpacing:'-0.02em', lineHeight:1, color:'var(--color-neon)'}}>CREATURE</h1>
                <h1 style={{fontSize:'3rem', fontWeight:900, letterSpacing:'-0.02em', lineHeight:1, color:'var(--color-neon2)'}}>LAB</h1>
              </div>
            </div>
            <p style={{fontSize:'0.95rem', lineHeight:1.7, marginBottom:'2rem', maxWidth:480, color:'var(--color-text2)'}}>
              Create, breed, and battle unique creatures. Two modes:
              <span style={{color:'var(--color-text)'}}> Normal</span> with 20 handcrafted presets, or
              <span style={{color:'#bb66ff'}}> AI-powered</span> with infinite generation via Xiaomi MiMo.
            </p>
            <div style={{display:'flex', gap:'1rem', marginBottom:'2.5rem'}}>
              <button onClick={() => setPage('lab')} className="btn btn-primary" style={{padding:'12px 32px', fontSize:'0.95rem'}}>
                <Beaker size={18} /> Start Creating
              </button>
              <button onClick={() => setPage('battle')} className="btn btn-danger" style={{padding:'12px 32px', fontSize:'0.95rem'}}>
                <Swords size={18} /> Battle
              </button>
            </div>
            <button onClick={onSettings} className="btn btn-ghost" style={{fontSize:'0.75rem'}}>
              {mode === 'ai' ? <Zap size={14} style={{color:'#9933ff'}} /> : <Monitor size={14} />}
              {mode === 'ai' ? 'AI Mode Active' : 'Normal Mode'} · Change
            </button>
          </div>

          {/* Right: showcase */}
          <div style={{flex:1, display:'flex', justifyContent:'center'}} className="anim-slide-left">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem'}}>
              {showcase.map((c, i) => (
                <div key={c.id} className="panel anim-float" style={{padding:'1.5rem', textAlign:'center', animationDelay:`${i*0.5}s`}}>
                  <CreatureArt creature={c} size={80} />
                  <div style={{marginTop:'0.75rem', fontWeight:700, fontSize:'0.85rem', color: c.element === 'fire' ? '#ff3333' : c.element === 'light' ? '#ffcc22' : c.element === 'dark' ? '#9933ff' : '#00ffaa'}}>{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{padding:'0 2rem 5rem'}}>
        <div style={{maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1.5rem'}}>
          {features.map((f, i) => (
            <div key={i} className="panel anim-slide-up" style={{padding:'1.5rem', animationDelay:`${i*0.1}s`, borderColor: f.color+'22'}}>
              <div style={{width:40, height:40, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem', background:f.bg}}>
                <f.icon size={20} style={{color: f.color}} />
              </div>
              <h3 style={{fontWeight:900, fontSize:'0.8rem', letterSpacing:'0.05em', marginBottom:'0.5rem', color: f.color}}>{f.title}</h3>
              <p style={{fontSize:'0.75rem', lineHeight:1.6, color:'var(--color-text2)'}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{textAlign:'center', padding:'2rem', fontSize:'0.7rem', color:'var(--color-text3)', borderTop:'1px solid var(--color-border)'}}>
        Powered by <span style={{color:'#9933ff'}}>Xiaomi MiMo</span> · Creature Lab v1.0
      </footer>
    </div>
  );
}
