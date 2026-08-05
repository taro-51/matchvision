import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import LiveGame from "./pages/LiveGame";
import MatchLibrary from "./pages/MatchLibrary";
import AIAnalysis from "./pages/AIAnalysis";
import Equipment from "./pages/Equipment";
import AdminClub from "./pages/AdminClub";
import FootballIntelligence from "./pages/FootballIntelligence";
import DrillExchange from "./pages/CoachHub/DrillExchange";
import CoachProfiles from "./pages/CoachHub/CoachProfiles";
import SessionBuilder from "./pages/CoachHub/SessionBuilder";
import PlaceholderPage from "./pages/PlaceholderPage";
import JoinSpringvale from "./pages/JoinSpringvale";
import ClubHub from "./pages/ClubHub/ClubHub";
import CommunityHub from "./pages/CommunityHub/CommunityHub";
import PlayerProfile from "./pages/PlayerProfile";
import AdminFoundationPage from "./pages/AdminFoundationPage";
import PlayerRecognition, { AdminRewardsManagement } from "./pages/PlayerRecognition";
import { MobileDrawer, NavigationItems } from "./components/AppNavigation";
import AIStudio from "./components/AIStudio";
import springvaleLogo from "./assets/springvale-city-logo.png";

const navigationCatalog = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "⌂",
    roles: ["coach", "parent", "player", "admin"],
  },
  {
    id: "live",
    label: "Live Game",
    icon: "◉",
    roles: ["coach", "parent", "player", "admin"],
  },
  {
    id: "ai-studio",
    label: "MatchVision AI Studio",
    icon: "AI",
    roles: ["coach", "parent", "player", "admin"],
  },
  {
    id: "join-springvale",
    label: "Join Springvale",
    icon: "⚽",
    roles: ["coach", "parent", "player", "admin"],
  },
  {
    id: "team",
    label: "Team Hub",
    icon: "♟",
    roles: ["coach", "parent", "player", "admin"],
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: "▣",
    roles: ["coach", "parent", "player", "admin"],
  },
  {
    id: "messages",
    label: "Messages",
    icon: "✉",
    roles: ["coach", "parent", "player", "admin"],
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: "✓",
    roles: ["coach", "admin"],
  },
  {
    id: "matches",
    label: "Match Library",
    icon: "▶",
    roles: ["coach", "parent", "player", "admin"],
  },
  {
    id: "highlights",
    label: "Highlights",
    icon: "☆",
    roles: ["coach", "parent", "player", "admin"],
  },
  {
    id: "analysis",
    label: "AI Analysis",
    icon: "✦",
    roles: ["coach", "admin"],
  },

  {
    id: "coach-hub-heading",
    label: "Coach Hub",
    icon: "◈",
    roles: ["coach"],
    heading: true,
  },
  {
    id: "drills",
    label: "Drill Exchange",
    icon: "⚽",
    roles: ["coach"],
    child: true,
  },
  {
    id: "coach-profiles",
    label: "Coach Profiles",
    icon: "◎",
    roles: ["coach"],
    child: true,
  },
  {
    id: "session-builder",
    label: "Session Builder",
    icon: "▤",
    roles: ["coach"],
    child: true,
  },

  {
    id: "equipment",
    label: "Equipment",
    icon: "▥",
    roles: ["coach", "admin"],
  },
  {
    id: "club-hub-heading",
    label: "Club Hub",
    icon: "◆",
    roles: ["coach", "parent", "player", "admin"],
    heading: true,
  },
  { id: "club-home", label: "Club Hub Home", icon: "⌂", roles: ["coach", "parent", "player", "admin"], child: true },
  { id: "club-pulse", label: "Club Pulse", icon: "↗", roles: ["coach", "parent", "player", "admin"], child: true },
  { id: "club-news", label: "Club News", icon: "▤", roles: ["coach", "parent", "player", "admin"], child: true },
  { id: "club-parent-welcome", label: "Parent Welcome", icon: "♥", roles: ["coach", "parent", "player", "admin"], child: true },
  { id: "club-ground-map", label: "Ground Map", icon: "⌖", roles: ["coach", "parent", "player", "admin"], child: true },
  { id: "club-player-journey", label: "Player Journey", icon: "⌁", roles: ["coach", "parent", "player", "admin"], child: true },
  { id: "club-about", label: "About Our Club", icon: "⌂", roles: ["coach", "parent", "player", "admin"], child: true },
  { id: "club-join", label: "Join Our Club", icon: "⚽", roles: ["coach", "parent", "player", "admin"], child: true },
  { id: "club-values", label: "Club Values", icon: "♥", roles: ["coach", "parent", "player", "admin"], child: true },
  { id: "club-hall-of-fame", label: "Hall of Fame", icon: "★", roles: ["coach", "parent", "player", "admin"], child: true },
  { id: "club-awards", label: "Awards Centre", icon: "✦", roles: ["coach", "parent", "player", "admin"], child: true },
  { id: "club-events", label: "Events", icon: "◫", roles: ["coach", "parent", "player", "admin"], child: true },
  { id: "club-volunteers", label: "Volunteer Hub", icon: "♟", roles: ["coach", "parent", "player", "admin"], child: true },
  { id: "club-sponsors", label: "Sponsor Hub", icon: "◇", roles: ["coach", "parent", "player", "admin"], child: true },
  { id: "club-gallery", label: "Gallery", icon: "▧", roles: ["coach", "parent", "player", "admin"], child: true },
  {
    id: "documents",
    label: "Documents",
    icon: "▧",
    roles: ["coach", "parent", "player", "admin"],
    child: true,
  },
  {
    id: "admin-hub-heading",
    label: "Admin Hub",
    icon: "⚙",
    roles: ["admin"],
    heading: true,
  },
  {
    id: "admin",
    label: "Club Admin",
    icon: "⚙",
    roles: ["admin"],
    child: true,
  },
  {
    id: "football-intelligence",
    label: "Football Intelligence",
    icon: "◈",
    roles: ["admin"],
    child: true,
  },
  { id: "admin-settings", label: "Club Settings", icon: "⚙", roles: ["admin"], child: true },
  { id: "admin-committee", label: "Committee", icon: "♟", roles: ["admin"], child: true },
  { id: "admin-registrations", label: "Registrations", icon: "✓", roles: ["admin"], child: true },
  { id: "admin-sponsors", label: "Sponsors", icon: "◇", roles: ["admin"], child: true },
  { id: "admin-documents", label: "Documents", icon: "▧", roles: ["admin"], child: true },
  { id: "admin-awards", label: "Awards", icon: "★", roles: ["admin"], child: true },
  { id: "admin-volunteers", label: "Volunteers", icon: "♥", roles: ["admin"], child: true },
  { id: "admin-equipment", label: "Equipment", icon: "◫", roles: ["admin"], child: true },
  { id: "admin-ground-bookings", label: "Ground Bookings", icon: "⌂", roles: ["admin"], child: true },
  { id: "admin-notifications", label: "Notifications", icon: "●", roles: ["admin"], child: true },
  { id: "admin-permissions", label: "Permissions", icon: "◆", roles: ["admin"], child: true },
];

