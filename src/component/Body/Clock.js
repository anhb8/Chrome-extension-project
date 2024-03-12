 /* global chrome */
import react, { useState, useEffect } from "react";
import classes from "./Clock.module.css";

function Clock ({count, duration, remainingTime}) {
    const totalSeconds = duration * 60;
    const degrees = (count / totalSeconds) * 360;
    const secondHalf = (count / totalSeconds) > .5 ? classes.mask2 : classes.mask;
    const [tooltipText, setTooltipText] = useState('');
    const [isClockRunning, setIsClockRunning] = useState(true);

    useEffect(() => {
        const remainingSeconds = remainingTime;
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        // Set minutes and seconds to 0 when time is up 
        if (remainingSeconds <= 0) {
            minutes = 0;
            seconds = 0;
        } 
        const formattedSeconds = seconds.toString().padStart(2, '0');
        setTooltipText(`${minutes}:${formattedSeconds}`);

      }, [count, totalSeconds, degrees]);

    return (
        <div className={classes.clock}>
        {isClockRunning && (
            <span>
                <div className={classes.rotator} style={{ transform: 'rotate(' + degrees + 'deg)' }}></div>
                <div className={secondHalf}></div>
            </span>
                )}
                <div className={classes.tooltip}>{tooltipText}</div>
                <div className={[classes.tick, classes.deg0].join(' ')}></div>
                <div className={[classes.tick, classes.deg45].join(' ')}></div>
                <div className={[classes.tick, classes.deg90].join(' ')}></div>
                <div className={[classes.tick, classes.deg135].join(' ')}></div>
                <div className={[classes.tick, classes.deg180].join(' ')}></div>
                <div className={[classes.tick, classes.deg225].join(' ')}></div>
                <div className={[classes.tick, classes.deg270].join(' ')}></div>
                <div className={[classes.tick, classes.deg315].join(' ')}></div>
        
        </div>
            
    )
}

export default Clock;