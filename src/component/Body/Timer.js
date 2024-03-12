/* global chrome */
import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import Clock from "./Clock";
import classes from "./Timer.module.css"; 
import Watchful from "./../../assets/focusPet.gif";

function Timer () {
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [reopenTime, setReopenTime] = useState(null);
    const [timerDuration, setTimerDuration] = useState(45);
    const [timerStarted, setTimerStarted] = useState(false);
    const [remainingTime, setRemainingTime] = useState(45 * 60);
    const focusButtonState = window.localStorage.getItem('FOCUS');
    const timerState = window.localStorage.getItem('TIMER');
    const timerRef = useRef(null);
    const newTimerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    clearInterval(newTimerRef.current);
    window.localStorage.setItem('TIMER', true);
    // Get the current time
    const now = new Date();
  
      // Timer is not running, set initial states
      window.localStorage.setItem('startTime', now.toString());
  
      // Update states
      setTimerStarted(true);
      setRemainingTime(timerDuration * 60);
      chrome.storage.local.set({ remainingTime: remainingTime });
  
      // Start the timer
      timerRef.current = setInterval(() => {
        setCount((prevCount) => {
          const newCount = prevCount + 1;
          return newCount;
        });
        setRemainingTime((prevRemainingTime) => {
          const updatedRemainingTime = prevRemainingTime - 1;
  
          if (updatedRemainingTime <= 0) {
              endTimer();
          }
  
          return updatedRemainingTime;
      });
      }, 1000);
  };

  

  const endTimer = () => {
    clearInterval(timerRef.current);
    clearInterval(newTimerRef.current);
    setCount(0);
    setTimerStarted(false);
    setStartTime(null);
    setReopenTime(null);
    setRemainingTime(0);
    chrome.storage.local.set({ remainingTime: remainingTime });
    window.localStorage.setItem('TIMER', false);
    localStorage.removeItem('startTime');

  };

  const handleTimerChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setTimerDuration(isNaN(newValue) ? 0 : newValue);
    localStorage.setItem('timerDuration', isNaN(newValue) ? '0' : String(newValue));
    
};

  useEffect (() => {
    const storedStartTime = localStorage.getItem('startTime');
    if (storedStartTime) {
      const reopenTime = new Date();
      setReopenTime(reopenTime);
    }

    const storedTimerDuration = localStorage.getItem('timerDuration');
    setTimerDuration(parseInt(storedTimerDuration, 10) || 45);

    return () => {
    };
  }, []);

  const decreaseTimer = () => {
    setTimerDuration((prevDuration) => Math.max(prevDuration - 5, 0));
  };

  const increaseTimer = () => {
    setTimerDuration((prevDuration) => prevDuration + 5);
  };

  useEffect(() => {
  
    // Check if there is an ongoing timer session
    const storedStartTime = localStorage.getItem('startTime');
    const savedStartTime = storedStartTime ? new Date(storedStartTime) : null;

    if (savedStartTime && reopenTime) {
      // Calculate elapsed time and update remaining time
      const elapsedSeconds = Math.floor((reopenTime - savedStartTime) / 1000);
      const newRemainingTime = Math.max(timerDuration * 60 - elapsedSeconds, 0);
      setCount(elapsedSeconds);
      if (newRemainingTime <= 0) {
        endTimer();
      } else {
        setRemainingTime(prevRemainingTime => {
          return newRemainingTime;
        });
      }

      newTimerRef.current = setInterval(() => {
        setCount((prevCount) => {
          const newCount = prevCount + 1;
        
          return newCount;
        });
        setRemainingTime((prevRemainingTime) => {
          const updatedRemainingTime = prevRemainingTime - 1;

          if (updatedRemainingTime <= 0) {
              endTimer();
          }
  
          return updatedRemainingTime;
      });
      }, 1000); 
  
    }

  
  }, [reopenTime, timerDuration]);
  
  return (
    <div>
        {timerState === 'false' ? (
            <div className={classes.timerControl}>
                <Button variant="light" className={classes.timerButton} onClick={decreaseTimer}>
                -
                </Button>
                <Form.Control
                    type="text"
                    value={timerDuration}
                    onChange={handleTimerChange}
                    className={classes.timerNumber}
                />
                <Button variant="light" className={classes.timerButton} onClick={increaseTimer}>
                +
                </Button>
                <div>
                    <Button variant="primary" className={classes.timerStartButton} onClick={startTimer}>
                        START
                    </Button>
                </div>
            </div>
        ) : (
            <div> 
            <Clock count={count} duration={timerDuration} remainingTime = {remainingTime} />
            <div className={classes.endContainer}> 
                <Button variant="primary" className={classes.timerEndButton} onClick={endTimer}>
                    END
                </Button>
            </div>
            </div>
        )}
    </div>
  );
};

export default Timer;
