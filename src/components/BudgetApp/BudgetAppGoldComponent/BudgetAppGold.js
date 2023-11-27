import { useEffect, useState } from "react";
import React, { PureComponent } from "react";
import {
  fetchNbpGold,
  fetchNbpGoldData,
  fetchNbpGoldTopCount,
} from "../../../store/fetchNbpGold";

import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Rectangle,
} from "recharts";

import classes from "./BudgetAppGold.module.scss";
import Wrapper from "../../UI/Wrapper/Wrapper";
import InputComponent from "../../UI/Input/InputComponent";
import getCurrentDate from "../../../utils/dateFunction";
import SimpleLineChart from "../../Chart/SimpleLineChart";

export default function BudgetAppGold({ props }) {
  const [gold, setGold] = useState([]);
  const [data, setData] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [goldChart, setGoldChart] = useState("");
  const [goldTopCount, setGoldTopCount] = useState([]);

  console.log("TopGoldCount");
  console.log(goldTopCount);

  useEffect(() => {
    fetchNbpGold(setGold);
  }, []);

  function handleInputDate(e) {
    setCurrentDate(e.target.value);
    console.log(e.target.value);
  }

  useEffect(() => {
    fetchNbpGoldData(currentDate, setData);
  }, [currentDate]);

  useEffect(() => {
    setGoldChart([
      {
        name: "Currently and others data rate",
        currentlyPrice: gold.cena,
        chosenData: data.cena,
      },
    ]);
  }, [data.cena]);

  useEffect(() => {
    fetchNbpGoldTopCount(setGoldTopCount);
  }, []);

  return (
    <Wrapper>
      <div className={classes.ba_main}>
        <div className={classes.ba_gold}>
          <p>Current gold price</p>
          <p>
            {gold.data} <span>{gold.cena} PLN/g</span>
          </p>
          <p>Current date: {getCurrentDate()} </p>
        </div>
        <div className={classes.ba_gold}>
          <label>choose data</label>
          <p>
            {data.data} <span>{data.cena} PLN/g</span>
          </p>
          <InputComponent
            type="date"
            action={handleInputDate}
            value={currentDate}
          ></InputComponent>
          {currentDate > getCurrentDate() && (
            <p className={classes.info}>
              Wrong DATE!!!! Change for currently date or less
            </p>
          )}
          {goldChart && (
            <div className={classes.gold_chart_compare}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={200}
                  height={400}
                  data={goldChart}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="currentlyPrice"
                    barSize={50}
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar
                    dataKey="chosenData"
                    barSize={50}
                    fill="#82ca9d"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
      <div style={{ width: "100%", height: 350 }}>
        <h3>Last 30 top count gold </h3>
        <SimpleLineChart data={goldTopCount} />
      </div>
    </Wrapper>
  );
}
