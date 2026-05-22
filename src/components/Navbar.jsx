import { Dna, Swords, Beaker, BookOpen, Settings, Zap, Monitor } from 'lucide-react';

export default function Navbar({ page, setPage, mode, onSettings }) {
  const links = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'lab', label: 'Lab', icon: Beaker },
    { id: 'collection', label: 'Collection', icon: BookOpen },
    { id: 'breeding', label: 'Breeding', icon: Dna },
    { id: 'battle', label: 'Battle', icon: Swords },
  ];

  return (
    <nav style={{position:'fixed', top:0, left:0, right:0, zIndex:50, background:'rgba(5,5,8,0.9)', backdropFilter:'blur(20px)', borderBottom:'1px solid var(--color-border)'}}>
      <div style={{maxWidth:1300, margin:'0 auto', padding:'0 2rem', height:56, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:12, cursor:'pointer'}} onClick={() => setPage('home')}>
          <span style={{fontSize:'1.4rem'}}>🧬</span>
          <span style={{fontWeight:900, fontSize:'0.85rem', letterSpacing:'0.05em', color:'var(--color-neon)'}}>CREATURE LAB</span>
          {mode === 'ai' && (
            <span style={{fontSize:'0.55rem', padding:'2px 8px', borderRadius:20, fontWeight:700, letterSpacing:'0.05em', background:'rgba(153,51,255,0.15)', color:'#bb66ff', border:'1px solid rgba(153,51,255,0.3)'}}>AI</span>
          )}
        </div>

        <div style={{display:'flex', alignItems:'center', gap:4}}>
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              style={{
                padding:'8px 16px',
                borderRadius:8,
                fontSize:'0.8rem',
                fontWeight:500,
                border:'none',
                cursor:'pointer',
                display:'flex',
                alignItems:'center',
                gap:8,
                transition:'all 0.2s',
                background: page === l.id ? 'rgba(0,255,170,0.06)' : 'transparent',
                color: page === l.id ? 'var(--color-neon)' : 'var(--color-text2)',
              }}
            >
              {l.icon && <l.icon size={14} strokeWidth={2} />}
              {l.label}
            </button>
          ))}
          <div style={{width:1, height:24, margin:'0 8px', background:'var(--color-border)'}} />
          <button onClick={onSettings} style={{padding:8, borderRadius:8, background:'transparent', border:'none', color:'var(--color-text2)', cursor:'pointer', transition:'all 0.2s'}}>
            <Settings size={15} />
          </button>
        </div>
      </div>
    </nav>
  );
}