const navigationById = Object.fromEntries(
  navigationCatalog.filter((item) => !item.heading).map((item) => [item.id, item])
);

const additionalNavigationItems = {
  "player-profile": { id: "player-profile", label: "Player Profile", icon: "●" },
  "player-stats": { id: "player-stats", label: "My Stats", icon: "↗" },
  "child-analysis": { id: "child-analysis", label: "AI Analysis", icon: "✦" },
  "player-awards": { id: "player-awards", label: "My Awards", icon: "★" },
  "player-certificates": { id: "player-certificates", label: "My Certificates", icon: "▧" },
  "player-achievements": { id: "player-achievements", label: "My Achievements", icon: "◆" },
  "player-development": { id: "player-development", label: "My Development", icon: "✦" },
  "player-rewards": { id: "player-rewards", label: "My Rewards", icon: "♦" },
  "coach-recognition": { id: "coach-recognition", label: "Player Recognition", icon: "★" },
  "coach-recruitment": { id: "coach-recruitment", label: "Recruitment Resources", icon: "⚽" },
  "club-canteen": { id: "club-canteen", label: "Match Day Canteen", icon: "●" },
  "admin-rewards": { id: "admin-rewards", label: "Rewards Management", icon: "♦" },
  "admin-recruitment": { id: "admin-recruitment", label: "Recruitment Management", icon: "⚽" },
};

function section(id, label, icon) {
  return { id, label, icon, heading: true };
}

function link(id, label) {
  const item = navigationById[id] || additionalNavigationItems[id];
  return { ...item, label: label || item.label, child: true };
}

function topLink(id, label) {
  return { ...link(id, label), child: false };
}

