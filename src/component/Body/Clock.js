import react from "react";
import classes from "./Clock.module.css";

function Clock ({count, duration}) {

    const degrees = (count / duration) * 360;
    const secondHalf = (count / duration) > .5 && classes.mask2;

    return (
        <div className={classes.clock}>
            <div className={classes.rotator}
                style={{transform:'rotate(' + degrees + 'deg)'}}
            ></div>
            <div className={classes.mask + secondHalf}></div>
        </div>
    )
}

export default Clock;