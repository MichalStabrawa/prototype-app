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

import classes from "./ExchangeFromToDateChart.module.scss";

const ExchangeFromToDateChart = ({ dateFrom, dateTo }) => {
  const data = useSelector((state) => state.singleCurrencyDateFromTo.data);
  const status = useSelector((state) => state.singleCurrencyDateFromTo.status);
  const [flag, setFlag] = useState(false);
  const [minBidAsk, setMinBidAsk] = useState(null);
  const [maxBidAsk, setMaxBidAsk] = useState(null);

  const changeChartHandler = () => {
    setFlag(!flag);
  };

  useEffect(() => {
    if (status === "success") {
      const min = [...data.rates].reduce((prev, next) =>
        prev.ask < next.ask ? prev : next
      );
      const max = [...data.rates].reduce((prev, next) =>
        prev.ask > next.ask ? prev : next
      );

      setMinBidAsk(min);
      setMaxBidAsk(max);
    }
  }, [status]);

  return (
    <>
      <div>
        {status === "error" && (
          <p className={classes.error}>Error fetch date</p>
        )}
        {data && status === "success" && minBidAsk && (
          <div>
            <Button click={changeChartHandler} name="Change chart" />
            {!flag ? (
              <div className={classes.chart}>
                <h3>
                  {data.code} ask & bid from <span className={classes.date}>{dateFrom}</span> to <span className={classes.date}>{dateTo}</span> 
                </h3>
                <div className={classes.max_min}>
                  <p>
                    <span className={classes.date}>
                      {" "}
                      date: {minBidAsk.effectiveDate}
                    </span>
                    ,<span className={classes.min}>min bid:</span>{" "}
                    <span> {minBidAsk.bid}</span>,
              <span className={classes.min}> min ask:</span>      <span>{minBidAsk.ask}</span>,
                  </p>
                  <p>
                  <span className={classes.date}>date: {maxBidAsk.effectiveDate}</span>
                  <span className={classes.max}> max bid:</span>
                    <span>{maxBidAsk.bid}</span>
                
                    <span className={classes.max}>max ask:</span>
                    <span> {maxBidAsk.ask}</span>
                  </p>
                </div>

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
                {data.code} ask & bid from <span className={classes.date}>{dateFrom}</span> to <span className={classes.date}>{dateTo}</span> 
                </h3>
                <div className={classes.max_min}>
                  <p>
                    <span className={classes.date}>
                      {" "}
                      date: {minBidAsk.effectiveDate}
                    </span>
                    ,<span className={classes.min}>min bid:</span>{" "}
                    <span> {minBidAsk.bid}</span>,
                    <span className={classes.max}> max bid:</span>
                    <span>{maxBidAsk.bid}</span>
                  </p>
                  <p>
                    <span className={classes.min}> min ask:</span>
                    <span>{minBidAsk.ask}</span>,
                    <span className={classes.max}>max ask:</span>
                    <span> {maxBidAsk.ask}</span>
                  </p>
                </div>
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
