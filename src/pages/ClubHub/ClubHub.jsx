import { useState } from "react";
import springvaleLogo from "../../assets/springvale-city-logo.png";
import "./ClubHub.css";

const pageMeta = {
  "club-about": ["ABOUT OUR CLUB", "A football home since 1956", "Springvale City is built on community, opportunity and a shared love of the game."],
  "club-values": ["WHAT GUIDES US", "The Springvale way", "Values that shape every training session, match day and club conversation."],
  "club-hall-of-fame": ["OUR CLUB LEGACY", "Hall of Fame", "Celebrating the players, coaches and volunteers who helped shape Springvale City."],
  "club-awards": ["CELEBRATE EXCELLENCE", "Awards Centre", "Recognition for effort, growth, character and unforgettable football moments."],
  "club-events": ["COME TOGETHER", "Club Events", "Match days, community celebrations and moments that bring every Wallaby together."],
  "club-volunteers": ["MAKE A DIFFERENCE", "Volunteer Hub", "Football thrives when great people give their time, energy and care."],
  "club-sponsors": ["GROW WITH US", "Sponsor Hub", "Connect your organisation with a proud, family-focused football community."],
  "club-gallery": ["CLUB MOMENTS", "Gallery", "The people, places and match-day memories that make Springvale City special."],
  "club-canteen": ["MATCH DAY EXPERIENCE", "Springvale Canteen", "Match-day information, club engagement and canteen promotions for the Wallabies community."],
  "coach-recruitment": ["TEAM RESOURCES", "Recruitment Resources", "Approved Springvale recruitment material for coaches, team managers and club administrators."],
  documents: ["CLUB LIBRARY", "Documents", "Find important club information, recruitment material, awards and partnership resources."],
};

const values = [
  ["01", "Belonging", "Every player and family should feel welcome from the moment they arrive."],
  ["02", "Development", "We create opportunities to learn, improve and enjoy the journey."],
  ["03", "Respect", "We respect teammates, opponents, officials, volunteers and the game."],
  ["04", "Courage", "We encourage players to try, compete and express themselves."],
  ["05", "Community", "Our strongest results are the relationships we build together."],
];

const documents = [
  { title: "Your Game Starts Here", category: "Recruitment", description: "An introduction to junior football, belonging and player development at Springvale City.", theme: "recruitment", file: "/documents/your-game-starts-here.png", audiences: ["admin","coach"] },
  { title: "U11 Recruitment Flyer", category: "Coach Resources", description: "Information for boys and girls aged 10 and 11 interested in the U11 mixed-team pathway.", theme: "team", file: "/documents/u11-recruitment.png", audiences: ["admin","coach"] },
  { title: "Best On Field Certificate", category: "Player Awards", description: "Recognition for excellence, effort, positive attitude, commitment and team spirit.", theme: "award", file: "/documents/best-on-field.png", audiences: ["admin","coach","parent","player"] },
  { title: "Player On Field Reward Voucher", category: "Player Rewards", description: "The original $10 Springvale Canteen reward connected to Best On Field recognition.", theme: "award", file: "/documents/player-on-field-reward.png", audiences: ["admin","coach","parent","player"] },
  { title: "Springvale Canteen Voucher", category: "Player Rewards", description: "Canteen voucher template for club-administered recognition rewards.", theme: "award", file: "/documents/springvale-canteen-voucher.png", audiences: ["admin","coach"] },
  { title: "Sponsor Our Club", category: "Sponsor Resources", description: "Community partnership opportunities spanning financial, equipment, apparel, prizes and in-kind support.", theme: "sponsor", file: "/documents/sponsor-our-club.png", audiences: ["admin","coach"] },
  { title: "Springvale Canteen Match Day Bundle", category: "Canteen & Match Day", description: "Match-day canteen promotion supporting club engagement and the Springvale community.", theme: "sponsor", file: "/documents/match-day-canteen-bundle.png", audiences: ["admin","coach","parent","player"] },
  { title: "Parent Welcome", category: "Club Resources", description: "First training, equipment, expectations, contacts and frequently asked questions.", theme: "team", route: "club-parent-welcome", audiences: ["admin","parent"] },
  { title: "Club Values", category: "Club Resources", description: "Belonging, development, respect, courage and community at Springvale City.", theme: "recruitment", route: "club-values", audiences: ["admin","parent","player"] },
  { title: "Club Events", category: "Club Resources", description: "Upcoming family, community and club events at Ross Reserve.", theme: "sponsor", route: "club-events", audiences: ["admin","parent","player"] },
  { title: "Club Administration", category: "Admin Documents", description: "Administration, governance, settings and permission resources.", theme: "team", route: "admin", audiences: ["admin"] },
];

