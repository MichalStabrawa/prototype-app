import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import BudgetAppSection from "../../BudgetApp/BudgetAppSection/BudgetAppSection";
import Select from "../../UI/Select/Select";
import Button from "../../UI/Button/Button";
import InputComponent from "../../UI/Input/InputComponent";
import { singleFetchDataFromDateTo } from "../../../store/currencyApiNbp/singleCurrencyFetchDataFromDateToSlice";
import ExchangeFromToDateChart from "../ExchangeFromToDateChart/ExchangeFromToDateChart";
import classes from "./ExchangeFromToDate.module.scss";

const ExchangeFromToDate = ({ data }) => {
  const dispatch = useDispatch();
  const dataDate = useSelector((state) => state.singleCurrencyDateFromTo.data);

  const status = useSelector((state) => state.singleCurrencyDateFromTo.status);
  const [code, setCode] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fetch, setFetch] = useState(false);

  const changeSelectCodeHandler = (e) => {
    const index = e.target.selectedIndex;
    const option = e.target.childNodes[index];
    const name = e.target.name;

    if (name === "dateFromTo") {
      setCode(option.getAttribute("data-code"));
    }
  };

  const changeDateInputHandler = (e) => {
    const input = e.target;
    if (input.name === "to-date") {
      setToDate(input.value);
    } else if (input.name === "from-date") {
      setFromDate(input.value);
    }
  };

  const fetchDateHandler = () => {
    setFetch(true);
  };

  useEffect(() => {
    setFetch(fetch);
    if (fetch === true) {
      dispatch(
        singleFetchDataFromDateTo({
          code: code,
          date: fromDate,
          lastDate: toDate,
        })
      );
      setFetch(false);
    }
  }, [dispatch, fetch]);

  return (
    <div className={classes.exchange_date}>
      <BudgetAppSection>
        <h3>Exchange from date to date</h3>
        <div className={classes.content}>
          {data.length && (
            <Select
              exchange={data}
              name="dateFromTo"
              catchValue={changeSelectCodeHandler}
            />
          )}
          <InputComponent
            type="date"
            name="from-date"
            value={fromDate}
            action={changeDateInputHandler}
          />
          <InputComponent
            type="date"
            name="to-date"
            value={toDate}
            action={changeDateInputHandler}
          />
          {fromDate && toDate && (
            <Button name="Check" click={fetchDateHandler} />
          )}
          {fromDate} {toDate} {code && code}
        </div>

        <div className={classes.chart}>
          {dataDate && (
            <ExchangeFromToDateChart
              dateTo={toDate}
              dateFrom={fromDate}
              fetch={fetch}
            />
          )}
        </div>
      </BudgetAppSection>
    </div>
  );
};

export default ExchangeFromToDate;
