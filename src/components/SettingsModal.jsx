import { useState } from 'react';
import { X, Key, Zap, Monitor } from 'lucide-react';

export default function SettingsModal({ settings, onSave, onClose }) {
  const [mode, setMode] = useState(settings.mode);
  const [apiKey, setApiKey] = useState(settings.apiKey || '');

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center" style={{background:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)'}}>
      <div className="panel p-8 w-[480px] anim-slide-up" style={{border:'1px solid var(--color-border2)'}}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold tracking-wide">SETTINGS</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-all"><X size={18} /></button>
        </div>

        <div className="mb-8">
          <label className="text-xs font-bold tracking-wider mb-4 block" style={{color:'var(--color-text3)'}}>GAME MODE</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setMode('normal')}
              className={`p-5 rounded-xl text-center transition-all ${mode === 'normal' ? 'panel-glow' : 'panel-dark'}`}
            >
              <Monitor size={28} className="mx-auto mb-3" style={{color:'var(--color-neon)'}} />
              <div className="font-bold text-sm">Normal</div>
              <div className="text-xs mt-1" style={{color:'var(--color-text2)'}}>20 preset creatures</div>
            </button>
            <button
              onClick={() => setMode('ai')}
              className={`p-5 rounded-xl text-center transition-all ${mode === 'ai' ? '' : 'panel-dark'}`}
              style={mode === 'ai' ? {border:'1px solid rgba(153,51,255,0.4)', boxShadow:'0 0 20px rgba(153,51,255,0.15)', background:'linear-gradient(135deg, rgba(20,20,42,0.95), rgba(10,10,18,0.98))'} : {}}
            >
              <Zap size={28} className="mx-auto mb-3" style={{color:'#9933ff'}} />
              <div className="font-bold text-sm">AI Mode</div>
              <div className="text-xs mt-1" style={{color:'var(--color-text2)'}}>Generate with MiMo</div>
            </button>
          </div>
        </div>

        {mode === 'ai' && (
          <div className="mb-8">
            <label className="text-xs font-bold tracking-wider mb-3 flex items-center gap-2" style={{color:'var(--color-text3)'}}>
              <Key size={13} /> MIMO API KEY
            </label>
            <input
              type="password" value={apiKey} onChange={e => setApiKey(e.target.value)}
              placeholder="sk-..." className="input"
            />
            <p className="text-[11px] mt-2" style={{color:'var(--color-text3)'}}>
              Get your key at <a href="https://platform.xiaomimimo.com" target="_blank" rel="noopener" style={{color:'#9933ff'}} className="underline">platform.xiaomimimo.com</a>
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={onClose} className="btn btn-ghost flex-1">Cancel</button>
          <button onClick={() => onSave({ mode, apiKey })} className="btn btn-primary flex-1">Save</button>
        </div>
      </div>
    </div>
  );
}
