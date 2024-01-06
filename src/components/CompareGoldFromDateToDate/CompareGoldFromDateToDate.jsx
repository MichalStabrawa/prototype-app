import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./CompareGoldFromDateToDate.module.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
   
    if ( fetch===true) {
      dispatch(goldFetchFromToDate({ fromDate: fromDate, toDate: toDate }));
    }
    setFetch(false);
  }, [dispatch, fetch]);

  return (
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
        {status === "success" && isLoading ===false  && (
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
  );
};

export default CompareGoldFromDateToDate;
