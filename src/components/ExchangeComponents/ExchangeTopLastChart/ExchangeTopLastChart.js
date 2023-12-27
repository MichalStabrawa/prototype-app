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

  console.log('DATA Multiple')
  console.log(data)

  return (
    <>
      <div >
        {status === "error" && <p>Error ExchangeTopLastChart</p>}
        {data && status === "success" && (
          <div className={classes.chart_wrapper}>
            <Button click={changeChartHandler} name="Change chart" />
            {!flag ? (
              <div className={classes.chart}>
                <h3 className={classes.title}><span className={classes.code}>{data[index].code}</span> Top 10 bid ask rates <span className={classes.currency}>[{data[index].currency}]</span></h3>
                <ResponsiveContainer width="100%" height="90%">
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
                      type="monotone"
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
                <h3 className={classes.title}><span className={classes.code}>{data[index].code}</span> Top 10 bid ask  <span className={classes.currency}>[{data[index].currency}]</span></h3>
                <ResponsiveContainer width="100%" height="90%">
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
                    <YAxis domain={[ "dataMax"]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="bid"
                      fill="#174478"
                      activeBar={<Rectangle fill="pink" stroke="blue" />}
                    />
                    <Bar
                      dataKey="ask"
                      fill="#125E3D"
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
