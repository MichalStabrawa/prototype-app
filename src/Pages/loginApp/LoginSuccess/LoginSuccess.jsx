import { Link, useLocation,useHistory } from "react-router-dom";
import  { useRef } from 'react';
import classes from "./LoginSuccess.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrNext } from "react-icons/gr";

function LoginSuccess({ user }) {
  
  const url = useLocation();
 
  return (
    <section className={classes.success}>
      <Container>
        <Row>
          <Col xs={12}>
            <div className={classes.text}>
              {" "}
              <h1>
                {url.pathname === "/register" && "Register &&"} Login{" "}
                <Badge bg="success">SUCCESS!!!</Badge>
              </h1>
              <h3>user: {user && user.email}</h3>
            </div>
          </Col>
          <Col>
            <div className={classes.wrapper}>
              <h4>Go to home page</h4>
              <Link to="/#section">
                <Button variant="outline-dark">
                  home{" "}
                  <span>
                    <GrNext />
                  </span>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LoginSuccess;
