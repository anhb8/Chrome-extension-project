import React, { useState } from 'react';
import Sleeping from "./../../assets/sleepingPet.gif";
import Wakeup from "./../../assets/powerUpPet.gif";
import Watchful from "./../../assets/focusPet.gif";
import Timer from "./Timer";
import Clock from "./Clock";
import classes from "./Character.module.css";

function Character({bodyButtonClicked, headerButtonClicked, sticky}) {
  const timer = window.localStorage.getItem('TIMER');
  const focusButtonState = window.localStorage.getItem('FOCUS');
  let character = '';
  if (headerButtonClicked === "Home") {
    character = <img src={Sleeping} alt="Sleeping pet" className={classes.character} />;
  }

  if (timer) {
    character = <Clock />;
  }
  
  if (sticky.focus) {
    character = <Timer/>;
  }

  if (bodyButtonClicked === "Power Up") {
    character = <img src={Wakeup} alt="Wakeup pet" className={classes.character} />;
  } else if (bodyButtonClicked === "Focus")  {
    if (focusButtonState === 'true') {
      character = <Timer/>
    } else {
      character = <img src={Wakeup} alt="Wakeup pet" className={classes.character} />;
      }
    }
   else if (bodyButtonClicked === "Block") { 
    if (focusButtonState === 'false') {
      character = <img src={Watchful} alt="Watchful pet" className={classes.character} />;
    } 
  } else {
    if (!sticky.focus) {
      character = <img src={Sleeping} alt="Sleeping pet" className={classes.character} />;
    } else {
      character = <Timer/>;
    }
  }
  

  return (
    <div>
      {character}
    </div>
  );
}

export default Character;
