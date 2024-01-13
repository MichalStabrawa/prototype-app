import { useState, useEffect } from "react";
import classes from "./BidAskSectionSingleDate.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";

function BidAskSectionSingleDate({ code, currency, data }) {
  const [lastDate, setLastDate] = useState();

  console.log("Data bid ask");
  console.log(data);
  const handleInput = (e) => {
    setLastDate(e.target.value);
  };
  return (
    <div className={classes.single}>
      <Container fluid>
        <Row>
          <Col>
            <h2 className={classes.title}>
              Search {code}/ {currency},bid ask value for single last date{" "}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <Form.Control
              style={{ width: "100%" }}
              type="date"
              onChange={handleInput}
            ></Form.Control>
            <Form.Label>
              <span className={classes.label}>
                Select a date {code}/ {currency} and check the value:
              </span>
            </Form.Label>
            {lastDate && (
              <Alert variant="danger">
                Error fetch data selected: {lastDate}
              </Alert>
            )}
          </Col>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>current Bid</th>
                  <th>current Ask</th>
                  <th>current date </th>
                  <th>selected Bid</th>
                  <th>seleted Ask</th>
                  <th>selected date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={classes.min}>{data.bid}</td>
                  <td className={classes.min}>{data.ask}</td>
                  <td className={classes.date_min_max}>{data.effectiveDate}</td>
                  <td className={classes.max}></td>
                  <td className={classes.max}></td>
                  <td className={classes.date_min_max}></td>
                </tr>
              </tbody>
            </Table>
            <label className={classes.rate}>selected date: {lastDate} </label>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BidAskSectionSingleDate;
