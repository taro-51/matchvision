import { useEffect, useMemo, useRef, useState } from "react";
import "./CoachCommitment.css";

const storageKey = "matchvisionTeamOperations";
const clubCoaches = [
  { id: "michael", name: "Michael Smith", initials: "MS", rating: "4.9", licence: "UEFA B Licence", availability: "Available", teams: "U12 Girls · U14 Development", specialty: "Defensive Specialist", compatibility: 98 },
  { id: "daniel", name: "Daniel Brooks", initials: "DB", rating: "4.8", licence: "AFC C Licence", availability: "Available", teams: "U13 Boys", specialty: "Transitions & Pressing", compatibility: 93 },
  { id: "alicia", name: "Alicia Tran", initials: "AT", rating: "4.9", licence: "UEFA B Licence", availability: "Training conflict", teams: "U12 Girls", specialty: "Player Development", compatibility: 87 },
];
const handoverPermissions = ["Match Centre", "Calendar", "Upcoming Event", "Team Availability", "Attendance", "Team Sheet", "Player Profiles", "Player Development", "Match Library", "Football Intelligence", "Opponent Explorer", "AI Analysis", "Session Builder", "Recommended Drills", "Equipment", "Coach Notes", "Training Objectives", "Previous Match Summary", "AI Tactical Summary", "Recommended Formation", "AI Development Priorities"];
const assistantSteps = ["Checking Coach Availability", "Evaluating Coach Compatibility", "Preparing Coaching Context", "Synchronising Match Information", "Assignment Complete"];
const transferredItems = ["Match Centre", "Calendar", "Team Availability", "Team Sheet", "Match Library", "Football Intelligence", "Opponent Explorer", "AI Analysis", "Session Builder", "Recommended Drills", "Equipment", "Coach Notes", "Previous Match Summary", "AI Tactical Priorities", "Player Development Information"];

function loadState() {
  try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch { return {}; }
}

