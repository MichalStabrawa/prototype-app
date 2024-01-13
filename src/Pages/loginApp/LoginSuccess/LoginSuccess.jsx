import { Link } from "react-router-dom";
import classes from "./LoginSuccess.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { MdOutlineNavigateNext } from "react-icons/md";import { GrNext } from "react-icons/gr";

function LoginSuccess({ user }) {
  return (
    <section className={classes.success}>
      <Container>
        <Row>
          <Col xs={12}>
            <div className={classes.text}>
              {" "}
              <h1>
                Login <Badge bg="success">SUCCESS!!!</Badge>
              </h1>
              <h3>email: {user && user.email}</h3>
            </div> 
          </Col>
          <Col>
            <div className={classes.wrapper}>
                <h4>Go to home page</h4>
                <Link to='/'><Button variant="outline-dark">home <span><GrNext /></span></Button></Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LoginSuccess;
