import { useEffect, useMemo, useState } from "react";
import "./CoachHub.css";

const drills = [
  {
    id: 1,
    title: "Recovery Defending: 2v1",
    coach: "Lisa Pitsos",
    club: "Springvale City",
    category: "Defending",
    skill: "Recovery Runs",
    age: "U10–U12",
    duration: "20 min",
    players: "8–14",
    equipment: "Cones, bibs, mini goals",
    visibility: "Private",
    rating: 4.8,
    reviews: 34,
    uses: 128,
    saves: 54,
    description:
      "Teaches defenders to delay the attack, recover goal-side and communicate under pressure.",
  },
  {
    id: 2,
    title: "Compact Shape: 4v4 + Targets",
    coach: "Michael Tran",
    club: "Oakleigh United",
    category: "Defending",
    skill: "Team Shape",
    age: "U10–U13",
    duration: "25 min",
    players: "10–16",
    equipment: "Cones, bibs, target gates",
    visibility: "League",
    rating: 4.9,
    reviews: 61,
    uses: 246,
    saves: 103,
    description:
      "A game-based drill rewarding compact defensive shape, pressing triggers and communication.",
  },
  {
    id: 3,
    title: "First Touch Escape",
    coach: "Sarah Nguyen",
    club: "Bayside FC",
    category: "Passing",
    skill: "First Touch",
    age: "U8–U11",
    duration: "15 min",
    players: "6–18",
    equipment: "Balls and cones",
    visibility: "Global",
    rating: 4.7,
    reviews: 88,
    uses: 519,
    saves: 221,
    description:
      "Players receive under pressure and use their first touch to escape into space.",
  },
  {
    id: 4,
    title: "Three-Zone Press",
    coach: "Daniel Brooks",
    club: "Kingston City",
    category: "Pressing",
    skill: "Pressing Triggers",
    age: "U11–U14",
    duration: "30 min",
    players: "12–18",
    equipment: "Cones, bibs, 2 goals",
    visibility: "Global",
    rating: 4.9,
    reviews: 104,
    uses: 731,
    saves: 310,
    description:
      "Builds recognition of pressing cues and coordinated movement between defenders.",
  },
  {
    id: 5,
    title: "Third-Player Combination",
    coach: "Lisa Pitsos",
    club: "Springvale City",
    category: "Passing",
    skill: "Combination Play",
    age: "U10–U13",
    duration: "22 min",
    players: "9–15",
    equipment: "Balls, cones, bibs",
    visibility: "Private",
    rating: 4.8,
    reviews: 42,
    uses: 184,
    saves: 77,
    description:
      "Develops support angles, one-touch layoffs and forward movement after passing.",
  },
  {
    id: 6,
    title: "Six-Second Transition Game",
    coach: "Daniel Brooks",
    club: "Kingston City",
    category: "Pressing",
    skill: "Counter Press",
    age: "U11–U15",
    duration: "25 min",
    players: "12–20",
    equipment: "Bibs, balls, four mini goals",
    visibility: "League",
    rating: 4.9,
    reviews: 79,
    uses: 602,
    saves: 248,
    description:
      "Teams have six seconds to recover the ball after losing possession.",
  },
];

const coaches = [
  {
    name: "Lisa Pitsos",
    initials: "LP",
    club: "Springvale City",
    speciality: "Junior defending",
    drills: 18,
    rating: 4.8,
    uses: 1120,
    recognition: "Most saved defensive drill",
    verified: true,
    badges: ["Junior Development", "Defensive Organisation", "League Contributor"],
  },
  {
    name: "Michael Tran",
    initials: "MT",
    club: "Oakleigh United",
    speciality: "Team shape",
    drills: 26,
    rating: 4.9,
    uses: 1740,
    recognition: "Top-rated league coach",
    verified: true,
    badges: ["Team Shape", "Game-Based Learning"],
  },
  {
    name: "Sarah Nguyen",
    initials: "SN",
    club: "Bayside FC",
    speciality: "Technical development",
    drills: 31,
    rating: 4.7,
    uses: 2630,
    recognition: "1,000+ coach saves",
    verified: true,
    badges: ["Technical Practice", "MiniRoos"],
  },
  {
    name: "Daniel Brooks",
    initials: "DB",
    club: "Kingston City",
    speciality: "Pressing and transitions",
    drills: 22,
    rating: 4.9,
    uses: 3180,
    recognition: "Trending global contributor",
    verified: true,
    badges: ["Pressing", "Transitions", "Global Contributor"],
  },
];

