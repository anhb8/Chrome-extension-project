import classes from "./Button.module.css";

function Button({ name, onClick, setSticky }) {
  return (
    <>
      {setSticky ? (
        <button className={classes.stickybutton} onClick={onClick}>
          {name}
        </button>
      ) : (
        <button className={classes.button} onClick={onClick}>
          {name}
        </button>
      )}
    </>
  );
}

export default Button;
