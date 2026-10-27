import { useState, useEffect } from "react";
import { fetchToday, fetchSlots } from "./api";

import Header from "./components/Header";
import StepsBar from "./components/StepsBar";
import Calendar from "./components/Calendar";
import TimeSlots from "./components/TimeSlots";
import BookingPanel from "./components/BookingPanel";
import Footer from "./components/Footer";

function App() {
  const [today, setToday] = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState([]);

  const [loadingToday, setLoadingToday] = useState(true);
  const [errorToday, setErrorToday] = useState(null);

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [errorSlots, setErrorSlots] = useState(null);

  useEffect(() => {
    async function loadToday() {
      try {
        setLoadingToday(true);
        setErrorToday(null);
        const data = await fetchToday();

        setToday(data);
        setYear(data.year);
        setMonth(data.month);
        setSelectedDate({ ...data });
      } catch (err) {
        setErrorToday(err.message || "Не удалось загрузить данные");
      } finally {
        setLoadingToday(false);
      }
    }
    loadToday();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    // Флаг актуальности: выставляется в cleanup, чтобы устаревший
    // ответ не перезаписал данные нового запроса.
    let ignore = false;

    async function loadSlots() {
      try {
        setLoadingSlots(true);
        setErrorSlots(null);

        const data = await fetchSlots(selectedDate);

        if (!ignore) {
          setSlots(data.slots);
        }
      } catch (err) {
        if (!ignore) {
          setErrorSlots(err.message || "Ошибка загрузки слотов");
        }
      } finally {
        if (!ignore) {
          setLoadingSlots(false);
        }
      }
    }

    loadSlots();

    return () => {
      ignore = true;
    };
  }, [selectedDate]);

  function getDefaultDay(targetYear, targetMonth) {
    // При возврате в месяц «сегодня» выбираем сегодняшний день,
    // иначе — первое число (оно гарантированно не в прошлом).
    if (today && targetYear === today.year && targetMonth === today.month) {
      return today.day;
    }
    return 1;
  }

  function onPrevMonth() {
    if (!today) return;

    // Нельзя уйти в месяц раньше месяца «сегодня» с сервера
    if (year < today.year || (year === today.year && month <= today.month)) {
      return;
    }

    let newMonth, newYear;
    if (month === 0) {
      newMonth = 11;
      newYear = year - 1;
    } else {
      newMonth = month - 1;
      newYear = year;
    }

    setMonth(newMonth);
    setYear(newYear);
    setSelectedDate({
      year: newYear,
      month: newMonth,
      day: getDefaultDay(newYear, newMonth),
    });
    setSelectedTime(null);
  }

  function onNextMonth() {
    let newMonth, newYear;
    if (month === 11) {
      newMonth = 0;
      newYear = year + 1;
    } else {
      newMonth = month + 1;
      newYear = year;
    }

    setMonth(newMonth);
    setYear(newYear);
    setSelectedDate({
      year: newYear,
      month: newMonth,
      day: getDefaultDay(newYear, newMonth),
    });
    setSelectedTime(null);
  }

  function onDayClick(day) {
    setSelectedDate({ year, month, day });
    setSelectedTime(null);
  }

  function onTimeClick(time) {
    setSelectedTime(time);
  }

  if (loadingToday) {
    return <div className="page center-msg">Загрузка...</div>;
  }

  if (errorToday) {
    return <div className="page center-msg error-text">Ошибка: {errorToday}</div>;
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
            today={today}
            selectedDate={selectedDate}
            onPrevMonth={onPrevMonth}
            onNextMonth={onNextMonth}
            onDayClick={onDayClick}
          />
          <TimeSlots
            slots={slots}
            loading={loadingSlots}
            error={errorSlots}
            selectedTime={selectedTime}
            onTimeClick={onTimeClick}
          />
        </div>
      </main>

      <BookingPanel
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />

      <Footer />
    </div>
  );
}

export default App;