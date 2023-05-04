import classes from './Button.module.scss';

const Button = props => {
    return <button className={`${classes.btn} ${props.color}`} disabled={props.disabled} onClick={props.click}>{props.name}</button>
}

export default Button