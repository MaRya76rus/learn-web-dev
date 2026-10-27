import { formatDateLong } from "../utils/date";

export default function BookingPanel({ selectedDate, selectedTime }) {
  let text = "Выберите дату и время";
  if (selectedDate) {
    text = formatDateLong(selectedDate);
    if (selectedTime) {
      text += ` • ${selectedTime}`;
    } else {
      text += " • Время не выбрано";
    }
  }

  return (
    <div className="booking-footer">
      <div className="selected-info">{text}</div>
      <button
        className="book-btn"
        type="button"
        onClick={() => {
          if (!selectedTime) return alert("Выберите время");
          alert(`Запись подтверждена:\n${text}`);
        }}
        style={{ opacity: selectedTime ? 1 : 0.5, cursor: selectedTime ? "pointer" : "not-allowed" }}
      >
        ЗАБРОНИРОВАТЬ
      </button>
    </div>
  );
}