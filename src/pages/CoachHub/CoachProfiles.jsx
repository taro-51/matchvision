import { coaches } from "../../data/coaches";

export default function CoachProfiles() {
  return (
    <>
      <section className="coach-hub-hero">
        <div>
          <span className="page-eyebrow">COACH HUB · COACH PROFILES</span>
          <h2>Recognise the knowledge coaches contribute.</h2>
          <p>
            Profiles turn shared drills, verified use and helpful ratings into
            an evidence-based coaching portfolio.
          </p>
        </div>
      </section>

      <section className="coach-grid">
        {coaches.map((coach) => (
          <article className="coach-profile-card" key={coach.name}>
            <div className="coach-profile-heading">
              <div className="coach-avatar">{coach.initials}</div>
              <div>
                <h3>{coach.name}</h3>
                <span>{coach.club}</span>
              </div>
            </div>

            <div className="recognition-badge">{coach.recognition}</div>
            <p className="coach-speciality">{coach.speciality}</p>

            <div className="coach-stats">
              <div><strong>{coach.rating}</strong><span>Rating</span></div>
              <div><strong>{coach.drills}</strong><span>Drills</span></div>
              <div><strong>{coach.uses.toLocaleString()}</strong><span>Uses</span></div>
            </div>

            <button className="secondary-button full-width">
              View coaching profile
            </button>
          </article>
        ))}
      </section>
    </>
  );
}
