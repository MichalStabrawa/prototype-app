import { useState, useEffect } from "react";
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

import classes from "./ExchangeTopLastChart.module.scss";
import minMaxBidAsk from "../../../utils/minMaxBidAsk";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { splineArea } from "../../../helpers/chartVariables/splineArea";
import ReactApexChart from "react-apexcharts";

const ExchangeTopLastChart = ({ index }) => {
  const data = useSelector((state) => state.multiple.data);
  const status = useSelector((state) => state.multiple.status);
  const [flag, setFlag] = useState(false);
  const [minBidAsk, setMinBidAsk] = useState();
  const [maxBidAsk, setMaxBidAsk] = useState();
  const [splineChart, setSplineChart] = useState({
    options: splineArea.options,
    series: [],
  });

  const changeChartHandler = () => {
    setFlag(!flag);
  };

  console.log("splineChart" + splineChart.options);

  useEffect(() => {
    minMaxBidAsk(data[index], status, setMinBidAsk, setMaxBidAsk);
  }, [status]);

  useEffect(() => {
    if (data.length > 0 && data[index] && data[index].rates) {
      const { rates } = data[index];
      console.log("Ratesin useEffect:", rates);
      setSplineChart((prevSplinea) => ({
        ...prevSplinea,
        series: [
          {
            name: "Rates",
            data: rates.map((el) => el.ask),
          },
          {
            name: "Rates last",
            data: rates.map((el) => el.bid),
          },
        ],
        options: {
          xaxis: {
            categories: rates.map((el) => el.effectiveDate),
          },
        },
      }));
    }
  }, [data, index]);

  return (
    <>
      <div>
        {status === "error" && <p>Error ExchangeTopLastChart</p>}
        {data && status === "success" && (
          <div className={classes.chart_wrapper}>
            <Button onClick={changeChartHandler} variant="outline-secondary">
              Change the chart
            </Button>
            {!flag ? (
              <div className={classes.chart}>
                <h3 className={classes.title}>
                  <span className={classes.code}>{data[index].code}</span> Top
                  10 bid ask rates{" "}
                  <span className={classes.currency}>
                    [{data[index].currency}]
                  </span>
                </h3>

                {splineChart.options && splineChart.series && (
                  <div>
                    <div id="chart">
                      <ReactApexChart
                        options={splineChart.options}
                        series={splineChart.series}
                        type="area"
                        height={350}
                      />
                    </div>
                    <div id="html-dist"></div>
                  </div>
                )}
                {minBidAsk && maxBidAsk && (
                  <div className={classes.table_min_max}>
                    <Table responsive striped hover>
                      <thead>
                        <tr>
                          <th>min Bid</th>
                          <th>min Ask</th>
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
                )}
              </div>
            ) : (
              <div className={classes.chart}>
                <h3 className={classes.title}>
                  <span className={classes.code}>{data[index].code}</span> Top
                  10 bid ask{" "}
                  <span className={classes.currency}>
                    [{data[index].currency}]
                  </span>
                </h3>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart
                    width={500}
                    height={300}
                    barSize={30}
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
                    <YAxis domain={["dataMax"]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="bid"
                      fill="#365486"
                      activeBar={<Rectangle fill="pink" stroke="blue" />}
                    />
                    <Bar
                      dataKey="ask"
                      fill="#7FC7D9"
                      activeBar={<Rectangle fill="gold" stroke="purple" />}
                    />
                  </BarChart>
                </ResponsiveContainer>
                {minBidAsk && maxBidAsk && (
                  <div className={classes.table_min_max}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>min Bid</th>
                          <th>min Ask</th>
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
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ExchangeTopLastChart;
