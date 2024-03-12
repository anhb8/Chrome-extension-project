import classes from "./Body.module.css";
import Character from "./Character";
import ButtonList from "./ButtonList";
import Timer from "./Timer";
import React, { useState } from "react";

function Body({ onClickButton, activeButton, sticky }) {
  const focusButtonState = window.localStorage.getItem('FOCUS');
  const timerState = window.localStorage.getItem('TIMER');

  return (
    <div className={classes.body}>
      {activeButton === "Focus" || timerState === 'true' ? (
        <Timer />
      ) : (
        <Character
          bodyButtonClicked={activeButton}
          headerButtonClicked={activeButton}
          sticky={sticky}
        />
      )}
        <ButtonList
          onClickButton={onClickButton}
          activeButton={activeButton}
          sticky={sticky}
        />
    </div>
  );
}

export default Body;
