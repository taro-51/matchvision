import { useEffect, useMemo, useState } from "react";
import "./FootballIntelligence.css";

const OPPONENTS = [
  {
    id: "oakleigh",
    club: "Oakleigh United",
    suburb: "Oakleigh",
    distance: "12 km",
    matches: 18,
    wins: 9,
    draws: 4,
    losses: 5,
    goalsFor: 43,
    goalsAgainst: 31,
    confidence: 91,
    formation: "2-3-2",
    alternatives: ["3-2-2", "2-2-3"],
    buildUp: "Short from goalkeeper",
    press: "Mid-block",
    attackSide: "Left",
    danger: "#10 · central creator",
    weakness: "Transition defence after losing possession",
    notes: [
      "Goalkeeper prefers short distribution to the left.",
      "Near-post corner used in four of the last five observed matches.",
      "Left winger stays high and attacks space early.",
    ],
    formationSplit: [72, 17, 11],
    zones: [62, 24, 14],
    keeper: [91, 9, 77, 31],
    setPieces: [84, 12, 4],
    history: [
      { date: "18 Jul 2026", team: "U11 Wallabies", venue: "Home", score: "W 3–2", formation: "2-3-2", theme: "High press recovery", impact: "+14 turnovers" },
      { date: "02 May 2026", team: "U13 Wallabies", venue: "Away", score: "L 1–2", formation: "3-2-2", theme: "Compact mid-block", impact: "Left channel exposed" },
      { date: "16 Mar 2026", team: "U10 Wallabies", venue: "Home", score: "D 2–2", formation: "2-3-2", theme: "Wide transition", impact: "+7 final-third entries" },
      { date: "09 Aug 2025", team: "U12 Wallabies", venue: "Away", score: "W 4–1", formation: "2-3-2", theme: "High press recovery", impact: "+11 high regains" },
    ],
  },
  {
    id: "dandenong",
    club: "Dandenong City",
    suburb: "Dandenong",
    distance: "8 km",
    matches: 15,
    wins: 7,
    draws: 4,
    losses: 4,
    goalsFor: 34,
    goalsAgainst: 28,
    confidence: 86,
    formation: "3-2-2",
    alternatives: ["2-3-2", "3-3-1"],
    buildUp: "Central combinations",
    press: "Compact midfield press",
    attackSide: "Centre",
    danger: "#8 · late midfield runner",
    weakness: "Space behind wide midfielders",
    notes: ["Midfield stays narrow.", "Full-width switches create space.", "Second balls are a major strength."],
    formationSplit: [64, 23, 13], zones: [24, 55, 21], keeper: [63, 37, 54, 24], setPieces: [45, 38, 17],
    history: [
      { date: "11 Jul 2026", team: "Senior Women", venue: "Away", score: "D 1–1", formation: "3-2-2", theme: "Wide overloads", impact: "+9 crosses" },
      { date: "20 Jun 2026", team: "U14 Wallabies", venue: "Home", score: "W 2–0", formation: "3-2-2", theme: "Switch of play", impact: "6 entries behind wide mids" },
      { date: "05 Apr 2026", team: "U12 Wallabies", venue: "Away", score: "L 1–3", formation: "2-3-2", theme: "Central build-up", impact: "Lost 58% second balls" },
    ],
  },
  {
    id: "bentleigh",
    club: "Bentleigh Greens",
    suburb: "Bentleigh",
    distance: "16 km",
    matches: 11,
    wins: 4,
    draws: 2,
    losses: 5,
    goalsFor: 20,
    goalsAgainst: 24,
    confidence: 82,
    formation: "3-2-2",
    alternatives: ["2-3-2", "4-3-3"],
    buildUp: "Patient possession",
    press: "High press",
    attackSide: "Balanced",
    danger: "#7 · right-side dribbler",
    weakness: "Vulnerable behind the first press",
    notes: ["Technically strong under light pressure.", "First press can be bypassed with direct third-player runs.", "Wide forwards recover slowly."],
    formationSplit: [58, 29, 13], zones: [35, 31, 34], keeper: [78, 22, 49, 19], setPieces: [52, 34, 14],
    history: [
      { date: "04 Jul 2026", team: "U13 Wallabies", venue: "Home", score: "L 1–2", formation: "3-2-2", theme: "Play through pressure", impact: "4 press escapes" },
      { date: "24 May 2026", team: "U11 Wallabies", venue: "Away", score: "W 2–1", formation: "2-3-2", theme: "Direct transition", impact: "2 goals after bypassing press" },
    ],
  },
  {
    id: "kingston",
    club: "Kingston City",
    suburb: "Clayton South",
    distance: "7 km",
    matches: 12,
    wins: 8,
    draws: 1,
    losses: 3,
    goalsFor: 32,
    goalsAgainst: 21,
    confidence: 88,
    formation: "2-2-3",
    alternatives: ["2-3-2", "3-2-2"],
    buildUp: "Fast wide progression",
    press: "High on goal kicks",
    attackSide: "Right",
    danger: "#11 · wide runner",
    weakness: "Central space when both wide players advance",
    notes: ["Overloads the right channel.", "Commits numbers forward early.", "Can be countered through the centre."],
    formationSplit: [61, 25, 14], zones: [18, 26, 56], keeper: [56, 44, 65, 34], setPieces: [39, 46, 15],
    history: [
      { date: "28 Jun 2026", team: "U10 Wallabies", venue: "Home", score: "W 2–0", formation: "2-2-3", theme: "Central counterattack", impact: "10 central transitions" },
      { date: "12 Apr 2026", team: "U12 Wallabies", venue: "Away", score: "W 3–2", formation: "2-3-2", theme: "Protect wide channel", impact: "Right attacks reduced after HT" },
    ],
  },
];

