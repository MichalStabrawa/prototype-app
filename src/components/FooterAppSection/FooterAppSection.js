import { Link } from "react-router-dom";
import classes from "./FooterAppSection.module.scss";
import buttonStyles from "../UI/Button/Button.module.scss";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";

const FooterAppSection = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <footer className={classes.footer}>
      <Card className="text-center" bg="dark" text="white">
        <Card.Header>BApp {!auth && <span>true</span>}</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          {auth && (
            <Link to={location.pathname === "/" ? "user" : "/"}>
              <Button variant="primary">
                {location.pathname === "/" ? "My Budget" : "Home"}
              </Button>
            </Link>
          )}
          {!auth && (
            <Link to={location.pathname === "/register" ? "login" : "register"}>
              <Button variant="primary">
                {location.pathname === "/register" ? "Login" : "Register"}
              </Button>
            </Link>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </footer>
  );
};

export default FooterAppSection;
