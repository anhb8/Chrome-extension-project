 /* global chrome */
import Header from "./component/Header/Header";
import Body from "./component/Body/Body";
import Footer from "./component/Footer/Footer";
import classes from "./App.module.css";
import React, { useState, useEffect } from "react";

function App() {
  const [buttonName, setButtonName] = useState("");
  const [focusButtonSticky, setFocusButtonSticky] = useState(false);
  const [blockButtonSticky, setBlockButtonSticky] = useState(false);
 
  useEffect(() => {
    const blockButtonState = window.localStorage.getItem('BLOCK');
    if (blockButtonState !== null) {
      setBlockButtonSticky(JSON.parse(blockButtonState));
    }
  }, [])

  
  useEffect(() => {
     window.localStorage.setItem('BLOCK', JSON.stringify(blockButtonSticky))
  }, [blockButtonSticky])

  useEffect(() => {
    const focusButtonState = window.localStorage.getItem('FOCUS');
    const timerState = window.localStorage.getItem('TIMER');
    if (focusButtonState !== null) {
      setFocusButtonSticky(JSON.parse(focusButtonState));
    }

    if (timerState === 'true') {
      setFocusButtonSticky(true);
      window.localStorage.setItem('FOCUS', true)
    }
  }, [])

  
  useEffect(() => {
     window.localStorage.setItem('FOCUS', JSON.stringify(focusButtonSticky))
  }, [focusButtonSticky])

  const powerButtonSticky = false; //power button is never sticky

  const handleButtonBehavior = (identifier) => {
    setButtonName(identifier); //identify which button was clicked on.

    if (identifier === "Focus") { //in future version, will set condition to block user from unsticky
      setFocusButtonSticky(!focusButtonSticky);
      chrome.storage.local.set({ focusButtonSticky: !focusButtonSticky  });
    }

    if (identifier === "Block") { //in future version, will set condition to block user from unsticky
      setBlockButtonSticky(!blockButtonSticky);
      chrome.storage.local.set({ blockButtonSticky: !blockButtonSticky });

    }

    if (identifier === "Home") {
      setBlockButtonSticky(false);
      setFocusButtonSticky(false);
    }

  };

  if (blockButtonSticky === true) {
    chrome.runtime.sendMessage({ blockButtonSticky: blockButtonSticky, action: 'activateBlock'});
  }

  if (blockButtonSticky === false) {
    chrome.runtime.sendMessage({ blockButtonSticky: blockButtonSticky, action: 'deactivateBlock'});
  }

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
