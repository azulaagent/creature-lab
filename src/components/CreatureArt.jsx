import { ELEMENTS } from '../data/elements';

const ELEMENT_GRADIENTS = {
  fire: ['#ff2200', '#ff6600', '#ffaa00'],
  water: ['#0044cc', '#0088ff', '#44bbff'],
  earth: ['#225500', '#44aa00', '#88dd44'],
  wind: ['#006644', '#00cc88', '#44ffcc'],
  light: ['#996600', '#ffaa00', '#ffee66'],
  dark: ['#220044', '#6600cc', '#aa44ff'],
};

export default function CreatureArt({ creature, size = 80, animate = true }) {
  const colors = ELEMENT_GRADIENTS[creature.element] || ELEMENT_GRADIENTS.fire;
  const type = creature.svgType || 'flame';
  const animClass = animate ? 'anim-idle' : '';
  
  return (
    <div className={`relative inline-flex items-center justify-center ${animClass}`} style={{width:size,height:size}}>
      {/* Glow background */}
      <div className="absolute inset-0 rounded-full opacity-30 blur-xl" style={{background:`radial-gradient(circle, ${colors[1]}44, transparent)`}} />
      
      <svg width={size} height={size} viewBox="0 0 100 100" className="relative z-10">
        <defs>
          <linearGradient id={`grad-${creature.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="50%" stopColor={colors[1]} />
            <stop offset="100%" stopColor={colors[2]} />
          </linearGradient>
          <radialGradient id={`glow-${creature.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors[2]} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors[0]} stopOpacity="0" />
          </radialGradient>
          <filter id={`blur-${creature.id}`}>
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        
        {/* Outer glow */}
        <circle cx="50" cy="50" r="40" fill={`url(#glow-${creature.id})`} opacity="0.4" />
        
        {type === 'flame' && <Flame colors={colors} id={creature.id} />}
        {type === 'wave' && <Wave colors={colors} id={creature.id} />}
        {type === 'mountain' && <Mountain colors={colors} id={creature.id} />}
        {type === 'tornado' && <Tornado colors={colors} id={creature.id} />}
        {type === 'star' && <Star colors={colors} id={creature.id} />}
        {type === 'void' && <Void colors={colors} id={creature.id} />}
        {type === 'nova' && <Nova colors={colors} id={creature.id} />}
        {type === 'kraken' && <Kraken colors={colors} id={creature.id} />}
        {type === 'tree' && <Tree colors={colors} id={creature.id} />}
        {type === 'bolt' && <Bolt colors={colors} id={creature.id} />}
        {type === 'diamond' && <Diamond colors={colors} id={creature.id} />}
        {type === 'eye' && <Eye colors={colors} id={creature.id} />}
        {type === 'dragon' && <Dragon colors={colors} id={creature.id} />}
        {type === 'crystal' && <Crystal colors={colors} id={creature.id} />}
        {type === 'cube' && <Cube colors={colors} id={creature.id} />}
        {type === 'spark' && <Spark colors={colors} id={creature.id} />}
        {type === 'sun' && <Sun colors={colors} id={creature.id} />}
        {type === 'crescent' && <Crescent colors={colors} id={creature.id} />}
        {type === 'prism' && <Prism colors={colors} id={creature.id} />}
      </svg>
    </div>
  );
}

function Flame({ colors, id }) {
  return <>
    <path d="M50 15 C55 30, 70 35, 65 55 C62 70, 55 78, 50 82 C45 78, 38 70, 35 55 C30 35, 45 30, 50 15Z" fill={`url(#grad-${id})`} opacity="0.9" />
    <path d="M50 30 C53 40, 60 42, 58 55 C56 65, 53 70, 50 72 C47 70, 44 65, 42 55 C40 42, 47 40, 50 30Z" fill={colors[2]} opacity="0.7" />
    <ellipse cx="50" cy="65" rx="8" ry="5" fill={colors[2]} opacity="0.3" />
    <circle cx="46" cy="45" r="2" fill="white" opacity="0.8" />
    <circle cx="54" cy="48" r="1.5" fill="white" opacity="0.6" />
  </>;
}

