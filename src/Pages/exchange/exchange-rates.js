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

const ExchangeRates = (props) => {
  const currency = useSelector((state) => state.currency.data);
  console.log('CURRENCY!!!!!!')


  const [compareData, setCompareData] = useState([]);
  console.log('COMPARE CURRENCy')
  console.log(compareData)
  const [data, setData] = useState([]);

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
          {(currency.length>0 ) ? (
            <TableRates
              data={currency}
             
            />
          ):null}

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
        </BudgetAppSection>
      </div>
    </Wrapper>
  );
};

export default ExchangeRates;