const events = [
  ["03 AUG", "Junior Open Day", "Ross Reserve", "Meet coaches, explore the club and enjoy a welcoming football session."],
  ["17 AUG", "Wallabies Family Night", "Club Rooms", "Food, team activities and a relaxed evening for the whole club community."],
  ["31 AUG", "Awards Celebration", "Ross Reserve", "Celebrate player development, volunteers and memorable season moments."],
];

const sponsors = [
  ["Community", "Support local football", "Ground signage · Website recognition · Club event presence"],
  ["Team", "Stand beside a Wallabies team", "Team association · Match-day visibility · Family engagement"],
  ["Principal", "Lead the club partnership story", "Premium visibility · Digital campaigns · MatchVision integration"],
];

const galleryItems = ["Game Day", "Training", "Team Spirit", "Ross Reserve", "Club Community", "Awards Night"];

function HubHero({ page, onNavigate }) {
  const [eyebrow, title, copy] = pageMeta[page];
  return <header className="club-hub-hero"><div><span>{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div><img src={springvaleLogo} alt="Springvale City Soccer Club" /><button type="button" onClick={() => onNavigate("club-join")}>Join the Wallabies →</button></header>;
}

function AboutPage() {
  return <><section className="club-story"><div><span>ESTABLISHED 1956</span><h2>Rooted in Springvale.<br />Built for what comes next.</h2><p>Springvale City Soccer Club is a place for players to discover football, build confidence and become part of something bigger. From first kicks to competitive match days, our purpose is to make the game welcoming, meaningful and memorable.</p></div><div className="club-story-mark"><img src={springvaleLogo} alt="" /><strong>70</strong><span>years of community football</span></div></section><section className="club-feature-grid"><article><b>ROSS RESERVE</b><h3>Our football home</h3><p>A meeting place for teams, families and the wider Springvale community.</p></article><article><b>JUNIOR PATHWAYS</b><h3>Room to grow</h3><p>Age-appropriate environments designed for confidence, skill and enjoyment.</p></article><article><b>MATCHVISION</b><h3>A modern club</h3><p>Connected experiences for coaching, communication and player development.</p></article></section><section className="club-quote">“Not just a team. A place to belong.”</section></>;
}

function ValuesPage() {
  const [active, setActive] = useState(0);
  return <section className="club-values-layout"><div className="club-value-list">{values.map(([number, title], index) => <button type="button" className={active === index ? "active" : ""} key={title} onClick={() => setActive(index)}><b>{number}</b><span>{title}</span><i>→</i></button>)}</div><article key={active}><small>OUR COMMITMENT</small><h2>{values[active][1]}</h2><p>{values[active][2]}</p><div><span>Players</span><span>Families</span><span>Coaches</span><span>Community</span></div></article></section>;
}

function HallOfFamePage() {
  const people = [["LP", "Lisa Pitsos", "Coaching Leadership", "2026"], ["JW", "Jordan Walsh", "Club Service", "2025"], ["MC", "Mia Chen", "Player Achievement", "2025"], ["AR", "Alex Romano", "Community Impact", "2024"]];
  return <><section className="club-honour-feature"><div><span>FEATURED INDUCTEE</span><h2>Celebrating those who lift the whole club</h2><p>The Hall of Fame grows from the spirit of the Best On Field award: recognising not only performance, but leadership, character and contribution.</p></div><strong>★</strong></section><section className="club-honour-grid">{people.map(([initials,name,award,year]) => <article key={name}><div>{initials}</div><small>INDUCTED {year}</small><h3>{name}</h3><p>{award}</p><span>View story →</span></article>)}</section></>;
}

function AwardsPage() {
  const [selected, setSelected] = useState("Best On Field");
  const awards = [["★","Best On Field","Impact, effort and match-day excellence"],["↗","Most Improved","Growth, resilience and commitment"],["♥","Club Champion","Leadership, values and community spirit"],["⚽","Golden Boot","Attacking contribution across the season"]];
  return <><section className="club-award-grid">{awards.map(([icon,title,copy]) => <button type="button" className={selected === title ? "active" : ""} key={title} onClick={() => setSelected(title)}><i>{icon}</i><h3>{title}</h3><p>{copy}</p></button>)}</section>{selected === "Best On Field" && <section className="club-award-original"><span>ORIGINAL SPRINGVALE AWARD</span><img src="/documents/best-on-field.png" alt="Springvale City Best On Field certificate" /><p>Excellence · Effort · Positive attitude · Commitment · Team spirit</p></section>}<section className="club-certificate"><div className="club-certificate-line"><img src={springvaleLogo} alt="" /><span>SPRINGVALE CITY SOCCER CLUB</span></div><small>PROUDLY PRESENTS</small><h2>{selected}</h2><p>Awarded for an outstanding contribution to the Wallabies</p><strong>PLAYER NAME</strong><footer><span>Coach signature</span><span>Season 2026</span></footer></section></>;
}

function EventsPage() {
  const [attending, setAttending] = useState([]);
  const toggle = (title) => setAttending((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current,title]);
  return <section className="club-event-list">{events.map(([date,title,place,copy]) => <article key={title}><time>{date}</time><div><small>{place}</small><h3>{title}</h3><p>{copy}</p></div><button type="button" className={attending.includes(title) ? "active" : ""} onClick={() => toggle(title)}>{attending.includes(title) ? "You're attending ✓" : "I'm interested"}</button></article>)}</section>;
}

function VolunteerPage() {
  const [interest, setInterest] = useState("");
  const roles = [["⚑","Match Day","Help teams, families and visitors enjoy a smooth game day."],["☕","Club Rooms","Create a warm, welcoming environment around the club."],["◉","Team Support","Assist coaches and team managers across the season."],["✦","Events","Bring club celebrations and community experiences to life."]];
  return <><section className="club-role-grid">{roles.map(([icon,title,copy]) => <button type="button" className={interest === title ? "active" : ""} key={title} onClick={() => setInterest(title)}><i>{icon}</i><h3>{title}</h3><p>{copy}</p><span>{interest === title ? "Selected ✓" : "Choose role →"}</span></button>)}</section>{interest && <div className="club-interest-banner"><div><span>THANK YOU</span><strong>Interested in {interest}?</strong><p>Volunteer registration will connect here in a future release.</p></div><button type="button" onClick={() => setInterest("")}>Clear</button></div>}</>;
}

function SponsorPage() {
  const [selected, setSelected] = useState(1);
  const opportunities = ["Financial sponsorship", "Uniforms & apparel", "Equipment sponsorship", "Prizes & rewards", "Vouchers & gift cards", "In-kind support"];
  return <><section className="club-sponsor-intro"><div><span>PARTNER WITH PURPOSE</span><h2>Put your brand behind community football</h2><p>Springvale City is a not-for-profit community club creating a safe, inclusive development environment for local boys and girls.</p></div><div><strong>200+</strong><span>players and families</span></div></section><section className="club-sponsor-opportunities">{opportunities.map((item, index) => <article key={item}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span></article>)}</section><section className="club-sponsor-grid">{sponsors.map(([tier,title,benefits], index) => <button type="button" className={selected === index ? "active" : ""} key={tier} onClick={() => setSelected(index)}><small>{tier.toUpperCase()} PARTNER</small><h3>{title}</h3><p>{benefits}</p><span>{selected === index ? "Selected" : "Explore package"} →</span></button>)}</section><div className="club-sponsor-cta"><strong>{sponsors[selected][0]} partnership selected</strong><p>Build brand exposure through local families, social media, club events and match-day visibility.</p><button type="button">Become a club partner</button></div></>;
}

function GalleryPage() {
  const [selected, setSelected] = useState(null);
  return <><section className="club-gallery-grid">{galleryItems.map((title,index) => <button type="button" className={`gallery-tone-${index+1}`} key={title} onClick={() => setSelected(title)}><span>PHOTO PLACEHOLDER</span><div><small>SPRINGVALE CITY</small><strong>{title}</strong></div></button>)}</section>{selected && <div className="club-lightbox" role="dialog" aria-modal="true" aria-label={selected} onClick={() => setSelected(null)}><div onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => setSelected(null)}>×</button><span>IMAGE PLACEHOLDER</span><h2>{selected}</h2><p>Uploaded club photography will appear in this gallery experience.</p></div></div>}</>;
}

