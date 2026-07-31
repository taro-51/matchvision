import springvaleLogo from "../assets/springvale-city-logo.png";
import { useEffect, useState } from "react";

export function NavigationItems({ items, page, onNavigate, mobile = false }) {
  const groups = [];
  let current = { heading: null, items: [] };
  items.forEach((item) => { if (item.heading) { if (current.heading || current.items.length) groups.push(current); current = { heading: item, items: [] }; } else current.items.push(item); });
  if (current.heading || current.items.length) groups.push(current);
  const activeGroup = groups.find((group) => group.heading && group.items.some((item) => item.id === page));
  const activeHeadingId = activeGroup?.heading.id;
  const [expanded, setExpanded] = useState(activeHeadingId || groups.find((group) => group.heading)?.heading.id || null);
  useEffect(() => { if (activeHeadingId) setExpanded(activeHeadingId); }, [activeHeadingId]);
  const itemButton = (item) => <button type="button" key={item.id} className={[mobile ? "mobile-drawer-item" : "nav-item", page === item.id ? "active" : "", item.child ? (mobile ? "mobile-drawer-child" : "nav-child") : ""].join(" ")} onClick={() => onNavigate(item.id)}><span className={mobile ? "mobile-drawer-icon" : "nav-symbol"}>{item.icon}</span><span>{item.label}</span>{item.id === "messages" && <b className={mobile ? "mobile-drawer-count" : "nav-count"}>3</b>}</button>;
  return <nav className={mobile ? "mobile-drawer-nav" : "sidebar-nav"}>{groups.map((group, index) => group.heading ? <div className="nav-hub" key={group.heading.id}><button type="button" className={mobile ? "mobile-drawer-section nav-section-toggle" : "nav-section-label nav-section-toggle"} aria-expanded={expanded === group.heading.id} onClick={() => setExpanded(expanded === group.heading.id ? null : group.heading.id)}><span className={mobile ? "mobile-drawer-icon" : "nav-symbol"}>{group.heading.icon}</span><span>{group.heading.label}</span><b>{expanded === group.heading.id ? "−" : "+"}</b></button><div className={`nav-hub-items${expanded === group.heading.id ? " expanded" : ""}`}>{group.items.map(itemButton)}</div></div> : <div className="nav-standalone" key={`standalone-${index}`}>{group.items.map(itemButton)}</div>)}</nav>;
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
