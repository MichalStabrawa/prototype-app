import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./CompareGoldPricesByDate.module.scss";

import Form from "react-bootstrap/Form";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CompareGoldPricesByDate = () => {
  const gold = useSelector((state) => state.goldFetch.data);
  const status = useSelector((state) => state.goldFetch.status);
  const isLoading = useSelector((state) => state.goldFetch.isLoading);
  const [lastDate, setLastDate] = useState();
  const [compareData, setCompareData] = useState();

  const handleInputValue = (e) => {
    setLastDate(e.target.value);
  };

  useEffect(() => {
    if (status === "success" && gold) {
      setCompareData({
        value: gold[1].cena,
        selected_value: gold[0].cena,
        lastDate: gold[0].data,
        currentlyDate: gold[1].data,
        name: "Currently gold value and selected value",
      });
    }
  }, [gold, lastDate]);

  return (
    <div className={classes.compare}>
      <Form.Control type="date" onChange={handleInputValue}></Form.Control>
      <Form.Label>{lastDate}</Form.Label>

      {compareData && status === "success" && (
        <div className={classes.chart}>
          {compareData.chosenData}
          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              width={500}
              height={300}
              data={compareData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={"maxValue"} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="value"
                fill="#8884d8"
                background={{ fill: "#eee" }}
              />
              <Bar dataKey="selected_value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CompareGoldPricesByDate;
