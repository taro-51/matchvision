import { useEffect, useMemo, useState } from "react";
import "./AdminClub.css";
import { getIntelligence } from "../lib/intelligence";

const teams = [
  { id: "u8", team: "U8 Wallabies", coach: "Daniel Kim", players: 16, attendance: 91, wins: 8, draws: 2, losses: 2, goalsFor: 36, goalsAgainst: 17, development: 84, wellbeing: 92, retentionRisk: 1 },
  { id: "u9", team: "U9 Wallabies", coach: "Sarah Nguyen", players: 18, attendance: 88, wins: 7, draws: 3, losses: 3, goalsFor: 31, goalsAgainst: 22, development: 81, wellbeing: 87, retentionRisk: 2 },
  { id: "u10", team: "U10 Wallabies", coach: "Michael Tran", players: 17, attendance: 86, wins: 6, draws: 2, losses: 4, goalsFor: 28, goalsAgainst: 24, development: 79, wellbeing: 85, retentionRisk: 2 },
  { id: "u11", team: "U11 Wallabies", coach: "Lisa Pitsos", players: 19, attendance: 93, wins: 9, draws: 2, losses: 1, goalsFor: 42, goalsAgainst: 16, development: 91, wellbeing: 94, retentionRisk: 0 },
  { id: "u12", team: "U12 Wallabies", coach: "Chris Patel", players: 18, attendance: 84, wins: 5, draws: 4, losses: 4, goalsFor: 25, goalsAgainst: 25, development: 77, wellbeing: 82, retentionRisk: 3 },
  { id: "u13", team: "U13 Wallabies", coach: "Anthony Russo", players: 20, attendance: 79, wins: 4, draws: 3, losses: 6, goalsFor: 21, goalsAgainst: 29, development: 73, wellbeing: 78, retentionRisk: 5 },
  { id: "u14", team: "U14 Wallabies", coach: "Rebecca Lee", players: 18, attendance: 87, wins: 7, draws: 1, losses: 4, goalsFor: 33, goalsAgainst: 23, development: 83, wellbeing: 88, retentionRisk: 2 },
  { id: "seniors", team: "Senior Women", coach: "Maria Costa", players: 23, attendance: 89, wins: 8, draws: 3, losses: 2, goalsFor: 38, goalsAgainst: 19, development: 88, wellbeing: 90, retentionRisk: 1 },
];

const opponents = [
  { club: "Oakleigh United", suburb: "Oakleigh", distance: "12 km", played: 18, wins: 11, draws: 3, losses: 4, goalsFor: 49, goalsAgainst: 31, trend: "+14%", ageGroups: "U8–Senior", lastResult: "W 3–2", strength: "Fast transitions" },
  { club: "Dandenong City", suburb: "Dandenong", distance: "8 km", played: 15, wins: 7, draws: 4, losses: 4, goalsFor: 34, goalsAgainst: 28, trend: "+4%", ageGroups: "U9–Senior", lastResult: "D 1–1", strength: "Compact midfield" },
  { club: "Noble Park United", suburb: "Noble Park", distance: "5 km", played: 13, wins: 9, draws: 2, losses: 2, goalsFor: 41, goalsAgainst: 20, trend: "+18%", ageGroups: "U8–U14", lastResult: "W 4–1", strength: "Direct attack" },
  { club: "Bentleigh Greens", suburb: "Bentleigh", distance: "16 km", played: 11, wins: 4, draws: 2, losses: 5, goalsFor: 20, goalsAgainst: 24, trend: "-3%", ageGroups: "U10–Senior", lastResult: "L 1–2", strength: "High technical level" },
  { club: "Kingston City", suburb: "Clayton South", distance: "7 km", played: 12, wins: 8, draws: 1, losses: 3, goalsFor: 32, goalsAgainst: 21, trend: "+11%", ageGroups: "U8–Senior", lastResult: "W 2–0", strength: "Wide overloads" },
  { club: "Mornington SC", suburb: "Mornington", distance: "42 km", played: 8, wins: 3, draws: 2, losses: 3, goalsFor: 15, goalsAgainst: 16, trend: "+1%", ageGroups: "U11–Senior", lastResult: "D 2–2", strength: "Strong set pieces" },
  { club: "Frankston Pines", suburb: "Frankston", distance: "28 km", played: 9, wins: 6, draws: 1, losses: 2, goalsFor: 27, goalsAgainst: 15, trend: "+9%", ageGroups: "U9–Senior", lastResult: "W 3–0", strength: "Aggressive press" },
];

