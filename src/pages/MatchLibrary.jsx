import { useMemo, useRef, useState } from "react";
import "./MatchLibrary.css";

const skills = [
  "All analytics",
  "Goals",
  "Assists",
  "Passes",
  "Pass accuracy",
  "Chances created",
  "Defence",
  "Tackles",
  "Interceptions",
  "Ball recoveries",
  "Shots",
  "Saves",
  "Touches",
  "Distance covered",
  "Sprint count",
  "Heat map",
  "Player tracking",
];

const demoMatches = [
  {
    id: 1,
    title: "Springvale 3–2 Oakleigh",
    date: "26 July 2026",
    status: "AI complete",
    visibility: "Linked players + coaching staff",
    highlights: 9,
    approved: true,
    playerIds: ["ava", "mia", "lily-chen"],
  },
  {
    id: 2,
    title: "Dandenong 1–1 Springvale",
    date: "19 July 2026",
    status: "AI complete",
    visibility: "Linked players + coaching staff",
    highlights: 7,
    approved: true,
    playerIds: ["ava", "mia", "lily-chen"],
  },
  {
    id: 3,
    title: "Springvale 4–1 Noble Park",
    date: "12 July 2026",
    status: "AI complete",
    visibility: "Coaches and administrators",
    highlights: 12,
    approved: false,
    playerIds: ["mia", "sophie"],
  },
  {
    id: 4,
    title: "Springvale 2–0 Bentleigh",
    date: "5 July 2026",
    status: "AI complete",
    visibility: "Linked players + coaching staff",
    highlights: 6,
    approved: true,
    playerIds: ["ava", "lily-chen"],
  },
];

const allPlayers = [
  {
    id: "ava",
    name: "Ava Thompson",
    number: 9,
    position: "Right Wing",
  },
  {
    id: "mia",
    name: "Mia Rodriguez",
    number: 10,
    position: "Attacking Midfield",
  },
  {
    id: "lily-chen",
    name: "Lily Chen",
    number: 4,
    position: "Defender",
  },
  {
    id: "sophie",
    name: "Sophie Williams",
    number: 1,
    position: "Goalkeeper",
  },
];

const playerAnalytics = {
  ava: [
    ["Goals", "1"],
    ["Assists", "1"],
    ["Passes", "21 / 27"],
    ["Pass accuracy", "78%"],
    ["Chances created", "4"],
    ["Defensive actions", "6"],
    ["Ball recoveries", "7"],
    ["Touches", "38"],
    ["Distance covered", "5.4 km"],
    ["Sprint count", "12"],
    ["AI rating", "8.6"],
  ],
  mia: [
    ["Goals", "0"],
    ["Assists", "1"],
    ["Passes", "28 / 34"],
    ["Pass accuracy", "82%"],
    ["Chances created", "5"],
    ["Defensive actions", "4"],
    ["Ball recoveries", "5"],
    ["Touches", "45"],
    ["Distance covered", "5.8 km"],
    ["Sprint count", "10"],
    ["AI rating", "8.2"],
  ],
  "lily-chen": [
    ["Goals", "0"],
    ["Assists", "0"],
    ["Passes", "24 / 30"],
    ["Pass accuracy", "80%"],
    ["Chances created", "1"],
    ["Defensive actions", "11"],
    ["Ball recoveries", "9"],
    ["Touches", "42"],
    ["Distance covered", "5.6 km"],
    ["Sprint count", "9"],
    ["AI rating", "8.4"],
  ],
  sophie: [
    ["Goals", "0"],
    ["Assists", "0"],
    ["Passes", "12 / 17"],
    ["Pass accuracy", "71%"],
    ["Saves", "6"],
    ["Claims", "3"],
    ["Ball recoveries", "2"],
    ["Touches", "24"],
    ["Distance covered", "2.1 km"],
    ["Sprint count", "2"],
    ["AI rating", "8.1"],
  ],
};

const analysisStages = [
  { progress: 8, label: "Reading video and calibrating pitch boundaries…" },
  { progress: 18, label: "Identifying Springvale and Oakleigh kits…" },
  { progress: 31, label: "Detecting players and jersey numbers…" },
  { progress: 44, label: "Tracking ball movement and possession…" },
  { progress: 57, label: "Recognising passes, tackles and recoveries…" },
  { progress: 69, label: "Building player movement paths…" },
  { progress: 80, label: "Finding goals, assists and key moments…" },
  { progress: 90, label: "Matching findings to Drill Exchange…" },
  { progress: 97, label: "Generating private player reports…" },
  { progress: 100, label: "Coach report and session plan ready." },
];

