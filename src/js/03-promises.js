import { Notify } from 'notiflix/build/notiflix-notify-aio';
const btnPromises = document.querySelector("button");
// const firstDelay = document.querySelector('input[name="delay"]');
// const delayStep = document.querySelector('input[name="step"]');
// const inputAmount = document.querySelector('input[name="amount"]');

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', handleSubmitForm);
function handleSubmitForm(event) {
  event.preventDefault(); 
  let delay = Number(event.currentTarget.delay.value);
  const step = Number(event.currentTarget.step.value);
  const amount = Number(event.currentTarget.amount.value);    
  for (let position = 1; position <= amount; position+=1){
    createPromise(position, delay)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delay += step;
  }
}

function createPromise(position, delay) { 
 const objectPromis = { position, delay };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(objectPromis);
      } else {
        reject(objectPromis);
      }
    }, delay);
  });
}


