import { useMemo, useState } from "react";
import "./LiveGame.css";
import springvaleLogo from "../assets/springvale-city-logo.png";

const games = [
  { id: 1, home: "U11 Wallabies", away: "Oakleigh United", score: "2–1", minute: "42:17", coach: "Lisa Pitsos", players: "Ava Thompson, Mia Rodriguez, Lily Chen", venue: "Ross Reserve", pitch: "Pitch 1", time: "7:00 PM", viewers: 84 },
  { id: 2, home: "U12 Girls", away: "South Melbourne", score: "1–0", minute: "28:04", coach: "Daniel Brooks", players: "Ruby Anderson, Grace Walker, Zoe Thomas", venue: "Ross Reserve", pitch: "Pitch 2", time: "7:15 PM", viewers: 51 },
  { id: 3, home: "U13 Boys", away: "Bentleigh Greens", score: "0–0", minute: "16:32", coach: "Alicia Tran", players: "Noah Martin, Liam Chen, Ethan Ferraro", venue: "Kingston Heath", pitch: "Pitch 1", time: "7:30 PM", viewers: 37 },
];

export default function LiveGame({ role = "coach", onLaunchAIStudio }) {
  const individualMode = role === "parent" || role === "player";
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All live games");
  const [selectedGame, setSelectedGame] = useState(games[0]);
  const [playing, setPlaying] = useState(false);

  const visibleGames = useMemo(() => {
    const term = search.toLowerCase();
    return games.filter((game) =>
      [game.home, game.away, game.coach, game.players, game.venue, game.pitch, game.time]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [search]);

  return (
    <div className="live-page">
      <section className="live-search-panel">
        <div>
          <span>LIVE GAME FINDER</span>
          <h2>Find and watch an approved live match</h2>
          <p>Search by player, coach, club, opponent, location, pitch, date or time.</p>
        </div>

        <div className="live-search-controls">
          <label><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search Ava, Lisa Pitsos, Oakleigh, Ross Reserve..." /></label>
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option>All live games</option>
            <option>My team</option>
            <option>My linked players</option>
            <option>Ross Reserve</option>
          </select>
          <button type="button" onClick={onLaunchAIStudio}>Send Recording to AI Studio</button>
        </div>
      </section>

      <div className="live-page-layout">
        <aside className="live-game-list">
          <header><h3>Currently Live</h3><span>{visibleGames.length}</span></header>
          {visibleGames.map((game) => (
            <button key={game.id} className={selectedGame.id === game.id ? "selected" : ""} onClick={() => setSelectedGame(game)}>
              <span className="live-pill">LIVE</span>
              <div><strong>{game.home} {game.score} {game.away}</strong><small>{game.venue} · {game.pitch}</small><small>Coach {game.coach}</small></div>
              <b>{game.minute}</b>
            </button>
          ))}
        </aside>

        <main className="live-viewer">
          <div className="live-video">
            <div className="video-top"><span>LIVE</span><strong>{selectedGame.home} {selectedGame.score} {selectedGame.away}</strong><b>{selectedGame.minute}</b></div>
            <div className="video-score"><img src={springvaleLogo} alt="" /><strong>{selectedGame.score}</strong><div className="live-opponent">OU</div></div>
            <button type="button" aria-pressed={playing} onClick={() => setPlaying((current) => !current)}>{playing ? "Ⅱ" : "▶"}</button>
            <small>{selectedGame.viewers} watching · Approved family stream</small>
          </div>

          <div className="live-analytics">
            {individualMode ? (
              <>
                <section>
                  <span>
                    {role === "player" ? "YOUR PLAYER PROFILE" : "YOUR LINKED PLAYER"}
                  </span>
                  <h3>Ava Thompson</h3><div className="live-metric-grid"><div><b>26</b><small>Touches</small></div><div><b>18</b><small>Passes</small></div><div><b>3</b><small>Chances</small></div><div><b>8.6</b><small>AI rating</small></div></div></section>
                <section><span>LIVE AI STORY</span><h3>Ava is finding space well on the right and has created three positive attacking moments.</h3><p>
                  {role === "player"
                    ? "Players see only their own information."
                    : "Parents see only their linked player’s information."}
                </p></section>
              </>
            ) : (
              <>
                <section><span>TEAM LIVE METRICS</span><div className="live-metric-grid"><div><b>57%</b><small>Possession</small></div><div><b>8</b><small>Shots</small></div><div><b>78%</b><small>Pass accuracy</small></div><div><b>6.2s</b><small>Recovery</small></div></div></section>
                <section><span>LIVE COACH AI</span><h3>Keep the right-side overload, but leave one midfielder behind the ball.</h3><p>Coach and admin accounts see all player and tactical information.</p></section>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
