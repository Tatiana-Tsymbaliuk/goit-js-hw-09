// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const dataInput = document.querySelector('#datetime-picker');
const startBt = document.querySelector('button[data-start]');
 startBt.disabled = true;
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');




function updateDataValue({ days, hours, minutes, seconds }) {
        dataDays.textContent = `${days}`;
        dataHours.textContent = `${hours}`;
        dataMinutes.textContent = `${minutes}`;
        dataSeconds.textContent = `${seconds}`;
}
// updateDataValue();



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
        onClose(selectedDates) {
                if (selectedDates[0] < new Date()) {
                        Notify.failure("Please choose a date in the future")
                } else {
                        startBt.disabled = false; 
        const timer = {    
        intervalId:null,       
        start() {                     
                const selectedTime = selectedDates[0]; 
                
                this.intervalId = setInterval(() => {
                        const currentTime = Date.now();
                        const deltaTime = selectedTime - currentTime;
                        const time = convertMs(deltaTime);       
                        updateDataValue(time);
                if(deltaTime <= 1000) {
                    clearInterval(this.intervalId);
                        
        }
                }, 1000);          
        }        
        }
                        
startBt.addEventListener('click', () => {
        timer.start();
})
          }
//  console.log(selectedDates[0]);
  },
}; 

flatpickr(dataInput, {
   enableTime: true,
  dateFormat: "Y-m-d H:i",             
});
flatpickr(dataInput, options);

function addLeadingZero(value) {
        if (value <= 2000) {
                return String(value).padStart(2, '0');
        }
        return String(value).padStart(3, '0');     
        
        
 }
// console.log(options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
