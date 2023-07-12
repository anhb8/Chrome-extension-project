import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Music.module.css';

function Music() {
    return (
        <div>
            <FontAwesomeIcon className={classes.music} icon={faPlay} />
        </div>
    );
}

export default Music;