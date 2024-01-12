import { useState, useEffect } from "react";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import classes from "./exchange-rates.module.scss";
import { useSelector, useDispatch } from "react-redux";
import BudgetAppSection from "../../components/BudgetApp/BudgetAppSection/BudgetAppSection";
import {
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
import getCompareLastActualValue from "../../utils/getCurrentLastValue";
import TableRates from "../../components/UI/TableRates/TableRates";
import InputComponent from "../../components/UI/Input/InputComponent";
import Select from "../../components/UI/Select/Select";
import { kindOfTableActions } from "../../store/currencyApiNbp/kindOfTableSlice";
import {
  singleCurrencyDateFetch,
  singleCurrencyDateActions,
} from "../../store/currencyApiNbp/singleCurrencyFetchDateSlice";

import getCurrentDate from "../../utils/dateFunction";
import Button from "../../components/UI/Button/Button";
import { ThreeCircles } from "react-loader-spinner";
import ButtonStyles from "../../components/UI/Button/Button.module.scss";
import { FaInfoCircle } from "react-icons/fa";
import ExchangeTopLastChart from "../../components/ExchangeComponents/ExchangeTopLastChart/ExchangeTopLastChart";
import ResponsiveCarousel from "../../components/Carousel/ResponsiveCarousel/ResponsiveCarousel";
import ExchangeFromToDate from "../../components/ExchangeComponents/ExchangeFromToDate/ExchangeFromToDate";
import { Link, useParams } from "react-router-dom";

import { BsCurrencyExchange } from "react-icons/bs";
import Card from "react-bootstrap/Card";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExchangeRates = (props) => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency.data);
  const table = useSelector((state) => state.table.table);
  const status = useSelector((state) => state.singleCurrency.status);

  const singleCurrencyData = useSelector((state) => state.singleCurrency.data);
  const isLoading = useSelector((state) => state.content.isLoading);
  const [compareData, setCompareData] = useState([]);
  const [data, setData] = useState([]);
  const [countCurrency, setCountCurrency] = useState([]);
  const [countOtherCurrency, setCountOtherCurrency] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputOtherValue, setInputOtherValue] = useState("");
  const [singleCurrency, setSingleCurrency] = useState({
    name: "",
    value: "",
    code: "",
  });
  const [dateValue, setDateValue] = useState("");
  const [flag, setFlag] = useState(props.flag);
  const [single, setSingle] = useState([]);
  const error = useSelector((state) => state.content.error);
  const [param, setParam] = useState("");

  const params = useParams();

  const currentDate = getCurrentDate();

  const compareDataLive = dateValue === "" || dateValue >= currentDate;
  if (dateValue !== "" && dateValue >= currentDate) {
    console.log(`Compare ${dateValue >= currentDate}`);
  } else {
    console.log(dateValue >= currentDate);
  }

  useEffect(() => {
    setFlag(props.flag);
  }, [props.flag]);

  const addInputValue = (el) => {
    const e = el.target.value;
    const name = el.target.name;

    switch (name) {
      case "pln":
        setInputValue(e);

        break;

      case "other":
        setInputOtherValue(e);
        break;
      default:
        return null;
    }
  };

  const addExchangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const option = e.target.childNodes[index];
    const name = e.target.name;
    switch (name) {
      case "countPln":
        setCountCurrency({
          name: option.getAttribute("data-names"),
          value: e.target.value,
          code: option.getAttribute("data-code"),
        });
        setParam(option.getAttribute("data-code"));
        break;
      case "countOther":
        setCountOtherCurrency({
          name: option.getAttribute("data-names"),
          value: e.target.value,
          code: option.getAttribute("data-code"),
        });

        break;

      case "singleCurrency":
        setSingleCurrency({
          name: option.getAttribute("data-names"),
          value: e.target.value,
          code: option.getAttribute("data-code"),
        });
        break;
      default:
        return null;
    }
  };

  const changeKindOfTableHandler = () => {
    if (table === "A") {
      dispatch(kindOfTableActions.changeToTableB());
      setSingleCurrency([]);
      setDateValue("");

      dispatch(singleCurrencyDateActions.deleteData());
    }
    if (table === "B") {
      dispatch(kindOfTableActions.changeToTableA());
      setSingleCurrency([]);
      setDateValue("");

      dispatch(singleCurrencyDateActions.deleteData());
    }
  };

  const handleInputDate = (e) => {
    setDateValue(e.target.value);
  };

  useEffect(() => {
    setCompareData(currency);
  }, [currency]);

  useEffect(() => {
    if (singleCurrency.code && dateValue)
      dispatch(
        singleCurrencyDateFetch({
          table: table,
          code: singleCurrency.code,
          date: dateValue,
        })
      );
  }, [flag, dispatch]);

  useEffect(() => {
    if (compareData.length > 0) {
      const tab = getCompareLastActualValue(
        currency[1].rates,
        currency[0].rates
      );
      setData(tab);
    }
  }, [compareData, currency]);

  useEffect(() => {
    setSingle(singleCurrencyData);
  }, [singleCurrencyData, flag]);

  if (isLoading) {
    return "LOADING......";
  }

  return (
    <>
      <Wrapper css="dark_blue">
        <header className={classes.header}>
          <h1 className={classes.title}>
            Exchange Rates{" "}
            <span>
              <BsCurrencyExchange />
            </span>
          </h1>
          {param !== "" && <Link to={param}> Params</Link>}

          {currency.length > 0 ? (
            <div className={classes.carousel}>
              <ResponsiveCarousel
                data={data}
                slidesToShow={5}
                effectiveDate={currency[1].effectiveDate}
              />
            </div>
          ) : null}
        </header>
      </Wrapper>{" "}
      <Wrapper>
        <div className={classes.exchange_wrapper}>
          <BudgetAppSection>
            <div className={classes.exchange_wrapper__count}>
              {currency.length > 0 ? (
                <div>
                  <Button
                    click={changeKindOfTableHandler}
                    name={
                      table === "A"
                        ? "Checkout to Table B"
                        : "Checkout to Table A"
                    }
                    color={ButtonStyles.btn_transparent}
                  />

                  <TableRates data={currency} link={param} />
                </div>
              ) : null}
              <div className={classes.exchange_wrapper__count__ex}>
                <h2 className={classes.title}>Count currency</h2>

                <div className={classes.card_wrapper}>
                  <Card>
                    <Card.Header>Exchange currency to PLN</Card.Header>
                    <Card.Body>
                      <InputComponent
                        type="number"
                        placeholder="0"
                        value={inputValue}
                        action={addInputValue}
                        name="pln"
                      />
                      <Select
                        exchange={data}
                        catchValue={addExchangeHandler}
                        name="countPln"
                      />
                      <table className={classes.table_rates}>
                        <tbody>
                          <tr>
                            <td>{countCurrency.code}</td>
                            <td>{countCurrency.name}</td>
                            <td>{countCurrency.value}</td>
                          </tr>
                        </tbody>
                      </table>
                      <p>
                        {inputValue} {countCurrency.name} =
                      </p>

                      <p className={classes.equal}>
                        {inputValue &&
                          countCurrency.value &&
                          `${(inputValue * countCurrency.value).toFixed(
                            2
                          )}  PLN`}{" "}
                        {(!inputValue || !countCurrency.value) && 0}
                      </p>
                    </Card.Body>
                  </Card>
                </div>

                <div className={classes.card_wrapper}>
                  <Card>
                    <Card.Header>Exchange PLN to currency</Card.Header>
                    <Card.Body>
                      <InputComponent
                        type="number"
                        placeholder={`0 ${countOtherCurrency.code}`}
                        value={inputOtherValue}
                        action={addInputValue}
                        name="other"
                      />
                      <Select
                        exchange={data}
                        catchValue={addExchangeHandler}
                        name="countOther"
                      />
                      <table className={classes.table_rates}>
                        <tbody>
                          <tr>
                            <td>{countOtherCurrency.code}</td>
                            <td>{countOtherCurrency.name}</td>
                            <td>{countOtherCurrency.value}</td>
                          </tr>
                        </tbody>
                      </table>
                      <p>{inputOtherValue} PLN =</p>

                      <p className={classes.equal}>
                        {inputOtherValue &&
                          countOtherCurrency.value &&
                          `${(
                            inputOtherValue / countOtherCurrency.value
                          ).toFixed(2)}  ${countOtherCurrency.code}`}
                        {(!inputOtherValue || !countOtherCurrency.value) && 0}
                      </p>
                    </Card.Body>
                  </Card>
                </div>

                <Card>
                  <Card.Header>Single currency with date</Card.Header>
                  <Card.Body>
                    {" "}
                    <Select
                      exchange={data}
                      catchValue={addExchangeHandler}
                      name="singleCurrency"
                    />{" "}
                    <InputComponent
                      type="date"
                      action={handleInputDate}
                      value={dateValue}
                    ></InputComponent>
                    {dateValue.length && dateValue > currentDate && (
                      <p className={classes.error}>
                        {" "}
                        <FaInfoCircle /> Wrong date!!!
                      </p>
                    )}
                    {`Date: ${dateValue}`}
                    {status === "success" &&
                      status !== "error" &&
                      dateValue &&
                      singleCurrencyData && (
                        <table className={classes.table_rates}>
                          <tbody>
                            <tr>
                              <td>{singleCurrencyData.code}</td>
                              <td>{singleCurrencyData.currency}</td>
                              <td>{singleCurrencyData.rates[0].mid}</td>
                              <td className={classes.date}>
                                {singleCurrencyData.rates[0].effectiveDate}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                    {status === "error" && (
                      <p className={classes.error}>
                        <FaInfoCircle /> Data Not Found!!!
                      </p>
                    )}
                    {status === "pending" && (
                      <ThreeCircles
                        height="25"
                        width="25"
                        color="grey"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor=""
                        middleCircleColor=""
                      />
                    )}
                    <Card.Text>
                      <span className={classes.btn_wrapper}>
                        {" "}
                        <Button
                          name="check"
                          click={props.click}
                          disabled={singleCurrency === null || compareDataLive}
                        />
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>

            {data.length && (
              <div className={classes.chart}>
                <h3>
                  TABLE {table} compare currency{" "}
                  <span className={classes.date_chart}>
                    {currency[1].effectiveDate}
                  </span>{" "}
                  and last value rates{" "}
                  <span className={classes.date_chart}>
                    {currency[0].effectiveDate}
                  </span>
                </h3>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="code" />
                    <YAxis domain={"dataMax"} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="mid"
                      fill="#8884d8"
                      activeBar={<Rectangle fill="pink" stroke="blue" />}
                    />
                    <Bar
                      dataKey="lastValue"
                      fill="#82ca9d"
                      activeBar={<Rectangle fill="gold" stroke="purple" />}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            {status === "error" && <p>Error</p>}
            {table === "A" && (
              <div className={classes.chart_top}>
                <ExchangeTopLastChart index="0" />{" "}
                <ExchangeTopLastChart index="1" />
                <ExchangeTopLastChart index="2" />
                <ExchangeTopLastChart index="3" />
                <ExchangeTopLastChart index="4" />
              </div>
            )}
          </BudgetAppSection>
          <ExchangeFromToDate data={data} />
        </div>
      </Wrapper>
    </>
  );
};

export default ExchangeRates;
