import { useState } from "react";
import { demoAwardHistory, demoPlayerAwards, demoPlayerProfiles } from "../data/playerProfile";
import { getRecognitionRecords } from "../data/recognition";
import { getIntelligence } from "../lib/intelligence";
import "./PlayerProfile.css";

const profileTabs = [
  ["player-profile", "Overview"], ["player-stats", "Performance"],
  ["player-development", "Development"], ["club-player-journey", "Journey"], ["player-awards", "Awards"],
  ["player-certificates", "Certificates"], ["player-rewards", "Rewards"], ["player-achievements", "Achievements"],
];

function PerformanceView({ profile, onNavigate }) {
  return <section className="player-performance"><header><span>MY PERFORMANCE</span><h2>Statistics, matches and momentum</h2></header><div className="player-stat-grid">{profile.stats.map(([label,value]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div><div className="profile-detail-grid"><article><span>RECENT MATCH HISTORY</span>{profile.matchHistory.map(([opponent,result,rating]) => <div className="profile-data-row" key={opponent}><strong>{opponent}</strong><small>{result}</small><b>{rating} AI</b></div>)}</article><article><span>PERFORMANCE TREND</span><h3>{profile.trend}</h3><div className="profile-trend-bars">{[44,58,53,67,76,88].map((value,index) => <i key={index} style={{height:`${value}%`}} />)}</div></article></div><div className="profile-highlight-list"><span>LATEST HIGHLIGHTS</span>{profile.highlights.map((item) => <button type="button" key={item} onClick={() => onNavigate("highlights")}><i>▶</i><strong>{item}</strong><b>View →</b></button>)}</div></section>;
}

function DevelopmentView({ profile, role, onNavigate }) {
  const intelligence = getIntelligence();
  const [completedGoals, setCompletedGoals] = useState([]);
  const goals = profile.id === intelligence.player.id ? intelligence.player.goals : profile.development;
  const toggleGoal = (goal) => setCompletedGoals((current) => current.includes(goal) ? current.filter((item) => item !== goal) : [...current, goal]);
  return <section className="player-development-view"><header><span>MY DEVELOPMENT</span><h2>{role === "parent" ? "Positive development insights" : "Your next step forward"}</h2><p>MatchVision combines match evidence with coach feedback to keep development clear, positive and practical.</p></header><div className="player-development-grid"><article><span>COACH FEEDBACK</span><h3>Growing confidence on the ball</h3><p>{profile.id === intelligence.player.id ? intelligence.player.coachFeedback : `${profile.name} is scanning earlier, finding useful positions and consistently supporting teammates.`}</p><strong>Lisa Pitsos · Head Coach</strong></article><article className="ai-development-card"><span>✦ MATCHVISION AI DEVELOPMENT</span><h3>{profile.trend}</h3><p>{role === "parent" ? intelligence.player.parentSummary : intelligence.player.summary}</p><button type="button" onClick={() => onNavigate(role === "parent" ? "child-analysis" : "analysis")}>Review supporting evidence →</button></article><article><span>STRENGTHS</span><ul>{profile.strengths.map((item) => <li key={item}>✓ {item}</li>)}</ul></article><article><span>DEVELOPMENT GOALS · {intelligence.player.progress}%</span><div className="player-goal-list">{goals.map((goal) => <button type="button" className={completedGoals.includes(goal) ? "complete" : ""} key={goal} onClick={() => toggleGoal(goal)}><i>{completedGoals.includes(goal) ? "✓" : "○"}</i><span>{goal}</span></button>)}</div></article></div></section>;
}

function RecognitionView({ profile, page }) {
  const records = getRecognitionRecords().filter((record) => record.playerId === profile.id);
  const latest = records[0];
  const award = latest || { ...demoPlayerAwards[0], playerId: profile.id, playerName: profile.name, awardType: "Best On Field", dateAwarded: "2026-04-18", match: "Springvale City vs Oakleigh United", coach: "Lisa Pitsos", certificateImage: "/documents/best-on-field.png" };
  const rewards = records.filter((record) => record.reward);
  if (page === "player-rewards") return <section className="player-awards-section"><header><div><span>MY RECOGNITION · REWARDS</span><h2>Rewards earned</h2></div><b>{rewards.length} available</b></header><div className="player-reward-grid">{rewards.map((record) => <article key={record.reward.id}><img src={record.reward.image} alt="Player On Field Reward voucher" /><div><span>🎁 {record.reward.name}</span><h2>{record.reward.value}</h2><p>Earned from {record.awardType} · {record.match}</p><dl><div><dt>Status</dt><dd>{record.reward.status}</dd></div><div><dt>Date issued</dt><dd>{record.dateAwarded}</dd></div><div><dt>Voucher ID</dt><dd>{record.reward.id}</dd></div><div><dt>Redeem</dt><dd>Coming Soon</dd></div></dl><b>QR REDEMPTION · COMING SOON</b></div></article>)}</div></section>;
  const section = page === "player-certificates" ? "CERTIFICATES" : page === "player-achievements" ? "ACHIEVEMENTS" : "AWARDS & RECOGNITION";
  return <section className="player-awards-section"><header><div><span>MY RECOGNITION · {section}</span><h2>{page === "player-certificates" ? "Certificate collection" : page === "player-achievements" ? "Football achievements" : "Awards history"}</h2></div><b>{records.length || 1} recognition</b></header>{page !== "player-achievements" && <article className="latest-player-award"><img src={award.certificateImage} alt="Springvale City Best On Field certificate" /><div><span>🏆 {award.awardType.toUpperCase()} AWARD</span><h2>{profile.name}</h2><p>{award.comments || "Presented for outstanding performance, positive attitude and commitment to the team."}</p><dl><div><dt>Award date</dt><dd>{award.dateAwarded}</dd></div><div><dt>Match</dt><dd>{award.match}</dd></div><div><dt>Coach</dt><dd>{award.coach}</dd></div><div><dt>Reward status</dt><dd>{award.reward ? `${award.reward.status} · ${award.reward.value}` : "No reward attached"}</dd></div></dl><small>Certificate attached · Recognition history active</small></div></article>}<div className="award-history-grid">{records.length ? records.map((record) => <article key={record.id}><i>★</i><div><strong>{record.awardType}</strong><span>{record.dateAwarded} · {record.match}</span></div><b>Earned</b></article>) : demoAwardHistory.map(([name,date,status]) => <article className={status === "Locked" ? "locked" : ""} key={name}><i>{status === "Locked" ? "◇" : "★"}</i><div><strong>{name}</strong><span>{date}</span></div><b>{status}</b></article>)}</div></section>;
}

export default function PlayerProfile({ page, role, user, onNavigate, onLaunchAIStudio }) {
  const linked = role === "parent" ? user.linkedChildren || [] : [user.playerProfile || { id: "ava" }];
  let storedId = linked[0]?.id || "ava";
  try { storedId = localStorage.getItem("matchvisionActivePlayerId") || storedId; } catch { /* Use the linked profile default. */ }
  const [activeId, setActiveId] = useState(linked.some((item) => item.id === storedId) ? storedId : linked[0]?.id || "ava");
  const profile = demoPlayerProfiles[activeId] || demoPlayerProfiles.ava;
  const showOverview = page === "player-profile";
  return <div className="player-profile-page">
    {role === "parent" && <div className="family-profile-switcher"><div><span>MY FAMILY</span><strong>Choose linked child</strong></div>{linked.map((child) => <button type="button" className={activeId === child.id ? "active" : ""} key={child.id} onClick={() => { setActiveId(child.id); try { localStorage.setItem("matchvisionActivePlayerId", child.id); } catch { /* Profile selection remains active in memory. */ } }}>{child.name}<small>{child.team}</small></button>)}</div>}
    <header className="player-profile-hero"><div className="player-profile-avatar">{profile.initials}</div><div><span>{role === "parent" ? "ACTIVE CHILD PROFILE" : "MY PLAYER PROFILE"}</span><h1>{profile.name}</h1><p>{profile.team} · #{profile.number} · {profile.position}</p></div><div className="player-profile-status"><i /> Active player</div><button type="button" className="profile-ai-studio-button" onClick={onLaunchAIStudio}>Analyse Latest Match</button></header>
    <nav className="player-profile-tabs">{profileTabs.map(([id,label]) => <button type="button" className={page === id ? "active" : ""} key={id} onClick={() => onNavigate(id)}>{label}</button>)}</nav>
    {showOverview && <><PerformanceView profile={profile} onNavigate={onNavigate} /><DevelopmentView profile={profile} role={role} onNavigate={onNavigate} /></>}
    {page === "player-stats" && <PerformanceView profile={profile} onNavigate={onNavigate} />}
    {page === "player-development" && <DevelopmentView profile={profile} role={role} onNavigate={onNavigate} />}
    {["player-awards","player-certificates","player-rewards","player-achievements"].includes(page) && <RecognitionView profile={profile} page={page} />}
    {role === "parent" && <section className="parent-approved-matches"><header><span>APPROVED MATCH VIDEO ACCESS</span><h2>Matches featuring {profile.name}</h2><p>Only approved uploads linked to your child are shown.</p></header><div>{profile.matchHistory.map(([opponent]) => <button type="button" key={opponent} onClick={() => onNavigate("matches")}><i>▶</i><span><strong>Springvale vs {opponent}</strong><small>Approved family access</small></span><b>View →</b></button>)}</div></section>}
  </div>;
}
