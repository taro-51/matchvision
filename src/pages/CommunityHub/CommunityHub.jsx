import { useEffect, useRef, useState } from "react";
import springvaleLogo from "../../assets/springvale-city-logo.png";
import "./CommunityHub.css";

const pulseMetrics = [
  ["Registered Players", 218, "+8.4%", "up", "♟"], ["Active Teams", 22, "+2", "up", "⚽"],
  ["Coaches", 31, "+3.3%", "up", "◎"], ["Volunteers", 46, "−6.1%", "down", "♥"],
  ["Sponsors", 14, "+2", "up", "◇"], ["Upcoming Events", 6, "+1", "up", "◫"],
  ["Attendance Trend", 92, "+4.2%", "up", "↗", "%"], ["Player Retention", 89, "+2.7%", "up", "⌁", "%"],
  ["Equipment Status", 84, "−3.0%", "down", "▣", "%"], ["Community Engagement", 76, "+12.5%", "up", "✦", "%"],
];

const activityCards = [
  ["Upcoming Events", "03 Aug", "Junior Open Day", "Three club events are scheduled this month.", "club-events", "◫"],
  ["Latest Club News", "Today", "U11 Wallabies ready for Saturday", "Team preparation and club updates from Ross Reserve.", "club-news", "▧"],
  ["Recent Awards", "4 added", "Best On Field", "Celebrate this week’s effort, excellence and team spirit.", "club-awards", "★"],
  ["New Gallery Photos", "18 photos", "Saturday at Ross Reserve", "Fresh match-day and community moments are ready to view.", "club-gallery", "▦"],
  ["New Players Joined", "+7 this month", "Welcome to the Wallabies", "New players have joined teams from U8 through U14.", "club-player-journey", "♟"],
  ["Volunteer Opportunities", "5 open roles", "Game-day help needed", "Canteen, team support and ground setup opportunities.", "club-volunteers", "♥"],
  ["Sponsor Spotlight", "Community Partner", "Ross & Co. Electrical", "Backing junior participation and equipment access.", "club-sponsors", "◇"],
  ["Upcoming Birthdays", "Next 7 days", "Three Wallabies celebrating", "Help the club wish Ava, Noah and Mia a happy birthday.", "club-home", "●"],
  ["Recent Match Results", "Weekend", "U11 Wallabies 3–2 Oakleigh", "A resilient team performance and a brilliant second half.", "matches", "⚽"],
  ["Community Announcements", "Important", "Working bee this Sunday", "Families are welcome from 9:00am at the club rooms.", "club-news", "◉"],
];

const articles = [
  ["Club News", "Wallabies community welcomes seven new players", "31 Jul 2026", "Springvale City", "Seven young footballers have started their Springvale journey across three junior teams."],
  ["Match Reports", "U11s show character in a five-goal contest", "28 Jul 2026", "Lisa Pitsos", "A composed second half and strong team effort delivered a memorable result at Ross Reserve."],
  ["Events", "Junior Open Day returns this August", "25 Jul 2026", "Club Committee", "Families can meet coaches, explore the facilities and take part in a welcoming football session."],
  ["Community", "Local partner backs new training equipment", "21 Jul 2026", "Partnerships Team", "Community support is helping more players access safe, modern training equipment."],
  ["Junior Development", "Why confidence comes before complexity", "18 Jul 2026", "Coaching Department", "Our junior framework helps players feel secure enough to experiment, learn and grow."],
];

