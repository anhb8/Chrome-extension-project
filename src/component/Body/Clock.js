import react from "react";
import classes from "./Clock.module.css";

function Clock ({count, duration}) {

    const degrees = (count / duration) * 360;
    const secondHalf = (count / duration) > .5 ? classes.mask2 : classes.mask;

    console.log("degrees: " + degrees);
    console.log("count: " + count);
    console.log("duration: " + duration);
    return (
        <div className={classes.clock}>
            <div className={classes.rotator}
                style={{transform:'rotate(' + degrees + 'deg)'}}
            ></div>
            <div className={secondHalf}></div>
            <div className={[classes.tick, classes.deg0].join(' ')} ></div>
            <div className={[classes.tick, classes.deg45].join(' ')} ></div>
            <div className={[classes.tick, classes.deg90].join(' ')} ></div>
            <div className={[classes.tick, classes.deg135].join(' ')} ></div>
            <div className={[classes.tick, classes.deg180].join(' ')} ></div>
            <div className={[classes.tick, classes.deg225].join(' ')} ></div>
            <div className={[classes.tick, classes.deg270].join(' ')} ></div>
            <div className={[classes.tick, classes.deg315].join(' ')} ></div>
        </div>
    )
}

export default Clock;