import classes from './NavComponent.module.scss';

const NavComponent = props => {
    return (
        <nav className={classes.navbar}>
            <div className="logo">Logo</div>
            <ul className={classes.nav}>
                <li className="nav-item">Lorem</li>
                <li className="nav-item">Lorem item</li>
                <li className="nav-item">Lorem item2</li>

            </ul>
        </nav>
    )
}

export default NavComponent