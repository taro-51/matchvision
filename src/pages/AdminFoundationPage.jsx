import "./AdminFoundationPage.css";

const modules = {
  "admin-committee": {
    eyebrow: "GOVERNANCE & LEADERSHIP",
    title: "Committee",
    purpose: "Keep club leadership, responsibilities and governance activity visible in one trusted workspace.",
    metrics: [["7", "Committee roles"], ["5", "Current appointments"], ["2", "Positions to confirm"]],
    connected: ["Governance and safety audit", "Club settings", "Permission controls"],
    workflow: ["Maintain committee directory", "Assign portfolios and terms", "Record decisions and actions"],
    action: ["Open governance controls", "admin"],
  },
  "admin-registrations": {
    eyebrow: "MEMBERSHIP OPERATIONS",
    title: "Registrations",
    purpose: "Coordinate player registrations, team allocation and family follow-up across the club.",
    metrics: [["149", "Registered players"], ["8", "Active teams"], ["12", "New this period"]],
    connected: ["Club player totals", "Team participation", "Retention forecast"],
    workflow: ["Review new applications", "Confirm eligibility and consent", "Allocate players to teams"],
    action: ["Open club overview", "admin"],
  },
  "admin-sponsors": {
    eyebrow: "PARTNERSHIP OPERATIONS",
    title: "Sponsors Management",
    purpose: "Manage the relationships that support community football and connect partnership activity with club visibility.",
    metrics: [["6", "Support types"], ["3", "Partnership tiers"], ["200+", "Families reached"]],
    connected: ["Sponsor Our Club flyer", "Sponsor Hub packages", "Club community reach"],
    workflow: ["Track sponsor enquiries", "Record agreed benefits", "Schedule recognition and reporting"],
    action: ["Open Sponsor Hub", "club-sponsors"],
  },
  "admin-volunteers": {
    eyebrow: "COMMUNITY OPERATIONS",
    title: "Volunteer Management",
    purpose: "Coordinate the people who make match days, events and everyday club life possible.",
    metrics: [["4", "Volunteer areas"], ["18", "Active volunteers"], ["3", "Open opportunities"]],
    connected: ["Match-day support", "Club rooms and events", "Community announcements"],
    workflow: ["Publish opportunities", "Match availability to roles", "Confirm shifts and recognition"],
    action: ["Open Volunteer Hub", "club-volunteers"],
  },
  "admin-ground-bookings": {
    eyebrow: "FACILITIES OPERATIONS",
    title: "Ground Bookings",
    purpose: "Coordinate safe, visible use of Ross Reserve across training, matches and community events.",
    metrics: [["2", "Active pitches"], ["86%", "Peak utilisation"], ["3", "Weekly match windows"]],
    connected: ["Ross Reserve ground map", "Club calendar", "Equipment readiness"],
    workflow: ["View pitch availability", "Request and approve bookings", "Flag clashes and facility needs"],
    action: ["Open Ground Map", "club-ground-map"],
  },
  "admin-recruitment": {
    eyebrow: "CLUB GROWTH OPERATIONS",
    title: "Recruitment Management",
    purpose: "Connect prospective-player enquiries with team needs, follow-up and sustainable club growth.",
    metrics: [["7", "New enquiries"], ["3", "Teams recruiting"], ["2", "Flyers active"]],
    connected: ["Players Of Interest club flyer", "U11 recruitment resource", "Join Our Club enquiries"],
    workflow: ["Capture player enquiries", "Assign follow-up to club or coach", "Track trial and registration outcomes"],
    action: ["Open Join Our Club", "club-join"],
    image: "/documents/your-game-starts-here.png",
  },
};

export default function AdminFoundationPage({ page, onNavigate }) {
  const module = modules[page];
  if (!module) return null;

  return (
    <div className="admin-foundation-page">
      <header className="admin-foundation-hero">
        <div><span>{module.eyebrow}</span><h1>{module.title}</h1><p>{module.purpose}</p></div>
        <b>ADMIN<br />FOUNDATION</b>
      </header>
      <section className="admin-foundation-metrics">
        {module.metrics.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}
      </section>
      <div className="admin-foundation-grid">
        <section><span>CONNECTED MATCHVISION DATA</span><h2>Already connected</h2><ul>{module.connected.map((item) => <li key={item}>✓ {item}</li>)}</ul></section>
        <section><span>PLANNED MANAGEMENT WORKFLOW</span><h2>What this module will manage</h2><ol>{module.workflow.map((item, index) => <li key={item}><b>{index + 1}</b>{item}</li>)}</ol></section>
      </div>
      {module.image && <section className="admin-foundation-asset"><div><span>CONNECTED ORIGINAL ARTWORK</span><h2>Players Of Interest · Club</h2><p>This existing recruitment asset supports internal enquiry tracking without being exposed in parent or player navigation.</p></div><img src={module.image} alt="Players Of Interest club recruitment flyer" /></section>}
      <footer className="admin-foundation-footer"><div><strong>No data has been replaced.</strong><p>This foundation connects the current club information while the management workflow remains future-ready.</p></div><button type="button" onClick={() => onNavigate(module.action[1])}>{module.action[0]} →</button></footer>
    </div>
  );
}
