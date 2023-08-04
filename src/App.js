import Header from "./component/Header/Header";
import Body from "./component/Body/Body";
import Footer from "./component/Footer/Footer";
import classes from "./App.module.css";
import React, { useState } from "react";

function App() {
  const [homeClicked, setHomeClicked] = useState('');  //when home is clicked, useState sends value 'home' back to body

  console.log(homeClicked);
  
  const handleHomeClicked = (identifier) => {
    setHomeClicked(identifier);
  }

  return (
      <div className={classes.background}>
        <Header onHomeClick={(event) => handleHomeClicked(event.currentTarget.getAttribute('id'))} />
        <Body goHome={homeClicked} />
        <Footer />
      </div>
  );
}

export default App;
