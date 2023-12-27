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
import Alert from "react-bootstrap/Alert";

import classes from "./ExchangeFromToDateChart.module.scss";
import Table from "react-bootstrap/Table";
import buttonStyles from '../../UI/Button/Button.module.scss';

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
          <Alert variant="danger">Wrong fetch data !!!</Alert>
        )}
        {data && status === "success" && minBidAsk && (
          <div>
            <Button click={changeChartHandler} color={buttonStyles.btn_transparent} name="Change chart" />
            {!flag ? (
              <div className={classes.chart}>
                <h3>
                  {data.code} ask & bid from{" "}
                  <span className={classes.date}>{dateFrom}</span> to{" "}
                  <span className={classes.date}>{dateTo}</span>
                </h3>

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
                <div className={classes.table_min_max}>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>min Bid</th> <th>min Ask</th>
                        <th>date (min)</th>
                        <th>max Bid</th>
                        <th>max Ask</th>
                        <th>date (max)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={classes.min}>{minBidAsk.bid}</td>
                        <td className={classes.min}>{minBidAsk.ask}</td>
                        <td className={classes.date_min_max}>
                          {minBidAsk.effectiveDate}
                        </td>
                        <td className={classes.max}>{maxBidAsk.bid}</td>
                        <td className={classes.max}>{maxBidAsk.ask}</td>
                        <td className={classes.date_min_max}>
                          {maxBidAsk.effectiveDate}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            ) : (
              <div className={classes.chart}>
                <h3>
                  {data.code} ask & bid from{" "}
                  <span className={classes.date}>{dateFrom}</span> to{" "}
                  <span className={classes.date}>{dateTo}</span>
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
                <div className={classes.table_min_max}>
                  {" "}
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>min Bid</th> <th>min Ask</th>
                        <th>date (min)</th>
                        <th>max Bid</th>
                        <th>max Ask</th>
                        <th>date (max)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={classes.min}>{minBidAsk.bid}</td>
                        <td className={classes.min}>{minBidAsk.ask}</td>
                        <td className={classes.date_min_max}>
                          {minBidAsk.effectiveDate}
                        </td>
                        <td className={classes.max}>{maxBidAsk.bid}</td>
                        <td className={classes.max}>{maxBidAsk.ask}</td>
                        <td className={classes.date_min_max}>
                          {maxBidAsk.effectiveDate}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ExchangeFromToDateChart;
