import { useState, useEffect } from "react";
import classes from "./NavComponent.module.scss";
import buttonStyles from "../UI/Button/Button.module.scss";
import logo from "../../assets/bapp.png";
import Button from "../UI/Button/Button";
import ButtonHamburger from "../UI/Button/ButtonHamburger";
import buttonHamburgerStyles from "../UI/Button/ButtonHamburger.module.scss";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { auth } from "../../firebase/firebase";
import { FaUser, FaRegUser } from "react-icons/fa";
import UserInfo from "../UserInfo/UserInfo";

const NavComponent = (props) => {
  const dispatch = useDispatch();
  const auth1 = useSelector((state) => state.auth.isAuthenticated);
  const [active, setActive] = useState(false);

  const showMobileNav = () => {
    setActive(!active);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();

      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const logOffHandler = () => {
    handleSignOut();
    dispatch(authActions.logoff());
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in:", user.email);
      } else {
        console.log("User is signed out");
      }
    });

    return () => unsubscribe();
  }, []);

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
            to="bidask"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Bid&Ask
          </NavLink>
        </li>
        <li className={classes.nav_item}>
          <NavLink
            to="gold"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Gold
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
        <li className={classes.nav_item}>
          <Link to={auth1 ? "/" : "login"} onClick={logOffHandler}>
            <Button
              name={auth1 ? "LogOff" : "Login"}
              color={buttonStyles.btn_transparent}
            />
          </Link>
        </li>
        {!auth1 && (
          <li className={classes.nav_item}>
            <Link to="register">
              <Button name={"Register"}></Button>
            </Link>
          </li>
        )}

        <li className={classes.nav_item}>
          <UserInfo />
        </li>
      </ul>
    </nav>
  );
};

export default NavComponent;
