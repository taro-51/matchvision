import "./WorkflowNavigation.css";

const groupLabels = {
  team: "Team Hub", attendance: "Team Hub", live: "Match Centre", matches: "Match Library",
  analysis: "AI Studio", "child-analysis": "Player Profile", highlights: "Match Library",
  "football-intelligence": "Football Hub", equipment: "Coach Hub", drills: "Coach Hub",
  "coach-profiles": "Coach Hub", "session-builder": "Coach Hub", "ai-studio": "AI Studio",
};

function resolveGroup(page) {
  if (page.startsWith("admin")) return "Admin Hub";
  if (page.startsWith("club-") || ["about-club", "join-springvale", "documents"].includes(page)) return "Club Hub";
  if (page.startsWith("player-") || page === "child-analysis") return "Player Hub";
  return groupLabels[page] || "MatchVision";
}

export default function WorkflowNavigation({ page, label, origin, onNavigate }) {
  if (page === "dashboard") return null;
  const returnPage = origin?.page && origin.page !== page ? origin.page : "dashboard";
  const returnLabel = origin?.label && origin.page !== page ? origin.label : "Dashboard";
  const group = resolveGroup(page);
  return <nav className="workflow-navigation" aria-label="Context navigation">
    <button type="button" onClick={() => onNavigate(returnPage, { preserveReturn: true })}>← Return to {returnLabel}</button>
    <ol><li><button type="button" onClick={() => onNavigate("dashboard")}>Dashboard</button></li>{group !== "MatchVision" && <li><span>›</span><strong>{group}</strong></li>}<li><span>›</span><b>{label}</b></li></ol>
  </nav>;
}
