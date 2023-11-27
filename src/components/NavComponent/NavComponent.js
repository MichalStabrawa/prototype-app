import { useReducer, useState, useEffect } from 'react';
import classes from './NavComponent.module.scss';
import buttonStyles from '../UI/Button/Button.module.scss';
import logo from '../../assets/bapp.png';
import Button from '../UI/Button/Button';
import ButtonHamburger from '../UI/Button/ButtonHamburger';
import buttonHamburgerStyles from '../UI/Button/ButtonHamburger.module.scss'
import { Link } from 'react-router-dom';

const NavComponent = props => {
    const [active, setActive] = useState(false)

    const showMobileNav = () => {
        setActive(!active)
        console.log('ACTIVE')
        console.log(active)
    }

    return (
        <nav className={classes.navbar}>
            <div className={classes.logo}><Link to='/'><img src={logo} alt="logo" /></Link></div>
            <ButtonHamburger click={showMobileNav} active={active === true ? buttonHamburgerStyles.active : null} />
            <ul className={!active ? classes.nav : classes.active}>
                <li className={classes.nav_item}>
                    <Link to='/aboutUs'>About Us</Link>
                </li>
                <li className={classes.nav_item}>
                    <Link to='/exchange'>Exchange rates</Link>
                </li>
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