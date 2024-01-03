import classes from "./gold.module.scss";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { GiGoldBar } from "react-icons/gi";

const Gold = () => {
  return (
    <>
      <header className={classes.header}>
        <Container fluid>
          <Row>
            <Col>
              <h1>Gold section  <span><GiGoldBar /></span></h1>
              <p>Gold price query parameters</p>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Gold;
