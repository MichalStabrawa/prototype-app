import { React, useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import Wrapper from "../../UI/Wrapper/Wrapper";
import classes from "../../BudgetApp/BudgetAppExchangeComponent/BudgetAppExchange.module.scss";
import Select from "../../UI/Select/Select";
import InputComponent from "../../UI/Input/InputComponent";
import getCurrentDate from "../../../utils/dateFunction";
import fetchNBP from "../../../store/fetchNbpApi";
import fetchCurrentNBP from "../../../store/fetchNbpCurrentApi";

import { Link } from "react-router-dom";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Reducer from "./../../../store/store";
import getCompareLastActualValue from "../../../utils/getCurrentLastValue";
import Button from "../../UI/Button/Button";

import ExchangeMainTable from "../../ExchangeComponents/ExchangeMainTable/ExchangeMainTable";
import ExchangeTableMidValue from "../../ExchangeComponents/ExchangeTableMidValue/ExchangeTableMidValue";

const { reducerDate, initialDate, fetchNbpTopCountReducer } = Reducer;

const BudgetAppExchange = (props) => {
  const dataCurrencySelector = useSelector((state) => state.currency.data);
  const table = useSelector((state) => state.table.table);
  const [data, setData] = useState(null);
  const [stateDate, dispatchDate] = useReducer(reducerDate, initialDate);
  const [currency, setCurrency] = useState([]);
  const [exchange, setExchange] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingLast, setIsLoadingLast] = useState(false);
  const [exchangeLast, setExchangeLast] = useState([]);
  const [errorLast, setErrorLast] = useState(null);
  const [nbpTopCountData, dispatchNbpTopCountData] = useReducer(
    fetchNbpTopCountReducer,
    []
  );

  useEffect(() => {
    fetchCurrentNBP(
      setIsLoading,
      setError,
      setExchange,
      dispatchDate,
      dispatchNbpTopCountData
    );
  }, []);

  useEffect(() => {
    fetchNBP(setIsLoadingLast, setErrorLast, setExchangeLast, dispatchDate);
  }, []);

  const addExchangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const option = e.target.childNodes[index];

    setCurrency({
      name: option.getAttribute("data-names"),
      value: e.target.value,
      code: option.getAttribute("data-code"),
    });
  };

  useEffect(() => {
    if (dataCurrencySelector.length) {
      const tab = getCompareLastActualValue(
        dataCurrencySelector[1].rates,
        dataCurrencySelector[0].rates
      );
      setData(tab);
    }
  }, [table, dataCurrencySelector]);

  return (
    <Wrapper css={props.css}>
      {isLoading && <p>Is Loading</p>}
      <div className={classes.exchange_item}>
        <div className={classes.exchange_item_current}>
          <h3>Table {table}</h3>
          <span>
            Current NBP {stateDate.currentDate} {getCurrentDate()}
          </span>
          <Select
            name="Count"
            catchValue={addExchangeHandler}
            exchange={data}
          ></Select>
        </div>
        <div>
          {currency.value !== "" && currency.value !== undefined && (
            <div>
              <div>
                <InputComponent
                  name="Count"
                  type="number"
                  value={props.exchangeValue}
                  action={props.addHandlerInput}
                />
                {currency.code} {`(${currency.name})`} to w przeliczeniu
              </div>
              <p className={classes.equal}>
                <span>
                  {`${(+props.exchangeValue * currency.value).toFixed(2)} PLN`}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={classes.exchange_item}>
        {false && <ExchangeMainTable />}

        <ExchangeTableMidValue dataMid={data} />
      </div>
      <div className={classes.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <label>{stateDate.currentDate}</label>
          <ComposedChart
            width={300}
            height={300}
            data={nbpTopCountData.data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="code" scale="band" />
            <YAxis domain={"dataMin"} />
            <Tooltip dataKey="name" />
            <Legend />
            <Bar dataKey="value" barSize={15} fill="#413ea0" />
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className={classes.next}>
        <Link to="/exchange">
          <Button name="more" />
        </Link>
      </div>
    </Wrapper>
  );
};

export default BudgetAppExchange;