const previousNavigationConfig = {
  admin: [
    topLink("dashboard"), topLink("ai-studio"), topLink("messages"), topLink("calendar"),
    section("football-hub-heading", "Football Hub", "◉"),
    link("live"), link("matches"), link("analysis"), link("highlights"), link("football-intelligence", "Football Intelligence · Opponent Explorer"),
    section("team-hub-heading", "Team Hub", "♟"),
    link("team", "Team Overview"), link("attendance"),
    section("club-hub-heading", "Club Hub", "◆"),
    link("club-home"), link("club-pulse"), link("club-news"), link("club-parent-welcome"),
    link("club-ground-map"), link("club-player-journey"), link("club-about"), link("club-join"), link("club-values"),
    link("club-hall-of-fame"), link("club-awards"), link("club-events"), link("club-volunteers"),
    link("club-sponsors"), link("club-gallery"), link("club-canteen"),
    section("admin-hub-heading", "Admin Hub", "⚙"),
    link("admin"), link("admin-settings"), link("admin-committee"),
    link("admin-registrations"), link("admin-sponsors", "Sponsors Management"), link("admin-documents", "Documents Management"), link("admin-awards", "Awards Management"),
    link("admin-rewards"), link("admin-recruitment"), link("admin-volunteers", "Volunteer Management"), link("admin-equipment", "Equipment Management"), link("admin-ground-bookings"),
    link("admin-notifications", "Notifications"), link("admin-permissions"),
  ],
  coach: [
    topLink("dashboard"), topLink("ai-studio"), topLink("messages"), topLink("calendar"),
    section("football-hub-heading", "Football Hub", "◉"),
    link("live"), link("matches"), link("analysis", "AI Match Analysis"), link("highlights"), link("football-intelligence", "Football Intelligence · Opponent Explorer"),
    section("team-hub-heading", "Team Hub", "♟"),
    link("team", "Team Overview"), link("attendance"),
    section("coach-hub-heading", "Coach Hub", "◈"),
    link("drills"), link("coach-profiles"), link("session-builder"), link("equipment", "Equipment Planning"), link("coach-recognition"),
    link("documents", "Coach Documents"),
    section("club-resources-heading", "Club Resources", "◆"),
    link("club-home"), link("club-join", "Join Our Club"), link("coach-recruitment", "Recruitment Resources"), link("club-sponsors", "Sponsor Resources"),
    link("club-awards", "Awards Centre"), link("club-events"), link("club-gallery"), link("club-canteen"),
  ],
  parent: [
    topLink("dashboard"), topLink("ai-studio"), topLink("messages"), topLink("calendar"),
    section("team-hub-heading", "Team Hub", "♟"),
    link("team", "Team Overview"), link("live", "Live Team Game"),
    section("player-hub-heading", "Player Hub", "♥"),
    link("player-profile", "Linked Children"), link("player-stats", "Child Statistics"),
    link("matches", "Child Match Videos"), link("highlights", "Child Highlights"), link("child-analysis", "Child AI Insights"),
    link("player-development", "Development Updates"), link("club-player-journey", "Child Journey"),
    link("player-awards", "Awards"), link("player-certificates", "Certificates"), link("player-rewards", "Rewards"), link("player-achievements", "Achievements"),
    section("club-hub-heading", "Club Hub", "◆"),
    link("club-parent-welcome"), link("club-events"), link("documents"), link("club-ground-map"),
    link("club-values"), link("club-gallery"), link("club-canteen"),
  ],
  player: [
    topLink("dashboard"), topLink("ai-studio"), topLink("messages"), topLink("calendar"),
    section("team-hub-heading", "Team Hub", "♟"),
    link("team", "Team Overview"), link("live", "Live Team Game"),
    section("player-hub-heading", "Player Hub", "⚽"),
    link("player-profile", "My Profile"), link("player-stats"), link("matches", "My Match Videos"), link("highlights", "My Highlights"), link("player-development"),
    link("club-player-journey", "My Journey"), link("player-awards"),
    link("player-certificates"), link("player-rewards"), link("player-achievements"),
    section("club-hub-heading", "Club Hub", "◆"),
    link("club-events"), link("documents"), link("club-gallery"), link("club-values"), link("club-canteen"),
  ],
};

