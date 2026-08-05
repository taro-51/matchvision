import { useEffect, useRef, useState } from "react";
import { getIntelligence, saveIntelligence } from "../lib/intelligence";
import springvaleLogo from "../assets/springvale-city-logo.png";
import MatchIntelligenceReport from "./MatchIntelligenceReport";
import "./AIStudio.css";
import "./AIStudioBriefing.css";

const processingSteps = [
  "Uploading Match", "Synchronising Video", "Detecting Players", "Tracking Ball",
  "Identifying Teams", "Recognising Formations", "Tracking Possession", "Analysing Passes",
  "Calculating Player Statistics", "Generating Heat Maps", "Building Squad Analytics",
  "Generating Match Analytics", "Creating Highlights", "Generating Player Development",
  "Preparing Session Builder", "Updating Match Library", "Updating Football Intelligence",
  "Preparing Dashboard Intelligence", "Analysis Complete",
];

const demoRecord = { id: "connected-demo", title: "Springvale vs Oakleigh", date: "Latest connected match", status: "AI complete", highlights: 11 };

const briefingMetrics = [
  ["Players Detected", "22"], ["Individual Player Events", "1,487"],
  ["Passes Analysed", "263"], ["Shots Analysed", "28"],
  ["Defensive Actions", "94"], ["Heat Maps Generated", "22"],
  ["Highlights Created", "42"], ["Player Development Insights", "22"],
  ["Squad Analytics Prepared", "Ready"], ["Team Intelligence Updated", "Ready"],
  ["Football Intelligence Updated", "Ready"], ["Match Library Updated", "Ready"],
  ["Session Builder Recommendations Generated", "Ready"], ["MatchVision AI Summary Generated", "Ready"],
];

const roleBriefings = {
  coach: ["Squad Analytics", "Tactical Intelligence", "Team Development", "Session Builder Recommendations", "Opponent Insights"],
  parent: ["Child Development", "Personal Statistics", "Highlights", "Coach Feedback", "Awards & Recognition"],
  player: ["Performance Review", "Personal Statistics", "Development Goals", "Highlights", "Heat Map"],
  admin: ["Club Intelligence", "Squad Analytics", "Participation Statistics", "Team Performance", "Club Reporting"],
};

function animatedBriefingValue(value, frame, index) {
  if (value === "Ready") return value;
  const target = Number(value.replaceAll(",", ""));
  const localProgress = Math.max(0, Math.min(1, (frame - index * 2) / 20));
  return Math.round(target * localProgress).toLocaleString();
}

