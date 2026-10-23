// JavaScript для страницы выбора даты и времени

const _now = new Date();
const TODAY = {
  year: _now.getFullYear(),
  month: _now.getMonth(),
  day: _now.getDate(),
};

const SLOT_TIMES = [
  "09:00", "09:30",
  "10:00", "10:30",
  "11:00", "11:30",
  "12:00", "12:30",
  "13:00", "13:30",
];

const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

const MONTHS_GENITIVE = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

const WEEKDAYS_SHORT = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const WEEKDAYS_FULL  = [
  "Воскресенье", "Понедельник", "Вторник", "Среда",
  "Четверг", "Пятница", "Суббота",
];

function getSlotsForDate(date) {
  return SLOT_TIMES.map((time, i) => {
    const seed = (date.day + date.month * 3 + i * 7) % 5;
    return { time, available: seed !== 0 && seed !== 3 };
  });
}

const state = {
  year: TODAY.year,
  month: TODAY.month,
  selectedDate: { ...TODAY },   // объект, а не число
  selectedTime: null,
};

function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();
  const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = offset - 1; i >= 0; i--) {
    cells.push({ day: prevMonthLastDay - i, otherMonth: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false });
  }
  const totalCells = Math.ceil(cells.length / 7) * 7;
  let nextDay = 1;
  while (cells.length < totalCells) {
    cells.push({ day: nextDay, otherMonth: true });
    nextDay++;
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function compareDates(a, b) {
  const d1 = new Date(a.year, a.month, a.day);
  const d2 = new Date(b.year, b.month, b.day);
  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

function isSameDate(a, b) {
  return a && b && a.year === b.year && a.month === b.month && a.day === b.day;
}

function formatDateLong(date) {
  const wd = WEEKDAYS_FULL[new Date(date.year, date.month, date.day).getDay()];
  return `${wd}, ${date.day} ${MONTHS_GENITIVE[date.month]} ${date.year}`;
}

function renderCalendar() {
  const grid = document.querySelector(".calendar-grid");
  const monthTitle = document.querySelector(".calendar-month");
  if (!grid || !monthTitle) return;

  monthTitle.textContent = `${MONTHS[state.month]} ${state.year}`;

  let html = WEEKDAYS_SHORT
    .map((d) => `<div class="weekday">${d}</div>`)
    .join("");

  buildCalendarGrid(state.year, state.month).forEach((week) => {
    week.forEach((cell) => {
      let classes = "day-cell";
      let disabled = false;

      if (cell.otherMonth) {
        classes += " disable";
        disabled = true;
      } else {
        const cellDate = { year: state.year, month: state.month, day: cell.day };
        if (compareDates(cellDate, TODAY) < 0) {
          classes += " disable";
          disabled = true;
        } else if (isSameDate(cellDate, state.selectedDate)) {
          classes += " active";
        }
      }

      if (disabled) {
        html += `<button type="button" class="${classes}" disabled>${cell.day}</button>`;
      } else {
        html += `<button type="button" class="${classes}" data-day="${cell.day}">${cell.day}</button>`;
      }
    });
  });

  grid.innerHTML = html;
}

function renderTimeSlots() {
  const grid = document.querySelector(".time-grid");
  if (!grid) return;

  if (!state.selectedDate) {
    grid.innerHTML = "";
    return;
  }

  const slots = getSlotsForDate(state.selectedDate);
  let html = "";

  slots.forEach((slot) => {
    let classes = "time-btn";
    if (!slot.available) {
      classes += " disabled";
      html += `<button type="button" class="${classes}" disabled>${slot.time}</button>`;
    } else {
      if (state.selectedTime === slot.time) classes += " active";
      html += `<button type="button" class="${classes}" data-time="${slot.time}">${slot.time}</button>`;
    }
  });

  grid.innerHTML = html;
}

function renderSelectedInfo() {
  const info = document.querySelector(".selected-info");
  if (!info) return;

  if (!state.selectedDate) {
    info.textContent = "Выберите дату";
    return;
  }

  let text = formatDateLong(state.selectedDate);
  if (state.selectedTime) text += ` • ${state.selectedTime}`;
  info.textContent = text;
}

function onDayClick(day) {
  state.selectedDate = { year: state.year, month: state.month, day };
  state.selectedTime = null; // обязательно сбрасываем время
  renderCalendar();
  renderTimeSlots();
  renderSelectedInfo();
}

function onTimeClick(time) {
  state.selectedTime = time;
  renderTimeSlots();
  renderSelectedInfo();
}

function onPrevMonth() {
  state.month -= 1;
  if (state.month < 0) {
    state.month = 11;
    state.year -= 1;
  }
  renderCalendar();
}

function onNextMonth() {
  state.month += 1;
  if (state.month > 11) {
    state.month = 0;
    state.year += 1;
  }
  renderCalendar();
}

function onBookClick() {
  if (!state.selectedDate || !state.selectedTime) {
    alert("Сначала выберите дату и время");
    return;
  }
  alert(`Запись подтверждена:\n${formatDateLong(state.selectedDate)} • ${state.selectedTime}`);
}

function setupHandlers() {
  const grid = document.querySelector(".calendar-grid");
  if (grid) {
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".day-cell");
      if (!btn || btn.disabled || !btn.dataset.day) return;
      onDayClick(parseInt(btn.dataset.day, 10));
    });
  }

  const timeGrid = document.querySelector(".time-grid");
  if (timeGrid) {
    timeGrid.addEventListener("click", (e) => {
      const btn = e.target.closest(".time-btn");
      if (!btn || btn.disabled || !btn.dataset.time) return;
      onTimeClick(btn.dataset.time);
    });
  }

  const navBtns = document.querySelectorAll(".calendar-nav .nav-btn");
  if (navBtns[0]) navBtns[0].addEventListener("click", onPrevMonth);
  if (navBtns[1]) navBtns[1].addEventListener("click", onNextMonth);

  const bookBtn = document.querySelector(".book-btn");
  if (bookBtn) bookBtn.addEventListener("click", onBookClick);
}

function init() {
  state.selectedDate = { ...TODAY };
  state.selectedTime = null;

  setupHandlers()
  renderCalendar();
  renderTimeSlots();
  renderSelectedInfo();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}