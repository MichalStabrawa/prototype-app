import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

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

import { exchangeFetchMidForToDate } from "../../../store/currencyApiNbp/exchangeFetchMidForToDateSlice";
import TableMidMinMax from "../../../components/UI/TableMidMinMax/TableMidMinMax";

function ExchangeDetaSelectTwoDate({ code, currency }) {
  const dispatch = useDispatch();
  const params = useParams();
  const dataFetch = useSelector(
    (state) => state.exchangeMidFetchStartEndDate.data
  );
  const isLoading = useSelector(
    (state) => state.exchangeMidFetchStartEndDate.isLoading
  );
  const status = useSelector(
    (state) => state.exchangeMidFetchStartEndDate.status
  );
  const error = useSelector(
    (state) => state.exchangeMidFetchStartEndDate.error
  );

  const table = useSelector((state) => state.table.table);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [fetch, setFetch] = useState(false);

  console.log(`Status: ${status}`);
  console.log(`Error: ${error}`);
  console.log(dataFetch);

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

  console.log("dataFetch");
  console.log(dataFetch);

  useEffect(() => {
    if ((fromDate && toDate && table, fetch === true)) {
      dispatch(
        exchangeFetchMidForToDate({
          table: table,
          code: params.id,
          startDate: fromDate,
          endDate: toDate,
        })
      );

      setFetch(false);
    }
  }, [dispatch, fetch, fromDate, toDate, table, params.id]);
  return (
    <section className={classes.wrapper}>
      <Container fluid>
        <Row>
          <Col>
            <h2 className={classes.title}>
              Select {params.id},currency rates from dates to dates{" "}
            </h2>
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
              {error && <Alert variant="danger">{error}</Alert>}

              {status === "success" && dataFetch.code === params.id && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={dataFetch.rates}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="effectiveDate" />
                    <YAxis domain={"maxValue"} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="line"
                      dataKey="mid"
                      stroke="#365486"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </Col>
          <Row>
            {dataFetch.code === params.id && (
              <TableMidMinMax
                status={status}
                data={dataFetch}
                dateStart={fromDate}
                dateEnd={toDate}
              />
            )}
          </Row>
        </Row>
      </Container>
    </section>
  );
}

export default ExchangeDetaSelectTwoDate;
