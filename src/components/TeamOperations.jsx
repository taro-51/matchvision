import { useEffect, useState } from "react";
import "./TeamOperations.css";
import WorkflowCompletion from "./WorkflowCompletion";

const players = ["Ava Thompson", "Mia Rodriguez", "Lily Chen", "Sophie Williams", "Ruby Anderson", "Charlotte Brown", "Olivia Martin"];
const coaches = ["Lisa Pitsos", "Daniel Brooks", "Alicia Tran", "Michael Tran"];
const reasons = ["Illness", "Holiday", "School", "Work", "Injury", "Family", "Other"];
const checklistItems = ["Medical Kit", "Balls", "Cones", "Bibs", "Ground Confirmed", "Referee Confirmed", "Assistant Coach"];
const storageKey = "matchvisionTeamOperations";

function loadOperations() {
  const fallback = { availability: {}, coachAvailability: "Available", replacementCoach: "", replacementReason: "", starters: players.slice(0,5), bench: players.slice(5), unavailable: [], captain: "Ava Thompson", viceCaptain: "Mia Rodriguez", checklist: {} };
  try { return { ...fallback, ...JSON.parse(localStorage.getItem(storageKey) || "{}") }; } catch { return fallback; }
}

export default function TeamOperations({ role, personName, compact = false, hideCoachAvailability = false, onNavigate }) {
  const [data, setData] = useState(loadOperations);
  const [response, setResponse] = useState(data.availability[personName]?.status || "Unknown");
  const [reason, setReason] = useState(data.availability[personName]?.reason || "Illness");
  const [comment, setComment] = useState(data.availability[personName]?.comment || "");
  const [notice, setNotice] = useState("");
  const [completion, setCompletion] = useState(false);
  const familyMode = role === "parent" || role === "player";

  useEffect(() => {
    const syncOperations = (event) => setData(event.detail || loadOperations());
    window.addEventListener("matchvision:team-operations", syncOperations);
    return () => window.removeEventListener("matchvision:team-operations", syncOperations);
  }, []);

  function persist(next, message) {
    const storedNext = message.startsWith("Temporary event access") ? { ...next, temporaryAccess: { coach: next.replacementCoach, owner: "Lisa Pitsos", event: "U11 Wallabies · 8 August 2026", expiresAt: "2026-08-08T13:00:00+10:00", permissions: ["match-centre", "calendar", "availability", "team-sheet", "matches", "football-intelligence", "opponent-explorer", "analysis", "player-profiles", "session-builder", "equipment", "coach-notes", "training-plan"] } } : next;
    setData(storedNext);
    try { localStorage.setItem(storageKey, JSON.stringify(storedNext)); window.dispatchEvent(new CustomEvent("matchvision:team-operations", { detail: storedNext })); } catch { /* Keep current session state. */ }
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function saveAvailability() {
    persist({ ...data, availability: { ...data.availability, [personName]: { status: response, reason: response === "Unavailable" ? reason : "", comment } } }, "Availability saved");
    setCompletion(true);
  }

  function setPlayerStatus(name, status) {
    persist({ ...data, availability: { ...data.availability, [name]: { ...data.availability[name], status } } }, `${name} marked ${status.toLowerCase()}`);
  }

  function movePlayer(name, group) {
    const next = { ...data, starters: data.starters.filter((item) => item !== name), bench: data.bench.filter((item) => item !== name), unavailable: data.unavailable.filter((item) => item !== name) };
    next[group] = [...next[group], name];
    persist(next, "Team sheet updated");
  }

  if (compact) return <section className="team-ops-compact"><header><div><span>UPCOMING EVENT</span><h2>{role === "coach" ? "U11 Team Training" : "U11 Wallabies vs Bentleigh Greens"}</h2></div><b>Saturday · 10:30 AM</b></header><dl><div><dt>Competition</dt><dd>Junior League</dd></div><div><dt>Date</dt><dd>Saturday 8 August</dd></div><div><dt>Location</dt><dd>Ross Reserve · Pitch 1</dd></div><div><dt>Coach</dt><dd>Lisa Pitsos</dd></div></dl>{familyMode ? <div className="availability-response"><span>AVAILABILITY · {personName}</span><div><button type="button" className={response === "Available" ? "active" : ""} onClick={() => setResponse("Available")}>Attending</button><button type="button" className={response === "Unavailable" ? "active danger" : ""} onClick={() => setResponse("Unavailable")}>Not Attending</button></div>{response === "Unavailable" && <><label><span>Reason</span><select value={reason} onChange={(event) => setReason(event.target.value)}>{reasons.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Comment</span><textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Optional information for the coach" /></label></>}<button type="button" className="save-availability" onClick={saveAvailability}>Save Availability</button></div> : <div className="team-ops-summary"><article><strong>{players.filter((name) => data.availability[name]?.status === "Available").length || 5}</strong><span>Available</span></article><article><strong>{players.filter((name) => data.availability[name]?.status === "Unavailable").length || 1}</strong><span>Unavailable</span></article><article><strong>{players.filter((name) => !data.availability[name] || data.availability[name].status === "Unknown").length}</strong><span>Unknown</span></article><article><strong>{role === "admin" ? "86%" : data.coachAvailability}</strong><span>{role === "admin" ? "Club trend" : "Coach availability"}</span></article></div>}{notice && <div className="team-ops-notice">{notice}</div>}</section>;

  return <section className={`team-operations ${hideCoachAvailability ? "coach-commitment-managed" : ""}`}><header><div><span>TEAM OPERATIONS · NEXT EVENT</span><h2>U11 Wallabies · Saturday 10:30 AM</h2><p>Ross Reserve · Pitch 1 · Junior League</p></div><b>EVENT ACCESS ACTIVE</b></header>
    {familyMode && <div className="team-operation-panel"><h3>My Availability</h3><p>Only {personName}'s response can be changed from this account.</p><div className="availability-response"><div><button type="button" className={response === "Available" ? "active" : ""} onClick={() => setResponse("Available")}>Attending</button><button type="button" className={response === "Unavailable" ? "active danger" : ""} onClick={() => setResponse("Unavailable")}>Not Attending</button></div>{response === "Unavailable" && <><label><span>Reason</span><select value={reason} onChange={(event) => setReason(event.target.value)}>{reasons.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Comment</span><textarea value={comment} onChange={(event) => setComment(event.target.value)} /></label></>}<button type="button" className="save-availability" onClick={saveAvailability}>Save</button></div></div>}
    {(role === "coach" || role === "admin") && <><div className="team-operation-panel"><header><div><span>TEAM AVAILABILITY</span><h3>Available, unavailable, unknown and late</h3></div>{role === "admin" && <div className="team-admin-filters"><select defaultValue="U11"><option>All age groups</option><option>U11</option><option>U13</option></select><select><option>All coaches</option>{coaches.map((coach) => <option key={coach}>{coach}</option>)}</select><input type="date" defaultValue="2026-08-08" /></div>}</header><div className="team-availability-table"><div><span>Player</span><span>Status</span><span>Reason / comment</span><span>Override</span></div>{players.map((name) => { const record = data.availability[name] || { status: "Unknown" }; return <article key={name}><strong>{name}</strong><b className={record.status.toLowerCase()}>{record.status}</b><small>{record.reason || record.comment || "No response"}</small><select value={record.status} onChange={(event) => setPlayerStatus(name,event.target.value)}><option>Available</option><option>Unavailable</option><option>Unknown</option><option>Late</option><option>Present</option><option>Absent</option><option>Left Early</option></select></article>; })}</div></div>
      <div className="team-operation-grid"><div className="team-operation-panel"><span>COACH AVAILABILITY</span><h3>Lisa Pitsos</h3><div className="coach-availability-controls"><select value={data.coachAvailability} onChange={(event) => persist({ ...data, coachAvailability: event.target.value }, "Coach availability updated")}><option>Available</option><option>Sick</option><option>Holiday</option><option>Work</option><option>Other</option></select>{data.coachAvailability !== "Available" && <><select value={data.replacementCoach} onChange={(event) => setData({ ...data, replacementCoach: event.target.value })}><option value="">Select replacement coach</option>{coaches.slice(1).map((coach) => <option key={coach}>{coach}</option>)}</select><textarea value={data.replacementReason} onChange={(event) => setData({ ...data, replacementReason: event.target.value })} placeholder="Replacement notes" /><button type="button" onClick={() => persist(data, `Temporary event access granted to ${data.replacementCoach || "replacement coach"}`)}>Grant Temporary Access</button></>}</div>{data.replacementCoach && <div className="temporary-access"><strong>{data.replacementCoach}</strong><span>Match Centre · Calendar · Availability · Team Sheet · Match Library · Football Intelligence · AI Analysis · Player Profiles · Session Builder · Equipment · Coach Notes · Training Plan</span><small>Original coach retains ownership · Access expires after event</small></div>}</div>
      <div className="team-operation-panel"><span>MATCH DAY CHECKLIST</span><h3>Event readiness</h3><div className="checklist-grid">{checklistItems.map((item) => <label key={item}><input type="checkbox" checked={Boolean(data.checklist[item])} onChange={() => persist({ ...data, checklist: { ...data.checklist, [item]: !data.checklist[item] } }, "Checklist saved")} /><span>{item}</span></label>)}</div></div></div>
      <div className="team-operation-panel"><span>TEAM SHEET</span><h3>Starters, bench, unavailable and leadership</h3><div className="team-sheet-leaders"><label>Captain<select value={data.captain} onChange={(event) => persist({ ...data, captain: event.target.value }, "Captain updated")}>{players.map((name) => <option key={name}>{name}</option>)}</select></label><label>Vice Captain<select value={data.viceCaptain} onChange={(event) => persist({ ...data, viceCaptain: event.target.value }, "Vice captain updated")}>{players.map((name) => <option key={name}>{name}</option>)}</select></label></div><div className="team-sheet-grid">{[["starters","Starters"],["bench","Bench"],["unavailable","Unavailable"]].map(([group,label]) => <article key={group}><h4>{label}</h4>{data[group].map((name) => <div key={name}><span>{name}</span><select value={group} onChange={(event) => movePlayer(name,event.target.value)}><option value="starters">Starter</option><option value="bench">Bench</option><option value="unavailable">Unavailable</option></select></div>)}</article>)}</div></div></>}
    {completion && <WorkflowCompletion title="Attendance Updated Successfully" message={`${personName}'s response is synchronised across MatchVision.`} actions={[{ label: "Return to Dashboard", primary: true, onClick: () => onNavigate?.("dashboard") }, { label: "Return to Team Operations", onClick: () => { setCompletion(false); onNavigate?.("team"); } }]} />}
    {notice && <div className="team-ops-notice">{notice}</div>}
  </section>;
}