const defaultPermissions = {
  parent: {
    childProfile: true,
    childStats: true,
    childHighlights: true,
    rawMatchVideo: false,
    teamScores: true,
    teamLadder: true,
    attendanceHistory: true,
    coachNotes: false,
    aiPlayerFeedback: true,
    teamTactics: false,
    otherPlayers: false,
    wellnessFlags: false,
  },
  player: {
    ownProfile: true,
    ownStats: true,
    ownHighlights: true,
    rawMatchVideo: false,
    teamScores: true,
    teamLadder: true,
    attendanceHistory: true,
    coachNotes: false,
    aiPlayerFeedback: true,
    teamTactics: false,
    otherPlayers: false,
    wellnessFlags: false,
  },
  coach: {
    assignedTeams: true,
    squadProfiles: true,
    squadAnalytics: true,
    teamTactics: true,
    attendance: true,
    wellnessFlags: true,
    medicalNotes: false,
    parentContacts: true,
    equipment: true,
    matchUploads: true,
    drillExchange: true,
    exportData: false,
  },
};

const permissionLabels = {
  childProfile: "Linked child profile",
  childStats: "Linked child match statistics",
  childHighlights: "Linked child highlights",
  ownProfile: "Own player profile",
  ownStats: "Own match statistics",
  ownHighlights: "Own highlights",
  rawMatchVideo: "Raw full-match video",
  teamScores: "Team scores and results",
  teamLadder: "Team ladder and season record",
  attendanceHistory: "Attendance history",
  coachNotes: "Private coach notes",
  aiPlayerFeedback: "AI player feedback",
  teamTactics: "Team tactical analysis",
  otherPlayers: "Other player profiles",
  wellnessFlags: "Wellbeing and safeguarding flags",
  assignedTeams: "Assigned teams",
  squadProfiles: "Squad player profiles",
  squadAnalytics: "Cross-player squad analytics",
  attendance: "Team attendance management",
  medicalNotes: "Restricted medical notes",
  parentContacts: "Parent contact details",
  equipment: "Equipment check-in and checkout",
  matchUploads: "Upload and analyse matches",
  drillExchange: "Drill Exchange and Session Builder",
  exportData: "Export club data",
};

const activity = [
  { time: "10:42", type: "Permission", detail: "Raw match video disabled for Parent role", user: "Club Administrator" },
  { time: "10:18", type: "Safeguarding", detail: "U13 attendance risk assigned to Welfare Officer", user: "Club Administrator" },
  { time: "09:55", type: "Equipment", detail: "U11 AI session kit approved for checkout", user: "Lisa Pitsos" },
  { time: "09:31", type: "Match", detail: "Springvale U11 v Oakleigh analysis completed", user: "Lisa Pitsos" },
  { time: "Yesterday", type: "User", detail: "New U9 parent account linked and verified", user: "Club Registrar" },
];

function Metric({ label, value, change, note }) {
  return (
    <article className="admin-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <b className={change?.startsWith("-") ? "down" : ""}>{change}</b>
      <small>{note}</small>
    </article>
  );
}

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      className={`admin-toggle ${checked ? "on" : ""}`}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      aria-pressed={checked}
    >
      <i />
    </button>
  );
}

