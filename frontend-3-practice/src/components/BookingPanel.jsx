import { formatDateLong } from "../utils/date";

export default function BookingPanel({ selectedDate, selectedTime, onBook }) {
  let text = "Выберите дату";
  if (selectedDate) {
    text = formatDateLong(selectedDate);
    if (selectedTime) text += ` • ${selectedTime}`;
  }

  return (
    <div className="booking-footer">
      <div className="selected-info">{text}</div>
      <button className="book-btn" type="button" onClick={onBook}>
        ЗАБРОНИРОВАТЬ
      </button>
    </div>
  );
}