const welcomeItems = [
  ["First Training", "Arrive 15 minutes early and meet your coach near the club rooms. Your player will be introduced to teammates before the session begins."],
  ["What To Bring", "Football boots, shin guards, comfortable training clothes, a labelled drink bottle and plenty of enthusiasm."],
  ["Uniform Information", "The club will confirm the required playing kit after team placement. Training apparel and optional club items are available separately."],
  ["Club Expectations", "Respect teammates, coaches, officials and facilities. Encourage effort, positive communication and enjoyment of the game."],
  ["Ground Map", "Ross Reserve includes two pitches, club rooms, parking, amenities, first aid, equipment storage and a canteen."],
  ["Contact Information", "Ross Reserve, 45 Memorial Drive, Noble Park VIC 3174 · (03) 9546 1311 · springvalecitysc.com.au"],
  ["Frequently Asked Questions", "New players are welcome, girls can play, and no previous football experience is required. Your team coordinator can help with specific questions."],
];

const mapLocations = [
  { name: "Pitch 1", x: 31, y: 30, icon: "1", copy: "Main match pitch. Team assembly is beside the western technical area." },
  { name: "Pitch 2", x: 67, y: 37, icon: "2", copy: "Training and junior match pitch, accessible from the central pathway." },
  { name: "Club Rooms", x: 48, y: 72, icon: "⌂", copy: "Team meetings, change rooms and the main club administration point." },
  { name: "Parking", x: 13, y: 76, icon: "P", copy: "Primary family parking. Please keep emergency access lanes clear." },
  { name: "Toilets", x: 57, y: 76, icon: "T", copy: "Accessible amenities beside the club rooms." },
  { name: "First Aid", x: 43, y: 62, icon: "+", copy: "First-aid station and match-day medical supplies." },
  { name: "Equipment Shed", x: 76, y: 70, icon: "▣", copy: "Secure storage for goals, balls, cones and training equipment." },
  { name: "Canteen", x: 50, y: 84, icon: "C", copy: "Match-day food, drinks and a welcoming place for families." },
];

const journeySteps = [
  ["Joined Club", "February 2026", "Ava becomes a Wallaby and receives her digital football passport.", "✓"],
  ["First Training", "12 February", "Met the team, completed a skills session and set her first development goal.", "⚽"],
  ["First Match", "7 March", "Started on the right wing and completed a confident competitive debut.", "▶"],
  ["First Goal", "21 March", "A composed finish after a positive pressing action.", "★"],
  ["Best on Field", "18 April", "Recognised for excellence, effort, positive attitude and team spirit.", "◆"],
  ["Coach Comments", "Season review", "Growing confidence, stronger scanning and excellent support for teammates.", "◉"],
  ["Certificates", "2 earned", "Best On Field and Training Effort certificates added to the passport.", "▧"],
  ["Highlights", "14 moments", "Goals, assists, recovery runs and team celebrations saved from match footage.", "▶"],
  ["Milestones", "8 completed", "Attendance, match and development milestones captured across the season.", "⌁"],
  ["AI Progress", "Coming soon", "Future analysis will identify patterns and support age-appropriate development.", "✦"],
  ["Photos", "26 memories", "Training, match-day and team photography preserved in one journey.", "▦"],
];

function HubHeading({ eyebrow, title, copy, children }) {
  return <header className="community-heading"><div><span>{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div>{children}</header>;
}

function AnimatedNumber({ value, suffix = "" }) {
  const [number, setNumber] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const update = (now) => { const progress = Math.min((now - start) / 850, 1); setNumber(Math.round(value * (1 - (1 - progress) ** 3))); if (progress < 1) requestAnimationFrame(update); };
      requestAnimationFrame(update); observer.disconnect();
    }, { threshold: .4 });
    observer.observe(node); return () => observer.disconnect();
  }, [value]);
  return <strong ref={ref}>{number}{suffix}</strong>;
}

