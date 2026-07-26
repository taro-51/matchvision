import { useState } from "react";

export default function SessionBuilder() {
  const [objective, setObjective] = useState("Defending");
  const [playerCount, setPlayerCount] = useState("14");
  const [duration, setDuration] = useState("60 minutes");
  const [generated, setGenerated] = useState(false);

  return (
    <section className="session-layout">
      <article className="content-card session-form">
        <span className="page-eyebrow">COACH HUB · SESSION BUILDER</span>
        <h2>Build tomorrow’s session</h2>
        <p>
          Create a practical training plan using highly rated drills from the
          Drill Exchange.
        </p>

        <label>
          Main objective
          <select value={objective} onChange={(event) => setObjective(event.target.value)}>
            <option>Defending</option>
            <option>Passing</option>
            <option>Pressing</option>
            <option>First touch</option>
          </select>
        </label>

        <label>
          Number of players
          <input value={playerCount} onChange={(event) => setPlayerCount(event.target.value)} />
        </label>

        <label>
          Session length
          <select value={duration} onChange={(event) => setDuration(event.target.value)}>
            <option>45 minutes</option>
            <option>60 minutes</option>
            <option>75 minutes</option>
            <option>90 minutes</option>
          </select>
        </label>

        <button className="primary-button full-width" onClick={() => setGenerated(true)}>
          Generate draft session
        </button>
      </article>

      <article className="content-card session-preview">
        <span className="page-eyebrow">SESSION PREVIEW</span>

        {!generated ? (
          <div className="session-empty">
            <div className="placeholder-icon">▤</div>
            <h3>Your session will appear here</h3>
            <p>Choose the objective, squad size and available time.</p>
          </div>
        ) : (
          <>
            <h2>{objective} · {duration}</h2>
            <p>Prepared for {playerCount} players using Coach Hub drills.</p>

            <ol className="session-timeline">
              <li><strong>10 min</strong><span>Movement warm-up and reaction game</span></li>
              <li><strong>20 min</strong><span>Recovery Defending: 2v1</span></li>
              <li><strong>20 min</strong><span>Compact Shape: 4v4 + Targets</span></li>
              <li><strong>10 min</strong><span>Conditioned match and coach review</span></li>
            </ol>

            <button className="secondary-button full-width">
              Save session plan
            </button>
          </>
        )}
      </article>
    </section>
  );
}
