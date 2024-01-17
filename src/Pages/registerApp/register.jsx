import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth, database } from "../../firebase/firebase";
import Wrapper from "../../components/UI/Wrapper/Wrapper";

import classes from "./register.module.scss";
import InputComponent from "../../components/UI/Input/InputComponent";
import Button from "../../components/UI/Button/Button";
import buttonStyles from "../../components/UI/Button/Button.module.scss";
import loginStyles from "../loginApp/login.module.scss";
import { Link } from "react-router-dom";
import LoginSuccess from "../loginApp/LoginSuccess/LoginSuccess";
import { authActions } from "../../store/auth";
import Alert from "react-bootstrap/Alert";

const Register = (props) => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.isAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepatPassword] = useState("");
  const [enabledSubmit, setEnabledSubmit] = useState(true);
  const [error, setErrorRegister] = useState();

  const user = auth.currentUser;

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      const currentUser = auth.currentUser;
      console.log(`USER Register TO: ${currentUser.email}`);
      if (currentUser) {
        const signInDate = new Date().toISOString();
        await database
          .ref(`users/${currentUser.uid}/registerDate`)
          .push({ RegisterDate: signInDate, email: currentUser.email });
        console.log("User signed up at:", signInDate);

        setErrorRegister(null);
      }
      dispatch(authActions.login());
      setEmail("");
      setPassword("");
      setErrorRegister(null);
    } catch (error) {
      setErrorRegister(error);
      console.error("Error signing up:", error.message);
      setErrorRegister(error.message);
    }
  };

  const addLogin = (e) => {
    
    const loginValue = e.target.value;

    setEmail(loginValue);
  };

  const addpassword = (e) => {
    const passwordValue = e.target.value;

    setPassword(passwordValue);
  };

  const comparepassword = (e) => {
    const repeatPasswordValue = e.target.value;
    setRepatPassword(repeatPasswordValue);
  };

  const enabledButton = () => {
    if (email !== "" && password !== "" && password === repeatPassword) {
      setEnabledSubmit(false);
    } else {
  
      setEnabledSubmit(true);
    }
  };

 

  useEffect(() => {
    enabledButton();
  }, [password, repeatPassword]);



  return (
    <div className={loginStyles.login}>
      {authUser && user.email ? (
        <LoginSuccess user={user} />
      ) : (
        <Wrapper>
          <div className={loginStyles.login__wrapper}>
            <h1>Register</h1>
            <form action="">
              <InputComponent
                placeholder="Login"
                name="Login"
                type="email"
                value={email}
                action={addLogin}
              />
              <InputComponent
                placeholder="Password"
                name="Password"
                type="password"
                value={password}
                action={addpassword}
              />
              <InputComponent
                placeholder="Password"
                name="Repeat Password"
                type="password"
                value={repeatPassword}
                action={comparepassword}
              />
              {!enabledSubmit && (
                <p className={classes.login__text}>
                  Passwords are the same it is OK!
                </p>
              )}
              {enabledSubmit && repeatPassword !== "" && (
                <p className={classes.login__text__fail}>
                  Passwords are not the same it is not OK!
                </p>
              )}
              <Button
                name={"Submit"}
                color={buttonStyles.btn_transparent}
                disabled={enabledSubmit}
                click={handleSignUp}
              />
              <Link to="..">back</Link>
            </form>
            {error ===
              "Firebase: The email address is already in use by another account. (auth/email-already-in-use)." && (
              <Alert variant="danger">
                The email address is already in use by another account.
              </Alert>
            )}
          </div>
        </Wrapper>
      )}
    </div>
  );
};
export default Register;
