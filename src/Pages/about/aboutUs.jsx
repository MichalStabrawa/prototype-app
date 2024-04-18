import { useState } from "react";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import img from "../../assets/info.png";
import Button from "react-bootstrap/Button";

import classes from "./aboutUs.module.scss";

const AboutUs = (props) => {
  const [flag, setFlag] = useState(false);

  const openHandleMoreInfo = () => {
    setFlag(true);
  };
  return (
    <>
      {" "}
      <Wrapper css="dark_blue">
        <Container fluid>
          <Row>
            <Col xs={12} md={8}>
              {" "}
              <header className={classes.header}>
                <h1>About Us</h1>
                <p>
                  Currency exchange rates and gold prices information! we use
                  The api.nbp.pl service.
                </p>
              </header>
            </Col>
          </Row>
        </Container>
      </Wrapper>
      <Wrapper>
        <main className={classes.about}>
          <Container fluid>
            <Row>
              <Col xs={12} md={8}>
                <h2 className={classes.title}>
                  General Information <Badge bg="secondary">i</Badge>
                </h2>
                <ListGroup>
                  <ListGroup.Item>Table – table type</ListGroup.Item>
                  <ListGroup.Item>No – table number</ListGroup.Item>
                  <ListGroup.Item>
                    TradingDate – trading date (for table C only)
                  </ListGroup.Item>
                  <ListGroup.Item>
                    EffectiveDate – publication date
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Rates – a list of exchange rates of particular currencies in
                    the table
                  </ListGroup.Item>
                  <ListGroup.Item>Country – country name</ListGroup.Item>
                  <ListGroup.Item>
                    Symbol – currency symbol (numerical, concerns historic
                    exchange rates)
                  </ListGroup.Item>
                  <ListGroup.Item>Currency – currency name</ListGroup.Item>
                  <ListGroup.Item>Code – currency code</ListGroup.Item>
                  <ListGroup.Item>
                    Bid – calculated currency buy exchange rate (concerns table
                    C) (for table C only)
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Ask – calculated currency sell exchange rate (concerns table
                    C) ()
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Mid – calculated currency average exchange rate (for tables
                    A and B)
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <figure>
                  <img className={classes.img} src={img} alt="about" />
                </figure>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={8}>
                <p className={classes.description}>
                  Historic data are available respectively:
                </p>
                <ul>
                  <li>for currency exchange rates – since 2 January 2002,</li>
                  <li>for gold prices – since 2 January 2013.</li>
                </ul>
                <p>
                  and a single enquiry cannot cover a period longer than 93
                  days.
                </p>
                <h5>
                  Description of response parameters for gold price queries Date
                  – publication date Code – the price of 1g of gold (of 1000
                  millesimal fineness) calculated at NBP
                </h5>
                <h4 className={classes.err_title}>Error messages</h4>
                <p>
                  In the case of lack of data for a correctly determined time
                  interval, <span className={classes.error}>404 Not Found</span>{" "}
                  message is returned
                </p>
                <p>
                  In the case of incorrectly formulated enquiries, the service
                  returns <span className={classes.error}>400 Bad Request</span>{" "}
                  message
                </p>
                <p>
                  In the case of an enquiry/query exceeding the returned data
                  size limit, the service returns the message{" "}
                  <span className={classes.error}>
                    400 Bad Request - Limit exceeded
                  </span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  onClick={openHandleMoreInfo}
                  variant="outline-secondary"
                >
                  More info
                </Button>
              </Col>
            </Row>
            {flag && <Col>More info................</Col>}
          </Container>
        </main>
      </Wrapper>
    </>
  );
};

export default AboutUs;
