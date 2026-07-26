import { navigation, roleDetails } from "../data/navigation";

export default function Sidebar({ role, page, onNavigate, onChangeRole }) {
  const visibleNavigation = navigation.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">MV</div>
        <div>
          <strong>MatchVision™</strong>
          <span>Powered by AI</span>
        </div>
      </div>

      <div className="club-name">
        <span>SPRINGVALE CITY</span>
        <strong>U11 Wallabies</strong>
      </div>

      <nav className="navigation">
        {visibleNavigation.map((item) =>
          item.heading ? (
            <div className="nav-section-label" key={item.id}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ) : (
            <button
              key={item.id}
              className={[
                "nav-button",
                page === item.id ? "active" : "",
                item.child ? "nav-child" : "",
              ].join(" ")}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          )
        )}
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">{roleDetails[role].name.charAt(0)}</div>
        <div>
          <strong>{roleDetails[role].name}</strong>
          <span>{roleDetails[role].subtitle}</span>
        </div>
      </div>

      <button className="change-role-button" onClick={onChangeRole}>
        Change demo role
      </button>
    </aside>
  );
}
