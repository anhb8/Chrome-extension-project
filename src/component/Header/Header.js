import Home from "./Home";
import Settings from "./Settings";
import Title from "./Title";
import classes from "./Header.module.css"

function Header({homeClicked}) {
  return (
      <div className={classes.navbar}>
        <Home homeClicked={homeClicked}/>
        <Title />
        <Settings />
      </div>
  );
}

export default Header;