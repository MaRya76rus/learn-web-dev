export default function TimeSlots({ slots, loading, error, selectedTime, onTimeClick }) {
  return (
    <section className="time-section">
      <h2 className="time-title">Время приема</h2>
      
      {loading && <div className="status-msg">Загрузка слотов...</div>}

      {error && <div className="status-msg error-text">Ошибка: {error}</div>}

      {!loading && !error && (
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
      )}
    </section>
  );
}