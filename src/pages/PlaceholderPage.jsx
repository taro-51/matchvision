import { useState } from "react";
import { navigation } from "../data/navigation";

const initialPlayers = [
  { name: "Ava Thompson", number: 7, status: "Confirmed", rate: "96%" },
  { name: "Mia Rodriguez", number: 10, status: "Confirmed", rate: "94%" },
  { name: "Lily Chen", number: 4, status: "Confirmed", rate: "91%" },
  { name: "Sophie Williams", number: 12, status: "Pending", rate: "89%" },
  { name: "Ruby Anderson", number: 8, status: "Confirmed", rate: "93%" },
  { name: "Charlotte Brown", number: 3, status: "Unavailable", rate: "84%" },
  { name: "Olivia Martin", number: 9, status: "Confirmed", rate: "95%" },
  { name: "Isla Wilson", number: 11, status: "Confirmed", rate: "90%" },
  { name: "Chloe Taylor", number: 5, status: "Confirmed", rate: "92%" },
  { name: "Grace Walker", number: 6, status: "Confirmed", rate: "97%" },
  { name: "Emily Harris", number: 2, status: "Confirmed", rate: "88%" },
  { name: "Zoe Thomas", number: 14, status: "Confirmed", rate: "94%" },
  { name: "Ella Moore", number: 15, status: "Confirmed", rate: "91%" },
  { name: "Lucy Jackson", number: 16, status: "Confirmed", rate: "93%" },
  { name: "Matilda White", number: 17, status: "Confirmed", rate: "89%" },
  { name: "Amelia Young", number: 18, status: "Pending", rate: "87%" },
  { name: "Harper King", number: 20, status: "Confirmed", rate: "96%" },
];

