import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Home.module.css';
import {faHome} from '@fortawesome/free-solid-svg-icons';

function Home() {
    return (
        <div>
            <FontAwesomeIcon className={classes.home} icon={faHome} />
        </div>
    )
}

export default Home;