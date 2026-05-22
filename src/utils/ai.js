const MIMO_API_URL = "https://api.xiaomimimo.com/v1/chat/completions";

export async function generateCreature(prompt, apiKey) {
  if (!apiKey) throw new Error("API key required for AI mode");
  
  const res = await fetch(MIMO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "mimo-v2.5",
      messages: [
        {
          role: "system",
          content: `You are a creature designer for a fantasy game. Generate creatures in STRICT JSON format.
Return ONLY valid JSON, no markdown, no explanation.

Format:
{
  "name": "CreatureName",
  "element": "fire|water|earth|wind|light|dark",
  "emoji": "🐉",
  "desc": "A vivid 1-2 sentence description",
  "hp": 50-140,
  "atk": 30-110,
  "def": 30-110,
  "spd": 20-100,
  "energy": 40-90,
  "abilities": [
    {"name": "AbilityName", "power": 20-65, "cost": 8-28, "element": "fire|water|earth|wind|light|dark", "desc": "What it does", "effect": "optional: heal|def_up|spd_up|eva_up|drain|fortress"}
  ],
  "rarity": "common|rare|epic|legendary"
}

Rules:
- Total stats (hp+atk+def+spd+energy) should be 300-450
- 2-3 abilities per creature
- Keep balanced, don\'t max everything
- Emoji should match the creature theme
- Description should be vivid and creative`
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 500,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`MiMo API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  const content = data.choices[0].message.content;
  
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Invalid response from AI");
  
  const creature = JSON.parse(jsonMatch[0]);
  
  creature.id = "ai_" + Date.now() + "_" + Math.random().toString(36).slice(2,6);
  creature.isAI = true;
  creature.createdAt = Date.now();
  creature.prompt = prompt;
  
  return creature;
}

export async function generateBattleNarration(attacker, defender, log, apiKey) {
  if (!apiKey) return null;
  
  try {
    const res = await fetch(MIMO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mimo-v2.5",
        messages: [
          {
            role: "system",
            content: "You are a dramatic battle narrator for a creature game. Write 2-3 exciting sentences narrating what just happened. Be vivid and use sound effects. Keep it under 100 words."
          },
          { role: "user", content: `Battle log: ${log.map(l => l.text).join(" | ")}` }
        ],
        temperature: 0.9,
        max_tokens: 200,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.choices[0].message.content;
  } catch {
    return null;
  }
}
