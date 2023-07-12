import Home from "./Home";
import Settings from "./Settings";
import Title from "./Title";
import classes from "./Header.module.css"

function Header() {
  return (
      <div className={classes.navbar}>
        <Home />
        <Title />
        <Settings />
      </div>
  );
}

export default Header;