import { useMemo, useState } from "react";
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
import springvaleLogo from "./assets/springvale-city-logo.png";

const navigation = [
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
    id: "documents",
    label: "Documents",
    icon: "▧",
    roles: ["coach", "parent", "player", "admin"],
  },
  {
    id: "admin",
    label: "Club Admin",
    icon: "⚙",
    roles: ["admin"],
  },
  {
    id: "football-intelligence",
    label: "Football Intelligence",
    icon: "◈",
    roles: ["admin"],
    child: true,
  },
];

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

  const visibleNavigation = useMemo(
    () =>
      sessionUser
        ? navigation.filter((item) => item.roles.includes(sessionUser.role))
        : [],
    [sessionUser]
  );

  const currentPage =
    navigation.find((item) => item.id === page) || navigation[0];

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
      <aside className="sidebar">
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

        <nav className="sidebar-nav">
          {visibleNavigation.map((item) =>
            item.heading ? (
              <div className="nav-section-label" key={item.id}>
                <span className="nav-symbol">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ) : (
              <button
                type="button"
                key={item.id}
                className={[
                  "nav-item",
                  page === item.id ? "active" : "",
                  item.child ? "nav-child" : "",
                ].join(" ")}
                onClick={() => setPage(item.id)}
              >
                <span className="nav-symbol">{item.icon}</span>
                <span>{item.label}</span>
                {item.id === "messages" && (
                  <b className="nav-count">3</b>
                )}
              </button>
            )
          )}
        </nav>

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
          <div>
            <span className="portal-label">
              {sessionUser.title}
            </span>
            <h1>{currentPage.label}</h1>
          </div>

          <div className="topbar-actions">
            <label className="global-search">
              <span>⌕</span>
              <input
                placeholder={
                  sessionUser.role === "parent"
                    ? "Search your children, matches and highlights..."
                    : sessionUser.role === "player"
                      ? "Search your profile, matches and highlights..."
                      : "Search players, matches, coaches and clubs..."
                }
              />
            </label>

            <span className="live-demo-pill">
              <i />
              Live demo
            </span>

            <button
              className="notification-button"
              type="button"
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
              onNavigate={setPage}
            />
          )}

          {page === "live" && (
            <LiveGame
              role={sessionUser.role}
              user={sessionUser}
            />
          )}

          {page === "matches" && (
            <MatchLibrary
              role={sessionUser.role}
              user={sessionUser}
              onNavigate={setPage}
            />
          )}

          {page === "analysis" &&
            ["coach", "admin"].includes(sessionUser.role) && (
              <AIAnalysis
                role={sessionUser.role}
                user={sessionUser}
                onNavigate={setPage}
              />
            )}

          {page === "equipment" &&
            ["coach", "admin"].includes(sessionUser.role) && (
              <Equipment
                role={sessionUser.role}
                user={sessionUser}
                onNavigate={setPage}
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

          {page === "admin" &&
            sessionUser.role === "admin" && (
              <AdminClub user={sessionUser} onNavigate={setPage} />
            )}

          {page === "football-intelligence" &&
            sessionUser.role === "admin" && (
              <FootballIntelligence onNavigate={setPage} />
            )}

          {![
            "dashboard",
            "live",
            "matches",
            "analysis",
            "equipment",
            "drills",
            "coach-profiles",
            "session-builder",
            "equipment",
            "admin",
            "football-intelligence",
          ].includes(page) && (
            <PlaceholderPage
              page={page}
              userRole={sessionUser.role}
              role={sessionUser.role}
              user={sessionUser}
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
