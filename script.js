document.addEventListener('DOMContentLoaded', function () {
    const daysGrid = document.getElementById('daysGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');
    const saveNoteButton = document.getElementById('saveNote');
    const noteInput = document.getElementById('noteInput');
    const alarmInput = document.getElementById('alarmInput');
    const clock = document.getElementById('clock');
    const alarmPopup = document.getElementById('alarmPopup');
    const closeAlarm = document.getElementById('closeAlarm');
    const alarmMessage = document.getElementById('alarmMessage');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function renderCalendar(month, year) {
        daysGrid.innerHTML = '';
        currentMonthElement.textContent = `${months[month]} ${year}`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        for (let i = 0; i < startingDay; i++) {
            daysGrid.innerHTML += `<div class="day"></div>`;
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = i;

            // Check if a note exists for this date
            const noteKey = `note-${i}-${month}-${year}`;
            const note = localStorage.getItem(noteKey);
            if (note) {
                dayElement.style.backgroundColor = '#ffeb3b'; // Yellow background for dates with notes
            }

            dayElement.addEventListener('click', () => openPopup(i, month, year));
            daysGrid.appendChild(dayElement);
        }
    }

    function openPopup(day, month, year) {
        popup.style.display = 'flex';
        saveNoteButton.onclick = () => saveNote(day, month, year);
    }

    function saveNote(day, month, year) {
        const note = noteInput.value;
        const alarmTime = new Date(alarmInput.value);

        if (note) {
            localStorage.setItem(`note-${day}-${month}-${year}`, note);
        }

        if (alarmTime) {
            const now = new Date();
            const timeDiff = alarmTime - now;

            if (timeDiff > 0) {
                setTimeout(() => {
                    alarmMessage.textContent = `Alarm for ${day}/${month + 1}/${year}: ${note}`;
                    alarmPopup.style.display = 'flex';
                }, timeDiff);
            }
        }

        popup.style.display = 'none';
        noteInput.value = '';
        alarmInput.value = '';
        renderCalendar(currentMonth, currentYear); // Re-render the calendar to update the color
    }

    function updateClock() {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        clock.textContent = `${date} ${time}`;
    }

    closePopup.onclick = () => popup.style.display = 'none';
    closeAlarm.onclick = () => alarmPopup.style.display = 'none';

    prevMonthButton.onclick = () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    };

    nextMonthButton.onclick = () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    };

    setInterval(updateClock, 1000);
    renderCalendar(currentMonth, currentYear);
});