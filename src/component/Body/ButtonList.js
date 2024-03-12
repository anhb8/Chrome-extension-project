import Button from "./Button";
import classes from "./ButtonList.module.css";
import Character from "./Character";
import React, { useState, useEffect } from "react";

function ButtonList({onClickButton, activeButton, sticky}) {
    let focusButtonState = sticky.focus;
    const timerState = window.localStorage.getItem('TIMER');
    let buttons = '';

    if (timerState === 'true') {
        buttons = (
            <>
                <Button name="Block" onClick={onClickButton} setSticky={sticky.block} /> 
                <Button name="Focus" onClick={onClickButton} setSticky={sticky.focus} /> 
            </>
        );
    } else if (focusButtonState || activeButton === "Power Up" || activeButton === "Block" || activeButton === "Focus" ) {
        buttons = (
            <>
                <Button name="Block" onClick={onClickButton} setSticky={sticky.block} /> 
                <Button name="Focus" onClick={onClickButton} setSticky={sticky.focus} /> 
            </>
        );
    } else {
    
            buttons = <Button name="Power Up" onClick={onClickButton} setSticky={sticky.power} />;
        
    }

    return (
        <ul className={classes.list}>
            {buttons}
        </ul>
    );
}

export default ButtonList;
