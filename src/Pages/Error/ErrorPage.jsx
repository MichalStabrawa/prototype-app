import { Link } from "react-router-dom";
import classes from "./Error.module.scss";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function ErrorPage() {
  return (
    <main className={classes.error}>
      <Alert>
        <h1>404</h1>
        <h2>Error something went wrong!!!</h2>{" "}
      </Alert>

      <Link to="..">
        <Button variant="info">Back to Home Page</Button>
      </Link>
    </main>
  );
}

export default ErrorPage;
