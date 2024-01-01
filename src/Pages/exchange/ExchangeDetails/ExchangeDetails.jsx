import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Wrapper from "../../../components/UI/Wrapper/Wrapper";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Alert from "react-bootstrap/Alert";
import IconArrow from "../../../components/UI/iconArrow/iconArrow";
import getCurrentPrevDifferences from "../../../utils/getCurrentPrevDifferences";
import minMaxBidAsk from "../../../utils/minMaxBidAsk";
import Table from "react-bootstrap/Table";
import ResponsiveCarousel from "../../../components/Carousel/ResponsiveCarousel/ResponsiveCarousel";
import getCompareLastActualValue from "../../../utils/getCurrentLastValue";

import { singleCurrencyLastFewTimes } from "../../../store/currencyApiNbp/singleCurrencyLastFewTimes";
import { TiArrowBackOutline } from "react-icons/ti";
import {
  LineChart,
  BarChart,
  Rectangle,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import classes from "./ExchangeDetails.module.scss";
import BudgetAppSection from "../../../components/BudgetApp/BudgetAppSection/BudgetAppSection";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ExchangeDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const currency = useSelector((state) => state.currency.data);
  const status = useSelector((state) => state.currency.status);
  const isLoading = useSelector((state) => state.currency.isLoading);
  const [data, setData] = useState();
  const [dataLast, setDataLast] = useState();
  const [key, setKey] = useState("3");
  const [minBidAsk, setMinBidAsk] = useState(null);
  const [maxBidAsk, setMaxBidAsk] = useState(null);
  const [dataCarousel, setDataCarousel] = useState();

  //ask bid data
  const currencyLastTopCount = useSelector(
    (state) => state.singleCurrencyLastFewTimes.data
  );
  const isLoadingLastTop = useSelector(
    (state) => state.singleCurrencyLastFewTimes.isLoading
  );

  const statusLastTop = useSelector(
    (state) => state.singleCurrencyLastFewTimes.status
  );
  const errorLast = useSelector(
    (state) => state.singleCurrencyLastFewTimes.error
  );

  const [number, setNumber] = useState(3);

  const filterCurrency = (data) => {
    return data[1].rates.filter((el) => el.code === params.id);
  };
  const filterCurrencyLast = (data) => {
    return data[0].rates.filter((el) => el.code === params.id);
  };

  useEffect(() => {
    if (status === "success") {
      setData(filterCurrency(currency));
      setDataLast(filterCurrencyLast(currency));
    }
  }, [currency]);

  useEffect(() => {
    if (params.id !== "") {
      dispatch(
        singleCurrencyLastFewTimes({
          code: params.id,
          number: +key,
        })
      );
    }
  }, [key, params.id]);

  useEffect(() => {
    minMaxBidAsk(
      currencyLastTopCount,
      statusLastTop,
      setMinBidAsk,
      setMaxBidAsk
    );
  }, [statusLastTop]);

  useEffect(() => {
    if (status === "success") {
      const tab = getCompareLastActualValue(
        currency[1].rates,
        currency[0].rates
      );
      setDataCarousel(tab);
    }
  }, [currency]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  console.log("CurrencyLastTop");
  console.log(currencyLastTopCount);

  return (
    <section className={classes.exchange_wrapper}>
      <Wrapper css="dark_blue">
        <Container fluid>
          <Row>
            <Col>
              <header>
                {" "}
                <h1>Exchange Details</h1>
                {currency.length > 0 ? (
                  <div className={classes.carousel}>
                    <ResponsiveCarousel
                      data={dataCarousel}
                      slidesToShow={5}
                      effectiveDate={currency[1].effectiveDate}
                    />
                  </div>
                ) : null}
              </header>
            </Col>
          </Row>
        </Container>
      </Wrapper>
      <Wrapper css="grey">
        <main className={classes.exchange}>
          <Container fluid>
            <Row>
              <Col>
                <div className={classes.back}>
                  {" "}
                  <Link to="/exchange">
                    {" "}
                    <Button variant="secondary">
                      <TiArrowBackOutline /> Back
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={3}>
                <BudgetAppSection>
                  <h3>Rate for a particular currency</h3>
                  {currency && data && (
                    <div>
                      <h4 className={classes.code}>{data[0].code}</h4>
                      <p className={classes.value}>
                        <span>{data[0].mid}</span>{" "}
                        <IconArrow
                          arrow={getCurrentPrevDifferences(
                            data[0].mid,
                            dataLast[0].mid
                          )}
                        />
                        <span
                          className={`${classes.rate} ${
                            classes[
                              getCurrentPrevDifferences(
                                data[0].mid,
                                dataLast[0].mid
                              )
                            ]
                          }`}
                        >
                          {(data[0].mid - dataLast[0].mid).toFixed(4)}
                        </span>
                      </p>
                      <p className={classes.currency}> {data[0].currency} </p>
                      <p className={classes.date}>
                        <span>date: {currency[1].effectiveDate}</span>
                      </p>
                    </div>
                  )}
                </BudgetAppSection>
              </Col>
              <Col>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey="3" title="3D"></Tab>
                  <Tab eventKey="7" title="7D"></Tab>
                  <Tab eventKey="14" title="14D"></Tab>
                  <Tab eventKey="21" title="21D"></Tab>
                  <Tab eventKey="30" title="1m"></Tab>
                  <Tab eventKey="60" title="2m"></Tab>
                  <Tab eventKey="90" title="3m"></Tab>
                  <Tab eventKey="180" title="6m"></Tab>
                </Tabs>
                <Row>
                  <Col xs={12}>
                    {errorLast && (
                      <Alert variant="warning">Error fetch data</Alert>
                    )}
                    {statusLastTop === "success" && (
                      <div className={classes.tab_content}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            width={500}
                            height={300}
                            data={currencyLastTopCount.rates}
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
                              stroke="blue"
                              activeDot={{ r: 8 }}
                            />
                            <Line type="linear" dataKey="ask" stroke="violet" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </Col>
                  <Col xs={12}>
                    {statusLastTop === "success" && minBidAsk && maxBidAsk && (
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
        </main>
      </Wrapper>
    </section>
  );
}

export default ExchangeDetails;
