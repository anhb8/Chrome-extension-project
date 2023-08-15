import Home from "./Home";
import Settings from "./Settings";
import Title from "./Title";
import classes from "./Header.module.css"

function Header({onHomeClick}) {
  return (
      <div className={classes.navbar}>
        <Home onHomeClick={onHomeClick} />
        <Title />
        <Settings />
      </div>
  );
}

export default Header;