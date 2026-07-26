export const navigation = [
  { id: "dashboard", label: "Dashboard", icon: "⌂", roles: ["coach", "parent", "admin"] },
  { id: "team", label: "Team Hub", icon: "👥", roles: ["coach", "parent", "admin"] },
  { id: "calendar", label: "Calendar", icon: "▣", roles: ["coach", "parent", "admin"] },
  { id: "messages", label: "Messages", icon: "✉", roles: ["coach", "parent", "admin"] },
  { id: "attendance", label: "Attendance", icon: "✓", roles: ["coach", "admin"] },
  { id: "matches", label: "Match Library", icon: "▶", roles: ["coach", "parent", "admin"] },
  { id: "highlights", label: "Highlights", icon: "★", roles: ["coach", "parent", "admin"] },
  { id: "analysis", label: "AI Analysis", icon: "✦", roles: ["coach", "admin"] },

  { id: "coach-hub-heading", label: "Coach Hub", icon: "◈", roles: ["coach"], heading: true },
  { id: "drills", label: "Drill Exchange", icon: "⚽", roles: ["coach"], child: true },
  { id: "coach-profiles", label: "Coach Profiles", icon: "◎", roles: ["coach"], child: true },
  { id: "session-builder", label: "Session Builder", icon: "▤", roles: ["coach"], child: true },

  { id: "equipment", label: "Equipment", icon: "◫", roles: ["coach", "admin"] },
  { id: "documents", label: "Documents", icon: "▧", roles: ["coach", "parent", "admin"] },
  { id: "admin", label: "Club Admin", icon: "⚙", roles: ["admin"] },
];

export const roleDetails = {
  coach: {
    title: "Coach Portal",
    name: "Lisa Pitsos",
    subtitle: "U11 Wallabies Head Coach",
  },
  parent: {
    title: "Parent Portal",
    name: "Emma Thompson",
    subtitle: "Parent of Mia Thompson",
  },
  admin: {
    title: "Club Admin Portal",
    name: "Club Administrator",
    subtitle: "Springvale City Soccer Club",
  },
};
