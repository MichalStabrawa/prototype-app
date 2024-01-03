import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./gold.module.scss";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Alert from "react-bootstrap/Alert";

import { GiGoldBar } from "react-icons/gi";
import IconArrow from "../../components/UI/iconArrow/iconArrow";
import getCurrentPrevDifferences from "../../utils/getCurrentPrevDifferences";
import { countPercentCurrLastValue } from "../../utils/countPercentCurrentLastValue";
import { goldFetchTopLastCount } from "../../store/goldApiNbp/goldFetchTopLastCount";
import SimpleLineChart from "../../components/Chart/SimpleLineChart";

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

  useEffect(() => {
    dispatch(goldFetchTopLastCount({ number: +key }));
  }, [dispatch, key]);
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

      <Wrapper css="grey">
        <main className={classes.gold}>
          <Container fluid>
            <Row>
              <Col xs={12} md={4}>
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
                          <p className={classes.prev_price}>
                            {" "}
                            Previous price: {gold[0].cena} PLN/g{" "}
                          </p>

                          <span className={classes.date}>
                            previous date: {gold[0].data}
                          </span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                )}
              </Col>
              <Col md={8}>
                <h3 className={classes.title_top}>Last {key} top count gold</h3>
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
                    {statusTopLastCount === "error" && (
                      <Alert>Error fetch</Alert>
                    )}
                    {statusTopLastCount === "success" && (
                      <div className={classes.chart}>
                        <SimpleLineChart data={goldLastTopCount} />
                      </div>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </main>
      </Wrapper>
    </>
  );
};

export default Gold;
