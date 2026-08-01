import { useMemo, useState } from "react";
import { getRecognitionRecords, saveRecognitionRecord } from "../data/recognition";
import "./PlayerRecognition.css";

const players = [
  { id: "ava", name: "Ava Thompson", team: "U11 Wallabies" },
  { id: "lily-thompson", name: "Lily Thompson", team: "U9 Wallabies" },
];
const matches = ["Springvale City vs Oakleigh United", "Springvale City vs Bentleigh Greens", "Springvale City vs Dandenong City"];
const awards = ["Best On Field", "Most Improved", "Club Champion", "Golden Boot"];

export default function PlayerRecognition() {
  const [tab, setTab] = useState("Awards");
  const [records, setRecords] = useState(() => getRecognitionRecords());
  const [form, setForm] = useState({ playerId: "ava", match: matches[0], awardType: awards[0], dateAwarded: "2026-07-31", coach: "Lisa Pitsos", comments: "", createReward: true });
  const [notice, setNotice] = useState("");
  const player = players.find((item) => item.id === form.playerId) || players[0];
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  function issueAward(event) {
    event.preventDefault();
    const stamp = Date.now();
    const record = {
      id: `recognition-${form.playerId}-${stamp}`,
      playerId: form.playerId, playerName: player.name, team: player.team,
      awardType: form.awardType, match: form.match, matchDate: form.dateAwarded,
      dateAwarded: form.dateAwarded, coach: form.coach, comments: form.comments,
      certificateImage: "/documents/best-on-field.png",
      reward: form.createReward ? { id: `SCSC-${stamp}`, name: `${form.awardType} Reward`, value: "$10 Springvale Canteen Voucher", image: "/documents/player-on-field-reward.png", status: "Available", redemption: "Coming Soon" } : null,
    };
    setRecords(saveRecognitionRecord(record));
    setNotice(`${form.awardType} issued to ${player.name} and attached to their profile.`);
    window.setTimeout(() => setNotice(""), 3500);
  }

  const rewards = useMemo(() => records.filter((record) => record.reward), [records]);
  return <div className="recognition-page"><header className="recognition-hero"><div><span>COACH HUB · PLAYER DEVELOPMENT</span><h1>Player Recognition</h1><p>Turn match-day effort and development into recognition that follows each player throughout their football journey.</p></div><img src="/documents/best-on-field.png" alt="Springvale City Best On Field certificate" /></header><nav className="recognition-tabs">{["Awards","Certificates","Reward Vouchers"].map((item) => <button type="button" className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)}>{item}</button>)}</nav>
    {tab === "Awards" && <div className="recognition-layout"><form onSubmit={issueAward}><span>ISSUE PLAYER AWARD</span><h2>Recognise a player</h2><label><span>Player</span><select value={form.playerId} onChange={(event) => update("playerId",event.target.value)}>{players.map((item) => <option value={item.id} key={item.id}>{item.name} · {item.team}</option>)}</select></label><label><span>Match</span><select value={form.match} onChange={(event) => update("match",event.target.value)}>{matches.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Award type</span><select value={form.awardType} onChange={(event) => update("awardType",event.target.value)}>{awards.map((item) => <option key={item}>{item}</option>)}</select></label><div className="recognition-form-row"><label><span>Date</span><input type="date" value={form.dateAwarded} onChange={(event) => update("dateAwarded",event.target.value)} /></label><label><span>Coach</span><input value={form.coach} onChange={(event) => update("coach",event.target.value)} /></label></div><label><span>Optional comments</span><textarea rows="4" value={form.comments} onChange={(event) => update("comments",event.target.value)} placeholder="Add a personal recognition note..." /></label><label className="reward-option"><input type="checkbox" checked={form.createReward} onChange={(event) => update("createReward",event.target.checked)} /><span>Create Reward Voucher after issuing</span></label><button className="recognition-primary" type="submit">Issue Award</button></form><article className="recognition-preview"><span>ORIGINAL SPRINGVALE ARTWORK</span><img src="/documents/best-on-field.png" alt="Best On Field award certificate" /><h3>{form.awardType}</h3><p>{player.name} · {form.match} · {form.coach}</p></article></div>}
    {tab === "Certificates" && <section className="recognition-records"><header><span>ISSUED CERTIFICATES</span><h2>Recognition history</h2></header>{records.map((record) => <article key={record.id}><img src={record.certificateImage} alt="Best On Field certificate" /><div><span>{record.awardType}</span><h3>{record.playerName}</h3><p>{record.match}</p><small>{record.dateAwarded} · {record.coach}</small></div><b>Attached to profile ✓</b></article>)}</section>}
    {tab === "Reward Vouchers" && <section className="recognition-rewards"><header><span>PLAYER REWARDS</span><h2>Reward vouchers created from recognition</h2></header>{rewards.map((record) => <article key={record.reward.id}><img src={record.reward.image} alt="Player On Field Reward voucher" /><div><span>{record.reward.name}</span><h3>{record.playerName}</h3><p>{record.reward.value}</p><dl><div><dt>Voucher ID</dt><dd>{record.reward.id}</dd></div><div><dt>Status</dt><dd>{record.reward.status}</dd></div><div><dt>Issued</dt><dd>{record.dateAwarded}</dd></div><div><dt>QR redemption</dt><dd>Coming Soon</dd></div></dl></div></article>)}</section>}
    {notice && <div className="recognition-toast" role="status">{notice}</div>}
  </div>;
}

export function AdminRewardsManagement() {
  const [notice, setNotice] = useState("");
  const [templateActive, setTemplateActive] = useState(true);
  const save = () => { setNotice("Voucher settings saved for the demonstration"); window.setTimeout(() => setNotice(""), 2500); };
  return <div className="recognition-page"><header className="recognition-hero"><div><span>ADMIN HUB · CLUB OPERATIONS</span><h1>Rewards Management</h1><p>Configure how recognition becomes a safe, trackable club reward while redemption remains future-ready.</p></div><img src="/documents/springvale-canteen-voucher.png" alt="Springvale Canteen Voucher" /></header><section className="reward-admin-grid"><article><span>REWARD TEMPLATES</span><h2>Player On Field Reward</h2><img src="/documents/player-on-field-reward.png" alt="Player On Field Reward voucher" /><button type="button" onClick={() => setTemplateActive((current) => !current)}>{templateActive ? "Active template ✓" : "Activate template"}</button></article><article><span>VOUCHER SETTINGS</span><h2>Springvale Canteen Voucher</h2><label><span>Reward value</span><input defaultValue="$10" /></label><label><span>Expiry</span><select defaultValue="Match day only"><option>Match day only</option><option>30 days</option></select></label><label><span>Redemption rules</span><textarea defaultValue="One-time use at Springvale Canteen." /></label><label><span>Sponsor contribution</span><input placeholder="Optional sponsor" /></label><label><span>Reward category</span><select><option>Player recognition</option><option>Club participation</option></select></label><button type="button" onClick={save}>Save voucher settings</button></article><article><span>CANTEEN REWARDS</span><h2>Redemption preparation</h2><strong>QR redemption</strong><b>COMING SOON</b><p>Voucher IDs and availability are recorded now. QR scanning and canteen redemption will be connected in a future sprint.</p></article></section>{notice && <div className="recognition-toast" role="status">{notice}</div>}</div>;
}
