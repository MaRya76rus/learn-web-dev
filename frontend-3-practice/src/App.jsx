import { useState } from "react";

import Header from "./components/Header";
import StepsBar from "./components/StepsBar";
import Calendar from "./components/Calendar";
import TimeSlots from "./components/TimeSlots";
import BookingPanel from "./components/BookingPanel";
import Footer from "./components/Footer";

import { TODAY, formatDateLong } from "./utils/date";

function App() {
  const [year, setYear] = useState(TODAY.year);
  const [month, setMonth] = useState(TODAY.month);
  const [selectedDate, setSelectedDate] = useState({ ...TODAY });
  const [selectedTime, setSelectedTime] = useState(null);

  function onPrevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function onNextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  function onDayClick(day) {
    setSelectedDate({ year, month, day });
    setSelectedTime(null);
  }

  function onTimeClick(time) {
    setSelectedTime(time);
  }

  function onBook() {
    if (!selectedDate || !selectedTime) {
      alert("Сначала выберите дату и время");
      return;
    }
    alert(`Запись подтверждена:\n${formatDateLong(selectedDate)} • ${selectedTime}`);
  }

  return (
    <div className="page">
      <Header />
      <StepsBar />

      <main className="main-content">
        <a href="#" className="back-link">← НАЗАД К СПИСКУ УСЛУГ</a>
        <h1 className="page-title">Выберите дату</h1>

        <div className="booking-container">
          <Calendar
            year={year}
            month={month}
            selectedDate={selectedDate}
            onPrevMonth={onPrevMonth}
            onNextMonth={onNextMonth}
            onDayClick={onDayClick}
          />
          <TimeSlots
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onTimeClick={onTimeClick}
          />
        </div>
      </main>

      <BookingPanel
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onBook={onBook}
      />

      <Footer />
    </div>
  );
}

export default App;