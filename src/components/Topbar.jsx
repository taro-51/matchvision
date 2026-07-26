import { navigation, roleDetails } from "../data/navigation";

export default function Topbar({ role, page }) {
  const currentPage =
    navigation.find((item) => item.id === page && !item.heading) ||
    navigation[0];

  return (
    <header className="topbar">
      <div>
        <span className="page-eyebrow">{roleDetails[role].title}</span>
        <h1>{currentPage.label}</h1>
      </div>

      <div className="topbar-actions">
        {role === "coach" && page === "drills" && (
          <span className="sharing-badge">League sharing enabled</span>
        )}

        <span className="demo-badge">
          <span className="demo-dot" />
          Demo environment
        </span>

        <button className="notification-button">
          ✉
          <span>2</span>
        </button>
      </div>
    </header>
  );
}
