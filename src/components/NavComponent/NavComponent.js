import { useReducer } from 'react';
import classes from './NavComponent.module.scss';
import buttonStyles from '../UI/Button/Button.module.scss';
import logo from '../../assets/bapp.png';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';

const NavComponent = props => {

    return (
        <nav className={classes.navbar}>
            <div className={classes.logo}><Link to='/'><img src={logo} alt="logo" /></Link></div>
            <ul className={classes.nav}>
                <li className={classes.nav_item}>
                    <Link to='/aboutUs'>About Us</Link>
                </li>
                <li className={classes.nav_item}>Lorem2</li>
                <li className={classes.nav_item}>Lorem3</li>
                <li className={classes.nav_item}>
                    <Link to='/login'>
                        <Button name={'Login'} click={props.click} color={buttonStyles.btn_transparent} />
                    </Link>
                </li>
                <li className={classes.nav_item}>
                    <Link to='/register'>
                        <Button name={'Register'}></Button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavComponent