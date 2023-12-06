import { useState, useEffect } from "react";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import classes from "./exchange-rates.module.scss";
import { useSelector } from "react-redux";
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

const ExchangeRates = (props) => {
  const currency = useSelector((state) => state.currency.data);

  const [compareData, setCompareData] = useState([]);
  const [data, setData] = useState([]);
  const [countCurrency, setCountCurrency] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addInputValue = (el) => {
    const e = el.target.value;
    setInputValue(e);
  };

  const addExchangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const option = e.target.childNodes[index];

    setCountCurrency({
      name: option.getAttribute("data-names"),
      value: e.target.value,
      code: option.getAttribute("data-code"),
    });
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
                {" "}
                <TableRates data={currency} />
              </div>
            ) : null}
            <div className={classes.exchange_wrapper__count__ex}>
              <p>Count currency</p>
              <div>
                <InputComponent type="number" placeholder="0" value={inputValue} action={addInputValue} />
                <Select
                  exchange={data}
                  catchValue={addExchangeHandler}
                  name="Count"
                />
                <p>{inputValue} {countCurrency.name} =</p>

                <p className={classes.equal}>{inputValue && countCurrency.value&& `${inputValue*countCurrency.value}`} PLN</p>
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
