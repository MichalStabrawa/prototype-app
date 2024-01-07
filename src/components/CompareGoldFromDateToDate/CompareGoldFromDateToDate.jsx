import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./CompareGoldFromDateToDate.module.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Alert from 'react-bootstrap/Alert';
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

import { goldFetchFromToDate } from "../../store/goldApiNbp/goldFetchFromToDateSlice";

const CompareGoldFromDateToDate = () => {
  const dispatch = useDispatch();
  const goldFromToDate = useSelector((state) => state.goldFetchFromToDate.data);
  const isLoading = useSelector((state) => state.goldFetchFromToDate.isLoading);
  const status = useSelector((state) => state.goldFetchFromToDate.status);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fetch, setFetch] = useState(false);
  const [maxPrice, setMax] = useState();
  const [minPrice, setMin] = useState();

  const handleInput = (event) => {
    event.preventDefault();
    if (event.target.name === "fromDate") {
      setFromDate(event.target.value);
    }

    if (event.target.name === "toDate") {
      setToDate(event.target.value);
    }
  };

  const handleFetch = () => {
    setFetch(true);
  };

  useEffect(() => {
    if (fetch === true) {
      dispatch(goldFetchFromToDate({ fromDate: fromDate, toDate: toDate }));
    }
    setFetch(false);
  }, [dispatch, fetch]);

  useEffect(() => {
    if (status === "success") {
      const max = [...goldFromToDate].reduce((prev, next) =>
        prev.cena > next.cena ? prev : next
      );

      const min = [...goldFromToDate].reduce((prev, next) =>
        prev.cena < next.cena ? prev : next
      );

      setMax(max);
      setMin(min);
    }
  }, [dispatch, status]);

  return (
    <div className={classes.wrapper}>
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
          {status === "success" && isLoading === false && (
            <div className={classes.chart}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={goldFromToDate}
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
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {status === "rejected" && (
            <Alert variant="danger">Error fetch data!!!</Alert>
          )}
          {status === "success" && maxPrice && minPrice && (
            <div className={classes.table_min_max}>
              {" "}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>min value</th>
                    <th>date (min)</th>
                    <th>max value</th>
                    <th>date (max)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={classes.min}>{minPrice.cena}</td>
                    <td className={classes.date_min_max}>{minPrice.data}</td>
                    <td className={classes.max}>{maxPrice.cena}</td>
                    <td className={classes.date_min_max}>{maxPrice.data}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CompareGoldFromDateToDate;
