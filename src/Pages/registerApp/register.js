import { useState, useEffect } from "react";
import Wrapper from "../../components/UI/Wrapper/Wrapper";

import classes from "./register.module.scss";
import InputComponent from "../../components/UI/Input/InputComponent";
import Button from "../../components/UI/Button/Button";
import buttonStyles from "../../components/UI/Button/Button.module.scss";
import loginStyles from "../loginApp/login.module.scss";
import { Link } from "react-router-dom";

const Register = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepatPassword] = useState("");
  const [enabledSubmit, setEnabledSubmit] = useState(true);

  const addLogin = (e) => {
    const loginValue = e.target.value;

    setLogin(loginValue);
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
    if (login !== "" && password !== "" && password === repeatPassword) {
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
      <Wrapper>
        <div className={loginStyles.login__wrapper}>
          <h1>Register</h1>
          <form action="">
            <InputComponent
              placeholder="Login"
              name="Login"
              type="email"
              value={login}
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
            /><Link to="..">back</Link>
          </form>
        </div>
      </Wrapper>
    </div>
  );
};
export default Register;
