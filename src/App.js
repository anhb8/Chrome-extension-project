import Header from "./component/Header/Header";
import Body from "./component/Body/Body";
import Footer from "./component/Footer/Footer";
import classes from "./App.module.css";
import React, { useState } from "react";

function App() {
  const [buttonName, setButtonName] = useState("");
  const [focusButtonSticky, setFocusButtonSticky] = useState(false);
  const [blockButtonSticky, setBlockButtonSticky] = useState(false);
  const powerButtonSticky = false; //power button is never sticky

  const handleButtonBehavior = (identifier) => {
    setButtonName(identifier); //identify which button was clicked on.

    if (identifier === "Focus") { //in future version, will set condition to block user from unsticky
      focusButtonSticky === false ? setFocusButtonSticky(true) : setFocusButtonSticky(false);
    }
    if (identifier === "Block") { //in future version, will set condition to block user from unsticky
      blockButtonSticky === false ? setBlockButtonSticky(true) : setBlockButtonSticky(false);
    }
    if (identifier === "Home") {
      setBlockButtonSticky(false);
      setFocusButtonSticky(false);
    }
  };

  return (
      <div className={classes.background}>
        <Header onHomeClick={(event) => handleButtonBehavior(event.currentTarget.getAttribute('id'))} />
        <Body
          onClickButton={(event) => handleButtonBehavior(event.target.innerText)}
          activeButton={buttonName}
          sticky={{block: blockButtonSticky, focus: focusButtonSticky, power: powerButtonSticky}} />
        <Footer />
      </div>
  );
}

export default App;
