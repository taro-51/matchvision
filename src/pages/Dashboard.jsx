import { useState } from "react";
import "./Dashboard.css";
import springvaleLogo from "../assets/springvale-city-logo.png";
import { demoPlayerProfiles } from "../data/playerProfile";
import { getRecognitionRecords } from "../data/recognition";
import { getIntelligence } from "../lib/intelligence";
import TeamOperations from "../components/TeamOperations";
import DashboardEventCard from "../components/DashboardEventCard";

const workflow = [
  ["Live Game", "live"], ["Match Library", "matches"], ["AI Analysis", "analysis"],
  ["Football Intelligence", "football-intelligence"], ["Opponent Explorer", "football-intelligence"],
  ["Match Preparation", "football-intelligence"], ["Recommended Drills", "drills"],
  ["Session Builder", "session-builder"], ["Equipment", "equipment"], ["Training Session", "calendar"], ["Player Development", "player-development"],
  ["Recognition", "coach-recognition"], ["Parent Feedback", "messages"], ["Club Insights", "club-pulse"],
];

const roleCopy = {
  coach: ["How is my team progressing?", "Prepare the team for today’s session and the next opponent."],
  parent: ["How is my child progressing?", "A clear, positive update from the latest approved match and coach feedback."],
  player: ["What should I focus on this week?", "Your latest match, coach feedback and development goal in one place."],
  admin: ["What does the club need attention on today?", "Football, people and operations combined into one club-wide priority."],
};

function MatchCentre({ role, child, intelligence, onNavigate }) {
  const [mode, setMode] = useState("live");
  const familyMode = role === "parent" || role === "player";
  const content = {
    live: { eyebrow: "LIVE · 42:17", title: "U11 Wallabies vs Oakleigh United", score: "2 – 1", detail: "Ross Reserve · Pitch 1", action: "Watch Live", target: "live" },
    next: { eyebrow: "NEXT MATCH · SATURDAY 10:30 AM", title: "U11 Wallabies vs Bentleigh Greens", score: "2d 14h", detail: "Ross Reserve · Pitch 1 · Lineup availability 16/18", action: "Open Calendar", target: "calendar" },
    recent: { eyebrow: "MOST RECENT · FINAL", title: `${intelligence.match.home} vs ${intelligence.match.away}`, score: intelligence.match.score, detail: `${intelligence.match.venue} · AI analysis complete`, action: "Open Match", target: "matches" },
  }[mode];
  return <section className="premium-match-centre">
    <header><div><span>MATCH CENTRE</span><h2>One match. Everything you need.</h2></div><nav>{[["live","Live"],["next","Next"],["recent","Recent"]].map(([id,label]) => <button type="button" className={mode === id ? "active" : ""} key={id} onClick={() => setMode(id)}>{label}</button>)}</nav></header>
    <div className="match-centre-stage">
      <div className="match-centre-team"><img src={springvaleLogo} alt="Springvale City Soccer Club" /><strong>SPRINGVALE CITY</strong><small>U11 WALLABIES</small></div>
      <div className="match-centre-score"><span>{content.eyebrow}</span><h1>{content.title}</h1><strong>{content.score}</strong><p>{content.detail}</p></div>
      <div className="match-centre-opponent"><div>OU</div><strong>OAKLEIGH</strong><small>UNITED</small></div>
    </div>
    <div className="match-centre-events">
      {familyMode ? <><article><b>31′</b><span>{child.name} created a chance with a positive forward pass.</span></article><article><b>36′</b><span>Strong recovery run supported the team.</span></article><article><b>AI</b><span>{intelligence.player.parentSummary}</span></article></> : <><article><b>31′</b><span>Right-side combination created a clear chance.</span></article><article><b>36′</b><span>Recovery time improved to {intelligence.findings.recoveryTime}.</span></article><article><b>AI</b><span>Priority: {intelligence.findings.priority}.</span></article></>}
    </div>
    <footer><button type="button" className="primary" onClick={() => onNavigate(content.target)}>▶ {content.action}</button><button type="button" onClick={() => onNavigate(familyMode ? "highlights" : "analysis")}>{familyMode ? "View Highlights" : "Open AI Summary"}</button><button type="button" onClick={() => onNavigate(familyMode ? "player-stats" : "football-intelligence")}>{familyMode ? "Player Statistics" : "Prepare Next Action"}</button></footer>
  </section>;
}

function ActionGrid({ items, onNavigate }) {
  return <section className="premium-action-grid">{items.map(([eyebrow,title,copy,target,status]) => <button type="button" key={title} onClick={() => onNavigate(target)}><span>{eyebrow}</span><h3>{title}</h3><p>{copy}</p><b>{status || "Open"} →</b></button>)}</section>;
}

