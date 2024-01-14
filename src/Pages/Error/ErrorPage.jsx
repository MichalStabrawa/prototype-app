import { Link } from "react-router-dom";
import classes from './Error.module.scss';
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';

function ErrorPage() {
  return (
    <main className={classes.error}>
      <Alert><h1>Error somthing went wrong!!!</h1></Alert>
      <Link to=".."><Button variant="info">Back to Home Page</Button></Link>
    </main>
  );
}

export default ErrorPage;
