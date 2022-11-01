import classes from './NavComponent.module.scss';
import logo from '../../assets/bapp.png';

const NavComponent = props => {
    return (
        <nav className={classes.navbar}>
            <div className={classes.logo}><img src={logo} alt="logo" /></div>
            <ul className={classes.nav}>
                <li className="nav-item">Lorem</li>
                <li className="nav-item">Lorem item</li>
                <li className="nav-item">Lorem item2</li>

            </ul>
        </nav>
    )
}

export default NavComponent