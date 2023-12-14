import { useEffect, useState } from "react";

import BudgetAppSection from "../../BudgetApp/BudgetAppSection/BudgetAppSection";
import Select from "../../UI/Select/Select";
import Button from "../../UI/Button/Button";
import InputComponent from "../../UI/Input/InputComponent";

import classes from "./ExchangeFromToDate.module.scss";

const ExchangeFromToDate = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const changeDateInputHandler = (e) => {
    const input = e.target;
    if (input.name === "to-date") {
      setToDate(input.value);
    } else if (input.name === "from-date") {
      setFromDate(input.value);
    }
  };

  return (
    <div className={classes.exchange_date}>
      <BudgetAppSection>
        <h3>Exchange from date to date</h3>
        <div className={classes.content}>
          <Select />
          <InputComponent type="date" name="from-date" value={fromDate} action={changeDateInputHandler}/>
          <InputComponent type="date" name="to-date" value={toDate} action={changeDateInputHandler}/>
          {fromDate&&toDate&&    <Button name="Check" /> }
       {fromDate} {toDate}
        </div>

        <div className={classes.chart}></div>
      </BudgetAppSection>
    </div>
  );
};

export default ExchangeFromToDate;
