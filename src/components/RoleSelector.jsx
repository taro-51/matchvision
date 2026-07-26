export default function RoleSelector({ onSelect }) {
  return (
    <main className="role-screen">
      <section className="role-panel">
        <div className="role-brand">
          <div className="brand-logo large">MV</div>
          <div>
            <h1>MatchVision™</h1>
            <p>AI-powered football club management</p>
          </div>
        </div>

        <div className="role-heading">
          <span>WORKING PLATFORM FRAMEWORK</span>
          <h2>Select a demonstration portal</h2>
          <p>
            Explore the platform from the perspective of a coach, parent or
            club administrator.
          </p>
        </div>

        <div className="role-grid">
          <RoleCard
            icon="⚽"
            title="Coach"
            description="Manage players, matches, attendance, video, AI analysis and shared coaching knowledge."
            onClick={() => onSelect("coach")}
          />
          <RoleCard
            icon="👪"
            title="Parent"
            description="View your child’s schedule, messages, videos, statistics and development."
            onClick={() => onSelect("parent")}
          />
          <RoleCard
            icon="🏢"
            title="Club Admin"
            description="Manage teams, documents, equipment, permissions, sharing and governance."
            onClick={() => onSelect("admin")}
          />
        </div>
      </section>
    </main>
  );
}

function RoleCard({ icon, title, description, onClick }) {
  return (
    <button className="role-card" onClick={onClick}>
      <span className="role-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="open-role">Open portal →</span>
    </button>
  );
}
