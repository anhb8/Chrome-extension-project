import classes from './Body.module.css';
import Character from './Character';
import ButtonList from './ButtonList';

function Body() {
    return (
        <div className={classes.body}>
            <Character />
            <ButtonList />
        </div>
    );
}

export default Body;