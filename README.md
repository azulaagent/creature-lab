# 🧬 Creature Lab

**AI-Powered Creature Breeding Battle Game**

Create, breed, and battle unique creatures. Two modes: **Normal** with 20 handcrafted presets, or **AI-powered** with infinite generation via [Xiaomi MiMo](https://mimo.xiaomi.com/).

🔗 **Live Demo:** [creature-lab.surge.sh](https://creature-lab.surge.sh)

---

## ✨ Features

### 🧪 Create
- **20 preset creatures** across 6 elements (Fire, Water, Earth, Wind, Light, Dark)
- **4 rarity tiers:** Common, Rare, Epic, Legendary
- **AI Generator:** Describe creatures in natural language, MiMo generates stats, abilities, and lore

### 🧬 Breed
- Combine any 2 creatures to create unique offspring
- Inherited stats, abilities, and traits from both parents
- Random mutation chance for rare offspring
- Name generation algorithm for hybrid creatures

### ⚔️ Battle
- Turn-based strategic combat system
- Elemental advantage mechanics (6 elements, 18 matchups)
- Energy management for abilities
- AI-powered battle narration (every 2 turns in AI mode)
- Shake animations, damage popups, HP/Energy bars

### 🤖 AI Mode
- Natural language creature generation via Xiaomi MiMo API
- Dynamic battle narration powered by MiMo reasoning
- Infinite creature variety from player imagination

---

## 🎮 Game Modes

| Mode | Description | API Required |
|------|-------------|--------------|
| **Normal** | 20 preset creatures, breeding, battle | ❌ No |
| **AI Mode** | AI generation + battle narration | ✅ MiMo API Key |

### Switching Modes
Click ⚙️ **Settings** in the top-right corner to toggle between Normal and AI modes.

### Getting a MiMo API Key
1. Visit [platform.xiaomimimo.com](https://platform.xiaomimimo.com)
2. Register/Login with your account
3. Generate an API key
4. Paste it in Settings → AI Mode → API Key

---

## 🏗️ Tech Stack

- **Frontend:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 + Custom CSS (cyberpunk theme)
- **Icons:** Lucide React
- **AI Backend:** [Xiaomi MiMo API](https://platform.xiaomimimo.com) (mimo-v2.5)
- **State:** localStorage (client-side persistence)
- **Deployment:** [surge.sh](https://surge.sh)
- **Creature Art:** Procedural SVG generation (19 unique shapes)

---

## 📁 Project Structure

```
creature-lab/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── CreatureCard.jsx    # Creature display card
│   │   ├── CreatureArt.jsx     # Procedural SVG art generator
│   │   └── SettingsModal.jsx   # Mode & API key settings
│   ├── data/
│   │   ├── creatures.js        # 20 preset creature definitions
│   │   └── elements.js         # Element system & advantages
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Lab.jsx             # Creature creation (preset + AI)
│   │   ├── Collection.jsx      # Creature management
│   │   ├── Breeding.jsx        # Breeding system
│   │   └── Battle.jsx          # Battle arena
│   ├── utils/
│   │   ├── ai.js               # MiMo API integration
│   │   ├── battle.js           # Battle logic & damage calc
│   │   ├── breeding.js         # Breeding algorithms
│   │   └── storage.js          # localStorage management
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles & animations
├── index.html
├── vite.config.js
└── package.json
```

---

## 🎨 Element System

| Element | Icon | Strong Against | Weak Against |
|---------|------|----------------|--------------|
| 🔥 Fire | `fire` | Wind, Earth | Water, Fire |
| 💧 Water | `water` | Fire, Earth | Wind, Water |
| 🌿 Earth | `earth` | Water, Wind | Fire, Earth |
| 💨 Wind | `wind` | Earth, Water | Fire, Wind |
| ✨ Light | `light` | Dark | Dark |
| 🌙 Dark | `dark` | Light | Light |

**Damage Multiplier:**
- Super effective: ×1.5
- Neutral: ×1.0
- Not very effective: ×0.67

---

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Clone the repo
git clone https://github.com/azulaagent/creature-lab.git
cd creature-lab

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Deploy to surge.sh
surge dist your-domain.surge.sh
```

### Environment Variables
No environment variables needed. The MiMo API key is stored client-side in localStorage via the Settings modal.

---

## 🤖 Xiaomi MiMo Integration

This project integrates with [Xiaomi MiMo](https://mimo.xiaomi.com/) in two ways:

### 1. Creature Generation (AI Mode)
- Players describe creatures in natural language
- MiMo generates structured JSON with stats, abilities, and lore
- Uses `mimo-v2.5` model with `temperature: 0.8` for creative variety

### 2. Battle Narration (AI Mode)
- Every 2 turns, MiMo generates dramatic battle narration
- Converts battle log into exciting narrative text
- Uses `mimo-v2.5` model with `temperature: 0.9`

### API Endpoints Used
```
POST https://api.xiaomimimo.com/v1/chat/completions
Authorization: Bearer <API_KEY>
```

### Why MiMo?
- **Reasoning capability:** MiMo understands complex creature descriptions and generates balanced stats
- **Creativity:** Generates unique abilities and lore that match the creature theme
- **Speed:** Fast inference for real-time battle narration
- **Cost-effective:** Free tier available via [100T Token Program](https://100t.xiaomimimo.com/)

---

## 🏆 Xiaomi MiMo 100T Token Program

This project was built as part of the [**Xiaomi MiMo Orbit 100T Token Creator Incentive Program**](https://100t.xiaomimimo.com/).

### About the Program
- **Duration:** April 28 - May 28, 2026 (30 days)
- **Total Tokens:** 100 trillion tokens distributed globally
- **Target:** High-quality AI-driven projects and users
- **Reward:** Free MiMo API tokens (Token Plan or account credits)

### How This Project Qualifies
1. **AI Integration Depth:** MiMo is core to the gameplay, not just a gimmick
2. **Dual Mode Design:** Demonstrates clear value of AI vs non-AI experience
3. **Production Ready:** Fully deployed and playable
4. **Open Source:** Community can learn from and extend the project

### How to Apply
1. Visit [100t.xiaomimimo.com](https://100t.xiaomimimo.com/)
2. Click "立即申请" (Apply Now)
3. Describe your AI project and how you use MiMo
4. Wait for evaluation (~3 business days)
5. Receive tokens via email notification

### Get Your API Key
1. Visit [platform.xiaomimimo.com](https://platform.xiaomimimo.com)
2. Register with your email
3. Navigate to API Keys section
4. Generate a new key
5. Use it in Creature Lab's Settings

---

## 🎯 Game Mechanics

### Stats
| Stat | Description | Range |
|------|-------------|-------|
| **HP** | Hit Points - health pool | 45-140 |
| **ATK** | Attack - damage output | 30-110 |
| **DEF** | Defense - damage reduction | 30-110 |
| **SPD** | Speed - turn priority | 20-100 |
| **NRG** | Energy - ability cost pool | 40-90 |

### Damage Formula
```
base = ability.power × (attacker.atk / (attacker.atk + defender.def))
damage = base × element_multiplier × random(0.85, 1.15)
```

### Breeding Formula
```
child_stat = avg(parent1, parent2) × random(0.85, 1.15)
rarity = avg(parent_rarities) + bonus_chance
abilities = randomly selected from parents + mutation_chance
```

---

## 📸 Screenshots

### Home Page
Landing page with creature showcase and mode selector.

### Creature Lab
Browse 20 preset creatures or generate new ones with AI.

### Battle Arena
Split-screen combat with real-time HP bars, damage popups, and battle log.

### Breeding Lab
Select parents and create unique offspring.

---

## 📄 License

MIT License - feel free to use, modify, and distribute.

---

## 🙏 Acknowledgments

- [Xiaomi MiMo](https://mimo.xiaomi.com/) - AI model powering creature generation
- [MiMo API Platform](https://platform.xiaomimimo.com/) - API infrastructure
- [100T Token Program](https://100t.xiaomimimo.com/) - Making AI accessible to creators
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next-gen build tool

---

**Built with 🧬 by [azulaagent](https://github.com/azulaagent)**
