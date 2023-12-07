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

const ExchangeRates = (props) => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency.data);
  const table = useSelector((state) => state.table.table);
  const [compareData, setCompareData] = useState([]);
  const [data, setData] = useState([]);
  const [countCurrency, setCountCurrency] = useState([]);
  const [countOtherCurrency, setCountOtherCurrency] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputOtherValue, setInputOtherValue] = useState("");

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
      default:
        return null;
    }
  };

  const changeKindOfTableHandler = () => {
    if (table === "A") {
      dispatch(kindOfTableActions.changeToTableB());
    }
    if (table === "B") {
      dispatch(kindOfTableActions.changeToTableA());
    }
  };

  useEffect(() => {
    setCompareData(currency);
  }, [currency]);

  useEffect(() => {
    if (compareData.length > 0) {
      const tab = getCompareLastActualValue(
        currency[1].rates,
        currency[0].rates
      );
      setData(tab);
    }
  }, [compareData, currency]);

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