const TRAINING = [
  { name: "High Press Recovery", used: 14, wins: 11, draws: 2, losses: 1, possession: "+8%", conceded: "−23%", fit: "Short build-up opponents", score: 92 },
  { name: "Wide Transition Attack", used: 11, wins: 7, draws: 2, losses: 2, possession: "+4%", conceded: "−11%", fit: "Narrow midfield blocks", score: 84 },
  { name: "Near-Post Defending", used: 9, wins: 6, draws: 2, losses: 1, possession: "+1%", conceded: "−37% set-piece goals", fit: "Near-post corner teams", score: 89 },
  { name: "Play Through Pressure", used: 8, wins: 5, draws: 1, losses: 2, possession: "+11%", conceded: "−8%", fit: "Aggressive high press", score: 81 },
];

const FORMATIONS = [
  { name: "2-3-2", faced: 34, win: 68, response: "High press + protect central lane", sessions: "High Press Recovery" },
  { name: "3-2-2", faced: 19, win: 74, response: "Create width and switch quickly", sessions: "Wide Transition Attack" },
  { name: "2-2-3", faced: 16, win: 63, response: "Counter through vacated centre", sessions: "Central Counterattack" },
  { name: "4-3-3", faced: 12, win: 42, response: "Compact first, isolate fullbacks", sessions: "Mid-block to Counter" },
];

const DEFAULT_NOTES = [
  { id: 1, opponent: "Oakleigh United", author: "Lisa Pitsos", team: "U11 Wallabies", date: "18 Jul 2026", text: "Their number 10 drops into midfield. High press worked when our striker blocked the return pass to the keeper.", tags: ["high press", "#10", "build-up"] },
  { id: 2, opponent: "Dandenong City", author: "Maria Costa", team: "Senior Women", date: "11 Jul 2026", text: "Switching play early pulled their midfield apart. Watch second balls around the top of the box.", tags: ["switch play", "second balls"] },
];

const TABS = [
  ["overview", "Overview"],
  ["opponents", "Opponent Intelligence"],
  ["memory", "Club Tactical Memory"],
  ["training", "Training Effectiveness"],
  ["formations", "Formation Library"],
  ["setpieces", "Set Piece Library"],
  ["coaches", "Coach Knowledge"],
  ["trends", "Historical Trends"],
  ["matchpack", "AI Match Pack"],
];

function Stat({ label, value, note }) {
  return <article className="fi-stat"><span>{label}</span><strong>{value}</strong><small>{note}</small></article>;
}