export default function AdminClub({ user: _user, onNavigate, initialTab = "overview" }) {
  const intelligence = getIntelligence();
  const [tab, setTab] = useState(initialTab);
  const [permissions, setPermissions] = useState(defaultPermissions);
  const [opponentSearch, setOpponentSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("All teams");
  const [season, setSeason] = useState("2026");
  const [toast, setToast] = useState("");
  const [aiBriefOpen, setAiBriefOpen] = useState(true);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        window.localStorage.getItem("matchvisionAdminPermissions") || "null"
      );
      if (stored) setPermissions(stored);
    } catch {
      // Keep safe defaults.
    }
  }, []);

  const totals = useMemo(() => {
    const players = teams.reduce((sum, team) => sum + team.players, 0);
    const wins = teams.reduce((sum, team) => sum + team.wins, 0);
    const draws = teams.reduce((sum, team) => sum + team.draws, 0);
    const losses = teams.reduce((sum, team) => sum + team.losses, 0);
    const goalsFor = teams.reduce((sum, team) => sum + team.goalsFor, 0);
    const goalsAgainst = teams.reduce((sum, team) => sum + team.goalsAgainst, 0);
    const weightedAttendance = Math.round(
      teams.reduce((sum, team) => sum + team.attendance * team.players, 0) / players
    );
    return { players, wins, draws, losses, goalsFor, goalsAgainst, weightedAttendance };
  }, []);

  const filteredTeams = useMemo(
    () => teams.filter((team) => teamFilter === "All teams" || team.team === teamFilter),
    [teamFilter]
  );

  const filteredOpponents = useMemo(() => {
    const clubTerm = opponentSearch.trim().toLowerCase();
    const locationTerm = locationSearch.trim().toLowerCase();
    return opponents.filter(
      (opponent) =>
        (!clubTerm || opponent.club.toLowerCase().includes(clubTerm)) &&
        (!locationTerm || opponent.suburb.toLowerCase().includes(locationTerm))
    );
  }, [opponentSearch, locationSearch]);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function updatePermission(role, key, value) {
    const next = {
      ...permissions,
      [role]: { ...permissions[role], [key]: value },
    };
    setPermissions(next);
    try {
      window.localStorage.setItem("matchvisionAdminPermissions", JSON.stringify(next));
    } catch {
      // Demo remains functional.
    }
    showToast(`${permissionLabels[key]} ${value ? "enabled" : "disabled"} for ${role}`);
  }

  function resetPermissions() {
    setPermissions(defaultPermissions);
    try {
      window.localStorage.setItem(
        "matchvisionAdminPermissions",
        JSON.stringify(defaultPermissions)
      );
    } catch {
      // Demo remains functional.
    }
    showToast("Safe club permission defaults restored");
  }

  return (
    <div className="admin-club-page">
      <section className="admin-hero">
        <div>
          <span>CLUB ADMINISTRATION · PRIVATE CLUB INTELLIGENCE</span>
          <h2>Control the club, protect every player and understand the whole organisation.</h2>
          <p>
            This workspace is visible only to authorised Springvale City administrators.
            It combines governance, permissions, attendance, football performance,
            safeguarding, operations and AI club-health intelligence.
          </p>
        </div>
        <div className="admin-hero-actions">
          <select value={season} onChange={(event) => setSeason(event.target.value)}>
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
          <button type="button" onClick={() => showToast("Board report prepared for export")}>
            Export board report
          </button>
          <button className="admin-primary" type="button" onClick={() => setTab("access")}>
            Manage access
          </button>
        </div>
      </section>

      <section className="admin-security-strip">
        <div><i /> <strong>Administrator-only area</strong></div>
        <span>Last permission review: Today, 10:42</span>
        <span>2-factor authentication: Enforced</span>
        <span>Data residency: Australia</span>
        <span>Audit log: Active</span>
      </section>

      <nav className="admin-tabs">
        {[
          ["overview", "Club Overview"],
          ["performance", "Football Performance"],
          ["attendance", "Attendance Intelligence"],
          ["opponents", "Opponent Explorer"],
          ["access", "Access Control"],
          ["health", "AI Club Health"],
          ["governance", "Governance & Safety"],
          ["settings", "Club Settings"],
        ].map(([id, label]) => (
          <button
            type="button"
            key={id}
            className={tab === id ? "active" : ""}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {tab === "overview" && (
        <>
          <section className="admin-metrics-grid">
            <Metric label="Registered players" value={totals.players} change="+12" note="Across 8 active teams" />
            <Metric label="Club attendance" value={`${totals.weightedAttendance}%`} change="+3.8%" note="Training and match attendance" />
            <Metric label="Season record" value={`${totals.wins}-${totals.draws}-${totals.losses}`} change="+9 wins" note="All competitive teams" />
            <Metric label="Goal difference" value={`+${totals.goalsFor - totals.goalsAgainst}`} change="+18%" note={`${totals.goalsFor} scored · ${totals.goalsAgainst} conceded`} />
            <Metric label="Member retention" value="94%" change="+2.1%" note="Forecast for next registration period" />
            <Metric label="Coach compliance" value="96%" change="+4%" note="Credentials, checks and education" />
          </section>

          {aiBriefOpen && (
            <section className="admin-ai-brief">
              <div className="admin-ai-icon">AI</div>
              <div>
                <span>MATCHVISION CLUB PULSE · {intelligence.club.analysedMatches} ANALYSED MATCHES</span>
                <h3>Springvale City development is {intelligence.club.developmentTrend}; one age-band still requires intervention.</h3>
                <p>
                  The latest match added {intelligence.findings.priority.toLowerCase()} to the club-wide coaching priority. The club’s strongest combined indicators are U11 performance, member wellbeing
                  and {intelligence.club.equipmentReadiness} equipment readiness. U13 attendance has fallen for four consecutive weeks
                  and now correlates with five elevated retention-risk profiles. MatchVision
                  recommends a coach check-in, parent pulse survey and revised Thursday session time.
                </p>
                <div className="admin-ai-actions">
                  <button type="button" onClick={() => setTab("health")}>Open Club Health</button>
                  <button type="button" onClick={() => showToast("Intervention plan assigned to Welfare Officer")}>
                    Assign intervention
                  </button>
                </div>
              </div>
              <button className="admin-close" type="button" onClick={() => setAiBriefOpen(false)}>×</button>
            </section>
          )}

          <div className="admin-two-column">
            <section className="admin-panel">
              <header>
                <div><span>WHOLE-CLUB PERFORMANCE</span><h3>Team health matrix</h3></div>
                <select value={teamFilter} onChange={(event) => setTeamFilter(event.target.value)}>
                  <option>All teams</option>
                  {teams.map((team) => <option key={team.id}>{team.team}</option>)}
                </select>
              </header>
              <div className="admin-team-table">
                <div className="table-head">
                  <span>Team</span><span>Attendance</span><span>Record</span><span>Development</span><span>Wellbeing</span>
                </div>
                {filteredTeams.map((team) => (
                  <div className="table-row" key={team.id}>
                    <span><strong>{team.team}</strong><small>{team.coach} · {team.players} players</small></span>
                    <span><b>{team.attendance}%</b><i className="mini-bar"><em style={{ width: `${team.attendance}%` }} /></i></span>
                    <span>{team.wins}W · {team.draws}D · {team.losses}L</span>
                    <span>{team.development}/100</span>
                    <span className={team.wellbeing < 80 ? "warning-text" : "positive-text"}>{team.wellbeing}/100</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="admin-panel">
              <header><div><span>OPERATIONS</span><h3>Club today</h3></div></header>
              <div className="admin-operations">
                <article><span>Players expected tonight</span><strong>104</strong><small>Across six training sessions</small></article>
                <article><span>Coaches confirmed</span><strong>11 / 12</strong><small>One assistant pending</small></article>
                <article><span>Equipment reservations</span><strong>7</strong><small>One shortage requires action</small></article>
                <article><span>Unread safeguarding items</span><strong className="warning-text">2</strong><small>Administrator review required</small></article>
                <article><span>Ground utilisation</span><strong>86%</strong><small>Peak demand 5:45–7:15 pm</small></article>
                <article><span>Volunteer coverage</span><strong>91%</strong><small>Two canteen vacancies</small></article>
              </div>
            </section>
          </div>

          <section className="admin-panel">
            <header><div><span>CLUB ACTIVITY</span><h3>Administrator audit stream</h3></div><button onClick={() => setTab("governance")}>View full audit log</button></header>
            <div className="admin-activity">
              {activity.map((item, index) => (
                <article key={`${item.time}-${index}`}>
                  <b>{item.time}</b><span>{item.type}</span><strong>{item.detail}</strong><small>{item.user}</small>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === "performance" && (
        <>
          <section className="admin-control-row">
            <div><span>FOOTBALL PERFORMANCE</span><h3>Whole-club competitive and development analysis</h3></div>
            <select value={teamFilter} onChange={(event) => setTeamFilter(event.target.value)}>
              <option>All teams</option>
              {teams.map((team) => <option key={team.id}>{team.team}</option>)}
            </select>
          </section>

          <section className="admin-metrics-grid four">
            <Metric label="Win rate" value="61%" change="+8%" note="Compared with last season" />
            <Metric label="Goals per match" value="2.73" change="+0.31" note="All competitive fixtures" />
            <Metric label="Conceded per match" value="1.58" change="-0.22" note="Lower is better" />
            <Metric label="Player development index" value="82.0" change="+5.4" note="AI longitudinal score" />
          </section>

          <div className="admin-two-column">
            <section className="admin-panel">
              <header><div><span>TEAM BENCHMARKING</span><h3>Performance by team</h3></div></header>
              <div className="admin-team-table performance">
                <div className="table-head">
                  <span>Team</span><span>Win rate</span><span>Goal diff.</span><span>Development</span><span>Club rank</span>
                </div>
                {filteredTeams.map((team, index) => {
                  const played = team.wins + team.draws + team.losses;
                  const winRate = Math.round((team.wins / played) * 100);
                  const difference = team.goalsFor - team.goalsAgainst;
                  return (
                    <div className="table-row" key={team.id}>
                      <span><strong>{team.team}</strong><small>{team.coach}</small></span>
                      <span>{winRate}%</span>
                      <span className={difference >= 0 ? "positive-text" : "warning-text"}>{difference >= 0 ? "+" : ""}{difference}</span>
                      <span>{team.development}/100</span>
                      <span>#{index + 1}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="admin-panel">
              <header><div><span>AI STYLE OF PLAY DNA</span><h3>Springvale club identity</h3></div></header>
              <div className="dna-grid">
                <article><span>Ball retention</span><strong>78</strong><i><em style={{ width: "78%" }} /></i></article>
                <article><span>Press intensity</span><strong>84</strong><i><em style={{ width: "84%" }} /></i></article>
                <article><span>Transition speed</span><strong>88</strong><i><em style={{ width: "88%" }} /></i></article>
                <article><span>Defensive compactness</span><strong>72</strong><i><em style={{ width: "72%" }} /></i></article>
                <article><span>Player rotation equity</span><strong>91</strong><i><em style={{ width: "91%" }} /></i></article>
              </div>
              <div className="unique-callout">
                <span>UNIQUE INSIGHT</span>
                <strong>Club Identity Drift Detection</strong>
                <p>
                  MatchVision compares the playing principles taught by every coach with the
                  club’s defined football philosophy. U13 currently differs most from the club
                  model in build-up spacing and player rotation equity.
                </p>
              </div>
            </section>
          </div>
        </>
      )}

      {tab === "attendance" && (
        <>
          <section className="admin-metrics-grid">
            <Metric label="Members attended this week" value="139 / 149" change="+5" note="93.3% unique player attendance" />
            <Metric label="Training attendances" value="412" change="+21" note="Across all weekly sessions" />
            <Metric label="Match attendances" value="142" change="+7" note="Players marked available and present" />
            <Metric label="Late arrivals" value="18" change="-6" note="Down from last week" />
            <Metric label="Unexplained absences" value="7" change="-3" note="Require follow-up" />
            <Metric label="Attendance risk profiles" value="5" change="+2" note="AI early-warning indicator" />
          </section>

          <div className="admin-two-column">
            <section className="admin-panel">
              <header><div><span>ATTENDANCE BY TEAM</span><h3>Club member participation</h3></div></header>
              <div className="attendance-bars">
                {teams.map((team) => (
                  <article key={team.id}>
                    <div><strong>{team.team}</strong><span>{Math.round(team.players * team.attendance / 100)} of {team.players} average</span></div>
                    <i><em style={{ width: `${team.attendance}%` }} /></i>
                    <b>{team.attendance}%</b>
                  </article>
                ))}
              </div>
            </section>

            <section className="admin-panel">
              <header><div><span>AI ATTENDANCE FORECAST</span><h3>Next seven days</h3></div></header>
              <div className="forecast-list">
                <article><span>Monday</span><strong>88 expected</strong><b>Low risk</b></article>
                <article><span>Tuesday</span><strong>104 expected</strong><b>Low risk</b></article>
                <article><span>Wednesday</span><strong>76 expected</strong><b className="medium">Weather risk</b></article>
                <article><span>Thursday</span><strong>96 expected</strong><b className="medium">U13 risk</b></article>
                <article><span>Weekend</span><strong>143 expected</strong><b>Low risk</b></article>
              </div>
              <div className="unique-callout">
                <span>UNIQUE INSIGHT</span>
                <strong>Silent Drop-Off Detection</strong>
                <p>
                  MatchVision detects gradual disengagement before a player formally leaves:
                  declining attendance, reduced match availability, unread messages and lower
                  training involvement are combined into a private retention-risk signal.
                </p>
              </div>
            </section>
          </div>

          <section className="admin-panel">
            <header><div><span>INTERVENTION QUEUE</span><h3>Members requiring administrator attention</h3></div><button onClick={() => showToast("Attendance follow-up workflow opened")}>Start follow-up workflow</button></header>
            <div className="risk-list">
              {[
                ["U13", "5 players", "Attendance below 70% for 3+ weeks", "High"],
                ["U12", "3 players", "Repeated unexplained absences", "Medium"],
                ["U9", "2 players", "Transport-related late arrivals", "Medium"],
                ["Senior Women", "1 player", "Return-to-play attendance plan", "Review"],
              ].map(([team, count, reason, risk]) => (
                <article key={team}>
                  <strong>{team}</strong><span>{count}</span><p>{reason}</p><b className={risk === "High" ? "high-risk" : ""}>{risk}</b>
                  <button type="button" onClick={() => showToast(`${team} intervention assigned`)}>Assign</button>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === "opponents" && (
        <>
          <section className="admin-opponent-search">
            <div><span>OPPONENT EXPLORER</span><h3>Search clubs, suburbs and whole-club head-to-head records</h3><p>Results combine every authorised Springvale team and season in the selected reporting period.</p></div>
            <label><span>⌕</span><input value={opponentSearch} onChange={(event) => setOpponentSearch(event.target.value)} placeholder="Search club name..." /></label>
            <label><span>⌖</span><input value={locationSearch} onChange={(event) => setLocationSearch(event.target.value)} placeholder="Search suburb or location..." /></label>
          </section>

          <section className="admin-metrics-grid four">
            <Metric label="Clubs faced" value="27" change="+4" note="Across all teams" />
            <Metric label="Best club record" value="69%" change="+11%" note="Versus Noble Park United" />
            <Metric label="Most-played opponent" value="18" change="+3" note="Oakleigh United" />
            <Metric label="Travel burden" value="17.4 km" change="-2.1 km" note="Average away distance" />
          </section>

          <section className="admin-panel">
            <header><div><span>CLUB-TO-CLUB RECORDS</span><h3>{filteredOpponents.length} matching clubs</h3></div><button onClick={() => showToast("Opponent comparison exported")}>Export comparison</button></header>
            <div className="opponent-table">
              <div className="table-head">
                <span>Club / location</span><span>Record</span><span>Win rate</span><span>Goals</span><span>Trend</span><span>Latest</span><span>AI scouting</span>
              </div>
              {filteredOpponents.map((opponent) => {
                const winRate = Math.round(opponent.wins / opponent.played * 100);
                return (
                  <div className="table-row" key={opponent.club}>
                    <span><strong>{opponent.club}</strong><small>{opponent.suburb} · {opponent.distance} · {opponent.ageGroups}</small></span>
                    <span>{opponent.wins}W · {opponent.draws}D · {opponent.losses}L</span>
                    <span><b>{winRate}%</b><i className="mini-bar"><em style={{ width: `${winRate}%` }} /></i></span>
                    <span>{opponent.goalsFor}–{opponent.goalsAgainst}</span>
                    <span className={opponent.trend.startsWith("-") ? "warning-text" : "positive-text"}>{opponent.trend}</span>
                    <span>{opponent.lastResult}</span>
                    <span><button type="button" onClick={() => showToast(`${opponent.club} scouting report opened`)}>{opponent.strength}</button></span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="admin-unique-grid">
            <article>
              <span>UNIQUE · LOCAL FOOTBALL MAP</span>
              <h3>Competitive geography</h3>
              <p>Understand where the club wins, loses, travels and recruits across Melbourne’s south-east.</p>
              <div className="location-map">
                <i className="home-dot">SC</i><i className="map-dot one" /><i className="map-dot two" /><i className="map-dot three" /><i className="map-dot four" />
                <span className="map-ring" />
              </div>
            </article>
            <article>
              <span>UNIQUE · OPPONENT LEARNING MEMORY</span>
              <h3>The club remembers every opponent</h3>
              <p>
                MatchVision builds an evolving, club-owned tactical memory from every age group:
                common formations, strengths, set-piece patterns, travel outcomes and which
                Springvale training themes produced better results next time.
              </p>
              <button type="button" onClick={() => onNavigate?.("football-intelligence")}>Open tactical memory</button>
            </article>
          </section>
        </>
      )}

      {tab === "access" && (
        <>
          <section className="admin-control-row">
            <div>
              <span>ROLE-BASED ACCESS CONTROL</span>
              <h3>The club decides exactly what each type of user can see.</h3>
              <p>Changes are saved for the demo and recorded in the administrator audit history.</p>
            </div>
            <button type="button" onClick={resetPermissions}>Restore safe defaults</button>
          </section>

          <section className="permission-warning">
            <strong>Privacy rule locked by design</strong>
            <p>
              Parents can never access an unlinked child. Players can never access another
              player profile. Only authorised coaches and administrators can receive
              cross-player or team tactical information.
            </p>
          </section>

          <div className="permission-columns">
            {Object.entries(permissions).map(([role, settings]) => (
              <section className="permission-card" key={role}>
                <header>
                  <div className={`role-icon ${role}`}>{role === "parent" ? "P" : role === "player" ? "PL" : "C"}</div>
                  <div><span>{role.toUpperCase()} ACCESS</span><h3>{role === "parent" ? "Linked children only" : role === "player" ? "Own profile only" : "Assigned teams and tools"}</h3></div>
                </header>
                <div className="permission-list">
                  {Object.entries(settings).map(([key, enabled]) => {
                    const lockedOff =
                      (role === "parent" && ["otherPlayers", "teamTactics", "wellnessFlags"].includes(key)) ||
                      (role === "player" && ["otherPlayers", "teamTactics", "wellnessFlags"].includes(key));
                    return (
                      <article key={key}>
                        <div><strong>{permissionLabels[key]}</strong><small>{lockedOff ? "Privacy locked" : enabled ? "Visible" : "Hidden"}</small></div>
                        <Toggle
                          checked={enabled}
                          disabled={lockedOff}
                          onChange={(value) => updatePermission(role, key, value)}
                        />
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <section className="admin-panel">
            <header><div><span>DATA-SCOPE RULES</span><h3>Fine-grained club policies</h3></div><button onClick={() => showToast("Policy rule created")}>＋ Create policy rule</button></header>
            <div className="policy-rules">
              {[
                ["Youth raw footage", "Parent access requires club approval and player-link verification", "Active"],
                ["Medical information", "Visible only to named welfare and first-aid roles", "Active"],
                ["Coach cross-team access", "Restricted to assigned team unless Director of Football grants access", "Active"],
                ["Player highlights", "Publish only after coach approval and safeguarding scan", "Active"],
                ["Data export", "Administrator permission and audit reason required", "Active"],
              ].map(([name, rule, status]) => (
                <article key={name}><div><strong>{name}</strong><p>{rule}</p></div><b>{status}</b><button onClick={() => showToast(`${name} opened for editing`)}>Edit</button></article>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === "health" && (
        <>
          <section className="admin-metrics-grid">
            <Metric label="Club Health Score" value="88 / 100" change="+4" note="Composite private AI score" />
            <Metric label="Development equity" value="91%" change="+3%" note="Opportunity distributed across squads" />
            <Metric label="Wellbeing pulse" value="87%" change="-1%" note="Anonymous and safeguarded" />
            <Metric label="Retention forecast" value="94%" change="+2%" note="Next registration period" />
            <Metric label="Coach load balance" value="82%" change="+5%" note="Workload and support coverage" />
            <Metric label="Operational readiness" value="93%" change="+6%" note="Grounds, staff and equipment" />
          </section>

          <section className="admin-unique-grid health">
            <article>
              <span>UNIQUE · DEVELOPMENT EQUITY ENGINE</span>
              <h3>Are opportunities fair across the whole club?</h3>
              <p>
                Compares game time, starts, positional exposure, coaching contact, match
                involvement and progression opportunities without ranking children publicly.
              </p>
              <strong>91% equitable</strong>
              <small>Three U13 players require rotation review.</small>
            </article>
            <article>
              <span>UNIQUE · COACH IMPACT WITHOUT PUBLIC RANKINGS</span>
              <h3>Measure support, not just wins.</h3>
              <p>
                Coach impact combines attendance growth, player development, parent communication,
                retention, safeguarding compliance and session quality—not only results.
              </p>
              <strong>7 of 8 teams improving</strong>
              <small>One coach-support conversation recommended.</small>
            </article>
            <article>
              <span>UNIQUE · CLUB MEMORY</span>
              <h3>Institutional knowledge that does not disappear.</h3>
              <p>
                Preserves approved drills, successful interventions, opponent learning,
                season reviews and age-group transitions when volunteers or coaches change.
              </p>
              <strong>1,284 insights retained</strong>
              <small>Across matches, sessions and club operations.</small>
            </article>
            <article>
              <span>UNIQUE · BURNOUT AND CAPACITY RADAR</span>
              <h3>Spot strain before volunteers leave.</h3>
              <p>
                Detects overload from message volume, session coverage, late cancellations,
                equipment duties, admin work and unresolved actions.
              </p>
              <strong>2 staff at medium risk</strong>
              <small>Redistribution plan available.</small>
            </article>
          </section>

          <section className="admin-panel">
            <header><div><span>AI PRIORITY BOARD</span><h3>What the club should act on next</h3></div><button onClick={() => showToast("Weekly AI priority brief scheduled")}>Schedule weekly brief</button></header>
            <div className="priority-board">
              <article className="urgent"><b>1</b><div><span>RETENTION</span><strong>U13 attendance decline</strong><p>Meet coach, survey families and review Thursday timetable.</p></div><button onClick={() => showToast("U13 action plan started")}>Start plan</button></article>
              <article><b>2</b><div><span>DEVELOPMENT</span><strong>Improve defensive compactness across U10–U13</strong><p>AI found a recurring club-wide tactical trend in 14 matches.</p></div><button onClick={() => showToast("Cross-club session plan generated")}>Generate plan</button></article>
              <article><b>3</b><div><span>OPERATIONS</span><strong>Mini-goal shortage during Tuesday peak</strong><p>Three simultaneous sessions require four more mini goals.</p></div><button onClick={() => showToast("Equipment redistribution opened")}>Resolve</button></article>
              <article><b>4</b><div><span>COACH SUPPORT</span><strong>Assistant coverage for U12</strong><p>Session complexity and attendance indicate additional support.</p></div><button onClick={() => showToast("Volunteer matching opened")}>Find volunteer</button></article>
            </div>
          </section>
        </>
      )}

      {tab === "governance" && (
        <>
          <section className="admin-metrics-grid four">
            <Metric label="WWCC compliance" value="100%" change="All current" note="18 coaches and volunteers" />
            <Metric label="Required documents" value="97%" change="+4%" note="Three renewals due soon" />
            <Metric label="Open incidents" value="2" change="-1" note="Restricted administrator access" />
            <Metric label="Consent coverage" value="98%" change="+2%" note="Video and analytics consent" />
          </section>
          <div className="admin-two-column">
            <section className="admin-panel">
              <header><div><span>SAFEGUARDING CONTROL CENTRE</span><h3>Restricted items</h3></div><button onClick={() => showToast("New restricted incident form opened")}>＋ Record incident</button></header>
              <div className="governance-list">
                <article><i className="amber" /><div><strong>2 wellbeing items awaiting review</strong><p>Visible only to named safeguarding administrators.</p></div><button onClick={() => showToast("Restricted wellbeing review opened")}>Review</button></article>
                <article><i /><div><strong>All WWCC records current</strong><p>Next expiry in 42 days.</p></div><button onClick={() => showToast("WWCC compliance register opened")}>Open register</button></article>
                <article><i /><div><strong>Video consent complete for 146 / 149 players</strong><p>Three accounts remain excluded from raw footage.</p></div><button onClick={() => showToast("Consent reminder prepared for three families")}>Contact families</button></article>
                <article><i /><div><strong>Emergency contact test complete</strong><p>97% confirmed within the last six months.</p></div><button onClick={() => showToast("Emergency contact gaps opened")}>View gaps</button></article>
              </div>
            </section>
            <section className="admin-panel">
              <header><div><span>COMPLIANCE CALENDAR</span><h3>Upcoming obligations</h3></div></header>
              <div className="compliance-list">
                <article><b>12 AUG</b><div><strong>Coach qualification renewals</strong><span>3 records</span></div></article>
                <article><b>28 AUG</b><div><strong>Safeguarding policy review</strong><span>Board approval</span></div></article>
                <article><b>04 SEP</b><div><strong>Equipment safety inspection</strong><span>All training assets</span></div></article>
                <article><b>18 SEP</b><div><strong>Data-access review</strong><span>All elevated roles</span></div></article>
              </div>
            </section>
          </div>
          <section className="admin-panel">
            <header><div><span>IMMUTABLE AUDIT VIEW</span><h3>Who saw or changed protected information</h3></div><button onClick={() => showToast("Audit log exported")}>Export audit log</button></header>
            <div className="audit-table">
              {activity.concat([
                { time: "Yesterday", type: "Consent", detail: "Player video consent updated", user: "Club Registrar" },
                { time: "Friday", type: "Access", detail: "Temporary welfare role expired automatically", user: "System" },
              ]).map((item, index) => (
                <article key={index}><b>{item.time}</b><span>{item.type}</span><strong>{item.detail}</strong><small>{item.user}</small><em>Verified</em></article>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === "settings" && (
        <>
          <section className="admin-settings-grid">
            <section className="admin-panel settings">
              <header><div><span>CLUB IDENTITY</span><h3>Springvale City Soccer Club</h3></div></header>
              <label><span>Club name</span><input defaultValue="Springvale City Soccer Club" /></label>
              <label><span>Home ground</span><input defaultValue="Ross Reserve, Noble Park" /></label>
              <label><span>Club timezone</span><select defaultValue="Australia/Melbourne"><option>Australia/Melbourne</option></select></label>
              <label><span>Season year</span><input defaultValue="2026" /></label>
              <button className="admin-primary" onClick={() => showToast("Club identity settings saved")}>Save club identity</button>
            </section>

            <section className="admin-panel settings">
              <header><div><span>AI GOVERNANCE</span><h3>How MatchVision may use club data</h3></div></header>
              {[
                ["Generate team tactical analysis", true],
                ["Generate private player feedback", true],
                ["Create cross-team club insights", true],
                ["Use de-identified club benchmarks", false],
                ["Automatically publish highlights", false],
                ["Require coach approval before parent release", true],
              ].map(([label, enabled]) => (
                <article className="setting-toggle" key={label}>
                  <span>{label}</span><Toggle checked={enabled} onChange={() => showToast(`${label} updated`)} />
                </article>
              ))}
            </section>

            <section className="admin-panel settings">
              <header><div><span>NOTIFICATIONS</span><h3>Administrator alert thresholds</h3></div></header>
              <label><span>Attendance risk alert below</span><select defaultValue="70%"><option>60%</option><option>70%</option><option>75%</option></select></label>
              <label><span>Equipment overdue alert</span><select defaultValue="2 hours"><option>Immediately</option><option>2 hours</option><option>24 hours</option></select></label>
              <label><span>Retention-risk summary</span><select defaultValue="Weekly"><option>Daily</option><option>Weekly</option><option>Monthly</option></select></label>
              <label><span>Board intelligence report</span><select defaultValue="Monthly"><option>Weekly</option><option>Monthly</option><option>Quarterly</option></select></label>
              <button className="admin-primary" onClick={() => showToast("Notification thresholds saved")}>Save alerts</button>
            </section>

            <section className="admin-panel settings">
              <header><div><span>DATA RETENTION</span><h3>Club privacy and lifecycle controls</h3></div></header>
              <label><span>Raw youth match video</span><select defaultValue="12 months"><option>6 months</option><option>12 months</option><option>24 months</option></select></label>
              <label><span>Player analytics after departure</span><select defaultValue="Archive for 24 months"><option>Delete immediately</option><option>Archive for 12 months</option><option>Archive for 24 months</option></select></label>
              <label><span>Audit history</span><select defaultValue="7 years"><option>3 years</option><option>7 years</option><option>Indefinite</option></select></label>
              <button className="admin-primary" onClick={() => showToast("Data-retention policy saved")}>Save data policy</button>
            </section>
          </section>
        </>
      )}

      {toast && <div className="admin-toast">{toast}</div>}
    </div>
  );
}
