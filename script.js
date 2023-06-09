window.onload = function() {
  const startButton = document.getElementById('start');
  const resetButton = document.getElementById('reset');
  const timerDisplay = document.getElementById('timer');
  const progressBar = document.getElementById('progress-bar');
  const progress = document.createElement('div');
  progress.className = 'progress';
  progressBar.appendChild(progress);
  
  const workTime = 25*60; // 25 minutes
  const breakTime = 5*60; // 5 minutes
  let timerId; 
  let time; 
  let isWorkTime = true;
  
  function startTimer(duration, display) {
    time = duration; 
    clearInterval(timerId);
    timerId = setInterval(function () {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
  
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      display.textContent = minutes + ":" + seconds;
  
      const progressPercentage = ((duration - time) / duration) * 100; 
      progress.style.width = progressPercentage + "%";
  
      if (--time < 0) {
        clearInterval(timerId);
        if (isWorkTime) {
          display.textContent = "Break Time!";
          document.body.classList.remove('work-time');
          document.body.classList.add('break-time');
          time = breakTime; 
        } else {
          display.textContent = "Work Time!";
          document.body.classList.remove('break-time');
          document.body.classList.add('work-time');
          time = workTime; 
        }
        isWorkTime = !isWorkTime;
        startTimer(time, display); 
      }
    }, 1000);
  }
  
  startButton.addEventListener('click', function() {
    startButton.disabled = true;
    resetButton.disabled = false;
    startTimer(workTime, timerDisplay);
  });
  
  resetButton.addEventListener('click', function() {
    startButton.disabled = false;
    resetButton.disabled = true;
    clearInterval(timerId);
    timerDisplay.textContent = "00:00";
    isWorkTime = true;
    document.body.classList.remove('break-time');
    document.body.classList.add('work-time');
    progress.style.width = "0%"; // Reset progress bar width
  });
};