export default function CoachHub({ page = "drills" }) {
  if (page === "coach-profiles") {
    return <CoachProfiles />;
  }

  if (page === "session-builder") {
    return <SessionBuilder />;
  }

  return <DrillExchange />;
}

function DrillExchange() {
  const [search, setSearch] = useState("");
  const [coach, setCoach] = useState("All coaches");
  const [category, setCategory] = useState("All skills");
  const [visibility, setVisibility] = useState("All access");
  const [ratings, setRatings] = useState({});
  const [saved, setSaved] = useState([]);
  const [selectedDrill, setSelectedDrill] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [uploadTitle, setUploadTitle] = useState("Wide Recovery and Counter Press");
  const [uploadCategory, setUploadCategory] = useState("Defending");
  const [uploadVisibility, setUploadVisibility] = useState("Private");
  const [uploadDescription, setUploadDescription] = useState(
    "A recovery and transition practice designed for junior players."
  );
  const [uploadPlayers, setUploadPlayers] = useState("10–16");
  const [uploadDuration, setUploadDuration] = useState("25 minutes");
  const [uploadVideoName, setUploadVideoName] = useState("");

  const filteredDrills = useMemo(() => {
    return drills.filter((drill) => {
      const haystack =
        `${drill.title} ${drill.skill} ${drill.description} ${drill.coach} ${drill.club}`.toLowerCase();

      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesCoach = coach === "All coaches" || drill.coach === coach;
      const matchesCategory =
        category === "All skills" || drill.category === category;
      const matchesVisibility =
        visibility === "All access" || drill.visibility === visibility;

      return (
        matchesSearch &&
        matchesCoach &&
        matchesCategory &&
        matchesVisibility
      );
    });
  }, [search, coach, category, visibility]);

  function showToast(text) {
    setToast(text);
    window.setTimeout(() => setToast(""), 2500);
  }

  function toggleSave(id) {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    );
  }

  function saveUploadedDrill() {
    const uploadedDrill = {
      id: `uploaded-${Date.now()}`,
      title: uploadTitle,
      coach: "Lisa Pitsos",
      club: "Springvale City",
      category: uploadCategory,
      skill: uploadCategory === "Defending" ? "Recovery Runs" : uploadCategory,
      age: "U10–U13",
      duration: uploadDuration,
      players: uploadPlayers,
      equipment: "Coach supplied",
      visibility: uploadVisibility,
      rating: 5,
      reviews: 0,
      uses: 0,
      saves: 0,
      description: uploadDescription,
      videoName: uploadVideoName,
      uploadedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(
        window.localStorage.getItem("matchvisionUploadedDrills") || "[]"
      );
      window.localStorage.setItem(
        "matchvisionUploadedDrills",
        JSON.stringify([uploadedDrill, ...existing])
      );
    } catch {
      // The demo still works if browser storage is unavailable.
    }

    setUploadOpen(false);
    showToast("Drill and coaching video added to AI recommendations");
  }

  return (
    <div className="coach-hub-page">
      <section className="coach-hub-hero">
        <div>
          <span className="coach-eyebrow">COACH HUB · DRILL EXCHANGE</span>
          <h2>Find the right drill for tomorrow’s session.</h2>
          <p>
            Search by coach, skill or training objective. Save useful ideas,
            rate drills after using them and recognise coaches whose knowledge
            helps others.
          </p>
        </div>

        <div className="hub-stat">
          <strong>1,624</strong>
          <span>drills shared across your league</span>
        </div>
      </section>

      <section className="coach-hub-banner">
        <div>
          <span>AI RECOMMENDATION FOR U11 WALLABIES</span>
          <strong>Prioritise recovery defending and compact team shape this week.</strong>
        </div>
        <button
          type="button"
          onClick={() => showToast("AI recommendations refreshed")}
        >
          ✦ Refresh recommendations
        </button>
      </section>

      <section className="drill-toolbar">
        <label className="drill-search">
          <span>⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search drills, skills, coaches or objectives..."
          />
        </label>

        <select value={coach} onChange={(event) => setCoach(event.target.value)}>
          <option>All coaches</option>
          {coaches.map((item) => (
            <option key={item.name}>{item.name}</option>
          ))}
        </select>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option>All skills</option>
          <option>Defending</option>
          <option>Passing</option>
          <option>Pressing</option>
        </select>

        <select
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        >
          <option>All access</option>
          <option>Private</option>
          <option>League</option>
          <option>Global</option>
        </select>

        <button
          type="button"
          className="coach-primary-button"
          onClick={() => setUploadOpen(true)}
        >
          + Upload drill
        </button>
      </section>

      <section className="coach-section-heading">
        <div>
          <span className="coach-eyebrow">RECOMMENDED FOR YOUR TEAM</span>
          <h3>Training ideas from the Drill Exchange</h3>
        </div>
        <span className="result-count">{filteredDrills.length} results</span>
      </section>

      <section className="drill-grid">
        {filteredDrills.map((drill) => (
          <article className="drill-card" key={drill.id}>
            <button
              type="button"
              className="drill-preview"
              onClick={() => setSelectedDrill(drill)}
            >
              <span
                className={`visibility-badge ${drill.visibility.toLowerCase()}`}
              >
                {drill.visibility}
              </span>

              <div className="pitch-diagram">
                <span className="player-dot dot-one" />
                <span className="player-dot dot-two" />
                <span className="player-dot dot-five" />
                <span className="player-dot opposition dot-three" />
                <span className="player-dot opposition dot-four" />
                <i className="movement-arrow arrow-one" />
                <i className="movement-arrow arrow-two" />
              </div>
            </button>

            <div className="drill-body">
              <div className="drill-kicker">
                <span>{drill.category}</span>
                <span>
                  {drill.age} · {drill.duration}
                </span>
              </div>

              <h3>{drill.title}</h3>
              <button
                type="button"
                className="coach-name-button"
                onClick={() => showToast(`${drill.coach} profile opened`)}
              >
                {drill.coach} · {drill.club}
              </button>

              <p>{drill.description}</p>

              <div className="drill-meta">
                <span>
                  <strong>Skill</strong>
                  {drill.skill}
                </span>
                <span>
                  <strong>Players</strong>
                  {drill.players}
                </span>
                <span>
                  <strong>Equipment</strong>
                  {drill.equipment}
                </span>
              </div>

              <div className="rating-row">
                <div>
                  <StarRating
                    value={ratings[drill.id] || Math.round(drill.rating)}
                    onChange={(value) =>
                      setRatings((current) => ({
                        ...current,
                        [drill.id]: value,
                      }))
                    }
                  />
                  <small>
                    {drill.rating} from {drill.reviews} ratings
                  </small>
                </div>

                <div className="usage-numbers">
                  <span>{drill.uses} uses</span>
                  <span>{drill.saves} saves</span>
                </div>
              </div>

              <div className="drill-actions">
                <button
                  type="button"
                  className="coach-secondary-button"
                  onClick={() => toggleSave(drill.id)}
                >
                  {saved.includes(drill.id) ? "Saved ✓" : "Save drill"}
                </button>

                <button
                  type="button"
                  className="coach-primary-button"
                  onClick={() => showToast(`${drill.title} added to session`)}
                >
                  Add to session
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {selectedDrill && (
        <div
          className="coach-modal-backdrop"
          onClick={() => setSelectedDrill(null)}
        >
          <section
            className="drill-detail-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span className="coach-eyebrow">DRILL DETAIL</span>
                <h2>{selectedDrill.title}</h2>
                <p>
                  {selectedDrill.coach} · {selectedDrill.club}
                </p>
              </div>

              <button type="button" onClick={() => setSelectedDrill(null)}>
                ×
              </button>
            </header>

            <div className="drill-detail-layout">
              <div className="large-pitch">
                <span className="player-dot detail-one" />
                <span className="player-dot detail-two" />
                <span className="player-dot detail-five" />
                <span className="player-dot opposition detail-three" />
                <span className="player-dot opposition detail-four" />
                <i className="detail-route route-one" />
                <i className="detail-route route-two" />
              </div>

              <aside>
                <span className="coach-eyebrow">COACHING DETAIL</span>
                <h3>{selectedDrill.description}</h3>

                <div className="detail-list">
                  <div>
                    <strong>Set-up</strong>
                    <p>
                      Create a compact training area with two target goals and
                      enough space for realistic pressure.
                    </p>
                  </div>
                  <div>
                    <strong>Coaching points</strong>
                    <p>
                      Communication, body shape, speed of recovery and the
                      decision to press or delay.
                    </p>
                  </div>
                  <div>
                    <strong>Progression</strong>
                    <p>
                      Add a recovering midfielder, a time limit or a transition
                      goal after possession is regained.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="coach-primary-button full-width"
                  onClick={() =>
                    showToast(`${selectedDrill.title} added to session`)
                  }
                >
                  Add drill to session
                </button>
              </aside>
            </div>
          </section>
        </div>
      )}

      {uploadOpen && (
        <div
          className="coach-modal-backdrop"
          onClick={() => setUploadOpen(false)}
        >
          <section
            className="upload-drill-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span className="coach-eyebrow">CONTRIBUTE TO COACH HUB</span>
                <h2>Upload a drill</h2>
              </div>
              <button type="button" onClick={() => setUploadOpen(false)}>
                ×
              </button>
            </header>

            <div className="upload-drill-body">
              <label>
                <span>Drill name</span>
                <input
                  value={uploadTitle}
                  onChange={(event) => setUploadTitle(event.target.value)}
                />
              </label>

              <div className="upload-drill-grid">
                <label>
                  <span>Training category</span>
                  <select
                    value={uploadCategory}
                    onChange={(event) => setUploadCategory(event.target.value)}
                  >
                    <option>Defending</option>
                    <option>Passing</option>
                    <option>Pressing</option>
                    <option>First touch</option>
                  </select>
                </label>

                <label>
                  <span>Visibility</span>
                  <select
                    value={uploadVisibility}
                    onChange={(event) => setUploadVisibility(event.target.value)}
                  >
                    <option>Private</option>
                    <option>League</option>
                    <option>Global</option>
                  </select>
                </label>
              </div>

              <label>
                <span>Description</span>
                <textarea
                  value={uploadDescription}
                  onChange={(event) => setUploadDescription(event.target.value)}
                />
              </label>

              <label className="diagram-upload">
                <input
                  type="file"
                  accept="video/*,image/*,.pdf"
                  hidden
                  onChange={(event) =>
                    setUploadVideoName(event.target.files?.[0]?.name || "")
                  }
                />
                <span>＋</span>
                <strong>
                  {uploadVideoName || "Add a diagram or training video"}
                </strong>
                <small>Image, PDF or video</small>
              </label>

              <div className="upload-drill-grid">
                <label>
                  <span>Players</span>
                  <input
                    value={uploadPlayers}
                    onChange={(event) => setUploadPlayers(event.target.value)}
                  />
                </label>

                <label>
                  <span>Duration</span>
                  <input
                    value={uploadDuration}
                    onChange={(event) => setUploadDuration(event.target.value)}
                  />
                </label>
              </div>
            </div>

            <footer>
              <button
                type="button"
                className="coach-secondary-button"
                onClick={() => setUploadOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="coach-primary-button"
                onClick={saveUploadedDrill}
              >
                Upload drill and video
              </button>
            </footer>
          </section>
        </div>
      )}

      {toast && <div className="coach-toast">{toast}</div>}
    </div>
  );
}

function StarRating({ value, onChange }) {
  return (
    <div className="star-rating" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={star <= value ? "star active" : "star"}
          onClick={() => onChange(star)}
          aria-label={`Rate ${star} star${star === 1 ? "" : "s"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function CoachProfiles() {
  const [search, setSearch] = useState("");
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [following, setFollowing] = useState([]);

  const filteredCoaches = coaches.filter((coach) =>
    `${coach.name} ${coach.club} ${coach.speciality} ${coach.recognition}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function toggleFollow(name) {
    setFollowing((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  }

  return (
    <div className="coach-hub-page">
      <section className="coach-hub-hero">
        <div>
          <span className="coach-eyebrow">COACH HUB · COACH PROFILES</span>
          <h2>Recognise the knowledge coaches contribute.</h2>
          <p>
            Profiles turn shared drills, verified use and helpful ratings into
            an evidence-based coaching portfolio.
          </p>
        </div>

        <div className="hub-stat">
          <strong>4.8</strong>
          <span>average contributor rating</span>
        </div>
      </section>

      <section className="profile-toolbar">
        <label className="drill-search">
          <span>⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search coach, club, speciality or recognition..."
          />
        </label>

        <select defaultValue="All clubs">
          <option>All clubs</option>
          <option>Springvale City</option>
          <option>Oakleigh United</option>
          <option>Bayside FC</option>
          <option>Kingston City</option>
        </select>

        <select defaultValue="Highest rated">
          <option>Highest rated</option>
          <option>Most used</option>
          <option>Most drills</option>
          <option>Trending</option>
        </select>
      </section>

      <section className="coach-grid">
        {filteredCoaches.map((coach) => (
          <article className="coach-profile-card" key={coach.name}>
            <div className="coach-profile-heading">
              <div className="coach-avatar">{coach.initials}</div>

              <div>
                <h3>
                  {coach.name}
                  {coach.verified && <span className="verified-badge">✓</span>}
                </h3>
                <span>{coach.club}</span>
              </div>
            </div>

            <div className="recognition-badge">{coach.recognition}</div>
            <p className="coach-speciality">{coach.speciality}</p>

            <div className="coach-badges">
              {coach.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>

            <div className="coach-stats">
              <div>
                <strong>{coach.rating}</strong>
                <span>Rating</span>
              </div>
              <div>
                <strong>{coach.drills}</strong>
                <span>Drills</span>
              </div>
              <div>
                <strong>{coach.uses.toLocaleString()}</strong>
                <span>Uses</span>
              </div>
            </div>

            <div className="profile-actions">
              <button
                type="button"
                className="coach-secondary-button"
                onClick={() => toggleFollow(coach.name)}
              >
                {following.includes(coach.name) ? "Following ✓" : "Follow coach"}
              </button>

              <button
                type="button"
                className="coach-primary-button"
                onClick={() => setSelectedCoach(coach)}
              >
                View profile
              </button>
            </div>
          </article>
        ))}
      </section>

      {selectedCoach && (
        <div
          className="coach-modal-backdrop"
          onClick={() => setSelectedCoach(null)}
        >
          <section
            className="coach-profile-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <header>
              <div className="profile-modal-identity">
                <div className="coach-avatar large">
                  {selectedCoach.initials}
                </div>
                <div>
                  <span className="coach-eyebrow">VERIFIED COACH PROFILE</span>
                  <h2>{selectedCoach.name}</h2>
                  <p>
                    {selectedCoach.club} · {selectedCoach.speciality}
                  </p>
                </div>
              </div>

              <button type="button" onClick={() => setSelectedCoach(null)}>
                ×
              </button>
            </header>

            <div className="profile-modal-content">
              <section>
                <span className="coach-eyebrow">COACHING PORTFOLIO</span>
                <h3>Knowledge contribution</h3>
                <p>
                  This profile is built from shared drills, verified coach use,
                  ratings, saves and practical contribution to the coaching
                  community.
                </p>

                <div className="portfolio-metrics">
                  <div>
                    <strong>{selectedCoach.drills}</strong>
                    <span>Published drills</span>
                  </div>
                  <div>
                    <strong>{selectedCoach.uses.toLocaleString()}</strong>
                    <span>Verified uses</span>
                  </div>
                  <div>
                    <strong>{selectedCoach.rating}</strong>
                    <span>Coach rating</span>
                  </div>
                </div>
              </section>

              <section>
                <span className="coach-eyebrow">RECOGNITION</span>
                <h3>{selectedCoach.recognition}</h3>

                <div className="achievement-list">
                  {selectedCoach.badges.map((badge) => (
                    <div key={badge}>
                      <span>◎</span>
                      <strong>{badge}</strong>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function SessionBuilder() {
  const [objective, setObjective] = useState("Defending");
  const [playerCount, setPlayerCount] = useState("14");
  const [duration, setDuration] = useState("60 minutes");
  const [intensity, setIntensity] = useState("Moderate");
  const [generated, setGenerated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sourceMatch, setSourceMatch] = useState("");
  const [recommendedEquipment, setRecommendedEquipment] = useState([
    { id: "balls", name: "Size 4 footballs", required: 12 },
    { id: "cones", name: "Flat marker cones", required: 24 },
    { id: "red-bibs", name: "Red bibs", required: 7 },
    { id: "blue-bibs", name: "Blue bibs", required: 7 },
    { id: "mini-goals", name: "Mini goals", required: 4 },
    { id: "poles", name: "Agility poles", required: 6 },
    { id: "first-aid", name: "First-aid kit", required: 1 }
  ]);

  useEffect(() => {
    try {
      const recommendation = JSON.parse(
        window.localStorage.getItem("matchvisionRecommendedSession") || "null"
      );

      if (recommendation) {
        setObjective("Defending");
        setDuration("70 minutes");
        setGenerated(true);
        setSourceMatch(recommendation.sourceMatch || "");
        if (Array.isArray(recommendation.equipment)) setRecommendedEquipment(recommendation.equipment);
      }
    } catch {
      // Session Builder still works if storage is unavailable.
    }
  }, []);

  return (
    <div className="coach-hub-page">
      <section className="coach-hub-hero">
        <div>
          <span className="coach-eyebrow">COACH HUB · SESSION BUILDER</span>
          <h2>Build tomorrow’s session.</h2>
          <p>
            Combine your own drills, highly rated Drill Exchange ideas and
            MatchVision AI recommendations.
          </p>
        </div>

        <div className="hub-stat">
          <strong>60</strong>
          <span>minutes ready to plan</span>
        </div>
      </section>

      <section className="session-layout">
        <article className="session-form">
          <span className="coach-eyebrow">SESSION SETTINGS</span>
          <h2>Training objective</h2>
          <p>
            MatchVision can use your latest match analysis to recommend the most
            relevant session structure.
          </p>

          {sourceMatch && (
            <div className="ai-session-source">
              <span>LOADED FROM AI ANALYSIS</span>
              <strong>{sourceMatch}</strong>
            </div>
          )}

          <label>
            <span>Main objective</span>
            <select
              value={objective}
              onChange={(event) => setObjective(event.target.value)}
            >
              <option>Defending</option>
              <option>Passing</option>
              <option>Pressing</option>
              <option>First touch</option>
              <option>Finishing</option>
              <option>Transition play</option>
            </select>
          </label>

          <label>
            <span>Number of players</span>
            <input
              value={playerCount}
              onChange={(event) => setPlayerCount(event.target.value)}
            />
          </label>

          <label>
            <span>Session length</span>
            <select
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
            >
              <option>45 minutes</option>
              <option>60 minutes</option>
              <option>70 minutes</option>
              <option>75 minutes</option>
              <option>90 minutes</option>
            </select>
          </label>

          <label>
            <span>Intensity</span>
            <select
              value={intensity}
              onChange={(event) => setIntensity(event.target.value)}
            >
              <option>Low</option>
              <option>Moderate</option>
              <option>High</option>
              <option>Match preparation</option>
            </select>
          </label>

          <div className="ai-session-reason">
            <span>✦ AI REASONING</span>
            <p>
              The latest match identified left-side transition exposure and
              slower recovery after turnovers. Defending and compact-shape
              practices are recommended.
            </p>
          </div>

          <button
            type="button"
            className="coach-primary-button full-width"
            onClick={() => {
              setGenerated(true);
              setSaved(false);
            }}
          >
            Generate AI session
          </button>
        </article>

        <article className="session-preview">
          <span className="coach-eyebrow">SESSION PREVIEW</span>

          {!generated ? (
            <div className="session-empty">
              <div className="session-empty-icon">▤</div>
              <h3>Your session will appear here.</h3>
              <p>
                Choose the objective, squad size, intensity and available time.
              </p>
            </div>
          ) : (
            <>
              <div className="session-preview-heading">
                <div>
                  <h2>
                    {objective} · {duration}
                  </h2>
                  <p>
                    Prepared for {playerCount} players · {intensity} intensity
                  </p>
                </div>
                <span>AI generated</span>
              </div>

              <ol className="session-timeline">
                <li>
                  <strong>10 min</strong>
                  <div>
                    <h3>Arrival movement and reaction game</h3>
                    <p>
                      Dynamic movement, scanning and quick changes of direction.
                    </p>
                  </div>
                  <button type="button">Edit</button>
                </li>

                <li>
                  <strong>20 min</strong>
                  <div>
                    <h3>Recovery Defending: 2v1</h3>
                    <p>
                      Delay the attack, recover goal-side and communicate.
                    </p>
                  </div>
                  <button type="button">Replace</button>
                </li>

                <li>
                  <strong>20 min</strong>
                  <div>
                    <h3>Compact Shape: 4v4 + Targets</h3>
                    <p>
                      Maintain compactness and recognise pressing triggers.
                    </p>
                  </div>
                  <button type="button">Replace</button>
                </li>

                <li>
                  <strong>10 min</strong>
                  <div>
                    <h3>Conditioned match and player review</h3>
                    <p>
                      Reward recovery runs, communication and balanced shape.
                    </p>
                  </div>
                  <button type="button">Edit</button>
                </li>
              </ol>

              <div className="session-equipment">
                <span className="coach-eyebrow">AI-RECOMMENDED EQUIPMENT</span>
                <div>{recommendedEquipment.map((item) => <span key={item.id}>{item.required} × {item.name}</span>)}</div>
              </div>

              <button
                type="button"
                className="coach-primary-button full-width"
                onClick={() => {
                  try {
                    localStorage.setItem("matchvisionSavedSession", JSON.stringify({ title: `${objective} · ${duration}`, objective, duration, playerCount, intensity, sourceMatch, equipment: recommendedEquipment }));
                    localStorage.setItem("matchvisionEquipmentRecommendation", JSON.stringify(recommendedEquipment));
                  } catch {}
                  setSaved(true);
                }}
              >
                {saved ? "Session saved ✓" : "Save session and equipment"}
              </button>
            </>
          )}
        </article>
      </section>
    </div>
  );
}
