import "./Dashboard.css";
import springvaleLogo from "../assets/springvale-city-logo.png";

export default function Dashboard({ role = "coach", user, onNavigate }) {
  const individualMode = role === "parent" || role === "player";
  const firstName = user?.name?.split(" ")[0] || "Lisa";

  return (
    <div className="mv-dashboard">
      <section className="mv-welcome">
        <div>
          <span>WELCOME BACK</span>
          <h2>Good afternoon, {firstName} 👋</h2>
          <p>Your team, live match and AI intelligence are connected.</p>
        </div>
      </section>

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
