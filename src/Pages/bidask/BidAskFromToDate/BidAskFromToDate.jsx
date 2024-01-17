import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import classes from "./BidAskFromToDate.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import SelectFromToDates from "../../../components/UI/SelectFromToDates/SelectFromToDates";
import { fetchBidAskSingleFromToDate } from "../../../store/currencyApiNbp/bidAskFetchSingleFromToDate";
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

import minMaxBidAsk from "../../../utils/minMaxBidAsk";

function BidAskFromToDate({ currency }) {
  const dispatch = useDispatch();
  const { data, isLoading, status, error } = useSelector(
    (state) => state.fetchBidAskSingleFromToDate
  );
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [fetch, setFetch] = useState(false);
  const [minBidAsk, setMinBidAsk] = useState(null);
  const [maxBidAsk, setMaxBidAsk] = useState(null);

  const params = useParams();

  const changeDateInputHandler = (e) => {
    const input = e.target;
    if (input.name === "startDate") {
      setStartDate(input.value);
    } else if (input.name === "endDate") {
      setEndDate(input.value);
    }
  };

  const fetchDateHandler = () => {
    setFetch(true);
  };

  useEffect(() => {
    setFetch(fetch);
    if (fetch === true) {
      dispatch(
        fetchBidAskSingleFromToDate({
          code: params.id,
          startDate: startDate,
          endDate: endDate,
        })
      );
      setFetch(false);
    }
  }, [dispatch, fetch]);

  useEffect(() => {
    minMaxBidAsk(data, status, setMinBidAsk, setMaxBidAsk);
  }, [status]);

  return (
    <div className={classes.main}>
      <Container fluid>
        <Row>
          <Col>
            <h2>
              Select {params.id}/ {currency} bid&ask rates from dates to dates
            </h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <SelectFromToDates
              change={changeDateInputHandler}
              startDate={startDate}
              endDate={endDate}
              fetch={fetchDateHandler}
            />
            {startDate} {endDate}
          </Col>
          <Col>
            {status === "success" && (
              <div className={classes.chart}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={data.rates}
                    margin={{
                      top: 15,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="effectiveDate" />
                    <YAxis domain={["dataMin","auto"]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="linear"
                      dataKey="bid"
                      activeDot={{ r: 8 }}
                      stroke="#17a2b8"
                    />
                    <Line type="linear" dataKey="ask" stroke="#b81a98" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            <Row>
              <Col>
                {" "}
                {status === "success" && minBidAsk && maxBidAsk && (
                  <div className={classes.table_min_max}>
                    {" "}
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>min Bid</th>
                          <th>min Ask</th>
                          <th>date (min)</th>
                          <th>max Bid</th>
                          <th>max Ask</th>
                          <th>date (max)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className={classes.min}>{minBidAsk.bid}</td>
                          <td className={classes.min}>{minBidAsk.ask}</td>
                          <td className={classes.date_min_max}>
                            {minBidAsk.effectiveDate}
                          </td>
                          <td className={classes.max}>{maxBidAsk.bid}</td>
                          <td className={classes.max}>{maxBidAsk.ask}</td>
                          <td className={classes.date_min_max}>
                            {maxBidAsk.effectiveDate}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default BidAskFromToDate;