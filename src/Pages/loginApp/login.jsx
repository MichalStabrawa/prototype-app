import { useState, useEffect } from "react";
import { auth, database } from "../../firebase/firebase";

import classes from "./login.module.scss";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import InputComponent from "../../components/UI/Input/InputComponent";
import Button from "../../components/UI/Button/Button";
import buttonStyles from "../../components/UI/Button/Button.module.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import LoginSuccess from "./LoginSuccess/LoginSuccess";

const LoginApp = () => {
  const authUser = useSelector((state) => state.auth.isAuthenticated);
  const [email, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [errorLogin, setErrorLogin] = useState();

  const user = auth.currentUser;
  const handleSignIn = async (e) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const currentUser = auth.currentUser;
      console.log(`USER TO: ${currentUser.email}`);
      if (currentUser) {
        const signInDate = new Date().toISOString();
        await database
          .ref(`users/${currentUser.uid}/signInDates`)
          .push([{ date: signInDate, email: currentUser.email }]);
        console.log("User signed in at:", signInDate);
        setCurrentUser(currentUser);
        setErrorLogin(null);
      }
      dispatch(authActions.login());
    } catch (error) {
      console.error("Error signing in:", error.message);
      setErrorLogin(error);
    }
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addLogin = (e) => {
    const loginValue = e.target.value;

    setLogin(loginValue);
  };

  const addpassword = (e) => {
    const passwordValue = e.target.value;

    setPassword(passwordValue);
  };
  const loginHandler = (e) => {
    e.preventDefault();

    if (email.length > 0 && password.length > 0) {
      handleSignIn();
      setPassword("");
      setLogin("");
    } else {
     
      setPassword("");
      setLogin("");
    }
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
    <main className={classes.login}>
      {authUser && user ? (
        <LoginSuccess user={user} />
      ) : (
        <Wrapper>
          <div className={classes.login__wrapper}>
            <h1>Sign in</h1>
            <form onSubmit={loginHandler}>
              <InputComponent
                placeholder="Login"
                name="Login"
                type="email"
                value={email}
                action={addLogin}
              />
              <div className={classes.login__wrapper__link}>
                <Link to="remind-login">I don't remember the username</Link>
              </div>

              <InputComponent
                placeholder="Password"
                name="Password"
                type="password"
                value={password}
                action={addpassword}
              />
              <div className={classes.login__wrapper__link}>
                <Link to="remind-login">I don't remember the password</Link>
              </div>
              <Button
                name={"Submit"}
                color={buttonStyles.btn_transparent}
                type="submit"
                disabled={password.length < 6}
              />
              {errorLogin && (
                <div className={classes.alert}>
                  {" "}
                  <Alert variant="danger">
                    Wrong email or password!!! Try again log in!!!
                  </Alert>
                </div>
              )}
            </form>
            <div className="login__register">
              <h2>Do you have not login?</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor{" "}
              </p>
              <Link to="/register">
                <Button name={"Register"}></Button>
              </Link>
              <Link to="..">back</Link>
            </div>
          </div>
        </Wrapper>
      )}
    </main>
  );
};

export default LoginApp;