function ClubHome({ onNavigate }) {
  const [expanded, setExpanded] = useState(null);
  return <div className="community-page club-home-page"><HubHeading eyebrow="LIVE FROM SPRINGVALE CITY" title="Club Hub" copy="Everything happening across the Wallabies community, in one living club dashboard."><div className="club-live-badge"><i /> CLUB LIVE</div></HubHeading><section className="club-home-feature"><div><span>THURSDAY · 31 JULY</span><h2>Good evening, Wallabies</h2><p>Training is on tonight, Open Day registrations are growing and three teams are preparing for home matches this weekend.</p></div><img src={springvaleLogo} alt="Springvale City Soccer Club" /></section><section className="club-activity-grid">{activityCards.map(([title,meta,headline,copy,target,icon], index) => <article className={expanded === index ? "expanded" : ""} key={title}><button type="button" className="club-activity-main" aria-expanded={expanded === index} onClick={() => setExpanded(expanded === index ? null : index)}><i>{icon}</i><div><span>{meta}</span><h3>{title}</h3><strong>{headline}</strong></div><b>{expanded === index ? "−" : "+"}</b></button><div className="club-activity-detail"><div><p>{copy}</p><button type="button" onClick={() => onNavigate(target)}>Explore {title} →</button></div></div></article>)}</section></div>;
}

function ClubPulse() {
  return <div className="community-page"><HubHeading eyebrow="WHOLE-CLUB INTELLIGENCE" title="Club Pulse" copy="A live view of participation, people, operations and community health across Springvale City."><span className="pulse-updated">Updated today · 4:30pm</span></HubHeading><section className="pulse-grid">{pulseMetrics.map(([label,value,trend,direction,icon,suffix]) => <article key={label}><div><i>{icon}</i><span className={direction}>{direction === "up" ? "↗" : "↘"} {trend}</span></div><AnimatedNumber value={value} suffix={suffix} /><p>{label}</p><small>Compared with last month</small></article>)}</section><section className="pulse-ai-card"><div className="pulse-ai-icon">AI</div><div><span>MATCHVISION CLUB INSIGHT</span><h2>Participation is healthy. Volunteer coverage needs attention.</h2><ul><li>Registrations have increased this month.</li><li>Volunteer availability is lower for upcoming matches.</li><li>Community engagement is trending upwards.</li><li>Equipment readiness should be reviewed before Open Day.</li></ul></div><strong>LIVE<br />SUMMARY</strong></section><section className="pulse-trends"><article><span>ATTENDANCE TREND</span><div className="pulse-bars">{[66,72,69,81,84,92].map((height,index) => <i key={index} style={{ height: `${height}%` }}><small>W{index+1}</small></i>)}</div></article><article><span>COMMUNITY ENGAGEMENT</span><div className="pulse-ring"><strong>76%</strong><small>Healthy and rising</small></div></article></section></div>;
}

