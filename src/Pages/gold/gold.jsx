import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./gold.module.scss";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { RotatingLines } from "react-loader-spinner";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Alert from "react-bootstrap/Alert";

import { GiGoldBar } from "react-icons/gi";
import IconArrow from "../../components/UI/iconArrow/iconArrow";
import getCurrentPrevDifferences from "../../utils/getCurrentPrevDifferences";
import { countPercentCurrLastValue } from "../../utils/countPercentCurrentLastValue";
import { goldFetchTopLastCount } from "../../store/goldApiNbp/goldFetchTopLastCount";
import SimpleLineChart from "../../components/Chart/SimpleLineChart";
import CalculateGoldComponent from "../../components/CalculateGoldComponent/CalculateGoldComponent";
import CompareGoldPricesByDate from "../../components/CalculateGoldPriceByDateComponent/CompareGoldPricesByDate";
import CompareGoldFromDateToDate from "../../components/CompareGoldFromDateToDate/CompareGoldFromDateToDate";
const Gold = () => {
  const dispatch = useDispatch();
  const gold = useSelector((state) => state.goldFetch.data);
  const status = useSelector((state) => state.goldFetch.status);
  const isLoading = useSelector((state) => state.goldFetch.isLoading);
  const goldLastTopCount = useSelector((state) => state.goldFetchTopLast.data);
  const isLoadingLastTopCount = useSelector(
    (state) => state.goldFetchTopLast.isLoading
  );
  const statusTopLastCount = useSelector(
    (state) => state.goldFetchTopLast.status
  );
  const [key, setKey] = useState("3");
  const [maxPrice, setMax] = useState();
  const [minPrice, setMin] = useState();

  useEffect(() => {
    dispatch(goldFetchTopLastCount({ number: +key }));
  }, [dispatch, key]);

  useEffect(() => {
    if (statusTopLastCount === "success" && goldLastTopCount.cena !== "") {
      const max = [...goldLastTopCount].reduce((prev, next) =>
        prev.cena > next.cena ? prev : next
      );

      const min = [...goldLastTopCount].reduce((prev, next) =>
        prev.cena < next.cena ? prev : next
      );

      setMax(max);
      setMin(min);
    }
  }, [dispatch, statusTopLastCount]);
  console.log(maxPrice);
  return (
    <>
      <header className={classes.header}>
        <Container fluid>
          <Row>
            <Col>
              <h1>
                Gold section{" "}
                <span className={classes.icon_wrapper}>
                  <GiGoldBar />
                </span>
              </h1>
              <p className={classes.header_description}>
                Gold price query parameters
              </p>
            </Col>
          </Row>
        </Container>
      </header>
      <main className={classes.gold}>
        <Wrapper css="grey">
          <section className={classes.gold_section}>
            <Container fluid>
              <Row>
                <Col xs={12} md={3}>
                  <h2 className={classes.title}>Actual Gold prices </h2>
                  {status === "success" && (
                    <div className={classes.card_wrapper}>
                      {" "}
                      <Card className="mb-2">
                        <Card.Header as="h5">Current gold price</Card.Header>
                        <Card.Body>
                          <Card.Title>
                            {gold[1].cena} PLN/g{" "}
                            <IconArrow
                              arrow={getCurrentPrevDifferences(
                                gold[1].cena,
                                gold[0].cena
                              )}
                            />
                          </Card.Title>
                          <Card.Text>{`date: ${gold[1].data}`}</Card.Text>
                          <Card.Text>
                            <span className={classes.amount}>amount:</span>
                            <span
                              className={`${classes.rate} ${
                                classes[
                                  getCurrentPrevDifferences(
                                    gold[1].cena,
                                    gold[0].cena
                                  )
                                ]
                              }`}
                            >
                              {(gold[1].cena - gold[0].cena).toFixed(4)}
                            </span>
                          </Card.Text>
                          <Card.Text>
                            <span className={classes.amount}>%:</span>
                            <span
                              className={`${classes.rate} ${
                                classes[
                                  getCurrentPrevDifferences(
                                    gold[1].cena,
                                    gold[0].cena
                                  )
                                ]
                              }`}
                            >{`(${countPercentCurrLastValue(
                              gold[1].cena,
                              gold[0].cena
                            )}%)`}</span>
                          </Card.Text>
                          <Card.Text>
                            {" "}
                            <span className={classes.prev_price}>
                              {" "}
                              Previous price: {gold[0].cena} PLN/g{" "}
                            </span>
                            <span className={classes.date}>
                              previous date: {gold[0].data}
                            </span>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  )}
                </Col>
                <Col xs={12} md={9}>
                  <h3 className={classes.title_top}>
                    Last {key} top count gold
                  </h3>
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                  >
                    <Tab eventKey="3" title="3d"></Tab>
                    <Tab eventKey="7" title="7d"></Tab>
                    <Tab eventKey="14" title="14d"></Tab>
                    <Tab eventKey="30" title="1M"></Tab>
                    <Tab eventKey="90" title="3M"></Tab>
                    <Tab eventKey="180" title="6M"></Tab>
                  </Tabs>
                  <Row>
                    <Col>
                      {(isLoadingLastTopCount ||
                        statusTopLastCount === "pending") && (
                        <div className="loader">
                          is Loading ....
                          <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="96"
                            visible={true}
                          />
                        </div>
                      )}
                      {statusTopLastCount === "error" && (
                        <Alert>Error fetch</Alert>
                      )}
                      {statusTopLastCount === "success" && (
                        <div className={classes.chart}>
                          <SimpleLineChart data={goldLastTopCount} />
                        </div>
                      )}
                      {statusTopLastCount === "success" &&
                        maxPrice &&
                        minPrice && (
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
                                  <td className={classes.min}>
                                    {minPrice.cena}
                                  </td>
                                  <td className={classes.date_min_max}>
                                    {minPrice.data}
                                  </td>
                                  <td className={classes.max}>
                                    {maxPrice.cena}
                                  </td>
                                  <td className={classes.date_min_max}>
                                    {maxPrice.data}
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
          <section className={classes.gold_section}>
            <Container fluid>
              <Row>
                <Col md={6} lg={4}>
                  <div className={classes.card_wrapper}>
                    <h3>Calculate the value of grams of gold</h3>
                    <CalculateGoldComponent />
                  </div>
                </Col>
                <Col>
                  <div className={classes.card_wrapper}>
                    <h3>Compare gold prices by date</h3>
                    <Row>
                      <Col xs={12}>
                        {" "}
                        <CompareGoldPricesByDate />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </Wrapper>
        <Wrapper css="grey">
          <section className={classes.gold_section}>
            <Container fluid>
              <Row>
                <Col>
                  {" "}
                  <div className={classes.card_wrapper}>
                    {" "}
                    <h3>Compare gold values from date to date.</h3>
                    <CompareGoldFromDateToDate/>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </Wrapper>
      </main>
    </>
  );
};

export default Gold;