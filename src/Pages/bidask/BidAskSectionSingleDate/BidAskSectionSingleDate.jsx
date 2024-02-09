import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./BidAskSectionSingleDate.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import { fetchBidAskSingleDate } from "../../../store/currencyApiNbp/bidAskFetchSingleDate";
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

function BidAskSectionSingleDate({ code, currency, currentData }) {
  const dispatch = useDispatch();
  const { data, isLoading, error, status } = useSelector(
    (state) => state.bidAskSingleDate
  );
  const [lastDate, setLastDate] = useState();
  const [currentLastData, setCurrentLastData] = useState();
  const [newArr, setNewArr] = useState();

  const makeCurrentLastData = (currentData, data) => {
    if (status === "success" && lastDate && data && currentData) {
      setNewArr([{ ...currentData }, { ...data.rates[0] }]);
      const newData = { ...currentData };

      const tabFetchData = { ...data.rates[0] };
      tabFetchData["bid_selected"] = tabFetchData["bid"];
      delete tabFetchData["bid"];
      tabFetchData["ask_selected"] = tabFetchData["ask"];
      delete tabFetchData["ask"];
      tabFetchData["selected_date"] = tabFetchData["effectiveDate"];
      delete tabFetchData["effectiveDate"];
      tabFetchData["selected_no"] = tabFetchData["no"];
      delete tabFetchData["no"];

      const getNewCurrentFetchData = Object.assign(newData, tabFetchData);
      setCurrentLastData([getNewCurrentFetchData]);
    }
  };
  const handleInput = (e) => {
    setLastDate(e.target.value);
  };

  useEffect(() => {
    if (lastDate) {
      dispatch(fetchBidAskSingleDate({ code, date: lastDate }));
    }
  }, [dispatch, lastDate]);
  useEffect(() => {
    makeCurrentLastData(currentData, data);
  }, [lastDate, currentData, data, dispatch]);
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
            {error && (
              <Alert variant="danger">
                Error fetch data selected: {lastDate}
              </Alert>
            )}
          </Col>
          <Col>
            {newArr && !error&& (
              <div className={classes.chart}>
                {" "}
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={newArr}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="effectiveDate" />
                    <YAxis domain={['auto','auto']}/>
                    <Tooltip />
                    <Legend />
                    <Bar
                      barSize={40}
                      dataKey="bid"
                      fill="#8884d8"
                      background={{ fill: "#eee" }}
                    />
                    <Bar barSize={40} dataKey="ask" fill="#b81a98" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className={classes.table_min_max}>
              <Table responsive striped  hover>
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
                    <td className={classes.min}>{currentData.bid}</td>
                    <td className={classes.max}>{currentData.ask}</td>
                    <td className={classes.date_min_max}>
                      {currentData.effectiveDate}
                    </td>
                    <td className={classes.min}>
                      {status === "success" && data.rates[0].bid}
                    </td>
                    <td className={classes.max}>
                      {status === "success" && data.rates[0].ask}
                    </td>
                    <td className={classes.date_min_max}>
                      {status === "success" && data.rates[0].effectiveDate}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <label className={classes.rate}>
                {status === "success" &&
                  `selected date: ${data.rates[0].effectiveDate}, table: ${data.table}, no: ${data.rates[0].no} `}
              </label>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BidAskSectionSingleDate;
