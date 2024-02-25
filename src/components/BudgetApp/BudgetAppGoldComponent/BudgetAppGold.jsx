import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
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
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReactApexChart from "react-apexcharts";

const options = {
  chart: {
    type: "area",
    height: 350,
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: "18px",
      fontWeight: "bold",
      display: "none",
    },
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    title: {
      text: "Gold Price (PLN/g)",
    },
  },
  stroke: {
    curve: "straight",
  },
  colors: ["#FFBB5C"],
};

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
  const [goldNewChart, setGoldNewChart] = useState({
    options: options,
    series: [],
  });

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
  useEffect(() => {
    if (goldTopCount.length > 0) {
      const transformedChartData = goldTopCount.map((item) => ({
        x: new Date(item.data).getTime(),
        y: item.cena,
      }));

      // Update only the series data
      setGoldNewChart({
        ...goldNewChart,
        series: [
          {
            name: "Gold Price",
            data: transformedChartData,
          },
        ],
      });
    }
  }, [goldTopCount]);

  return (
    <Wrapper>
      <div className={classes.ba_main}>
        <div className={classes.ba_gold}>
          <Card border="light">
            <Card.Header>
              <h4>Current gold price</h4>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <span>
                  {gold.cena} PLN/g{" "}
                  <IconArrow
                    arrow={getCurrentPrevDifferences(gold.cena, goldLast.cena)}
                  />
                </span>
              </Card.Title>

              <Card.Text>
                date: <span className={classes.date}>{gold.data}</span>
              </Card.Text>
              <Card.Text>
                {" "}
                <p>Current date: {getCurrentDate()} </p>
              </Card.Text>
              <Card.Subtitle>Previous quote</Card.Subtitle>
              <Card.Text>
                {" "}
                <span className={classes.date}> {goldLast.data}</span>{" "}
                <span>{goldLast.cena}</span>
              </Card.Text>
              <Card.Text>
                <span className={classes.input}></span>
                <InputComponent
                  type="number"
                  action={handleInputCount}
                  value={inputCount}
                  placeholder="0"
                />
              </Card.Text>
              <Card.Text>
                {" "}
                <span className={classes.equal}>
                  {count}{" "}
                  <span>
                    {" "}
                    <VscLaw size={28} />
                  </span>
                </span>
                <span>PLN/g</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className={classes.ba_gold}>
          <h4>Previous gold price rates</h4>
          <label>Select a date and check the previous rate</label>

          <InputComponent
            type="date"
            action={handleInputDate}
            value={currentDate}
          ></InputComponent>
          {currentDate > getCurrentDate() && (
            <p className={classes.info}>
              <FaInfoCircle /> Wrong DATE!!!! Change for currently date or less
            </p>
          )}
          <p>
            <span>
              <span className={classes.date}>Selected gold value: </span>
              {data.cena} PLN/g,
            </span>{" "}
            <span className={classes.date}>selected date: {data.data}</span>
          </p>
          {goldChart && (
            <div className={classes.gold_chart_compare}>
              <BarChart data={goldChart} />
            </div>
          )}
        </div>
      </div>
      <div className={classes.chart_wrapper}>
        <h3 className={classes.chart_wrapper_title}>Last 30 top count gold </h3>
        {goldNewChart.options && goldNewChart.series && (
          <ReactApexChart
            options={goldNewChart.options}
            series={goldNewChart.series}
            type="area"
            height={350}
          />
        )}
      </div>
      <div className={classes.btn_section}>
        <NavLink to="gold">
          {" "}
          <Button variant="outline-secondary">More...</Button>
        </NavLink>
      </div>
    </Wrapper>
  );
}