function Wave({ colors, id }) {
  return <>
    <path d="M15 55 Q25 40, 35 55 Q45 70, 55 55 Q65 40, 75 55 Q85 70, 95 55" fill="none" stroke={`url(#grad-${id})`} strokeWidth="4" strokeLinecap="round" />
    <path d="M10 62 Q22 48, 35 62 Q48 76, 60 62 Q72 48, 85 62 Q92 72, 100 62" fill="none" stroke={colors[1]} strokeWidth="3" opacity="0.5" strokeLinecap="round" />
    <ellipse cx="50" cy="50" rx="18" ry="14" fill={colors[0]} opacity="0.6" />
    <ellipse cx="50" cy="50" rx="12" ry="9" fill={colors[1]} opacity="0.4" />
    <circle cx="44" cy="47" r="2.5" fill="white" opacity="0.7" />
    <circle cx="56" cy="47" r="2.5" fill="white" opacity="0.7" />
    <path d="M42 55 Q50 60, 58 55" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
  </>;
}

function Mountain({ colors, id }) {
  return <>
    <polygon points="50,20 75,70 25,70" fill={colors[0]} opacity="0.8" />
    <polygon points="50,20 60,45 40,45" fill={colors[2]} opacity="0.4" />
    <polygon points="35,35 55,70 15,70" fill={colors[1]} opacity="0.5" />
    <rect x="20" y="70" width="60" height="8" rx="4" fill={colors[0]} opacity="0.6" />
    <circle cx="45" cy="55" r="2" fill="white" opacity="0.6" />
    <circle cx="55" cy="55" r="2" fill="white" opacity="0.6" />
  </>;
}

function Tornado({ colors, id }) {
  return <>
    <ellipse cx="50" cy="25" rx="12" ry="5" fill={colors[1]} opacity="0.4" />
    <ellipse cx="50" cy="40" rx="16" ry="6" fill={colors[1]} opacity="0.5" />
    <ellipse cx="50" cy="55" rx="20" ry="7" fill={colors[0]} opacity="0.6" />
    <ellipse cx="50" cy="70" rx="24" ry="8" fill={colors[0]} opacity="0.7" />
    <circle cx="50" cy="35" r="5" fill={colors[2]} opacity="0.5" />
    <circle cx="46" cy="33" r="1.5" fill="white" opacity="0.7" />
    <circle cx="54" cy="33" r="1.5" fill="white" opacity="0.7" />
  </>;
}

function Star({ colors, id }) {
  return <>
    <polygon points="50,15 56,38 80,38 60,52 68,75 50,60 32,75 40,52 20,38 44,38" fill={`url(#grad-${id})`} opacity="0.9" />
    <polygon points="50,25 54,42 70,42 57,52 62,68 50,58 38,68 43,52 30,42 46,42" fill={colors[2]} opacity="0.5" />
    <circle cx="50" cy="42" r="4" fill="white" opacity="0.3" />
  </>;
}

function Void({ colors, id }) {
  return <>
    <circle cx="50" cy="48" r="28" fill={colors[0]} opacity="0.5" />
    <circle cx="50" cy="48" r="20" fill={colors[1]} opacity="0.4" />
    <circle cx="50" cy="48" r="12" fill={colors[2]} opacity="0.6" />
    <circle cx="50" cy="48" r="5" fill="black" opacity="0.8" />
    <circle cx="48" cy="46" r="1.5" fill="white" opacity="0.8" />
    <path d="M30 30 L25 20 M70 30 L75 20 M30 66 L25 76 M70 66 L75 76" stroke={colors[2]} strokeWidth="2" opacity="0.4" />
  </>;
}

function Nova({ colors, id }) {
  return <>
    <circle cx="50" cy="48" r="18" fill={`url(#grad-${id})`} opacity="0.8" />
    <circle cx="50" cy="48" r="10" fill={colors[2]} opacity="0.6" />
    {[0,45,90,135,180,225,270,315].map(a => (
      <line key={a} x1="50" y1="48" x2={50+Math.cos(a*Math.PI/180)*32} y2={48+Math.sin(a*Math.PI/180)*32} stroke={colors[2]} strokeWidth="2" opacity="0.5" strokeLinecap="round" />
    ))}
    <circle cx="50" cy="48" r="4" fill="white" opacity="0.4" />
  </>;
}

