import React, { useState } from 'react';
import Sleeping from "./../../assets/sleepingpet.gif";
import Wakeup from "./../../assets/wakeuppet.gif";
import classes from "./Character.module.css";

function Character({ powerUpClicked}) {
  return (
    <div>
      {!powerUpClicked ? (
        <img src={Sleeping} alt="Sleeping pet" className={classes.character} />
      ) :(
        <img src={Wakeup} alt="Wakeup pet" className={classes.character} />
      )}
      
    </div>
  );
}

export default Character;
