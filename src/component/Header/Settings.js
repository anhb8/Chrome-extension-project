/*global chrome*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Settings.module.css';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Settings() {
    const handleClick = () => {
        chrome.runtime.sendMessage({ action: 'openSettings' });
    };

    
    return (
        <div>
            <FontAwesomeIcon className={classes.gear} icon={faGear} onClick={handleClick} />
        </div>
    )
}

export default Settings;