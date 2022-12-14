import { useReducer } from 'react';
import classes from './NavComponent.module.scss';
import buttonStyles from '../UI/Button/Button.module.scss';
import logo from '../../assets/bapp.png';
import Button from '../UI/Button/Button';

const NavComponent = props => {

    return (
        <nav className={classes.navbar}>
            <div className={classes.logo}><img src={logo} alt="logo" /></div>
            <ul className={classes.nav}>
                <li className={classes.nav_item}>Lorem</li>
                <li className={classes.nav_item}>Lorem2</li>
                <li className={classes.nav_item}>Lorem3</li>
                <li className={classes.nav_item}>
                    <Button name={'Login'} click={props.click} color={buttonStyles.btn_transparent}></Button>
                </li>
                <li className={classes.nav_item}>
                    <Button name={'Register'}></Button>
                </li>
            </ul>
        </nav>
    )
}

export default NavComponent