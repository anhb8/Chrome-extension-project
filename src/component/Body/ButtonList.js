import Button from "./Button";
import classes from "./ButtonList.module.css";
import Character from "./Character";
import React, { useState } from "react";

function ButtonList({onClickButton, activeButton, sticky}) {

    let buttons = '';

    console.log(activeButton);
    if (activeButton === "Power Up" || activeButton === "Block" || activeButton === "Focus") {
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
