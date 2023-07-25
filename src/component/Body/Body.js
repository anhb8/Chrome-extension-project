import classes from "./Body.module.css";
import Character from "./Character";
import ButtonList from "./ButtonList";
import React, { useState } from "react";

function Body({ homeClickedState, powerUpClicked, onClickButton, state}) {

  return (
    <div className={classes.body}>
      <Character powerUpClicked={powerUpClicked}/>
      <ButtonList onClickButton={onClickButton} state={state}/>
    </div>
  );
}

export default Body;
