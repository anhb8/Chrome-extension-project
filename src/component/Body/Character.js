import Sleeping from "./../../assets/sleepingpet.gif";
import classes from "./Character.module.css";

function Character() {
  return (
    <div>
      <img src={Sleeping} alt="Sleeping pet" className={classes.character} />
    </div>
  );
}

export default Character;
