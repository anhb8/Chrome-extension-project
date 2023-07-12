import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Settings.module.css';
import { faGear } from '@fortawesome/free-solid-svg-icons';

function Settings() {
    return (
        <div>
            <FontAwesomeIcon className={classes.gear} icon={faGear} />
        </div>
    )
}

export default Settings;