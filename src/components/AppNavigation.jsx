import springvaleLogo from "../assets/springvale-city-logo.png";

function NavigationItems({ items, page, onNavigate, mobile = false }) {
  return <nav className={mobile ? "mobile-drawer-nav" : "sidebar-nav"}>{items.map((item) => item.heading ? (
    <div className={mobile ? "mobile-drawer-section" : "nav-section-label"} key={item.id}>
      <span className={mobile ? "mobile-drawer-icon" : "nav-symbol"}>{item.icon}</span><span>{item.label}</span>
    </div>
  ) : (
    <button type="button" key={item.id} className={[mobile ? "mobile-drawer-item" : "nav-item", page === item.id ? "active" : "", item.child ? (mobile ? "mobile-drawer-child" : "nav-child") : ""].join(" ")} onClick={() => onNavigate(item.id)}>
      <span className={mobile ? "mobile-drawer-icon" : "nav-symbol"}>{item.icon}</span><span>{item.label}</span>
      {item.id === "messages" && <b className={mobile ? "mobile-drawer-count" : "nav-count"}>3</b>}
    </button>
  ))}</nav>;
}

function UserProfile({ user, mobile = false }) {
  return <div className={mobile ? "mobile-drawer-profile" : "sidebar-profile"}>
    <div className="profile-avatar">{user.name.charAt(0)}</div>
    <div><strong>{user.name}</strong><span>{user.subtitle}</span></div>
  </div>;
}

export function DesktopSidebar({ items, page, user, onNavigate, onLogout }) {
  return <aside className="sidebar desktop-sidebar" aria-label="Primary navigation">
    <div className="brand-row"><div className="brand-mark">MV</div><div><strong>MatchVision™</strong><span>Powered by AI</span></div></div>
    <div className="sidebar-club"><img src={springvaleLogo} alt="Springvale City Soccer Club" /><div><strong>Springvale City</strong><span>Soccer Club</span><small>Est. 1956</small></div></div>
    <NavigationItems items={items} page={page} onNavigate={onNavigate} />
    <UserProfile user={user} />
    <button type="button" className="sign-out-button" onClick={onLogout}>Sign out</button>
  </aside>;
}

export function MobileDrawer({ items, page, user, isOpen, onNavigate, onClose, onLogout }) {
  return <>
    {isOpen && <button type="button" className="mobile-drawer-backdrop" aria-label="Close navigation menu" onClick={onClose} />}
    <aside className={`mobile-drawer${isOpen ? " open" : ""}`} id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!isOpen} inert={!isOpen}>
      <header className="mobile-drawer-header"><div className="brand-mark">MV</div><div><strong>MatchVision™</strong><span>Powered by AI</span></div><button type="button" aria-label="Close navigation menu" onClick={onClose}>×</button></header>
      <div className="mobile-drawer-club"><img src={springvaleLogo} alt="Springvale City Soccer Club" /><div><strong>Springvale City</strong><span>Soccer Club · Est. 1956</span></div></div>
      <NavigationItems items={items} page={page} onNavigate={onNavigate} mobile />
      <UserProfile user={user} mobile />
      <button type="button" className="mobile-drawer-sign-out" onClick={onLogout}>Sign out</button>
    </aside>
  </>;
}
