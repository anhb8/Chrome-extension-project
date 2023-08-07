import classes from "./Body.module.css";
import Character from "./Character";
import ButtonList from "./ButtonList";
import ClockFace from "./Timer";
import React, { useState } from "react";

function Body({ onClickButton, activeButton, sticky }) {
  return (
    <div className={classes.body}>
      {activeButton === "Focus" ? (
        <ClockFace duration={10} />
      ) : (
        <Character
          bodyButtonClicked={activeButton}
          headerButtonClicked={activeButton}
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
