import classes from './Body.module.css';
import Character from './Character';
import ButtonList from './ButtonList';
import React, { useState } from 'react';

function Body() {
    const [buttonClicked, setButtonClicked] = useState(false);
    
    const handleClick = () => {
        setButtonClicked(true);
    };
    
    return (
        <div className={classes.body}>
            <Character powerUpClicked={buttonClicked} />
            <ButtonList onClickButton={handleClick} state={buttonClicked} />
        </div>
    );
}

export default Body;