export default function AIStudio({ isOpen = true, embedded = false, role, user, onClose = () => {}, onNavigate }) {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isDemo, setIsDemo] = useState(false);
  const [status, setStatus] = useState("ready");
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [briefingReveal, setBriefingReveal] = useState(0);
  const [briefingFrame, setBriefingFrame] = useState(0);
  const [playerId, setPlayerId] = useState("ava");
  const timers = useRef([]);

  useEffect(() => {
    if (!isOpen) return undefined;
    let selected = role === "player" ? user?.playerProfile?.id : user?.linkedChildren?.[0]?.id;
    try { selected = localStorage.getItem("matchvisionActivePlayerId") || selected; } catch { /* Use account context. */ }
    setPlayerId(selected || "ava");
    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, [isOpen, role, user]);

  useEffect(() => () => { if (videoUrl) URL.revokeObjectURL(videoUrl); }, [videoUrl]);

  useEffect(() => {
    if (!isOpen || embedded) return undefined;
    const closeOnEscape = (event) => { if (event.key === "Escape") onClose(); };
    document.body.classList.add("ai-studio-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.classList.remove("ai-studio-open"); window.removeEventListener("keydown", closeOnEscape); };
  }, [embedded, isOpen, onClose]);

  if (!isOpen) return null;

  const playerName = role === "player" ? user?.name : user?.linkedChildren?.find((child) => child.id === playerId)?.name || "Ava Thompson";
  const roleLabel = role === "coach" ? "Team Match" : role === "admin" ? "Club Match" : role === "parent" ? `${playerName}'s Match` : "My Match";
  const uploadCopy = role === "parent"
    ? ["Upload Child's Match", "Automatically generate approved personal insights, highlights and development updates."]
    : role === "player"
      ? ["Upload My Match", "Receive personal statistics, highlights and motivating development insights."]
      : role === "admin"
        ? ["Upload Club Match", "Generate connected player, team and club intelligence."]
        : ["Upload Team Match", "Unlock player statistics, tactical analysis, opponent intelligence and coaching recommendations."];
  let recentAnalyses = [];
  try { recentAnalyses = JSON.parse(localStorage.getItem("matchvisionAIStudioMatches") || "[]"); } catch { /* Use demo history. */ }
  if (!recentAnalyses.length) recentAnalyses = [demoRecord];

  function chooseLocalVideo(event) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setFile(selected);
    setVideoUrl(URL.createObjectURL(selected));
    setIsDemo(false);
    setStatus("preview");
  }

  function chooseDemoVideo() {
    setFile({ name: "Springvale_U11_vs_Oakleigh_AI_Demo.mp4" });
    setVideoUrl("");
    setIsDemo(true);
    setStatus("preview");
  }

  function completeAnalysis() {
    const previous = getIntelligence();
    const completedAt = new Date().toISOString();
    const connected = saveIntelligence({
      ...previous,
      sourceFile: file?.name || "Springvale_U11_vs_Oakleigh_AI_Demo.mp4",
      completedAt,
      match: { ...previous.match, score: "3-2", venue: "Ross Reserve", pitch: "Pitch 1" },
      player: { ...previous.player, id: playerId, name: playerName, rating: "8.7", progress: Math.min(100, previous.player.progress + 3) },
    });
    const generatedMatch = { id: `studio-${Date.now()}`, title: "Springvale 3-2 Oakleigh", date: "Analysed just now", status: "AI complete", visibility: ["parent", "player"].includes(role) ? "Approved personal replay" : "Club coaching staff", highlights: 11, approved: true, playerIds: [playerId] };
    try {
      const matches = JSON.parse(localStorage.getItem("matchvisionAIStudioMatches") || "[]");
      localStorage.setItem("matchvisionAIStudioMatches", JSON.stringify([generatedMatch, ...matches]));
      localStorage.setItem("matchvisionRecommendedSession", JSON.stringify({ title: connected.recommendedSession.title, trainingFocus: connected.findings.priority, objective: "Improve defensive transitions", duration: connected.recommendedSession.duration, coachNotes: "Generated by AI Studio from the latest match.", selectedDrills: connected.recommendedSession.drills, equipment: connected.equipment, sourceMatch: generatedMatch.title }));
      localStorage.setItem("matchvisionRecognitionCandidates", JSON.stringify([{ playerId, playerName, match: generatedMatch.title, insight: "Positive effort and team contribution detected", status: "Coach review required", createdAt: completedAt }]));
    } catch { /* Connected demo remains available in memory. */ }
    setProgress(100);
    setBriefingReveal(0);
    setBriefingFrame(0);
    setStatus("briefing");
    briefingMetrics.forEach((_, index) => {
      timers.current.push(window.setTimeout(() => setBriefingReveal(index + 1), 115 * (index + 1)));
    });
    for (let frame = 1; frame <= 48; frame += 1) {
      timers.current.push(window.setTimeout(() => setBriefingFrame(frame), frame * 45));
    }
    timers.current.push(window.setTimeout(() => setStatus("complete"), 2700));
  }

  function beginAnalysis() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStatus("processing"); setProgress(2); setActiveStep(0);
    processingSteps.forEach((_, index) => {
      const timer = window.setTimeout(() => {
        setActiveStep(index);
        setProgress(Math.round(((index + 1) / processingSteps.length) * 96));
        if (index === processingSteps.length - 1) timers.current.push(window.setTimeout(completeAnalysis, 450));
      }, 430 * (index + 1));
      timers.current.push(timer);
    });
  }

  const openResult = (target) => { onClose(); onNavigate(target); };

  return <div className={embedded ? "ai-studio-destination" : "ai-studio-backdrop"} role={embedded ? undefined : "dialog"} aria-modal={embedded ? undefined : "true"} aria-label="MatchVision AI Studio" onClick={() => !embedded && !["processing", "briefing"].includes(status) && onClose()}>
    <section className="ai-studio" onClick={(event) => event.stopPropagation()}>
      <header><div className="ai-studio-brand"><img src={springvaleLogo} alt="" /><div><span>MATCHVISION</span><strong>AI STUDIO</strong><small>Create intelligence.</small></div></div>{!embedded && <button type="button" aria-label="Close AI Studio" disabled={["processing", "briefing"].includes(status)} onClick={onClose}>X</button>}</header>

      {status === "ready" && <div className="ai-studio-home">
        <section className="ai-studio-entry"><div><span>FLAGSHIP AI WORKFLOW</span><h1>{uploadCopy[0]}</h1><p>{uploadCopy[1]}</p><strong>{roleLabel}</strong></div><div className="ai-studio-entry-actions"><label className="ai-studio-primary"><input type="file" accept="video/*" hidden onChange={chooseLocalVideo} />Choose Local Video</label><button type="button" onClick={chooseDemoVideo}>Choose Demo Video</button><button type="button" onClick={() => { setFile({ name: "Previous_Match_Analysis.mp4" }); setStatus("complete"); setProgress(100); }}>Continue Previous Analysis</button></div></section>
        {role === "parent" && user?.linkedChildren?.length > 1 && <label className="ai-studio-player"><span>Analyse for linked child</span><select value={playerId} onChange={(event) => { setPlayerId(event.target.value); try { localStorage.setItem("matchvisionActivePlayerId", event.target.value); } catch { /* Keep selection in memory. */ } }}>{user.linkedChildren.map((child) => <option value={child.id} key={child.id}>{child.name} - {child.team}</option>)}</select></label>}
        <section className="ai-studio-at-a-glance"><article><span>RECENT UPLOADS</span><strong>{recentAnalyses[0].title}</strong><small>{recentAnalyses[0].date}</small></article><article><span>ANALYSIS HISTORY</span><strong>{recentAnalyses.length} completed</strong><button type="button" onClick={() => openResult("matches")}>Open Match Library</button></article><article><span>RECENT HIGHLIGHTS</span><strong>{recentAnalyses[0].highlights || 11} moments</strong><button type="button" onClick={() => openResult("highlights")}>View Highlights</button></article></section>
      </div>}

      {status === "preview" && <div className="ai-studio-preview"><div className="ai-studio-video">{videoUrl ? <video src={videoUrl} controls preload="metadata" /> : <div className="ai-studio-demo-art"><img src={springvaleLogo} alt="Springvale City Soccer Club" /><span>OFFICIAL DEMO VIDEO</span><strong>Springvale City vs Oakleigh United</strong><small>Ross Reserve - U11 Wallabies</small></div>}</div><aside><span>VIDEO PREVIEW</span><h2>{file?.name}</h2><p>Confirm the footage before MatchVision begins processing. The original video remains unchanged.</p><dl><div><dt>Context</dt><dd>{roleLabel}</dd></div><div><dt>Source</dt><dd>{isDemo ? "MatchVision demo" : "Local video"}</dd></div><div><dt>Privacy</dt><dd>{["parent", "player"].includes(role) ? "Personal results only" : "Authorised club analysis"}</dd></div></dl><button type="button" className="ai-studio-primary" onClick={beginAnalysis}>Analyse Match</button><button type="button" onClick={() => setStatus("ready")}>Choose Different Video</button></aside></div>}

      {status === "processing" && <div className="ai-studio-processing"><div className="ai-studio-processing-preview"><div className="ai-studio-video">{videoUrl ? <video src={videoUrl} autoPlay muted loop playsInline controls preload="auto" /> : <div className="ai-studio-demo-art ai-studio-demo-playing"><img src={springvaleLogo} alt="Springvale City Soccer Club" /><span>LIVE AI VIDEO PREVIEW</span><strong>Springvale City vs Oakleigh United</strong><small>Preview continues while MatchVision analyses the match</small></div>}</div><div className="ai-studio-progress"><span>AI PROCESSING - {progress}%</span><h2>MatchVision is building connected football intelligence.</h2><div><i style={{ width: `${progress}%` }} /></div><small>{processingSteps[activeStep]}...</small></div></div><div className="ai-studio-timeline">{processingSteps.map((step,index) => <article className={index < activeStep ? "complete" : index === activeStep ? "active" : ""} key={step}><i>{index < activeStep ? "OK" : index === activeStep ? "AI" : String(index+1).padStart(2,"0")}</i><span>{step}</span><b>{index < activeStep ? "Complete" : index === activeStep ? "Working..." : "Queued"}</b></article>)}</div></div>}

      {status === "briefing" && <section className="ai-match-briefing" aria-live="polite"><div className="ai-briefing-orbit"><i /><b>AI</b></div><span>✦ MATCHVISION AI</span><h1>Analysis Complete</h1><p>The AI has successfully analysed your match.</p><div className="ai-briefing-role">{(roleBriefings[role] || roleBriefings.coach).map((item) => <span key={item}>✓ {item}</span>)}</div><div className="ai-briefing-metrics">{briefingMetrics.map(([label, value], index) => <article className={index < briefingReveal ? "revealed" : ""} key={label}><i>✓</i><span>{label}</span><strong>{animatedBriefingValue(value, briefingFrame, index)}</strong></article>)}</div><footer><strong>{briefingReveal < briefingMetrics.length ? "Preparing Match Intelligence Report..." : "Opening Match Intelligence Report..."}</strong><div><i style={{ width: `${Math.min(100, (briefingReveal / briefingMetrics.length) * 100)}%` }} /></div></footer></section>}

      {status === "complete" && <><div className="ai-studio-complete"><div className="ai-studio-complete-video ai-studio-video">{videoUrl ? <video src={videoUrl} autoPlay muted loop playsInline controls /> : <div className="ai-studio-demo-art"><img src={springvaleLogo} alt="Springvale City Soccer Club" /><span>ANALYSED MATCH</span><strong>Springvale City vs Oakleigh United</strong><small>Video and report remain connected</small></div>}</div><div className="ai-studio-complete-mark">OK</div><span>ANALYSIS COMPLETE</span><h1>Your connected Match Intelligence report is ready below.</h1><p>Match Library, development, recognition, highlights, Football Intelligence and the dashboard now share this single result.</p><div className="ai-studio-result-grid"><button type="button" onClick={() => openResult(role === "parent" ? "child-analysis" : "analysis")}><strong>View Match Intelligence Report</strong><span>Open the full role-specific analysis</span></button><button type="button" onClick={() => openResult("matches")}><strong>Return to Match Library</strong><span>New match record created</span></button><button type="button" onClick={() => openResult("dashboard")}><strong>Return to Dashboard</strong><span>Latest AI update connected</span></button></div><button type="button" onClick={() => { setFile(null); setVideoUrl(""); setStatus("ready"); }}>Analyse Another Match</button></div><MatchIntelligenceReport role={role} user={user} onNavigate={openResult} /></>}
    </section>
  </div>;
}
