import { useEffect, useRef, useState } from "react";
import springvaleLogo from "../assets/springvale-city-logo.png";
import "./JoinSpringvale.css";

const ageGroups = [
  { id: "U8", ages: "Ages 7–8", copy: "A joyful first step into team football, built around confidence, movement and fun." },
  { id: "U10", ages: "Ages 9–10", copy: "Build strong foundations through small-sided games, new friendships and supportive coaching." },
  { id: "U12", ages: "Ages 11–12", copy: "Develop game awareness, technique and teamwork in a positive competitive environment." },
  { id: "U14", ages: "Ages 13–14", copy: "Grow as a player with purposeful training, match experience and individual feedback." },
  { id: "U16", ages: "Ages 15–16", copy: "Prepare for senior football through advanced development, leadership and modern analysis." },
];

const reasons = [
  ["◎", "Develop Skills", "Learn the technical foundations and game intelligence to become a confident footballer."],
  ["↗", "Grow & Improve", "Progress at your own pace with encouragement, clear goals and meaningful feedback."],
  ["♥", "Build Friendships", "Join a welcoming football community and make friendships that extend beyond game day."],
  ["⚽", "Play Your Way", "Every player has a place to contribute, express themselves and enjoy the game."],
  ["✦", "Modern Club", "Experience community football supported by thoughtful coaching and MatchVision technology."],
];

const daySteps = ["Arrive", "Warm Up", "Training / Match", "Coach Feedback", "Player Stats", "Team Photo", "Go Home Smiling"];

const benefits = [
  ["▥", "Match Statistics", "Understand the moments that shaped each game."],
  ["↗", "Player Development", "Follow progress across the season with a clear development story."],
  ["◉", "Coach Feedback", "Receive helpful observations from the people guiding your player."],
  ["▶", "Match Highlights", "Relive memorable plays, goals and team moments."],
  ["✓", "Attendance", "Keep training and match availability organised in one place."],
  ["✦", "AI Analysis", "Deeper football insight is being prepared for a future release.", "Coming soon"],
  ["⌁", "Development Tracking", "See how consistency, confidence and contribution grow over time."],
];

const facilities = [
  ["Training Grounds", "Purpose-built spaces for energetic, focused sessions."],
  ["Club Rooms", "A welcoming home for players, coaches and families."],
  ["Ross Reserve", "The heart of Springvale City match day."],
  ["Family Area", "A comfortable place to connect and support the team."],
];

const schedule = [
  ["MON", "Monday", "Training", "Skills, movement and team development"],
  ["WED", "Wednesday", "Training", "Tactical preparation and small-sided games"],
  ["SAT", "Saturday", "Game Day", "Compete, learn and enjoy football together"],
];

const faqs = [
  ["Do I need experience?", "No. We welcome new and experienced players, and place each player in an environment suited to their age and development."],
  ["Can girls play?", "Absolutely. Springvale City welcomes girls who want to learn, compete and enjoy football in a supportive club community."],
  ["What equipment do I need?", "Comfortable training clothes, football boots, shin guards and a drink bottle are the best place to start."],
  ["How do I register?", "Submit the expression of interest below. Our club team will contact you with the right next step for your player."],
  ["Who do I contact?", "Use the enquiry form and a Springvale City representative will follow up with you directly."],
  ["How much does it cost?", "Fees vary by age group and season. The club will provide the current fee information before registration."],
];

const stats = [
  [1956, "Founded", ""], [200, "Players", "+"], [20, "Teams", "+"],
  [1, "Weekly Matches", "Every week"], [1, "Family Friendly", "Always"], [1, "Player Statistics", "Modern"],
];

function SectionHeading({ eyebrow, title, copy }) {
  return <header className="join-section-heading"><span>{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</header>;
}

function Counter({ value, suffix }) {
  const [shown, setShown] = useState(0);
  const node = useRef(null);
  useEffect(() => {
    const target = node.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const started = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - started) / 900, 1);
        setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.45 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [value]);
  return <strong ref={node}>{shown}{suffix}</strong>;
}

