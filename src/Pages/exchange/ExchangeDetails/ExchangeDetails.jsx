import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Wrapper from "../../../components/UI/Wrapper/Wrapper";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Alert from "react-bootstrap/Alert";
import IconArrow from "../../../components/UI/iconArrow/iconArrow";
import getCurrentPrevDifferences from "../../../utils/getCurrentPrevDifferences";

import Table from "react-bootstrap/Table";
import ResponsiveCarousel from "../../../components/Carousel/ResponsiveCarousel/ResponsiveCarousel";
import getCompareLastActualValue from "../../../utils/getCurrentLastValue";
import ExchangeDetSearchDate from "../../../components/ExchangeDetailsComponents/ExhchangeDetSearchDate/ExchangeDetSearchDate";
import ExchangeDetaSelectTwoDate from "../../../components/ExchangeDetailsComponents/ExchangeDetSelectTwoDate/ExchangeDetSelectTwoDate";
import { singleCurrBidLastTopCountFetch } from "../../../store/currencyApiNbp/singleCurrencyBidLastTopCountSlice";
import { TiArrowBackOutline } from "react-icons/ti";
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

import classes from "./ExchangeDetails.module.scss";
import { countPercentCurrLastValue } from "../../../utils/countPercentCurrentLastValue";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BsCurrencyExchange } from "react-icons/bs";

function ExchangeDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const currency = useSelector((state) => state.currency.data);
  const status = useSelector((state) => state.currency.status);
  const isLoading = useSelector((state) => state.currency.isLoading);
  const currencyLastTopCount = useSelector(
    (state) => state.singleCurrBidTopLastCount.data
  );
  const isLoadingLastTop = useSelector(
    (state) => state.singleCurrBidTopLastCount.isLoading
  );

  const statusLastTop = useSelector(
    (state) => state.singleCurrBidTopLastCount.status
  );
  const errorLast = useSelector(
    (state) => state.singleCurrBidTopLastCount.error
  );
  const [data, setData] = useState();
  const [dataLast, setDataLast] = useState();
  const [key, setKey] = useState("3");
  const [minMid, setMinMid] = useState(null);
  const [maxMid, setMaxMid] = useState(null);
  const [dataCarousel, setDataCarousel] = useState();

  //ask bid data

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
    if (params.id !== "" && status === "success") {
      dispatch(
        singleCurrBidLastTopCountFetch({
          table: currency[1].table,
          code: params.id,
          topCount: +key,
        })
      );
    }
  }, [dispatch, key, params.id, currency, status]);

  useEffect(() => {
    if (statusLastTop === "success") {
      console.log(currencyLastTopCount);
      const min = [...currencyLastTopCount.rates].reduce((prev, next) =>
        prev.mid < next.mid ? prev : next
      );
      const max = [...currencyLastTopCount.rates].reduce((prev, next) =>
        prev.mid > next.mid ? prev : next
      );

      setMinMid(min);
      setMaxMid(max);
    }
  }, [statusLastTop, currencyLastTopCount]);

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
    <main className={classes.exchange_wrapper}>
      <Wrapper css="dark_blue">
        <Container fluid>
          <Row>
            <Col>
              <header>
                {" "}
                <h1>
                  Exchange Details{" "}
                  <span>
                    <BsCurrencyExchange />
                  </span>
                </h1>
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
        <section className={classes.exchange}>
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
                <h3>Rate for a particular currency</h3>
                {status === "success" && data && (
                  <Card>
                    <Card.Header as="h5">
                      <span className={classes.descr}>code:</span>
                      {data[0].code}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>
                        <span className={classes.descr}>amount:</span>
                        <span>{data[0].mid}</span>{" "}
                        <span>
                          <IconArrow
                            arrow={getCurrentPrevDifferences(
                              data[0].mid,
                              dataLast[0].mid
                            )}
                          />
                        </span>
                      </Card.Title>
                      <Card.Subtitle>
                        <span className={classes.currency}>
                          <span className={classes.descr}>currency:</span>

                          {data[0].currency}
                        </span>{" "}
                      </Card.Subtitle>
                      <Card.Text>
                        <span className={classes.descr}>change:</span>
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
                      </Card.Text>
                      <Card.Text>
                        <span className={classes.descr}>%:</span>
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
                          {`(${countPercentCurrLastValue(
                            data[0].mid,
                            dataLast[0].mid
                          )}%)`}
                        </span>
                      </Card.Text>
                      <Card.Text>
                        {" "}
                        <span className={classes.date}>
                          date: {currency[1].effectiveDate}
                        </span>
                      </Card.Text>
                      <Card.Text>
                        <span className={classes.date}>
                          no: {currency[1].no}
                        </span>
                      </Card.Text>
                      <Card.Text>
                        <span>table: {currency[1].table}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )}
              </Col>
              <Col>
                <div className={classes.tab_wrapper}>
                  {" "}
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
                </div>

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
                              dataKey="mid"
                              stroke="#365486"
                              activeDot={{ r: 8 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </Col>
                  <Col xs={12}>
                    {statusLastTop === "success" && minMid && maxMid && (
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
                              <td className={classes.min}>{minMid.mid}</td>
                              <td className={classes.date_min_max}>
                                {minMid.effectiveDate}
                              </td>
                              <td className={classes.max}>{maxMid.mid}</td>
                              <td className={classes.date_min_max}>
                                {maxMid.effectiveDate}
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
        </section>
      </Wrapper>
      <Wrapper>
        <section className={`${classes.exchange} ${classes.next}`}>
          <Container fluid>
            <Row>
              <Col>
                {" "}
                <Row>
                  <Col>
                    {status === "success" && data && (
                      <ExchangeDetSearchDate currency={currency} />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </Wrapper>
      <Wrapper>
        <section className={`${classes.exchange} `}>
          {" "}
          <ExchangeDetaSelectTwoDate />
        </section>
      </Wrapper>
    </main>
  );
}

export default ExchangeDetails;
