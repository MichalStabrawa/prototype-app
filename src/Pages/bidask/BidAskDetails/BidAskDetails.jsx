import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { singleCurrencyLastFewTimes } from "../../../store/currencyApiNbp/singleCurrencyLastFewTimes";

import classes from "./BidAskDetails.module.scss";
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
import Card from "react-bootstrap/Card";
import { TiArrowBackOutline } from "react-icons/ti";
import ResponsiveCarousel from "../../../components/Carousel/ResponsiveCarousel/ResponsiveCarousel";
import getCompareLastActualValue from "../../../utils/getCurrentLastValue";
import { RotatingLines } from "react-loader-spinner";
import BidAskSectionSingleDate from "../BidAskSectionSingleDate/BidAskSectionSingleDate";

import { BsCurrencyExchange } from "react-icons/bs";
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

const BidAskDetails = () => {
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

  const findLastIndex = () => {
    if (statusLastTop === "success") {
      const lastDataIndex = currencyLastTopCount.rates.length - 1;
      return lastDataIndex;
    }
  };

  useEffect(() => {
    if (status === "success") {
      const tab = getCompareLastActualValue(
        currency[1].rates,
        currency[0].rates
      );
      setDataCarousel(tab);
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

  return (
    <main className={classes.bid_ask}>
      <Wrapper css="dark_blue">
        <Container fluid>
          <Row>
            <Col>
              <header>
                {" "}
                <h1>
                  Bid & Ask Details{" "}
                  <span>
                    <BsCurrencyExchange />
                  </span>
                </h1>
                {currency.length > 0 && status === "success" ? (
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
        {isLoadingLastTop && (
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
        <section className={classes.bid_ask__wrapper}>
          <Container fluid>
            <Row>
              <Col>
                {" "}
                <div className={classes.back}>
                  {" "}
                  <Link to="/bidask">
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
                <div className={classes.card_wrapper}>
                  {" "}
                  <Card border="light">
                    <Card.Header as="h5" text="dark">
                      code: {params.id}
                    </Card.Header>
                    <Card.Body>
                      <Card.Subtitle>
                        currency:{" "}
                        {statusLastTop === "success" &&
                          currencyLastTopCount.currency}
                      </Card.Subtitle>
                      <Card.Title>
                        <span className={classes.bid}>
                          bid:{" "}
                          {statusLastTop === "success" &&
                            currencyLastTopCount.rates[findLastIndex()]
                              .bid}{" "}
                        </span>
                      </Card.Title>
                      <Card.Title>
                        <span className={classes.ask}>
                          {" "}
                          ask:{" "}
                          {statusLastTop === "success" &&
                            currencyLastTopCount.rates[findLastIndex()].ask}
                        </span>
                      </Card.Title>
                      <Card.Text>
                        no:{" "}
                        {statusLastTop === "success" &&
                          currencyLastTopCount.rates[findLastIndex()].no}
                      </Card.Text>
                      <Card.Text>
                        date:{" "}
                        {statusLastTop === "success" &&
                          currencyLastTopCount.rates[findLastIndex()]
                            .effectiveDate}
                      </Card.Text>
                      <Card.Text>
                        table:{" "}
                        {statusLastTop === "success" &&
                          currencyLastTopCount.table}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
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
                              activeDot={{ r: 8 }}
                              stroke="#17a2b8"
                            />
                            <Line
                              type="linear"
                              dataKey="ask"
                              stroke="#b81a98"
                            />
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
        </section>
      </Wrapper>
      <Wrapper>
        <section className={classes.bid_ask__wrapper}>
        {statusLastTop === "success" &&
                          currencyLastTopCount.currency &&  <BidAskSectionSingleDate code={params.id} currency={currencyLastTopCount.currency}/>}
     
        </section>
      </Wrapper>
    </main>
  );
};

export default BidAskDetails;
