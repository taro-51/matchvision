export default function CalendarItem({ date, day, title, details }) {
  return (
    <div className="calendar-item">
      <div className="calendar-date">
        <span>{day}</span>
        <strong>{date}</strong>
      </div>
      <div>
        <strong>{title}</strong>
        <span>{details}</span>
      </div>
    </div>
  );
}
