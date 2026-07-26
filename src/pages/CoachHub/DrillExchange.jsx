import { useMemo, useState } from "react";
import StarRating from "../../components/StarRating";
import { coaches } from "../../data/coaches";
import { drills as starterDrills } from "../../data/drills";

const emptyForm = {
  title: "",
  category: "Defending",
  skill: "",
  age: "U10–U12",
  duration: "20 min",
  players: "8–14",
  equipment: "",
  visibility: "Private",
  description: "",
  videoUrl: "",
};

export default function DrillExchange() {
  const [drills, setDrills] = useState(starterDrills);
  const [search, setSearch] = useState("");
  const [coach, setCoach] = useState("All coaches");
  const [category, setCategory] = useState("All skills");
  const [visibility, setVisibility] = useState("All access");
  const [ratings, setRatings] = useState({});
  const [saved, setSaved] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const filteredDrills = useMemo(() => {
    return drills.filter((drill) => {
      const matchesSearch = `${drill.title} ${drill.skill} ${drill.description}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCoach = coach === "All coaches" || drill.coach === coach;
      const matchesCategory =
        category === "All skills" || drill.category === category;
      const matchesVisibility =
        visibility === "All access" || drill.visibility === visibility;

      return matchesSearch && matchesCoach && matchesCategory && matchesVisibility;
    });
  }, [drills, search, coach, category, visibility]);

  function toggleSave(id) {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    );
  }

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.title.trim()) nextErrors.title = "Enter a drill title.";
    if (!form.skill.trim()) nextErrors.skill = "Enter the main skill.";
    if (!form.description.trim()) {
      nextErrors.description = "Add a short drill description.";
    }
    if (!form.equipment.trim()) {
      nextErrors.equipment = "List the equipment required.";
    }

    if (form.videoUrl.trim()) {
      try {
        new URL(form.videoUrl);
      } catch {
        nextErrors.videoUrl = "Enter a complete link beginning with http:// or https://.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function openPreview(event) {
    event.preventDefault();
    if (validateForm()) setShowPreview(true);
  }

  function publishDrill() {
    const newDrill = {
      id: Date.now(),
      title: form.title.trim(),
      coach: "Lisa Pitsos",
      club: "Springvale City",
      category: form.category,
      skill: form.skill.trim(),
      age: form.age,
      duration: form.duration,
      players: form.players,
      equipment: form.equipment.trim(),
      visibility: form.visibility,
      rating: 0,
      reviews: 0,
      uses: 0,
      saves: 0,
      description: form.description.trim(),
      videoUrl: form.videoUrl.trim(),
      isNew: true,
    };

    setDrills((current) => [newDrill, ...current]);
    setForm(emptyForm);
    setErrors({});
    setShowPreview(false);
    setShowUpload(false);
    setSearch("");
    setCoach("All coaches");
    setCategory("All skills");
    setVisibility("All access");
  }

  function closeUpload() {
    setShowPreview(false);
    setShowUpload(false);
    setErrors({});
  }

  return (
    <>
      <section className="coach-hub-hero">
        <div>
          <span className="page-eyebrow">COACH HUB · DRILL EXCHANGE</span>
          <h2>Find the right drill for tomorrow’s session.</h2>
          <p>
            Search by coach, skill or training objective. Save useful ideas,
            rate drills after using them and recognise coaches whose knowledge
            helps others.
          </p>
        </div>

        <div className="hub-stat">
          <strong>{drills.length.toLocaleString()}</strong>
          <span>drills available in this demonstration</span>
        </div>
      </section>

      <section className="drill-toolbar">
        <input
          className="search-input"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search drills, skills or objectives..."
        />

        <select value={coach} onChange={(event) => setCoach(event.target.value)}>
          <option>All coaches</option>
          {coaches.map((item) => <option key={item.name}>{item.name}</option>)}
        </select>

        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option>All skills</option>
          <option>Defending</option>
          <option>Passing</option>
          <option>Pressing</option>
          <option>Finishing</option>
          <option>Goalkeeping</option>
          <option>Fitness</option>
        </select>

        <select value={visibility} onChange={(event) => setVisibility(event.target.value)}>
          <option>All access</option>
          <option>Private</option>
          <option>League</option>
          <option>Global</option>
        </select>

        <button className="primary-button" onClick={() => setShowUpload(true)}>
          + Upload drill
        </button>
      </section>

      <section className="section-heading">
        <div>
          <span className="page-eyebrow">RECOMMENDED FOR YOUR TEAM</span>
          <h3>Training ideas</h3>
        </div>
        <span className="result-count">{filteredDrills.length} results</span>
      </section>

      <section className="drill-grid">
        {filteredDrills.map((drill) => (
          <article className="drill-card" key={drill.id}>
            <div className="drill-preview">
              <div className="drill-badge-row">
                <span className={`visibility-badge ${drill.visibility.toLowerCase()}`}>
                  {drill.visibility}
                </span>
                {drill.isNew && <span className="new-drill-badge">Just published</span>}
              </div>

              <div className="pitch-diagram">
                <span className="player-dot dot-one" />
                <span className="player-dot dot-two" />
                <span className="player-dot opposition dot-three" />
                <span className="player-dot opposition dot-four" />
              </div>
            </div>

            <div className="drill-body">
              <div className="drill-kicker">
                <span>{drill.category}</span>
                <span>{drill.age} · {drill.duration}</span>
              </div>

              <h3>{drill.title}</h3>
              <button className="coach-name-button">{drill.coach}</button>
              <p>{drill.description}</p>

              <div className="drill-meta">
                <span><strong>Skill</strong>{drill.skill}</span>
                <span><strong>Players</strong>{drill.players}</span>
                <span><strong>Equipment</strong>{drill.equipment}</span>
              </div>

              {drill.videoUrl && (
                <a
                  className="tutorial-link"
                  href={drill.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open video tutorial ↗
                </a>
              )}

              <div className="rating-row">
                <div>
                  <StarRating
                    value={ratings[drill.id] || Math.round(drill.rating)}
                    onChange={(value) =>
                      setRatings((current) => ({ ...current, [drill.id]: value }))
                    }
                  />
                  <small>
                    {drill.reviews === 0
                      ? "Not yet rated"
                      : `${drill.rating} from ${drill.reviews} ratings`}
                  </small>
                </div>

                <div className="usage-numbers">
                  <span>{drill.uses} uses</span>
                  <span>{drill.saves} saves</span>
                </div>
              </div>

              <div className="drill-actions">
                <button className="secondary-button" onClick={() => toggleSave(drill.id)}>
                  {saved.includes(drill.id) ? "Saved ✓" : "Save drill"}
                </button>
                <button className="primary-button">Add to session</button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {showUpload && (
        <div className="modal-backdrop" role="presentation" onMouseDown={closeUpload}>
          <section
            className="upload-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-drill-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <span className="page-eyebrow">COACH HUB</span>
                <h2 id="upload-drill-title">Upload a drill</h2>
                <p>Share a structured training idea with the approved audience.</p>
              </div>
              <button className="modal-close" onClick={closeUpload} aria-label="Close">
                ×
              </button>
            </div>

            {!showPreview ? (
              <form className="upload-form" onSubmit={openPreview}>
                <div className="form-grid">
                  <FormField label="Drill title" error={errors.title} full>
                    <input
                      value={form.title}
                      onChange={(event) => updateForm("title", event.target.value)}
                      placeholder="Example: Recovery defending 2v1"
                    />
                  </FormField>

                  <FormField label="Category">
                    <select
                      value={form.category}
                      onChange={(event) => updateForm("category", event.target.value)}
                    >
                      <option>Defending</option>
                      <option>Passing</option>
                      <option>Pressing</option>
                      <option>Finishing</option>
                      <option>Goalkeeping</option>
                      <option>Fitness</option>
                    </select>
                  </FormField>

                  <FormField label="Main skill" error={errors.skill}>
                    <input
                      value={form.skill}
                      onChange={(event) => updateForm("skill", event.target.value)}
                      placeholder="Example: Recovery runs"
                    />
                  </FormField>

                  <FormField label="Age group">
                    <select
                      value={form.age}
                      onChange={(event) => updateForm("age", event.target.value)}
                    >
                      <option>U6–U8</option>
                      <option>U8–U10</option>
                      <option>U10–U12</option>
                      <option>U12–U14</option>
                      <option>U14–U16</option>
                      <option>Senior</option>
                    </select>
                  </FormField>

                  <FormField label="Duration">
                    <select
                      value={form.duration}
                      onChange={(event) => updateForm("duration", event.target.value)}
                    >
                      <option>10 min</option>
                      <option>15 min</option>
                      <option>20 min</option>
                      <option>25 min</option>
                      <option>30 min</option>
                      <option>45 min</option>
                    </select>
                  </FormField>

                  <FormField label="Number of players">
                    <select
                      value={form.players}
                      onChange={(event) => updateForm("players", event.target.value)}
                    >
                      <option>4–8</option>
                      <option>6–10</option>
                      <option>8–14</option>
                      <option>10–16</option>
                      <option>12–20</option>
                      <option>Whole squad</option>
                    </select>
                  </FormField>

                  <FormField label="Sharing visibility">
                    <select
                      value={form.visibility}
                      onChange={(event) => updateForm("visibility", event.target.value)}
                    >
                      <option>Private</option>
                      <option>League</option>
                      <option>Global</option>
                    </select>
                  </FormField>

                  <FormField label="Equipment" error={errors.equipment} full>
                    <input
                      value={form.equipment}
                      onChange={(event) => updateForm("equipment", event.target.value)}
                      placeholder="Example: Cones, bibs and two mini goals"
                    />
                  </FormField>

                  <FormField label="Description and coaching objective" error={errors.description} full>
                    <textarea
                      value={form.description}
                      onChange={(event) => updateForm("description", event.target.value)}
                      placeholder="Explain how the drill works and what coaches should focus on..."
                      rows="5"
                    />
                  </FormField>

                  <FormField label="Video or tutorial link (optional)" error={errors.videoUrl} full>
                    <input
                      type="url"
                      value={form.videoUrl}
                      onChange={(event) => updateForm("videoUrl", event.target.value)}
                      placeholder="https://..."
                    />
                  </FormField>
                </div>

                <div className="visibility-note">
                  <strong>{form.visibility}</strong>
                  <span>
                    {form.visibility === "Private" &&
                      "Only coaches within Springvale City can see this drill."}
                    {form.visibility === "League" &&
                      "Approved coaches in your league can discover and use this drill."}
                    {form.visibility === "Global" &&
                      "All MatchVision coaches can discover and use this drill."}
                  </span>
                </div>

                <div className="modal-actions">
                  <button type="button" className="secondary-button" onClick={closeUpload}>
                    Cancel
                  </button>
                  <button type="submit" className="primary-button">
                    Preview drill →
                  </button>
                </div>
              </form>
            ) : (
              <div className="publish-preview">
                <span className="page-eyebrow">PREVIEW BEFORE PUBLISHING</span>
                <div className="preview-card">
                  <div className="drill-kicker">
                    <span>{form.category}</span>
                    <span>{form.age} · {form.duration}</span>
                  </div>
                  <h3>{form.title}</h3>
                  <button className="coach-name-button">Lisa Pitsos</button>
                  <p>{form.description}</p>
                  <div className="drill-meta">
                    <span><strong>Skill</strong>{form.skill}</span>
                    <span><strong>Players</strong>{form.players}</span>
                    <span><strong>Equipment</strong>{form.equipment}</span>
                  </div>
                  <span className={`visibility-badge ${form.visibility.toLowerCase()}`}>
                    {form.visibility}
                  </span>
                </div>

                <div className="modal-actions">
                  <button className="secondary-button" onClick={() => setShowPreview(false)}>
                    ← Edit details
                  </button>
                  <button className="primary-button" onClick={publishDrill}>
                    Publish drill
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}

function FormField({ label, error, full = false, children }) {
  return (
    <label className={`form-field ${full ? "full" : ""}`}>
      <span>{label}</span>
      {children}
      {error && <small className="form-error">{error}</small>}
    </label>
  );
}
