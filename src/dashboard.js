import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener("DOMContentLoaded", function() {
  // Create the start button element
  var startButton = document.getElementById("startButton");

  // Add an event listener to the start button
  startButton.addEventListener("click", function() {
    alert("Button clicked");
  });

  
});

/*
// Timer variables
let timerInterval;
let minutes = 25;
let seconds = 0;

// Update the timer display
function updateTimerDisplay() {
  timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    if (seconds > 0) {
      seconds--;
    } else if (minutes > 0) {
      minutes--;
      seconds = 59;
    } else {
      clearInterval(timerInterval);
      // Timer has ended, perform actions here
    }
    updateTimerDisplay();
  }, 1000);
}

// Pause the timer
function pauseTimer() {
  clearInterval(timerInterval);
}

// Reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  minutes = 25;
  seconds = 0;
  updateTimerDisplay();
}

// Attach event listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

// Initial timer display
updateTimerDisplay();
*/