function OriginalAsset({ image, eyebrow, title, copy, label = "View artwork" }) {
  return <section className="club-original-asset"><div><span>{eyebrow}</span><h2>{title}</h2><p>{copy}</p><a href={image} target="_blank" rel="noreferrer">{label} →</a></div><img src={image} alt={title} /></section>;
}

function RecruitmentResourcesPage() {
  return <><OriginalAsset image="/documents/u11-recruitment.png" eyebrow="COACH & TEAM MANAGER RESOURCE" title="Players Of Interest · U11" copy="Use the approved U11 recruitment flyer when communicating with prospective players and families. This internal team resource is hidden from parent and player navigation." label="View U11 flyer" /><section className="club-feature-grid"><article><b>TEAM NEED</b><h3>U11 mixed team</h3><p>Boys and girls aged 10 and 11, with all skill levels welcome.</p></article><article><b>FOLLOW-UP</b><h3>Connect enquiries</h3><p>Share with prospective families, then refer interest to club recruitment management.</p></article><article><b>PLAYER PATHWAY</b><h3>Learn, belong, grow</h3><p>Training, weekend matches and pathways to U12 and beyond.</p></article></section></>;
}

function CanteenPage() {
  return <><OriginalAsset image="/documents/match-day-canteen-bundle.png" eyebrow="MATCH DAY EXPERIENCE · CANTEEN" title="Springvale Canteen Match Day Bundle" copy="Fuel match day, support the club and bring families together at Ross Reserve. Menu QR functionality remains Coming Soon." label="View match-day artwork" /><section className="club-feature-grid"><article><b>MATCH DAY</b><h3>Fuel your football day</h3><p>Fresh, family-friendly canteen options available around club matches and events.</p></article><article><b>CLUB COMMUNITY</b><h3>Support Springvale City</h3><p>Canteen activity supports grassroots football and the wider Wallabies community.</p></article><article><b>MENU ACCESS</b><h3>Coming Soon</h3><p>Digital menu access and match-day bundle ordering will connect in a future sprint.</p></article></section></>;
}

