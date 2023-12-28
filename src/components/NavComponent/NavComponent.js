import { useState } from "react";
import classes from "./NavComponent.module.scss";
import buttonStyles from "../UI/Button/Button.module.scss";
import logo from "../../assets/bapp.png";
import Button from "../UI/Button/Button";
import ButtonHamburger from "../UI/Button/ButtonHamburger";
import buttonHamburgerStyles from "../UI/Button/ButtonHamburger.module.scss";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const NavComponent = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const [active, setActive] = useState(false);

  const showMobileNav = () => {
    setActive(!active);
  };

  const logOffHandler = () => {
    dispatch(authActions.logoff());
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>
        <Link to="..">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <ButtonHamburger
        click={showMobileNav}
        active={active === true ? buttonHamburgerStyles.active : null}
      />
      <ul className={!active ? classes.nav : classes.nav_active}>
        <li className={classes.nav_item}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Home
          </NavLink>
        </li>
        <li className={classes.nav_item}>
          <NavLink
            to="exchange"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Exchange rates
          </NavLink>
        </li>
        <li className={classes.nav_item}>
          <NavLink
            to="exchange"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Bid&Ask
          </NavLink>
        </li>
        <li className={classes.nav_item}>
          <NavLink
            to="aboutUs"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            About Us
          </NavLink>
        </li>

        <li className={classes.nav_item}>Lorem3</li>
        <li className={classes.nav_item}>
          <Link to={auth ? "/" : "login"} onClick={logOffHandler}>
            <Button
              name={auth ? "LogOff" : "Login"}
              color={buttonStyles.btn_transparent}
            />
          </Link>
        </li>
        <li className={classes.nav_item}>
          <Link to="register">
            <Button name={"Register"}></Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavComponent;
