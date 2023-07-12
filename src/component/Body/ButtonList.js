import Button from "./Button";
import classes from "./ButtonList.module.css"

function ButtonList() {
    return (
        <ul className={classes.list}>
            <Button />
        </ul>
    );
}

export default ButtonList;