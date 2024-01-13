import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../firebase/firebase";
import Wrapper from "../../components/UI/Wrapper/Wrapper";

import classes from "./register.module.scss";
import InputComponent from "../../components/UI/Input/InputComponent";
import Button from "../../components/UI/Button/Button";
import buttonStyles from "../../components/UI/Button/Button.module.scss";
import loginStyles from "../loginApp/login.module.scss";
import { Link } from "react-router-dom";
import LoginSuccess from "../loginApp/LoginSuccess/LoginSuccess";
import { authActions } from "../../store/auth";

const Register = (props) => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.isAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepatPassword] = useState("");
  const [enabledSubmit, setEnabledSubmit] = useState(true);

  const user = auth.currentUser;

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      dispatch(authActions.login());
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error signing up:", error.message);
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

  console.log(user);
  console.log(authUser);

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
          </div>
        </Wrapper>
      )}
    </div>
  );
};
export default Register;