export default function MatchLibrary({
  role = "coach",
  user,
  onNavigate,
}) {
  const fileRef = useRef(null);

  const canUpload = ["coach", "admin"].includes(role);
  const isRestrictedProfile = ["parent", "player"].includes(role);

  const parentPlayers =
    role === "parent"
      ? (user?.linkedChildren || []).map((child) => ({
          id: child.id,
          name: child.name,
          number: child.number,
          position: child.team,
        }))
      : [];

  const playerOnly =
    role === "player" && user?.playerProfile
      ? [
          {
            id: user.playerProfile.id,
            name: user.playerProfile.name,
            number: user.playerProfile.number,
            position: user.playerProfile.team,
          },
        ]
      : [];

  const permittedPlayers =
    role === "parent"
      ? parentPlayers
      : role === "player"
        ? playerOnly
        : allPlayers;

  const defaultPlayer =
    permittedPlayers[0]?.id || "ava";

  const permittedPlayerIds = new Set(permittedPlayers.map((player) => player.id));
  const visibleMatches = isRestrictedProfile
    ? demoMatches.filter((match) => match.approved && match.playerIds.some((id) => permittedPlayerIds.has(id)))
    : demoMatches;

  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [analysisStage, setAnalysisStage] =
    useState("idle");
  const [progress, setProgress] = useState(0);
  const [stageLabel, setStageLabel] = useState("");
  const [selectedSkill, setSelectedSkill] =
    useState("All analytics");
  const [search, setSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] =
    useState(defaultPlayer);
  const [confirmedPlayers, setConfirmedPlayers] =
    useState(["ava", "mia", "lily-chen"]);
  const [toast, setToast] = useState("");
  const [demoRecognised, setDemoRecognised] =
    useState(false);

  const filteredAnalytics = useMemo(() => {
    const rows =
      playerAnalytics[selectedPlayer] ||
      playerAnalytics.ava;

    return rows.filter(([label]) => {
      const searchMatch = label
        .toLowerCase()
        .includes(search.toLowerCase());

      const normalizedSkill = selectedSkill
        .toLowerCase()
        .replace("defence", "defensive");

      const skillMatch =
        selectedSkill === "All analytics" ||
        label.toLowerCase().includes(normalizedSkill) ||
        (selectedSkill === "Heat map" &&
          label === "Distance covered") ||
        (selectedSkill === "Player tracking" &&
          ["Distance covered", "Sprint count"].includes(
            label
          ));

      return searchMatch && skillMatch;
    });
  }, [search, selectedSkill, selectedPlayer]);

  function showToast(text) {
    setToast(text);
    window.setTimeout(() => setToast(""), 2600);
  }

  function chooseFile(event) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setFile(selected);
    setVideoUrl(URL.createObjectURL(selected));
    setAnalysisStage("uploaded");
    setProgress(0);
    setStageLabel("Video ready for analysis.");

    const recognised =
      selected.name ===
      "Springvale_U11_vs_Oakleigh_AI_Demo.mp4";

    setDemoRecognised(recognised);

    showToast(
      recognised
        ? "Official MatchVision demo footage recognised"
        : "Video selected successfully"
    );
  }

  function storeDemoAnalysis() {
    const analysis = {
      sourceFile:
        file?.name ||
        "Springvale_U11_vs_Oakleigh_AI_Demo.mp4",
      completedAt: new Date().toISOString(),
      match: {
        home: "Springvale City U11 Wallabies",
        away: "Oakleigh United U11",
        score: "3–2",
        venue: "Ross Reserve",
        pitch: "Pitch 1",
        coach: "Lisa Pitsos",
      },
      findings: {
        possession: "57%",
        shots: 8,
        passAccuracy: "78%",
        recoveryTime: "6.8 sec",
        priority: "Defensive transitions",
        teamCompactness: "Needs work",
        attackingStrength: "Right-side combinations",
      },
      detectedPlayers: allPlayers,
      confirmedPlayers,
      recommendedSession: {
        title:
          "Defensive transitions and compact recovery",
        duration: "70 minutes",
        drills: [
          "Recovery Defending: 2v1",
          "Compact Shape: 4v4 + Targets",
          "Six-Second Transition Game",
        ],
      },
    };

    try {
      window.localStorage.setItem(
        "matchvisionLatestAnalysis",
        JSON.stringify(analysis)
      );
      window.localStorage.setItem(
        "matchvisionDemoVideoName",
        analysis.sourceFile
      );
    } catch {
      // Demo continues if browser storage is unavailable.
    }
  }

  function runAnalysis() {
    if (!canUpload) {
      showToast(
        role === "parent"
          ? "Parents can view only their linked children’s approved reports"
          : "Players can view only their own approved report"
      );
      return;
    }

    if (!file) {
      fileRef.current?.click();
      return;
    }

    setUploadOpen(false);
    setAnalysisOpen(true);
    setAnalysisStage("analysing");
    setProgress(2);
    setStageLabel("Preparing MatchVision AI…");

    analysisStages.forEach((stage, index) => {
      window.setTimeout(() => {
        setProgress(stage.progress);
        setStageLabel(stage.label);

        if (stage.progress === 100) {
          setAnalysisStage("complete");
          storeDemoAnalysis();
        }
      }, 760 * (index + 1));
    });
  }

  function openCoachAnalysis() {
    storeDemoAnalysis();
    setAnalysisOpen(false);

    if (onNavigate) {
      onNavigate("analysis");
    }
  }

  const selectedPlayerData =
    permittedPlayers.find(
      (player) => player.id === selectedPlayer
    ) || permittedPlayers[0];

  return (
    <div className="match-page">
      <section className="match-page-hero">
        <div>
          <span>MATCH LIBRARY · VIDEO + AI</span>
          <h2>
            {canUpload
              ? "Upload the game. MatchVision turns it into the next coaching decision."
              : role === "parent"
                ? "Your children’s approved match reports."
                : "Your private player match profile."}
          </h2>
          <p>
            {canUpload
              ? "The president demonstration uses deterministic AI-style processing so every moving part produces the same professional result."
              : "Shared player and team-level information remains restricted to authorised coaches and administrators."}
          </p>
        </div>

        {canUpload && (
          <div>
            <button
              className="match-primary"
              type="button"
              onClick={() => setUploadOpen(true)}
            >
              ＋ Upload Match
            </button>
            <button
              type="button"
              onClick={runAnalysis}
            >
              ✦ AI Analyse
            </button>
          </div>
        )}
      </section>

      <section className="match-permission">
        <strong>
          {role === "parent"
            ? "Parent privacy: only Ava Thompson and Lily Thompson are available to this account."
            : role === "player"
              ? "Player privacy: Ava Thompson can access only her own player profile."
              : role === "coach"
                ? "Coach access: the complete assigned U11 squad, team findings and session recommendations."
                : "Administrator access: all authorised club matches, players and privacy controls."}
        </strong>
        <p>
          MatchVision never exposes another player’s private
          report to a parent or player account. Team tactical
          information and cross-player comparisons are reserved
          for authorised coaches and administrators.
        </p>
      </section>

      <div className="match-layout">
        <section className="match-library-panel">
          <header>
            <h3>Match Library</h3>
            <span>{visibleMatches.length} games</span>
          </header>

          {visibleMatches.map((match) => (
            <button key={match.id}>
              <span>▶</span>
              <div>
                <strong>{match.title}</strong>
                <small>{match.date}</small>
                <small>{match.visibility}</small>
              </div>
              <b>{match.status}</b>
            </button>
          ))}
        </section>

        <section className="match-demo-panel">
          <div className="match-video-stage">
            {videoUrl ? (
              <video src={videoUrl} controls />
            ) : (
              <div className="match-video-empty">
                <span>▶</span>
                <strong>
                  {canUpload
                    ? "Upload the supplied MatchVision demo video"
                    : "Approved match footage"}
                </strong>
                <p>
                  {canUpload
                    ? "Use Springvale_U11_vs_Oakleigh_AI_Demo.mp4"
                    : "Only footage linked to this profile is visible."}
                </p>
              </div>
            )}

            {demoRecognised && (
              <div className="demo-recognised-badge">
                ✓ MATCHVISION DEMO RECOGNISED
              </div>
            )}

            {analysisStage === "analysing" && (
              <div className="analysis-overlay">
                <span>AI ANALYSIS RUNNING</span>
                <strong>{progress}%</strong>
                <p>{stageLabel}</p>
                <div>
                  <i
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {canUpload && (
            <div className="match-demo-actions">
              <input
                ref={fileRef}
                type="file"
                accept="video/*"
                onChange={chooseFile}
                hidden
              />

              <button
                type="button"
                onClick={() =>
                  fileRef.current?.click()
                }
              >
                {file
                  ? `✓ ${file.name}`
                  : "Choose Demo Video"}
              </button>

              <button
                className="match-primary"
                type="button"
                onClick={runAnalysis}
              >
                ✦ Analyse Video Live
              </button>
            </div>
          )}
        </section>
      </div>

      <section className="analytics-search-panel">
        <div>
          <span>ANALYTICS SEARCH</span>
          <h3>
            {isRestrictedProfile
              ? role === "parent"
                ? "Search your linked child’s analytics"
                : "Search your own player analytics"
              : "Search any authorised player’s analytics"}
          </h3>
        </div>

        <div className="analytics-controls">
          <select
            value={selectedPlayer}
            onChange={(event) =>
              setSelectedPlayer(event.target.value)
            }
            disabled={role === "player"}
          >
            {permittedPlayers.map((player) => (
              <option
                key={player.id}
                value={player.id}
              >
                {player.name} · #{player.number}
              </option>
            ))}
          </select>

          <select
            value={selectedSkill}
            onChange={(event) =>
              setSelectedSkill(event.target.value)
            }
          >
            {skills.map((skill) => (
              <option key={skill}>{skill}</option>
            ))}
          </select>

          <label>
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search assists, passes, defence, goals..."
            />
          </label>
        </div>
      </section>

      <div className="analytics-results">
        <section className="analytics-player-card">
          <span>PRIVATE PLAYER REPORT</span>
          <h3>
            {selectedPlayerData?.name ||
              "Ava Thompson"}
          </h3>
          <p>
            {role === "parent"
              ? "Visible only because this child is linked to the parent account."
              : role === "player"
                ? "Visible only to this player, authorised coaches and administrators."
                : "Authorised squad report with team comparison access."}
          </p>

          <div className="analytics-grid">
            {filteredAnalytics.map(
              ([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              )
            )}
          </div>
        </section>

        <section className="tracking-preview">
          <span>FUTURE TRACKING VISUALS</span>
          <h3>
            {selectedPlayerData?.name ||
              "Player"}{" "}
            heat map and movement path
          </h3>

          <div className="tracking-pitch">
            <i className="heat-one" />
            <i className="heat-two" />
            <i className="heat-three" />
            <svg
              viewBox="0 0 100 60"
              preserveAspectRatio="none"
            >
              <path
                d="M15 48 C25 30, 42 50, 48 27 S68 14, 82 22"
                fill="none"
                stroke="rgba(255,255,255,.72)"
                strokeWidth="1.5"
                strokeDasharray="3 2"
              />
            </svg>
          </div>

          <p>
            Future computer vision can identify distance,
            sprint count, positional zones, repeated runs and
            individual movement patterns. Parents and players
            see only the linked or owned profile.
          </p>
        </section>
      </div>

      {uploadOpen && canUpload && (
        <div
          className="match-modal-backdrop"
          onClick={() => setUploadOpen(false)}
        >
          <section
            className="upload-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <header>
              <div>
                <span>UPLOAD MATCH</span>
                <h2>
                  Add the president demonstration footage
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setUploadOpen(false)}
              >
                ×
              </button>
            </header>

            <label className="upload-dropzone">
              <input
                type="file"
                accept="video/*"
                onChange={chooseFile}
                hidden
              />
              <span>⬆</span>
              <strong>
                {file?.name ||
                  "Choose Springvale_U11_vs_Oakleigh_AI_Demo.mp4"}
              </strong>
              <p>
                The front-end demonstration reads the local
                video without sending it to a server.
              </p>
            </label>

            {demoRecognised && (
              <div className="upload-demo-confirmed">
                <strong>
                  ✓ MatchVision demonstration preset detected
                </strong>
                <span>
                  The match, players, key moments and coaching
                  findings will be reproduced consistently.
                </span>
              </div>
            )}

            <div className="upload-grid">
              <label>
                <span>Opponent</span>
                <input defaultValue="Oakleigh United" />
              </label>
              <label>
                <span>Match date</span>
                <input
                  type="date"
                  defaultValue="2026-07-27"
                />
              </label>
              <label>
                <span>Venue</span>
                <input defaultValue="Ross Reserve" />
              </label>
              <label>
                <span>Pitch</span>
                <input defaultValue="Pitch 1" />
              </label>
            </div>

            <label className="upload-field">
              <span>Raw-footage access</span>
              <select defaultValue="Linked players and team coaching staff">
                <option>
                  Coaches and administrators only
                </option>
                <option>
                  Linked players and team coaching staff
                </option>
                <option>
                  Administrator approval required
                </option>
              </select>
            </label>

            <div className="player-detection">
              <span>AI PLAYER MATCHING</span>
              <h3>
                Suggested players found from jersey numbers
              </h3>
              <p>
                Coach confirmation prevents private information
                from being linked to the wrong family or player.
              </p>

              {[
                ["ava", "Ava Thompson · #9", "96%"],
                ["mia", "Mia Rodriguez · #10", "92%"],
                [
                  "lily-chen",
                  "Lily Chen · #4",
                  "90%",
                ],
              ].map(([id, label, confidence]) => (
                <label key={id}>
                  <input
                    type="checkbox"
                    checked={confirmedPlayers.includes(
                      id
                    )}
                    onChange={(event) =>
                      setConfirmedPlayers(
                        event.target.checked
                          ? [
                              ...confirmedPlayers,
                              id,
                            ]
                          : confirmedPlayers.filter(
                              (playerId) =>
                                playerId !== id
                            )
                      )
                    }
                  />
                  Confirm {label} · {confidence} confidence
                </label>
              ))}
            </div>

            <footer className="upload-footer">
              <button
                type="button"
                onClick={() => setUploadOpen(false)}
              >
                Cancel
              </button>
              <button
                className="match-primary"
                type="button"
                onClick={runAnalysis}
              >
                Upload and AI Analyse
              </button>
            </footer>
          </section>
        </div>
      )}

      {analysisOpen && (
        <div
          className="match-modal-backdrop"
          onClick={() =>
            analysisStage === "complete" &&
            setAnalysisOpen(false)
          }
        >
          <section
            className="analysis-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <header>
              <div>
                <span>
                  MATCHVISION AI ANALYSIS
                </span>
                <h2>
                  {analysisStage === "complete"
                    ? "Analysis complete"
                    : "Analysing uploaded match"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() =>
                  setAnalysisOpen(false)
                }
              >
                ×
              </button>
            </header>

            <div className="analysis-live-layout">
              <div className="analysis-live-video">
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    muted
                  />
                ) : (
                  <div>No video selected</div>
                )}
              </div>

              <aside>
                <span>LIVE ANALYSIS FEED</span>
                <h3>{progress}% processed</h3>

                <div className="analysis-progress">
                  <i
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <p>{stageLabel}</p>

                <div className="analysis-feed-item">
                  <b>12:08</b>
                  <span>
                    Pass completed · Ava Thompson
                  </span>
                </div>
                <div className="analysis-feed-item">
                  <b>18:42</b>
                  <span>
                    Chance created · right channel
                  </span>
                </div>
                <div className="analysis-feed-item">
                  <b>31:08</b>
                  <span>
                    Defensive recovery · 6.8 sec
                  </span>
                </div>
                <div className="analysis-feed-item">
                  <b>44:15</b>
                  <span>
                    Assist detected · Ava Thompson
                  </span>
                </div>

                {analysisStage === "complete" && (
                  <div className="analysis-complete-actions">
                    <strong>
                      Session plan and Drill Exchange
                      recommendations are ready.
                    </strong>
                    <button
                      className="match-primary"
                      type="button"
                      onClick={openCoachAnalysis}
                    >
                      Open AI Coach Report →
                    </button>
                  </div>
                )}
              </aside>
            </div>
          </section>
        </div>
      )}

      {toast && (
        <div className="match-toast">{toast}</div>
      )}
    </div>
  );
}
