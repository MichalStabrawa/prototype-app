import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import classes from "./bidask.module.scss";
import classesExchange from "../../Pages/exchange/exchange-rates.module.scss";
import Card from "react-bootstrap/Card";

import Form from "react-bootstrap/Form";
import { FcCurrencyExchange } from "react-icons/fc";

import { fetchNbpTableC } from "../../store/currencyApiNbp/currencyFetchTableC";
import TableBidAsk from "../../components/UI/TableBidAsk/TableBidAsk";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import ResponsiveCarousel from "../../components/Carousel/ResponsiveCarousel/ResponsiveCarousel";
import getCompareLastActualValue from "../../utils/getCurrentLastValue";
import { FaMoneyBillTransfer } from "react-icons/fa6";

function BidAsk() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tableC.data);
  const status = useSelector((state) => state.tableC.status);
  const isLoading = useSelector((state) => state.tableC.isLoading);
  const currency = useSelector((state) => state.currency.data);
  const statusCurrency = useSelector((state) => state.currency.status);
  const [selectedItem, setSelectedItem] = useState({
    name: "",
    value: "",
    code: "",
  });
  const [selectedItemAsk, setSelectedItemAsk] = useState({
    name: "",
    value: "",
    code: "",
  });
  const [inputValue, setInputValue] = useState(0);
  const [inputValueAsk, setInputValueAsk] = useState("");

  const [dataCarousel, setDataCarousel] = useState();

  const handleChange = (e) => {
    const index = e.target.selectedIndex;
    const option = e.target.childNodes[index];
    const name = e.target.name;

    if (name === "bid") {
      setSelectedItem({
        name: option.getAttribute("data-names"),
        value: e.target.value,
        code: option.getAttribute("data-code"),
      });
    }
    if (name === "ask") {
      setSelectedItemAsk({
        name: option.getAttribute("data-names"),
        value: e.target.value,
        code: option.getAttribute("data-code"),
      });
    } else {
      return null;
    }
  };

  const handleInput = (e) => {
    if (e.target.name === "bid") {
      setInputValue(+e.target.value);
    }
    if (e.target.name === "ask") {
      setInputValueAsk(+e.target.value);
    } else {
      return null;
    }
  };

  const selectValueBid = () => {
    return data[0].rates.map((el, index) => (
      <option
        value={el.bid}
        key={index}
        data-names={el.currency}
        data-code={el.code}
      >
        {el.code} /{el.currency} {el.bid}
      </option>
    ));
  };

  const selectedValueAsk = () => {
    return data[0].rates.map((el, index) => (
      <option
        value={el.ask}
        key={index}
        data-names={el.currency}
        data-code={el.code}
      >
        {el.code} /{el.currency} {el.ask}
      </option>
    ));
  };

  useEffect(() => {
    dispatch(fetchNbpTableC());
  }, [dispatch]);

  useEffect(() => {
    if (statusCurrency === "success") {
      setDataCarousel(
        getCompareLastActualValue(currency[1].rates, currency[0].rates)
      );
    }
  }, [currency]);

  if (isLoading) {
    return "LOADING......";
  }

  return (
    <>
      <Wrapper css="dark_blue">
        <header className={classes.header}>
          <h1 className={classes.title}>
            Bid & Ask currency{" "}
            <span>
              <FcCurrencyExchange />
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
      </Wrapper>

      <main className={classes.main}>
        <Container fluid>
          <Row className="h-100">
            <Col xs={12} md={6} className="d-flex flex-column flex-fill">
              <Card
                className={`${classes.custom_card} h-100 shadow`}
                border="light"
              >
                <Card.Body className="d-flex flex-column">
                  {" "}
                  <h3 className={classes.card_title}>
                    {" "}
                    <span className={classesExchange.wrapper_icon_change}>
                      <FaMoneyBillTransfer />
                    </span>
                    Sell or buy currency
                  </h3>
                  {status === "success" && (
                    <p className={classes.description}>
                      table: {data[0].table}, effective date:{" "}
                      {data[0].effectiveDate}, no: {data[0].no}, trading date:{" "}
                      {data[0].tradingDate}
                    </p>
                  )}
                  <Col xs={12} md={6}>
                    <h4>Sell currency</h4>
                    <Form.Control
                      onChange={handleInput}
                      type="number"
                      placeholder="count"
                      name="bid"
                      min="0"
                    />

                    <Form.Select
                      onChange={handleChange}
                      aria-label="Default select example"
                      name="bid"
                    >
                      <option value="open this select">
                        Open this select menu
                      </option>
                      {status === "success" && selectValueBid()}
                    </Form.Select>

                    <div className={classes.count}>
                      {inputValue === 0 && selectedItem.value !== ""
                        ? "0"
                        : (selectedItem.value * inputValue).toFixed(4) +
                          " " +
                          "PLN"}
                    </div>
                  </Col>
                  <Col xs={12} md={6}>
                    <h4>Buy currency</h4>
                    <Form.Control
                      onChange={handleInput}
                      type="number"
                      placeholder="count"
                      name="ask"
                      min="0"
                    />
                    <Form.Select
                      onChange={handleChange}
                      aria-label="Default select example"
                      name="ask"
                    >
                      <option value="open this select ask">
                        Open this select menu ask
                      </option>
                      {status === "success" && selectedValueAsk()}
                    </Form.Select>
                    <div className={`${classes.count} ${classes.count_ask}`}>
                      {inputValueAsk === 0 && selectedItemAsk.value !== ""
                        ? "0"
                        : (selectedItemAsk.value * inputValueAsk).toFixed(4) +
                          " " +
                          "PLN"}
                    </div>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} className="d-flex flex-column flex-fill">
              {" "}
              {status === "success" && (
                <Card
                  className={`${classes.custom_card} h-100 shadow`}
                  border="light"
                >
                  <Card.Body className="d-flex flex-column">
                    <TableBidAsk data={data} />
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className={`${classes.custom_card} shadow`} border="light">
                <Card.Body>
                  {" "}
                  <div className={classes.chart}>
                    {status === "success" && (
                      <div className={classes.description_chart}>
                        <p>
                          Table {data[0].table},{" "}
                          <span>
                            date {data[0].effectiveDate}, no: {data[0].no},
                            trading date: {data[0].tradingDate}
                          </span>
                        </p>
                      </div>
                    )}
                    {status === "success" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          width={500}
                          height={300}
                          barSize={30}
                          data={data[0].rates}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="code" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="bid"
                            fill="#17a2b8"
                            activeBar={<Rectangle fill="pink" stroke="blue" />}
                          />
                          <Bar
                            dataKey="ask"
                            fill="#b81a98"
                            activeBar={
                              <Rectangle fill="gold" stroke="purple" />
                            }
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <Card className="shadow" border="light">
                <Card.Body>
                  {" "}
                  <div className={classes.chart}>
                    {status === "success" && (
                      <div className={classes.description_chart}>
                        <p>
                          Table {data[0].table},{" "}
                          <span>
                            date {data[0].effectiveDate}, no: {data[0].no},
                            trading date: {data[0].tradingDate}
                          </span>
                        </p>
                      </div>
                    )}
                    {status === "success" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          width={500}
                          height={400}
                          data={data[0].rates}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="code" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="bid"
                            stackId="1"
                            stroke="#8884d8"
                            fill="#8884d8"
                          />

                          <Area
                            type="monotone"
                            dataKey="ask"
                            stackId="1"
                            stroke="#ffc658"
                            fill="#ffc658"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default BidAsk;