function AttendancePage() {
  const [players, setPlayers] = useState(initialPlayers);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const confirmedCount = players.filter(
    (player) => player.status === "Confirmed"
  ).length;

  const pendingCount = players.filter(
    (player) => player.status === "Pending"
  ).length;

  const unavailableCount = players.filter(
    (player) => player.status === "Unavailable"
  ).length;

  function updatePlayerStatus(playerName, newStatus) {
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        player.name === playerName
          ? { ...player, status: newStatus }
          : player
      )
    );
  }

  function saveAttendance() {
    setAttendanceOpen(false);
    setSavedMessage("Attendance saved successfully");

    window.setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  }

  function getStatusStyle(status) {
    if (status === "Confirmed") {
      return styles.confirmed;
    }

    if (status === "Pending") {
      return styles.pending;
    }

    return styles.unavailable;
  }

  function getSelectedStyle(status) {
    if (status === "Confirmed") {
      return styles.selectedConfirmed;
    }

    if (status === "Pending") {
      return styles.selectedPending;
    }

    return styles.selectedUnavailable;
  }

  return (
    <div style={styles.attendancePage}>
      <div style={styles.pageIntro}>
        <div>
          <span style={styles.eyebrow}>TEAM MANAGEMENT</span>

          <h2 style={styles.title}>Attendance</h2>

          <p style={styles.subtitle}>
            Track player availability, training attendance and participation
            across the season.
          </p>
        </div>

        <button
          type="button"
          style={styles.primaryButton}
          onClick={() => setAttendanceOpen(true)}
        >
          + Mark attendance
        </button>
      </div>

      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <span style={styles.summaryLabel}>Confirmed</span>
          <strong style={styles.summaryNumber}>{confirmedCount}</strong>
          <span style={styles.summaryFooter}>Available tonight</span>
        </div>

        <div style={styles.summaryCard}>
          <span style={styles.summaryLabel}>Pending</span>
          <strong style={styles.summaryNumber}>{pendingCount}</strong>
          <span style={styles.summaryFooter}>Awaiting response</span>
        </div>

        <div style={styles.summaryCard}>
          <span style={styles.summaryLabel}>Unavailable</span>
          <strong style={styles.summaryNumber}>{unavailableCount}</strong>
          <span style={styles.summaryFooter}>Unable to attend</span>
        </div>

        <div style={styles.summaryCard}>
          <span style={styles.summaryLabel}>Season attendance</span>
          <strong style={styles.summaryNumber}>92%</strong>
          <span style={styles.summaryFooter}>Across all sessions</span>
        </div>
      </div>

      <div style={styles.contentGrid}>
        <section style={styles.mainCard}>
          <div style={styles.cardHeader}>
            <div>
              <span style={styles.cardEyebrow}>TONIGHT&apos;S SESSION</span>
              <h3 style={styles.cardTitle}>Tuesday Training</h3>
              <p style={styles.cardSubtitle}>
                6:00 PM - 7:30 PM · Main Pitch
              </p>
            </div>

            <span style={styles.liveBadge}>
              <span style={styles.greenDot} />
              Responses open
            </span>
          </div>

          <div style={styles.tableHeader}>
            <span>Player</span>
            <span>Status</span>
            <span>Season</span>
          </div>

          {players.map((player) => (
            <div key={player.name} style={styles.playerRow}>
              <div style={styles.playerInfo}>
                <div style={styles.avatar}>{player.number}</div>

                <div>
                  <strong style={styles.playerName}>{player.name}</strong>
                  <span style={styles.playerRole}>
                    U11 Wallabies · Player
                  </span>
                </div>
              </div>

              <span
                style={{
                  ...styles.statusBadge,
                  ...getStatusStyle(player.status),
                }}
              >
                {player.status}
              </span>

              <strong style={styles.rate}>{player.rate}</strong>
            </div>
          ))}
        </section>

        <aside style={styles.sideCard}>
          <span style={styles.cardEyebrow}>SEASON OVERVIEW</span>
          <h3 style={styles.cardTitle}>Participation</h3>

          <div style={styles.progressCircle}>
            <div style={styles.progressCircleInner}>
              <strong style={styles.progressNumber}>92%</strong>
              <span style={styles.progressText}>Team attendance</span>
            </div>
          </div>

          <div style={styles.statRow}>
            <span>Training sessions</span>
            <strong>24</strong>
          </div>

          <div style={styles.statRow}>
            <span>Matches</span>
            <strong>11</strong>
          </div>

          <div style={styles.statRow}>
            <span>Best attendance streak</span>
            <strong>8 weeks</strong>
          </div>

          <div style={styles.insightBox}>
            <span style={styles.insightLabel}>MATCHVISION INSIGHT</span>

            <p style={styles.insightText}>
              Attendance is 6% higher than the previous four-week period.
            </p>
          </div>
        </aside>
      </div>

      {savedMessage && (
        <div style={styles.successToast}>
          <span style={styles.greenDot} />
          {savedMessage}
        </div>
      )}

      {attendanceOpen && (
        <div
          style={styles.modalOverlay}
          onClick={() => setAttendanceOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendance-dialog-title"
            style={styles.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <span style={styles.cardEyebrow}>TUESDAY TRAINING</span>

                <h3 id="attendance-dialog-title" style={styles.modalTitle}>
                  Mark attendance
                </h3>

                <p style={styles.modalSubtitle}>
                  Update each player&apos;s attendance status for tonight.
                </p>
              </div>

              <button
                type="button"
                style={styles.closeButton}
                onClick={() => setAttendanceOpen(false)}
                aria-label="Close attendance window"
              >
                ×
              </button>
            </div>

            <div style={styles.modalPlayerList}>
              {players.map((player) => (
                <div key={player.name} style={styles.modalPlayerRow}>
                  <div style={styles.playerInfo}>
                    <div style={styles.avatar}>{player.number}</div>

                    <div>
                      <strong style={styles.playerName}>{player.name}</strong>
                      <span style={styles.playerRole}>
                        U11 Wallabies · Player
                      </span>
                    </div>
                  </div>

                  <div style={styles.statusButtons}>
                    {["Confirmed", "Pending", "Unavailable"].map((status) => {
                      const isSelected = player.status === status;

                      return (
                        <button
                          type="button"
                          key={status}
                          onClick={() =>
                            updatePlayerStatus(player.name, status)
                          }
                          style={{
                            ...styles.statusOption,
                            ...(isSelected ? getSelectedStyle(status) : {}),
                          }}
                        >
                          {status}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.modalFooter}>
              <div style={styles.modalTotals}>
                <span>{confirmedCount} confirmed</span>
                <span>{pendingCount} pending</span>
                <span>{unavailableCount} unavailable</span>
              </div>

              <div style={styles.modalActions}>
                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => setAttendanceOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  style={styles.saveButton}
                  onClick={saveAttendance}
                >
                  Save attendance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


const parentCalendarEvents = [
  {
    id: 1,
    date: "2026-07-27",
    dateLabel: "Monday, 27 July",
    shortDate: "27 JUL",
    day: "MON",
    dayNumber: "27",
    time: "9:00 AM",
    endTime: "12:00 PM",
    title: "School Holiday Clinic",
    type: "Club Event",
    location: "Springvale Reserve",
    club: "Springvale Wallabies",
    team: "Junior Program",
    players: "All registered junior players",
    description:
      "A relaxed school holiday clinic focused on ball mastery, passing and small-sided games.",
  },
  {
    id: 2,
    date: "2026-07-28",
    dateLabel: "Tuesday, 28 July",
    shortDate: "28 JUL",
    day: "TUE",
    dayNumber: "28",
    time: "6:00 PM",
    endTime: "7:30 PM",
    title: "U11 Team Training",
    type: "Training",
    location: "Main Pitch",
    club: "Springvale Wallabies",
    team: "U11 Wallabies",
    players: "Ava Thompson, Mia Rodriguez, Lily Chen, Sophie Williams, Ruby Anderson and full squad",
    description:
      "Possession, defensive shape and attacking combinations ahead of the weekend fixture.",
  },
  {
    id: 3,
    date: "2026-07-30",
    dateLabel: "Thursday, 30 July",
    shortDate: "30 JUL",
    day: "THU",
    dayNumber: "30",
    time: "6:00 PM",
    endTime: "7:15 PM",
    title: "Match Preparation",
    type: "Training",
    location: "Main Pitch",
    club: "Springvale Wallabies",
    team: "U11 Wallabies",
    players: "Full U11 squad",
    description:
      "A short session covering set pieces, match roles and team shape.",
  },
  {
    id: 4,
    date: "2026-08-01",
    dateLabel: "Saturday, 1 August",
    shortDate: "01 AUG",
    day: "SAT",
    dayNumber: "01",
    time: "10:00 AM",
    endTime: "11:30 AM",
    title: "Dandenong City vs Springvale",
    type: "Match",
    location: "Dandenong City Soccer Club",
    club: "Springvale Wallabies",
    team: "U11 Wallabies",
    players: "Selected match-day squad",
    description:
      "Away fixture. Players arrive by 9:15 AM in full match kit.",
  },
  {
    id: 5,
    date: "2026-08-04",
    dateLabel: "Tuesday, 4 August",
    shortDate: "04 AUG",
    day: "TUE",
    dayNumber: "04",
    time: "6:00 PM",
    endTime: "7:00 PM",
    title: "Recovery and Skills Session",
    type: "Training",
    location: "Training Pitch 2",
    club: "Springvale Wallabies",
    team: "U11 Wallabies",
    players: "Full U11 squad",
    description:
      "Low-intensity recovery, finishing practice and individual skill stations.",
  },
  {
    id: 6,
    date: "2026-08-06",
    dateLabel: "Thursday, 6 August",
    shortDate: "06 AUG",
    day: "THU",
    dayNumber: "06",
    time: "7:00 PM",
    endTime: "8:00 PM",
    title: "Parents Information Evening",
    type: "Meeting",
    location: "Clubrooms",
    club: "Springvale Wallabies",
    team: "U11 Wallabies",
    players: "Parents and guardians",
    description:
      "Season update covering fixtures, development, communication and upcoming club events.",
  },
  {
    id: 7,
    date: "2026-08-08",
    dateLabel: "Saturday, 8 August",
    shortDate: "08 AUG",
    day: "SAT",
    dayNumber: "08",
    time: "10:30 AM",
    endTime: "12:00 PM",
    title: "Springvale vs Mornington",
    type: "Match",
    location: "Springvale Reserve",
    club: "Springvale Wallabies",
    team: "U11 Wallabies",
    players: "Selected match-day squad",
    description:
      "Home fixture and junior family day. Players arrive by 9:45 AM.",
  },
  {
    id: 8,
    date: "2026-08-11",
    dateLabel: "Tuesday, 11 August",
    shortDate: "11 AUG",
    day: "TUE",
    dayNumber: "11",
    time: "6:00 PM",
    endTime: "7:30 PM",
    title: "Team Training",
    type: "Training",
    location: "Main Pitch",
    club: "Springvale Wallabies",
    team: "U11 Wallabies",
    players: "Ava Thompson, Mia Rodriguez, Lily Chen, Sophie Williams, Ruby Anderson and full squad",
    description:
      "Build-up play, width, communication and decision-making under pressure.",
  },
];

const parentCalendarFilters = [
  "All",
  "Training",
  "Match",
  "Club Event",
  "Meeting",
];

function getParentCalendarTypeStyle(type) {
  if (type === "Match") {
    return styles.parentCalendarMatch;
  }

  if (type === "Training") {
    return styles.parentCalendarTraining;
  }

  if (type === "Meeting") {
    return styles.parentCalendarMeeting;
  }

  return styles.parentCalendarClub;
}

function ParentFriendlyCalendarPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(parentCalendarEvents[0]);
  const [eventFormOpen, setEventFormOpen] = useState(false);
  const [calendarMessage, setCalendarMessage] = useState("");

  const normalisedSearch = searchTerm.trim().toLowerCase();

  const filteredEvents = parentCalendarEvents.filter((event) => {
    const matchesFilter =
      activeFilter === "All" || event.type === activeFilter;

    const searchableText = [
      event.date,
      event.dateLabel,
      event.shortDate,
      event.time,
      event.endTime,
      event.title,
      event.type,
      event.location,
      event.club,
      event.team,
      event.players,
      event.description,
    ]
      .join(" ")
      .toLowerCase();

    return matchesFilter && searchableText.includes(normalisedSearch);
  });

  function saveDemoEvent(event) {
    event.preventDefault();
    setEventFormOpen(false);
    setCalendarMessage("Event added to the club calendar");

    window.setTimeout(() => {
      setCalendarMessage("");
    }, 3000);
  }

  return (
    <div style={styles.attendancePage}>
      <div style={styles.pageIntro}>
        <div>
          <span style={styles.eyebrow}>CLUB SCHEDULE</span>
          <h2 style={styles.title}>Calendar</h2>
          <p style={styles.subtitle}>
            A simple shared schedule for parents, players, coaches and club
            staff.
          </p>
        </div>

        <button
          type="button"
          style={styles.primaryButton}
          onClick={() => setEventFormOpen(true)}
        >
          + Add event
        </button>
      </div>

      <section style={styles.parentCalendarSearchPanel}>
        <div style={styles.parentCalendarSearchRow}>
          <div style={styles.parentCalendarSearchBox}>
            <span style={styles.parentCalendarSearchIcon}>⌕</span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search date, time, location, player, team, club or event..."
              style={styles.parentCalendarSearchInput}
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                style={styles.parentCalendarClearButton}
              >
                Clear
              </button>
            )}
          </div>

          <div style={styles.parentCalendarResultCount}>
            <strong>{filteredEvents.length}</strong>
            <span>{filteredEvents.length === 1 ? "event found" : "events found"}</span>
          </div>
        </div>

        <div style={styles.parentCalendarFilterRow}>
          {parentCalendarFilters.map((filter) => (
            <button
              type="button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                ...styles.parentCalendarFilterButton,
                ...(activeFilter === filter
                  ? styles.parentCalendarFilterButtonActive
                  : {}),
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <div style={styles.parentCalendarSummaryGrid}>
        <div style={styles.parentCalendarSummaryCard}>
          <span style={styles.summaryLabel}>Next event</span>
          <strong style={styles.parentCalendarSummaryTitle}>
            School Holiday Clinic
          </strong>
          <span style={styles.summaryFooter}>Today · 9:00 AM</span>
        </div>

        <div style={styles.parentCalendarSummaryCard}>
          <span style={styles.summaryLabel}>Next match</span>
          <strong style={styles.parentCalendarSummaryTitle}>
            Dandenong City
          </strong>
          <span style={styles.summaryFooter}>Saturday · 10:00 AM</span>
        </div>

        <div style={styles.parentCalendarSummaryCard}>
          <span style={styles.summaryLabel}>Next training</span>
          <strong style={styles.parentCalendarSummaryTitle}>
            U11 Team Training
          </strong>
          <span style={styles.summaryFooter}>Tuesday · Main Pitch</span>
        </div>
      </div>

      <div style={styles.parentCalendarLayout}>
        <section style={styles.parentCalendarAgendaCard}>
          <div style={styles.parentCalendarSectionHeader}>
            <div>
              <span style={styles.cardEyebrow}>UPCOMING SCHEDULE</span>
              <h3 style={styles.cardTitle}>Events and matches</h3>
            </div>

            <span style={styles.parentCalendarMonthBadge}>JUL–AUG 2026</span>
          </div>

          <div style={styles.parentCalendarAgendaList}>
            {filteredEvents.length === 0 ? (
              <div style={styles.parentCalendarEmptyState}>
                <strong>No events found</strong>
                <p>
                  Try searching a different date, player, location, team, club
                  or event type.
                </p>
                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("All");
                  }}
                >
                  Reset search
                </button>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <button
                  type="button"
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  style={{
                    ...styles.parentCalendarAgendaItem,
                    ...(selectedEvent?.id === event.id
                      ? styles.parentCalendarAgendaItemActive
                      : {}),
                  }}
                >
                  <span style={styles.parentCalendarDateBlock}>
                    <small>{event.day}</small>
                    <strong>{event.dayNumber}</strong>
                  </span>

                  <span style={styles.parentCalendarAgendaMain}>
                    <span style={styles.parentCalendarAgendaTopLine}>
                      <strong>{event.title}</strong>
                      <span
                        style={{
                          ...styles.parentCalendarTypeBadge,
                          ...getParentCalendarTypeStyle(event.type),
                        }}
                      >
                        {event.type}
                      </span>
                    </span>

                    <span style={styles.parentCalendarMeta}>
                      {event.time}–{event.endTime}
                    </span>

                    <span style={styles.parentCalendarMeta}>
                      {event.location} · {event.club}
                    </span>

                    <span style={styles.parentCalendarTeamLine}>
                      {event.team}
                    </span>
                  </span>

                  <span style={styles.parentCalendarChevron}>›</span>
                </button>
              ))
            )}
          </div>
        </section>

        <aside style={styles.parentCalendarDetailCard}>
          {selectedEvent ? (
            <>
              <div style={styles.parentCalendarDetailHeader}>
                <span
                  style={{
                    ...styles.parentCalendarTypeBadge,
                    ...getParentCalendarTypeStyle(selectedEvent.type),
                  }}
                >
                  {selectedEvent.type}
                </span>

                <span style={styles.parentCalendarDetailDate}>
                  {selectedEvent.dateLabel}
                </span>
              </div>

              <h3 style={styles.parentCalendarDetailTitle}>
                {selectedEvent.title}
              </h3>

              <div style={styles.parentCalendarDetailRows}>
                <div style={styles.parentCalendarDetailRow}>
                  <span>Time</span>
                  <strong>
                    {selectedEvent.time}–{selectedEvent.endTime}
                  </strong>
                </div>

                <div style={styles.parentCalendarDetailRow}>
                  <span>Location</span>
                  <strong>{selectedEvent.location}</strong>
                </div>

                <div style={styles.parentCalendarDetailRow}>
                  <span>Club</span>
                  <strong>{selectedEvent.club}</strong>
                </div>

                <div style={styles.parentCalendarDetailRow}>
                  <span>Team</span>
                  <strong>{selectedEvent.team}</strong>
                </div>

                <div style={styles.parentCalendarDetailRow}>
                  <span>Who</span>
                  <strong>{selectedEvent.players}</strong>
                </div>
              </div>

              <div style={styles.parentCalendarDescription}>
                <span style={styles.insightLabel}>EVENT INFORMATION</span>
                <p>{selectedEvent.description}</p>
              </div>

              <button
                type="button"
                style={styles.parentCalendarReminderButton}
                onClick={() => {
                  setCalendarMessage("Reminder shared with parents and players");
                  window.setTimeout(() => setCalendarMessage(""), 3000);
                }}
              >
                Share reminder
              </button>
            </>
          ) : (
            <div style={styles.parentCalendarEmptyState}>
              <strong>Select an event</strong>
              <p>Choose an event from the schedule to see full details.</p>
            </div>
          )}
        </aside>
      </div>

      {calendarMessage && (
        <div style={styles.successToast}>
          <span style={styles.greenDot} />
          {calendarMessage}
        </div>
      )}

      {eventFormOpen && (
        <div
          style={styles.modalOverlay}
          onClick={() => setEventFormOpen(false)}
        >
          <form
            style={styles.parentCalendarModal}
            onSubmit={saveDemoEvent}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <span style={styles.cardEyebrow}>NEW CALENDAR ITEM</span>
                <h3 style={styles.modalTitle}>Add event</h3>
                <p style={styles.modalSubtitle}>
                  Add an event for a team, player group or the whole club.
                </p>
              </div>

              <button
                type="button"
                style={styles.closeButton}
                onClick={() => setEventFormOpen(false)}
                aria-label="Close add event window"
              >
                ×
              </button>
            </div>

            <div style={styles.parentCalendarFormBody}>
              <label style={styles.parentCalendarField}>
                <span>Event title</span>
                <input
                  required
                  defaultValue="Team Recovery Session"
                  style={styles.parentCalendarInput}
                />
              </label>

              <div style={styles.parentCalendarFormGrid}>
                <label style={styles.parentCalendarField}>
                  <span>Date</span>
                  <input
                    required
                    type="date"
                    defaultValue="2026-08-04"
                    style={styles.parentCalendarInput}
                  />
                </label>

                <label style={styles.parentCalendarField}>
                  <span>Start time</span>
                  <input
                    required
                    type="time"
                    defaultValue="18:00"
                    style={styles.parentCalendarInput}
                  />
                </label>
              </div>

              <label style={styles.parentCalendarField}>
                <span>Location</span>
                <input
                  required
                  defaultValue="Springvale Reserve"
                  style={styles.parentCalendarInput}
                />
              </label>

              <label style={styles.parentCalendarField}>
                <span>Club</span>
                <input
                  required
                  defaultValue="Springvale Wallabies"
                  style={styles.parentCalendarInput}
                />
              </label>

              <label style={styles.parentCalendarField}>
                <span>Team or player group</span>
                <input
                  required
                  defaultValue="U11 Wallabies"
                  style={styles.parentCalendarInput}
                />
              </label>

              <label style={styles.parentCalendarField}>
                <span>Event type</span>
                <select
                  defaultValue="Training"
                  style={styles.parentCalendarInput}
                >
                  <option>Training</option>
                  <option>Match</option>
                  <option>Club Event</option>
                  <option>Meeting</option>
                </select>
              </label>

              <label style={styles.parentCalendarField}>
                <span>Notes</span>
                <textarea
                  defaultValue="Light recovery session after the weekend fixture."
                  style={styles.parentCalendarTextarea}
                />
              </label>
            </div>

            <div style={styles.parentCalendarModalFooter}>
              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => setEventFormOpen(false)}
              >
                Cancel
              </button>

              <button type="submit" style={styles.saveButton}>
                Add event
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}



const teamHubPlayers = [
  {
    id: 1,
    name: "Ava Thompson",
    number: 7,
    position: "Right Wing",
    rating: 8.7,
    goals: 8,
    assists: 6,
    minutes: 742,
    attendance: 96,
    trend: "+12%",
    aiSummary: "Ava is becoming a confident attacking player who creates chances and works hard to recover possession.",
    development: "Final-third decision making",
    nextStep: "Practise looking up before crossing and choosing between a pass, shot or cut-back.",
    parentMoment: "Ava created the winning goal last weekend with a clever first-time pass.",
    coachInsight: "Best chance creator from the right half-space. High-value actions increase when supported by an overlapping fullback.",
    risk: "Low",
    strengths: ["Acceleration", "Chance creation", "Defensive recovery"],
    confidence: 94,
    nextEvent: "U11 Team Training · Tuesday 6:00 PM",
  },
  {
    id: 2,
    name: "Mia Rodriguez",
    number: 10,
    position: "Attacking Midfield",
    rating: 8.4,
    goals: 6,
    assists: 9,
    minutes: 718,
    attendance: 94,
    trend: "+9%",
    aiSummary: "Mia sees passes early and is one of the team's strongest creative players.",
    development: "Weak-foot passing",
    nextStep: "Complete 20 short left-foot passes against a wall three times this week.",
    parentMoment: "Mia led the team for key passes in the last two matches.",
    coachInsight: "Receives well between lines and leads the squad in assists. Can improve tempo by releasing earlier under pressure.",
    risk: "Low",
    strengths: ["Vision", "Key passes", "Composure"],
    confidence: 92,
    nextEvent: "Match Preparation · Thursday 6:00 PM",
  },
  {
    id: 3,
    name: "Lily Chen",
    number: 4,
    position: "Centre Back",
    rating: 8.1,
    goals: 1,
    assists: 2,
    minutes: 801,
    attendance: 91,
    trend: "+7%",
    aiSummary: "Lily reads danger early and is becoming a dependable one-on-one defender.",
    development: "Progressive passing",
    nextStep: "Practise opening the body and passing forward after winning the ball.",
    parentMoment: "Lily made three important recoveries that stopped clear scoring chances.",
    coachInsight: "Highest defensive duel success in the squad. Opportunity to improve line-breaking distribution.",
    risk: "Low",
    strengths: ["Anticipation", "Tackling", "Positioning"],
    confidence: 90,
    nextEvent: "U11 Team Training · Tuesday 6:00 PM",
  },
  {
    id: 4,
    name: "Sophie Williams",
    number: 12,
    position: "Goalkeeper",
    rating: 7.9,
    goals: 0,
    assists: 1,
    minutes: 810,
    attendance: 89,
    trend: "+5%",
    aiSummary: "Sophie is growing in confidence and has improved her shot-stopping and communication.",
    development: "Short distribution",
    nextStep: "Practise rolling and passing accurately to both sides under light pressure.",
    parentMoment: "Sophie made a brave close-range save that kept the team in the match.",
    coachInsight: "Shot-stopping trend is positive. Distribution accuracy drops when pressed from the front.",
    risk: "Moderate",
    strengths: ["Shot stopping", "Bravery", "Communication"],
    confidence: 88,
    nextEvent: "Recovery Session · Tuesday 6:00 PM",
  },
  {
    id: 5,
    name: "Ruby Anderson",
    number: 8,
    position: "Central Midfield",
    rating: 8.3,
    goals: 4,
    assists: 5,
    minutes: 756,
    attendance: 93,
    trend: "+11%",
    aiSummary: "Ruby covers a lot of ground and helps the team win the ball back through midfield.",
    development: "Scanning before receiving",
    nextStep: "Check both shoulders before the ball arrives during passing practice.",
    parentMoment: "Ruby recovered possession seven times and started two counter-attacks.",
    coachInsight: "Strongest ball-recovery midfielder. Decision speed improves significantly after pre-scan cues.",
    risk: "Low",
    strengths: ["Work rate", "Ball recovery", "Transition play"],
    confidence: 93,
    nextEvent: "U11 Team Training · Tuesday 6:00 PM",
  },
];

const parentChildren = [
  { id: 1, playerId: 1, relationship: "Daughter" },
  { id: 2, playerId: 3, relationship: "Daughter" },
];

const teamHubInsights = [
  {
    title: "Right-side overload is creating the most chances",
    confidence: "94% confidence",
    detail:
      "Across the last four matches, 61% of successful entries came through Ava and Mia combining on the right.",
    action: "Build Thursday's session around overlaps and cut-backs.",
  },
  {
    title: "Defensive transitions improved by 18%",
    confidence: "91% confidence",
    detail:
      "Average recovery time after losing possession dropped from 7.4 seconds to 6.1 seconds.",
    action: "Maintain the current pressing trigger and compact recovery shape.",
  },
  {
    title: "One player may need load management",
    confidence: "87% confidence",
    detail:
      "Sophie has completed the highest minutes and has a recent attendance dip.",
    action: "Reduce Tuesday intensity and review wellness before Saturday.",
  },
];

function getPlayerById(id) {
  return teamHubPlayers.find((player) => player.id === id) || teamHubPlayers[0];
}

function TeamHubPage({ role = "parent" }) {
  const setRole = () => {};
  const [selectedPlayer, setSelectedPlayer] = useState(teamHubPlayers[0]);
  const [selectedChildId, setSelectedChildId] = useState(parentChildren[0].playerId);
  const [activeTab, setActiveTab] = useState("Overview");
  const [fullReportOpen, setFullReportOpen] = useState(false);
  const [teamMessage, setTeamMessage] = useState("");

  const selectedChild = getPlayerById(selectedChildId);

  function showMessage(message) {
    setTeamMessage(message);
    window.setTimeout(() => setTeamMessage(""), 3000);
  }

  function openFullReport(player) {
    setSelectedPlayer(player);
    setFullReportOpen(true);
  }

  return (
    <div style={styles.attendancePage}>
      <div style={styles.teamHubRoleBar}>
        <div>
          <span style={styles.cardEyebrow}>DEMO VIEW</span>
          <h3 style={styles.teamHubRoleTitle}>See Team Hub as a parent or coach</h3>
        </div>

        <div style={styles.teamHubRoleToggle}>
          <button
            type="button"
            onClick={() => {
              setRole("parent");
              setActiveTab("Overview");
            }}
            style={{
              ...styles.teamHubRoleButton,
              ...(role === "parent" ? styles.teamHubRoleButtonActive : {}),
            }}
          >
            Parent view
          </button>

          <button
            type="button"
            onClick={() => {
              setRole("coach");
              setActiveTab("Squad");
            }}
            style={{
              ...styles.teamHubRoleButton,
              ...(role === "coach" ? styles.teamHubRoleButtonActive : {}),
            }}
          >
            Coach view
          </button>
        </div>
      </div>

      {role === "parent" ? (
        <>
          <div style={styles.teamHubParentHero}>
            <div>
              <span style={styles.eyebrow}>MY CHILD'S MATCHVISION</span>
              <h2 style={styles.teamHubHeroTitle}>
                Feel closer to every game — even when you cannot see every moment.
              </h2>
              <p style={styles.teamHubHeroText}>
                Parents only see information connected to their own children.
                MatchVision turns match data into encouraging, easy-to-understand
                updates about progress, special moments and what comes next.
              </p>
            </div>

            <div style={styles.teamHubPrivacyCard}>
              <span style={styles.teamHubPrivacyIcon}>🔒</span>
              <div>
                <strong>Private family view</strong>
                <span>Only your linked children are visible</span>
              </div>
            </div>
          </div>

          <section style={styles.teamHubChildSelectorCard}>
            <div>
              <span style={styles.cardEyebrow}>SELECT YOUR CHILD</span>
              <h3 style={styles.cardTitle}>Your linked players</h3>
            </div>

            <div style={styles.teamHubChildButtons}>
              {parentChildren.map((child) => {
                const player = getPlayerById(child.playerId);

                return (
                  <button
                    type="button"
                    key={child.id}
                    onClick={() => setSelectedChildId(player.id)}
                    style={{
                      ...styles.teamHubChildButton,
                      ...(selectedChildId === player.id
                        ? styles.teamHubChildButtonActive
                        : {}),
                    }}
                  >
                    <span style={styles.avatar}>{player.number}</span>
                    <span>
                      <strong>{player.name}</strong>
                      <small>{child.relationship} · {player.position}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <div style={styles.teamHubParentWelcome}>
            <div>
              <span style={styles.cardEyebrow}>THIS WEEK FOR {selectedChild.name.toUpperCase()}</span>
              <h3>{selectedChild.parentMoment}</h3>
              <p>
                MatchVision highlights meaningful moments, not just scores, so
                families can celebrate effort, growth and confidence.
              </p>
            </div>

            <div style={styles.teamHubEmotionBadge}>
              <span>Season progress</span>
              <strong>{selectedChild.trend}</strong>
            </div>
          </div>

          <div style={styles.teamHubTabs}>
            {["Overview", "AI report", "Next events"].map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.teamHubTabButton,
                  ...(activeTab === tab ? styles.teamHubTabButtonActive : {}),
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Overview" && (
            <div style={styles.teamHubParentGrid}>
              <section style={styles.teamHubParentMainCard}>
                <div style={styles.teamHubPlayerPanelHeader}>
                  <span style={styles.avatar}>{selectedChild.number}</span>
                  <div>
                    <span style={styles.cardEyebrow}>PLAYER SNAPSHOT</span>
                    <h3 style={styles.teamHubPlayerTitle}>{selectedChild.name}</h3>
                    <span style={styles.playerRole}>{selectedChild.position}</span>
                  </div>
                </div>

                <div style={styles.teamHubParentMetricGrid}>
                  <div>
                    <span>AI rating</span>
                    <strong>{selectedChild.rating}</strong>
                  </div>
                  <div>
                    <span>Goals</span>
                    <strong>{selectedChild.goals}</strong>
                  </div>
                  <div>
                    <span>Assists</span>
                    <strong>{selectedChild.assists}</strong>
                  </div>
                  <div>
                    <span>Attendance</span>
                    <strong>{selectedChild.attendance}%</strong>
                  </div>
                </div>

                <div style={styles.teamHubAiSummary}>
                  <span style={styles.insightLabel}>AI EXPLAINS THE GAME</span>
                  <p>{selectedChild.aiSummary}</p>
                </div>

                <div style={styles.teamHubStrengthList}>
                  {selectedChild.strengths.map((strength) => (
                    <span key={strength}>{strength}</span>
                  ))}
                </div>

                <button
                  type="button"
                  style={styles.parentCalendarReminderButton}
                  onClick={() => openFullReport(selectedChild)}
                >
                  Open full AI player report
                </button>
              </section>

              <aside style={styles.teamHubParentSideStack}>
                <div style={styles.teamHubParentSideCard}>
                  <span style={styles.cardEyebrow}>WHAT TO WORK ON</span>
                  <h3>{selectedChild.development}</h3>
                  <p>{selectedChild.nextStep}</p>
                </div>

                <div style={styles.teamHubParentSideCard}>
                  <span style={styles.cardEyebrow}>NEXT EVENT</span>
                  <h3>{selectedChild.nextEvent}</h3>
                  <p>Tap Calendar for location, arrival time and full event details.</p>
                  <button
                    type="button"
                    style={styles.secondaryButton}
                    onClick={() => showMessage("Calendar event opened")}
                  >
                    View event
                  </button>
                </div>

                <div style={styles.teamHubParentSideCard}>
                  <span style={styles.cardEyebrow}>CONVERSATION STARTER</span>
                  <h3>Ask: “What part of the game made you proud?”</h3>
                  <p>
                    Positive prompts help parents connect without making children
                    feel judged by statistics.
                  </p>
                </div>
              </aside>
            </div>
          )}

          {activeTab === "AI report" && (
            <div style={styles.teamHubParentReportGrid}>
              <article style={styles.teamHubInsightCard}>
                <span style={styles.teamHubConfidence}>
                  {selectedChild.confidence}% AI confidence
                </span>
                <h3>What the AI noticed</h3>
                <p>{selectedChild.aiSummary}</p>
              </article>

              <article style={styles.teamHubInsightCard}>
                <span style={styles.cardEyebrow}>DEVELOPMENT FOCUS</span>
                <h3>{selectedChild.development}</h3>
                <p>{selectedChild.nextStep}</p>
              </article>

              <article style={styles.teamHubInsightCard}>
                <span style={styles.cardEyebrow}>POSITIVE MOMENT</span>
                <h3>{selectedChild.parentMoment}</h3>
                <p>
                  This can later link directly to an automatically clipped video
                  highlight from the match.
                </p>
              </article>

              <article style={styles.teamHubFutureCard}>
                <span style={styles.cardEyebrow}>COMING WITH MATCHVISION VISION</span>
                <h3>Movement tracking and heat maps</h3>
                <p>
                  Future computer-vision features can show where your child moved,
                  repeated runs, touches, involvement zones and effort patterns in
                  real time.
                </p>
              </article>
            </div>
          )}

          {activeTab === "Next events" && (
            <div style={styles.teamHubEventList}>
              {[
                ["Tuesday 28 July · 6:00 PM", "U11 Team Training", "Main Pitch"],
                ["Thursday 30 July · 6:00 PM", "Match Preparation", "Main Pitch"],
                ["Saturday 1 August · 10:00 AM", "Dandenong City vs Springvale", "Away"],
              ].map((event) => (
                <article key={event[0]} style={styles.teamHubEventCard}>
                  <span>{event[0]}</span>
                  <h3>{event[1]}</h3>
                  <p>{event[2]}</p>
                  <button
                    type="button"
                    style={styles.secondaryButton}
                    onClick={() => showMessage(`${event[1]} opened`)}
                  >
                    View details
                  </button>
                </article>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div style={styles.teamHubHero}>
            <div>
              <span style={styles.eyebrow}>TEAM HUB · AI PERFORMANCE CENTRE</span>
              <h2 style={styles.teamHubHeroTitle}>
                Turn every match into a clearer coaching decision.
              </h2>
              <p style={styles.teamHubHeroText}>
                Coaches see squad-wide statistics, player development, workload,
                tactical patterns and AI-generated recommendations.
              </p>
            </div>

            <div style={styles.teamHubAiBadge}>
              <span style={styles.teamHubAiPulse} />
              <div>
                <strong>AI engine active</strong>
                <span>8 matches analysed this season</span>
              </div>
            </div>
          </div>

          <div style={styles.teamHubMetricGrid}>
            <div style={styles.teamHubMetricCard}>
              <span style={styles.summaryLabel}>Squad performance</span>
              <strong style={styles.teamHubMetricValue}>8.3</strong>
              <span style={styles.teamHubMetricPositive}>↑ 9% over 4 matches</span>
            </div>
            <div style={styles.teamHubMetricCard}>
              <span style={styles.summaryLabel}>Team goals</span>
              <strong style={styles.teamHubMetricValue}>24</strong>
              <span style={styles.summaryFooter}>2.2 per match</span>
            </div>
            <div style={styles.teamHubMetricCard}>
              <span style={styles.summaryLabel}>Chance creation</span>
              <strong style={styles.teamHubMetricValue}>41</strong>
              <span style={styles.teamHubMetricPositive}>↑ 14% this month</span>
            </div>
            <div style={styles.teamHubMetricCard}>
              <span style={styles.summaryLabel}>AI recommendations</span>
              <strong style={styles.teamHubMetricValue}>6</strong>
              <span style={styles.summaryFooter}>3 ready for next session</span>
            </div>
          </div>

          <div style={styles.teamHubTabs}>
            {["Squad", "AI insights", "Development", "Vision roadmap"].map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.teamHubTabButton,
                  ...(activeTab === tab ? styles.teamHubTabButtonActive : {}),
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Squad" && (
            <div style={styles.teamHubMainGrid}>
              <section style={styles.teamHubTableCard}>
                <div style={styles.teamHubSectionHeader}>
                  <div>
                    <span style={styles.cardEyebrow}>PLAYER ANALYTICS</span>
                    <h3 style={styles.cardTitle}>U11 Wallabies squad</h3>
                  </div>
                  <span style={styles.teamHubLiveTag}>Live season data</span>
                </div>

                <div style={styles.teamHubTableHeader}>
                  <span>Player</span>
                  <span>Rating</span>
                  <span>Goals</span>
                  <span>Assists</span>
                  <span>Attendance</span>
                  <span>Trend</span>
                </div>

                {teamHubPlayers.map((player) => (
                  <button
                    type="button"
                    key={player.id}
                    onClick={() => setSelectedPlayer(player)}
                    style={{
                      ...styles.teamHubPlayerRow,
                      ...(selectedPlayer.id === player.id
                        ? styles.teamHubPlayerRowActive
                        : {}),
                    }}
                  >
                    <span style={styles.teamHubPlayerIdentity}>
                      <span style={styles.avatar}>{player.number}</span>
                      <span>
                        <strong style={styles.playerName}>{player.name}</strong>
                        <small style={styles.playerRole}>
                          {player.position} · U11 Wallabies
                        </small>
                      </span>
                    </span>
                    <strong style={styles.teamHubRating}>{player.rating}</strong>
                    <span>{player.goals}</span>
                    <span>{player.assists}</span>
                    <span>{player.attendance}%</span>
                    <span style={styles.teamHubTrend}>{player.trend}</span>
                  </button>
                ))}
              </section>

              <aside style={styles.teamHubPlayerPanel}>
                <div style={styles.teamHubPlayerPanelHeader}>
                  <span style={styles.avatar}>{selectedPlayer.number}</span>
                  <div>
                    <span style={styles.cardEyebrow}>PLAYER PROFILE</span>
                    <h3 style={styles.teamHubPlayerTitle}>{selectedPlayer.name}</h3>
                    <span style={styles.playerRole}>
                      {selectedPlayer.position} · {selectedPlayer.minutes} minutes
                    </span>
                  </div>
                </div>

                <div style={styles.teamHubAiSummary}>
                  <span style={styles.insightLabel}>COACH AI SUMMARY</span>
                  <p>{selectedPlayer.coachInsight}</p>
                </div>

                <div style={styles.teamHubDevelopmentRow}>
                  <span>Development priority</span>
                  <strong>{selectedPlayer.development}</strong>
                </div>
                <div style={styles.teamHubDevelopmentRow}>
                  <span>Load risk</span>
                  <strong>{selectedPlayer.risk}</strong>
                </div>

                <button
                  type="button"
                  style={styles.parentCalendarReminderButton}
                  onClick={() => openFullReport(selectedPlayer)}
                >
                  Open full AI player report
                </button>
              </aside>
            </div>
          )}

          {activeTab === "AI insights" && (
            <div style={styles.teamHubInsightsGrid}>
              {teamHubInsights.map((insight, index) => (
                <article key={insight.title} style={styles.teamHubInsightCard}>
                  <div style={styles.teamHubInsightNumber}>0{index + 1}</div>
                  <span style={styles.teamHubConfidence}>{insight.confidence}</span>
                  <h3>{insight.title}</h3>
                  <p>{insight.detail}</p>
                  <div style={styles.teamHubRecommendedAction}>
                    <span>RECOMMENDED ACTION</span>
                    <strong>{insight.action}</strong>
                  </div>
                </article>
              ))}

              <article style={styles.teamHubAiCoachCard}>
                <span style={styles.cardEyebrow}>MATCHVISION AI COACH</span>
                <h3>Generate the next training focus</h3>
                <p>
                  Combine player trends, tactical patterns and attendance load
                  into a practical coaching session.
                </p>
                <button
                  type="button"
                  style={styles.saveButton}
                  onClick={() => showMessage("AI session recommendation generated")}
                >
                  Generate AI recommendation
                </button>
              </article>
            </div>
          )}

          {activeTab === "Development" && (
            <div style={styles.teamHubDevelopmentGrid}>
              {teamHubPlayers.map((player) => (
                <article key={player.id} style={styles.teamHubDevelopmentCard}>
                  <div style={styles.teamHubPlayerIdentity}>
                    <span style={styles.avatar}>{player.number}</span>
                    <span>
                      <strong style={styles.playerName}>{player.name}</strong>
                      <small style={styles.playerRole}>{player.position}</small>
                    </span>
                  </div>

                  <div style={styles.teamHubProgressLabel}>
                    <span>Season development</span>
                    <strong>{Math.round(player.rating * 10)}%</strong>
                  </div>

                  <div style={styles.teamHubProgressTrack}>
                    <span
                      style={{
                        ...styles.teamHubProgressFill,
                        width: `${Math.round(player.rating * 10)}%`,
                      }}
                    />
                  </div>

                  <div style={styles.teamHubDevelopmentPriority}>
                    <span>AI focus</span>
                    <strong>{player.development}</strong>
                  </div>

                  <button
                    type="button"
                    style={styles.secondaryButton}
                    onClick={() => openFullReport(player)}
                  >
                    View development plan
                  </button>
                </article>
              ))}
            </div>
          )}

          {activeTab === "Vision roadmap" && (
            <div style={styles.teamHubVisionGrid}>
              {[
                ["Live player tracking", "Automatically identify player movement, speed, distance and positioning during matches."],
                ["Heat maps", "Visualise where each player is most active and how their role changes over time."],
                ["Computer vision events", "Detect touches, passes, shots, recoveries, runs and key moments from match footage."],
                ["Real-time alerts", "Surface tactical patterns, fatigue signals and coaching opportunities during the game."],
              ].map((item, index) => (
                <article key={item[0]} style={styles.teamHubFutureCard}>
                  <span style={styles.teamHubInsightNumber}>0{index + 1}</span>
                  <h3>{item[0]}</h3>
                  <p>{item[1]}</p>
                  <span style={styles.teamHubRoadmapBadge}>Future MatchVision Vision</span>
                </article>
              ))}
            </div>
          )}

          <div style={styles.teamHubDifferentiator}>
            <div>
              <span style={styles.cardEyebrow}>WHY MATCHVISION IS DIFFERENT</span>
              <h3>Statistics become actions — not just numbers.</h3>
              <p>
                MatchVision links statistics to video, tactical patterns,
                workload and personalised development recommendations.
              </p>
            </div>

            <div style={styles.teamHubDifferentiatorSteps}>
              <span>1. Capture</span>
              <span>2. Analyse</span>
              <span>3. Explain</span>
              <span>4. Recommend</span>
            </div>
          </div>
        </>
      )}

      {fullReportOpen && (
        <div style={styles.modalOverlay} onClick={() => setFullReportOpen(false)}>
          <div
            style={styles.teamHubFullReportModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <span style={styles.cardEyebrow}>FULL AI PLAYER REPORT</span>
                <h3 style={styles.modalTitle}>{selectedPlayer.name}</h3>
                <p style={styles.modalSubtitle}>
                  MatchVision analysis · {selectedPlayer.confidence}% confidence
                </p>
              </div>

              <button
                type="button"
                style={styles.closeButton}
                onClick={() => setFullReportOpen(false)}
              >
                ×
              </button>
            </div>

            <div style={styles.teamHubFullReportBody}>
              <div style={styles.teamHubReportMetricGrid}>
                <div><span>AI rating</span><strong>{selectedPlayer.rating}</strong></div>
                <div><span>Goals</span><strong>{selectedPlayer.goals}</strong></div>
                <div><span>Assists</span><strong>{selectedPlayer.assists}</strong></div>
                <div><span>Attendance</span><strong>{selectedPlayer.attendance}%</strong></div>
              </div>

              <section style={styles.teamHubReportSection}>
                <span style={styles.insightLabel}>AI PERFORMANCE SUMMARY</span>
                <p>{role === "parent" ? selectedPlayer.aiSummary : selectedPlayer.coachInsight}</p>
              </section>

              <section style={styles.teamHubReportSection}>
                <span style={styles.insightLabel}>KEY STRENGTHS</span>
                <div style={styles.teamHubStrengthList}>
                  {selectedPlayer.strengths.map((strength) => (
                    <span key={strength}>{strength}</span>
                  ))}
                </div>
              </section>

              <section style={styles.teamHubReportSection}>
                <span style={styles.insightLabel}>NEXT DEVELOPMENT ACTION</span>
                <h3>{selectedPlayer.development}</h3>
                <p>{selectedPlayer.nextStep}</p>
              </section>

              <section style={styles.teamHubReportVisionPreview}>
                <span style={styles.insightLabel}>FUTURE VISION DATA</span>
                <div style={styles.teamHubMockPitch}>
                  <span style={styles.teamHubMockHeatOne} />
                  <span style={styles.teamHubMockHeatTwo} />
                  <span style={styles.teamHubMockHeatThree} />
                  <div style={styles.teamHubPitchLine} />
                </div>
                <p>
                  This area is designed for future live tracking, movement paths,
                  heat maps and computer-vision event detection.
                </p>
              </section>
            </div>

            <div style={styles.parentCalendarModalFooter}>
              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => setFullReportOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                style={styles.saveButton}
                onClick={() => showMessage("AI report shared")}
              >
                Share report
              </button>
            </div>
          </div>
        </div>
      )}

      {teamMessage && (
        <div style={styles.successToast}>
          <span style={styles.greenDot} />
          {teamMessage}
        </div>
      )}
    </div>
  );
}


const matchLibraryItems = [
  {
    id: 1,
    opponent: "Oakleigh United",
    date: "26 July 2026",
    score: "Springvale 3–2 Oakleigh",
    venue: "Springvale Reserve",
    duration: "61:24",
    status: "AI complete",
    visibility: "Team families",
    uploader: "Coach Lisa",
    childInvolved: true,
    highlights: 9,
    aiConfidence: 94,
  },
  {
    id: 2,
    opponent: "Dandenong City",
    date: "19 July 2026",
    score: "Dandenong 1–1 Springvale",
    venue: "Dandenong City SC",
    duration: "59:48",
    status: "AI complete",
    visibility: "Linked families only",
    uploader: "Parent Emma",
    childInvolved: true,
    highlights: 7,
    aiConfidence: 91,
  },
  {
    id: 3,
    opponent: "Noble Park",
    date: "12 July 2026",
    score: "Springvale 4–1 Noble Park",
    venue: "Springvale Reserve",
    duration: "60:13",
    status: "AI complete",
    visibility: "Coaches only",
    uploader: "Club Administrator",
    childInvolved: false,
    highlights: 12,
    aiConfidence: 96,
  },
  {
    id: 4,
    opponent: "Berwick Juniors",
    date: "5 July 2026",
    score: "Berwick 3–2 Springvale",
    venue: "Away",
    duration: "58:52",
    status: "Processing",
    visibility: "Team families",
    uploader: "Coach Lisa",
    childInvolved: true,
    highlights: 0,
    aiConfidence: 0,
  },
];

const coachAnalysisStats = [
  ["Possession", "54%", "+6%"],
  ["Shots", "14", "+4"],
  ["Shots on target", "8", "+3"],
  ["Pass completion", "76%", "+8%"],
  ["Final-third entries", "22", "+5"],
  ["Ball recoveries", "31", "+7"],
];

const parentAnalysisStats = [
  ["Minutes played", "54", "Full involvement"],
  ["Touches", "38", "+9 vs average"],
  ["Successful passes", "21", "78% complete"],
  ["Chances created", "4", "Team high"],
  ["Ball recoveries", "6", "+2 vs average"],
  ["Positive moments", "7", "AI identified"],
];

function MatchVideoPlaceholder({ match, compact = false }) {
  return (
    <div
      style={{
        ...styles.matchVideoFrame,
        ...(compact ? styles.matchVideoFrameCompact : {}),
      }}
    >
      <div style={styles.matchVideoPitch}>
        <span style={styles.matchVideoPlayerOne}>7</span>
        <span style={styles.matchVideoPlayerTwo}>10</span>
        <span style={styles.matchVideoPlayerThree}>4</span>
        <span style={styles.matchVideoBall}>●</span>
        <div style={styles.matchVideoCentreLine} />
      </div>

      <div style={styles.matchVideoOverlay}>
        <span style={styles.matchVideoPlay}>▶</span>
        <div>
          <strong>{match.score}</strong>
          <span>{match.date} · {match.duration}</span>
        </div>
      </div>
    </div>
  );
}

function MatchLibraryPage({ role = "parent" }) {
  const setRole = () => {};
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMatch, setSelectedMatch] = useState(matchLibraryItems[0]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [uploadStage, setUploadStage] = useState("ready");
  const [message, setMessage] = useState("");

  const visibleMatches = matchLibraryItems.filter((match) => {
    const searchable = [
      match.opponent,
      match.date,
      match.score,
      match.venue,
      match.status,
      match.visibility,
      match.uploader,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchable.includes(searchTerm.toLowerCase());

    if (role === "parent") {
      return matchesSearch && match.childInvolved && match.visibility !== "Coaches only";
    }

    return matchesSearch;
  });

  function toast(text) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 3000);
  }

  function startUpload(event) {
    event.preventDefault();
    setUploadStage("uploading");

    window.setTimeout(() => {
      setUploadStage("analysing");
    }, 900);

    window.setTimeout(() => {
      setUploadStage("complete");
      toast("Match uploaded — AI analysis has started");
    }, 1900);
  }

  return (
    <div style={styles.attendancePage}>
      <div style={styles.matchRoleBar}>
        <div>
          <span style={styles.cardEyebrow}>DEMO ACCESS VIEW</span>
          <h3 style={styles.teamHubRoleTitle}>
            Match Library permissions and privacy
          </h3>
        </div>

        <div style={styles.teamHubRoleToggle}>
          {["parent", "coach", "admin"].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setRole(item)}
              style={{
                ...styles.teamHubRoleButton,
                ...(role === item ? styles.teamHubRoleButtonActive : {}),
              }}
            >
              {item === "parent"
                ? "Parent"
                : item === "coach"
                  ? "Coach"
                  : "Admin"}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.matchLibraryHero}>
        <div>
          <span style={styles.eyebrow}>MATCH LIBRARY · VIDEO + AI</span>
          <h2 style={styles.teamHubHeroTitle}>
            Upload one game. Unlock a complete view of every important moment.
          </h2>
          <p style={styles.teamHubHeroText}>
            Parents and coaches can upload match footage when club permissions
            allow it. MatchVision securely stores the game, detects players and
            events, and creates different AI reports for families and coaches.
          </p>
        </div>

        <div style={styles.matchHeroActions}>
          <button
            type="button"
            style={styles.primaryButton}
            onClick={() => setUploadOpen(true)}
          >
            ⬆ Upload match
          </button>

          {role === "admin" && (
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={() => setPrivacyOpen(true)}
            >
              ⚙ Privacy controls
            </button>
          )}
        </div>
      </div>

      <div style={styles.matchPermissionStrip}>
        <span style={styles.matchPermissionIcon}>
          {role === "parent" ? "👨‍👩‍👧" : role === "coach" ? "⚽" : "🛡"}
        </span>
        <div>
          <strong>
            {role === "parent"
              ? "Parents see matches involving their linked children"
              : role === "coach"
                ? "Coaches see the full team library and squad analysis"
                : "Administrators control upload, viewing and sharing permissions"}
          </strong>
          <p>
            {role === "parent"
              ? "Your AI report focuses on your child’s involvement, progress, highlights and next development step."
              : role === "coach"
                ? "Your AI report includes team shape, tactical patterns, player comparisons, workload and training recommendations."
                : "Set who may upload, who can view raw footage, and whether AI reports are shared with families."}
          </p>
        </div>
      </div>

      <div style={styles.matchLibraryMetrics}>
        <div style={styles.teamHubMetricCard}>
          <span style={styles.summaryLabel}>Matches stored</span>
          <strong style={styles.teamHubMetricValue}>
            {role === "parent" ? "3" : "18"}
          </strong>
          <span style={styles.summaryFooter}>
            {role === "parent" ? "Featuring your child" : "Across the season"}
          </span>
        </div>
        <div style={styles.teamHubMetricCard}>
          <span style={styles.summaryLabel}>AI analysed</span>
          <strong style={styles.teamHubMetricValue}>
            {role === "parent" ? "2" : "16"}
          </strong>
          <span style={styles.teamHubMetricPositive}>Ready to review</span>
        </div>
        <div style={styles.teamHubMetricCard}>
          <span style={styles.summaryLabel}>Highlights detected</span>
          <strong style={styles.teamHubMetricValue}>
            {role === "parent" ? "16" : "126"}
          </strong>
          <span style={styles.summaryFooter}>Goals, passes, saves and more</span>
        </div>
        <div style={styles.teamHubMetricCard}>
          <span style={styles.summaryLabel}>Storage privacy</span>
          <strong style={styles.matchPrivacyMetric}>Club controlled</strong>
          <span style={styles.summaryFooter}>Role-based access</span>
        </div>
      </div>

      <section style={styles.parentCalendarSearchPanel}>
        <div style={styles.parentCalendarSearchRow}>
          <div style={styles.parentCalendarSearchBox}>
            <span style={styles.parentCalendarSearchIcon}>⌕</span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search opponent, date, venue, score, uploader or privacy..."
              style={styles.parentCalendarSearchInput}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                style={styles.parentCalendarClearButton}
              >
                Clear
              </button>
            )}
          </div>

          <span style={styles.parentCalendarMonthBadge}>
            {visibleMatches.length} matches
          </span>
        </div>
      </section>

      <div style={styles.matchLibraryGrid}>
        <section style={styles.matchLibraryListCard}>
          <div style={styles.teamHubSectionHeader}>
            <div>
              <span style={styles.cardEyebrow}>SECURE VIDEO LIBRARY</span>
              <h3 style={styles.cardTitle}>
                {role === "parent"
                  ? "Matches featuring your child"
                  : "U11 Wallabies matches"}
              </h3>
            </div>
          </div>

          <div style={styles.matchLibraryList}>
            {visibleMatches.map((match) => (
              <button
                type="button"
                key={match.id}
                onClick={() => setSelectedMatch(match)}
                style={{
                  ...styles.matchLibraryItem,
                  ...(selectedMatch.id === match.id
                    ? styles.matchLibraryItemActive
                    : {}),
                }}
              >
                <span style={styles.matchLibraryThumbnail}>
                  <span>▶</span>
                </span>

                <span style={styles.matchLibraryItemMain}>
                  <span style={styles.matchLibraryItemTop}>
                    <strong>{match.score}</strong>
                    <span
                      style={{
                        ...styles.matchStatusBadge,
                        ...(match.status === "AI complete"
                          ? styles.matchStatusComplete
                          : styles.matchStatusProcessing),
                      }}
                    >
                      {match.status}
                    </span>
                  </span>
                  <span>{match.date} · {match.venue}</span>
                  <small>
                    Uploaded by {match.uploader} · {match.visibility}
                  </small>
                </span>

                <span style={styles.parentCalendarChevron}>›</span>
              </button>
            ))}
          </div>
        </section>

        <aside style={styles.matchLibraryPreviewCard}>
          <MatchVideoPlaceholder match={selectedMatch} />

          <div style={styles.matchLibraryPreviewHeader}>
            <div>
              <span style={styles.cardEyebrow}>SELECTED MATCH</span>
              <h3>{selectedMatch.score}</h3>
              <p>{selectedMatch.date} · {selectedMatch.venue}</p>
            </div>

            <span style={styles.teamHubConfidence}>
              {selectedMatch.aiConfidence
                ? `${selectedMatch.aiConfidence}% AI confidence`
                : "AI processing"}
            </span>
          </div>

          <div style={styles.matchPreviewStats}>
            <div>
              <span>Duration</span>
              <strong>{selectedMatch.duration}</strong>
            </div>
            <div>
              <span>Highlights</span>
              <strong>{selectedMatch.highlights}</strong>
            </div>
            <div>
              <span>Access</span>
              <strong>{selectedMatch.visibility}</strong>
            </div>
          </div>

          <div style={styles.matchAiExplainer}>
            <span style={styles.insightLabel}>
              {role === "parent" ? "YOUR CHILD'S AI REPORT" : "TEAM AI REPORT"}
            </span>
            <p>
              {role === "parent"
                ? "See your child’s touches, involvement, positive moments, strengths, development focus and automatically detected highlights."
                : "Review team shape, possession patterns, chances, transitions, individual performance, tactical issues and recommended training actions."}
            </p>
          </div>

          <button
            type="button"
            disabled={selectedMatch.status !== "AI complete"}
            style={{
              ...styles.parentCalendarReminderButton,
              ...(selectedMatch.status !== "AI complete"
                ? styles.matchDisabledButton
                : {}),
            }}
            onClick={() => setAnalysisOpen(true)}
          >
            ✦ Open AI match analysis
          </button>
        </aside>
      </div>

      <div style={styles.matchPipeline}>
        <div>
          <span>1</span>
          <strong>Upload securely</strong>
          <small>Phone, iPad or camera footage</small>
        </div>
        <div>
          <span>2</span>
          <strong>AI detects the game</strong>
          <small>Players, actions and key moments</small>
        </div>
        <div>
          <span>3</span>
          <strong>Reports are separated</strong>
          <small>Parent, coach and admin views</small>
        </div>
        <div>
          <span>4</span>
          <strong>Turn insight into action</strong>
          <small>Highlights and training plans</small>
        </div>
      </div>

      {uploadOpen && (
        <div style={styles.modalOverlay} onClick={() => setUploadOpen(false)}>
          <form
            style={styles.matchUploadModal}
            onSubmit={startUpload}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <span style={styles.cardEyebrow}>UPLOAD MATCH FOOTAGE</span>
                <h3 style={styles.modalTitle}>Add a game to MatchVision</h3>
                <p style={styles.modalSubtitle}>
                  Upload rights and final visibility are controlled by the club.
                </p>
              </div>
              <button
                type="button"
                style={styles.closeButton}
                onClick={() => setUploadOpen(false)}
              >
                ×
              </button>
            </div>

            <div style={styles.matchUploadBody}>
              <label style={styles.matchUploadDropzone}>
                <input
                  type="file"
                  accept="video/*"
                  style={styles.matchHiddenFile}
                  onChange={(event) =>
                    setSelectedFileName(event.target.files?.[0]?.name || "")
                  }
                />
                <span style={styles.matchUploadIcon}>⬆</span>
                <strong>
                  {selectedFileName || "Choose match video from your device"}
                </strong>
                <small>MP4, MOV or supported video format</small>
              </label>

              <div style={styles.parentCalendarFormGrid}>
                <label style={styles.parentCalendarField}>
                  <span>Match date</span>
                  <input
                    type="date"
                    defaultValue="2026-08-01"
                    style={styles.parentCalendarInput}
                  />
                </label>
                <label style={styles.parentCalendarField}>
                  <span>Opponent</span>
                  <input
                    defaultValue="Dandenong City"
                    style={styles.parentCalendarInput}
                  />
                </label>
              </div>

              <label style={styles.parentCalendarField}>
                <span>Who may see the raw match video?</span>
                <select style={styles.parentCalendarInput} defaultValue="Team families">
                  <option>Coaches and admins only</option>
                  <option>Team families</option>
                  <option>Linked player families only</option>
                  <option>Admin approval required</option>
                </select>
              </label>

              <label style={styles.parentCalendarField}>
                <span>Who may upload?</span>
                <select
                  style={styles.parentCalendarInput}
                  defaultValue={role === "parent" ? "Parent upload — pending approval" : "Approved uploader"}
                >
                  <option>Approved uploader</option>
                  <option>Parent upload — pending approval</option>
                  <option>Coach upload</option>
                  <option>Administrator upload</option>
                </select>
              </label>

              <div style={styles.matchConsentBox}>
                <strong>Safeguarding and consent</strong>
                <p>
                  MatchVision will apply the club’s consent records and prevent
                  unauthorised families from viewing players or footage.
                </p>
              </div>

              {uploadStage !== "ready" && (
                <div style={styles.matchUploadProgress}>
                  <span
                    style={{
                      ...styles.matchUploadProgressFill,
                      width:
                        uploadStage === "uploading"
                          ? "42%"
                          : uploadStage === "analysing"
                            ? "78%"
                            : "100%",
                    }}
                  />
                  <strong>
                    {uploadStage === "uploading"
                      ? "Uploading footage…"
                      : uploadStage === "analysing"
                        ? "Preparing AI analysis…"
                        : "Upload complete"}
                  </strong>
                </div>
              )}
            </div>

            <div style={styles.parentCalendarModalFooter}>
              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => setUploadOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" style={styles.saveButton}>
                Upload and analyse
              </button>
            </div>
          </form>
        </div>
      )}

      {privacyOpen && (
        <div style={styles.modalOverlay} onClick={() => setPrivacyOpen(false)}>
          <div
            style={styles.matchPrivacyModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <span style={styles.cardEyebrow}>CLUB GOVERNANCE</span>
                <h3 style={styles.modalTitle}>Match privacy controls</h3>
                <p style={styles.modalSubtitle}>
                  Control uploads, footage access and AI report sharing.
                </p>
              </div>
              <button
                type="button"
                style={styles.closeButton}
                onClick={() => setPrivacyOpen(false)}
              >
                ×
              </button>
            </div>

            <div style={styles.matchPrivacyBody}>
              {[
                ["Allow approved parents to upload footage", true],
                ["Require admin approval before parent uploads are published", true],
                ["Allow coaches to view complete squad analysis", true],
                ["Share child-specific AI reports with linked parents", true],
                ["Allow parents to view full raw match footage", false],
                ["Allow families to download original match files", false],
                ["Automatically hide players without current media consent", true],
              ].map((control) => (
                <label key={control[0]} style={styles.matchPrivacyControl}>
                  <span>
                    <strong>{control[0]}</strong>
                    <small>Applies to all new U11 match uploads</small>
                  </span>
                  <input type="checkbox" defaultChecked={control[1]} />
                </label>
              ))}
            </div>

            <div style={styles.parentCalendarModalFooter}>
              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => setPrivacyOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                style={styles.saveButton}
                onClick={() => {
                  setPrivacyOpen(false);
                  toast("Club privacy settings saved");
                }}
              >
                Save controls
              </button>
            </div>
          </div>
        </div>
      )}

      {analysisOpen && (
        <MatchAnalysisModal
          role={role}
          match={selectedMatch}
          onClose={() => setAnalysisOpen(false)}
          onToast={toast}
        />
      )}

      {message && (
        <div style={styles.successToast}>
          <span style={styles.greenDot} />
          {message}
        </div>
      )}
    </div>
  );
}

function MatchAnalysisModal({ role, match, onClose, onToast }) {
  const [analysisTab, setAnalysisTab] = useState(
    role === "parent" ? "My child" : "Team overview"
  );

  const parentTabs = ["My child", "Highlights", "Development"];
  const coachTabs = ["Team overview", "Players", "Tactics", "Training plan"];
  const tabs = role === "parent" ? parentTabs : coachTabs;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div
        style={styles.matchAnalysisModal}
        onClick={(event) => event.stopPropagation()}
      >
        <div style={styles.modalHeader}>
          <div>
            <span style={styles.cardEyebrow}>MATCHVISION AI ANALYSIS</span>
            <h3 style={styles.modalTitle}>{match.score}</h3>
            <p style={styles.modalSubtitle}>
              {match.date} · {match.aiConfidence}% AI confidence ·{" "}
              {role === "parent" ? "Child-specific report" : "Full-team report"}
            </p>
          </div>
          <button type="button" style={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div style={styles.matchAnalysisBody}>
          <div style={styles.teamHubTabs}>
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setAnalysisTab(tab)}
                style={{
                  ...styles.teamHubTabButton,
                  ...(analysisTab === tab ? styles.teamHubTabButtonActive : {}),
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {role === "parent" ? (
            <ParentMatchAnalysis tab={analysisTab} match={match} onToast={onToast} />
          ) : (
            <CoachMatchAnalysis tab={analysisTab} match={match} onToast={onToast} />
          )}
        </div>
      </div>
    </div>
  );
}

function ParentMatchAnalysis({ tab, match, onToast }) {
  if (tab === "Highlights") {
    return (
      <div style={styles.matchHighlightGrid}>
        {[
          ["18:42", "Chance created", "Ava found space and played a measured pass behind the defence."],
          ["31:08", "Defensive recovery", "Ava sprinted back and helped stop a counter-attack."],
          ["44:15", "Assist", "A first-time cut-back created the winning goal."],
        ].map((highlight) => (
          <article key={highlight[0]} style={styles.matchHighlightCard}>
            <div style={styles.matchHighlightPreview}>
              <span>▶</span>
              <strong>{highlight[0]}</strong>
            </div>
            <h3>{highlight[1]}</h3>
            <p>{highlight[2]}</p>
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={() => onToast(`${highlight[1]} clip opened`)}
            >
              Watch clip
            </button>
          </article>
        ))}
      </div>
    );
  }

  if (tab === "Development") {
    return (
      <div style={styles.matchAnalysisTwoColumn}>
        <article style={styles.teamHubInsightCard}>
          <span style={styles.cardEyebrow}>WHAT WENT WELL</span>
          <h3>Confident attacking involvement</h3>
          <p>
            Ava repeatedly moved into useful wide areas and created four chances
            for teammates.
          </p>
          <div style={styles.teamHubStrengthList}>
            <span>Movement</span>
            <span>Creativity</span>
            <span>Recovery effort</span>
          </div>
        </article>

        <article style={styles.teamHubFutureCard}>
          <span style={styles.cardEyebrow}>NEXT DEVELOPMENT STEP</span>
          <h3>Look up before the final action</h3>
          <p>
            Encourage Ava to scan before crossing so she can choose between a
            pass, cut-back or shot.
          </p>
          <div style={styles.matchHomeActivity}>
            <strong>Simple home activity</strong>
            <span>10 minutes · cones or household markers · no pressure</span>
          </div>
        </article>

        <article style={styles.teamHubInsightCard}>
          <span style={styles.cardEyebrow}>POSITIVE CONVERSATION STARTER</span>
          <h3>“Which moment made you feel most confident?”</h3>
          <p>
            This keeps the conversation centred on the child’s experience rather
            than judging performance only by numbers.
          </p>
        </article>

        <article style={styles.teamHubFutureCard}>
          <span style={styles.cardEyebrow}>FUTURE MATCHVISION VISION</span>
          <h3>Personal movement map</h3>
          <p>
            Future tracking can show Ava’s involvement zones, repeated runs,
            touches and movement patterns during the game.
          </p>
        </article>
      </div>
    );
  }

  return (
    <>
      <div style={styles.matchAnalysisIntro}>
        <div>
          <span style={styles.cardEyebrow}>AVA'S MATCH STORY</span>
          <h3>A creative and hard-working performance</h3>
          <p>
            Ava helped create the winning goal, made several positive attacking
            runs and showed improved effort when the team lost possession.
          </p>
        </div>
        <div style={styles.matchAnalysisRating}>
          <span>AI match rating</span>
          <strong>8.8</strong>
          <small>↑ 0.4 above season average</small>
        </div>
      </div>

      <div style={styles.matchAnalysisStatGrid}>
        {parentAnalysisStats.map((stat) => (
          <div key={stat[0]} style={styles.matchAnalysisStatCard}>
            <span>{stat[0]}</span>
            <strong>{stat[1]}</strong>
            <small>{stat[2]}</small>
          </div>
        ))}
      </div>

      <div style={styles.matchAnalysisTwoColumn}>
        <article style={styles.teamHubInsightCard}>
          <span style={styles.cardEyebrow}>AI EXPLAINS THE GAME</span>
          <h3>What the numbers mean</h3>
          <p>
            Ava was involved more often than usual and created the most chances
            on the team. Her strongest moments came when she received the ball
            wide and drove towards goal.
          </p>
        </article>

        <article style={styles.teamHubInsightCard}>
          <span style={styles.cardEyebrow}>SPECIAL MOMENT</span>
          <h3>Winning assist · 44:15</h3>
          <p>
            MatchVision detected Ava’s first-time cut-back and automatically
            prepared it as a family highlight.
          </p>
          <button
            type="button"
            style={styles.saveButton}
            onClick={() => onToast("Winning assist highlight opened")}
          >
            Watch the moment
          </button>
        </article>
      </div>
    </>
  );
}

function CoachMatchAnalysis({ tab, match, onToast }) {
  if (tab === "Players") {
    return (
      <div style={styles.matchCoachPlayerTable}>
        <div style={styles.matchCoachPlayerHeader}>
          <span>Player</span>
          <span>Rating</span>
          <span>Touches</span>
          <span>Pass %</span>
          <span>Key action</span>
          <span>Load</span>
        </div>
        {[
          ["Ava Thompson", "8.8", "38", "78%", "4 chances", "Normal"],
          ["Mia Rodriguez", "8.5", "51", "84%", "7 key passes", "Normal"],
          ["Lily Chen", "8.2", "44", "81%", "6 interceptions", "Normal"],
          ["Sophie Williams", "7.7", "29", "68%", "5 saves", "Review"],
          ["Ruby Anderson", "8.4", "57", "86%", "9 recoveries", "Normal"],
        ].map((player) => (
          <button
            type="button"
            key={player[0]}
            style={styles.matchCoachPlayerRow}
            onClick={() => onToast(`${player[0]} analysis opened`)}
          >
            {player.map((value) => <span key={value}>{value}</span>)}
          </button>
        ))}
      </div>
    );
  }

  if (tab === "Tactics") {
    return (
      <div style={styles.matchAnalysisTwoColumn}>
        <article style={styles.teamHubInsightCard}>
          <span style={styles.teamHubConfidence}>94% confidence</span>
          <h3>Right-side combinations created the best chances</h3>
          <p>
            61% of successful final-third entries came through Ava and Mia
            combining on the right.
          </p>
          <div style={styles.teamHubRecommendedAction}>
            <span>COACHING ACTION</span>
            <strong>Rehearse overlap and cut-back patterns on Thursday.</strong>
          </div>
        </article>

        <article style={styles.teamHubInsightCard}>
          <span style={styles.teamHubConfidence}>91% confidence</span>
          <h3>Pressing improved after half-time</h3>
          <p>
            Recovery time fell from 7.2 seconds to 5.9 seconds after the team
            narrowed its shape.
          </p>
          <div style={styles.teamHubRecommendedAction}>
            <span>COACHING ACTION</span>
            <strong>Use the second-half shape as the next match baseline.</strong>
          </div>
        </article>

        <article style={styles.teamHubFutureCard}>
          <span style={styles.cardEyebrow}>VISION ROADMAP</span>
          <h3>Team heat map and movement tracking</h3>
          <div style={styles.teamHubMockPitch}>
            <span style={styles.teamHubMockHeatOne} />
            <span style={styles.teamHubMockHeatTwo} />
            <span style={styles.teamHubMockHeatThree} />
            <div style={styles.teamHubPitchLine} />
          </div>
          <p>
            Future computer vision can track team width, compactness, player
            runs, speeds and positional occupation in real time.
          </p>
        </article>

        <article style={styles.teamHubInsightCard}>
          <span style={styles.cardEyebrow}>TRANSITION WARNING</span>
          <h3>Left side was exposed after turnovers</h3>
          <p>
            Three of the opposition’s four strongest transitions began after
            possession was lost in the left half-space.
          </p>
        </article>
      </div>
    );
  }

  if (tab === "Training plan") {
    return (
      <div style={styles.matchTrainingPlan}>
        <div style={styles.matchTrainingPlanHeader}>
          <div>
            <span style={styles.cardEyebrow}>AI-GENERATED SESSION</span>
            <h3>Thursday: wide combinations and transition recovery</h3>
            <p>75 minutes · U11 Wallabies · Based on this match</p>
          </div>
          <button
            type="button"
            style={styles.saveButton}
            onClick={() => onToast("Training plan saved to Coach Resources")}
          >
            Save training plan
          </button>
        </div>

        {[
          ["10 min", "Arrival activity", "Scanning and passing in pairs"],
          ["15 min", "Technical practice", "Overlap, underlap and cut-back choices"],
          ["20 min", "Position game", "Create overloads on the right side"],
          ["20 min", "Transition game", "Recover compact shape within six seconds"],
          ["10 min", "Review", "Player-led reflection and cool-down"],
        ].map((stage) => (
          <div key={stage[0]} style={styles.matchTrainingStage}>
            <span>{stage[0]}</span>
            <strong>{stage[1]}</strong>
            <p>{stage[2]}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div style={styles.matchAnalysisIntro}>
        <div>
          <span style={styles.cardEyebrow}>COACH MATCH SUMMARY</span>
          <h3>Strong chance creation, improved transitions, one load concern</h3>
          <p>
            MatchVision combined match events, player involvement and tactical
            patterns to identify the most important coaching decisions.
          </p>
        </div>
        <div style={styles.matchAnalysisRating}>
          <span>Team performance</span>
          <strong>8.3</strong>
          <small>↑ 9% over four matches</small>
        </div>
      </div>

      <div style={styles.matchAnalysisStatGrid}>
        {coachAnalysisStats.map((stat) => (
          <div key={stat[0]} style={styles.matchAnalysisStatCard}>
            <span>{stat[0]}</span>
            <strong>{stat[1]}</strong>
            <small>{stat[2]}</small>
          </div>
        ))}
      </div>

      <div style={styles.matchAnalysisTwoColumn}>
        <article style={styles.teamHubInsightCard}>
          <span style={styles.cardEyebrow}>AI MATCH SUMMARY</span>
          <h3>Why Springvale won</h3>
          <p>
            The team created repeated overloads on the right, recovered the ball
            faster after half-time and generated eight shots on target.
          </p>
        </article>

        <article style={styles.teamHubFutureCard}>
          <span style={styles.cardEyebrow}>TOP RECOMMENDATION</span>
          <h3>Protect the left side during attacking transitions</h3>
          <p>
            Keep the holding midfielder connected when the left fullback
            advances.
          </p>
        </article>
      </div>
    </>
  );
}

function AIAnalysisPage({ role = "coach" }) {
  const setRole = () => {};
  const [selectedMatch, setSelectedMatch] = useState(matchLibraryItems[0]);
  const [analysisOpen, setAnalysisOpen] = useState(true);
  const [message, setMessage] = useState("");

  return (
    <div style={styles.attendancePage}>
      <div style={styles.matchRoleBar}>
        <div>
          <span style={styles.cardEyebrow}>AI ANALYTICS DEMONSTRATION</span>
          <h3 style={styles.teamHubRoleTitle}>Separate reports for each role</h3>
        </div>

        <div style={styles.teamHubRoleToggle}>
          {["parent", "coach"].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => {
                setRole(item);
                setAnalysisOpen(true);
              }}
              style={{
                ...styles.teamHubRoleButton,
                ...(role === item ? styles.teamHubRoleButtonActive : {}),
              }}
            >
              {item === "parent" ? "Parent report" : "Coach report"}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.matchLibraryHero}>
        <div>
          <span style={styles.eyebrow}>MATCHVISION AI ANALYTICS</span>
          <h2 style={styles.teamHubHeroTitle}>
            The same match becomes the right report for the right person.
          </h2>
          <p style={styles.teamHubHeroText}>
            Parents receive encouraging, child-specific insights. Coaches
            receive team-wide tactical analysis, player comparisons, workload
            indicators and practical training recommendations.
          </p>
        </div>
      </div>

      <div style={styles.matchAnalysisLandingGrid}>
        <section style={styles.matchLibraryPreviewCard}>
          <MatchVideoPlaceholder match={selectedMatch} />
          <div style={styles.matchLibraryPreviewHeader}>
            <div>
              <span style={styles.cardEyebrow}>ANALYSED MATCH</span>
              <h3>{selectedMatch.score}</h3>
              <p>{selectedMatch.date} · {selectedMatch.venue}</p>
            </div>
            <span style={styles.teamHubConfidence}>
              {selectedMatch.aiConfidence}% confidence
            </span>
          </div>
        </section>

        <aside style={styles.matchLibraryListCard}>
          <div style={styles.teamHubSectionHeader}>
            <div>
              <span style={styles.cardEyebrow}>CHOOSE MATCH</span>
              <h3 style={styles.cardTitle}>Completed AI reports</h3>
            </div>
          </div>
          {matchLibraryItems
            .filter((match) => match.status === "AI complete")
            .map((match) => (
              <button
                type="button"
                key={match.id}
                onClick={() => {
                  setSelectedMatch(match);
                  setAnalysisOpen(true);
                }}
                style={{
                  ...styles.matchLibraryItem,
                  ...(selectedMatch.id === match.id
                    ? styles.matchLibraryItemActive
                    : {}),
                }}
              >
                <span style={styles.matchLibraryThumbnail}>✦</span>
                <span style={styles.matchLibraryItemMain}>
                  <strong>{match.score}</strong>
                  <span>{match.date}</span>
                  <small>{match.aiConfidence}% AI confidence</small>
                </span>
                <span style={styles.parentCalendarChevron}>›</span>
              </button>
            ))}
        </aside>
      </div>

      <button
        type="button"
        style={styles.parentCalendarReminderButton}
        onClick={() => setAnalysisOpen(true)}
      >
        Open interactive {role === "parent" ? "parent" : "coach"} AI report
      </button>

      {analysisOpen && (
        <MatchAnalysisModal
          role={role}
          match={selectedMatch}
          onClose={() => setAnalysisOpen(false)}
          onToast={(text) => {
            setMessage(text);
            window.setTimeout(() => setMessage(""), 3000);
          }}
        />
      )}

      {message && (
        <div style={styles.successToast}>
          <span style={styles.greenDot} />
          {message}
        </div>
      )}
    </div>
  );
}


const messageDirectory = {
  parent: [
    {
      id: 1,
      name: "Coach Lisa Morgan",
      role: "Head Coach",
      group: "Coaches",
      email: "lisa.morgan@springvalewallabies.com.au",
      phone: "0400 555 101",
      canMessage: true,
      status: "Online",
    },
    {
      id: 2,
      name: "Daniel Brooks",
      role: "Assistant Coach",
      group: "Coaches",
      email: "daniel.brooks@springvalewallabies.com.au",
      phone: "0400 555 118",
      canMessage: true,
      status: "Away",
    },
    {
      id: 3,
      name: "Sarah Nguyen",
      role: "Club President",
      group: "Club Leadership",
      email: "president@springvalewallabies.com.au",
      phone: "03 9555 0199",
      canMessage: true,
      status: "Office hours",
    },
    {
      id: 4,
      name: "Safeguarding Officer",
      role: "Child Safety Contact",
      group: "Club Leadership",
      email: "safeguarding@springvalewallabies.com.au",
      phone: "03 9555 0112",
      canMessage: true,
      status: "Confidential",
    },
  ],
  coach: [
    {
      id: 1,
      name: "Sarah Nguyen",
      role: "Club President",
      group: "Administration",
      email: "president@springvalewallabies.com.au",
      phone: "03 9555 0199",
      canMessage: true,
      status: "Online",
    },
    {
      id: 2,
      name: "Michael Costa",
      role: "Club Administrator",
      group: "Administration",
      email: "admin@springvalewallabies.com.au",
      phone: "03 9555 0100",
      canMessage: true,
      status: "Online",
    },
    {
      id: 3,
      name: "Daniel Brooks",
      role: "Assistant Coach",
      group: "Coaching Staff",
      email: "daniel.brooks@springvalewallabies.com.au",
      phone: "0400 555 118",
      canMessage: true,
      status: "Away",
    },
    {
      id: 4,
      name: "Emma Thompson",
      role: "Parent of Ava",
      group: "U11 Parents",
      email: "emma.thompson@example.com",
      phone: "0400 555 221",
      canMessage: true,
      status: "Parent",
    },
    {
      id: 5,
      name: "Wei Chen",
      role: "Parent of Lily",
      group: "U11 Parents",
      email: "wei.chen@example.com",
      phone: "0400 555 226",
      canMessage: true,
      status: "Parent",
    },
    {
      id: 6,
      name: "Maria Rodriguez",
      role: "Parent of Mia",
      group: "U11 Parents",
      email: "maria.rodriguez@example.com",
      phone: "0400 555 229",
      canMessage: true,
      status: "Parent",
    },
  ],
  admin: [
    {
      id: 1,
      name: "Sarah Nguyen",
      role: "Club President",
      group: "Executive",
      email: "president@springvalewallabies.com.au",
      phone: "03 9555 0199",
      canMessage: true,
      status: "Online",
    },
    {
      id: 2,
      name: "Coach Lisa Morgan",
      role: "U11 Head Coach",
      group: "Coaches",
      email: "lisa.morgan@springvalewallabies.com.au",
      phone: "0400 555 101",
      canMessage: true,
      status: "Online",
    },
    {
      id: 3,
      name: "Daniel Brooks",
      role: "Assistant Coach",
      group: "Coaches",
      email: "daniel.brooks@springvalewallabies.com.au",
      phone: "0400 555 118",
      canMessage: true,
      status: "Away",
    },
    {
      id: 4,
      name: "Emma Thompson",
      role: "Parent of Ava",
      group: "Parents",
      email: "emma.thompson@example.com",
      phone: "0400 555 221",
      canMessage: true,
      status: "Parent",
    },
    {
      id: 5,
      name: "Wei Chen",
      role: "Parent of Lily",
      group: "Parents",
      email: "wei.chen@example.com",
      phone: "0400 555 226",
      canMessage: true,
      status: "Parent",
    },
    {
      id: 6,
      name: "Grounds Coordinator",
      role: "Operations",
      group: "Staff",
      email: "grounds@springvalewallabies.com.au",
      phone: "0400 555 330",
      canMessage: true,
      status: "Staff",
    },
  ],
};

const messageThreads = [
  {
    id: 1,
    title: "U11 coaching staff",
    audience: "Coaches",
    sender: "Coach Lisa",
    preview: "Thursday's session plan has been updated from the latest AI report.",
    time: "8:42 PM",
    unread: 3,
    priority: "Action required",
  },
  {
    id: 2,
    title: "U11 parents",
    audience: "Parents",
    sender: "Club Admin",
    preview: "Please confirm attendance for Saturday before 6:00 PM Thursday.",
    time: "6:15 PM",
    unread: 8,
    priority: "Deadline",
  },
  {
    id: 3,
    title: "Ava Thompson family",
    audience: "Private family",
    sender: "Coach Lisa",
    preview: "Ava's new match highlight and development note are ready.",
    time: "Yesterday",
    unread: 1,
    priority: "Player update",
  },
  {
    id: 4,
    title: "Club leadership",
    audience: "Admin",
    sender: "Sarah Nguyen",
    preview: "The monthly participation and safeguarding report is available.",
    time: "Monday",
    unread: 0,
    priority: "Information",
  },
];

function getVisibleDirectory(role) {
  return messageDirectory[role] || messageDirectory.parent;
}

function MessagesPage({ role = "parent" }) {
  const contacts = getVisibleDirectory(role);
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("All");
  const [selectedThread, setSelectedThread] = useState(messageThreads[0]);
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [toastText, setToastText] = useState("");
  const [aiRewrite, setAiRewrite] = useState(false);

  const groups = ["All", ...Array.from(new Set(contacts.map((contact) => contact.group)))];

  const filteredContacts = contacts.filter((contact) => {
    const matchesGroup = activeGroup === "All" || contact.group === activeGroup;
    const searchable = [
      contact.name,
      contact.role,
      contact.group,
      contact.email,
      contact.phone,
    ]
      .join(" ")
      .toLowerCase();

    return matchesGroup && searchable.includes(search.toLowerCase());
  });

  const visibleThreads = messageThreads.filter((thread) => {
    if (role === "parent") {
      return ["Parents", "Private family"].includes(thread.audience);
    }

    if (role === "coach") {
      return thread.audience !== "Admin";
    }

    return true;
  });

  function showToast(text) {
    setToastText(text);
    window.setTimeout(() => setToastText(""), 3000);
  }

  function openContact(contact) {
    setSelectedContact(contact);
    setComposeOpen(true);
  }

  function sendMessage() {
    if (!messageText.trim()) {
      showToast("Write a message before sending");
      return;
    }

    setComposeOpen(false);
    setMessageText("");
    setAiRewrite(false);
    showToast("Message sent securely");
  }

  return (
    <div style={styles.attendancePage}>
      <div style={styles.messageHero}>
        <div>
          <span style={styles.eyebrow}>SECURE CLUB COMMUNICATION</span>
          <h2 style={styles.teamHubHeroTitle}>
            The right message reaches the right people — without exposing the whole club directory.
          </h2>
          <p style={styles.teamHubHeroText}>
            MatchVision applies role-based contact access automatically.
            Parents can contact approved coaches and club leaders, coaches can
            reach staff and team families, and administrators retain the
            complete authorised directory.
          </p>
        </div>

        <button
          type="button"
          style={styles.primaryButton}
          onClick={() => {
            setSelectedContact(null);
            setComposeOpen(true);
          }}
        >
          + New message
        </button>
      </div>

      <div style={styles.messageAccessBanner}>
        <span style={styles.matchPermissionIcon}>
          {role === "parent" ? "👨‍👩‍👧" : role === "coach" ? "⚽" : "🛡"}
        </span>
        <div>
          <strong>
            {role === "parent"
              ? "Parent access: your coaches and approved club leaders"
              : role === "coach"
                ? "Coach access: coaching staff, authorised staff and your team families"
                : "Administrator access: all authorised club contacts and contact information"}
          </strong>
          <p>
            Private contact details are only shown where the club has granted
            permission. Every message is logged for safeguarding and continuity.
          </p>
        </div>
      </div>

      <div style={styles.messageMetricGrid}>
        <div style={styles.teamHubMetricCard}>
          <span style={styles.summaryLabel}>Unread</span>
          <strong style={styles.teamHubMetricValue}>
            {visibleThreads.reduce((total, thread) => total + thread.unread, 0)}
          </strong>
          <span style={styles.summaryFooter}>Across your permitted conversations</span>
        </div>
        <div style={styles.teamHubMetricCard}>
          <span style={styles.summaryLabel}>Action needed</span>
          <strong style={styles.teamHubMetricValue}>2</strong>
          <span style={styles.teamHubMetricPositive}>AI prioritised</span>
        </div>
        <div style={styles.teamHubMetricCard}>
          <span style={styles.summaryLabel}>Approved contacts</span>
          <strong style={styles.teamHubMetricValue}>{contacts.length}</strong>
          <span style={styles.summaryFooter}>Based on your logged-in role</span>
        </div>
        <div style={styles.teamHubMetricCard}>
          <span style={styles.summaryLabel}>Safeguarding</span>
          <strong style={styles.matchPrivacyMetric}>Audit active</strong>
          <span style={styles.summaryFooter}>Messages retained securely</span>
        </div>
      </div>

      <div style={styles.messageLayout}>
        <section style={styles.messageInboxCard}>
          <div style={styles.teamHubSectionHeader}>
            <div>
              <span style={styles.cardEyebrow}>CONVERSATIONS</span>
              <h3 style={styles.cardTitle}>Your messages</h3>
            </div>
            <span style={styles.teamHubLiveTag}>AI prioritised</span>
          </div>

          {visibleThreads.map((thread) => (
            <button
              type="button"
              key={thread.id}
              onClick={() => setSelectedThread(thread)}
              style={{
                ...styles.messageThread,
                ...(selectedThread.id === thread.id
                  ? styles.messageThreadActive
                  : {}),
              }}
            >
              <span style={styles.messageThreadAvatar}>
                {thread.title
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")}
              </span>

              <span style={styles.messageThreadMain}>
                <span style={styles.messageThreadTop}>
                  <strong>{thread.title}</strong>
                  <small>{thread.time}</small>
                </span>
                <span>{thread.sender}: {thread.preview}</span>
                <small style={styles.messagePriority}>{thread.priority}</small>
              </span>

              {thread.unread > 0 && (
                <span style={styles.messageUnreadBadge}>{thread.unread}</span>
              )}
            </button>
          ))}
        </section>

        <section style={styles.messageConversationCard}>
          <div style={styles.messageConversationHeader}>
            <div>
              <span style={styles.cardEyebrow}>{selectedThread.audience.toUpperCase()}</span>
              <h3>{selectedThread.title}</h3>
              <p>Secure club conversation · replies visible to authorised members only</p>
            </div>
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={() => {
                setSelectedContact({
                  name: selectedThread.title,
                  role: selectedThread.audience,
                });
                setComposeOpen(true);
              }}
            >
              Reply
            </button>
          </div>

          <div style={styles.messageConversationBody}>
            <div style={styles.messageBubbleIncoming}>
              <span>Coach Lisa · Yesterday 7:30 PM</span>
              <p>
                We reviewed Saturday's match. The AI report picked up improved
                defensive recovery and several strong right-side combinations.
              </p>
            </div>

            <div style={styles.messageBubbleOutgoing}>
              <span>You · Yesterday 8:02 PM</span>
              <p>
                Thanks. Is there anything specific the players should focus on
                before Thursday?
              </p>
            </div>

            <div style={styles.messageBubbleIncoming}>
              <span>Coach Lisa · Today 8:42 PM</span>
              <p>{selectedThread.preview}</p>
            </div>
          </div>

          <div style={styles.messageAiSummary}>
            <div>
              <span style={styles.insightLabel}>MATCHVISION MESSAGE INTELLIGENCE</span>
              <strong>What needs your attention</strong>
              <p>
                Attendance confirmation is due Thursday at 6:00 PM. The updated
                training plan is informational and does not require a reply.
              </p>
            </div>
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={() => showToast("Action added to your dashboard")}
            >
              Add action
            </button>
          </div>
        </section>

        <aside style={styles.messageDirectoryCard}>
          <div>
            <span style={styles.cardEyebrow}>CONTACT DIRECTORY</span>
            <h3 style={styles.cardTitle}>People you can message</h3>
          </div>

          <div style={styles.messageSearchBox}>
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={
                role === "parent"
                  ? "Search coaches or approved leaders..."
                  : role === "coach"
                    ? "Search staff, coaches or parents..."
                    : "Search all authorised contacts..."
              }
            />
          </div>

          <div style={styles.messageGroupFilters}>
            {groups.map((group) => (
              <button
                type="button"
                key={group}
                onClick={() => setActiveGroup(group)}
                style={{
                  ...styles.parentCalendarFilterButton,
                  ...(activeGroup === group
                    ? styles.parentCalendarFilterButtonActive
                    : {}),
                }}
              >
                {group}
              </button>
            ))}
          </div>

          <div style={styles.messageContactList}>
            {filteredContacts.map((contact) => (
              <button
                type="button"
                key={contact.id}
                onClick={() => openContact(contact)}
                style={styles.messageContact}
              >
                <span style={styles.messageContactInitials}>
                  {contact.name
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")}
                </span>
                <span>
                  <strong>{contact.name}</strong>
                  <small>{contact.role}</small>
                  {role === "admin" && <small>{contact.email}</small>}
                </span>
                <span style={styles.parentCalendarChevron}>›</span>
              </button>
            ))}
          </div>

          <div style={styles.messageUniqueFeature}>
            <span style={styles.cardEyebrow}>UNIQUE MATCHVISION FEATURE</span>
            <h3>Emotion-aware communication guard</h3>
            <p>
              Before sending, AI can soften unclear wording, flag potentially
              confrontational language and preserve the original meaning —
              especially useful in junior sport communication.
            </p>
          </div>
        </aside>
      </div>

      {composeOpen && (
        <div style={styles.modalOverlay} onClick={() => setComposeOpen(false)}>
          <div
            style={styles.messageComposeModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <span style={styles.cardEyebrow}>SECURE MESSAGE</span>
                <h3 style={styles.modalTitle}>New message</h3>
                <p style={styles.modalSubtitle}>
                  Recipient access is restricted by your logged-in role.
                </p>
              </div>
              <button
                type="button"
                style={styles.closeButton}
                onClick={() => setComposeOpen(false)}
              >
                ×
              </button>
            </div>

            <div style={styles.messageComposeBody}>
              <label style={styles.parentCalendarField}>
                <span>Recipient</span>
                <select
                  style={styles.parentCalendarInput}
                  value={selectedContact?.id || ""}
                  onChange={(event) => {
                    const contact = contacts.find(
                      (item) => String(item.id) === event.target.value
                    );
                    setSelectedContact(contact || null);
                  }}
                >
                  <option value="">Select a person or approved group</option>
                  {contacts.map((contact) => (
                    <option key={contact.id} value={contact.id}>
                      {contact.name} — {contact.role}
                    </option>
                  ))}
                  <option value="group-coaches">Group: Coaches</option>
                  {role !== "parent" && (
                    <option value="group-parents">Group: Team parents</option>
                  )}
                  {role === "admin" && (
                    <option value="group-all">Group: All authorised members</option>
                  )}
                </select>
              </label>

              <label style={styles.parentCalendarField}>
                <span>Subject</span>
                <input
                  style={styles.parentCalendarInput}
                  defaultValue={
                    selectedContact
                      ? `Message for ${selectedContact.name}`
                      : "U11 Wallabies update"
                  }
                />
              </label>

              <label style={styles.parentCalendarField}>
                <span>Message</span>
                <textarea
                  value={messageText}
                  onChange={(event) => {
                    setMessageText(event.target.value);
                    setAiRewrite(false);
                  }}
                  placeholder="Write your message..."
                  style={styles.messageComposeTextarea}
                />
              </label>

              <div style={styles.messageAiTools}>
                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => {
                    const improved =
                      messageText.trim() ||
                      "Hi, just a quick reminder that attendance confirmation is due by Thursday at 6:00 PM. Please reply when you have a moment. Thank you.";
                    setMessageText(improved);
                    setAiRewrite(true);
                  }}
                >
                  ✦ Improve tone with AI
                </button>
                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => showToast("Plain-language version prepared")}
                >
                  Simplify language
                </button>
                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => showToast("Translation options opened")}
                >
                  Translate
                </button>
              </div>

              {aiRewrite && (
                <div style={styles.messageToneResult}>
                  <strong>AI tone check: Warm, clear and respectful</strong>
                  <span>No safeguarding or conflict concerns detected.</span>
                </div>
              )}
            </div>

            <div style={styles.parentCalendarModalFooter}>
              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => setComposeOpen(false)}
              >
                Cancel
              </button>
              <button type="button" style={styles.saveButton} onClick={sendMessage}>
                Send securely
              </button>
            </div>
          </div>
        </div>
      )}

      {toastText && (
        <div style={styles.successToast}>
          <span style={styles.greenDot} />
          {toastText}
        </div>
      )}
    </div>
  );
}

const highlightItems = [
  {
    id: 1,
    title: "Ava's winning assist",
    player: "Ava Thompson",
    match: "Springvale 3–2 Oakleigh",
    time: "44:15",
    type: "Assist",
    rating: 9.2,
    emotion: "Proud moment",
    description:
      "Ava found space on the right and delivered a first-time cut-back for the winning goal.",
  },
  {
    id: 2,
    title: "Mia's line-breaking pass",
    player: "Mia Rodriguez",
    match: "Springvale 3–2 Oakleigh",
    time: "18:42",
    type: "Chance created",
    rating: 8.9,
    emotion: "Creative moment",
    description:
      "Mia received between the lines and played a pass behind the defence.",
  },
  {
    id: 3,
    title: "Lily's recovery tackle",
    player: "Lily Chen",
    match: "Dandenong 1–1 Springvale",
    time: "37:06",
    type: "Defensive action",
    rating: 9.0,
    emotion: "Brave moment",
    description:
      "Lily recovered quickly and stopped a clear scoring opportunity.",
  },
  {
    id: 4,
    title: "Sophie saves at close range",
    player: "Sophie Williams",
    match: "Springvale 4–1 Noble Park",
    time: "22:18",
    type: "Save",
    rating: 8.8,
    emotion: "Confidence moment",
    description:
      "Sophie reacted quickly and made a strong close-range save.",
  },
  {
    id: 5,
    title: "Team transition goal",
    player: "Team",
    match: "Springvale 4–1 Noble Park",
    time: "51:03",
    type: "Team pattern",
    rating: 9.4,
    emotion: "Team moment",
    description:
      "Five players combined from a ball recovery to a goal in under nine seconds.",
  },
];

function HighlightsPage({ role = "parent" }) {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [toastText, setToastText] = useState("");

  const permittedHighlights = highlightItems.filter((highlight) => {
    if (role === "parent") {
      return highlight.player === "Ava Thompson";
    }

    return true;
  });

  const types = ["All", ...Array.from(new Set(permittedHighlights.map((item) => item.type)))];

  const visibleHighlights = permittedHighlights.filter((highlight) => {
    const matchesType = activeType === "All" || highlight.type === activeType;
    const searchable = [
      highlight.title,
      highlight.player,
      highlight.match,
      highlight.time,
      highlight.type,
      highlight.emotion,
      highlight.description,
    ]
      .join(" ")
      .toLowerCase();

    return matchesType && searchable.includes(search.toLowerCase());
  });

  function showToast(text) {
    setToastText(text);
    window.setTimeout(() => setToastText(""), 3000);
  }

  return (
    <div style={styles.attendancePage}>
      <div style={styles.highlightHero}>
        <div>
          <span style={styles.eyebrow}>AI-GENERATED MATCH HIGHLIGHTS</span>
          <h2 style={styles.teamHubHeroTitle}>
            Every meaningful moment, found automatically.
          </h2>
          <p style={styles.teamHubHeroText}>
            MatchVision scans uploaded matches and creates highlights according
            to each person's access. Parents see their child's moments, coaches
            see the full squad, and administrators see collective club trends.
          </p>
        </div>

        <button
          type="button"
          style={styles.primaryButton}
          onClick={() => showToast("Newly analysed highlights refreshed")}
        >
          ✦ Refresh AI highlights
        </button>
      </div>

      <div style={styles.messageAccessBanner}>
        <span style={styles.matchPermissionIcon}>
          {role === "parent" ? "👨‍👩‍👧" : role === "coach" ? "⚽" : "🛡"}
        </span>
        <div>
          <strong>
            {role === "parent"
              ? "You are viewing highlights linked to Ava Thompson"
              : role === "coach"
                ? "You are viewing highlights from the full U11 squad"
                : "You are viewing collective highlights and data across all authorised games"}
          </strong>
          <p>
            MatchVision applies player consent, family links and club privacy
            settings before a clip becomes visible.
          </p>
        </div>
      </div>

      <div style={styles.highlightMetricGrid}>
        <div style={styles.teamHubMetricCard}>
          <span style={styles.summaryLabel}>
            {role === "admin" ? "Club highlights" : "Highlights ready"}
          </span>
          <strong style={styles.teamHubMetricValue}>
            {role === "parent" ? "7" : role === "coach" ? "42" : "126"}
          </strong>
          <span style={styles.summaryFooter}>Across analysed match footage</span>
        </div>
        <div style={styles.teamHubMetricCard}>
          <span style={styles.summaryLabel}>
            {role === "parent" ? "Positive moments" : "Goals detected"}
          </span>
          <strong style={styles.teamHubMetricValue}>
            {role === "parent" ? "5" : role === "coach" ? "24" : "88"}
          </strong>
          <span style={styles.teamHubMetricPositive}>AI confirmed</span>
        </div>
        <div style={styles.teamHubMetricCard}>
          <span style={styles.summaryLabel}>
            {role === "parent" ? "Development clips" : "Team patterns"}
          </span>
          <strong style={styles.teamHubMetricValue}>
            {role === "parent" ? "2" : role === "coach" ? "13" : "37"}
          </strong>
          <span style={styles.summaryFooter}>Ready for review</span>
        </div>
        <div style={styles.teamHubMetricCard}>
          <span style={styles.summaryLabel}>AI confidence</span>
          <strong style={styles.teamHubMetricValue}>94%</strong>
          <span style={styles.summaryFooter}>Average verified detection</span>
        </div>
      </div>

      {role === "admin" && (
        <div style={styles.highlightAdminInsight}>
          <div>
            <span style={styles.cardEyebrow}>CLUB-WIDE AI STORY</span>
            <h3>Participation, development and memorable moments across every team</h3>
            <p>
              Administrators can compare highlight volume, player involvement,
              age-group trends and positive engagement without opening every
              individual match.
            </p>
          </div>

          <div style={styles.highlightAdminStats}>
            <span><strong>14</strong> teams analysed</span>
            <span><strong>71%</strong> players featured</span>
            <span><strong>38%</strong> more family views</span>
          </div>
        </div>
      )}

      <section style={styles.parentCalendarSearchPanel}>
        <div style={styles.parentCalendarSearchRow}>
          <div style={styles.parentCalendarSearchBox}>
            <span style={styles.parentCalendarSearchIcon}>⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={
                role === "parent"
                  ? "Search Ava's match, skill, moment or time..."
                  : role === "coach"
                    ? "Search player, match, skill, moment or time..."
                    : "Search team, player, match, skill, age group or time..."
              }
              style={styles.parentCalendarSearchInput}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                style={styles.parentCalendarClearButton}
              >
                Clear
              </button>
            )}
          </div>
          <span style={styles.parentCalendarMonthBadge}>
            {visibleHighlights.length} visible
          </span>
        </div>

        <div style={styles.parentCalendarFilterRow}>
          {types.map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setActiveType(type)}
              style={{
                ...styles.parentCalendarFilterButton,
                ...(activeType === type
                  ? styles.parentCalendarFilterButtonActive
                  : {}),
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      <div style={styles.highlightGrid}>
        {visibleHighlights.map((highlight) => (
          <article key={highlight.id} style={styles.highlightCard}>
            <button
              type="button"
              style={styles.highlightPreview}
              onClick={() => setSelectedHighlight(highlight)}
            >
              <div style={styles.highlightPitch}>
                <span style={styles.highlightPlayerMarker}>
                  {highlight.player === "Team"
                    ? "TEAM"
                    : highlight.player
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                </span>
                <span style={styles.highlightPlayButton}>▶</span>
              </div>
              <span style={styles.highlightTimestamp}>{highlight.time}</span>
            </button>

            <div style={styles.highlightCardBody}>
              <div style={styles.highlightCardTop}>
                <span style={styles.teamHubConfidence}>{highlight.type}</span>
                <strong>{highlight.rating}</strong>
              </div>
              <h3>{highlight.title}</h3>
              <p>{highlight.match}</p>
              <small>{highlight.emotion}</small>
            </div>

            <div style={styles.highlightActions}>
              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => setSelectedHighlight(highlight)}
              >
                Watch
              </button>
              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => showToast("Highlight added to a private reel")}
              >
                Add to reel
              </button>
            </div>
          </article>
        ))}
      </div>

      <div style={styles.highlightUniqueGrid}>
        <article style={styles.teamHubFutureCard}>
          <span style={styles.cardEyebrow}>EMOTIONAL CONNECTION REEL</span>
          <h3>
            {role === "parent"
              ? "A season story made for your family"
              : "A team story made automatically"}
          </h3>
          <p>
            AI can combine effort, confidence, assists, saves and joyful moments
            into a positive season reel — not only goals.
          </p>
          <button
            type="button"
            style={styles.saveButton}
            onClick={() => showToast("AI season reel generated")}
          >
            Generate season story
          </button>
        </article>

        <article style={styles.teamHubInsightCard}>
          <span style={styles.cardEyebrow}>DEVELOPMENT REEL</span>
          <h3>See progress side by side</h3>
          <p>
            MatchVision can compare similar actions from early and recent games,
            making improvement visible to players, families and coaches.
          </p>
          <button
            type="button"
            style={styles.secondaryButton}
            onClick={() => showToast("Development comparison opened")}
          >
            Compare progress
          </button>
        </article>

        <article style={styles.teamHubInsightCard}>
          <span style={styles.cardEyebrow}>FUTURE LIVE VISION</span>
          <h3>Highlights detected while the match is happening</h3>
          <p>
            With future tracking and computer vision, clips, heat maps and
            player events can be prepared in near real time.
          </p>
        </article>
      </div>

      {selectedHighlight && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedHighlight(null)}
        >
          <div
            style={styles.highlightModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <span style={styles.cardEyebrow}>AI HIGHLIGHT</span>
                <h3 style={styles.modalTitle}>{selectedHighlight.title}</h3>
                <p style={styles.modalSubtitle}>
                  {selectedHighlight.match} · {selectedHighlight.time}
                </p>
              </div>
              <button
                type="button"
                style={styles.closeButton}
                onClick={() => setSelectedHighlight(null)}
              >
                ×
              </button>
            </div>

            <div style={styles.highlightModalBody}>
              <div style={styles.highlightModalVideo}>
                <div style={styles.highlightPitch}>
                  <span style={styles.highlightPlayerMarker}>
                    {selectedHighlight.player === "Team"
                      ? "TEAM"
                      : selectedHighlight.player
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                  </span>
                  <span style={styles.highlightPlayButton}>▶</span>
                </div>
              </div>

              <div style={styles.highlightExplanation}>
                <span style={styles.insightLabel}>WHY AI SELECTED THIS MOMENT</span>
                <h3>{selectedHighlight.emotion}</h3>
                <p>{selectedHighlight.description}</p>
                <div style={styles.matchPreviewStats}>
                  <div><span>AI rating</span><strong>{selectedHighlight.rating}</strong></div>
                  <div><span>Type</span><strong>{selectedHighlight.type}</strong></div>
                  <div><span>Player</span><strong>{selectedHighlight.player}</strong></div>
                </div>
              </div>
            </div>

            <div style={styles.parentCalendarModalFooter}>
              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => setSelectedHighlight(null)}
              >
                Close
              </button>
              <button
                type="button"
                style={styles.saveButton}
                onClick={() => showToast("Highlight shared within permissions")}
              >
                Share securely
              </button>
            </div>
          </div>
        </div>
      )}

      {toastText && (
        <div style={styles.successToast}>
          <span style={styles.greenDot} />
          {toastText}
        </div>
      )}
    </div>
  );
}

function resolveLoggedInRole(explicitRole) {
  const normalise = (value) => {
    const role = String(value || "").toLowerCase();

    if (role.includes("admin") || role.includes("president")) {
      return "admin";
    }

    if (role.includes("coach") || role.includes("staff")) {
      return "coach";
    }

    return "parent";
  };

  if (explicitRole) {
    return normalise(explicitRole);
  }

  if (typeof window !== "undefined") {
    const storedRole =
      window.localStorage.getItem("matchvisionRole") ||
      window.localStorage.getItem("userRole") ||
      window.localStorage.getItem("role");

    if (storedRole) {
      return normalise(storedRole);
    }

    const roleFromUrl = new URLSearchParams(window.location.search).get("role");

    if (roleFromUrl) {
      return normalise(roleFromUrl);
    }
  }

  return "parent";
}


const demoAccounts = [
  {
    id: "parent-emma",
    name: "Emma Thompson",
    role: "parent",
    roleLabel: "Parent",
    detail: "Linked to Ava Thompson and Lily Chen",
    email: "emma.thompson@example.com",
  },
  {
    id: "coach-lisa",
    name: "Coach Lisa Morgan",
    role: "coach",
    roleLabel: "Coach",
    detail: "U11 Wallabies Head Coach",
    email: "lisa.morgan@springvalewallabies.com.au",
  },
  {
    id: "admin-michael",
    name: "Michael Costa",
    role: "admin",
    roleLabel: "Administrator",
    detail: "Club Administrator · Full club access",
    email: "admin@springvalewallabies.com.au",
  },
];

const liveGames = [
  {
    id: 1,
    home: "Springvale City U11",
    away: "Oakleigh United U11",
    score: "2–1",
    minute: "42'",
    status: "LIVE",
    coach: "Lisa Morgan",
    playerNames: "Ava Thompson, Mia Rodriguez, Lily Chen",
    club: "Springvale City Soccer Club",
    opponent: "Oakleigh United",
    location: "Ross Reserve",
    pitch: "Pitch 1",
    date: "27 July 2026",
    time: "7:00 PM",
    viewers: 84,
    privacy: "Approved families and guests",
    aiSummary: "Springvale are creating most chances from the right side and have improved their recovery shape.",
  },
  {
    id: 2,
    home: "Springvale City U13",
    away: "Dandenong City U13",
    score: "1–1",
    minute: "31'",
    status: "LIVE",
    coach: "Daniel Brooks",
    playerNames: "Ruby Anderson, Zoe Thomas, Grace Walker",
    club: "Springvale City Soccer Club",
    opponent: "Dandenong City",
    location: "Ross Reserve",
    pitch: "Pitch 2",
    date: "27 July 2026",
    time: "7:15 PM",
    viewers: 52,
    privacy: "Club members",
    aiSummary: "Possession is balanced. Springvale's strongest moments are coming after midfield recoveries.",
  },
  {
    id: 3,
    home: "Noble Park U12",
    away: "Springvale City U12",
    score: "0–0",
    minute: "18'",
    status: "LIVE",
    coach: "Alicia Tran",
    playerNames: "Charlotte Brown, Olivia Martin, Isla Wilson",
    club: "Springvale City Soccer Club",
    opponent: "Noble Park",
    location: "Noble Park Reserve",
    pitch: "Main Pitch",
    date: "27 July 2026",
    time: "7:30 PM",
    viewers: 39,
    privacy: "Approved families and guests",
    aiSummary: "Springvale are defending compactly and have allowed only one shot inside the area.",
  },
];

function ClubCrest({ large = false }) {
  return (
    <div
      style={{
        ...styles.clubCrest,
        ...(large ? styles.clubCrestLarge : {}),
      }}
      aria-label="Springvale City Soccer Club crest placeholder"
    >
      <span>SCSC</span>
      <strong>1956</strong>
    </div>
  );
}

function LoginPage({ onLogin, onGuestLive }) {
  const [selectedAccountId, setSelectedAccountId] = useState(demoAccounts[0].id);
  const [email, setEmail] = useState(demoAccounts[0].email);
  const [password, setPassword] = useState("matchvision");
  const [showAccess, setShowAccess] = useState(false);

  const selectedAccount =
    demoAccounts.find((account) => account.id === selectedAccountId) ||
    demoAccounts[0];

  function selectAccount(account) {
    setSelectedAccountId(account.id);
    setEmail(account.email);
  }

  return (
    <div style={styles.loginPage}>
      <section style={styles.loginBrandPanel}>
        <div style={styles.loginBrandTop}>
          <div style={styles.matchVisionMark}>MV</div>
          <div>
            <span style={styles.loginBrandName}>MATCHVISION</span>
            <small style={styles.loginBrandTagline}>
              See the game. Understand the player.
            </small>
          </div>
        </div>

        <div style={styles.loginBrandContent}>
          <span style={styles.eyebrow}>THE INTELLIGENT FOOTBALL CLUB PLATFORM</span>
          <h1 style={styles.loginHeroTitle}>
            One club. Three experiences. Every moment connected.
          </h1>
          <p style={styles.loginHeroText}>
            MatchVision brings live games, player development, secure
            communication, match video and AI analytics into one personalised
            home for families, coaches and club leaders.
          </p>

          <div style={styles.loginFeatureStack}>
            <div>
              <span>01</span>
              <strong>Parents feel closer</strong>
              <p>Child-specific progress, highlights, events and live games.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Coaches make better decisions</strong>
              <p>Squad analytics, tactical insights and AI training plans.</p>
            </div>
            <div>
              <span>03</span>
              <strong>Administrators stay in control</strong>
              <p>Privacy, permissions, contacts and club-wide intelligence.</p>
            </div>
          </div>
        </div>

        <div style={styles.loginClubPreview}>
          <ClubCrest />
          <div>
            <span>DEMO CLUB</span>
            <strong>Springvale City Soccer Club</strong>
            <small>Ross Reserve · Established 1956</small>
          </div>
        </div>
      </section>

      <section style={styles.loginFormPanel}>
        <div style={styles.loginFormCard}>
          <div style={styles.loginFormClub}>
            <ClubCrest large />
            <div>
              <span style={styles.cardEyebrow}>CLUB PORTAL</span>
              <h2>Springvale City SC</h2>
              <p>Choose a demonstration account to see its exact access.</p>
            </div>
          </div>

          <div style={styles.loginAccountCards}>
            {demoAccounts.map((account) => (
              <button
                type="button"
                key={account.id}
                onClick={() => selectAccount(account)}
                style={{
                  ...styles.loginAccountCard,
                  ...(selectedAccountId === account.id
                    ? styles.loginAccountCardActive
                    : {}),
                }}
              >
                <span style={styles.loginAccountIcon}>
                  {account.role === "parent"
                    ? "P"
                    : account.role === "coach"
                      ? "C"
                      : "A"}
                </span>
                <span>
                  <strong>{account.name}</strong>
                  <small>{account.roleLabel} · {account.detail}</small>
                </span>
              </button>
            ))}
          </div>

          <label style={styles.parentCalendarField}>
            <span>Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={styles.parentCalendarInput}
            />
          </label>

          <label style={styles.parentCalendarField}>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={styles.parentCalendarInput}
            />
          </label>

          <button
            type="button"
            style={styles.loginPrimaryButton}
            onClick={() => onLogin(selectedAccount)}
          >
            Log in as {selectedAccount.roleLabel}
          </button>

          <button
            type="button"
            style={styles.loginAccessButton}
            onClick={() => setShowAccess((current) => !current)}
          >
            {showAccess ? "Hide access summary" : "What will this account see?"}
          </button>

          {showAccess && (
            <div style={styles.loginAccessSummary}>
              {selectedAccount.role === "parent" && (
                <>
                  <strong>Parent access</strong>
                  <span>Linked children only</span>
                  <span>Private player AI reports and highlights</span>
                  <span>Team calendar, approved messages and live games</span>
                </>
              )}
              {selectedAccount.role === "coach" && (
                <>
                  <strong>Coach access</strong>
                  <span>Full assigned squad and family contacts</span>
                  <span>Team analytics, footage, tactics and workload</span>
                  <span>Live AI match centre and training recommendations</span>
                </>
              )}
              {selectedAccount.role === "admin" && (
                <>
                  <strong>Administrator access</strong>
                  <span>Club-wide authorised directory and contacts</span>
                  <span>Permissions, privacy, uploads and governance</span>
                  <span>Collective analytics across teams and matches</span>
                </>
              )}
            </div>
          )}

          <div style={styles.loginDivider}>
            <span />
            <small>RELATIVE OR GUEST?</small>
            <span />
          </div>

          <button
            type="button"
            style={styles.loginGuestButton}
            onClick={onGuestLive}
          >
            Watch an approved live game
          </button>

          <p style={styles.loginFinePrint}>
            Guest viewers can only access club-approved public or invitation
            matches. Player profiles and private analytics remain protected.
          </p>
        </div>
      </section>
    </div>
  );
}

function DashboardPage({ role = "parent", user, onLogout }) {
  const [selectedLiveGame, setSelectedLiveGame] = useState(liveGames[0]);
  const [liveModalOpen, setLiveModalOpen] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const filteredGames = liveGames.filter((game) =>
    [
      game.home,
      game.away,
      game.coach,
      game.playerNames,
      game.club,
      game.opponent,
      game.location,
      game.pitch,
      game.date,
      game.time,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function toast(text) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 3000);
  }

  return (
    <div style={styles.attendancePage}>
      <div style={styles.dashboardIdentityBar}>
        <div style={styles.dashboardClubIdentity}>
          <ClubCrest />
          <div>
            <span style={styles.cardEyebrow}>SPRINGVALE CITY SOCCER CLUB</span>
            <strong>{user?.name || (role === "coach" ? "Coach Lisa Morgan" : "Emma Thompson")}</strong>
            <small>{role === "admin" ? "Administrator" : role === "coach" ? "U11 Head Coach" : "Parent account"}</small>
          </div>
        </div>

        <button type="button" style={styles.secondaryButton} onClick={onLogout}>
          Sign out
        </button>
      </div>

      <section style={styles.liveDashboardHero}>
        <div style={styles.liveHeroCopy}>
          <span style={styles.liveHeroStatus}>
            <span style={styles.livePulse} />
            LIVE NOW · 42ND MINUTE
          </span>
          <h1>Springvale City U11 vs Oakleigh United U11</h1>
          <p>
            Watch the match live with real-time AI commentary, momentum,
            player involvement and tactical insights.
          </p>

          <div style={styles.liveHeroActions}>
            <button
              type="button"
              style={styles.liveWatchButton}
              onClick={() => {
                setSelectedLiveGame(liveGames[0]);
                setLiveModalOpen(true);
              }}
            >
              ▶ Watch live game
            </button>
            <button
              type="button"
              style={styles.liveFindButton}
              onClick={() => setFinderOpen(true)}
            >
              Search all live games
            </button>
          </div>

          <div style={styles.liveHeroMeta}>
            <span>Ross Reserve · Pitch 1</span>
            <span>84 watching</span>
            <span>Approved family stream</span>
          </div>
        </div>

        <div style={styles.liveHeroScorePanel}>
          <span>SPRINGVALE CITY</span>
          <strong>2</strong>
          <small>42'</small>
          <strong>1</strong>
          <span>OAKLEIGH UNITED</span>
        </div>
      </section>

      <div style={styles.liveAiStrip}>
        <div>
          <span style={styles.insightLabel}>LIVE AI INSIGHT</span>
          <strong>Springvale's right side is producing 68% of attacking entries</strong>
          <p>
            Ava and Mia have combined six times in the final third. AI suggests
            continuing the overlap while protecting the left transition.
          </p>
        </div>
        <div style={styles.liveAiMetrics}>
          <span><strong>57%</strong> possession</span>
          <span><strong>8–4</strong> shots</span>
          <span><strong>6.2s</strong> recovery</span>
          <span><strong>91%</strong> AI confidence</span>
        </div>
      </div>

      <div style={styles.dashboardPrimaryGrid}>
        <section style={styles.dashboardMainCard}>
          <div style={styles.teamHubSectionHeader}>
            <div>
              <span style={styles.cardEyebrow}>
                {role === "parent" ? "YOUR FAMILY TODAY" : role === "coach" ? "COACH MATCH CENTRE" : "CLUB OPERATIONS"}
              </span>
              <h3 style={styles.cardTitle}>
                {role === "parent"
                  ? "Ava's game day"
                  : role === "coach"
                    ? "U11 live performance"
                    : "Live club overview"}
              </h3>
            </div>
          </div>

          {role === "parent" ? (
            <div style={styles.dashboardRoleContent}>
              <div style={styles.dashboardPlayerWelcome}>
                <span style={styles.avatar}>7</span>
                <div>
                  <strong>Ava Thompson</strong>
                  <span>Right Wing · Starting today</span>
                </div>
              </div>
              <div style={styles.dashboardRoleMetrics}>
                <div><span>Live touches</span><strong>26</strong></div>
                <div><span>Chances created</span><strong>3</strong></div>
                <div><span>Positive moments</span><strong>4</strong></div>
                <div><span>AI rating</span><strong>8.6</strong></div>
              </div>
              <div style={styles.teamHubAiSummary}>
                <span style={styles.insightLabel}>WHAT AI IS NOTICING</span>
                <p>
                  Ava is finding space well on the right and has created three
                  chances. Her best moment was a first-time pass at 31:08.
                </p>
              </div>
            </div>
          ) : role === "coach" ? (
            <div style={styles.dashboardRoleContent}>
              <div style={styles.dashboardRoleMetrics}>
                <div><span>Team shape</span><strong>Compact</strong></div>
                <div><span>High-value chances</span><strong>5</strong></div>
                <div><span>Press success</span><strong>64%</strong></div>
                <div><span>Load alert</span><strong>1 player</strong></div>
              </div>
              <div style={styles.teamHubAiSummary}>
                <span style={styles.insightLabel}>LIVE COACH RECOMMENDATION</span>
                <p>
                  Keep the right-side overload, but hold Ruby slightly deeper
                  when Lily advances to protect against left-sided counters.
                </p>
              </div>
            </div>
          ) : (
            <div style={styles.dashboardRoleContent}>
              <div style={styles.dashboardRoleMetrics}>
                <div><span>Live games</span><strong>3</strong></div>
                <div><span>Current viewers</span><strong>175</strong></div>
                <div><span>AI streams active</span><strong>3</strong></div>
                <div><span>Consent status</span><strong>Clear</strong></div>
              </div>
              <div style={styles.teamHubAiSummary}>
                <span style={styles.insightLabel}>CLUB-WIDE LIVE INTELLIGENCE</span>
                <p>
                  Three matches are streaming successfully. U11 engagement is
                  highest, with 84 approved viewers and no privacy exceptions.
                </p>
              </div>
            </div>
          )}
        </section>

        <aside style={styles.dashboardUpcomingCard}>
          <span style={styles.cardEyebrow}>NEXT FOR YOU</span>
          <h3 style={styles.cardTitle}>
            {role === "parent" ? "Upcoming family schedule" : "Upcoming club schedule"}
          </h3>

          {[
            ["Tue · 6:00 PM", "U11 Team Training", "Main Pitch"],
            ["Thu · 6:00 PM", "Match Preparation", "Main Pitch"],
            ["Sat · 10:00 AM", "Dandenong City vs Springvale", "Away"],
          ].map((event) => (
            <button
              type="button"
              key={event[0]}
              style={styles.dashboardUpcomingItem}
              onClick={() => toast(`${event[1]} opened`)}
            >
              <span>{event[0]}</span>
              <strong>{event[1]}</strong>
              <small>{event[2]}</small>
            </button>
          ))}
        </aside>
      </div>

      <section style={styles.liveFinderPreview}>
        <div>
          <span style={styles.cardEyebrow}>LIVE GAME FINDER</span>
          <h3>Helping grandparents and relatives find the right game</h3>
          <p>
            Search approved live streams by coach, player, club, opponent,
            location, pitch, date or time.
          </p>
        </div>
        <button
          type="button"
          style={styles.primaryButton}
          onClick={() => setFinderOpen(true)}
        >
          Find a live game
        </button>
      </section>

      {finderOpen && (
        <div style={styles.modalOverlay} onClick={() => setFinderOpen(false)}>
          <div
            style={styles.liveFinderModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <span style={styles.cardEyebrow}>LIVE GAME FINDER</span>
                <h3 style={styles.modalTitle}>Find an approved live match</h3>
                <p style={styles.modalSubtitle}>
                  Search coach, player, club, opponent, location, pitch, date or time.
                </p>
              </div>
              <button
                type="button"
                style={styles.closeButton}
                onClick={() => setFinderOpen(false)}
              >
                ×
              </button>
            </div>

            <div style={styles.liveFinderBody}>
              <div style={styles.parentCalendarSearchBox}>
                <span style={styles.parentCalendarSearchIcon}>⌕</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Try Ava, Coach Lisa, Oakleigh, Ross Reserve, Pitch 1 or 7:00 PM..."
                  style={styles.parentCalendarSearchInput}
                />
                {search && (
                  <button
                    type="button"
                    style={styles.parentCalendarClearButton}
                    onClick={() => setSearch("")}
                  >
                    Clear
                  </button>
                )}
              </div>

              <div style={styles.liveGameResults}>
                {filteredGames.map((game) => (
                  <button
                    type="button"
                    key={game.id}
                    style={styles.liveGameResult}
                    onClick={() => {
                      setSelectedLiveGame(game);
                      setFinderOpen(false);
                      setLiveModalOpen(true);
                    }}
                  >
                    <span style={styles.liveResultBadge}>LIVE {game.minute}</span>
                    <span style={styles.liveGameResultMain}>
                      <strong>{game.home} {game.score} {game.away}</strong>
                      <span>{game.location} · {game.pitch} · {game.time}</span>
                      <small>Coach {game.coach} · {game.viewers} watching</small>
                    </span>
                    <span style={styles.parentCalendarChevron}>›</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {liveModalOpen && (
        <LiveGameModal
          game={selectedLiveGame}
          role={role}
          onClose={() => setLiveModalOpen(false)}
          onToast={toast}
        />
      )}

      {message && (
        <div style={styles.successToast}>
          <span style={styles.greenDot} />
          {message}
        </div>
      )}
    </div>
  );
}

function LiveGameModal({ game, role, onClose, onToast }) {
  const [activeTab, setActiveTab] = useState(
    role === "parent" ? "My child" : "Live analytics"
  );

  const tabs =
    role === "parent"
      ? ["My child", "Match", "Live moments"]
      : ["Live analytics", "Players", "Tactics", "Timeline"];

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div
        style={styles.liveGameModal}
        onClick={(event) => event.stopPropagation()}
      >
        <div style={styles.liveGameModalHeader}>
          <div>
            <span style={styles.liveHeroStatus}>
              <span style={styles.livePulse} />
              {game.status} · {game.minute}
            </span>
            <h3>{game.home} {game.score} {game.away}</h3>
            <p>{game.location} · {game.pitch} · {game.time}</p>
          </div>
          <button type="button" style={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div style={styles.liveGameModalBody}>
          <div style={styles.liveStreamFrame}>
            <div style={styles.liveStreamPitch}>
              <span style={styles.liveStreamPlayerOne}>7</span>
              <span style={styles.liveStreamPlayerTwo}>10</span>
              <span style={styles.liveStreamPlayerThree}>4</span>
              <span style={styles.liveStreamBall}>●</span>
            </div>
            <div style={styles.liveStreamTopBar}>
              <span>LIVE</span>
              <strong>{game.home} {game.score} {game.away}</strong>
              <small>{game.minute}</small>
            </div>
            <button
              type="button"
              style={styles.liveStreamPlayButton}
              onClick={() => onToast("Live stream resumed")}
            >
              ▶
            </button>
          </div>

          <div style={styles.teamHubTabs}>
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.teamHubTabButton,
                  ...(activeTab === tab ? styles.teamHubTabButtonActive : {}),
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {role === "parent" ? (
            <div style={styles.liveParentAnalytics}>
              <div style={styles.livePlayerCard}>
                <div style={styles.dashboardPlayerWelcome}>
                  <span style={styles.avatar}>7</span>
                  <div>
                    <strong>Ava Thompson</strong>
                    <span>Live AI rating 8.6</span>
                  </div>
                </div>
                <div style={styles.dashboardRoleMetrics}>
                  <div><span>Touches</span><strong>26</strong></div>
                  <div><span>Passes</span><strong>18</strong></div>
                  <div><span>Chances</span><strong>3</strong></div>
                  <div><span>Recoveries</span><strong>4</strong></div>
                </div>
              </div>

              <div style={styles.liveAiFeed}>
                <span style={styles.insightLabel}>LIVE AI STORY</span>
                <strong>{game.aiSummary}</strong>
                <p>
                  Ava's strongest moment so far came at 31:08, when she created
                  a clear chance with a first-time pass.
                </p>
              </div>
            </div>
          ) : (
            <div style={styles.liveCoachAnalytics}>
              <div style={styles.liveCoachStatGrid}>
                <div><span>Possession</span><strong>57%</strong></div>
                <div><span>Shots</span><strong>8–4</strong></div>
                <div><span>Pass completion</span><strong>78%</strong></div>
                <div><span>Final-third entries</span><strong>15</strong></div>
                <div><span>Recovery time</span><strong>6.2s</strong></div>
                <div><span>Team width</span><strong>Good</strong></div>
              </div>
              <div style={styles.liveAiFeed}>
                <span style={styles.insightLabel}>LIVE COACH AI</span>
                <strong>{game.aiSummary}</strong>
                <p>
                  Suggested adjustment: maintain the right overload while
                  keeping one midfielder behind the ball during left-sided attacks.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PlaceholderPage({ page, userRole, role }) {
  const [sessionUser, setSessionUser] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const saved = window.localStorage.getItem("matchvisionUser");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [guestLiveMode, setGuestLiveMode] = useState(false);
  const loggedInRole = resolveLoggedInRole(
    sessionUser?.role || userRole || role
  );
  const navItem = navigation.find((item) => item.id === page);

  function loginUser(account) {
    setSessionUser(account);
    setGuestLiveMode(false);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("matchvisionUser", JSON.stringify(account));
      window.localStorage.setItem("matchvisionRole", account.role);
    }
  }

  function logoutUser() {
    setSessionUser(null);
    setGuestLiveMode(false);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem("matchvisionUser");
      window.localStorage.removeItem("matchvisionRole");
    }
  }

  if (page === "login") {
    if (sessionUser || guestLiveMode) {
      return (
        <DashboardPage
          role={sessionUser?.role || "parent"}
          user={sessionUser || { name: "Guest Viewer", role: "parent" }}
          onLogout={logoutUser}
        />
      );
    }

    return (
      <LoginPage
        onLogin={loginUser}
        onGuestLive={() => setGuestLiveMode(true)}
      />
    );
  }

  if (page === "dashboard" || !page) {
    if (!sessionUser && !userRole && !role) {
      return (
        <LoginPage
          onLogin={loginUser}
          onGuestLive={() => setGuestLiveMode(true)}
        />
      );
    }

    return (
      <DashboardPage
        role={loggedInRole}
        user={sessionUser}
        onLogout={logoutUser}
      />
    );
  }

  if (page === "attendance") {
    return <AttendancePage />;
  }

  if (page === "calendar") {
    return <ParentFriendlyCalendarPage />;
  }

  if (page === "team") {
    return <TeamHubPage role={loggedInRole} />;
  }

  if (page === "matches") {
    return <MatchLibraryPage role={loggedInRole} />;
  }

  if (page === "analysis") {
    return <AIAnalysisPage role={loggedInRole} />;
  }

  if (page === "messages") {
    return <MessagesPage role={loggedInRole} />;
  }

  if (page === "highlights") {
    return <HighlightsPage role={loggedInRole} />;
  }

  return (
    <div className="placeholder-page">
      <div className="placeholder-icon">{navItem?.icon}</div>

      <span className="page-eyebrow">FRAMEWORK ACTIVE</span>

      <h2>{navItem?.label || "MatchVision"}</h2>

      <p>
        This module is connected to the MatchVision navigation framework and
        will be built next.
      </p>

      <div className="placeholder-status">
        <span />
        Navigation working correctly
      </div>
    </div>
  );
}

const styles = {
  attendancePage: {
    position: "relative",
    width: "100%",
    padding: "34px 40px 60px",
    color: "#f4f6fa",
    boxSizing: "border-box",
  },

  pageIntro: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "24px",
    marginBottom: "28px",
  },

  eyebrow: {
    display: "block",
    marginBottom: "8px",
    color: "#ff6474",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  title: {
    margin: "0 0 8px",
    color: "#f4f6fa",
    fontSize: "32px",
    fontWeight: "750",
  },

  subtitle: {
    maxWidth: "650px",
    margin: 0,
    color: "#929cad",
    fontSize: "15px",
    lineHeight: 1.6,
  },

  primaryButton: {
    position: "relative",
    zIndex: 10,
    minWidth: "190px",
    border: "none",
    borderRadius: "12px",
    padding: "15px 20px",
    background: "#c94f59",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "20px",
  },

  summaryCard: {
    display: "flex",
    flexDirection: "column",
    minHeight: "120px",
    padding: "20px",
    border: "1px solid #29303a",
    borderRadius: "16px",
    background: "#13181f",
    boxSizing: "border-box",
  },

  summaryLabel: {
    color: "#929cad",
    fontSize: "13px",
  },

  summaryNumber: {
    margin: "10px 0 6px",
    color: "#f4f6fa",
    fontSize: "30px",
  },

  summaryFooter: {
    color: "#697486",
    fontSize: "12px",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 0.8fr)",
    gap: "20px",
    alignItems: "start",
  },

  mainCard: {
    overflow: "hidden",
    border: "1px solid #29303a",
    borderRadius: "18px",
    background: "#13181f",
  },

  sideCard: {
    padding: "24px",
    border: "1px solid #29303a",
    borderRadius: "18px",
    background: "#13181f",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    padding: "24px",
    borderBottom: "1px solid #262d36",
  },

  cardEyebrow: {
    display: "block",
    marginBottom: "7px",
    color: "#ff6474",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.6px",
  },

  cardTitle: {
    margin: "0 0 5px",
    color: "#f4f6fa",
    fontSize: "20px",
  },

  cardSubtitle: {
    margin: 0,
    color: "#7f8999",
    fontSize: "13px",
  },

  liveBadge: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "8px 11px",
    border: "1px solid #303844",
    borderRadius: "999px",
    color: "#a8b2c1",
    fontSize: "12px",
  },

  greenDot: {
    display: "inline-block",
    width: "7px",
    height: "7px",
    flexShrink: 0,
    borderRadius: "50%",
    background: "#6bd98b",
  },

  tableHeader: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 1fr) 140px 70px",
    gap: "12px",
    padding: "12px 24px",
    color: "#697486",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  playerRow: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 1fr) 140px 70px",
    alignItems: "center",
    gap: "12px",
    padding: "14px 24px",
    borderTop: "1px solid #222933",
  },

  playerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: 0,
  },

  avatar: {
    display: "grid",
    placeItems: "center",
    width: "38px",
    height: "38px",
    flexShrink: 0,
    borderRadius: "10px",
    background: "#202731",
    color: "#ff6877",
    fontWeight: "800",
  },

  playerName: {
    display: "block",
    marginBottom: "3px",
    color: "#f4f6fa",
    fontSize: "14px",
  },

  playerRole: {
    display: "block",
    color: "#687385",
    fontSize: "11px",
  },

  statusBadge: {
    width: "fit-content",
    padding: "7px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "700",
  },

  confirmed: {
    background: "rgba(71, 189, 111, 0.12)",
    color: "#69d98c",
  },

  pending: {
    background: "rgba(230, 174, 61, 0.12)",
    color: "#efbd5a",
  },

  unavailable: {
    background: "rgba(216, 63, 77, 0.12)",
    color: "#f26a76",
  },

  rate: {
    color: "#cbd2dc",
    fontSize: "13px",
  },

  progressCircle: {
    display: "grid",
    placeItems: "center",
    width: "164px",
    height: "164px",
    margin: "24px auto 30px",
    borderRadius: "50%",
    background:
      "conic-gradient(#dd6069 0deg 331deg, #2a323c 331deg 360deg)",
  },

  progressCircleInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "138px",
    height: "138px",
    borderRadius: "50%",
    background: "#13181f",
  },

  progressNumber: {
    color: "#f4f6fa",
    fontSize: "30px",
  },

  progressText: {
    marginTop: "4px",
    color: "#778294",
    fontSize: "11px",
  },

  statRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    padding: "14px 0",
    borderTop: "1px solid #252c35",
    color: "#929cad",
    fontSize: "13px",
  },

  insightBox: {
    marginTop: "18px",
    padding: "16px",
    border: "1px solid #34303a",
    borderRadius: "12px",
    background: "#191820",
  },

  insightLabel: {
    color: "#ff6474",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.3px",
  },

  insightText: {
    margin: "8px 0 0",
    color: "#aab3c0",
    fontSize: "12px",
    lineHeight: 1.55,
  },

  successToast: {
    position: "fixed",
    right: "28px",
    bottom: "28px",
    zIndex: 1100,
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "13px 17px",
    border: "1px solid #30453a",
    borderRadius: "12px",
    background: "#18231d",
    color: "#b9e9c8",
    boxShadow: "0 14px 40px rgba(0, 0, 0, 0.35)",
    fontSize: "13px",
    fontWeight: "700",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "grid",
    placeItems: "center",
    padding: "24px",
    background: "rgba(3, 6, 10, 0.82)",
    backdropFilter: "blur(5px)",
    boxSizing: "border-box",
  },

  modal: {
    display: "flex",
    flexDirection: "column",
    width: "min(900px, 95vw)",
    maxHeight: "88vh",
    overflow: "hidden",
    border: "1px solid #303844",
    borderRadius: "20px",
    background: "#13181f",
    boxShadow: "0 30px 90px rgba(0, 0, 0, 0.55)",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    padding: "24px",
    borderBottom: "1px solid #262d36",
  },

  modalTitle: {
    margin: "0 0 7px",
    color: "#f4f6fa",
    fontSize: "24px",
  },

  modalSubtitle: {
    margin: 0,
    color: "#8792a3",
    fontSize: "13px",
  },

  closeButton: {
    width: "38px",
    height: "38px",
    flexShrink: 0,
    border: "1px solid #303844",
    borderRadius: "10px",
    background: "#1a2029",
    color: "#c7ced8",
    cursor: "pointer",
    fontSize: "24px",
    lineHeight: 1,
  },

  modalPlayerList: {
    flex: 1,
    overflowY: "auto",
  },

  modalPlayerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "15px 24px",
    borderBottom: "1px solid #222933",
  },

  statusButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    flexWrap: "wrap",
  },

  statusOption: {
    padding: "8px 11px",
    border: "1px solid #303844",
    borderRadius: "999px",
    background: "#171d25",
    color: "#8f99a8",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "700",
  },

  selectedConfirmed: {
    borderColor: "rgba(71, 189, 111, 0.55)",
    background: "rgba(71, 189, 111, 0.16)",
    color: "#69d98c",
  },

  selectedPending: {
    borderColor: "rgba(230, 174, 61, 0.55)",
    background: "rgba(230, 174, 61, 0.16)",
    color: "#efbd5a",
  },

  selectedUnavailable: {
    borderColor: "rgba(216, 63, 77, 0.55)",
    background: "rgba(216, 63, 77, 0.16)",
    color: "#f26a76",
  },

  modalFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "18px 24px",
    borderTop: "1px solid #262d36",
    background: "#11161c",
  },

  modalTotals: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    color: "#7f8999",
    fontSize: "11px",
  },

  modalActions: {
    display: "flex",
    gap: "10px",
  },

  secondaryButton: {
    padding: "11px 16px",
    border: "1px solid #303844",
    borderRadius: "10px",
    background: "transparent",
    color: "#aab3c0",
    cursor: "pointer",
    fontWeight: "700",
  },

  saveButton: {
    padding: "11px 17px",
    border: "none",
    borderRadius: "10px",
    background: "#d83f4d",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "800",
  },


  parentCalendarSearchPanel: {
    marginBottom: "18px",
    padding: "18px",
    border: "1px solid #29303a",
    borderRadius: "16px",
    background: "#13181f",
  },

  parentCalendarSearchRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  parentCalendarSearchBox: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    minHeight: "48px",
    padding: "0 12px",
    border: "1px solid #3a4350",
    borderRadius: "12px",
    background: "#0f141a",
  },

  parentCalendarSearchIcon: {
    marginRight: "10px",
    color: "#7f8a9b",
    fontSize: "22px",
  },

  parentCalendarSearchInput: {
    flex: 1,
    minWidth: 0,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#f4f6fa",
    fontSize: "14px",
  },

  parentCalendarClearButton: {
    border: "none",
    background: "transparent",
    color: "#ff7782",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "800",
  },

  parentCalendarResultCount: {
    display: "flex",
    flexDirection: "column",
    minWidth: "92px",
    color: "#8c97a8",
    fontSize: "11px",
  },

  parentCalendarFilterRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "14px",
  },

  parentCalendarFilterButton: {
    padding: "8px 12px",
    border: "1px solid #303844",
    borderRadius: "999px",
    background: "#171d25",
    color: "#8f99a8",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
  },

  parentCalendarFilterButtonActive: {
    borderColor: "#d75a67",
    background: "rgba(215, 90, 103, 0.15)",
    color: "#ff8993",
  },

  parentCalendarSummaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "18px",
  },

  parentCalendarSummaryCard: {
    display: "flex",
    flexDirection: "column",
    minHeight: "108px",
    padding: "18px",
    border: "1px solid #29303a",
    borderRadius: "15px",
    background: "#13181f",
  },

  parentCalendarSummaryTitle: {
    margin: "10px 0 6px",
    color: "#f4f6fa",
    fontSize: "17px",
  },

  parentCalendarLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.65fr) minmax(320px, 0.85fr)",
    gap: "18px",
    alignItems: "start",
  },

  parentCalendarAgendaCard: {
    overflow: "hidden",
    border: "1px solid #29303a",
    borderRadius: "18px",
    background: "#13181f",
  },

  parentCalendarSectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    padding: "22px",
    borderBottom: "1px solid #262d36",
  },

  parentCalendarMonthBadge: {
    padding: "7px 10px",
    border: "1px solid #303844",
    borderRadius: "999px",
    color: "#8c97a8",
    fontSize: "10px",
    fontWeight: "800",
  },

  parentCalendarAgendaList: {
    display: "flex",
    flexDirection: "column",
  },

  parentCalendarAgendaItem: {
    display: "grid",
    gridTemplateColumns: "58px minmax(0, 1fr) 20px",
    alignItems: "center",
    gap: "15px",
    width: "100%",
    padding: "17px 20px",
    border: "none",
    borderBottom: "1px solid #242b34",
    background: "transparent",
    color: "#f4f6fa",
    textAlign: "left",
    cursor: "pointer",
  },

  parentCalendarAgendaItemActive: {
    background: "linear-gradient(90deg, rgba(215, 90, 103, 0.12), rgba(215, 90, 103, 0.03))",
    boxShadow: "inset 3px 0 0 #d75a67",
  },

  parentCalendarDateBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "54px",
    height: "58px",
    border: "1px solid #303844",
    borderRadius: "12px",
    background: "#181e26",
  },

  parentCalendarAgendaMain: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    minWidth: 0,
  },

  parentCalendarAgendaTopLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
  },

  parentCalendarTypeBadge: {
    width: "fit-content",
    padding: "6px 9px",
    borderRadius: "999px",
    fontSize: "10px",
    fontWeight: "800",
  },

  parentCalendarTraining: {
    background: "rgba(77, 158, 236, 0.15)",
    color: "#8fc8ff",
  },

  parentCalendarMatch: {
    background: "rgba(217, 87, 101, 0.16)",
    color: "#ff8b97",
  },

  parentCalendarClub: {
    background: "rgba(163, 110, 232, 0.16)",
    color: "#c59cf7",
  },

  parentCalendarMeeting: {
    background: "rgba(224, 168, 79, 0.16)",
    color: "#efc16f",
  },

  parentCalendarMeta: {
    color: "#8893a4",
    fontSize: "12px",
  },

  parentCalendarTeamLine: {
    color: "#626e80",
    fontSize: "11px",
  },

  parentCalendarChevron: {
    color: "#596475",
    fontSize: "22px",
  },

  parentCalendarDetailCard: {
    position: "sticky",
    top: "20px",
    padding: "22px",
    border: "1px solid #29303a",
    borderRadius: "18px",
    background: "#13181f",
  },

  parentCalendarDetailHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
  },

  parentCalendarDetailDate: {
    color: "#7f8999",
    fontSize: "11px",
  },

  parentCalendarDetailTitle: {
    margin: "18px 0",
    color: "#f4f6fa",
    fontSize: "23px",
    lineHeight: 1.25,
  },

  parentCalendarDetailRows: {
    borderTop: "1px solid #252c35",
  },

  parentCalendarDetailRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "18px",
    padding: "13px 0",
    borderBottom: "1px solid #252c35",
    color: "#8f99a9",
    fontSize: "12px",
  },

  parentCalendarDescription: {
    marginTop: "18px",
    padding: "16px",
    border: "1px solid #34303a",
    borderRadius: "12px",
    background: "#191820",
    color: "#aab3c0",
    fontSize: "12px",
    lineHeight: 1.6,
  },

  parentCalendarReminderButton: {
    width: "100%",
    marginTop: "16px",
    padding: "12px 16px",
    border: "none",
    borderRadius: "10px",
    background: "#d83f4d",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "800",
  },

  parentCalendarEmptyState: {
    padding: "48px 24px",
    color: "#8d97a7",
    textAlign: "center",
  },

  parentCalendarModal: {
    display: "flex",
    flexDirection: "column",
    width: "min(620px, 94vw)",
    maxHeight: "88vh",
    overflow: "hidden",
    border: "1px solid #303844",
    borderRadius: "20px",
    background: "#13181f",
    boxShadow: "0 30px 90px rgba(0, 0, 0, 0.55)",
  },

  parentCalendarFormBody: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "22px 24px",
    overflowY: "auto",
  },

  parentCalendarFormGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },

  parentCalendarField: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    color: "#929cad",
    fontSize: "12px",
    fontWeight: "700",
  },

  parentCalendarInput: {
    width: "100%",
    minHeight: "42px",
    padding: "0 12px",
    border: "1px solid #303844",
    borderRadius: "10px",
    outline: "none",
    background: "#171d25",
    color: "#f4f6fa",
    boxSizing: "border-box",
    font: "inherit",
  },

  parentCalendarTextarea: {
    width: "100%",
    minHeight: "90px",
    padding: "12px",
    border: "1px solid #303844",
    borderRadius: "10px",
    outline: "none",
    resize: "vertical",
    background: "#171d25",
    color: "#f4f6fa",
    boxSizing: "border-box",
    font: "inherit",
  },

  parentCalendarModalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    padding: "18px 24px",
    borderTop: "1px solid #262d36",
    background: "#11161c",
  },



  teamHubHero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "28px",
    marginBottom: "20px",
    padding: "30px",
    border: "1px solid #332e37",
    borderRadius: "20px",
    background:
      "radial-gradient(circle at 88% 16%, rgba(217, 63, 77, 0.22), transparent 31%), linear-gradient(120deg, #171f28, #11171e)",
  },

  teamHubHeroTitle: {
    maxWidth: "720px",
    margin: "8px 0 10px",
    color: "#f4f6fa",
    fontSize: "34px",
    lineHeight: 1.15,
  },

  teamHubHeroText: {
    maxWidth: "760px",
    margin: 0,
    color: "#98a3b1",
    fontSize: "14px",
    lineHeight: 1.65,
  },

  teamHubAiBadge: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: "210px",
    padding: "16px",
    border: "1px solid #47343b",
    borderRadius: "14px",
    background: "#10151b",
  },

  teamHubAiPulse: {
    width: "11px",
    height: "11px",
    borderRadius: "50%",
    background: "#ff6877",
    boxShadow: "0 0 0 6px rgba(255, 104, 119, 0.12)",
  },

  teamHubMetricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "18px",
  },

  teamHubMetricCard: {
    display: "flex",
    flexDirection: "column",
    minHeight: "112px",
    padding: "18px",
    border: "1px solid #29303a",
    borderRadius: "15px",
    background: "#13181f",
  },

  teamHubMetricValue: {
    margin: "10px 0 6px",
    color: "#f4f6fa",
    fontSize: "30px",
  },

  teamHubMetricPositive: {
    color: "#6bd98b",
    fontSize: "11px",
  },

  teamHubTabs: {
    display: "flex",
    gap: "8px",
    marginBottom: "18px",
    padding: "6px",
    border: "1px solid #29303a",
    borderRadius: "12px",
    background: "#10151b",
  },

  teamHubTabButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "9px",
    background: "transparent",
    color: "#8994a5",
    cursor: "pointer",
    fontWeight: "750",
  },

  teamHubTabButtonActive: {
    background: "#202731",
    color: "#ffffff",
  },

  teamHubMainGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.7fr) minmax(320px, 0.8fr)",
    gap: "18px",
    alignItems: "start",
  },

  teamHubTableCard: {
    overflow: "hidden",
    border: "1px solid #29303a",
    borderRadius: "18px",
    background: "#13181f",
  },

  teamHubSectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    padding: "22px",
    borderBottom: "1px solid #252c35",
  },

  teamHubLiveTag: {
    height: "fit-content",
    padding: "7px 10px",
    border: "1px solid #30453a",
    borderRadius: "999px",
    background: "#16231c",
    color: "#70da90",
    fontSize: "10px",
    fontWeight: "800",
  },

  teamHubTableHeader: {
    display: "grid",
    gridTemplateColumns: "minmax(230px, 1fr) 70px 60px 60px 90px 70px",
    gap: "12px",
    padding: "12px 20px",
    color: "#687486",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
  },

  teamHubPlayerRow: {
    display: "grid",
    gridTemplateColumns: "minmax(230px, 1fr) 70px 60px 60px 90px 70px",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "15px 20px",
    border: "none",
    borderTop: "1px solid #222933",
    background: "transparent",
    color: "#c8d0db",
    textAlign: "left",
    cursor: "pointer",
  },

  teamHubPlayerRowActive: {
    background:
      "linear-gradient(90deg, rgba(216, 63, 77, 0.12), rgba(216, 63, 77, 0.02))",
    boxShadow: "inset 3px 0 0 #d83f4d",
  },

  teamHubPlayerIdentity: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: 0,
  },

  teamHubRating: {
    color: "#ffffff",
    fontSize: "16px",
  },

  teamHubTrend: {
    color: "#6bd98b",
    fontWeight: "800",
  },

  teamHubPlayerPanel: {
    position: "sticky",
    top: "20px",
    padding: "22px",
    border: "1px solid #29303a",
    borderRadius: "18px",
    background: "#13181f",
  },

  teamHubPlayerPanelHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "18px",
  },

  teamHubPlayerTitle: {
    margin: "4px 0",
    color: "#f4f6fa",
    fontSize: "22px",
  },

  teamHubPlayerMiniGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    marginBottom: "16px",
  },

  teamHubAiSummary: {
    marginBottom: "14px",
    padding: "16px",
    border: "1px solid #3a3038",
    borderRadius: "12px",
    background: "#191820",
    color: "#aab3c0",
    fontSize: "12px",
    lineHeight: 1.6,
  },

  teamHubDevelopmentRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    padding: "13px 0",
    borderTop: "1px solid #252c35",
    color: "#8f99a9",
    fontSize: "12px",
  },

  teamHubInsightsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "16px",
  },

  teamHubInsightCard: {
    position: "relative",
    padding: "22px",
    border: "1px solid #29303a",
    borderRadius: "16px",
    background: "#13181f",
  },

  teamHubInsightNumber: {
    marginBottom: "12px",
    color: "#ff6877",
    fontSize: "26px",
    fontWeight: "900",
  },

  teamHubConfidence: {
    display: "inline-block",
    marginBottom: "12px",
    padding: "6px 9px",
    borderRadius: "999px",
    background: "rgba(77, 158, 236, 0.13)",
    color: "#8fc8ff",
    fontSize: "10px",
    fontWeight: "800",
  },

  teamHubRecommendedAction: {
    marginTop: "16px",
    padding: "14px",
    border: "1px solid #34303a",
    borderRadius: "11px",
    background: "#191820",
  },

  teamHubAiCoachCard: {
    padding: "24px",
    border: "1px solid #49333b",
    borderRadius: "16px",
    background:
      "radial-gradient(circle at 90% 12%, rgba(216, 63, 77, 0.18), transparent 34%), #13181f",
  },

  teamHubDevelopmentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
  },

  teamHubDevelopmentCard: {
    padding: "20px",
    border: "1px solid #29303a",
    borderRadius: "16px",
    background: "#13181f",
  },

  teamHubProgressLabel: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "18px",
    color: "#8f99a9",
    fontSize: "11px",
  },

  teamHubProgressTrack: {
    height: "9px",
    margin: "8px 0 16px",
    overflow: "hidden",
    borderRadius: "999px",
    background: "#242b34",
  },

  teamHubProgressFill: {
    display: "block",
    height: "100%",
    borderRadius: "999px",
    background: "#d83f4d",
  },

  teamHubDevelopmentPriority: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginBottom: "16px",
    color: "#8f99a9",
    fontSize: "11px",
  },

  teamHubDifferentiator: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "28px",
    marginTop: "20px",
    padding: "24px",
    border: "1px solid #3b3038",
    borderRadius: "18px",
    background: "#15191f",
  },

  teamHubDifferentiatorSteps: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(120px, 1fr))",
    gap: "10px",
    minWidth: "300px",
  },



  teamHubRoleBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    marginBottom: "16px",
    padding: "16px 18px",
    border: "1px solid #29303a",
    borderRadius: "14px",
    background: "#12171e",
  },

  teamHubRoleTitle: {
    margin: "3px 0 0",
    color: "#f4f6fa",
    fontSize: "16px",
  },

  teamHubRoleToggle: {
    display: "flex",
    gap: "6px",
    padding: "5px",
    borderRadius: "11px",
    background: "#0d1218",
  },

  teamHubRoleButton: {
    padding: "9px 14px",
    border: "none",
    borderRadius: "8px",
    background: "transparent",
    color: "#8792a2",
    cursor: "pointer",
    fontWeight: "750",
  },

  teamHubRoleButtonActive: {
    background: "#d83f4d",
    color: "#ffffff",
  },

  teamHubParentHero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "28px",
    marginBottom: "18px",
    padding: "28px",
    border: "1px solid #3c3038",
    borderRadius: "20px",
    background:
      "radial-gradient(circle at 85% 20%, rgba(216, 63, 77, 0.18), transparent 32%), linear-gradient(120deg, #171d25, #11161c)",
  },

  teamHubPrivacyCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: "220px",
    padding: "15px",
    border: "1px solid #304037",
    borderRadius: "13px",
    background: "#10171a",
  },

  teamHubPrivacyIcon: {
    fontSize: "22px",
  },

  teamHubChildSelectorCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "18px",
    padding: "18px",
    border: "1px solid #29303a",
    borderRadius: "16px",
    background: "#13181f",
  },

  teamHubChildButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  teamHubChildButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: "210px",
    padding: "12px",
    border: "1px solid #303844",
    borderRadius: "12px",
    background: "#171d25",
    color: "#d7dde6",
    cursor: "pointer",
    textAlign: "left",
  },

  teamHubChildButtonActive: {
    borderColor: "#d85b67",
    background: "rgba(216, 63, 77, 0.12)",
  },

  teamHubParentWelcome: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "18px",
    padding: "22px",
    border: "1px solid #3b3138",
    borderRadius: "16px",
    background: "#17191f",
  },

  teamHubEmotionBadge: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "110px",
    padding: "14px",
    borderRadius: "12px",
    background: "#132019",
    color: "#6bd98b",
  },

  teamHubParentGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.35fr) minmax(300px, 0.65fr)",
    gap: "18px",
  },

  teamHubParentMainCard: {
    padding: "22px",
    border: "1px solid #29303a",
    borderRadius: "18px",
    background: "#13181f",
  },

  teamHubParentMetricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "10px",
    marginBottom: "16px",
  },

  teamHubParentSideStack: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  teamHubParentSideCard: {
    padding: "18px",
    border: "1px solid #29303a",
    borderRadius: "15px",
    background: "#13181f",
  },

  teamHubStrengthList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "16px",
  },

  teamHubParentReportGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "16px",
  },

  teamHubEventList: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
  },

  teamHubEventCard: {
    padding: "20px",
    border: "1px solid #29303a",
    borderRadius: "16px",
    background: "#13181f",
  },

  teamHubFutureCard: {
    padding: "22px",
    border: "1px solid #3b3341",
    borderRadius: "16px",
    background:
      "radial-gradient(circle at 85% 15%, rgba(163, 110, 232, 0.14), transparent 36%), #13181f",
  },

  teamHubVisionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "16px",
  },

  teamHubRoadmapBadge: {
    display: "inline-block",
    marginTop: "12px",
    padding: "6px 9px",
    borderRadius: "999px",
    background: "rgba(163, 110, 232, 0.14)",
    color: "#c59cf7",
    fontSize: "10px",
    fontWeight: "800",
  },

  teamHubFullReportModal: {
    display: "flex",
    flexDirection: "column",
    width: "min(760px, 94vw)",
    maxHeight: "90vh",
    overflow: "hidden",
    border: "1px solid #303844",
    borderRadius: "20px",
    background: "#13181f",
    boxShadow: "0 30px 90px rgba(0, 0, 0, 0.55)",
  },

  teamHubFullReportBody: {
    padding: "22px 24px",
    overflowY: "auto",
  },

  teamHubReportMetricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "10px",
    marginBottom: "16px",
  },

  teamHubReportSection: {
    marginBottom: "14px",
    padding: "17px",
    border: "1px solid #2d343e",
    borderRadius: "13px",
    background: "#171d25",
  },

  teamHubReportVisionPreview: {
    padding: "17px",
    border: "1px solid #403344",
    borderRadius: "13px",
    background: "#17161d",
  },

  teamHubMockPitch: {
    position: "relative",
    height: "210px",
    margin: "14px 0",
    overflow: "hidden",
    border: "1px solid #3b4b40",
    borderRadius: "12px",
    background:
      "linear-gradient(90deg, transparent 49.5%, rgba(255,255,255,0.13) 50%, transparent 50.5%), #17261d",
  },

  teamHubMockHeatOne: {
    position: "absolute",
    left: "62%",
    top: "22%",
    width: "110px",
    height: "90px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,90,80,0.68), rgba(255,140,70,0.18), transparent 70%)",
  },

  teamHubMockHeatTwo: {
    position: "absolute",
    left: "42%",
    top: "48%",
    width: "95px",
    height: "78px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,190,70,0.6), rgba(255,190,70,0.14), transparent 70%)",
  },

  teamHubMockHeatThree: {
    position: "absolute",
    left: "72%",
    top: "58%",
    width: "80px",
    height: "62px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,90,80,0.55), rgba(255,90,80,0.12), transparent 70%)",
  },

  teamHubPitchLine: {
    position: "absolute",
    inset: "12px",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "4px",
  },



  matchRoleBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    marginBottom: "16px",
    padding: "16px 18px",
    border: "1px solid #29303a",
    borderRadius: "14px",
    background: "#12171e",
  },

  matchLibraryHero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "28px",
    marginBottom: "18px",
    padding: "28px",
    border: "1px solid #3b3038",
    borderRadius: "20px",
    background:
      "radial-gradient(circle at 86% 18%, rgba(216, 63, 77, 0.2), transparent 32%), linear-gradient(120deg, #171e27, #11161c)",
  },

  matchHeroActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    minWidth: "260px",
  },

  matchPermissionStrip: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "18px",
    padding: "17px 19px",
    border: "1px solid #303844",
    borderRadius: "15px",
    background: "#151a21",
    color: "#aab3c0",
  },

  matchPermissionIcon: {
    display: "grid",
    placeItems: "center",
    width: "46px",
    height: "46px",
    borderRadius: "12px",
    background: "#202731",
    fontSize: "22px",
  },

  matchLibraryMetrics: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "18px",
  },

  matchPrivacyMetric: {
    margin: "12px 0 7px",
    color: "#f4f6fa",
    fontSize: "18px",
  },

  matchLibraryGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.15fr) minmax(360px, 0.85fr)",
    gap: "18px",
    alignItems: "start",
  },

  matchLibraryListCard: {
    overflow: "hidden",
    border: "1px solid #29303a",
    borderRadius: "18px",
    background: "#13181f",
  },

  matchLibraryList: {
    display: "flex",
    flexDirection: "column",
  },

  matchLibraryItem: {
    display: "grid",
    gridTemplateColumns: "72px minmax(0, 1fr) 20px",
    alignItems: "center",
    gap: "14px",
    width: "100%",
    padding: "15px 18px",
    border: "none",
    borderTop: "1px solid #242b34",
    background: "transparent",
    color: "#d7dde6",
    textAlign: "left",
    cursor: "pointer",
  },

  matchLibraryItemActive: {
    background:
      "linear-gradient(90deg, rgba(216, 63, 77, 0.13), rgba(216, 63, 77, 0.02))",
    boxShadow: "inset 3px 0 0 #d83f4d",
  },

  matchLibraryThumbnail: {
    display: "grid",
    placeItems: "center",
    width: "68px",
    height: "48px",
    border: "1px solid #35404b",
    borderRadius: "9px",
    background: "#1a2520",
    color: "#ffffff",
  },

  matchLibraryItemMain: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    minWidth: 0,
  },

  matchLibraryItemTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
  },

  matchStatusBadge: {
    padding: "5px 8px",
    borderRadius: "999px",
    fontSize: "9px",
    fontWeight: "850",
  },

  matchStatusComplete: {
    background: "rgba(78, 190, 113, 0.14)",
    color: "#72dc92",
  },

  matchStatusProcessing: {
    background: "rgba(224, 168, 79, 0.14)",
    color: "#efc16f",
  },

  matchLibraryPreviewCard: {
    padding: "18px",
    border: "1px solid #29303a",
    borderRadius: "18px",
    background: "#13181f",
  },

  matchVideoFrame: {
    position: "relative",
    height: "270px",
    overflow: "hidden",
    border: "1px solid #35433a",
    borderRadius: "14px",
    background: "#17251c",
  },

  matchVideoFrameCompact: {
    height: "180px",
  },

  matchVideoPitch: {
    position: "absolute",
    inset: "14px",
    border: "1px solid rgba(255,255,255,0.19)",
    borderRadius: "5px",
  },

  matchVideoCentreLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    width: "1px",
    background: "rgba(255,255,255,0.16)",
  },

  matchVideoPlayerOne: {
    position: "absolute",
    left: "65%",
    top: "27%",
    display: "grid",
    placeItems: "center",
    width: "29px",
    height: "29px",
    borderRadius: "50%",
    background: "#d83f4d",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "900",
  },

  matchVideoPlayerTwo: {
    position: "absolute",
    left: "49%",
    top: "56%",
    display: "grid",
    placeItems: "center",
    width: "29px",
    height: "29px",
    borderRadius: "50%",
    background: "#d83f4d",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "900",
  },

  matchVideoPlayerThree: {
    position: "absolute",
    left: "28%",
    top: "37%",
    display: "grid",
    placeItems: "center",
    width: "29px",
    height: "29px",
    borderRadius: "50%",
    background: "#d83f4d",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "900",
  },

  matchVideoBall: {
    position: "absolute",
    left: "59%",
    top: "43%",
    color: "#fff",
    fontSize: "12px",
  },

  matchVideoOverlay: {
    position: "absolute",
    left: "14px",
    right: "14px",
    bottom: "14px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderRadius: "10px",
    background: "rgba(9, 13, 17, 0.86)",
    color: "#f4f6fa",
  },

  matchVideoPlay: {
    display: "grid",
    placeItems: "center",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#d83f4d",
  },

  matchLibraryPreviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    marginTop: "18px",
  },

  matchPreviewStats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "8px",
    margin: "16px 0",
  },

  matchAiExplainer: {
    marginBottom: "14px",
    padding: "15px",
    border: "1px solid #39313a",
    borderRadius: "12px",
    background: "#191820",
    color: "#aab3c0",
    fontSize: "12px",
    lineHeight: 1.6,
  },

  matchDisabledButton: {
    cursor: "not-allowed",
    opacity: 0.45,
  },

  matchPipeline: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "12px",
    marginTop: "18px",
    padding: "18px",
    border: "1px solid #29303a",
    borderRadius: "16px",
    background: "#11161c",
  },

  matchUploadModal: {
    display: "flex",
    flexDirection: "column",
    width: "min(700px, 94vw)",
    maxHeight: "90vh",
    overflow: "hidden",
    border: "1px solid #303844",
    borderRadius: "20px",
    background: "#13181f",
  },

  matchUploadBody: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "22px 24px",
    overflowY: "auto",
  },

  matchUploadDropzone: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "150px",
    padding: "24px",
    border: "1px dashed #4a5564",
    borderRadius: "14px",
    background: "#11171e",
    color: "#9ca6b5",
    cursor: "pointer",
    textAlign: "center",
  },

  matchHiddenFile: {
    display: "none",
  },

  matchUploadIcon: {
    marginBottom: "10px",
    color: "#ff6e7b",
    fontSize: "32px",
  },

  matchConsentBox: {
    padding: "15px",
    border: "1px solid #3a3741",
    borderRadius: "12px",
    background: "#181820",
    color: "#9fa9b7",
  },

  matchUploadProgress: {
    position: "relative",
    overflow: "hidden",
    minHeight: "42px",
    padding: "12px",
    borderRadius: "10px",
    background: "#202731",
    color: "#ffffff",
  },

  matchUploadProgressFill: {
    position: "absolute",
    inset: 0,
    right: "auto",
    background: "rgba(216, 63, 77, 0.28)",
    transition: "width 0.4s ease",
  },

  matchPrivacyModal: {
    display: "flex",
    flexDirection: "column",
    width: "min(720px, 94vw)",
    maxHeight: "90vh",
    overflow: "hidden",
    border: "1px solid #303844",
    borderRadius: "20px",
    background: "#13181f",
  },

  matchPrivacyBody: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 24px 22px",
    overflowY: "auto",
  },

  matchPrivacyControl: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    padding: "16px 0",
    borderBottom: "1px solid #252c35",
    color: "#c8d0da",
  },

  matchAnalysisModal: {
    display: "flex",
    flexDirection: "column",
    width: "min(1080px, 96vw)",
    maxHeight: "92vh",
    overflow: "hidden",
    border: "1px solid #303844",
    borderRadius: "20px",
    background: "#11161c",
  },

  matchAnalysisBody: {
    padding: "20px 24px 26px",
    overflowY: "auto",
  },

  matchAnalysisIntro: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "24px",
    marginBottom: "16px",
    padding: "21px",
    border: "1px solid #34303a",
    borderRadius: "15px",
    background: "#171920",
  },

  matchAnalysisRating: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "140px",
    padding: "16px",
    borderRadius: "13px",
    background: "#202731",
  },

  matchAnalysisStatGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: "10px",
    marginBottom: "16px",
  },

  matchAnalysisStatCard: {
    display: "flex",
    flexDirection: "column",
    minHeight: "90px",
    padding: "14px",
    border: "1px solid #29303a",
    borderRadius: "12px",
    background: "#151a21",
  },

  matchAnalysisTwoColumn: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px",
  },

  matchHighlightGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "14px",
  },

  matchHighlightCard: {
    padding: "17px",
    border: "1px solid #29303a",
    borderRadius: "14px",
    background: "#151a21",
  },

  matchHighlightPreview: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "110px",
    padding: "14px",
    borderRadius: "10px",
    background: "#19271e",
    color: "#ffffff",
  },

  matchHomeActivity: {
    display: "flex",
    flexDirection: "column",
    marginTop: "14px",
    padding: "13px",
    borderRadius: "10px",
    background: "#202731",
  },

  matchCoachPlayerTable: {
    overflow: "hidden",
    border: "1px solid #29303a",
    borderRadius: "14px",
  },

  matchCoachPlayerHeader: {
    display: "grid",
    gridTemplateColumns: "1.4fr repeat(5, 0.7fr)",
    gap: "10px",
    padding: "12px 15px",
    background: "#10151b",
    color: "#687486",
    fontSize: "10px",
    fontWeight: "850",
    textTransform: "uppercase",
  },

  matchCoachPlayerRow: {
    display: "grid",
    gridTemplateColumns: "1.4fr repeat(5, 0.7fr)",
    gap: "10px",
    width: "100%",
    padding: "15px",
    border: "none",
    borderTop: "1px solid #252c35",
    background: "#151a21",
    color: "#c8d0da",
    textAlign: "left",
    cursor: "pointer",
  },

  matchTrainingPlan: {
    overflow: "hidden",
    border: "1px solid #29303a",
    borderRadius: "16px",
    background: "#151a21",
  },

  matchTrainingPlanHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "22px",
    borderBottom: "1px solid #29303a",
  },

  matchTrainingStage: {
    display: "grid",
    gridTemplateColumns: "80px 180px minmax(0, 1fr)",
    alignItems: "center",
    gap: "15px",
    padding: "16px 22px",
    borderBottom: "1px solid #252c35",
    color: "#aab3c0",
  },

  matchAnalysisLandingGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.3fr) minmax(330px, 0.7fr)",
    gap: "18px",
    marginBottom: "16px",
  },



  teamHubRoleBar: {
    display: "none",
  },

  matchRoleBar: {
    display: "none",
  },

  messageHero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "24px",
    marginBottom: "18px",
    padding: "28px",
    border: "1px solid #3a3038",
    borderRadius: "20px",
    background:
      "radial-gradient(circle at 88% 15%, rgba(216,63,77,0.18), transparent 32%), linear-gradient(120deg,#171e27,#11161c)",
  },

  messageAccessBanner: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "18px",
    padding: "17px 19px",
    border: "1px solid #303844",
    borderRadius: "15px",
    background: "#151a21",
    color: "#aab3c0",
  },

  messageMetricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,minmax(0,1fr))",
    gap: "16px",
    marginBottom: "18px",
  },

  messageLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(260px,0.72fr) minmax(420px,1.25fr) minmax(290px,0.78fr)",
    gap: "16px",
    alignItems: "start",
  },

  messageInboxCard: {
    overflow: "hidden",
    border: "1px solid #29303a",
    borderRadius: "17px",
    background: "#13181f",
  },

  messageThread: {
    display: "grid",
    gridTemplateColumns: "42px minmax(0,1fr) 28px",
    alignItems: "center",
    gap: "11px",
    width: "100%",
    padding: "14px",
    border: "none",
    borderTop: "1px solid #252c35",
    background: "transparent",
    color: "#d7dde6",
    textAlign: "left",
    cursor: "pointer",
  },

  messageThreadActive: {
    background: "linear-gradient(90deg,rgba(216,63,77,.13),rgba(216,63,77,.02))",
    boxShadow: "inset 3px 0 0 #d83f4d",
  },

  messageThreadAvatar: {
    display: "grid",
    placeItems: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#202731",
    color: "#ff8791",
    fontSize: "11px",
    fontWeight: "900",
  },

  messageThreadMain: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: 0,
  },

  messageThreadTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },

  messagePriority: {
    color: "#efc16f",
  },

  messageUnreadBadge: {
    display: "grid",
    placeItems: "center",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#d83f4d",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "900",
  },

  messageConversationCard: {
    overflow: "hidden",
    border: "1px solid #29303a",
    borderRadius: "17px",
    background: "#13181f",
  },

  messageConversationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    padding: "20px",
    borderBottom: "1px solid #252c35",
  },

  messageConversationBody: {
    display: "flex",
    flexDirection: "column",
    gap: "13px",
    minHeight: "370px",
    padding: "20px",
  },

  messageBubbleIncoming: {
    maxWidth: "78%",
    padding: "13px 15px",
    borderRadius: "4px 14px 14px 14px",
    background: "#202731",
    color: "#c8d0da",
  },

  messageBubbleOutgoing: {
    alignSelf: "flex-end",
    maxWidth: "78%",
    padding: "13px 15px",
    borderRadius: "14px 4px 14px 14px",
    background: "rgba(216,63,77,.18)",
    color: "#f4f6fa",
  },

  messageAiSummary: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    margin: "0 20px 20px",
    padding: "16px",
    border: "1px solid #40333b",
    borderRadius: "12px",
    background: "#191820",
  },

  messageDirectoryCard: {
    padding: "18px",
    border: "1px solid #29303a",
    borderRadius: "17px",
    background: "#13181f",
  },

  messageSearchBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "15px 0 11px",
    padding: "0 11px",
    minHeight: "43px",
    border: "1px solid #303844",
    borderRadius: "10px",
    background: "#0f141a",
  },

  messageGroupFilters: {
    display: "flex",
    flexWrap: "wrap",
    gap: "7px",
    marginBottom: "12px",
  },

  messageContactList: {
    display: "flex",
    flexDirection: "column",
  },

  messageContact: {
    display: "grid",
    gridTemplateColumns: "38px minmax(0,1fr) 15px",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    padding: "12px 0",
    border: "none",
    borderBottom: "1px solid #252c35",
    background: "transparent",
    color: "#c8d0da",
    textAlign: "left",
    cursor: "pointer",
  },

  messageContactInitials: {
    display: "grid",
    placeItems: "center",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#202731",
    color: "#8fc8ff",
    fontSize: "10px",
    fontWeight: "900",
  },

  messageUniqueFeature: {
    marginTop: "16px",
    padding: "15px",
    border: "1px solid #3b3341",
    borderRadius: "12px",
    background: "#18171f",
  },

  messageComposeModal: {
    display: "flex",
    flexDirection: "column",
    width: "min(720px,94vw)",
    maxHeight: "90vh",
    overflow: "hidden",
    border: "1px solid #303844",
    borderRadius: "20px",
    background: "#13181f",
  },

  messageComposeBody: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "22px 24px",
    overflowY: "auto",
  },

  messageComposeTextarea: {
    minHeight: "150px",
    padding: "12px",
    border: "1px solid #303844",
    borderRadius: "10px",
    outline: "none",
    resize: "vertical",
    background: "#171d25",
    color: "#f4f6fa",
    font: "inherit",
  },

  messageAiTools: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  messageToneResult: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "13px",
    border: "1px solid #30453a",
    borderRadius: "10px",
    background: "#16231c",
    color: "#72dc92",
  },

  highlightHero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "24px",
    marginBottom: "18px",
    padding: "28px",
    border: "1px solid #3c3038",
    borderRadius: "20px",
    background:
      "radial-gradient(circle at 87% 16%,rgba(216,63,77,.2),transparent 34%),linear-gradient(120deg,#171e27,#11161c)",
  },

  highlightMetricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,minmax(0,1fr))",
    gap: "16px",
    marginBottom: "18px",
  },

  highlightAdminInsight: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "25px",
    marginBottom: "18px",
    padding: "22px",
    border: "1px solid #3b3341",
    borderRadius: "16px",
    background: "#171820",
  },

  highlightAdminStats: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  highlightGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,minmax(0,1fr))",
    gap: "16px",
  },

  highlightCard: {
    overflow: "hidden",
    border: "1px solid #29303a",
    borderRadius: "16px",
    background: "#13181f",
  },

  highlightPreview: {
    position: "relative",
    display: "block",
    width: "100%",
    height: "180px",
    padding: "12px",
    border: "none",
    background: "#17251c",
    cursor: "pointer",
  },

  highlightPitch: {
    position: "relative",
    width: "100%",
    height: "100%",
    border: "1px solid rgba(255,255,255,.18)",
    borderRadius: "6px",
  },

  highlightPlayerMarker: {
    position: "absolute",
    left: "62%",
    top: "38%",
    display: "grid",
    placeItems: "center",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "#d83f4d",
    color: "#fff",
    fontSize: "9px",
    fontWeight: "900",
  },

  highlightPlayButton: {
    position: "absolute",
    left: "50%",
    top: "50%",
    display: "grid",
    placeItems: "center",
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: "rgba(9,13,17,.82)",
    color: "#fff",
    transform: "translate(-50%,-50%)",
  },

  highlightTimestamp: {
    position: "absolute",
    right: "18px",
    bottom: "17px",
    padding: "5px 7px",
    borderRadius: "6px",
    background: "rgba(9,13,17,.86)",
    color: "#fff",
    fontSize: "10px",
  },

  highlightCardBody: {
    padding: "16px",
  },

  highlightCardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  highlightActions: {
    display: "flex",
    gap: "8px",
    padding: "0 16px 16px",
  },

  highlightUniqueGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,minmax(0,1fr))",
    gap: "16px",
    marginTop: "18px",
  },

  highlightModal: {
    display: "flex",
    flexDirection: "column",
    width: "min(850px,94vw)",
    maxHeight: "90vh",
    overflow: "hidden",
    border: "1px solid #303844",
    borderRadius: "20px",
    background: "#13181f",
  },

  highlightModalBody: {
    display: "grid",
    gridTemplateColumns: "1.2fr .8fr",
    gap: "18px",
    padding: "22px",
    overflowY: "auto",
  },

  highlightModalVideo: {
    height: "330px",
    padding: "14px",
    borderRadius: "14px",
    background: "#17251c",
  },

  highlightExplanation: {
    padding: "18px",
    border: "1px solid #303844",
    borderRadius: "14px",
    background: "#171d25",
  },



  loginPage: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    minHeight: "100vh",
    background: "#0d1218",
    color: "#f4f6fa",
  },

  loginBrandPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100vh",
    padding: "34px 42px",
    boxSizing: "border-box",
    background:
      "radial-gradient(circle at 18% 14%, rgba(216,63,77,.24), transparent 30%), linear-gradient(145deg,#151c25,#0b1016)",
  },

  loginBrandTop: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
  },

  matchVisionMark: {
    display: "grid",
    placeItems: "center",
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "#d83f4d",
    color: "#fff",
    fontWeight: "950",
    letterSpacing: "1px",
  },

  loginBrandName: {
    display: "block",
    fontSize: "18px",
    fontWeight: "900",
    letterSpacing: "2px",
  },

  loginBrandTagline: {
    color: "#8792a2",
  },

  loginBrandContent: {
    maxWidth: "720px",
    padding: "40px 0",
  },

  loginHeroTitle: {
    margin: "10px 0 16px",
    fontSize: "48px",
    lineHeight: 1.08,
  },

  loginHeroText: {
    maxWidth: "680px",
    color: "#9aa5b4",
    fontSize: "16px",
    lineHeight: 1.7,
  },

  loginFeatureStack: {
    display: "grid",
    gridTemplateColumns: "repeat(3,minmax(0,1fr))",
    gap: "13px",
    marginTop: "28px",
  },

  loginClubPreview: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    paddingTop: "20px",
    borderTop: "1px solid #29303a",
  },

  clubCrest: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "62px",
    height: "72px",
    clipPath: "polygon(50% 0,100% 16%,92% 75%,50% 100%,8% 75%,0 16%)",
    background: "linear-gradient(145deg,#e1b82b,#12161b 72%)",
    color: "#fff",
    textShadow: "0 1px 2px #000",
  },

  clubCrestLarge: {
    width: "82px",
    height: "94px",
  },

  loginFormPanel: {
    display: "grid",
    placeItems: "center",
    padding: "34px",
    background: "#10151b",
  },

  loginFormCard: {
    width: "min(520px,100%)",
    padding: "28px",
    border: "1px solid #29303a",
    borderRadius: "22px",
    background: "#151a21",
  },

  loginFormClub: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "22px",
  },

  loginAccountCards: {
    display: "grid",
    gap: "9px",
    marginBottom: "18px",
  },

  loginAccountCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "13px",
    border: "1px solid #303844",
    borderRadius: "12px",
    background: "#10151b",
    color: "#d7dde6",
    textAlign: "left",
    cursor: "pointer",
  },

  loginAccountCardActive: {
    borderColor: "#d85b67",
    background: "rgba(216,63,77,.12)",
    boxShadow: "inset 3px 0 0 #d83f4d",
  },

  loginAccountIcon: {
    display: "grid",
    placeItems: "center",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "#202731",
    color: "#ff8993",
    fontWeight: "900",
  },

  loginPrimaryButton: {
    width: "100%",
    marginTop: "16px",
    padding: "14px",
    border: "none",
    borderRadius: "11px",
    background: "#d83f4d",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "850",
  },

  loginAccessButton: {
    width: "100%",
    marginTop: "9px",
    padding: "11px",
    border: "1px solid #303844",
    borderRadius: "10px",
    background: "transparent",
    color: "#9ca6b5",
    cursor: "pointer",
  },

  loginAccessSummary: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    marginTop: "10px",
    padding: "14px",
    border: "1px solid #34303a",
    borderRadius: "10px",
    background: "#191820",
  },

  loginDivider: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    gap: "10px",
    margin: "20px 0 12px",
    color: "#697486",
  },

  loginGuestButton: {
    width: "100%",
    padding: "13px",
    border: "1px solid #3a4552",
    borderRadius: "11px",
    background: "#202731",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "800",
  },

  loginFinePrint: {
    marginBottom: 0,
    color: "#727d8d",
    fontSize: "11px",
    lineHeight: 1.55,
    textAlign: "center",
  },

  dashboardIdentityBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "16px",
    padding: "14px 18px",
    border: "1px solid #29303a",
    borderRadius: "15px",
    background: "#13181f",
  },

  dashboardClubIdentity: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
  },

  liveDashboardHero: {
    display: "grid",
    gridTemplateColumns: "minmax(0,1.4fr) minmax(280px,.6fr)",
    gap: "28px",
    marginBottom: "16px",
    padding: "32px",
    border: "1px solid #49343b",
    borderRadius: "22px",
    background:
      "radial-gradient(circle at 82% 18%,rgba(216,63,77,.25),transparent 34%),linear-gradient(135deg,#171f29,#0f141b)",
  },

  liveHeroStatus: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "#ff7a86",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "1px",
  },

  livePulse: {
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    background: "#ff4f60",
    boxShadow: "0 0 0 6px rgba(255,79,96,.13)",
  },

  liveHeroCopy: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  liveHeroActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "20px",
  },

  liveWatchButton: {
    padding: "14px 19px",
    border: "none",
    borderRadius: "11px",
    background: "#d83f4d",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "900",
  },

  liveFindButton: {
    padding: "14px 19px",
    border: "1px solid #3c4652",
    borderRadius: "11px",
    background: "#202731",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "800",
  },

  liveHeroMeta: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "17px",
    color: "#7f8999",
    fontSize: "11px",
  },

  liveHeroScorePanel: {
    display: "grid",
    gridTemplateColumns: "1fr auto auto auto 1fr",
    alignItems: "center",
    gap: "14px",
    padding: "24px",
    border: "1px solid #3b434e",
    borderRadius: "17px",
    background: "rgba(10,14,19,.65)",
    textAlign: "center",
  },

  liveAiStrip: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "22px",
    marginBottom: "18px",
    padding: "18px 20px",
    border: "1px solid #3a3139",
    borderRadius: "15px",
    background: "#171820",
  },

  liveAiMetrics: {
    display: "grid",
    gridTemplateColumns: "repeat(2,minmax(110px,1fr))",
    gap: "8px",
  },

  dashboardPrimaryGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0,1.35fr) minmax(300px,.65fr)",
    gap: "18px",
    marginBottom: "18px",
  },

  dashboardMainCard: {
    overflow: "hidden",
    border: "1px solid #29303a",
    borderRadius: "17px",
    background: "#13181f",
  },

  dashboardRoleContent: {
    padding: "20px",
  },

  dashboardPlayerWelcome: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },

  dashboardRoleMetrics: {
    display: "grid",
    gridTemplateColumns: "repeat(4,minmax(0,1fr))",
    gap: "10px",
    marginBottom: "16px",
  },

  dashboardUpcomingCard: {
    padding: "20px",
    border: "1px solid #29303a",
    borderRadius: "17px",
    background: "#13181f",
  },

  dashboardUpcomingItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%",
    padding: "13px 0",
    border: "none",
    borderBottom: "1px solid #252c35",
    background: "transparent",
    color: "#c8d0da",
    textAlign: "left",
    cursor: "pointer",
  },

  liveFinderPreview: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "25px",
    padding: "22px",
    border: "1px solid #3b3341",
    borderRadius: "17px",
    background: "#171820",
  },

  liveFinderModal: {
    display: "flex",
    flexDirection: "column",
    width: "min(820px,94vw)",
    maxHeight: "90vh",
    overflow: "hidden",
    border: "1px solid #303844",
    borderRadius: "20px",
    background: "#13181f",
  },

  liveFinderBody: {
    padding: "20px 24px 24px",
    overflowY: "auto",
  },

  liveGameResults: {
    display: "flex",
    flexDirection: "column",
    marginTop: "14px",
  },

  liveGameResult: {
    display: "grid",
    gridTemplateColumns: "82px minmax(0,1fr) 20px",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "15px 0",
    border: "none",
    borderBottom: "1px solid #252c35",
    background: "transparent",
    color: "#c8d0da",
    textAlign: "left",
    cursor: "pointer",
  },

  liveResultBadge: {
    padding: "7px 9px",
    borderRadius: "999px",
    background: "rgba(216,63,77,.16)",
    color: "#ff8791",
    fontSize: "10px",
    fontWeight: "900",
    textAlign: "center",
  },

  liveGameResultMain: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  liveGameModal: {
    display: "flex",
    flexDirection: "column",
    width: "min(1120px,96vw)",
    maxHeight: "94vh",
    overflow: "hidden",
    border: "1px solid #303844",
    borderRadius: "20px",
    background: "#10151b",
  },

  liveGameModalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    padding: "18px 22px",
    borderBottom: "1px solid #29303a",
  },

  liveGameModalBody: {
    padding: "18px 22px 24px",
    overflowY: "auto",
  },

  liveStreamFrame: {
    position: "relative",
    height: "430px",
    marginBottom: "16px",
    overflow: "hidden",
    border: "1px solid #35433a",
    borderRadius: "14px",
    background: "#17251c",
  },

  liveStreamPitch: {
    position: "absolute",
    inset: "18px",
    border: "1px solid rgba(255,255,255,.18)",
    borderRadius: "5px",
  },

  liveStreamPlayerOne: {
    position: "absolute",
    left: "65%",
    top: "30%",
    display: "grid",
    placeItems: "center",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#d83f4d",
    color: "#fff",
    fontWeight: "900",
  },

  liveStreamPlayerTwo: {
    position: "absolute",
    left: "49%",
    top: "54%",
    display: "grid",
    placeItems: "center",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#d83f4d",
    color: "#fff",
    fontWeight: "900",
  },

  liveStreamPlayerThree: {
    position: "absolute",
    left: "29%",
    top: "40%",
    display: "grid",
    placeItems: "center",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#d83f4d",
    color: "#fff",
    fontWeight: "900",
  },

  liveStreamBall: {
    position: "absolute",
    left: "58%",
    top: "46%",
    color: "#fff",
  },

  liveStreamTopBar: {
    position: "absolute",
    left: "16px",
    right: "16px",
    top: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 13px",
    borderRadius: "9px",
    background: "rgba(9,13,17,.84)",
  },

  liveStreamPlayButton: {
    position: "absolute",
    left: "50%",
    top: "50%",
    display: "grid",
    placeItems: "center",
    width: "60px",
    height: "60px",
    border: "none",
    borderRadius: "50%",
    background: "#d83f4d",
    color: "#fff",
    cursor: "pointer",
    transform: "translate(-50%,-50%)",
  },

  liveParentAnalytics: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },

  liveCoachAnalytics: {
    display: "grid",
    gridTemplateColumns: "1.25fr .75fr",
    gap: "14px",
  },

  livePlayerCard: {
    padding: "18px",
    border: "1px solid #29303a",
    borderRadius: "14px",
    background: "#151a21",
  },

  liveCoachStatGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,minmax(0,1fr))",
    gap: "10px",
  },

  liveAiFeed: {
    padding: "18px",
    border: "1px solid #3a3139",
    borderRadius: "14px",
    background: "#191820",
  },

};