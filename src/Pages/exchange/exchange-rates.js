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

  const currentDate = getCurrentDate();

  console.log("Current Date");
  console.log(currentDate);

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

  const handleSend = () => {
    setFlag(!flag);
    console.log(flag);
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
    return "loading...";
  }

  if (error) {
    return error;
  }

  return (
    <Wrapper>
      <header>
        <h1>Exchange Rates</h1>
      </header>
      <div className={classes.exchange_wrapper}>
        <BudgetAppSection>
          <div className={classes.exchange_wrapper__count}>
            {currency.length > 0 ? (
              <div>
                <button onClick={changeKindOfTableHandler}>
                  {table === "A" ? "Table B" : "Table A"}
                </button>
                <TableRates data={currency} />
              </div>
            ) : null}
            <div className={classes.exchange_wrapper__count__ex}>
              <h2>Count currency</h2>
              <h3>Exchange currency to PLN</h3>
              <div className={classes.count_pln}>
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
              </div>
              <div className={classes.count_pln}>
                <h3>Exchange PLN to currency</h3>
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
                    `${(inputOtherValue / countOtherCurrency.value).toFixed(
                      2
                    )}  ${countOtherCurrency.code}`}
                  {(!inputOtherValue || !countOtherCurrency.value) && 0}
                </p>
              </div>
              <div className={classes.count_pln}>
                <h3>Single currency with date</h3>
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
                  <p>Wrong date</p>
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
                          <td>{singleCurrencyData.rates[0].effectiveDate}</td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                {status === "error" && (
                  <p className={classes.error}>Data Not Found!!!</p>
                )}
                <div className={classes.button_wrapper}>
                  <Button
                    name="check"
                    click={props.click}
                    disabled={singleCurrency === null || compareDataLive}
                  />
                </div>
              </div>
            </div>
          </div>

          {data.length && (
            <div className={classes.chart}>
              <ResponsiveContainer width="100%" height="100%">
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
                  <YAxis />
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
        </BudgetAppSection>
      </div>
    </Wrapper>
  );
};

export default ExchangeRates;