export default function Dashboard({ role = "coach", user, onNavigate, onLaunchAIStudio }) {
  const intelligence = getIntelligence();
  const linkedChildren = role === "parent" ? user?.linkedChildren || [] : [];
  let initialChildId = linkedChildren[0]?.id || "ava";
  try { initialChildId = localStorage.getItem("matchvisionActivePlayerId") || initialChildId; } catch { /* Use the linked default. */ }
  const [activeChildId, setActiveChildId] = useState(linkedChildren.some((item) => item.id === initialChildId) ? initialChildId : linkedChildren[0]?.id || "ava");
  const [team, setTeam] = useState("U11 Wallabies");
  const [club, setClub] = useState("Springvale City Soccer Club");
  const child = demoPlayerProfiles[activeChildId] || demoPlayerProfiles.ava;
  const recognition = getRecognitionRecords().find((item) => item.playerId === child.id);
  const [question, summary] = roleCopy[role];
  const studioQuickActions = role === "parent" ? [
    ["View Match Library", "matches"], ["View AI Insights", "child-analysis"], ["View Highlights", "highlights"], ["View Development", "player-development"],
  ] : role === "player" ? [
    ["My Match Library", "matches"], ["My AI Insights", "analysis"], ["My Highlights", "highlights"], ["My Development", "player-development"],
  ] : role === "coach" ? [
    ["Football Intelligence", "football-intelligence"], ["Opponent Explorer", "football-intelligence"], ["Session Builder", "session-builder"], ["Drill Exchange", "drills"], ["Equipment", "equipment"],
  ] : [
    ["Club Intelligence", "club-pulse"], ["Club Reports", "admin"], ["Committee", "admin-committee"], ["Registrations", "admin-registrations"], ["Governance", "admin-permissions"],
  ];
  const resolveWorkflowTarget = (target) => {
    if (role === "parent" || role === "player") return ["analysis","football-intelligence","drills","session-builder","equipment","coach-recognition","club-pulse"].includes(target) ? "player-development" : target;
    if (role === "admin") return target === "drills" || target === "session-builder" ? "football-intelligence" : target === "coach-recognition" ? "admin-awards" : target === "player-development" ? "team" : target;
    return target === "player-development" ? "team" : target;
  };

  const roleItems = role === "parent" ? [
    ["RECENT AI SUMMARY", child.trend, intelligence.player.parentSummary, "child-analysis"],
    ["LATEST HIGHLIGHT", child.highlights[0], "An approved match moment featuring your selected child.", "highlights", "Watch"],
    ["RECOGNITION", recognition?.awardType || "Best On Field", "Latest award, certificate and linked reward.", "player-awards"],
    ["UPCOMING TRAINING", child.nextEvent, "Availability, time and team details.", "calendar"],
    ["COACH FEEDBACK", "Growing confidence", intelligence.player.coachFeedback, "player-development"],
    ["DEVELOPMENT FOCUS", child.focus, `${intelligence.player.progress}% progress toward the current goal.`, "player-development"],
    ["LATEST CERTIFICATE", "Best On Field", "Original Springvale certificate attached to the player profile.", "player-certificates"],
    ["FULL PROFILE", child.name, "Performance, development, journey and recognition.", "player-profile"],
  ] : role === "player" ? [
    ["PERSONAL AI", intelligence.player.summary, "Latest approved development insight.", "analysis"],
    ["DEVELOPMENT GOAL", child.focus, `${intelligence.player.progress}% complete.`, "player-development"],
    ["LATEST MATCH", intelligence.match.score, `${intelligence.match.home} vs ${intelligence.match.away}`, "matches"],
    ["COACH FEEDBACK", "Positive progress", intelligence.player.coachFeedback, "player-development"],
    ["RECOGNITION", "Best On Field", "Award and certificate attached to your profile.", "player-awards"],
    ["RECENT HIGHLIGHT", child.highlights[0], "Watch your approved match moment.", "highlights", "Watch"],
    ["TRAINING FOCUS", intelligence.findings.priority, intelligence.recommendedSession.title, "calendar"],
  ] : role === "coach" ? [
    ["OPPONENT EXPLORER", intelligence.match.away, "Formation, style, threats and previous meetings.", "football-intelligence"],
    ["TODAY’S SESSION", intelligence.recommendedSession.title, `${intelligence.recommendedSession.duration} · AI prepared`, "session-builder"],
    ["AI PRIORITY", intelligence.findings.priority, `Team compactness: ${intelligence.findings.teamCompactness}.`, "analysis"],
    ["PLAYER ALERTS", "3 need attention", "Availability, workload and development follow-up.", "team"],
    ["RECOMMENDED DRILLS", intelligence.recommendedSession.drills[0], `${intelligence.recommendedSession.drills.length} drills selected.`, "drills"],
    ["EQUIPMENT READY", intelligence.club.equipmentReadiness, `${intelligence.equipment.length} equipment groups generated.`, "equipment"],
    ["TRAINING OBJECTIVES", "Transition and compactness", "Coach notes and match scenario are ready.", "session-builder"],
    ["UPCOMING FIXTURES", "Saturday · 10:30 AM", "Ross Reserve · lineup 16/18 available.", "calendar"],
  ] : [
    ["CLUB AI", `${intelligence.club.developmentTrend} development`, `${intelligence.club.analysedMatches} analysed matches inform the club.`, "admin"],
    ["REGISTRATIONS", "218 active players", "Seven new registrations this month.", "admin-registrations"],
    ["GROUND USAGE", "86% utilised", "Peak demand is 5:45–7:15 PM.", "admin-ground-bookings"],
    ["COMMITTEE", "2 decisions pending", "Governance actions awaiting review.", "admin-committee"],
    ["NOTIFICATIONS", "3 priority items", "Operational and family communications.", "admin-notifications"],
    ["SAFEGUARDING", "2 restricted reviews", "Administrator-only action required.", "admin"],
    ["REPORTS", "Board report ready", "Performance, participation and operations.", "admin"],
    ["CLUB HEALTH", intelligence.club.engagement, `Equipment readiness ${intelligence.club.equipmentReadiness}.`, "club-pulse"],
  ];

  return <div className="premium-dashboard">
    <section className={`premium-ai-update ${role}`}><div><span>✦ MATCHVISION AI · LATEST CONNECTED UPDATE</span><h1>{role === "coach" ? "Today's coaching priorities" : question}</h1><p>{role === "coach" ? "Defending wide overloads is this week's priority. Session Builder and the equipment checklist are ready; three players require development review." : summary}</p></div><aside><strong>{role === "coach" ? intelligence.findings.priority : role === "parent" ? child.trend : role === "player" ? child.focus : `${intelligence.club.developmentTrend} development`}</strong><small>Updated from the latest connected match</small></aside><button type="button" onClick={() => onNavigate(role === "coach" || role === "admin" ? "football-intelligence" : "player-development")}>View full insight →</button></section>

    {role === "parent" && <section className="premium-selector"><div><span>WHO ARE YOU VIEWING?</span><h2>Select a child</h2></div><div>{linkedChildren.map((item) => <button type="button" className={activeChildId === item.id ? "active" : ""} key={item.id} onClick={() => { setActiveChildId(item.id); try { localStorage.setItem("matchvisionActivePlayerId", item.id); } catch { /* Dashboard selection remains active in memory. */ } }}><i>{demoPlayerProfiles[item.id]?.initials || item.name.slice(0,2)}</i><strong>{item.name}</strong><small>{item.team}</small></button>)}</div></section>}
    {role === "coach" && <section className="premium-context-selector"><label><span>CURRENT TEAM</span><select value={team} onChange={(event) => setTeam(event.target.value)}><option>U11 Wallabies</option><option>U12 Girls</option><option>U13 Boys</option></select></label><p>Dashboard context: <strong>{team}</strong></p></section>}
    {role === "admin" && <section className="premium-context-selector"><label><span>CURRENT CLUB</span><select value={club} onChange={(event) => setClub(event.target.value)}><option>Springvale City Soccer Club</option></select></label><p>Future-ready club context: <strong>{club}</strong></p></section>}

    {["parent", "player", "coach"].includes(role) && <DashboardEventCard key={`${role}-${child.id}`} role={role} personName={child.name} onNavigate={onNavigate} />}
    <MatchCentre role={role} child={child} intelligence={intelligence} onNavigate={onNavigate} />
    {role === "admin" && <TeamOperations key={role} compact role={role} personName={user?.name} />}
    <section className={`dashboard-ai-studio ${role}`}>
      <div><span>MATCHVISION AI STUDIO</span><h2>{role === "parent" ? `Turn ${child.name}'s match into a private development review.` : role === "player" ? "Turn my match into my next development step." : role === "admin" ? "Turn club match footage into connected club intelligence." : "Upload one match. Prepare the entire coaching workflow."}</h2><p>One shared workflow updates the existing Match Library, AI Analysis, highlights and role-appropriate development tools.</p></div>
      <div className="dashboard-ai-studio-actions"><button type="button" className="primary" onClick={onLaunchAIStudio}>{role === "parent" ? "Upload Child's Match" : role === "player" ? "Upload My Match" : role === "admin" ? "Upload Club Match" : "Upload Team Match"}</button><button type="button" onClick={onLaunchAIStudio}>Continue Previous Analysis</button></div>
      <nav className="dashboard-ai-studio-links" aria-label="AI Studio quick actions">{studioQuickActions.map(([label,target]) => <button type="button" key={label} onClick={() => onNavigate(target)}>{label}</button>)}</nav>
    </section>
    <header className="premium-section-heading"><span>{role.toUpperCase()} PRIORITIES</span><h2>What you need next</h2></header>
    <ActionGrid items={roleItems} onNavigate={onNavigate} />

    <details className="premium-workflow"><summary><span>CONNECTED AI WORKFLOW</span><strong>See how every action continues →</strong></summary><div>{workflow.map(([label,target],index) => <button type="button" key={label} onClick={() => onNavigate(resolveWorkflowTarget(target))}><b>{String(index+1).padStart(2,"0")}</b><span>{label}</span></button>)}</div></details>
  </div>;
}
