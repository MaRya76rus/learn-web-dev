import { getSlotsForDate } from "../utils/date";

export default function TimeSlots({ selectedDate, selectedTime, onTimeClick }) {
  const slots = selectedDate ? getSlotsForDate(selectedDate) : [];

  return (
    <section className="time-section">
      <h2 className="time-title">Время приема</h2>
      <div className="time-grid">
        {slots.map((slot) => {
          let classes = "time-btn";
          if (!slot.available) classes += " disabled";
          else if (selectedTime === slot.time) classes += " active";

          return (
            <button
              key={slot.time}
              type="button"
              className={classes}
              disabled={!slot.available}
              onClick={() => slot.available && onTimeClick(slot.time)}
            >
              {slot.time}
            </button>
          );
        })}
      </div>
    </section>
  );
}