function Kraken({ colors, id }) {
  return <>
    <ellipse cx="50" cy="35" rx="16" ry="14" fill={`url(#grad-${id})`} opacity="0.8" />
    <circle cx="44" cy="32" r="2.5" fill="white" opacity="0.7" />
    <circle cx="56" cy="32" r="2.5" fill="white" opacity="0.7" />
    <path d="M35 45 Q25 60, 20 75" fill="none" stroke={colors[1]} strokeWidth="3" opacity="0.6" strokeLinecap="round" />
    <path d="M42 48 Q35 65, 30 78" fill="none" stroke={colors[1]} strokeWidth="3" opacity="0.5" strokeLinecap="round" />
    <path d="M58 48 Q65 65, 70 78" fill="none" stroke={colors[1]} strokeWidth="3" opacity="0.5" strokeLinecap="round" />
    <path d="M65 45 Q75 60, 80 75" fill="none" stroke={colors[1]} strokeWidth="3" opacity="0.6" strokeLinecap="round" />
  </>;
}

function Tree({ colors, id }) {
  return <>
    <rect x="46" y="50" width="8" height="25" rx="2" fill={colors[0]} opacity="0.7" />
    <circle cx="50" cy="35" r="20" fill={colors[1]} opacity="0.6" />
    <circle cx="40" cy="30" r="12" fill={colors[2]} opacity="0.4" />
    <circle cx="60" cy="32" r="10" fill={colors[0]} opacity="0.4" />
    <circle cx="50" cy="25" r="8" fill={colors[2]} opacity="0.3" />
    <circle cx="46" cy="30" r="1.5" fill="white" opacity="0.6" />
    <circle cx="54" cy="30" r="1.5" fill="white" opacity="0.6" />
  </>;
}

function Bolt({ colors, id }) {
  return <>
    <polygon points="55,15 35,45 48,45 40,80 70,40 55,40 65,15" fill={`url(#grad-${id})`} opacity="0.9" />
    <polygon points="52,25 40,48 50,48 45,70 62,44 52,44 58,25" fill={colors[2]} opacity="0.4" />
    <circle cx="50" cy="40" r="3" fill="white" opacity="0.3" />
  </>;
}

function Diamond({ colors, id }) {
  return <>
    <polygon points="50,15 75,50 50,85 25,50" fill={`url(#grad-${id})`} opacity="0.8" />
    <polygon points="50,25 65,50 50,75 35,50" fill={colors[2]} opacity="0.4" />
    <polygon points="50,35 58,50 50,65 42,50" fill="white" opacity="0.15" />
    <circle cx="50" cy="48" r="3" fill="white" opacity="0.3" />
  </>;
}

function Eye({ colors, id }) {
  return <>
    <ellipse cx="50" cy="48" rx="28" ry="18" fill={colors[0]} opacity="0.5" />
    <ellipse cx="50" cy="48" rx="22" ry="14" fill={colors[1]} opacity="0.4" />
    <circle cx="50" cy="48" r="10" fill={colors[2]} opacity="0.7" />
    <circle cx="50" cy="48" r="4" fill="black" />
    <circle cx="48" cy="46" r="1.5" fill="white" opacity="0.8" />
    <path d="M22 48 Q50 30, 78 48 Q50 66, 22 48" fill="none" stroke={colors[2]} strokeWidth="1.5" opacity="0.5" />
  </>;
}

function Dragon({ colors, id }) {
  return <>
    <ellipse cx="50" cy="45" rx="20" ry="16" fill={`url(#grad-${id})`} opacity="0.8" />
    <polygon points="30,35 22,20 35,30" fill={colors[0]} opacity="0.7" />
    <polygon points="70,35 78,20 65,30" fill={colors[0]} opacity="0.7" />
    <path d="M65 50 Q80 55, 85 65 Q78 60, 70 58" fill={colors[1]} opacity="0.5" />
    <circle cx="42" cy="42" r="3" fill="white" opacity="0.7" />
    <circle cx="58" cy="42" r="3" fill="white" opacity="0.7" />
    <circle cx="42" cy="42" r="1.5" fill={colors[0]} />
    <circle cx="58" cy="42" r="1.5" fill={colors[0]} />
    <path d="M40 52 Q50 58, 60 52" fill="none" stroke={colors[2]} strokeWidth="2" opacity="0.5" />
  </>;
}

function Crystal({ colors, id }) {
  return <>
    <polygon points="50,18 62,40 58,72 42,72 38,40" fill={`url(#grad-${id})`} opacity="0.7" />
    <polygon points="50,28 56,42 54,65 46,65 44,42" fill={colors[2]} opacity="0.4" />
    <polygon points="35,45 50,38 65,45 50,52" fill={colors[1]} opacity="0.3" />
    <line x1="50" y1="18" x2="50" y2="72" stroke="white" strokeWidth="0.5" opacity="0.3" />
    <circle cx="50" cy="42" r="2" fill="white" opacity="0.5" />
  </>;
}

