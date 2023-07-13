import classes from './Button.module.css';


function Button({name, onClick}) {
    
    return (
        <button className={classes.button} onClick={onClick}>{name}</button>
    );
}

export default Button;