export default function CoachCommitment({ onNavigate }) {
  const [operations, setOperations] = useState(loadState);
  const [available, setAvailable] = useState(operations.coachAvailability === "Available" ? "available" : operations.coachAvailability ? "unavailable" : "");
  const [reason, setReason] = useState(operations.coachAvailability && operations.coachAvailability !== "Available" ? operations.coachAvailability : "Sick");
  const [notes, setNotes] = useState(operations.replacementReason || "");
  const [showCoaches, setShowCoaches] = useState(false);
  const [notice, setNotice] = useState("");
  const [assistantStatus, setAssistantStatus] = useState("idle");
  const [assistantStep, setAssistantStep] = useState(-1);
  const assistantTimers = useRef([]);
  const recommended = clubCoaches[0];
  const accessExpiry = operations.temporaryAccess?.expiresAt;

  useEffect(() => {
    if (!accessExpiry) return undefined;
    const delay = new Date(accessExpiry).getTime() - Date.now();
    const expireAssignment = () => {
      const next = { ...loadState(), replacementCoach: "", temporaryAccess: null, temporaryAccessExpiredAt: new Date().toISOString() };
      setOperations(next);
      try { localStorage.setItem(storageKey, JSON.stringify(next)); window.dispatchEvent(new CustomEvent("matchvision:team-operations", { detail: next })); } catch { /* Expiry remains reflected in memory. */ }
    };
    if (delay <= 0) { expireAssignment(); return undefined; }
    const timer = window.setTimeout(expireAssignment, Math.min(delay, 2147483647));
    return () => window.clearTimeout(timer);
  }, [accessExpiry]);

  useEffect(() => () => assistantTimers.current.forEach(window.clearTimeout), []);

  const teamStatus = useMemo(() => {
    const records = Object.values(operations.availability || {});
    if (!records.length) return { available: 13, unavailable: 2, awaiting: 1, late: 0 };
    return {
      available: records.filter((item) => ["Available", "Present"].includes(item.status)).length,
      unavailable: records.filter((item) => ["Unavailable", "Absent"].includes(item.status)).length,
      awaiting: records.filter((item) => !item.status || item.status === "Unknown").length,
      late: records.filter((item) => ["Late", "Left Early"].includes(item.status)).length,
    };
  }, [operations]);

  function persist(next, message) {
    setOperations(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      localStorage.setItem("matchvisionOperationalUpdate", JSON.stringify({ coachAvailability: next.coachAvailability, replacementCoach: next.replacementCoach || null, event: "U11 Wallabies Training · 11 August 2026", teamAvailability: teamStatus, updatedAt: new Date().toISOString(), consumers: ["calendar", "match-centre", "team-availability", "club-dashboard", "admin-dashboard", "ai-workflow"] }));
      window.dispatchEvent(new CustomEvent("matchvision:team-operations", { detail: next }));
      window.dispatchEvent(new CustomEvent("matchvision:operational-update", { detail: next }));
    } catch { /* Keep the dashboard workflow available in memory. */ }
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  function markAvailable() {
    setAvailable("available");
    persist({ ...operations, coachAvailability: "Available", replacementCoach: "", replacementReason: "", temporaryAccess: null, coachingCommitmentUpdatedAt: new Date().toISOString() }, "Availability updated across MatchVision");
  }

  function markUnavailable() {
    setAvailable("unavailable");
  }

  function saveUnavailable() {
    persist({ ...operations, coachAvailability: reason, replacementReason: notes, coachingCommitmentUpdatedAt: new Date().toISOString() }, "Coach availability updated · replacement required");
  }

  function assignCoach(coach) {
    const assignment = {
      coach: coach.name,
      coachId: coach.id,
      owner: "Lisa Pitsos",
      event: "U11 Wallabies Training · 11 August 2026",
      startsAt: "2026-08-11T18:30:00+10:00",
      expiresAt: "2026-08-11T20:30:00+10:00",
      status: "Awaiting acceptance",
      permissions: handoverPermissions,
      aiHandover: {
        priority: "Defending wide overloads",
        opponent: "Bentleigh Greens",
        session: "Defensive transitions and compact recovery",
        formation: "4-2-3-1",
        equipment: "Checklist ready",
        playerReviews: 3,
        previousMatch: "Springvale City 3-2 Oakleigh United",
        confidence: `${coach.compatibility}%`,
      },
    };
    persist({ ...operations, coachAvailability: reason, replacementCoach: coach.name, replacementReason: notes, temporaryAccess: assignment }, `${coach.name} assigned · AI handover ready`);
    setShowCoaches(false);
    setAssistantStatus("processing");
    setAssistantStep(0);
    assistantTimers.current.forEach(window.clearTimeout);
    assistantTimers.current = assistantSteps.map((_, index) => window.setTimeout(() => {
      setAssistantStep(index);
      if (index === assistantSteps.length - 1) setAssistantStatus("pending");
    }, 520 * (index + 1)));
  }

  function acceptAssignment() {
    const assignment = { ...operations.temporaryAccess, status: "Accepted", acceptedAt: new Date().toISOString(), synchronised: transferredItems };
    persist({ ...operations, temporaryAccess: assignment }, `${assignment.coach} accepted · synchronisation complete`);
    setAssistantStatus("accepted");
  }

  function declineAssignment() {
    const coach = operations.temporaryAccess?.coach || operations.replacementCoach || "Replacement coach";
    persist({ ...operations, replacementCoach: "", temporaryAccess: null, lastDeclinedAssignment: { coach, declinedAt: new Date().toISOString() } }, `${coach} declined the assignment`);
    setAssistantStatus("declined");
  }

  return <section className="coach-commitment">
    <header><div><span>UPCOMING COACHING COMMITMENT</span><h2>U11 Wallabies Training</h2><p>Everything required for tonight's responsibility, in one place.</p></div><b>TRAINING</b></header>
    <div className="coach-commitment-facts"><article><span>Competition</span><strong>Junior League</strong></article><article><span>Date & Time</span><strong>Tuesday 11 August · 6:30 PM</strong></article><article><span>Location</span><strong>Ross Reserve · Pitch 1</strong></article><article><span>Assigned Team</span><strong>Springvale Wallabies U11</strong></article><article><span>Weather</span><strong>Weather coming soon</strong></article><article><span>Availability</span><strong>{teamStatus.available} available · {teamStatus.unavailable} unavailable</strong></article></div>
    <div className="coach-intelligence-brief"><span>AI · NEXT COMMITMENT INTELLIGENCE</span><ul><li>Defending wide overloads is this week's priority.</li><li>Two players have missed multiple training sessions.</li><li>The opposition struggles when defending wide areas.</li><li>Session Builder and the equipment checklist are ready.</li><li>Three players require development review.</li></ul></div>

    <div className="coach-availability-quick"><div><span>COACH AVAILABILITY</span><h3>Can you lead this commitment?</h3></div><div><button type="button" className={available === "available" ? "active" : ""} onClick={markAvailable}>I'M AVAILABLE</button><button type="button" className={available === "unavailable" ? "active unavailable" : ""} onClick={markUnavailable}>I'M NOT AVAILABLE</button></div></div>

    {available === "unavailable" && <div className="coach-replacement-workflow"><div className="coach-unavailable-form"><label><span>Reason</span><select value={reason} onChange={(event) => setReason(event.target.value)}>{["Sick", "Holiday", "Work", "Family", "Personal", "Other"].map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Optional Notes</span><textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Information for club operations or the replacement coach" /></label><button type="button" onClick={saveUnavailable}>Save Unavailability</button></div>
      <article className="ai-coach-recommendation"><div className="ai-recommendation-heading"><i>AI</i><div><span>MATCHVISION AI RECOMMENDATION</span><h3>Recommended Replacement Coach</h3></div><b>{recommended.compatibility}% MATCH</b></div><div className="recommended-coach"><i>{recommended.initials}</i><div><h2>{recommended.name}</h2><p>{recommended.licence} · {recommended.rating} star rating</p></div><strong>AVAILABLE</strong></div><ul><li>Available on the selected date with no scheduling conflicts</li><li>UEFA B Licence and strong defensive coaching</li><li>Previously coached this team and similar age groups</li><li>Familiar with the current Session Builder plan</li></ul><div><button type="button" className="assign" onClick={() => assignCoach(recommended)}>Assign Recommended Coach</button><button type="button" onClick={() => setShowCoaches((current) => !current)}>Choose Another Coach</button></div></article>
      {showCoaches && <div className="club-coach-picker">{clubCoaches.map((coach) => <article key={coach.id}><i>{coach.initials}</i><div><h3>{coach.name}</h3><p>{coach.rating} stars · {coach.licence}</p><span>{coach.specialty}</span><small>{coach.teams}</small></div><aside><b>{coach.availability}</b><strong>{coach.compatibility}% AI compatibility</strong><button type="button" disabled={coach.availability !== "Available"} onClick={() => assignCoach(coach)}>Assign</button></aside></article>)}</div>}
    </div>}

    {operations.temporaryAccess && <section className="ai-handover"><header><div><span>AI HANDOVER ACTIVE</span><h3>{operations.temporaryAccess.coach} has everything required.</h3></div><b>EXPIRES AFTER EVENT</b></header><div>{handoverPermissions.map((item) => <span key={item}>{item}</span>)}</div><p>Lisa Pitsos remains the owner. Temporary access expires automatically at {new Date(operations.temporaryAccess.expiresAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}.</p></section>}

    <button type="button" className="team-status-link" onClick={() => onNavigate("team")}><span>TEAM STATUS · OPEN TEAM OPERATIONS</span><div><strong>{teamStatus.available}<small>Available</small></strong><strong>{teamStatus.unavailable}<small>Unavailable</small></strong><strong>{teamStatus.awaiting}<small>Awaiting</small></strong><strong>{teamStatus.late}<small>Late</small></strong></div></button>
    {assistantStatus === "processing" && <section className="ai-assistant-status"><header><i>AI</i><div><span>MATCHVISION AI · OPERATIONAL ASSISTANT</span><h3>Coordinating the replacement assignment</h3></div></header><div>{assistantSteps.map((step,index) => <article className={index < assistantStep ? "complete" : index === assistantStep ? "active" : ""} key={step}><i>{index < assistantStep ? "OK" : index + 1}</i><span>{step}</span></article>)}</div></section>}
    {assistantStatus === "pending" && <section className="ai-assistant-response pending"><header><i>AI</i><div><span>MATCHVISION AI</span><h3>Assignment sent to {operations.temporaryAccess?.coach}.</h3><p>Waiting for the replacement coach to respond.</p></div></header><footer><button type="button" onClick={acceptAssignment}>Record Acceptance</button><button type="button" onClick={declineAssignment}>Record Decline</button></footer></section>}
    {assistantStatus === "accepted" && <section className="ai-assistant-response accepted"><header><i>AI</i><div><span>MATCHVISION AI</span><h2>{operations.temporaryAccess?.coach} has accepted the coaching assignment.</h2><p>All relevant information has now been synchronised. The replacement coach is fully prepared for this event.</p></div></header><div className="ai-transfer-grid">{transferredItems.map((item) => <span key={item}>OK · {item}</span>)}</div><footer><button type="button" onClick={() => onNavigate("dashboard")}>Return to Dashboard</button><button type="button" onClick={() => onNavigate("team")}>View Team Operations</button><button type="button" onClick={() => onNavigate("calendar")}>View Event</button><button type="button" onClick={() => setAssistantStatus("idle")}>Dismiss</button></footer></section>}
    {assistantStatus === "declined" && <section className="ai-assistant-response declined"><header><i>AI</i><div><span>MATCHVISION AI</span><h2>{operations.lastDeclinedAssignment?.coach} has declined this coaching assignment.</h2><p>Please choose another available coach.</p></div></header><footer><button type="button" onClick={() => { setAssistantStatus("idle"); setShowCoaches(true); }}>Select Another Coach</button><button type="button" onClick={() => { setAssistantStatus("idle"); setShowCoaches(false); }}>View AI Recommendations</button><button type="button" onClick={() => setAssistantStatus("no-coaches")}>No Coaches Available</button><button type="button" onClick={() => setAssistantStatus("idle")}>Dismiss</button></footer></section>}
    {assistantStatus === "no-coaches" && <section className="ai-assistant-response no-coaches"><header><i>AI</i><div><span>MATCHVISION AI</span><h2>No suitable replacement coach is currently available.</h2><p>Suggested actions: contact the Club Administrator, request volunteer assistance, reschedule the session or review coach availability.</p></div></header><footer><button type="button" onClick={() => onNavigate("messages")}>Contact Club Administrator</button><button type="button" onClick={() => onNavigate("club-volunteers")}>Volunteer Assistance</button><button type="button" onClick={() => onNavigate("calendar")}>Review Schedule</button><button type="button" onClick={() => setAssistantStatus("idle")}>Dismiss</button></footer></section>}
    {notice && <div className="coach-commitment-notice">{notice}</div>}
  </section>;
}
