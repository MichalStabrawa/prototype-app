import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./ExchangeDetaSelectTwoDate.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExchangeDetaSelectTwoDate() {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [fetch, setFetch] = useState(false);

  const handleFetch = () => {
    setFetch(true);
  };

  const handleInput = (event) => {
    event.preventDefault();
    if (event.target.name === "fromDate") {
      setFromDate(event.target.value);
    }

    if (event.target.name === "toDate") {
      setToDate(event.target.value);
    }
  };
  return (
    <section className={classes.wrapper}>
      <Container fluid>
        <Row>
          <Col>
            <h2 className={classes.title}>Date to date</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            {" "}
            <div className={classes.compare}>
              <Form.Group>
                <Form.Label>
                  {" "}
                  <span className={classes.label}>From Date</span>
                </Form.Label>
                <Form.Control
                  onChange={handleInput}
                  type="date"
                  name="fromDate"
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  {" "}
                  <span className={classes.label}>To Date</span>
                </Form.Label>
                <Form.Control
                  onChange={handleInput}
                  type="date"
                  name="toDate"
                ></Form.Control>
              </Form.Group>
              <div className={classes.btn_wrapper}>
                {" "}
                <Button
                  onClick={handleFetch}
                  variant="outline-warning"
                  disabled={fromDate === "" && toDate === ""}
                >
                  check it
                </Button>
              </div>
            </div>
          </Col>
          <Col xs={12}>

              <div className={classes.chart}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={null}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="data" />
                    <YAxis domain={"maxValue"} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="cena"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
         
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ExchangeDetaSelectTwoDate;
