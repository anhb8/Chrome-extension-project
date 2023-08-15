import React, { useState } from 'react';
import Sleeping from "./../../assets/sleepingPet.gif";
import Wakeup from "./../../assets/powerUpPet.gif";
import Watchful from "./../../assets/focusPet.gif";
import Clock from "./../../assets/tempClock.gif";
import classes from "./Character.module.css";

function Character({bodyButtonClicked, headerButtonClicked}) {

  let character = '';

  if (headerButtonClicked === true) {
    character = <img src={Sleeping} alt="Sleeping pet" className={classes.character} />;
  }

  if (bodyButtonClicked === "Power Up") {
    character = <img src={Wakeup} alt="Wakeup pet" className={classes.character} />;
  } else if (bodyButtonClicked == "Focus") {
    character = <img src={Clock} alt="Clock animation" className={classes.character} />; //condition will be replaced by timer in body
  } else if (bodyButtonClicked === "Block") { 
    character = <img src={Watchful} alt="Watchful pet" className={classes.character} />;
  } else {
    character = <img src={Sleeping} alt="Sleeping pet" className={classes.character} />;
  }

  return (
    <div>
      {character}
    </div>
  );
}

export default Character;
