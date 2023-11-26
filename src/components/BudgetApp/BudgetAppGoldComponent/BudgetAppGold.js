import { useEffect, useState } from "react";
import React, { PureComponent } from "react";
import {fetchNbpGold,fetchNbpGoldData} from "../../../store/fetchNbpGold";

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

export default function BudgetAppGold({ props }) {
  const [gold, setGold] = useState([]);
  const [data, setData] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [goldChart, setGoldChart] = useState([{
    name: "Currently and others data rate",
    currentlyPrice: 250,
    chosenData: 240,
  }]);
  console.log("GoldChart");
  console.log(goldChart);

  useEffect(() => {
    fetchNbpGold(setGold);
  }, []);

  function handleInputDate(e) {
    setCurrentDate(e.target.value);
    setGoldChart([{name: "Currently and others data rate", currentlyPrice: gold.cena, chosenData: data.cena }]);
    console.log(e.target.value);
  }
  useEffect(() => {
    fetchNbpGoldData(currentDate, setData);
  }, [currentDate]);

  const datas = [
    {
      data: "2023-11-20",
      cena: 256.84,
    },
    {
      data: "2023-11-19",
      cena: 240.7,
    },
    {
      data: "2023-11-19",
      cena: 257.7,
    },
    {
      data: "2023-11-18",
      cena: 250.7,
    },
    {
      data: "2023-11-17",
      cena: 230.7,
    },
    {
      data: "2023-11-16",
      cena: 256.7,
    },
    {
      data: "2023-11-15",
      cena: 220.7,
    },
    {
      data: "2023-11-14",
      cena: 256.7,
    },
    {
      data: "2023-11-13",
      cena: 240.7,
    },
  ];

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
          <div className={classes.gold_chart_compare}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={200}
                height={300}
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
                  
                  activeBar={<Rectangle fill="gold" stroke="purple" />
                }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div style={{ width: "40%", height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={10}
            height={10}
            data={datas}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="data" scale="auto" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cena" barSize={10} fill="#413ea0" />
            <Line type="monotone" dataKey="cena" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Wrapper>
  );
}
