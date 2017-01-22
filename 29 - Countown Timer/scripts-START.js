let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelector('[data-time]');

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now(); // new static method!
  const then = now + seconds * 1000; // seconds to ms
  displayTimeLeft(seconds); // run it immediately once because setInterval waits for first sec to elapse
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // ms to s
    if(secondsLeft < 0) { // not <=, just < !
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft); // update stuff
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  // for normal people
  // endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}`;

  // for Americans and other people who can't count to 24
  endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;   
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

// if the element has a name attr, you can select it like document.name!!!11
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
// input inside would be like document.customForm.minutes