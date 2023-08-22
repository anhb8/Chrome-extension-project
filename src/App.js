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
  const powerButtonSticky = false; //power button is never sticky

  const handleButtonBehavior = (identifier) => {
    setButtonName(identifier); //identify which button was clicked on.

    if (identifier === "Focus") { //in future version, will set condition to block user from unsticky
      setFocusButtonSticky(!focusButtonSticky);
      chrome.storage.local.set({ focusButtonSticky: !focusButtonSticky });
    }

    if (identifier === "Block") { //in future version, will set condition to block user from unsticky
      setBlockButtonSticky(!blockButtonSticky);
      chrome.storage.local.set({ blockButtonSticky: !blockButtonSticky });
      console.log("The current value of block button is", blockButtonSticky);
    }

    if (identifier === "Home") {
      setBlockButtonSticky(false);
      setFocusButtonSticky(false);
    }
  };

  useEffect(() => {
    // Initialize focusButtonSticky from storage
    chrome.storage.local.get(['focusButtonSticky'], (result) => {
      setFocusButtonSticky(result.focusButtonSticky || false);
    });

    // Initialize blockButtonSticky from storage
    chrome.storage.local.get(['blockButtonSticky'], (result) => {
      setBlockButtonSticky(result.blockButtonSticky || false);
      console.log("The current value of block button is", blockButtonSticky);
    });
  }, []);

    // When Block button is clicked on, it will send a message to background.js to check the URL list 
    if (blockButtonSticky === true) {
      chrome.runtime.sendMessage({ action: 'activateBlock'});
      console.log("Block button is clicked");
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
