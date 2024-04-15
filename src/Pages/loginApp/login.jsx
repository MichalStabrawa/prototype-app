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

import Alert from "react-bootstrap/Alert";
import LoginSuccess from "./LoginSuccess/LoginSuccess";

import Card from "react-bootstrap/Card";
import { TiArrowBackOutline } from "react-icons/ti";

const LoginApp = () => {
  const authUser = useSelector((state) => state.auth.isAuthenticated);
  const [email, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [errorLogin, setErrorLogin] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const user = auth.currentUser;
  if (user && user.emailVerified) {
    console.log(user.emailVerified);
  }

  const handleSignIn = async (e) => {
    setIsLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const currentUser = auth.currentUser;
      console.log("curent user emailVerif");
      console.log(currentUser.emailVerified);
      console.log(`USER TO: ${currentUser.email}`);
      if (currentUser && !currentUser.emailVerified) {
        setIsLoading(false);
      }
      if (currentUser && currentUser.emailVerified) {
        const signInDate = new Date().toISOString();
        await database
          .ref(`users/${currentUser.uid}/signInDates`)
          .push([{ date: signInDate, email: currentUser.email }]);
        console.log("User signed in at after confirm email:", signInDate);
        setCurrentUser(currentUser);
        setIsLoading(false);
        setErrorLogin(null);
        dispatch(authActions.login());

        console.log("current User ");
        console.log(currentUser);
        console.log(auth);

        // Retrieve and save the token
        const token = await currentUser.getIdToken();
        console.log("TOKEN getIDToken");
        console.log(token);
        localStorage.setItem("firebaseToken", token);
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      setErrorLogin(error);
      setIsLoading(false);
    }
  };

  const dispatch = useDispatch();

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
    <main className={`${classes.login} ${classes.login_background}`}>
      {authUser && user ? (
        <LoginSuccess user={user} />
      ) : (
        <Wrapper>
          <div className={classes.login__wrapper}>
            <Card className="shadow" border="light">
              <Card.Header>
                <h1>Sign in</h1>
              </Card.Header>
              <Card.Body>
                {" "}
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
                    isLoading={isLoading}
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor{" "}
                  </p>
                  <Link to="/register">
                    <Button name={"Register"}></Button>
                  </Link>
                  <Link to="..">
                    <TiArrowBackOutline /> back
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Wrapper>
      )}
    </main>
  );
};

export default LoginApp;
