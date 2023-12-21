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
import Alert from 'react-bootstrap/Alert';
import IconArrow from "../../../components/UI/iconArrow/iconArrow";
import getCurrentPrevDifferences from '../../../utils/getCurrentPrevDifferences';

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

function ExchangeDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const currency = useSelector((state) => state.currency.data);
  const status = useSelector((state) => state.currency.status);
  const isLoading = useSelector((state) => state.currency.isLoading);
  const [data, setData] = useState();
  const [dataLast,setDataLast] = useState();
  const [key, setKey] = useState("3");

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
  const errorLast = useSelector((state)=>state.singleCurrencyLastFewTimes.error)

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
      setDataLast(filterCurrencyLast(currency))
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

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <Wrapper>
        <header>
          {" "}
          <h1>Exchange Details</h1>
          {errorLast}
        </header>
      </Wrapper>
      <Wrapper css="grid">
      
        <main className={classes.exchange}>
          <Container fluid>
            <Row>
              <Col >
                <div className={classes.back}>
                  {" "}
                  <Link to="/exchange">
                    {" "}
                    <Button variant="secondary"><TiArrowBackOutline /> Back</Button>
                  </Link>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={3}>
                {currency && data && (
                  <div>
                    <h3 className={classes.code}>{data[0].code}</h3>
                    <p className={classes.value}>
                      <span>{data[0].mid}</span> <IconArrow  arrow={getCurrentPrevDifferences(data[0].mid, dataLast[0].mid)}/>
                    </p>
                    <p> {data[0].currency} </p>
                    <p className={classes.date}>
                      <span>date: {currency[1].effectiveDate}</span>
                    </p>
                  </div>
                )}
              </Col>
              <Col>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey="3" title="3D"></Tab>
                  <Tab></Tab>
                  <Tab eventKey="14" title="14D"></Tab>
                  <Tab eventKey="21" title="21D"></Tab>
                  <Tab eventKey="30" title="1m"></Tab>
                  <Tab eventKey="60" title="2m"></Tab>
                </Tabs>
                <Row>
                  <Col>
                  {errorLast&& <Alert variant="warning">Error fetch data</Alert>}
                    {statusLastTop === "success" && (
                      <div className={classes.tab_content}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            width={500}
                            height={300}
                            data={currencyLastTopCount.rates}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="effectiveDate" />
                            <YAxis domain={["dataMin"]} />
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
                </Row>
              </Col>
            </Row>
          </Container>
        </main>
      </Wrapper>
    </>
  );
}

export default ExchangeDetails;
