import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Home.module.css';
import {faHome} from '@fortawesome/free-solid-svg-icons';

function Home({onClick}) {
    return (
        <div>
            <FontAwesomeIcon className={classes.home} icon={faHome} onClick={onClick}/>
        </div>
    )
}

export default Home;