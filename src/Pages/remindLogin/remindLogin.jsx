import { useState } from "react";
import InputComponent from "../../components/UI/Input/InputComponent";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import classes from "./remindLogin.scss";
import loginStyles from "../loginApp/login.module.scss";
import Button from "../../components/UI/Button/Button";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const RemindLogin = (props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRemindPassword = async () => {
    setIsLoading(true);
    try {
      await auth.sendPasswordResetEmail(email);
      setMessage("Password reset email sent successfully.");
      setIsLoading(false);
    } catch (error) {
      setMessage("Error sending password reset email.");
      console.error("Error sending password reset email:", error);
      setIsLoading(false);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className={loginStyles.login}>
      <Wrapper>
        <div className={loginStyles.login__wrapper}>
          <h1>
            Remind user Your username will be sent to you on the setup email
            address upon registration
          </h1>
          <InputComponent
            name="Remind password"
            type="email"
            action={handleEmail}
          />
          <Button
            name="Send Password Reset Email"
            click={handleRemindPassword}
            disabled={email === ""}
            isLoading={isLoading}
          />
          {message && <p>{message}</p>}
          <Link to=".." relative="path">
            Back
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};
export default RemindLogin;
