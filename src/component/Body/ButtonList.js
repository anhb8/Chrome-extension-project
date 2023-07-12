import Button from "./Button";
import classes from "./ButtonList.module.css"

function ButtonList() {
    return (
        <ul className={classes.list}>
            <Button />
            <Button />
        </ul>
    );
}

export default ButtonList;