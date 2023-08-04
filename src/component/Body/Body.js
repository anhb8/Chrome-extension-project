import classes from "./Body.module.css";
import Character from "./Character";
import ButtonList from "./ButtonList";
import React, { useState } from "react";

function Body({goHome}) {
  const [buttonName, setButtonName] = useState("");
  const [focusButtonSticky, setFocusButtonSticky] = useState(false);
  const [blockButtonSticky, setBlockButtonSticky] = useState(false);
  const powerButtonSticky = false; //power button is never sticky

  const handleButtonBehavior = (identifier) => {
    setButtonName(identifier); //identify which button was clicked on.

    if (identifier === "Focus") {
      setFocusButtonSticky(true);
    }
    if (identifier === "Block") {
      setBlockButtonSticky(true);
    }
  };

  return (
    <div className={classes.body}>
      <Character bodyButtonClicked={buttonName} headerButtonClicked={goHome} />
      <ButtonList
        onClickButton={(event) => handleButtonBehavior(event.target.innerText)}
        activeButton={buttonName}
        sticky={{block: blockButtonSticky, focus: focusButtonSticky, power: powerButtonSticky}}
      />
    </div>
  );
}

export default Body;