function ClubNews() {
  const [category, setCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState(null);
  const categories = ["All", "Club News", "Match Reports", "Events", "Community", "Junior Development"];
  const filtered = category === "All" ? articles : articles.filter((article) => article[0] === category);
  return <div className="community-page"><HubHeading eyebrow="STORIES FROM THE CLUB" title="Club News" copy="Match reports, community stories and updates from across Springvale City." /><div className="news-filters">{categories.map((item) => <button type="button" className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><section className="news-grid">{filtered.map(([type,title,date,author,copy],index) => <article key={title}><div className={`news-image news-tone-${articles.indexOf(filtered[index])+1}`}><span>CLUB IMAGE</span><small>{type}</small></div><div><span>{type}</span><h2>{title}</h2><p>{copy}</p><footer><small>{date} · {author}</small><button type="button" onClick={() => setActiveArticle(title)}>Read More →</button></footer></div></article>)}</section>{activeArticle && <div className="news-modal" role="dialog" aria-modal="true" onClick={() => setActiveArticle(null)}><article onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => setActiveArticle(null)}>×</button><span>CLUB NEWS</span><h2>{activeArticle}</h2><p>This article experience is ready for full editorial content and future Admin Hub publishing.</p></article></div>}</div>;
}

function ParentWelcome({ onNavigate }) {
  const [open, setOpen] = useState(0);
  return <div className="community-page"><HubHeading eyebrow="WELCOME TO THE WALLABIES" title="Parent Welcome Centre" copy="Everything your family needs for a confident and enjoyable start at Springvale City."><img className="welcome-logo" src={springvaleLogo} alt="" /></HubHeading><section className="welcome-intro"><div><strong>01</strong><span>Meet your team</span></div><i /><div><strong>02</strong><span>Prepare for training</span></div><i /><div><strong>03</strong><span>Enjoy the journey</span></div></section><section className="welcome-list">{welcomeItems.map(([title,copy],index) => <article className={open === index ? "open" : ""} key={title}><button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><b>{String(index+1).padStart(2,"0")}</b><span>{title}</span><i>{open === index ? "−" : "+"}</i></button><div><p>{copy}</p>{title === "Ground Map" && <button type="button" onClick={() => onNavigate("club-ground-map")}>Open interactive map →</button>}</div></article>)}</section></div>;
}

function GroundMap() {
  const [selected, setSelected] = useState(mapLocations[0]);
  return <div className="community-page"><HubHeading eyebrow="ROSS RESERVE" title="Interactive Ground Map" copy="Select a location to find facilities and important match-day information." /><section className="ground-layout"><div className="ground-map"><div className="pitch pitch-one"><span>PITCH 1</span></div><div className="pitch pitch-two"><span>PITCH 2</span></div><div className="ground-path" />{mapLocations.map((location) => <button type="button" className={selected.name === location.name ? "active" : ""} key={location.name} style={{ left: `${location.x}%`, top: `${location.y}%` }} aria-label={location.name} onClick={() => setSelected(location)}>{location.icon}</button>)}</div><aside key={selected.name}><span>SELECTED LOCATION</span><div>{selected.icon}</div><h2>{selected.name}</h2><p>{selected.copy}</p><small>Ross Reserve · 45 Memorial Drive, Noble Park</small></aside></section><div className="ground-legend">{mapLocations.map((location) => <button type="button" className={selected.name === location.name ? "active" : ""} key={location.name} onClick={() => setSelected(location)}><i>{location.icon}</i>{location.name}</button>)}</div></div>;
}

function PlayerJourney({ onNavigate }) {
  const [selected, setSelected] = useState(0);
  return <div className="community-page"><HubHeading eyebrow="DIGITAL FOOTBALL PASSPORT" title="Ava’s Player Journey" copy="A demonstration of the story that grows with every training session, match and milestone."><button type="button" className="journey-back" onClick={() => onNavigate("dashboard")}>Back to Dashboard →</button></HubHeading><section className="journey-profile"><div>AT</div><div><span>U11 WALLABIES · #9</span><h2>Ava Thompson</h2><p>Member since February 2026</p></div><aside><strong>68</strong><span>Journey moments</span></aside></section><section className="journey-layout"><div className="journey-timeline">{journeySteps.map(([title,date,,icon],index) => <button type="button" className={selected === index ? "active" : ""} key={title} onClick={() => setSelected(index)}><i>{icon}</i><span><b>{date}</b><strong>{title}</strong></span><em /></button>)}</div><article className="journey-detail" key={selected}><span>MILESTONE {String(selected+1).padStart(2,"0")}</span><div>{journeySteps[selected][3]}</div><small>{journeySteps[selected][1]}</small><h2>{journeySteps[selected][0]}</h2><p>{journeySteps[selected][2]}</p><footer><span>Added to Ava’s football passport</span><b>Verified ✓</b></footer></article></section></div>;
}

export default function CommunityHub({ page, onNavigate }) {
  if (page === "club-home") return <ClubHome onNavigate={onNavigate} />;
  if (page === "club-pulse") return <ClubPulse />;
  if (page === "club-news") return <ClubNews />;
  if (page === "club-parent-welcome") return <ParentWelcome onNavigate={onNavigate} />;
  if (page === "club-ground-map") return <GroundMap />;
  return <PlayerJourney onNavigate={onNavigate} />;
}
