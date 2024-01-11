import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import classes from "./ExchangeDetSearchDate.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { RotatingLines } from "react-loader-spinner";

import { singleCurrencyDateFetch } from "../../../store/currencyApiNbp/singleCurrencyFetchDateSlice";
import getCurrentPrevDifferences from "../../../utils/getCurrentPrevDifferences";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExchangeDetSearchDate({ data, currency }) {
  const dispatch = useDispatch();
  const fetchData = useSelector((state) => state.singleCurrency.data);
  const isLoading = useSelector((state) => state.singleCurrency.isLoading);
  const status = useSelector((state) => state.singleCurrency.status);
  const error = useSelector((state) => state.singleCurrency.error);
  const [lastDate, setLastDate] = useState();
  const [currentLastData, setCurrentLastData] = useState();

  const makeCurrentLastData = (last, data) => {
    if (status === "success" && lastDate && data) {
      const newData = { ...data[0] };

      const tabFetchData = { ...last.rates[0] };
      tabFetchData["midLast"] = tabFetchData["mid"];
      delete tabFetchData["mid"];
      tabFetchData["fetchDate"] = tabFetchData["effectiveDate"];
      delete tabFetchData["effectiveDate"];

      const getNewCurrentFetchData = Object.assign(newData, tabFetchData);
      setCurrentLastData([getNewCurrentFetchData]);
    }
  };

  const handleInputDate = (e) => {
    setLastDate(e.target.value);
  };

  useEffect(() => {
    if (data && currency)
      dispatch(
        singleCurrencyDateFetch({
          table: currency[1].table,
          code: data[0].code,
          date: lastDate,
        })
      );
  }, [lastDate, dispatch, currency, data]);

  useEffect(() => {
    makeCurrentLastData(fetchData, data);
  }, [lastDate, fetchData, data, dispatch]);

  return (
    <div className={classes.details_wrapper}>
      <Row>
        <Col>
          <h2 className={classes.title}>
            Search currency to date for {data && data[0].code}{" "}
            {data && data[0].currency}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={3}>
          <Form.Control
            style={{ width: "100%" }}
            type="date"
            onChange={handleInputDate}
          ></Form.Control>
          <Form.Label>
            <span className={classes.label}>
              Select a date and check the value: {data && data[0].code}{" "}
              {data && data[0].currency}
            </span>
          </Form.Label>
          {status === "error" && lastDate && (
            <Alert variant="danger">
              Error fetch data selected: {lastDate}
            </Alert>
          )}
        </Col>
        <Col>
          <div className={classes.table}>
            { currentLastData && status === "success" && (
              <div className={classes.chart}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={currentLastData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="code" />
                    <YAxis type="number" domain={["auto", "auto"]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="mid"
                      fill="#365486"
                      background={{ fill: "#eee" }}
                      barSize={20}
                    />
                    <Bar dataKey="midLast" fill="#7FC7D9" barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            {isLoading && (
              <div className={classes.loader}>
                {" "}
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible={true}
                />
              </div>
            )}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    <span className={classes.mid_value}>current value</span>
                  </th>
                  <th>date</th>
                  <th>
                    {" "}
                    <span className={classes.mid_last}>selected value</span>
                  </th>
                  <th>selected date</th>
                  <th>amount</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={classes.value}>{data && data[0].mid} </td>
                  {/* <td className={classes.date}>{gold[1].data}</td> */}
                  <td className={classes.rate}>{currency[1].effectiveDate}</td>
                  <td className={classes.value}>
                    {status === "success" && fetchData.rates[0].mid}
                  </td>
                  <td className={classes.rate}>{lastDate}</td>
                  <td
                    className={
                      status === "success" &&
                      `${classes.rate} ${
                        classes[
                          getCurrentPrevDifferences(
                            data[0].mid,
                            fetchData.rates[0].mid
                          )
                        ]
                      }`
                    }
                  >
                    {status === "success" &&
                      (data[0].mid - fetchData.rates[0].mid).toFixed(4)}
                  </td>
                  <td
                    className={
                      status === "success" &&
                      `${classes.rate} ${
                        classes[
                          getCurrentPrevDifferences(
                            data[0].mid,
                            fetchData.rates[0].mid
                          )
                        ]
                      }`
                    }
                  >
                    {status === "success" &&
                      (
                        (100 * data[0].mid) / fetchData.rates[0].mid -
                        100
                      ).toFixed(4) + "%"}
                  </td>
                </tr>
              </tbody>
            </Table>
            <label className={classes.rate}>
              selected date: {lastDate}{" "}
              {currentLastData && (
                <span className={classes.mid_last}>
                  ,*midLast(selected value), value: {currentLastData[0].midLast}
                </span>
              )}
              , selected code: {data && data[0].code}, selected currency:{" "}
              {data && data[0].currency}
            </label>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ExchangeDetSearchDate;
