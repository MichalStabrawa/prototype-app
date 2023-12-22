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
import IconArrow from "../../UI/iconArrow/iconArrow";
import getCurrentPrevDifferences from "../../../utils/getCurrentPrevDifferences";
import { FaInfoCircle } from "react-icons/fa";
import { VscLaw } from "react-icons/vsc";

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
  const [count, setCount] = useState(0);
  const [inputCount, setInputCount] = useState("");

  useEffect(() => {
    fetchNbpGold(setGold);
  }, []);

  function handleInputDate(e) {
    setCurrentDate(e.target.value);
  }

  function handleInputCount(e) {
    setCount((e.target.value * gold.cena).toFixed(2));
    setInputCount(e.target.value);
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
          <p className={classes.gold_price}>Current gold price  </p>
          <p>
            <span className={classes.date}>{gold.data}</span>{" "}
            <span>{gold.cena} PLN/g</span> 
            <IconArrow
              arrow={getCurrentPrevDifferences(gold.cena, goldLast.cena)}
            />
           
          </p>
          <p>Current date: {getCurrentDate()} </p>
          <p>Previous quote</p>
          <p>
          <span className={classes.date}> {goldLast.data}</span> <span>{goldLast.cena}</span>
          </p>
          <div className={classes.ba_gold_count}>
            <label>Count</label>
            <InputComponent
              type="number"
              action={handleInputCount}
              value={inputCount}
              placeholder="0"
            />
            <p className={classes.equal}>{count} <span> <VscLaw size={28}/></span></p>
          </div>
        </div>
        <div className={classes.ba_gold}>
          <label>choose data</label>
          <p>
            <span className={classes.date}> {data.data}</span>{" "}
            <span>{data.cena} PLN/g</span>
          </p>
          <InputComponent
            type="date"
            action={handleInputDate}
            value={currentDate}
          ></InputComponent>
          {currentDate > getCurrentDate() && (
            <p className={classes.info}>
           <FaInfoCircle />   Wrong DATE!!!! Change for currently date or less
            </p>
          )}
          {goldChart && (
            <div className={classes.gold_chart_compare}>
              <BarChart data={goldChart} />
            </div>
          )}
        </div>
      </div>
      <div className={classes.chart_wrapper} >
        <h3>Last 30 top count gold </h3>
        <div className={classes.chart}>
          <SimpleLineChart data={goldTopCount} />
        </div>
      </div>
    </Wrapper>
  );
}
