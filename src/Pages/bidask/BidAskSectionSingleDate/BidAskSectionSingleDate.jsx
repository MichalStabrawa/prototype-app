import { useState, useEffect } from "react";
import classes from "./BidAskSectionSingleDate.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form'


function BidAskSectionSingleDate({ code,currency }) {
  const [lastDate, setLastDate] = useState();

  const handleInput = (e) => {
    setLastDate(e.target.value);
  };
  return (
    <div className={classes.single}>
      <Container fluid>
        <Row>
          <Col>
            <h2>Search {code}/ {currency}, for single last date </h2>
          </Col>
        </Row>
        <Row><Col>
        </Col></Row>
      </Container>
    </div>
  );
}

export default BidAskSectionSingleDate;
