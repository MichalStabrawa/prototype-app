import { useEffect, useState } from "react";
import React, { PureComponent } from "react";

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
} from "recharts";

import classes from "./BudgetAppGold.module.scss";
import Wrapper from "../../UI/Wrapper/Wrapper";
import InputComponent from "../../UI/Input/InputComponent";
import getCurrentDate from "../../../utils/dateFunction";

export default function BudgetAppGold({ props }) {
  const [gold, setGold] = useState([]);
  const [data, setData] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const charts = data[0];

  useEffect(() => {
    async function fetchGold() {
      const url = "http://api.nbp.pl/api/cenyzlota/" + currentDate;
      const header = new Headers({ "Access-Control-Allow-Origin": "*" });

      try {
        const response = await fetch(url, { header: header });
        if (!response.ok) {
          throw new Error("Somthing went wrong with api gold");
        }
        console.log(response);
        const data = await response.json();
        console.log("Data");
        console.log(data[0]);
        setGold(data);
        setData(data[0]);
      } catch (error) {
        console.log("Is Error fetch data API gold");
      }
    }

    fetchGold();
  }, [currentDate]);

  function handleInputDate(e) {
    setCurrentDate(e.target.value);
    console.log(e.target.value);
  }

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
      <div className={classes.ba_gold}>
        <p>Current gold price</p>
        <p>
          {data.data} <span>{data.cena}</span> PLN
        </p>
        <p>Current date: {getCurrentDate()} </p>
      </div>
      <div className={classes.ba_gold}>
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
            <Bar dataKey="cena" fill="#413ea0" />
            <Line type="monotone" dataKey="cena" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Wrapper>
  );
}
