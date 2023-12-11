import { useState } from "react";
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

import classes from "./ExchangeTopLastChart.module.scss";

const ExchangeTopLastChart = ({ index }) => {
  const data = useSelector((state) => state.multiple.data);
  const status = useSelector((state) => state.multiple.status);
  const [flag, setFlag] = useState(false);

  const changeChartHandler = () => {
    console.log("FLAG");
    console.log(flag);
    setFlag(!flag);
  };

  return (
    <>
      <div>
        {status === "error" && <p>Error ExchangeTopLastChart</p>}
        {data && status === "success" && (
          <div>
            <Button click={changeChartHandler} name="Change chart" />
            {!flag ? (
              <div className={classes.chart}>
                <h3>{data[index].code} Top 10 bid ask rates</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={data[index].rates}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="effectiveDate" />
                    <YAxis domain={"dataMax"} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="linear"
                      dataKey="bid"
                      stroke="blue"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="ask" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className={classes.chart}>
                <h3>{data[index].code} Top 10 bid ask </h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={data[index].rates}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="effectiveDate" />
                    <YAxis domain={["dataMin-0.1", "dataMax"]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="bid"
                      fill="#8884d8"
                      activeBar={<Rectangle fill="pink" stroke="blue" />}
                    />
                    <Bar
                      dataKey="ask"
                      fill="#82ca9d"
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

export default ExchangeTopLastChart;
