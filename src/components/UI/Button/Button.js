import classes from "./Button.module.scss";
import Spinner from "react-bootstrap/Spinner";

const Button = (props) => {
  return (
    <button
      className={`${classes.btn} ${props.color}`}
      disabled={props.disabled}
      onClick={props.click}
    >
      {props.name}{" "}
      {props.isLoading && <Spinner animation="border" variant="primary" size="sm" />}{" "}
    </button>
  );
};

export default Button;
