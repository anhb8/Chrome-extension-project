import Button from "./Button";
import classes from "./ButtonList.module.css"
import React, { useState } from 'react';

function ButtonList() {
    const [showButton, setShowButton] = useState(false);
    
    const handleClick = evt => {
        setShowButton(true);
    };

    return (
        <ul className={classes.list}>
            {!showButton && (
                <Button name="Power Up" onClick={handleClick}/>
            )}
            {showButton && (
                <div style={{ display: 'flex' }}>
                <Button name="Block"/>
                <Button name="Focus"/>
                </div>
            )}
        </ul>
    );
}

export default ButtonList;