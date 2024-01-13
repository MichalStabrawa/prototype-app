import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import classes from "./BidAskFromToDate.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
function BidAskFromToDate({ currency }) {
  const dispatch = useDispatch();
  const { data, isLoading, status, error } = useSelector(
    (state) => state.fetchBidAskSingleFromToDate
  );
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [fetch, setFetch] = useState(false);

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
                    <YAxis domain={["dataMin,dataMax"]} />
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default BidAskFromToDate;
