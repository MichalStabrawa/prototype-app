import { useState } from "react";
import classes from "./login.module.scss";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import InputComponent from "../../components/UI/Input/InputComponent";
import Button from "../../components/UI/Button/Button";
import buttonStyles from "../../components/UI/Button/Button.module.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

import { useNavigate } from "react-router-dom";

const LoginApp = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.isAuthenticated);

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

    if (login.length > 0 && password.length > 0) {
      dispatch(authActions.login());
      navigate("/");
    } else {
      alert("Login or Password incorect");
    }
  };

  return (
    <div className={classes.login}>
      <Wrapper>
        <div className={classes.login__wrapper}>
          <h1>Login</h1>
          <form onSubmit={loginHandler}>
            <InputComponent
              placeholder="Login"
              name="Login"
              type="email"
              value={login}
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
            />
          </form>
          <div className="login__register">
            <h2>Do you have not login?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor{" "}
            </p>
            <Link to="register">
              <Button name={"Register"}></Button>
            </Link>
            <Link to="..">back</Link>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default LoginApp;
