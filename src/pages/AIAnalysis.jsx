import { useEffect, useMemo, useState } from "react";
import "./AIAnalysis.css";

const builtInDrills = [
  {
    id: "recovery-2v1",
    title: "Recovery Defending: 2v1",
    coach: "Lisa Pitsos",
    category: "Defending",
    duration: "20 min",
    players: "8–14",
    videoName: "Recovery_Defending_2v1_Demo.mp4",
    reason:
      "Directly addresses slow recovery runs and left-side exposure identified in the uploaded match.",
    confidence: 96,
  },
  {
    id: "compact-shape",
    title: "Compact Shape: 4v4 + Targets",
    coach: "Michael Tran",
    category: "Defending",
    duration: "25 min",
    players: "10–16",
    videoName: "Compact_Shape_Coaching_Clip.mp4",
    reason:
      "Improves team distances and helps the midfield stay connected when fullbacks advance.",
    confidence: 93,
  },
  {
    id: "six-second",
    title: "Six-Second Transition Game",
    coach: "Daniel Brooks",
    category: "Pressing",
    duration: "25 min",
    players: "12–20",
    videoName: "Six_Second_Transition.mp4",
    reason:
      "Matches the AI finding that ball-recovery time became slower late in each half.",
    confidence: 89,
  },
];

const analysisFindings = [
  {
    label: "Defensive transition",
    value: "Priority",
    detail: "Four dangerous attacks followed turnovers on the left.",
  },
  {
    label: "Recovery speed",
    value: "6.8 sec",
    detail: "Target for next match: under 6.0 seconds.",
  },
  {
    label: "Team compactness",
    value: "Needs work",
    detail: "Midfield and defence separated during wide attacks.",
  },
  {
    label: "Right-side attack",
    value: "Strength",
    detail: "63% of high-value entries came from the right channel.",
  },
];

