import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import classes from "./NavComponent.module.scss";
import buttonStyles from "../UI/Button/Button.module.scss";
import logo from "../../assets/bapp.png";
import Button from "../UI/Button/Button";
import ButtonHamburger from "../UI/Button/ButtonHamburger";
import ButtonBtn from "react-bootstrap/Button";
import buttonHamburgerStyles from "../UI/Button/ButtonHamburger.module.scss";

import { authActions } from "../../store/auth";
import { auth } from "../../firebase/firebase";
import signOut from "../../utils/signIn/signOut";
import UserInfo from "../UserInfo/UserInfo";

const NavComponent = (props) => {
  const dispatch = useDispatch();

  const auth1 = useSelector((state) => state.auth.isAuthenticated);
  const [active, setActive] = useState(false);

  const user = auth.currentUser;

  const showMobileNav = () => {
    setActive(!active);
  };

  const logOffHandler = () => {
    signOut();
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

  useEffect(() => {
    if (!auth1) {
      signOut();
    }
  }, [auth1]);

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
        {auth1 && (
          <li className={classes.nav_item}>
            <NavLink
              to="user"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              My budget
            </NavLink>
          </li>
        )}
        <li className={classes.nav_item}>
          <Link to={auth1 ? "/" : "login"} onClick={logOffHandler}>
            <ButtonBtn size="sm" variant="outline-primary">
              {" "}
              {auth1 ? "LogOff" : "Login"}
            </ButtonBtn>
          </Link>
        </li>
        {!auth1 && (
          <li className={classes.nav_item}>
            <Link to="register">
              <ButtonBtn size="sm">Register</ButtonBtn>
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
