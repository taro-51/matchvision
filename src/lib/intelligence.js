const STORAGE_KEY = "matchvisionLatestAnalysis";

export const defaultIntelligence = {
  sourceFile: "Springvale_U11_vs_Oakleigh_AI_Demo.mp4",
  completedAt: "2026-07-27T10:30:00.000Z",
  match: { home: "Springvale City U11 Wallabies", away: "Oakleigh United U11", score: "3–2", venue: "Ross Reserve", pitch: "Pitch 1", coach: "Lisa Pitsos" },
  findings: { possession: "57%", shots: 8, passAccuracy: "78%", recoveryTime: "6.8 sec", priority: "Defensive transitions", teamCompactness: "Needs work", attackingStrength: "Right-side combinations" },
  player: {
    id: "ava", name: "Ava Thompson", rating: "8.6",
    summary: "Ava is scanning earlier, creating more chances from the right and recovering quickly after possession changes.",
    parentSummary: "Ava is growing in confidence and making more positive decisions. Her next focus is controlling the ball cleanly when an opponent is close.",
    coachFeedback: "Excellent awareness before receiving. Continue developing first touch under pressure and earlier back-post runs.",
    goals: ["Complete 20 first-touch repetitions at each session", "Use the left foot in three combinations per match", "Attack the back post on opposite-side crosses"],
    progress: 76,
  },
  recommendedSession: { title: "Defensive transitions and compact recovery", duration: "70 minutes", drills: ["Recovery Defending: 2v1", "Compact Shape: 4v4 + Targets", "Six-Second Transition Game"] },
  equipment: ["12 size 4 footballs", "24 flat markers", "14 bibs", "4 mini goals"],
  club: { analysedMatches: 147, developmentTrend: "+8%", engagement: "76%", equipmentReadiness: "92%" },
};

export function getIntelligence() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return stored ? { ...defaultIntelligence, ...stored, findings: { ...defaultIntelligence.findings, ...stored.findings }, player: { ...defaultIntelligence.player, ...stored.player }, club: { ...defaultIntelligence.club, ...stored.club } } : defaultIntelligence;
  } catch { return defaultIntelligence; }
}

export function saveIntelligence(analysis) {
  const connected = { ...defaultIntelligence, ...analysis, findings: { ...defaultIntelligence.findings, ...analysis.findings }, player: { ...defaultIntelligence.player, ...analysis.player }, club: { ...defaultIntelligence.club, ...analysis.club, analysedMatches: defaultIntelligence.club.analysedMatches + 1 } };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(connected));
    window.dispatchEvent(new CustomEvent("matchvision:intelligence", { detail: connected }));
  } catch { /* The deterministic demo remains available without storage. */ }
  return connected;
}
