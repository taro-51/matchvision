import { useEffect, useMemo, useState } from "react";
import "./DashboardEventCard.css";

const storageKey = "matchvisionTeamOperations";

function loadOperations() {
  try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch { return {}; }
}

export default function DashboardEventCard({ role, personName, onNavigate }) {
  const [operations, setOperations] = useState(loadOperations);
  const [notice, setNotice] = useState("");
  const coachMode = role === "coach";

  useEffect(() => {
    const sync = (event) => setOperations(event.detail || loadOperations());
    window.addEventListener("matchvision:team-operations", sync);
    window.addEventListener("matchvision:operational-update", sync);
    return () => {
      window.removeEventListener("matchvision:team-operations", sync);
      window.removeEventListener("matchvision:operational-update", sync);
    };
  }, []);

  const teamSummary = useMemo(() => {
    const records = Object.values(operations.availability || {});
    if (!records.length) return "13 available · 2 unavailable · 1 awaiting";
    const available = records.filter((item) => ["Available", "Present"].includes(item.status)).length;
    const unavailable = records.filter((item) => ["Unavailable", "Absent"].includes(item.status)).length;
    const awaiting = records.filter((item) => !item.status || item.status === "Unknown").length;
    return `${available} available · ${unavailable} unavailable · ${awaiting} awaiting`;
  }, [operations.availability]);

  const personalStatus = operations.availability?.[personName]?.status || "Unknown";
  const status = coachMode
    ? operations.temporaryAccess?.status === "Accepted" || operations.replacementCoach
      ? { tone: "replacement", label: "Replacement Coach Assigned" }
      : operations.coachAvailability === "Available"
        ? { tone: "confirmed", label: "Available Confirmed" }
        : operations.coachAvailability
          ? { tone: "danger", label: "Not Available" }
          : { tone: "required", label: "Response Required" }
    : ["Available", "Present"].includes(personalStatus)
      ? { tone: "confirmed", label: "Attendance Confirmed" }
      : ["Unavailable", "Absent"].includes(personalStatus)
        ? { tone: "danger", label: "Not Attending" }
        : { tone: "required", label: "Response Required" };

  function persist(next, message) {
    setOperations(next);
    const update = {
      event: coachMode ? "U11 Wallabies Training · 11 August 2026" : "U11 Wallabies vs Bentleigh Greens · 8 August 2026",
      role,
      personName,
      coachAvailability: next.coachAvailability,
      availability: next.availability,
      updatedAt: new Date().toISOString(),
      consumers: ["attendance", "team-operations", "calendar", "match-centre", "coach-dashboard", "club-dashboard", "admin-dashboard", "ai-workflow"],
    };
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      localStorage.setItem("matchvisionOperationalUpdate", JSON.stringify(update));
      window.dispatchEvent(new CustomEvent("matchvision:team-operations", { detail: next }));
      window.dispatchEvent(new CustomEvent("matchvision:operational-update", { detail: next }));
    } catch { /* Keep the current dashboard state available. */ }
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function confirm() {
    const now = new Date().toISOString();
    if (coachMode) {
      persist({ ...operations, coachAvailability: "Available", replacementCoach: "", replacementReason: "", temporaryAccess: null, coachingCommitmentUpdatedAt: now }, "Availability confirmed across MatchVision");
      return;
    }
    persist({ ...operations, availability: { ...(operations.availability || {}), [personName]: { status: "Available", reason: "", comment: "", updatedAt: now } } }, "Attendance confirmed across MatchVision");
  }

  return <section className={`dashboard-event-card ${role}`}>
    <header><div><span>{coachMode ? "UPCOMING COACHING COMMITMENT" : "UPCOMING EVENT"}</span><h2>{coachMode ? "U11 Wallabies Training" : "U11 Wallabies vs Bentleigh Greens"}</h2></div><b>{coachMode ? "TRAINING" : "MATCH"}</b></header>
    <div className="dashboard-event-facts"><article><span>Competition</span><strong>Junior League</strong></article><article><span>Date</span><strong>{coachMode ? "Tuesday 11 August" : "Saturday 8 August"}</strong></article><article><span>Time</span><strong>{coachMode ? "6:30 PM" : "10:30 AM"}</strong></article><article><span>Location</span><strong>Ross Reserve · Pitch 1</strong></article><article><span>{coachMode ? "Assigned Team" : "Coach"}</span><strong>{coachMode ? "Springvale Wallabies U11" : "Lisa Pitsos"}</strong></article><article><span>Team availability</span><strong>{teamSummary}</strong></article></div>
    <footer><div className={`dashboard-event-status ${status.tone}`}><i /> <strong>{status.label}</strong></div><div><button type="button" className="confirm" onClick={confirm}>✓ {coachMode ? "I'm Available" : "I'm Attending"}</button><button type="button" onClick={() => onNavigate(coachMode ? "team" : "attendance")}>× {coachMode ? "I'm Not Available" : "I'm Not Attending"}</button></div></footer>
    {notice && <div className="dashboard-event-notice" role="status">{notice}</div>}
  </section>;
}