// Sprint 4C keeps every route while presenting navigation around user purpose.
// The previous configuration remains above as an audit reference during this migration.
void previousNavigationConfig;
const navigationConfig = {
  admin: [
    topLink("dashboard"), topLink("ai-studio"), topLink("matches", "Club Match Library"), topLink("messages"), topLink("calendar"),
    section("football-hub-heading", "Football Hub", "FI"), link("football-intelligence", "Football Intelligence / Opponent Explorer"),
    section("team-hub-heading", "Team Hub", "TM"), link("team", "Team Overview"), link("live"), link("attendance"),
    section("club-hub-heading", "Club Hub", "CL"), link("club-home"), link("club-pulse"), link("club-news"), link("club-parent-welcome"), link("club-ground-map"), link("club-player-journey"), link("club-about"), link("club-join"), link("club-values"), link("club-hall-of-fame"), link("club-awards"), link("club-events"), link("club-volunteers"), link("club-sponsors"), link("club-gallery"), link("club-canteen"), link("documents", "Club Documents"),
    section("admin-hub-heading", "Admin Hub", "AD"), link("admin"), link("admin-settings"), link("admin-committee"), link("admin-registrations"), link("admin-sponsors", "Sponsors Management"), link("admin-documents", "Documents Management"), link("admin-awards", "Awards Management"), link("admin-rewards"), link("admin-recruitment"), link("admin-volunteers", "Volunteer Management"), link("admin-equipment", "Equipment Management"), link("admin-ground-bookings"), link("admin-notifications"), link("admin-permissions"),
  ],
  coach: [
    topLink("dashboard"), topLink("ai-studio"), topLink("matches", "Match Library"), topLink("messages"), topLink("calendar"),
    section("football-hub-heading", "Football Hub", "FI"), link("football-intelligence", "Football Intelligence / Opponent Explorer"),
    section("team-hub-heading", "Team Hub", "TM"), link("team", "Team Overview"), link("live"), link("attendance"),
    section("coach-hub-heading", "Coach Hub", "CO"), link("drills"), link("coach-profiles"), link("session-builder"), link("equipment", "Equipment Planning"), link("coach-recognition"), link("documents", "Coach Documents"),
    section("club-hub-heading", "Club Hub", "CL"), link("club-home"), link("club-join", "Join Our Club"), link("coach-recruitment", "Recruitment Resources"), link("club-sponsors", "Sponsor Resources"), link("club-awards", "Awards Centre"), link("club-events"), link("club-gallery"), link("club-canteen"),
  ],
  parent: [
    topLink("dashboard"), topLink("ai-studio"), topLink("matches", "My Child's Match Library"), topLink("messages"), topLink("calendar"),
    section("team-hub-heading", "Team Hub", "TM"), link("team", "Team Overview"), link("live", "Live Team Game"),
    section("player-hub-heading", "Player Hub", "PL"), link("player-profile", "Linked Children"), link("player-stats", "Child Statistics"), link("player-development", "Development Updates"), link("club-player-journey", "Child Journey"), link("player-awards", "Awards"), link("player-certificates", "Certificates"), link("player-rewards", "Rewards"), link("player-achievements", "Achievements"),
    section("club-hub-heading", "Club Hub", "CL"), link("club-parent-welcome"), link("club-events"), link("documents"), link("club-ground-map"), link("club-values"), link("club-gallery"), link("club-canteen"),
  ],
  player: [
    topLink("dashboard"), topLink("ai-studio"), topLink("matches", "My Match Library"), topLink("messages"), topLink("calendar"),
    section("team-hub-heading", "Team Hub", "TM"), link("team", "Team Overview"), link("live", "Live Team Game"),
    section("player-hub-heading", "Player Hub", "PL"), link("player-profile", "My Profile"), link("player-stats"), link("player-development"), link("club-player-journey", "My Journey"), link("player-awards"), link("player-certificates"), link("player-rewards"), link("player-achievements"),
    section("club-hub-heading", "Club Hub", "CL"), link("club-events"), link("documents"), link("club-gallery"), link("club-values"), link("club-canteen"),
  ],
};

