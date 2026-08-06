import { defaultIntelligence } from "./intelligence";

const ARCHIVE_KEY = "matchvisionMatchWorkspaces";

const baseSquad = [
  { id: "james", name: "James Smith", number: 9, position: "Striker", initials: "JS", rating: 8.9, minutes: 60, first: 30, second: 30, bench: 0, on: "Started", off: "Full time", goals: 2, assists: 0, trend: "+0.7" },
  { id: "ava", name: "Ava Thompson", number: 10, position: "Attacking Midfielder", initials: "AT", rating: 8.7, minutes: 52, first: 30, second: 22, bench: 8, on: "Started", off: "52'", goals: 1, assists: 1, trend: "+0.5" },
  { id: "mia", name: "Mia Rodriguez", number: 8, position: "Central Midfielder", initials: "MR", rating: 8.4, minutes: 55, first: 30, second: 25, bench: 5, on: "Started", off: "55'", goals: 0, assists: 1, trend: "+0.4" },
  { id: "lily-chen", name: "Lily Chen", number: 4, position: "Defender", initials: "LC", rating: 8.2, minutes: 60, first: 30, second: 30, bench: 0, on: "Started", off: "Full time", goals: 0, assists: 0, trend: "+0.3" },
  { id: "emily", name: "Emily Jones", number: 7, position: "Right Wing", initials: "EJ", rating: 8.4, minutes: 45, first: 30, second: 15, bench: 15, on: "Started", off: "45'", goals: 0, assists: 1, trend: "+0.6" },
  { id: "noah", name: "Noah Wilson", number: 6, position: "Central Midfielder", initials: "NW", rating: 7.9, minutes: 38, first: 8, second: 30, bench: 22, on: "22'", off: "Full time", goals: 0, assists: 0, trend: "+0.2" },
];

export function getMatchWorkspaces() {
  try { return JSON.parse(localStorage.getItem(ARCHIVE_KEY) || "{}"); } catch { return {}; }
}

export function createMatchWorkspace(matchRecord, intelligence = defaultIntelligence) {
  const title = matchRecord.title || `${intelligence.match.home} ${intelligence.match.score} ${intelligence.match.away}`;
  const seed = String(matchRecord.id).split("").reduce((total, character) => total + character.charCodeAt(0), 0);
  const possession = Number.parseInt(intelligence.findings?.possession, 10) || 57;
  const squad = baseSquad.map((player, index) => ({
    ...player,
    rating: Number(Math.max(6.5, player.rating - ((seed + index) % 4) * 0.1).toFixed(1)),
    trend: `${(0.2 + ((seed + index) % 6) / 10).toFixed(1)}`.replace(/^/, "+"),
  }));
  return {
    version: 1,
    id: String(matchRecord.workspaceId || matchRecord.id),
    matchId: matchRecord.id,
    sourceFile: intelligence.sourceFile || matchRecord.sourceFile || "Analysed match video",
    generatedAt: intelligence.completedAt || matchRecord.completedAt || new Date().toISOString(),
    match: { ...intelligence.match, title, date: matchRecord.date, score: intelligence.match?.score || title.match(/\d+[–-]\d+/)?.[0] || "3–2" },
    summary: `MatchVision identified ${intelligence.findings?.attackingStrength || "positive attacking combinations"} and ${intelligence.findings?.priority?.toLowerCase() || "defensive transition"} as the clearest next development priority.`,
    confidence: 94,
    teamStats: [["Possession", `${possession}%`], ["Pass accuracy", intelligence.findings?.passAccuracy || "78%"], ["Shots", String(intelligence.findings?.shots || 8)], ["On target", "5"], ["Recoveries", "41"], ["Final-third entries", "24"]],
    highlights: matchRecord.highlights || 11,
    squad,
    coachRecommendation: intelligence.recommendedSession?.title || "Defensive transitions and compact recovery",
    developmentInsights: ["First touch under pressure", "Recovery speed after turnovers", "Scanning before receiving"],
    footballIntelligence: { priority: intelligence.findings?.priority || "Defensive transitions", compactness: intelligence.findings?.teamCompactness || "Needs work", strength: intelligence.findings?.attackingStrength || "Right-side combinations" },
    opponentIntelligence: { opponent: intelligence.match?.away || "Oakleigh United U11", threat: "Quick combinations between the lines", opportunity: "Space behind the advanced fullbacks" },
    sessionBuilder: { ...intelligence.recommendedSession },
    coachNotes: "Protect central transition space, communicate earlier and release the first forward option quickly after recovery.",
    timeline: [["0'", "Kick-off"], ["12'", "First high-value Springvale chance"], ["24'", "Opponent transition warning"], ["31'", "Springvale goal"], ["42'", "Recovery pattern improved"], ["60'", "Full time · AI processing ready"]],
    recognition: [{ playerId: intelligence.player?.id || "ava", playerName: intelligence.player?.name || "Ava Thompson", award: "Best On Field candidate", reason: "Positive effort and decisive team contribution" }],
  };
}

export function archiveMatchWorkspace(matchRecord, intelligence, workspaceOverride) {
  const archive = getMatchWorkspaces();
  const workspace = workspaceOverride || createMatchWorkspace(matchRecord, intelligence);
  const next = { ...archive, [String(matchRecord.workspaceId || matchRecord.id)]: workspace };
  try {
    localStorage.setItem(ARCHIVE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("matchvision:match-archive", { detail: workspace }));
  } catch { /* The current workspace remains available in memory. */ }
  return workspace;
}

export function ensureMatchWorkspaces(records, intelligence = defaultIntelligence) {
  const archive = getMatchWorkspaces();
  let changed = false;
  const next = { ...archive };
  records.forEach((record) => {
    const key = String(record.workspaceId || record.id);
    if (!next[key] && record.status === "AI complete") {
      next[key] = createMatchWorkspace(record, intelligence);
      changed = true;
    }
  });
  if (changed) {
    try { localStorage.setItem(ARCHIVE_KEY, JSON.stringify(next)); } catch { /* Use the in-memory archive. */ }
  }
  return next;
}
