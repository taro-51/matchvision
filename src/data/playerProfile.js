export const playerProfileSections = [
  { id: "overview", label: "Overview" },
  { id: "statistics", label: "Statistics" },
  { id: "highlights", label: "Highlights" },
  {
    id: "awards",
    label: "Awards & Recognition",
    fields: [
      { id: "awardName", label: "Award name", type: "text" },
      { id: "receivedAt", label: "Date received", type: "date" },
      { id: "coach", label: "Coach", type: "person" },
      { id: "certificateImage", label: "Certificate image", type: "image" },
      { id: "rewardAttached", label: "Reward attached", type: "boolean" },
      { id: "qrRedemptionStatus", label: "QR redemption status", type: "status" },
      { id: "redeemed", label: "Redeemed status", type: "boolean" },
      { id: "linkedRewards", label: "Linked rewards", type: "list" },
    ],
  },
];

export const demoPlayerAwards = [
  {
    id: "award-best-on-field-2026-04-18",
    awardName: "Best On Field",
    receivedAt: "2026-04-18",
    coach: "Lisa Pitsos",
    certificateImage: "/documents/best-on-field.png",
    rewardAttached: false,
    qrRedemptionStatus: "not-issued",
    redeemed: false,
    linkedRewards: [],
  },
];

export const demoPlayerProfiles = {
  ava: {
    id: "ava", name: "Ava Thompson", team: "U11 Wallabies", number: 9,
    position: "Right Wing", initials: "AT",
    stats: [["Matches", 18], ["Goals", 7], ["Assists", 11], ["Attendance", "96%"]],
    matchHistory: [["Oakleigh United", "2–1", "8.6"], ["Bentleigh Greens", "1–1", "8.2"], ["Dandenong City", "3–0", "8.4"]],
    highlights: ["Right-wing assist vs Oakleigh", "First-time finish vs Dandenong", "Recovery run saved a goal"],
    strengths: ["Scanning before receiving", "Creating chances from wide areas", "Positive defensive recovery"],
    development: ["Use both feet when combining", "Attack the back post earlier", "Keep building 1v1 confidence"],
    focus: "Improve first touch under pressure",
    trend: "+12% attacking involvement over six matches",
    nextEvent: "Training · Wednesday 5:30 PM",
  },
  "lily-thompson": {
    id: "lily-thompson", name: "Lily Thompson", team: "U9 Wallabies", number: 4,
    position: "Defender", initials: "LT",
    stats: [["Matches", 15], ["Goals", 2], ["Assists", 4], ["Attendance", "93%"]],
    matchHistory: [["Noble Park Juniors", "2–0", "8.1"], ["Doveton SC", "1–1", "7.8"], ["Casey Comets", "2–1", "8.0"]],
    highlights: ["Goal-line clearance", "First club goal", "Three successful tackles in a row"],
    strengths: ["Reading danger early", "Supporting teammates", "Calm passing from defence"],
    development: ["Open body before receiving", "Communicate earlier", "Build confidence carrying forward"],
    focus: "Receive and pass with an open body shape",
    trend: "+9% passing accuracy over six matches",
    nextEvent: "Training · Monday 5:00 PM",
  },
};

export const demoAwardHistory = [
  ["Best On Field", "18 Apr 2026", "Earned"],
  ["Most Improved", "Season 2025", "Earned"],
  ["Golden Boot", "Future award", "Locked"],
  ["Team Spirit", "Future award", "Locked"],
];
