import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SettingsModal from './components/SettingsModal';
import Home from './pages/Home';
import Lab from './pages/Lab';
import Collection from './pages/Collection';
import Breeding from './pages/Breeding';
import Battle from './pages/Battle';
import { loadCreatures, loadSettings, saveSettings } from './utils/storage';

export default function App() {
  const [page, setPage] = useState('home');
  const [creatures, setCreatures] = useState([]);
  const [settings, setSettings] = useState({ mode: 'normal', apiKey: '' });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setCreatures(loadCreatures());
    setSettings(loadSettings());
  }, []);

  function handleSaveSettings(s) {
    setSettings(s);
    saveSettings(s);
    setShowSettings(false);
  }

  return (
    <div className="scanlines" style={{minHeight:'100vh'}}>
      <Navbar page={page} setPage={setPage} mode={settings.mode} onSettings={() => setShowSettings(true)} />
      <main style={{paddingTop:56}}>
        {page === 'home' && <Home setPage={setPage} mode={settings.mode} onSettings={() => setShowSettings(true)} />}
        {page === 'lab' && <Lab mode={settings.mode} settings={settings} creatures={creatures} setCreatures={setCreatures} />}
        {page === 'collection' && <Collection creatures={creatures} setCreatures={setCreatures} setPage={setPage} />}
        {page === 'breeding' && <Breeding creatures={creatures} setCreatures={setCreatures} setPage={setPage} />}
        {page === 'battle' && <Battle mode={settings.mode} settings={settings} creatures={creatures} />}
      </main>
      {showSettings && <SettingsModal settings={settings} onSave={handleSaveSettings} onClose={() => setShowSettings(false)} />}
    </div>
  );
}