function Bar({ label, value, suffix = "%" }) {
  return <div className="fi-bar"><div><span>{label}</span><b>{value}{suffix}</b></div><i><em style={{ width: `${Math.min(value, 100)}%` }} /></i></div>;
}

export default function FootballIntelligence({ onNavigate }) {
  const [tab, setTab] = useState("overview");
  const [opponentId, setOpponentId] = useState("oakleigh");
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("matchvisionTacticalNotes")) || DEFAULT_NOTES; }
    catch { return DEFAULT_NOTES; }
  });
  const [noteText, setNoteText] = useState("");
  const [noteTeam, setNoteTeam] = useState("U11 Wallabies");
  const [toast, setToast] = useState("");
  const [packReady, setPackReady] = useState(false);
  const [packProgress, setPackProgress] = useState(0);

  const opponent = OPPONENTS.find((item) => item.id === opponentId) || OPPONENTS[0];
  const filtered = useMemo(() => OPPONENTS.filter((item) => `${item.club} ${item.suburb}`.toLowerCase().includes(search.toLowerCase())), [search]);

  useEffect(() => { localStorage.setItem("matchvisionTacticalNotes", JSON.stringify(notes)); }, [notes]);
  useEffect(() => { if (!toast) return undefined; const timer = setTimeout(() => setToast(""), 2400); return () => clearTimeout(timer); }, [toast]);

  const openOpponent = (id) => { setOpponentId(id); setTab("opponents"); setPackReady(false); };
  const addNote = () => {
    if (!noteText.trim()) { setToast("Add an observation before saving"); return; }
    const tags = noteText.toLowerCase().match(/press|corner|keeper|left|right|transition|formation|set piece/g)?.slice(0, 3) || ["coach observation"];
    setNotes((current) => [{ id: Date.now(), opponent: opponent.club, author: "Lisa Pitsos", team: noteTeam, date: "Today", text: noteText.trim(), tags }, ...current]);
    setNoteText(""); setToast("Observation added to club memory");
  };
  const generatePack = () => {
    setPackReady(false); setPackProgress(8);
    const steps = [24, 47, 69, 86, 100];
    steps.forEach((value, index) => setTimeout(() => { setPackProgress(value); if (value === 100) { setPackReady(true); setToast("AI Match Pack generated"); } }, 400 * (index + 1)));
  };

  return (
    <div className="fi-page">
      {toast && <div className="fi-toast">✓ {toast}</div>}
      <section className="fi-hero">
        <div>
          <button className="fi-back" type="button" onClick={() => onNavigate?.("admin")}>← Club Admin</button>
          <span>MATCHVISION · CLUB-OWNED FOOTBALL INTELLIGENCE</span>
          <h1>Football Intelligence Network</h1>
          <p>Every match, coach observation and training intervention becomes reusable knowledge for the whole club.</p>
        </div>
        <div className="fi-memory-score"><small>CLUB MEMORY</small><strong>88%</strong><span>+6% this month</span></div>
      </section>

      <nav className="fi-tabs">
        {TABS.map(([id, label]) => <button className={tab === id ? "active" : ""} key={id} onClick={() => setTab(id)}>{label}</button>)}
      </nav>

      {tab === "overview" && <>
        <section className="fi-stats">
          <Stat label="Opponents scouted" value="27" note="Across all age groups" />
          <Stat label="Matches analysed" value="146" note="Video + coach records" />
          <Stat label="Years of memory" value="4" note="Growing every round" />
          <Stat label="AI confidence" value="88%" note="Club-wide average" />
          <Stat label="Sessions measured" value="42" note="Linked to match outcomes" />
          <Stat label="Coach observations" value={notes.length + 127} note="Structured and searchable" />
        </section>
        <div className="fi-two-col">
          <section className="fi-panel fi-feed">
            <header><div><span>NEWEST INTELLIGENCE</span><h2>The club learned this week</h2></div><b>LIVE MEMORY</b></header>
            {[
              ["Today", "Oakleigh United", "Formation confidence increased", "Oakleigh switched between 2-3-2 and 3-2-2. High-press success is now supported by four age groups."],
              ["3 days ago", "Dandenong City", "Training effect confirmed", "Wide Transition Attack produced nine extra crosses and reduced central turnovers."],
              ["Last week", "Kingston City", "Set-piece pattern updated", "Far-post corners increased from 31% to 46% across the latest two observations."],
              ["2 weeks ago", "Bentleigh Greens", "Opponent identity changed", "Their press is starting five metres higher than early-season matches."],
            ].map(([time, club, title, text]) => <article key={time + club}><i /><div><small>{time} · {club}</small><strong>{title}</strong><p>{text}</p></div></article>)}
          </section>
          <section className="fi-panel">
            <header><div><span>KNOWLEDGE COVERAGE</span><h2>Where memory is strongest</h2></div></header>
            <Bar label="Opponent formations" value={94} />
            <Bar label="Build-up patterns" value={87} />
            <Bar label="Set-piece tendencies" value={78} />
            <Bar label="Training effectiveness" value={73} />
            <Bar label="Individual danger roles" value={61} />
            <div className="fi-insight"><span>AI PRIORITY</span><strong>Capture more goalkeeper distribution and set-piece notes from U8–U10 matches.</strong></div>
          </section>
        </div>
        <section className="fi-panel">
          <header><div><span>QUICK ACCESS</span><h2>Opponent memory</h2></div><button onClick={() => setTab("matchpack")}>Generate a Match Pack</button></header>
          <div className="fi-opponent-cards">{OPPONENTS.map((item) => <button key={item.id} onClick={() => openOpponent(item.id)}><span>{item.confidence}% confidence</span><strong>{item.club}</strong><small>{item.matches} matches · {item.formation} likely</small><b>{item.weakness}</b></button>)}</div>
        </section>
      </>}

      {tab === "opponents" && <>
        <section className="fi-search-row"><div><span>OPPONENT INTELLIGENCE</span><h2>Search the club’s tactical memory</h2></div><label>⌕<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search club or suburb..." /></label></section>
        <div className="fi-opponent-layout">
          <aside className="fi-opponent-list">{filtered.map((item) => <button className={item.id === opponentId ? "active" : ""} key={item.id} onClick={() => setOpponentId(item.id)}><strong>{item.club}</strong><span>{item.suburb} · {item.distance}</span><small>{item.matches} observations</small></button>)}</aside>
          <main>
            <section className="fi-panel fi-profile-head"><div><span>OPPONENT PROFILE</span><h2>{opponent.club}</h2><p>{opponent.suburb} · {opponent.distance} from Springvale</p></div><div className="fi-confidence"><strong>{opponent.confidence}%</strong><span>AI confidence</span></div></section>
            <section className="fi-stats compact"><Stat label="Played" value={opponent.matches} note="All Springvale teams" /><Stat label="Record" value={`${opponent.wins}-${opponent.draws}-${opponent.losses}`} note="W-D-L" /><Stat label="Goals" value={`${opponent.goalsFor}-${opponent.goalsAgainst}`} note="For-against" /><Stat label="Likely shape" value={opponent.formation} note="Current model" /></section>
            <div className="fi-two-col">
              <section className="fi-panel"><header><div><span>TACTICAL IDENTITY</span><h2>How they play</h2></div></header><div className="fi-identity-grid"><div><span>Build-up</span><strong>{opponent.buildUp}</strong></div><div><span>Press</span><strong>{opponent.press}</strong></div><div><span>Preferred side</span><strong>{opponent.attackSide}</strong></div><div><span>Danger role</span><strong>{opponent.danger}</strong></div></div><div className="fi-weakness"><span>PRIMARY OPPORTUNITY</span><strong>{opponent.weakness}</strong></div></section>
              <section className="fi-panel"><header><div><span>FORMATION MEMORY</span><h2>Observed structures</h2></div></header><Bar label={opponent.formation} value={opponent.formationSplit[0]} /><Bar label={opponent.alternatives[0]} value={opponent.formationSplit[1]} /><Bar label={opponent.alternatives[1]} value={opponent.formationSplit[2]} /></section>
            </div>
            <div className="fi-three-col">
              <section className="fi-panel"><header><div><span>ATTACKING ZONES</span><h2>Direction of attacks</h2></div></header><Bar label="Left" value={opponent.zones[0]} /><Bar label="Central" value={opponent.zones[1]} /><Bar label="Right" value={opponent.zones[2]} /></section>
              <section className="fi-panel"><header><div><span>SET PIECES</span><h2>Corner delivery</h2></div></header><Bar label="Near post" value={opponent.setPieces[0]} /><Bar label="Far post" value={opponent.setPieces[1]} /><Bar label="Short" value={opponent.setPieces[2]} /></section>
              <section className="fi-panel"><header><div><span>GOALKEEPER</span><h2>Distribution tendency</h2></div></header><Bar label="Short" value={opponent.keeper[0]} /><Bar label="Long" value={opponent.keeper[1]} /><Bar label="Left preference" value={opponent.keeper[2]} /></section>
            </div>
            <section className="fi-panel"><header><div><span>SCOUTING NOTES</span><h2>What Springvale coaches should know</h2></div><button onClick={() => setTab("coaches")}>Add observation</button></header><div className="fi-note-grid">{opponent.notes.map((note, i) => <article key={note}><b>0{i + 1}</b><p>{note}</p></article>)}</div></section>
          </main>
        </div>
      </>}

      {tab === "memory" && <>
        <section className="fi-panel fi-memory-intro"><div><span>CLUB TACTICAL MEMORY</span><h2>A permanent football brain that survives coach turnover</h2><p>Every authorised match adds formations, conditions, interventions, outcomes, notes and video evidence to a club-owned record.</p></div><div className="fi-flow">{["Upload match", "AI analysis", "Coach note", "Outcome linked", "Memory updated"].map((x, i) => <span key={x}><b>{i + 1}</b>{x}</span>)}</div></section>
        <section className="fi-panel"><header><div><span>MEMORY RECORDS</span><h2>{opponent.club} timeline</h2></div><select value={opponentId} onChange={(e) => setOpponentId(e.target.value)}>{OPPONENTS.map((x) => <option key={x.id} value={x.id}>{x.club}</option>)}</select></header><div className="fi-history-table"><div className="head"><span>Date / team</span><span>Venue</span><span>Result</span><span>Opponent shape</span><span>Training theme</span><span>Observed impact</span></div>{opponent.history.map((h) => <div key={h.date + h.team}><span><strong>{h.date}</strong><small>{h.team}</small></span><span>{h.venue}</span><span className={h.score.startsWith("W") ? "win" : h.score.startsWith("L") ? "loss" : "draw"}>{h.score}</span><span>{h.formation}</span><span>{h.theme}</span><span>{h.impact}</span></div>)}</div></section>
        <div className="fi-two-col"><section className="fi-panel"><header><div><span>WHAT WORKED</span><h2>Evidence across age groups</h2></div></header><div className="fi-evidence"><article><strong>High Press Recovery</strong><b>82% positive outcomes</b><p>Most effective when the first forward screens the return pass to the goalkeeper.</p></article><article><strong>Protect Left Channel</strong><b>−31% chances conceded</b><p>Supported by U10, U11 and U13 match records.</p></article></div></section><section className="fi-panel"><header><div><span>MEMORY EVOLUTION</span><h2>How the opponent changed</h2></div></header><div className="fi-yearline"><article><b>2025</b><strong>2-3-2 dominant</strong><span>Short goalkeeper build-up</span></article><article><b>2026</b><strong>3-2-2 emerging</strong><span>Left-sided attacks increased</span></article><article><b>NEXT</b><strong>Watch formation change</strong><span>AI confidence threshold: 3 observations</span></article></div></section></div>
      </>}

      {tab === "training" && <><section className="fi-panel"><header><div><span>TRAINING EFFECTIVENESS</span><h2>Did the session improve what happened next?</h2></div><button onClick={() => setToast("Session Builder evidence synced")}>Sync Session Builder</button></header><p className="fi-lead">MatchVision links planned training themes with subsequent match evidence. Correlation is shown as coaching support—not proof that one session caused a result.</p><div className="fi-training-grid">{TRAINING.map((t) => <article key={t.name}><div className="score">{t.score}</div><span>AI EFFECTIVENESS</span><h3>{t.name}</h3><p>Best fit: {t.fit}</p><div><small>Used</small><strong>{t.used} times</strong></div><div><small>Record</small><strong>{t.wins}W · {t.draws}D · {t.losses}L</strong></div><div><small>Possession</small><strong>{t.possession}</strong></div><div><small>Defensive impact</small><strong>{t.conceded}</strong></div><button onClick={() => setToast(`${t.name} opened in Session Builder`)}>Open session evidence</button></article>)}</div></section></>}

      {tab === "formations" && <><section className="fi-panel"><header><div><span>FORMATION LIBRARY</span><h2>Every structure Springvale has encountered</h2></div></header><div className="fi-formation-grid">{FORMATIONS.map((f) => <article key={f.name}><div className="pitch-shape"><b>{f.name}</b><i /><i /><i /><i /><i /><i /><i /></div><div><span>FACED {f.faced} TIMES</span><h3>{f.win}% win rate</h3><p><b>Best response:</b> {f.response}</p><p><b>Recommended session:</b> {f.sessions}</p><button onClick={() => setToast(`${f.name} tactical guide opened`)}>Open tactical guide</button></div></article>)}</div></section></>}

      {tab === "setpieces" && <><section className="fi-stats compact"><Stat label="Corners analysed" value="318" note="Across 146 matches" /><Stat label="Patterns detected" value="24" note="Opponent-specific" /><Stat label="Goals prevented" value="−29%" note="After targeted sessions" /><Stat label="Confidence" value="79%" note="Improves with clear video" /></section><div className="fi-three-col">{[["Corners", "Near-post overload", "Oakleigh United", 84], ["Goal kicks", "Short-left build", "Oakleigh United", 91], ["Throw-ins", "Line run + bounce pass", "Kingston City", 68], ["Free kicks", "Far-post crowd", "Mornington SC", 73], ["Kick-offs", "Immediate right channel", "Dandenong City", 61], ["Defensive corners", "Zonal front-post gap", "Bentleigh Greens", 58]].map(([type, pattern, club, confidence]) => <section className="fi-panel fi-setpiece" key={type}><span>{type.toUpperCase()}</span><h2>{pattern}</h2><p>{club}</p><Bar label="Confidence" value={confidence} /><button onClick={() => setToast(`${type} clip collection opened`)}>View evidence clips</button></section>)}</div></>}

      {tab === "coaches" && <><div className="fi-two-col"><section className="fi-panel"><header><div><span>ADD COACH KNOWLEDGE</span><h2>Capture what the camera may miss</h2></div></header><label className="fi-field"><span>Opponent</span><select value={opponentId} onChange={(e) => setOpponentId(e.target.value)}>{OPPONENTS.map((x) => <option value={x.id} key={x.id}>{x.club}</option>)}</select></label><label className="fi-field"><span>Team</span><select value={noteTeam} onChange={(e) => setNoteTeam(e.target.value)}><option>U10 Wallabies</option><option>U11 Wallabies</option><option>U12 Wallabies</option><option>U13 Wallabies</option><option>Senior Women</option></select></label><label className="fi-field"><span>Quick observation</span><textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="What worked? What changed? Who or what caused problems? What should the next coach know?" /></label><button className="fi-primary" onClick={addNote}>Add to club memory</button></section><section className="fi-panel"><header><div><span>AI STRUCTURING PREVIEW</span><h2>One note becomes searchable knowledge</h2></div></header><div className="fi-structure-preview"><article><span>Raw coach note</span><p>{noteText || "Their keeper always plays short to the left. Our first press forced three turnovers."}</p></article><b>↓</b><article><span>Structured memory</span><p><strong>Distribution:</strong> short-left<br/><strong>Intervention:</strong> high press<br/><strong>Observed outcome:</strong> 3 turnovers<br/><strong>Confidence:</strong> awaiting match evidence</p></article></div></section></div><section className="fi-panel"><header><div><span>COACH KNOWLEDGE LIBRARY</span><h2>{notes.length} saved observations</h2></div></header><div className="fi-coach-notes">{notes.map((note) => <article key={note.id}><div><strong>{note.opponent}</strong><span>{note.author} · {note.team} · {note.date}</span></div><p>{note.text}</p><footer>{note.tags.map((tag) => <b key={tag}>{tag}</b>)}</footer></article>)}</div></section></>}

      {tab === "trends" && <><section className="fi-panel"><header><div><span>HISTORICAL TRENDS</span><h2>How opponent behaviour and Springvale responses evolve</h2></div><select value={opponentId} onChange={(e) => setOpponentId(e.target.value)}>{OPPONENTS.map((x) => <option key={x.id} value={x.id}>{x.club}</option>)}</select></header><div className="fi-trend-chart"><div className="axis"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="bars"><article><i style={{height:"55%"}}/><b>Early 2025</b><span>Win 55%</span></article><article><i style={{height:"61%"}}/><b>Late 2025</b><span>Win 61%</span></article><article><i style={{height:"68%"}}/><b>Early 2026</b><span>Win 68%</span></article><article><i style={{height:"74%"}}/><b>Current</b><span>Win 74%</span></article></div></div><div className="fi-insight large"><span>AI TREND EXPLANATION</span><strong>Springvale outcomes improved after high-press recovery sessions were adopted across three age groups. At the same time, {opponent.club} increased left-sided build-up, so the model recommends protecting that channel rather than treating the win-rate change as a single-cause result.</strong></div></section></>}

      {tab === "matchpack" && <><section className="fi-matchpack-control"><div><span>AI MATCH PACK</span><h2>Turn club memory into a practical game plan</h2><p>Select an opponent and generate a coach-ready briefing from historical matches, video analysis, coach notes and session evidence.</p></div><label><span>Opponent</span><select value={opponentId} onChange={(e) => { setOpponentId(e.target.value); setPackReady(false); }} >{OPPONENTS.map((x) => <option key={x.id} value={x.id}>{x.club}</option>)}</select></label><button onClick={generatePack}>Generate AI Match Pack</button></section>{packProgress > 0 && !packReady && <section className="fi-generating"><div><span style={{width:`${packProgress}%`}} /></div><strong>{packProgress < 30 ? "Reading tactical memory..." : packProgress < 60 ? "Comparing formations and interventions..." : packProgress < 90 ? "Ranking training evidence..." : "Building coach briefing..."}</strong><b>{packProgress}%</b></section>}{packReady && <section className="fi-pack"><header><div><span>MATCHVISION AI MATCH PACK</span><h1>Springvale City vs {opponent.club}</h1><p>Prepared from {opponent.matches} club records · AI confidence {opponent.confidence}%</p></div><button onClick={() => setToast("Match Pack exported to PDF queue")}>Export / Share</button></header><div className="fi-pack-grid"><article><span>LIKELY FORMATION</span><strong>{opponent.formation}</strong><p>{opponent.formationSplit[0]}% of recent observations</p></article><article><span>LIKELY STYLE</span><strong>{opponent.buildUp}</strong><p>{opponent.press}</p></article><article><span>DANGER ROLE</span><strong>{opponent.danger}</strong><p>Track between lines and at transitions</p></article><article><span>PRIMARY OPPORTUNITY</span><strong>{opponent.weakness}</strong><p>Supported across multiple age groups</p></article></div><div className="fi-two-col"><section><span>RECOMMENDED GAME PLAN</span><h2>Press with purpose, protect the {opponent.attackSide.toLowerCase()} channel</h2><ol><li>Screen the goalkeeper’s preferred first pass.</li><li>Trigger the press when the receiver faces their own goal.</li><li>Keep the far-side defender narrow during the first transition.</li><li>Attack quickly after the regain before their shape recovers.</li></ol></section><section><span>RECOMMENDED TRAINING</span><div className="fi-pack-sessions"><article><b>01</b><div><strong>High Press Recovery</strong><p>92 AI effectiveness · 11W 2D 1L after use</p></div></article><article><b>02</b><div><strong>Protect the Left Channel</strong><p>Reduces chances from their strongest side</p></div></article><article><b>03</b><div><strong>Near-Post Defending</strong><p>{opponent.setPieces[0]}% near-post corner tendency</p></div></article></div></section></div><footer><div><span>COACH REMINDER</span><strong>Use this pack as decision support. Confirm patterns during the opening minutes and adjust to the actual match.</strong></div><button onClick={() => setToast("Match Pack sent to Session Builder")}>Build recommended session</button></footer></section>}</>}
    </div>
  );
}