function Cube({ colors, id }) {
  return <>
    <polygon points="50,20 75,35 75,65 50,80 25,65 25,35" fill={`url(#grad-${id})`} opacity="0.7" />
    <polygon points="50,20 75,35 50,50 25,35" fill={colors[2]} opacity="0.3" />
    <polygon points="50,50 75,35 75,65 50,80" fill={colors[0]} opacity="0.4" />
    <line x1="50" y1="20" x2="50" y2="80" stroke="white" strokeWidth="0.5" opacity="0.2" />
    <circle cx="45" cy="42" r="2" fill="white" opacity="0.5" />
    <circle cx="55" cy="42" r="2" fill="white" opacity="0.5" />
  </>;
}

function Spark({ colors, id }) {
  return <>
    <circle cx="50" cy="48" r="10" fill={`url(#grad-${id})`} opacity="0.7" />
    {[0,60,120,180,240,300].map(a => (
      <line key={a} x1={50+Math.cos(a*Math.PI/180)*12} y1={48+Math.sin(a*Math.PI/180)*12} x2={50+Math.cos(a*Math.PI/180)*28} y2={48+Math.sin(a*Math.PI/180)*28} stroke={colors[2]} strokeWidth="2" opacity="0.6" strokeLinecap="round" />
    ))}
    <circle cx="50" cy="48" r="5" fill="white" opacity="0.3" />
    <circle cx="48" cy="46" r="1.5" fill="white" opacity="0.7" />
    <circle cx="52" cy="46" r="1.5" fill="white" opacity="0.7" />
  </>;
}

function Sun({ colors, id }) {
  return <>
    <circle cx="50" cy="48" r="18" fill={`url(#grad-${id})`} opacity="0.8" />
    {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
      <line key={a} x1={50+Math.cos(a*Math.PI/180)*22} y1={48+Math.sin(a*Math.PI/180)*22} x2={50+Math.cos(a*Math.PI/180)*35} y2={48+Math.sin(a*Math.PI/180)*35} stroke={colors[2]} strokeWidth={a%60===0?3:1.5} opacity="0.5" strokeLinecap="round" />
    ))}
    <circle cx="50" cy="48" r="10" fill={colors[2]} opacity="0.4" />
    <circle cx="46" cy="44" r="2" fill="white" opacity="0.6" />
    <circle cx="54" cy="44" r="2" fill="white" opacity="0.6" />
  </>;
}

function Crescent({ colors, id }) {
  return <>
    <circle cx="50" cy="48" r="24" fill={colors[0]} opacity="0.6" />
    <circle cx="58" cy="42" r="20" fill="var(--color-bg)" />
    <circle cx="42" cy="50" r="3" fill={colors[2]} opacity="0.5" />
    <circle cx="36" cy="44" r="2" fill={colors[2]} opacity="0.4" />
    <circle cx="48" cy="56" r="1.5" fill={colors[2]} opacity="0.3" />
    <circle cx="44" cy="48" r="1.5" fill="white" opacity="0.6" />
    <circle cx="40" cy="52" r="1" fill="white" opacity="0.4" />
  </>;
}

function Prism({ colors, id }) {
  return <>
    <polygon points="50,15 78,70 22,70" fill={`url(#grad-${id})`} opacity="0.6" />
    <polygon points="50,25 70,65 30,65" fill={colors[1]} opacity="0.3" />
    <line x1="50" y1="15" x2="78" y2="70" stroke={colors[2]} strokeWidth="1" opacity="0.4" />
    <line x1="50" y1="15" x2="22" y2="70" stroke={colors[2]} strokeWidth="1" opacity="0.4" />
    <line x1="22" y1="70" x2="78" y2="70" stroke={colors[2]} strokeWidth="1" opacity="0.4" />
    <circle cx="50" cy="48" r="5" fill="white" opacity="0.2" />
    {/* Refracted rays */}
    <line x1="78" y1="70" x2="95" y2="55" stroke="#ff3333" strokeWidth="1.5" opacity="0.4" />
    <line x1="78" y1="70" x2="98" y2="65" stroke="#ffaa00" strokeWidth="1.5" opacity="0.4" />
    <line x1="78" y1="70" x2="98" y2="75" stroke="#33ff33" strokeWidth="1.5" opacity="0.4" />
    <line x1="78" y1="70" x2="95" y2="85" stroke="#3399ff" strokeWidth="1.5" opacity="0.4" />
  </>;
}
