import {
  MONTHS,
  WEEKDAYS_SHORT,
  buildCalendarGrid,
  compareDates,
  isSameDate,
} from "../utils/date";

export default function Calendar({
  year,
  month,
  today,
  selectedDate,
  onPrevMonth,
  onNextMonth,
  onDayClick,
}) {
  const weeks = buildCalendarGrid(year, month);

  return (
    <section className="calendar-section">
      <div className="calendar-header">
        <h2 className="calendar-month">{`${MONTHS[month]} ${year}`}</h2>
        <div className="calendar-nav">
          <button className="nav-btn" type="button" onClick={onPrevMonth}>
            &lt;
          </button>
          <button className="nav-btn" type="button" onClick={onNextMonth}>
            &gt;
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {WEEKDAYS_SHORT.map((d) => (
          <div className="weekday" key={d}>{d}</div>
        ))}

        {weeks.flat().map((cell, index) => {
          if (cell.otherMonth) {
            return (
              <button key={index} type="button" className="day-cell disable" disabled>
                {cell.day}
              </button>
            );
          }

          const cellDate = { year, month, day: cell.day };
          const isPast = today ? compareDates(cellDate, today) < 0 : false;
          const isActive = isSameDate(cellDate, selectedDate);

          let classes = "day-cell";
          if (isPast) classes += " disable";
          if (isActive) classes += " active";

          return (
            <button
              key={index}
              type="button"
              className={classes}
              disabled={isPast}
              onClick={() => onDayClick(cell.day)}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </section>
  );
}