export default function AIAnalysis({ role = "coach", onNavigate }) {
  const [uploadedDrills, setUploadedDrills] = useState([]);
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  const [selectedDrills, setSelectedDrills] = useState([
    "recovery-2v1",
    "compact-shape",
  ]);
  const [activeTab, setActiveTab] = useState("Recommended session");
  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState("All skills");
  const [videoOpen, setVideoOpen] = useState(null);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      const stored = JSON.parse(
        window.localStorage.getItem("matchvisionUploadedDrills") || "[]"
      );
      const latest = JSON.parse(
        window.localStorage.getItem("matchvisionLatestAnalysis") || "null"
      );
      setUploadedDrills(stored);
      setLatestAnalysis(latest);
    } catch {
      setUploadedDrills([]);
      setLatestAnalysis(null);
    }
  }, []);

  const recommendationPool = useMemo(() => {
    const mappedUploads = uploadedDrills.map((drill, index) => ({
      ...drill,
      confidence: Math.max(82, 95 - index * 3),
      reason:
        drill.category === "Defending"
          ? "Uploaded by your coaching team and closely matched to the defensive transition issues found in this game."
          : "Uploaded by your coaching team and matched to the current development objective.",
      isUploaded: true,
    }));

    return [...mappedUploads, ...builtInDrills];
  }, [uploadedDrills]);

  const filteredRecommendations = recommendationPool.filter((drill) => {
    const searchText =
      `${drill.title} ${drill.coach} ${drill.category} ${drill.reason}`.toLowerCase();
    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesSkill =
      skillFilter === "All skills" || drill.category === skillFilter;
    return matchesSearch && matchesSkill;
  });

  function toggleDrill(id) {
    setSelectedDrills((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
    setSaved(false);
  }

  function showToast(text) {
    setToast(text);
    window.setTimeout(() => setToast(""), 2600);
  }

  return (
    <div className="analysis-page">
      <section className="analysis-hero">
        <div>
          <span>AI ANALYSIS · UPLOADED MATCH</span>
          <h2>Match findings have already become a training plan.</h2>
          <p>
            MatchVision links the uploaded game to Drill Exchange content,
            prioritises relevant coaching videos and creates a session that the
            coach can use immediately.
          </p>
        </div>

        <div className="analysis-status">
          <i />
          <div>
            <strong>Analysis complete</strong>
            <span>
              {latestAnalysis?.sourceFile ||
                "Springvale_U11_vs_Oakleigh_AI_Demo.mp4"}
              {" · "}94% confidence
            </span>
          </div>
        </div>
      </section>

      <section className="analysis-flow">
        <div className="flow-step complete">
          <span>1</span>
          <div>
            <strong>Match uploaded</strong>
            <small>Video processed</small>
          </div>
        </div>
        <div className="flow-line" />
        <div className="flow-step complete">
          <span>2</span>
          <div>
            <strong>AI findings ready</strong>
            <small>Players and events detected</small>
          </div>
        </div>
        <div className="flow-line" />
        <div className="flow-step active">
          <span>3</span>
          <div>
            <strong>Session recommended</strong>
            <small>Drills and videos matched</small>
          </div>
        </div>
      </section>

      <div className="analysis-tabs">
        {["Recommended session", "Match findings", "Drill videos"].map((tab) => (
          <button
            type="button"
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Recommended session" && (
        <>
          <div className="analysis-main-grid">
            <section className="session-recommendation-card">
              <header>
                <div>
                  <span>AI-GENERATED SESSION</span>
                  <h3>Defensive transitions and compact recovery</h3>
                  <p>70 minutes · 14 players · Match-based recommendation</p>
                </div>
                <b>96% match</b>
              </header>

              <div className="session-reasoning">
                <span>WHY THIS WAS RECOMMENDED</span>
                <p>
                  The uploaded match showed repeated left-side exposure after
                  turnovers, slower recovery late in each half and a gap between
                  midfield and defence. The session prioritises those exact
                  patterns.
                </p>
              </div>

              <ol className="recommended-timeline">
                <li>
                  <time>10 min</time>
                  <div>
                    <strong>Scanning and recovery warm-up</strong>
                    <p>Movement, communication and quick reaction cues.</p>
                  </div>
                  <span>Warm-up</span>
                </li>

                <li>
                  <time>20 min</time>
                  <div>
                    <strong>Recovery Defending: 2v1</strong>
                    <p>Delay, recover goal-side and protect the centre.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVideoOpen(builtInDrills[0])}
                  >
                    ▶ Video
                  </button>
                </li>

                <li>
                  <time>25 min</time>
                  <div>
                    <strong>Compact Shape: 4v4 + Targets</strong>
                    <p>Connect midfield and defence around pressing triggers.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVideoOpen(builtInDrills[1])}
                  >
                    ▶ Video
                  </button>
                </li>

                <li>
                  <time>15 min</time>
                  <div>
                    <strong>Conditioned transition game</strong>
                    <p>Six-second recovery rule with wide overloads.</p>
                  </div>
                  <span>Game</span>
                </li>
              </ol>

              <div className="session-footer-actions">
                <button
                  type="button"
                  className="secondary-analysis-button"
                  onClick={() => {
                    try {
                      window.localStorage.setItem(
                        "matchvisionRecommendedSession",
                        JSON.stringify({
                          title: "Defensive transitions and compact recovery",
                          duration: "70 minutes",
                          selectedDrills,
                          sourceMatch: latestAnalysis?.sourceFile || "Springvale_U11_vs_Oakleigh_AI_Demo.mp4",
                          equipment: [
                            { id: "balls", name: "Size 4 footballs", required: 12, reason: "One ball per pair plus spares." },
                            { id: "cones", name: "Flat marker cones", required: 24, reason: "Recovery lanes, target gates and pitch boundaries." },
                            { id: "red-bibs", name: "Red bibs", required: 7, reason: "One team for opposed activities." },
                            { id: "blue-bibs", name: "Blue bibs", required: 7, reason: "Second team for opposed activities." },
                            { id: "mini-goals", name: "Mini goals", required: 4, reason: "Transition targets and conditioned games." },
                            { id: "poles", name: "Agility poles", required: 6, reason: "Recovery gates and scanning cues." },
                            { id: "first-aid", name: "First-aid kit", required: 1, reason: "Mandatory safety equipment." }
                          ]
                        })
                      );
                    } catch {
                      // Demo continues if storage is unavailable.
                    }

                    showToast("Session opened in Session Builder");
                    window.setTimeout(() => onNavigate?.("session-builder"), 500);
                  }}
                >
                  Edit in Session Builder
                </button>
                <button
                  type="button"
                  className="primary-analysis-button"
                  onClick={() => {
                    setSaved(true);
                    showToast("Recommended session saved");
                  }}
                >
                  {saved ? "Session saved ✓" : "Save recommended session"}
                </button>
              </div>
            </section>

            <aside className="analysis-findings-card">
              <header>
                <span>MATCH FINDINGS</span>
                <h3>What triggered the plan</h3>
              </header>

              {analysisFindings.map((finding) => (
                <article key={finding.label}>
                  <div>
                    <span>{finding.label}</span>
                    <strong>{finding.value}</strong>
                  </div>
                  <p>{finding.detail}</p>
                </article>
              ))}
            </aside>
          </div>

          <section className="recommended-drills-section">
            <div className="recommendation-heading">
              <div>
                <span>DRILL EXCHANGE MATCHES</span>
                <h3>Recommended uploaded drills and videos</h3>
                <p>
                  Newly uploaded Coach Hub content appears here automatically
                  when it matches the AI findings.
                </p>
              </div>

              <div className="recommendation-controls">
                <label>
                  <span>⌕</span>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search drill, coach or objective..."
                  />
                </label>

                <select
                  value={skillFilter}
                  onChange={(event) => setSkillFilter(event.target.value)}
                >
                  <option>All skills</option>
                  <option>Defending</option>
                  <option>Pressing</option>
                  <option>Passing</option>
                </select>
              </div>
            </div>

            {uploadedDrills.length > 0 && (
              <div className="uploaded-content-alert">
                <span>NEW FROM YOUR DRILL EXCHANGE</span>
                <strong>
                  {uploadedDrills.length} uploaded drill
                  {uploadedDrills.length === 1 ? "" : "s"} added to the AI
                  recommendation pool.
                </strong>
              </div>
            )}

            <div className="recommendation-grid">
              {filteredRecommendations.map((drill) => (
                <article className="recommendation-card" key={drill.id}>
                  <div className="recommendation-video">
                    <span>{drill.isUploaded ? "YOUR UPLOAD" : "DRILL EXCHANGE"}</span>
                    <button type="button" onClick={() => setVideoOpen(drill)}>
                      ▶
                    </button>
                    <small>{drill.videoName || "Coaching video available"}</small>
                  </div>

                  <div className="recommendation-body">
                    <div className="recommendation-score">
                      <span>{drill.category}</span>
                      <b>{drill.confidence}% match</b>
                    </div>

                    <h3>{drill.title}</h3>
                    <small>
                      {drill.coach} · {drill.duration} · {drill.players}
                    </small>
                    <p>{drill.reason}</p>

                    <div className="recommendation-actions">
                      <button
                        type="button"
                        className="secondary-analysis-button"
                        onClick={() => setVideoOpen(drill)}
                      >
                        Watch video
                      </button>
                      <button
                        type="button"
                        className={
                          selectedDrills.includes(drill.id)
                            ? "selected-drill-button"
                            : "primary-analysis-button"
                        }
                        onClick={() => toggleDrill(drill.id)}
                      >
                        {selectedDrills.includes(drill.id)
                          ? "Included ✓"
                          : "Add to session"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === "Match findings" && (
        <section className="full-findings-grid">
          {analysisFindings.map((finding, index) => (
            <article key={finding.label}>
              <span>FINDING {index + 1}</span>
              <h3>{finding.label}</h3>
              <strong>{finding.value}</strong>
              <p>{finding.detail}</p>
              <div className="finding-impact">
                <b>Training impact</b>
                <small>
                  {index < 3
                    ? "Included in the recommended session."
                    : "Retain as an attacking strength."}
                </small>
              </div>
            </article>
          ))}
        </section>
      )}

      {activeTab === "Drill videos" && (
        <section className="video-library-panel">
          <div className="recommendation-heading">
            <div>
              <span>COACHING VIDEO LIBRARY</span>
              <h3>Videos recommended from this match</h3>
              <p>
                Choose a clip to preview before adding its drill to the session.
              </p>
            </div>
          </div>

          <div className="recommendation-grid">
            {recommendationPool.map((drill) => (
              <article className="recommendation-card" key={drill.id}>
                <div className="recommendation-video large">
                  <span>{drill.isUploaded ? "YOUR UPLOAD" : "COACH VIDEO"}</span>
                  <button type="button" onClick={() => setVideoOpen(drill)}>
                    ▶
                  </button>
                  <small>{drill.videoName || "Video demonstration"}</small>
                </div>
                <div className="recommendation-body">
                  <h3>{drill.title}</h3>
                  <p>{drill.reason}</p>
                  <button
                    type="button"
                    className="primary-analysis-button full"
                    onClick={() => setVideoOpen(drill)}
                  >
                    Preview coaching video
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {videoOpen && (
        <div
          className="analysis-modal-backdrop"
          onClick={() => setVideoOpen(null)}
        >
          <section
            className="video-preview-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span>RECOMMENDED COACHING VIDEO</span>
                <h2>{videoOpen.title}</h2>
                <p>
                  {videoOpen.coach} · {videoOpen.confidence}% AI match
                </p>
              </div>
              <button type="button" onClick={() => setVideoOpen(null)}>
                ×
              </button>
            </header>

            <div className="video-demo-stage">
              <div className="video-pitch">
                <i className="red-player p1" />
                <i className="red-player p2" />
                <i className="red-player p3" />
                <i className="blue-player p4" />
                <i className="blue-player p5" />
              </div>
              <button type="button">▶</button>
              <span>{videoOpen.videoName || "Uploaded coaching video"}</span>
            </div>

            <div className="video-preview-detail">
              <span>WHY MATCHVISION CHOSE THIS</span>
              <p>{videoOpen.reason}</p>
              <button
                type="button"
                className="primary-analysis-button"
                onClick={() => {
                  if (!selectedDrills.includes(videoOpen.id)) {
                    setSelectedDrills((current) => [
                      ...current,
                      videoOpen.id,
                    ]);
                  }
                  setVideoOpen(null);
                  showToast("Drill added to recommended session");
                }}
              >
                Add drill to session
              </button>
            </div>
          </section>
        </div>
      )}

      {toast && <div className="analysis-toast">{toast}</div>}
    </div>
  );
}
