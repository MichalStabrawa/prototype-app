import { useEffect, useState } from "react";
import React from "react";
import {
  fetchNbpGold,
  fetchNbpGoldData,
  fetchNbpGoldTopCount,
  fetchNbpGoldLast,
} from "../../../store/fetchNbpGold";

import classes from "./BudgetAppGold.module.scss";
import Wrapper from "../../UI/Wrapper/Wrapper";
import InputComponent from "../../UI/Input/InputComponent";
import getCurrentDate from "../../../utils/dateFunction";
import SimpleLineChart from "../../Chart/SimpleLineChart";
import BarChart from "../../Chart/BarChart";

export default function BudgetAppGold({ props }) {
  const [gold, setGold] = useState([]);
  const [data, setData] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [goldLast, setGoldLastPrice] = useState([]);
  const [goldChart, setGoldChart] = useState([
    {
      name: "Currently and others data rate",
      currentlyPrice: gold.cena,
      chosenData: goldLast.cena,
    },
  ]);
  const [goldTopCount, setGoldTopCount] = useState([]);

  console.log("GOLDCHART");
  console.log(goldChart);
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

  useEffect(() => {
    fetchNbpGoldLast(setGoldLastPrice);
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
          <p>Previous quote</p>
          <p>
            {goldLast.data}: <span>{goldLast.cena}</span>
          </p>
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
              <BarChart data={goldChart} />
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
