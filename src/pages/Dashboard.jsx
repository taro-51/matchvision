import { useState } from "react";
import "./Dashboard.css";
import springvaleLogo from "../assets/springvale-city-logo.png";
import { demoAwardHistory, demoPlayerProfiles } from "../data/playerProfile";
import { getRecognitionRecords } from "../data/recognition";

export default function Dashboard({ role = "coach", user, onNavigate }) {
  const individualMode = role === "parent" || role === "player";
  const firstName = user?.name?.split(" ")[0] || "Lisa";
  const linkedChildren = role === "parent" ? user?.linkedChildren || [] : [];
  const [activeChildId, setActiveChildId] = useState(linkedChildren[0]?.id || "ava");
  const child = demoPlayerProfiles[activeChildId] || demoPlayerProfiles.ava;
  const childRecognition = getRecognitionRecords().find((record) => record.playerId === activeChildId);
  const workflow = [
    ["Record", "live"], ["Upload", "matches"], ["Library", "matches"],
    ["AI Analysis", role === "parent" ? "child-analysis" : role === "player" ? "player-development" : "analysis"],
    ["Player Stats", individualMode ? "player-stats" : "team"], ["Highlights", "highlights"],
    ["Coach Insights", individualMode ? "player-development" : "analysis"],
    ["Drills", role === "coach" ? "drills" : individualMode ? "player-development" : "football-intelligence"],
    ["Session", role === "coach" ? "session-builder" : individualMode ? "player-development" : "admin"],
    ["Development", individualMode ? "player-development" : "team"],
    ["Awards", individualMode ? "player-awards" : "club-awards"],
  ];

  return (
    <div className="mv-dashboard">
      <section className="mv-welcome">
        <div>
          <span>WELCOME BACK</span>
          <h2>Good afternoon, {firstName} 👋</h2>
          <p>Your team, live match and AI intelligence are connected.</p>
        </div>
      </section>

      {role === "parent" && <section className="parent-child-dashboard">
        <header><div><span>MY CHILDREN</span><h2>How is my child progressing?</h2></div><div>{linkedChildren.map((linkedChild) => <button type="button" className={activeChildId === linkedChild.id ? "active" : ""} key={linkedChild.id} onClick={() => setActiveChildId(linkedChild.id)}>{linkedChild.name}<small>{linkedChild.team}</small></button>)}</div></header>
        <div className="parent-child-summary"><article className="child-identity"><div>{child.initials}</div><span><strong>{child.name}</strong><small>{child.team} · #{child.number}</small></span><button type="button" onClick={() => onNavigate("player-profile")}>Open profile →</button></article>{child.stats.slice(0,3).map(([label,value]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div>
        {childRecognition && <section className="parent-recognition-summary"><img src={childRecognition.certificateImage} alt="Best On Field certificate" /><div><span>YOUR CHILD'S LATEST RECOGNITION</span><h3>🏆 {childRecognition.awardType} Award</h3><dl><div><dt>Player</dt><dd>{childRecognition.playerName}</dd></div><div><dt>Match</dt><dd>{childRecognition.match}</dd></div><div><dt>Coach</dt><dd>{childRecognition.coach}</dd></div></dl><div className="parent-recognition-actions"><button type="button" onClick={() => onNavigate("player-certificates")}>View Certificate</button>{childRecognition.reward && <button type="button" onClick={() => onNavigate("player-rewards")}>🎁 Reward Available · View Reward</button>}</div></div></section>}
        <div className="parent-progress-grid"><article><span>LATEST HIGHLIGHT</span><strong>{child.highlights[0]}</strong><button type="button" onClick={() => onNavigate("highlights")}>Watch highlight →</button></article><article><span>LATEST AWARD</span><strong>{demoAwardHistory[0][0]}</strong><button type="button" onClick={() => onNavigate("player-awards")}>View award →</button></article><article><span>LATEST CERTIFICATE</span><strong>Best On Field · Issued</strong><button type="button" onClick={() => onNavigate("player-certificates")}>View certificate →</button></article><article><span>DEVELOPMENT FOCUS</span><strong>{child.focus}</strong><button type="button" onClick={() => onNavigate("player-development")}>View progress →</button></article><article><span>UPCOMING</span><strong>{child.nextEvent}</strong><button type="button" onClick={() => onNavigate("calendar")}>Open calendar →</button></article></div>
        <div className="parent-ai-summary"><b>✦ AI</b><div><span>POSITIVE DEVELOPMENT INSIGHT</span><strong>{child.trend}</strong><p>{child.strengths[0]} is becoming a consistent strength. Keep encouraging the current development focus.</p></div><button type="button" onClick={() => onNavigate("child-analysis")}>View child insights →</button></div>
      </section>}

      <section className="mv-workflow-card"><header><div><span>MATCHVISION DEVELOPMENT LOOP</span><h2>From match day to player growth</h2></div><strong>ONE CONNECTED WORKFLOW</strong></header><div>{workflow.map(([label,target], index) => <button type="button" key={label} onClick={() => onNavigate(target)}><b>{String(index + 1).padStart(2,"0")}</b><span>{label}</span>{index < workflow.length - 1 && <i>→</i>}</button>)}</div></section>

      <section className="mv-live-hero">
        <div className="mv-live-status">
          <span><i /> LIVE NOW</span>
          <strong>42:17</strong>
          <small>84 watching</small>
          <b>✓ Approved Family Stream</b>
        </div>

        <div className="mv-live-score">
          <div className="mv-team">
            <img src={springvaleLogo} alt="Springvale City Soccer Club" />
            <strong>SPRINGVALE CITY</strong>
            <span>U11 WALLABIES</span>
          </div>

          <div className="mv-score-centre">
            <h1>U11 Wallabies vs Oakleigh United</h1>
            <p>Ross Reserve · Pitch 1</p>
            <strong>2 – 1</strong>
            <span>2nd Half</span>
          </div>

          <div className="mv-team">
            <div className="mv-opponent">OU</div>
            <strong>OAKLEIGH</strong>
            <span>UNITED</span>
          </div>
        </div>

        <div className="mv-live-stats">
          <div><strong>57%</strong><span>Possession</span></div>
          <div><strong>8</strong><span>Shots</span></div>
          <div><strong>6</strong><span>On Target</span></div>
          <div><strong>78%</strong><span>Pass Accuracy</span></div>
          <div><strong>6.2s</strong><span>Recovery Time</span></div>
        </div>

        <div className="mv-live-actions">
          <button className="primary" type="button" onClick={() => onNavigate("live")}>▶ Watch Live Game</button>
          <button type="button" onClick={() => onNavigate("live")}>✦ Live AI Insights</button>
          <button type="button" onClick={() => onNavigate("live")}>⌕ Search Live Games</button>
        </div>
      </section>

      <div className="mv-dashboard-grid">
        <section className="mv-card">
          <header><h3>Live AI Match Insight</h3><span>AI</span></header>
          <div className="mv-ai-alert">
            <strong>Momentum is with Springvale City.</strong>
            <p>Strong pressure in the final third with a stable defensive shape.</p>
          </div>
          <div className="mv-event"><span>31′</span><p>Ava created a chance with a through ball.</p><b>+0.12</b></div>
          <div className="mv-event"><span>36′</span><p>Ethan won a strong midfield tackle.</p><b>+0.08</b></div>
          <div className="mv-event"><span>39′</span><p>Corner to Springvale City.</p><b>LIVE</b></div>
        </section>

        <section className="mv-card">
          <header><h3>Today’s Schedule</h3><button onClick={() => onNavigate("calendar")}>View calendar →</button></header>
          <div className="mv-row"><b>LIVE</b><p>U11 Wallabies vs Oakleigh United<small>Ross Reserve · Pitch 1</small></p><strong>42′ · 2–1</strong></div>
          <div className="mv-row"><span>5:30 PM</span><p>U12 Girls vs South Melbourne<small>Ross Reserve · Pitch 2</small></p><strong>Upcoming</strong></div>
          <div className="mv-row"><span>7:00 PM</span><p>U13 Boys vs Bentleigh Greens<small>Kingston Heath · Pitch 1</small></p><strong>Upcoming</strong></div>
        </section>

        <section className="mv-card">
          <header><h3>Quick Actions</h3></header>
          <button className="mv-quick" onClick={() => onNavigate("matches")}>＋ Upload Match Video</button>
          <button className="mv-quick" onClick={() => onNavigate("messages")}>＋ Create Message</button>
          {role !== "parent" && <button className="mv-quick" onClick={() => onNavigate("attendance")}>＋ Mark Attendance</button>}
          <button className="mv-quick" onClick={() => onNavigate("calendar")}>＋ Add Event</button>
        </section>
      </div>

      <div className="mv-dashboard-bottom">
        <section className="mv-card mv-assistant">
          <div>
            <span>✦ MATCHVISION AI</span>
            <h3>Ask about your team, players or upcoming matches.</h3>
          </div>
          <button onClick={() => onNavigate(individualMode ? "team" : "analysis")}>Ask AI</button>
        </section>

        <section className="mv-card">
          <header><h3>Player Spotlight</h3><button onClick={() => onNavigate("team")}>View profile →</button></header>
          <div className="mv-spotlight"><div><strong>Ava Thompson</strong><span>#9 · Midfielder</span></div><b>8.2<small>AI rating</small></b></div>
        </section>

        <section className="mv-card">
          <header><h3>Development Focus</h3></header>
          <p>Improve first touch under pressure.</p>
          <div className="mv-progress"><i /></div>
          <small>75% completion</small>
        </section>
      </div>
    </div>
  );
}
