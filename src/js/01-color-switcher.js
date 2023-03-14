const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const widgetBody = document.querySelector('body');
let timerId = null;
const isActive = false;
startBtn.addEventListener("click", () => {      
        timerId = setInterval(() => {      
widgetBody.style.backgroundColor = getRandomHexColor();
// console.log(getRandomHexColor());
        }, 1000);
        if (isActive) {
                return;
        } startBtn.disabled = true;
});


stopBtn.addEventListener("click", () => {
        startBtn.disabled = false;
        clearInterval(timerId);
       
//   console.log(`Interval with id ${timerId} has stopped!`);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}