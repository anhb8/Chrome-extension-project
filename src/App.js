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
    const blockButtonState = window.localStorage.getItem('MY_EXTENSION_APP');
    if (blockButtonState !== null) {
      setBlockButtonSticky(JSON.parse(blockButtonState));
      console.log("The current value of block button is", blockButtonState);
    }
  }, [])

  
  useEffect(() => {
     window.localStorage.setItem('MY_EXTENSION_APP', JSON.stringify(blockButtonSticky))
  }, [blockButtonSticky])

  const powerButtonSticky = false; //power button is never sticky

  const handleButtonBehavior = (identifier) => {
    setButtonName(identifier); //identify which button was clicked on.

    if (identifier === "Focus") { //in future version, will set condition to block user from unsticky
      setFocusButtonSticky(!focusButtonSticky);
      chrome.storage.local.set({ focusButtonSticky: !focusButtonSticky  });
    }

    if (identifier === "Block") { //in future version, will set condition to block user from unsticky
      console.log("Block button is clicked");
      setBlockButtonSticky(!blockButtonSticky);
      chrome.storage.local.set({ blockButtonSticky: !blockButtonSticky });

    }

    if (identifier === "Home") {
      setBlockButtonSticky(false);
      setFocusButtonSticky(false);
    }

  };

  if (blockButtonSticky === true) {
    console.log("The current value of block button sticky is before sending messeage", blockButtonSticky);
    chrome.runtime.sendMessage({ blockButtonSticky: blockButtonSticky, action: 'activateBlock'});
    console.log("Send activateBlock message to background script...");
  }

  if (blockButtonSticky === false) {
    console.log("The current value of block button sticky is before sending messeage", blockButtonSticky);
    chrome.runtime.sendMessage({ blockButtonSticky: blockButtonSticky, action: 'deactivateBlock'});
    console.log("Send deactivateBlock message to background script...");
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
