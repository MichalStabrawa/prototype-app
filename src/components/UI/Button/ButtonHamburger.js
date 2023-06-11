import classes from './ButtonHamburger.module.scss'

const ButtonHamburger = (props) => {
    return (
        <button className={`${classes.burger} ${props.active}`} onClick={props.click}>
            <span></span><span></span>
        </button>
    )
}

export default ButtonHamburger