const searchableResources = [
  { id: "ai-studio", label: "Recent AI Uploads", icon: "AI", keywords: "analyses analysis history recent uploads processing queue completed reports discoveries", roles: ["admin","coach","parent","player"] },
  { id: "analysis", label: "Latest AI Report", icon: "AI", keywords: "analysis report insight statistics", roles: ["admin","coach","player"] },
  { id: "child-analysis", label: "Child AI Report", icon: "AI", keywords: "analysis report insight child", roles: ["parent"] },
  { id: "highlights", label: "Recent Highlights", icon: "HL", keywords: "highlight clip video recent", roles: ["admin","coach","parent","player"] },
  { id: "team", label: "Ava Thompson · Player", icon: "●", keywords: "player profile squad child", roles: ["admin","coach","parent","player"] },
  { id: "matches", label: "Springvale vs Oakleigh · Match", icon: "▶", keywords: "match replay video recent", roles: ["admin","coach","parent","player"] },
  { id: "documents", label: "Best On Field Certificate · Document", icon: "▧", keywords: "document certificate award download", roles: ["coach","parent","player"] },
  { id: "admin-documents", label: "Best On Field Certificate · Document", icon: "▧", keywords: "document certificate award download", roles: ["admin"] },
  { id: "player-awards", label: "Best On Field · Award", icon: "★", keywords: "award recognition certificate", roles: ["parent","player"] },
  { id: "club-awards", label: "Best On Field · Awards Centre", icon: "★", keywords: "award recognition certificate", roles: ["admin","coach"] },
  { id: "session-builder", label: "Defensive Transitions · Training", icon: "▤", keywords: "training session objective plan", roles: ["coach"] },
  { id: "messages", label: "U11 Wallabies · Messages", icon: "✉", keywords: "message conversation family coach", roles: ["admin","coach","parent","player"] },
  { id: "football-intelligence", label: "Oakleigh United · Opponent", icon: "◉", keywords: "opponent club scout tactical", roles: ["admin","coach"] },
  { id: "team", label: "U11 Wallabies · Team", icon: "♟", keywords: "team squad fixtures statistics", roles: ["admin","coach","parent","player"] },
];

const clubHubPages = ["club-about", "club-values", "club-hall-of-fame", "club-awards", "club-events", "club-volunteers", "club-sponsors", "club-gallery", "club-canteen", "coach-recruitment", "documents"];
const communityHubPages = ["club-home", "club-pulse", "club-news", "club-parent-welcome", "club-ground-map", "club-player-journey"];
const publicClubHubPages = new Set(["club-join", ...clubHubPages, ...communityHubPages]);
const playerProfilePages = new Set(["player-profile", "player-stats", "player-development", "player-awards", "player-certificates", "player-rewards", "player-achievements"]);
const adminHubPages = {
  "admin-settings": "Club Settings", "admin-committee": "Committee", "admin-registrations": "Registrations",
  "admin-sponsors": "Sponsors", "admin-documents": "Documents", "admin-awards": "Awards",
  "admin-volunteers": "Volunteers", "admin-equipment": "Equipment", "admin-ground-bookings": "Ground Bookings",
  "admin-notifications": "Notifications", "admin-permissions": "Permissions",
};

const adminClubTabRoutes = {
  "admin-settings": "settings",
  "admin-notifications": "settings",
  "admin-permissions": "access",
};

const adminFoundationRoutes = new Set([
  "admin-committee",
  "admin-registrations",
  "admin-sponsors",
  "admin-volunteers",
  "admin-ground-bookings",
  "admin-recruitment",
]);

const adminHubRouteIds = new Set([
  "admin",
  "football-intelligence",
  "admin-rewards",
  "admin-recruitment",
  ...Object.keys(adminHubPages),
]);

function ClubHubRoute({ page, onNavigate, role }) {
  if (page === "club-join") {
    return <JoinSpringvale onNavigate={onNavigate} />;
  }

  if (clubHubPages.includes(page)) {
    if (page === "coach-recruitment" && !["coach", "admin"].includes(role)) return null;
    return <ClubHub page={page} onNavigate={onNavigate} role={role} />;
  }

  if (communityHubPages.includes(page)) {
    return <CommunityHub page={page} onNavigate={onNavigate} />;
  }

  return null;
}

function AdminHubRoute({ page, onNavigate, user }) {
  if (page === "admin") {
    return <AdminClub user={user} onNavigate={onNavigate} />;
  }

  if (page === "admin-rewards") {
    return <AdminRewardsManagement />;
  }

  if (page === "football-intelligence") {
    return <FootballIntelligence role="admin" onNavigate={onNavigate} />;
  }

  if (adminClubTabRoutes[page]) {
    return (
      <AdminClub
        key={page}
        user={user}
        onNavigate={onNavigate}
        initialTab={adminClubTabRoutes[page]}
      />
    );
  }

  if (adminFoundationRoutes.has(page)) {
    return <AdminFoundationPage page={page} onNavigate={onNavigate} />;
  }

  if (page === "admin-documents") {
    return <ClubHub page="documents" onNavigate={onNavigate} role="admin" />;
  }

  if (page === "admin-awards") {
    return <ClubHub page="club-awards" onNavigate={onNavigate} role="admin" />;
  }

  if (page === "admin-equipment") {
    return <Equipment role="admin" user={user} onNavigate={onNavigate} />;
  }

  return null;
}