export default function JoinSpringvale({ onNavigate }) {
  const [selectedAge, setSelectedAge] = useState(ageGroups[2]);
  const [facilityIndex, setFacilityIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [videoNotice, setVideoNotice] = useState(false);
  const [coachExpanded, setCoachExpanded] = useState(false);
  const formRef = useRef(null);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const moveFacility = (direction) => setFacilityIndex((current) => (current + direction + facilities.length) % facilities.length);

  function submitInterest(event) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return <div className="join-page">
    <section className="join-hero">
      <div className="join-hero-glow" />
      <div className="join-hero-copy join-reveal">
        <span className="join-eyebrow">SPRINGVALE CITY SOCCER CLUB</span>
        <h1>YOUR GAME<br />STARTS HERE</h1>
        <p>Not just a team.<br /><strong>A place to belong.</strong></p>
        <div className="join-actions">
          <button type="button" className="join-primary" onClick={scrollToForm}>Join Now <span>→</span></button>
          <button type="button" className="join-secondary" onClick={() => setVideoNotice(true)}>▶ Watch Club Video</button>
        </div>
        {videoNotice && <div className="join-video-notice" role="status">Club video coming soon.<button type="button" onClick={() => setVideoNotice(false)}>×</button></div>}
      </div>
      <div className="join-hero-mark join-reveal"><div className="join-logo-orbit"><img src={springvaleLogo} alt="Springvale City Soccer Club" /></div><span>EST. 1956 · ROSS RESERVE</span></div>
      <div className="join-scroll-cue">EXPLORE <i /></div>
    </section>

    <main className="join-content">
      <section className="join-section join-age-section">
        <SectionHeading eyebrow="FIND YOUR TEAM" title="Choose Your Age" copy="Select an age group to discover where your Springvale journey can begin." />
        <div className="join-age-grid">{ageGroups.map((group) => <button type="button" key={group.id} className={`join-age-card${selectedAge.id === group.id ? " selected" : ""}`} onClick={() => setSelectedAge(group)}><small>{group.ages}</small><strong>{group.id}</strong><span>{selectedAge.id === group.id ? "Selected" : "Explore"}</span></button>)}</div>
        <article className="join-age-detail" key={selectedAge.id}><div><span>{selectedAge.id}</span></div><div><small>YOUR SELECTED PATHWAY</small><h3>{selectedAge.ages}</h3><p>{selectedAge.copy}</p></div><em>Training schedules will be available here soon.</em></article>
      </section>

      <section className="join-section">
        <SectionHeading eyebrow="MORE THAN FOOTBALL" title="Why Join Springvale?" copy="A place where young players can develop their game and grow as people." />
        <div className="join-reason-grid">{reasons.map(([icon, title, copy], index) => <article className="join-reason-card" key={title} style={{ "--delay": `${index * 70}ms` }}><i>{icon}</i><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="join-section join-day-section">
        <SectionHeading eyebrow="FROM HELLO TO HOME" title="A Day At Springvale" copy="Every visit is designed to help players feel prepared, supported and proud." />
        <div className="join-timeline">{daySteps.map((step, index) => <div className="join-timeline-step" key={step}><b>{String(index + 1).padStart(2, "0")}</b><i /><strong>{step}</strong>{index < daySteps.length - 1 && <span />}</div>)}</div>
      </section>

      <section className="join-section join-benefits-section">
        <SectionHeading eyebrow="FOR PLAYERS AND PARENTS" title="The MatchVision Advantage" copy="A modern club experience that helps families stay connected to every player’s journey." />
        <div className="join-benefit-grid">{benefits.map(([icon, title, copy, badge], index) => <article className={`join-benefit-card${index === 0 ? " featured" : ""}`} key={title}><div><i>{icon}</i>{badge && <span>{badge}</span>}</div><h3>{title}</h3><p>{copy}</p><small>Included for Springvale families</small></article>)}</div>
      </section>

      <section className="join-section">
        <SectionHeading eyebrow="PEOPLE WHO CARE" title="Meet Our Coaches" copy="Supportive leaders who see the player as well as the performance." />
        <article className="join-coach-card"><div className="join-coach-photo"><span>LP</span><small>COACH PHOTO</small></div><div className="join-coach-copy"><span>HEAD COACH</span><h3>Lisa Pitsos</h3><div className="join-stars" aria-label="5 star rating">★★★★★ <small>5.0</small></div><p>Lisa creates a positive, challenging environment where young footballers build confidence, understand the game and learn what it means to be part of a team.</p>{coachExpanded && <div className="join-coach-details"><b>Coaching focus</b><span>Player confidence · Technical development · Team culture</span></div>}<button type="button" className="join-secondary" aria-expanded={coachExpanded} onClick={() => setCoachExpanded((current) => !current)}>{coachExpanded ? "Close Coach Profile" : "View Coach Profile →"}</button></div><div className="join-coach-quote">“Every player deserves to feel seen, supported and excited to come back.”</div></article>
      </section>

      <section className="join-section">
        <SectionHeading eyebrow="OUR HOME" title="Club Facilities" copy="Explore the spaces where Springvale trains, competes and comes together." />
        <div className="join-carousel"><button type="button" aria-label="Previous facility" onClick={() => moveFacility(-1)}>←</button><article key={facilityIndex}><div className={`join-facility-image facility-${facilityIndex + 1}`}><span>IMAGE PLACEHOLDER</span><b>{String(facilityIndex + 1).padStart(2, "0")}</b></div><div><small>SPRINGVALE CITY</small><h3>{facilities[facilityIndex][0]}</h3><p>{facilities[facilityIndex][1]}</p></div></article><button type="button" aria-label="Next facility" onClick={() => moveFacility(1)}>→</button></div>
        <div className="join-carousel-dots">{facilities.map(([title], index) => <button type="button" key={title} className={index === facilityIndex ? "active" : ""} aria-label={`Show ${title}`} onClick={() => setFacilityIndex(index)} />)}</div>
      </section>

      <section className="join-section join-week-section">
        <SectionHeading eyebrow="YOUR WEEK IN FOOTBALL" title="Weekly Football" copy="A simple rhythm that gives players time to learn, prepare and play." />
        <div className="join-schedule">{schedule.map(([short, day, activity, copy], index) => <article key={day}><div><small>{short}</small><strong>{String(index + 1).padStart(2, "0")}</strong></div><span>{day}</span><h3>{activity}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="join-section join-faq-section">
        <SectionHeading eyebrow="GOOD TO KNOW" title="Frequently Asked Questions" />
        <div className="join-faq-list">{faqs.map(([question, answer], index) => <article className={openFaq === index ? "open" : ""} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><i>{openFaq === index ? "−" : "+"}</i></button><div><p>{answer}</p></div></article>)}</div>
      </section>

      <section className="join-section join-form-section" ref={formRef}>
        <div className="join-form-intro"><span className="join-eyebrow">TAKE THE FIRST STEP</span><h2>Expression of Interest</h2><p>Tell us a little about your player. The Springvale City team will help you find the right age group and next step.</p><div><img src={springvaleLogo} alt="" /><strong>Springvale City<br />Soccer Club</strong></div></div>
        {submitted ? <div className="join-success" role="status"><i>✓</i><h3>Thanks for your interest!</h3><p>Your enquiry has been recorded for this demonstration. A future version can send this directly to the club.</p><button type="button" className="join-secondary" onClick={() => setSubmitted(false)}>Send another enquiry</button></div> : <form className="join-form" onSubmit={submitInterest}><label><span>Player Name</span><input name="playerName" required /></label><label><span>Parent Name</span><input name="parentName" required /></label><label><span>Email</span><input type="email" name="email" required /></label><label><span>Phone</span><input type="tel" name="phone" required /></label><label><span>Age</span><input type="number" name="age" min="7" max="16" required /></label><label><span>Preferred Team</span><select name="team" defaultValue={selectedAge.id}>{ageGroups.map((group) => <option key={group.id}>{group.id}</option>)}</select></label><label className="wide"><span>Football Experience</span><select name="experience" defaultValue=""><option value="" disabled>Select experience</option><option>New to football</option><option>Social football</option><option>Club football</option><option>Representative football</option></select></label><label className="wide"><span>Comments</span><textarea name="comments" rows="4" placeholder="Tell us anything that will help us support your player." /></label><button className="join-primary wide" type="submit">Submit Expression of Interest <span>→</span></button></form>}
      </section>

      <section className="join-section join-stats-section"><SectionHeading eyebrow="A CLUB WITH HISTORY" title="Springvale By The Numbers" /><div className="join-stats">{stats.map(([value, label, suffix]) => <article key={label}><Counter value={value} suffix={suffix === "+" ? "+" : ""} /><span>{suffix && suffix !== "+" ? suffix : label}</span>{suffix && suffix !== "+" && <small>{label}</small>}</article>)}</div></section>
    </main>

    <section className="join-final-cta"><img src={springvaleLogo} alt="" /><span>THE NEXT CHAPTER STARTS WITH YOU</span><h2>Ready To Join<br />The Wallabies?</h2><div className="join-actions"><button type="button" className="join-primary" onClick={scrollToForm}>Register Interest</button><button type="button" className="join-secondary" onClick={scrollToForm}>Contact Club</button><button type="button" className="join-text-button" onClick={() => onNavigate("dashboard")}>Back To Dashboard →</button></div></section>
  </div>;
}
