import Header from "./component/Header/Header";
import Body from "./component/Body/Body";
import Footer from "./component/Footer/Footer";
import classes from "./App.module.css";
import { useState } from "react";

function App() {
  //Power Up button
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {
    setButtonClicked(true);
  };

  //Home icon
  const [homeClicked, setHomeClicked] = useState(false);

  const handleHomeClick = () => {
      setHomeClicked(true);
      setButtonClicked(false); // Reset buttonClicked to false after clicking the home icon
  };

  return (
      <div className={classes.background}>
        <Header homeClicked={handleHomeClick} />
        <Body homeClickedState={homeClicked} powerUpClicked={buttonClicked} onClickButton={handleClick} state={buttonClicked} />
        <Footer />
      </div>
  );
}

export default App;
