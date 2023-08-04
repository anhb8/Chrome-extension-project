import Header from "./component/Header/Header";
import Body from "./component/Body/Body";
import Footer from "./component/Footer/Footer";
import classes from "./App.module.css";
import React, { useState } from "react";

function App() {
  const [homeClicked, setHomeClicked] = useState(false);

  console.log(homeClicked);
  
  const handleHomeClicked = () => {
    setHomeClicked(true);
  }

  return (
      <div className={classes.background}>
        <Header onHomeClick={handleHomeClicked} />
        <Body goHome={homeClicked} />
        <Footer />
      </div>
  );
}

export default App;