const demoAccounts = [
  {
    id: "parent-emma",
    role: "parent",
    name: "Emma Thompson",
    title: "Parent Portal",
    subtitle: "Parent of Ava Thompson and Lily Thompson",
    email: "emma.thompson@example.com",
    linkedChildren: [
      {
        id: "ava",
        name: "Ava Thompson",
        number: 9,
        team: "U11 Wallabies",
      },
      {
        id: "lily-thompson",
        name: "Lily Thompson",
        number: 4,
        team: "U9 Wallabies",
      },
    ],
  },
  {
    id: "player-ava",
    role: "player",
    name: "Ava Thompson",
    title: "Player Portal",
    subtitle: "U11 Wallabies · #9",
    email: "ava.thompson@example.com",
    playerProfile: {
      id: "ava",
      name: "Ava Thompson",
      number: 9,
      team: "U11 Wallabies",
    },
    linkedChildren: [],
  },
  {
    id: "coach-lisa",
    role: "coach",
    name: "Lisa Pitsos",
    title: "Coach Portal",
    subtitle: "U11 Head Coach",
    email: "lisa.pitsos@springvalecitysc.com.au",
    linkedChildren: [],
  },
  {
    id: "admin-club",
    role: "admin",
    name: "Club Administrator",
    title: "Administrator Portal",
    subtitle: "Springvale City Soccer Club",
    email: "admin@springvalecitysc.com.au",
    linkedChildren: [],
  },
];

