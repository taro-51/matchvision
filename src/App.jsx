import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import RoleSelector from "./components/RoleSelector";
import Dashboard from "./pages/Dashboard";
import PlaceholderPage from "./pages/PlaceholderPage";
import DrillExchange from "./pages/CoachHub/DrillExchange";
import CoachProfiles from "./pages/CoachHub/CoachProfiles";
import SessionBuilder from "./pages/CoachHub/SessionBuilder";

export default function App() {
  const [role, setRole] = useState(null);
  const [page, setPage] = useState("dashboard");

  if (!role) {
    return <RoleSelector onSelect={setRole} />;
  }

  function changeRole() {
    setRole(null);
    setPage("dashboard");
  }

  function renderPage() {
    if (page === "dashboard") return <Dashboard role={role} />;
    if (page === "drills" && role === "coach") return <DrillExchange />;
    if (page === "coach-profiles" && role === "coach") return <CoachProfiles />;
    if (page === "session-builder" && role === "coach") return <SessionBuilder />;

    return <PlaceholderPage page={page} />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        role={role}
        page={page}
        onNavigate={setPage}
        onChangeRole={changeRole}
      />

      <main className="main-area">
        <Topbar role={role} page={page} />
        <section className="page-content">{renderPage()}</section>
      </main>
    </div>
  );
}
