import CalendarItem from "../components/CalendarItem";
import MetricCard from "../components/MetricCard";

export default function Dashboard({ role }) {
  const parentMode = role === "parent";

  return (
    <>
      <section className="welcome-card">
        <div>
          <span className="page-eyebrow">GOOD AFTERNOON</span>
          <h2>
            {parentMode
              ? "Mia’s football at a glance"
              : "Welcome back to MatchVision"}
          </h2>
          <p>
            {parentMode
              ? "Everything approved for your child in one secure place."
              : "Your club, team and match intelligence are connected."}
          </p>
        </div>
        <button className="primary-button">Open demo match →</button>
      </section>

      <section className="metrics-grid">
        <MetricCard
          label={parentMode ? "Mia’s season goals" : "Registered players"}
          value={parentMode ? "8" : "146"}
          note="+12% this season"
        />
        <MetricCard label="Upcoming events" value="3" note="Next seven days" />
        <MetricCard label="Unread messages" value="2" note="Requires attention" />
        <MetricCard label="AI match reports" value="8" note="This season" />
      </section>

      <section className="dashboard-grid">
        <article className="content-card latest-result">
          <div className="card-heading">
            <div>
              <span className="page-eyebrow">LATEST RESULT</span>
              <h3>Wallabies vs Oakleigh United</h3>
            </div>
            <span className="status-badge">AI complete</span>
          </div>

          <div className="score-row">
            <div><strong>WALLABIES</strong><span>Home</span></div>
            <b>2–0</b>
            <div><strong>OAKLEIGH</strong><span>Away</span></div>
          </div>

          <div className="match-stats">
            <div><strong>58%</strong><span>Possession</span></div>
            <div><strong>9</strong><span>Shots</span></div>
            <div><strong>6</strong><span>On target</span></div>
            <div><strong>3</strong><span>Key moments</span></div>
          </div>
        </article>

        <article className="content-card">
          <div className="card-heading">
            <div>
              <span className="page-eyebrow">NEXT UP</span>
              <h3>Club calendar</h3>
            </div>
          </div>

          <CalendarItem date="28" day="TUE" title="U11 Training" details="5:00 pm · Ross Reserve" />
          <CalendarItem date="30" day="THU" title="Tactical Session" details="5:00 pm · Ross Reserve" />
          <CalendarItem date="01" day="SAT" title="Wallabies vs Bentleigh" details="9:00 am · Bentleigh Reserve" />
        </article>
      </section>
    </>
  );
}