export default function App() {
  const [sessionUser, setSessionUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");

  const visibleNavigation = sessionUser
    ? navigationConfig[sessionUser.role]
    : [];

  const currentPage =
    visibleNavigation.find((item) => item.id === page) ||
    navigationById[page] ||
    additionalNavigationItems[page] ||
    navigationById.dashboard;
  const searchResults = globalSearch.trim() ? [...visibleNavigation.filter((item) => !item.heading), ...searchableResources.filter((item) => item.roles.includes(sessionUser.role))]
    .filter((item, index, collection) => `${item.label} ${item.keywords || ""}`.toLowerCase().includes(globalSearch.trim().toLowerCase()) && collection.findIndex((candidate) => candidate.id === item.id && candidate.label === item.label) === index).slice(0, 8) : [];

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    document.body.classList.add("mobile-menu-open");
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.classList.remove("mobile-menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  function navigateTo(nextPage) {
    setPage(nextPage);
    setGlobalSearch("");
    setIsMobileMenuOpen(false);
  }

  function launchAIStudio() {
    navigateTo("ai-studio");
  }

  function login(account) {
    setSessionUser(account);
    setPage("dashboard");

    try {
      window.localStorage.setItem(
        "matchvisionUser",
        JSON.stringify(account)
      );
      window.localStorage.setItem("matchvisionRole", account.role);
    } catch {
      // Demo continues if storage is unavailable.
    }
  }

  function logout() {
    setSessionUser(null);
    setPage("dashboard");
    setIsMobileMenuOpen(false);

    try {
      window.localStorage.removeItem("matchvisionUser");
      window.localStorage.removeItem("matchvisionRole");
    } catch {
      // Demo continues if storage is unavailable.
    }
  }

  if (!sessionUser) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <div className="app-shell">
      <MobileDrawer
        items={visibleNavigation}
        page={page}
        user={sessionUser}
        isOpen={isMobileMenuOpen}
        onNavigate={navigateTo}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={logout}
      />

      <aside
        className="sidebar desktop-sidebar"
        aria-label="Primary navigation"
      >
        <div className="brand-row">
          <div className="brand-mark">MV</div>
          <div>
            <strong>MatchVision™</strong>
            <span>Powered by AI</span>
          </div>
        </div>

        <div className="sidebar-club">
          <img
            src={springvaleLogo}
            alt="Springvale City Soccer Club"
          />
          <div>
            <strong>Springvale City</strong>
            <span>Soccer Club</span>
            <small>Est. 1956</small>
          </div>
        </div>

        <NavigationItems items={visibleNavigation} page={page} onNavigate={navigateTo} />

        <div className="sidebar-profile">
          <div className="profile-avatar">
            {sessionUser.name.charAt(0)}
          </div>
          <div>
            <strong>{sessionUser.name}</strong>
            <span>{sessionUser.subtitle}</span>
          </div>
        </div>

        <button
          type="button"
          className="sign-out-button"
          onClick={logout}
        >
          Sign out
        </button>
      </aside>

      <main className="main-column">
        <header className="topbar">
          <button
            type="button"
            className="mobile-menu-button"
            aria-label="Open navigation menu"
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span aria-hidden="true">☰</span>
          </button>

          <div className="topbar-title">
            <span className="portal-label">
              {sessionUser.title}
            </span>
            <h1>{currentPage.label}</h1>
          </div>

          <div className="topbar-actions">
            <label className="global-search">
              <span>⌕</span>
              <input
                value={globalSearch}
                onChange={(event) => setGlobalSearch(event.target.value)}
                placeholder={
                  sessionUser.role === "parent"
                    ? "Search your children, matches and highlights..."
                    : sessionUser.role === "player"
                      ? "Search your profile, matches and highlights..."
                      : "Search players, matches, coaches and clubs..."
                }
              />
              {globalSearch.trim() && (
                <div className="global-search-results" role="listbox" aria-label="Search results">
                  {searchResults.length ? searchResults.map((item) => (
                    <button type="button" key={item.id} onClick={() => navigateTo(item.id)}>
                      <span>{item.icon}</span><strong>{item.label}</strong><small>Open →</small>
                    </button>
                  )) : <p>No accessible pages match “{globalSearch}”.</p>}
                </div>
              )}
            </label>

            <span className="live-demo-pill">
              <i />
              Live demo
            </span>

            <button
              className="notification-button"
              type="button"
              aria-label={sessionUser.role === "admin" ? "Open notifications" : "Open messages"}
              onClick={() => navigateTo(sessionUser.role === "admin" ? "admin-notifications" : "messages")}
            >
              ✉<b>3</b>
            </button>

            <img
              className="topbar-logo"
              src={springvaleLogo}
              alt=""
            />
          </div>
        </header>

        <div className="content">
          {page === "dashboard" && (
            <Dashboard
              role={sessionUser.role}
              user={sessionUser}
              onNavigate={navigateTo}
              onLaunchAIStudio={launchAIStudio}
            />
          )}

          {page === "join-springvale" && (
            <JoinSpringvale onNavigate={navigateTo} />
          )}

          {page === "ai-studio" && (
            <AIStudio embedded role={sessionUser.role} user={sessionUser} onNavigate={navigateTo} />
          )}

          {publicClubHubPages.has(page) && (
            <ClubHubRoute key={page} page={page} onNavigate={navigateTo} role={sessionUser.role} />
          )}

          {playerProfilePages.has(page) && ["parent", "player"].includes(sessionUser.role) && (
            <PlayerProfile page={page} role={sessionUser.role} user={sessionUser} onNavigate={navigateTo} onLaunchAIStudio={launchAIStudio} />
          )}

          {page === "coach-recognition" && sessionUser.role === "coach" && (
            <PlayerRecognition />
          )}

          {page === "live" && (
            <LiveGame
              role={sessionUser.role}
              user={sessionUser}
              onLaunchAIStudio={launchAIStudio}
            />
          )}

          {page === "matches" && (
            <MatchLibrary
              role={sessionUser.role}
              user={sessionUser}
              onNavigate={navigateTo}
              onLaunchAIStudio={launchAIStudio}
            />
          )}

          {page === "analysis" &&
            ["coach", "admin", "player"].includes(sessionUser.role) && (
              <AIAnalysis
                role={sessionUser.role}
                user={sessionUser}
                onNavigate={navigateTo}
                onLaunchAIStudio={launchAIStudio}
              />
            )}

          {page === "football-intelligence" && sessionUser.role === "coach" && (
            <FootballIntelligence role="coach" onNavigate={navigateTo} />
          )}

          {page === "child-analysis" && sessionUser.role === "parent" && (
            <AIAnalysis
              role={sessionUser.role}
              user={sessionUser}
              onNavigate={navigateTo}
              onLaunchAIStudio={launchAIStudio}
            />
          )}

          {page === "equipment" &&
            ["coach", "admin"].includes(sessionUser.role) && (
              <Equipment
                role={sessionUser.role}
                user={sessionUser}
                onNavigate={navigateTo}
              />
            )}

          {page === "drills" &&
            sessionUser.role === "coach" && (
              <DrillExchange />
            )}

          {page === "coach-profiles" &&
            sessionUser.role === "coach" && (
              <CoachProfiles />
            )}

          {page === "session-builder" &&
            sessionUser.role === "coach" && (
              <SessionBuilder />
            )}

          {sessionUser.role === "admin" && adminHubRouteIds.has(page) && (
            <AdminHubRoute
              page={page}
              user={sessionUser}
              onNavigate={navigateTo}
            />
          )}

          {![
            "dashboard",
            "ai-studio",
            "join-springvale",
            ...publicClubHubPages,
            ...playerProfilePages,
            ...adminHubRouteIds,
            "live",
            "matches",
            "analysis",
            "child-analysis",
            "equipment",
            "drills",
            "coach-profiles",
            "session-builder",
            "coach-recognition",
            "equipment",
          ].includes(page) && (
            <PlaceholderPage
              page={page}
              userRole={sessionUser.role}
              role={sessionUser.role}
              user={sessionUser}
              onNavigate={navigateTo}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [selectedId, setSelectedId] =
    useState("coach-lisa");

  const selected =
    demoAccounts.find(
      (account) => account.id === selectedId
    ) || demoAccounts[2];

  return (
    <main className="login-screen">
      <section className="login-brand-panel">
        <div className="login-brand-row">
          <div className="brand-mark large">MV</div>
          <div>
            <strong>MatchVision™</strong>
            <span>
              SEE THE GAME. UNDERSTAND THE PLAYER.
            </span>
          </div>
        </div>

        <div className="login-copy">
          <span className="portal-label">
            AI-POWERED FOOTBALL INTELLIGENCE
          </span>
          <h1>
            One club. Four protected experiences.
          </h1>
          <p>
            Parents see only linked children. Players see only
            their own profile. Coaches and administrators receive
            authorised squad and club intelligence.
          </p>
        </div>

        <div className="login-club-footer">
          <img
            src={springvaleLogo}
            alt="Springvale City Soccer Club logo"
          />
          <div>
            <span>DEMO CLUB</span>
            <strong>
              Springvale City Soccer Club
            </strong>
            <small>
              Ross Reserve · Established 1956
            </small>
          </div>
        </div>
      </section>

      <section className="login-form-panel">
        <div className="login-card">
          <div className="login-card-heading">
            <img
              src={springvaleLogo}
              alt="Springvale City Soccer Club logo"
            />
            <div>
              <span className="portal-label">
                SPRINGVALE CITY SC PORTAL
              </span>
              <h2>Log in to MatchVision</h2>
              <p>
                Select a protected demonstration account.
              </p>
            </div>
          </div>

          <div className="account-options">
            {demoAccounts.map((account) => (
              <button
                type="button"
                key={account.id}
                className={
                  selectedId === account.id
                    ? "account-option selected"
                    : "account-option"
                }
                onClick={() =>
                  setSelectedId(account.id)
                }
              >
                <span className="account-initial">
                  {account.role === "parent"
                    ? "P"
                    : account.role === "player"
                      ? "PL"
                      : account.role === "coach"
                        ? "C"
                        : "A"}
                </span>
                <span>
                  <strong>{account.name}</strong>
                  <small>{account.subtitle}</small>
                </span>
              </button>
            ))}
          </div>

          <label className="login-field">
            <span>Email</span>
            <input value={selected.email} readOnly />
          </label>

          <label className="login-field">
            <span>Password</span>
            <input
              value="matchvision"
              type="password"
              readOnly
            />
          </label>

          <button
            type="button"
            className="login-submit"
            onClick={() => onLogin(selected)}
          >
            Log in as{" "}
            {selected.role === "admin"
              ? "Administrator"
              : selected.role}
          </button>

          <div className="privacy-login-note">
            <strong>Privacy applied automatically</strong>
            <span>
              {selected.role === "parent"
                ? "Only Ava Thompson and Lily Thompson are available."
                : selected.role === "player"
                  ? "Only Ava Thompson’s own profile is available."
                  : selected.role === "coach"
                    ? "The assigned U11 squad and coaching tools are available."
                    : "All authorised club information and privacy controls are available."}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
