export const recognitionStorageKey = "matchvisionRecognitionRecords";

export const defaultRecognitionRecords = [
  {
    id: "recognition-ava-2026-04-18",
    playerId: "ava",
    playerName: "Ava Thompson",
    team: "U11 Wallabies",
    awardType: "Best On Field",
    match: "Springvale City vs Oakleigh United",
    matchDate: "2026-04-18",
    dateAwarded: "2026-04-18",
    coach: "Lisa Pitsos",
    comments: "Outstanding performance, positive attitude and commitment to the team.",
    certificateImage: "/documents/best-on-field.png",
    reward: {
      id: "SCSC-BOF-0418-09",
      name: "Best On Field Reward",
      value: "$10 Springvale Canteen Voucher",
      image: "/documents/player-on-field-reward.png",
      status: "Available",
      redemption: "Coming Soon",
    },
  },
  {
    id: "recognition-lily-2026-07-12",
    playerId: "lily-thompson",
    playerName: "Lily Thompson",
    team: "U9 Wallabies",
    awardType: "Best On Field",
    match: "Springvale City vs Noble Park Juniors",
    matchDate: "2026-07-12",
    dateAwarded: "2026-07-12",
    coach: "Lisa Pitsos",
    comments: "Calm defending, excellent teamwork and a brave goal-line clearance.",
    certificateImage: "/documents/best-on-field.png",
    reward: {
      id: "SCSC-BOF-0712-04",
      name: "Best On Field Reward",
      value: "$10 Springvale Canteen Voucher",
      image: "/documents/player-on-field-reward.png",
      status: "Available",
      redemption: "Coming Soon",
    },
  },
];

export function getRecognitionRecords() {
  if (typeof window === "undefined") return defaultRecognitionRecords;
  try {
    const stored = JSON.parse(window.localStorage.getItem(recognitionStorageKey) || "null");
    return Array.isArray(stored) && stored.length ? stored : defaultRecognitionRecords;
  } catch {
    return defaultRecognitionRecords;
  }
}

export function saveRecognitionRecord(record) {
  const records = [record, ...getRecognitionRecords()];
  if (typeof window !== "undefined") window.localStorage.setItem(recognitionStorageKey, JSON.stringify(records));
  return records;
}
