import Button from "./Button";
import classes from "./ButtonList.module.css"
import Character from "./Character";
import React, { useState } from 'react';

function ButtonList({onClickButton, state}) {

    return (
        <ul className={classes.list}>
            {!state ? (
                <Button name="Power Up" onClick={onClickButton} />
            ) :
             (
                <div style={{ display: 'flex' }}>
                    <Button name="Block"/>
                    <Button name="Focus"/>
                </div>
            )}
        </ul>
    );
}

export default ButtonList;