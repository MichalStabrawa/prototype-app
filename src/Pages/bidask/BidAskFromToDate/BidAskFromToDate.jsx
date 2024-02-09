import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import classes from "./BidAskFromToDate.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Table from "react-bootstrap/Table";
import SelectFromToDates from "../../../components/UI/SelectFromToDates/SelectFromToDates";
import { fetchBidAskSingleFromToDate } from "../../../store/currencyApiNbp/bidAskFetchSingleFromToDate";
import Alert from "react-bootstrap/Alert";

import minMaxBidAsk from "../../../utils/minMaxBidAsk";
import ReactApexChart from "react-apexcharts";
import { splineArea } from "../../../helpers/chartVariables/splineArea";

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
  const [splineChart, setSplineChart] = useState({
    options: splineArea.options,
    series: [],
  });

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

  useEffect(() => {
    if (data && data.rates) {
      const { rates, code, currency, table } = data;
      console.log("Ratesin useEffect:", rates);
      setSplineChart((prevSplinea) => ({
        ...prevSplinea,
        series: [
          {
            name: "ask",
            data: rates.map((el) => el.ask),
          },
          {
            name: "bid",
            data: rates.map((el) => el.bid),
          },
        ],
        options: {
          xaxis: {
            categories: rates.map((el) => el.effectiveDate),
          },
          title: {
            text: `${code} Price Movements`,
            align: "left",
          },
          subtitle: {
            text: currency,
            align: "left",
          },
        },
      }));
    }
  }, [data, status]);

  console.log(data);

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
          <Col md={6}>
            {status === "success" && (
              <div className={classes.chart_line}>
                {" "}
                {splineChart.options && splineChart.series && (
                  <div>
                    <div id="chart">
                      <ReactApexChart
                        options={splineChart.options}
                        series={splineChart.series}
                        type="line"
                        height={350}
                      />
                    </div>
                    <div id="html-dist"></div>
                  </div>
                )}
              </div>
            )}
            <Row>
              <Col> {error && <Alert variant="warning">{error}</Alert>} </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                {status === "success" && minBidAsk && maxBidAsk && (
                  <div className={classes.table_min_max}>
                    {" "}
                    <Table responsive striped hover>
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
