import { useState, useEffect } from "react";
import { fetchToday, fetchSlots } from "./api";
import { isSameDate } from "./utils/date";

import Header from "./components/Header";
import StepsBar from "./components/StepsBar";
import Calendar from "./components/Calendar";
import TimeSlots from "./components/TimeSlots";
import BookingPanel from "./components/BookingPanel";
import Footer from "./components/Footer";

function App() {
  // Состояния данных
  const [today, setToday] = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState([]);

  // Состояния загрузки и ошибок для календаря
  const [loadingToday, setLoadingToday] = useState(true);
  const [errorToday, setErrorToday] = useState(null);

  // Состояния загрузки и ошибок для слотов
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [errorSlots, setErrorSlots] = useState(null);

  // 1. Загружаем "сегодня" при монтировании
  useEffect(() => {
    async function loadToday() {
      try {
        setLoadingToday(true);
        setErrorToday(null);
        const data = await fetchToday();
        
        setToday(data);
        setYear(data.year);
        setMonth(data.month);
        setSelectedDate({ ...data }); // Выбираем сегодняшний день по умолчанию
      } catch (err) {
        setErrorToday(err.message || "Не удалось загрузить данные");
      } finally {
        setLoadingToday(false);
      }
    }
    loadToday();
  }, []);

  // 2. Загружаем слоты при смене выбранной даты
  useEffect(() => {
    if (!selectedDate) return; // Ждем, пока загрузится "сегодня"

    async function loadSlots() {
      try {
        setLoadingSlots(true);
        setErrorSlots(null);
        
        const data = await fetchSlots(selectedDate);

        // ЗАЩИТА ОТ ГОНКИ ЗАПРОСОВ (из ТЗ)
        // Если ответ пришел не для той даты, которую пользователь выбрал сейчас — игнорируем
        if (isSameDate(data.date, selectedDate)) {
          setSlots(data.slots);
        }
      } catch (err) {
        // Проверяем, актуальна ли еще дата для этой ошибки
        if (isSameDate(selectedDate, selectedDate)) { 
            setErrorSlots(err.message || "Ошибка загрузки слотов");
        }
      } finally {
        setLoadingSlots(false);
      }
    }
    loadSlots();
  }, [selectedDate]);

  // Обработчики
  function onPrevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  }

  function onNextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  }

  function onDayClick(day) {
    setSelectedDate({ year, month, day });
    setSelectedTime(null); // Сбрасываем время при смене дня
  }

  function onTimeClick(time) {
    setSelectedTime(time);
  }

  // Экраны загрузки и ошибки для всего приложения
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