function DocumentsPage({ role, onNavigate }) {
  const [category, setCategory] = useState("All");
  const [notice, setNotice] = useState("");
  const available = documents.filter((document) => document.audiences.includes(role));
  const categories = ["All", ...new Set(available.map((document) => document.category))];
  const filtered = category === "All" ? available : available.filter((document) => document.category === category);
  const share = async (document) => { const url = `${window.location.origin}${document.file}`; try { if (navigator.share) await navigator.share({ title: document.title, url }); else await navigator.clipboard.writeText(url); setNotice(`${document.title} share link ready.`); } catch { setNotice("Sharing cancelled."); } window.setTimeout(() => setNotice(""), 2500); };
  return <><div className="club-document-filters">{categories.map((item) => <button type="button" className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><section className="club-document-grid">{filtered.map((document) => <article key={document.title}><div className={`club-document-cover ${document.theme}`} style={document.file ? { "--document-image": `url("${document.file}")` } : undefined}><img src={springvaleLogo} alt="" /><small>{document.category}</small><strong>{document.title}</strong><span>SPRINGVALE CITY SC</span></div><div className="club-document-copy"><span>{document.category}</span><h3>{document.title}</h3><p>{document.description}</p><div>{document.file ? <><a href={document.file} target="_blank" rel="noreferrer">View</a><a href={document.file} download>Download ↓</a>{["admin","coach"].includes(role) && <button type="button" onClick={() => share(document)}>Share</button>}</> : <button type="button" onClick={() => onNavigate(document.route)}>View</button>}</div></div></article>)}</section>{notice && <div className="club-hub-toast" role="status">{notice}</div>}</>;
}

export default function ClubHub({ page, onNavigate, role = "coach" }) {
  let content;
  if (page === "club-about") content = <AboutPage />;
  else if (page === "club-values") content = <ValuesPage />;
  else if (page === "club-hall-of-fame") content = <HallOfFamePage />;
  else if (page === "club-awards") content = <AwardsPage />;
  else if (page === "club-events") content = <EventsPage />;
  else if (page === "club-volunteers") content = <VolunteerPage />;
  else if (page === "club-sponsors") content = <><OriginalAsset image="/documents/sponsor-our-club.png" eyebrow="ORIGINAL SPONSOR RESOURCE" title="Sponsor Our Club" copy="Explore the existing Springvale partnership flyer here, in the Sponsor Centre where it belongs." label="View sponsor flyer" /><SponsorPage /></>;
  else if (page === "club-gallery") content = <GalleryPage />;
  else if (page === "club-canteen") content = <CanteenPage />;
  else if (page === "coach-recruitment") content = <RecruitmentResourcesPage />;
  else content = <DocumentsPage role={role} onNavigate={onNavigate} />;
  return <div className="club-hub-page"><HubHero page={page} onNavigate={onNavigate} /><main className="club-hub-content">{content}</main></div>;
}

export function AdminHubPlaceholder({ label }) {
  return <div className="admin-hub-placeholder"><span>ADMIN HUB · FOUNDATION</span><h2>{label}</h2><p>This administration module is scaffolded and ready for its club management workflow.</p><div><i>⚙</i><strong>Navigation connected</strong><small>Permissions, data and actions will be added in a future sprint.</small></div></div>;
}
