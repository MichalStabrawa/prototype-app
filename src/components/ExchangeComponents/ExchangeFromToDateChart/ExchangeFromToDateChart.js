import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import Button from "../../UI/Button/Button";

import classes from "../ExchangeTopLastChart/ExchangeTopLastChart.module.scss";

const ExchangeFromToDateChart = ({ dateFrom, dateTo, minVal }) => {
  const data = useSelector((state) => state.singleCurrencyDateFromTo.data);
  const status = useSelector((state) => state.singleCurrencyDateFromTo.status);
  const [flag, setFlag] = useState(false);

  const changeChartHandler = () => {
    console.log("FLAG");
    console.log(flag);
    setFlag(!flag);
  };

  return (
    <>
      <div>
        {status === "error" && (
          <p className={classes.error}>Error fetch date</p>
        )}
        {data && status === "success" && (
          <div>
            <Button click={changeChartHandler} name="Change chart" />
            {!flag ? (
              <div className={classes.chart}>
                <h3>
                  {data.code} ask & bid from {dateFrom} to {dateTo} 
                </h3>
                <div>min bid value:{" "}
                  {minVal.bid} date {minVal.effectiveDate}</div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={data.rates}
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
            ) : (
              <div className={classes.chart}>
                <h3>
                  {data.code} ask & bid from {dateFrom} to {dateTo}
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={data.rates}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="effectiveDate" />
                    <YAxis domain={["dataMin", "dataMax"]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="bid"
                      fill="#564D65"
                      activeBar={<Rectangle fill="pink" stroke="blue" />}
                    />
                    <Bar
                      dataKey="ask"
                      fill="#84C494"
                      activeBar={<Rectangle fill="gold" stroke="purple" />}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ExchangeFromToDateChart;
